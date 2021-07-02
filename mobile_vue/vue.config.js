const { GitRevisionPlugin } = require('git-revision-webpack-plugin') // 生成版本号 --> 版本号来自git版本号
const gitRevisionPlugin = new GitRevisionPlugin()
const webpack = require('webpack')
const VersionFile = require('./webpack-git-version-file')
module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  devServer: {
    port: 8486, // 启动端口,
    proxy: {
      '/api/': {
        target: 'https://tapi.wowqu.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    },
    disableHostCheck: true
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue({ file }) {
              return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            selectorBlackList: ['no-rem'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ]
      }
    }
  },
  productionSourceMap: false,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  // 这是为了处理升级vue-cli3后，那些依赖换行来实现元素间距后那些间距没有的bug。比如两个inline-block放一起普通会有间距的。vue-cli3处理了这个问题，使旧代码的间距不见了
  chainWebpack: config => {
    // 移除 prefetch 插件
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')

    config.plugin('definePlugin').use(webpack.DefinePlugin, [
      {
        VERSION: JSON.stringify(gitRevisionPlugin.version()),
        COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
        BRANCH: JSON.stringify(gitRevisionPlugin.branch())
      }
    ])
    config.plugin('versionFile').use(VersionFile)
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
      })
    /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
        config.plugins.delete('prefetch')
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      lodash: '_',
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['./src/css/style.less']
    }
  }
}
