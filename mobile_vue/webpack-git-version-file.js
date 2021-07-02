"use strict"
// 生产版本文件version.json

const fs = require('fs')
const path = require('path')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin') // 生成版本号 --> 版本号来自git版本号
const gitRevisionPlugin = new GitRevisionPlugin()

function VersionFile(options) {
  var self = this

  var defaultOptions = {
    outputFile: './public/version.json',
    templateString: '',
    extras: {}
  }

  //Set default config data
  var optionsObject = options || {}
  // self.options = _.defaults(optionsObject, defaultOptions);
  self.options = { ...defaultOptions, ...optionsObject }
  self.options['package'] = {
    VERSION: gitRevisionPlugin.version(),
    COMMITHASH: gitRevisionPlugin.commithash(),
    BRANCH: gitRevisionPlugin.branch(),
    maintenance: false
  }
}

VersionFile.prototype.apply = function () {
  var self = this
  self.options.currentTime = new Date()

  /*
   * If we are given a template string in the config, then use it directly.
   * But if we get a file path, fetch the content then use it.
   */
  self.writeFile(self.options['package'])
}

/**
 * Renders the template and writes the version file to the file system.
 * @param templateContent
 */
VersionFile.prototype.writeFile = function (templateContent) {
  var self = this
  self.ensureDirExists(path.dirname(self.options.outputFile))
  fs.writeFileSync(self.options.outputFile, JSON.stringify(templateContent, "", "\t"), {
    flag: 'w'
  })
}

VersionFile.prototype.ensureDirExists = function (dirpath) {
  try {
    fs.mkdirSync(dirpath, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

module.exports = VersionFile
