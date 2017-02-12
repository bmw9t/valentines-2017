require('dotenv').config();

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var sourcemaps = require('gulp-sourcemaps');
var include = require('gulp-include');
//@see https://www.npmjs.com/package/gulp-uglify
var uglify = require('gulp-uglify');
var pump = require('pump');

var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    name: 'Brandon - the Lady\'s Man',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('**/*.html')
    .pipe(connect.reload());
});

/**
 * Compile JS files from js/scripts.js using gulp-include
 */
gulp.task('scripts', function() {
    pump([
        gulp.src(['./src/*.js']),
        include(),
        gulp.dest('./src/build/'),
    ]);
});

gulp.task('compress', function(cb) {
    pump([
            gulp.src('src/build/*.js'),
            uglify(),
            gulp.dest('js')
        ],
        cb
    );
});

/**
 * Compile files from _scss into css (for live injecting)
 */
gulp.task('sass', function() {
    return gulp.src('_sass/main.scss')
        .pipe(sass({
            onError: connect.notify,
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('stylesheets'))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(connect.reload({
            stream: true
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch(['*.html'], ['html']);
    gulp.watch('_sass/*.scss', ['sass']);
    gulp.watch('src/*.js', ['scripts', 'compress']);
});

gulp.task('default', ['connect', 'watch']);
