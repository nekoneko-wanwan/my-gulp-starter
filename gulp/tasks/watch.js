var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    conf = require('../config'),
    w = conf.watch;

// Use 'gulp-watch' package (watching for after new files)
// Run all task watch
gulp.task(w.taskName, function() {

  if (w.sass === true) {
    $.watch(conf.sass.src, function() {
      gulp.start([conf.sass.taskName]);
    });
  }

});
