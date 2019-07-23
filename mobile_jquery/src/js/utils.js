/**
 * 图片加载失败后的方法
 */
function imgError() {
    var img = event.srcElement;
    img.src = Config.errorImgSrc;
    img.onerror = null;
};
/**
 * 禁止页面滑动
 */
function stopMove() {
    document.body.style.overflow = 'hidden'
    $('body').addClass('bodyLock')
};
/**
 * 取消禁止页面滑动
 */
function ReMove() {
    document.body.style.overflow = ''//出现滚动条
    $('body').removeClass('bodyLock')
};
/**
 * confirm方法
 * @param {String} name 内容
 * @param {Object} obj layer的配置参数（可省略）
 * @param {Function} fun 回调方法
 */
function confirm(name, obj, fun) {
    if (typeof obj == 'function') {
        fun = obj
    }
    var option = {
        content: name
        , title: false
        , skin: 'msg'
        , scrollbar: false
        , shadeClose: true
        , closeBtn: false
        , btn: ['确定', '取消']
        , yes: function (index) {
            layer.close(index);
            fun ? fun() : null;
        }
    }
    option = $.extend({}, option, obj)
    //询问框
    layer.open(option)
};
/**
 * alert方法
 * @param {String} name 内容
 * @param {Object} obj layer的配置参数（可省略）
 * @param {Function} fun 回调方法
 */
function alert(name, obj, fun) {
    if (typeof obj == 'function') {
        fun = obj
    }
    var option = {
        content: name
        , title: false
        , skin: 'msg'
        , scrollbar: false
        , shadeClose: true
        , closeBtn: false
        , btn: ['确定']
        , yes: function (index) {
            layer.close(index);
            fun ? fun() : null;
        }
    }
    option = $.extend({}, option, obj)
    //询问框
    layer.open(option)
};
/**
 * 弹出提示框
 * option.icon=0是对号，1是X,2是！,3是？,不写icon参数则没有icon
 * option.time是自动结束事件时间，0的话意味着立即结束
 * option.end是弹出层关闭后的回调函数
 * @param {String} content 弹出框内容文字
 * @param {Object} options layer的参数配置
 */
function toast(content, options) {
    var defaults = { time: 2000, shadeClose: true, type: 1, title: false, closeBtn: 0, resize: false, scrollbar: false, skin: 'toast' };
    $.extend(true, defaults, options);
    var template = '<div class="toast__inner">'
    if (!Type.isUndefined(defaults.icon)) {
        var icons = ['toast-correct__white', 'toast-error__white', 'toast-warn__white', 'toast-question__white']//0是对号，1是X,2是！,3是？
        template += '<div class="toast-icon"><i class="' + icons[defaults.icon] + '"></i></div>'
    }
    template += '<div class="toast-text">' + content + '</div></div>'
    defaults.content = template
    layer.open(defaults)
};
/**
 * 弹出loading提示框
 * 与toast方法类似
 * 再次输入该方法会关闭loading层
 * 如：
 * loading() 弹出loading()层
 * 要弄的事情完毕后再次输入loading()，会关闭之前的loading()层
 * @param {String} content 弹出框内容文字
 * @param {Object} options layer的参数配置
 */
function loading(content, options) {
    if (!Type.isUndefined(window.layerIndex)) {
        layer.close(window.layerIndex)
        window.layerIndex = undefined
        return false
    }
    if (Type.isUndefined(content)) {
        content = '加载中';
    }
    var defaults = { time: false, shadeClose: false, type: 1, title: false, closeBtn: 0, resize: false, scrollbar: false, skin: 'loading' };
    $.extend(true, defaults, options);
    var template = '<div class="toast__inner">'
    template += '<div class="toast-icon"><i class="toast-loading__white anim-rotate anim-loop"></i></div>'
    template += '<div class="toast-text">' + content + '</div></div>'
    defaults.content = template
    window.layerIndex = layer.open(defaults)
};

/**
 * 用于判断参数类型
 * Type内部有isNull等等的判断方法
 * @param {All} o 需要判断类型的参数
 */
function Type(o) {
    var s = Object.prototype.toString.call(o)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
};
['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp', 'NaN', 'Infinite'].forEach(function (t) {
    Type['is' + t] = function (o) {
        return Type(o) === t.toLowerCase()
    }
});