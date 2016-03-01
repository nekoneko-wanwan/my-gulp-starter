var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    conf = require('../config').sass;

gulp.task(conf.taskName, function () {
  return $.rubySass(conf.src, conf.sassOption)
    .pipe($.if(conf.autoprefixer, $.autoprefixer(conf.autoprefixer)))
    .pipe($.if(conf.csscomb, $.csscomb()))
    .pipe(gulp.dest(conf.dest));
});

