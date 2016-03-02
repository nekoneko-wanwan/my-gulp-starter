var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    conf = require('../config').clean;

gulp.task(conf.taskName, function () {
  return gulp.src(conf.targetPath, { read: false }).pipe($.rimraf());
});
