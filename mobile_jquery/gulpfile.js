var gulp = require('gulp');
// 获取 minify-css 模块（用于压缩 CSS）
var cleanCSS = require('gulp-clean-css');
// 获取 autoprefixer 模块(css的自动补全)
var autoprefixer = require('gulp-autoprefixer');

// 压缩js
gulp.task('js', function () {
    // 1. 找到文件
    return gulp.src('src/js/**/*.js')
        // 2. 压缩文件
        //      .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
});

// 压缩 css 文件 与 合并 css 文件
gulp.task('css', function () {
    // 1. 找到文件
    return gulp.src('src/css/style.css')
        // 2. autoprefixer
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%', 'IE 7', 'Android >= 2.2'],
            cascade: false, //是否美化属性值 默认：true 像这样：
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cleanCSS({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            format: 'keep-breaks',
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        // 5. 另存为压缩文件
        .pipe(gulp.dest('dist/css'))
});

// 压缩图片任务
gulp.task('img', function () {
    // 1. 找到图片
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('dist/img'))
});

// 移动页面浏览器顶部图标
gulp.task('ico', function () {
    // 1. 找到图片
    return gulp.src('src/**/*.ico')
        .pipe(gulp.dest('dist'))
});

// 把lib里面的东西转移到部署的dist里面
gulp.task('lib', function () {
    return gulp.src('src/lib/**/*').pipe(gulp.dest('dist/lib'));
});

// 把page里面的东西转移到部署的dist里面
gulp.task('page', function () {
    return gulp.src(['src/**/*.html'])
        .pipe(gulp.dest('dist'));
});

// 在命令行使用 gulp 启动 各种 任务
gulp.task('default', gulp.series(['css', 'js', 'img', 'lib', 'page', 'ico']));