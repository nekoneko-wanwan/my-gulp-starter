var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    fs = require('fs'),
    conf = require('../config').sftp,
    loadJsonSync = function(filename) {
      return JSON.parse(fs.readFileSync(filename, 'utf8'));
    };

gulp.task(conf.taskName, function() {
  // 設定ファイルの読み込み
  var sftpConf = loadJsonSync(conf.confFile);
  return gulp.src(conf.localPath).pipe($.sftp(sftpConf));
});
