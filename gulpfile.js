// Require Gulp, Sass, and browser-sync

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const useref        = require('gulp-useref');
const uglify        = require('gulp-uglify');
const gulpIf        = require('gulp-if');
const cssnano       = require('gulp-cssnano');
const imagemin      = require('gulp-imagemin');
const cache         = require('gulp-cache');
const del           = require('del');
const browserSync   = require('browser-sync').create();

// Build dist from src

gulp.task('build:dist', function() {
    return gulp.src(["src/**"])
        .pipe(gulp.dest("dist"));
});

// Clean Dist foler

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// Build JS, CSS and minify

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimize Images and cache

gulp.task('img', function(){
  return gulp.src('src/img/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
          interlaced: true
        })))
  .pipe(gulp.dest('dist/images'));
});


// Compile Sass & Inject Into Browser

gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Watch Sass, JS && Serve

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src",
        port: 8082     // Change port as needed, 8082 is for Cloud 9 workspace
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
});

// Move Static Files from node modules to src folders

// Move Fonts to src/fonts

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

// Move Font Awesome CSS to src/css

gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

// Gulp default tasks

gulp.task('default', ['useref', 'serve', 'sass', 'fonts', 'fa', 'img']);

gulp.task('build', ['clean:dist', 'build:dist', 'useref', 'serve', 'sass', 'fonts', 'fa', 'img']);

