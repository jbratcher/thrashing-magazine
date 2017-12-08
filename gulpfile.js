// Require Gulp, Sass, and browser-sync

const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Build dist from src

gulp.task('build', function() {
    return gulp.src(["src/**"])
        .pipe(gulp.dest("dist"));
});

// Compile Sass & Inject Into Browser

gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js

gulp.task('js', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(gulp.dest("src/js"))
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

// Move Fonts to src/fonts

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
});

// Move Font Awesome CSS to src/css

gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
});

// Gulp default tasks

gulp.task('default', ['sass', 'js','serve', 'fa', 'fonts']);


