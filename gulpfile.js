var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


var styleFiles = [
    'node_modules/normalize.css/normalize.css',
    'node_modules/animate.css/animate.css',
    'src/scss/all.scss'
];

var jsFiles = [
    'src/js/util.js',
    'src/js/slide.js'
];

gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('watch-js', ['js'], function() {
    browserSync.reload();
});

gulp.task('sass', function() {
    return gulp.src(styleFiles)
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'Last 2 versions', 'IE 8'],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('watch-sass', ['sass'], function() {
    browserSync.reload();
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['watch-js']);
    gulp.watch('src/scss/**/*.scss', ['watch-sass']);
    gulp.watch('build/**/*.html', browserSync.reload);
});

gulp.task('default', ['js', 'sass', 'serve', 'watch']);
