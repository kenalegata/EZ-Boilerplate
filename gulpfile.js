var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  .pipe(gulp.dest('build'))
  .pipe(browserSync.stream());
});

gulp.task('sass:dev', function () {
  return gulp.src('./app/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:production', function () {
 return gulp.src('./app/assets/sass/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./build'));
});

gulp.task('serve', ['nunjucks', 'sass:dev'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("./app/assets/sass/*.scss", ['sass:dev']);
    gulp.watch("./app/**/*.nunjucks", ['nunjucks']);  
});
