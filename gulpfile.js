const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const sass = require('gulp-dart-sass');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const googleWebFonts = require( 'gulp-google-webfonts' );
const gulpHandlebarsFileInclude = require('gulp-handlebars-file-include');
const cssbeautify = require('gulp-cssbeautify');
const htmlbeautify = require('gulp-html-beautify');
const validator = require('gulp-html');
const access = require('gulp-accessibility');
const isProd = process.env.NODE_ENV === 'prod';

var options = { };

const htmlFile = [
    'src/*.html'
]

const nothtmlFile = [
    'src/*.*',
    '!src/*.html'
]

function html() {
    return gulp.src(htmlFile)
        .pipe(gulpHandlebarsFileInclude({},{maxRecursion: 25}))
        .pipe(htmlbeautify())
        .pipe(gulpIf(isProd, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('public'));
}

function rootFiles() {
    return gulp.src(nothtmlFile)
        .pipe(gulp.dest('public'));
}

function css() {
    return gulp.src('src/assets/sass/style.scss')
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(cssbeautify({
            indent: '  ',
            openbrace: 'separate-line',
            autosemicolon: true
        }))
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulpIf(isProd, cssmin()))
        .pipe(gulp.dest('public/assets/css/'));
}

function js() {
    return gulp.src('src/assets/js/*.js')
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(concat('all.js'))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest('public/assets/js'));
}

function img() {
    return gulp.src('src/assets/img/*')
        .pipe(gulpIf(isProd, imagemin()))
        .pipe(gulp.dest('public/assets/img/'));
}

function fonts() {
    return gulp.src('src/assets/fonts/*.{eot,svg,ttf,woff,woff2}')
		.pipe(gulp.dest('public/assets/fonts/'));
}

function extras() {
    return gulp.src('src/assets/extras/*')
        .pipe(gulp.dest('public/assets/extras/'));
}

function fontAwesome() {
    return gulp.src('./node_modules/@fortawesome/**/*')
		.pipe(gulp.dest('public/assets/vendor/'));
}

function robots(){
    return gulp.src('robots.txt').pipe(gulp.dest('public'));
}


// function modernizr(){
//     gulp.task('modernizr', function() {
//         var settings = {
//           "options" : [
//             "setClasses",
//             "addTest",
//             "html5printshiv",
//             "testProp",
//             "fnBind"
//           ]
//         };
//         return gulp.src('public/assets/js/*.js')
//           .pipe(modernizr('outputFileName.js', settings))
//           .pipe(gulp.dest('node_modules/modernizr/'))
//       });
// }

// function babel(){
//     gulp.task("default", function () {
//         return gulp.src("src/app.js")
//           .pipe(babel({
//             presets: ["@babel/preset-env"]
//           }))
//           .pipe(gulp.dest('public'));
//       });
// }

function serve() {
    browserSync.init({
        open: true,
        notify: false,
        server: './public'
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watchFiles() {
    gulp.watch(htmlFile, gulp.series(html, browserSyncReload));
    gulp.watch(nothtmlFile, gulp.series(rootFiles, browserSyncReload));
    gulp.watch('src/assets/**/*.scss', gulp.series(css, browserSyncReload));
    gulp.watch('src/assets/**/*.js', gulp.series(js, browserSyncReload));
    gulp.watch('src/assets/**/*.html', gulp.series(js, browserSyncReload));
    gulp.watch('src/assets/extras/*.*', gulp.series(extras, browserSyncReload));
    gulp.watch('src/assets/img/**/*.*', gulp.series(img));
    gulp.watch('src/assets/**/*.{eot,svg,ttf,woff,woff2}', gulp.series(fonts));
    gulp.watch('src/assets/vendor/**/*.*', gulp.series(fontAwesome));
    gulp.watch('src/assets/partials/*.*', gulp.series(html, browserSyncReload));

    return;
}

function del() {
    return gulp.src('public/*', {read: false})
        .pipe(clean());
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.fonts = fonts;
exports.rootFiles = rootFiles;
exports.extras = extras;
exports.fontAwesome = fontAwesome;
exports.del = del;

exports.serve = gulp.parallel(html, css, js, img, fonts, rootFiles, extras, fontAwesome, babel, watchFiles, serve);
exports.default = gulp.series(del, html, css, js, fonts, rootFiles, extras, img, fontAwesome);

gulp.task('wcag', function() {
    return gulp.src('./public/**/*.html')
        .pipe(access({
        force: true
        }))
        .on('error', console.log);
});

gulp.task('htmlvalidation', function() {
    return gulp.src('./public/**/*.html')
        .pipe(validator({verbose:true}));
});