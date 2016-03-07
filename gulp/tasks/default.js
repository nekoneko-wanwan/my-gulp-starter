var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    conf = require('../config'),
    def  = conf.default,
    beforeTask = def.beforeTask;

// タスク処理まえに実行しておくタスクを指定
gulp.task('default', beforeTask, function() {
  for (var prop in def.tasks) {
    if (def.tasks[prop] === true) {
      gulp.start([prop]);
    }
  }
});
