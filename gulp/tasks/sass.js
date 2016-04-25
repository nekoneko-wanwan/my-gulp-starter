var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    conf = require('../config').sass;

gulp.task(conf.taskName, function () {
  if (conf.sassCopy !== false) {
    gulp.src(conf.src).pipe(gulp.dest(conf.sassCopy));
  }

  return $.rubySass(conf.src, conf.sassOption)
    .pipe($.pleeease(conf.pleeease))
    .pipe($.if(conf.csscomb, $.csscomb()))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulp.dest(conf.cssCopyToKss));
});

