var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    conf = require('../config').sass;

gulp.task(conf.taskName, function () {
  if (conf.srcCopy.use === true) {
    gulp.src(conf.src).pipe(gulp.dest(conf.srcCopy.dest));
  }

  return $.rubySass(conf.src, conf.sassOption)
    .pipe($.if(conf.autoprefixer, $.autoprefixer(conf.autoprefixer)))
    .pipe($.if(conf.csscomb, $.csscomb()))
    .pipe(gulp.dest(conf.dest));
});

