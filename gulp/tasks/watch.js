var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    conf = require('../config'),
    w = conf.watch;

// Use 'gulp-watch' package (watching for after new files)
// Run all task watch
gulp.task(w.taskName, function() {
  for (var prop in w.tasks) {
    // false時はスルー
    if (w.tasks[prop] === false) {
      continue;
    }

    // タスクによって処理を変更する
    switch (prop) {
      // sass
      case conf.sass.taskName:
        $.watch(conf.sass.src, function() {
          gulp.start([conf.sass.taskName]);
        });
        break;

      // jade
      case conf.jade.taskName:
        $.watch(conf.jade.src, function() {
          gulp.start([conf.jade.taskName]);
        });
        break;

      // sftp
      case conf.sftp.taskName:
        $.watch(conf.sftp.watchPath, function() {
          gulp.start([conf.sftp.taskName]);
        });
        break;

      // liveReload
      case conf.browserSync.reload.taskName:
        gulp.watch(conf.browserSync.reload.watchPath, function() {
          gulp.start([conf.browserSync.reload.taskName]);
        });
        break;

      default:
        break;
    }
  }
});
