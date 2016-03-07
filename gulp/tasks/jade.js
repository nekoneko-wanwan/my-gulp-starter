var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    conf = require('../config').jade;

gulp.task(conf.taskName, function () {
  return gulp.src(conf.src)
    .pipe($.plumber())
    .pipe($.jade(conf.jadeOption))
    .pipe(gulp.dest(conf.dest));
});