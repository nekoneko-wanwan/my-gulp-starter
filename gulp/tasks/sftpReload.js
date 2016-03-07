var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    fs   = require('fs'),
    conf = require('../config'),
    loadJsonSync = function(filename) {
      return JSON.parse(fs.readFileSync(filename, 'utf8'));
    };

/**
 * 変更したファイルをSFTPでアップロードしてブラウザをリロードする
 * watch内で使用する関数のため、module化して外に出す
 * リモート側に指定したディレクトリがない場合はアップできない（windowsのみ？
 * @param  {string} localPath アップロードするファイル
 * @param  {string} remotePath アップロード先（ティレクトリ）
 */
module.exports = function(localPath, remotePath) {
  var settingFile = loadJsonSync(conf.sftpReload.serverInfo);
  if (remotePath) {
    settingFile.remotePath += remotePath;
  }
  gulp.task('sftpReload_sftp', function() {
    return gulp.src(localPath).pipe($.sftp(settingFile));
  });
  gulp.task('sftpReload_reload', ['sftpReload_sftp'], function() {
    gulp.start([conf.browserSync.reload.taskName]);
  });
  return gulp.start(['sftpReload_reload']);
};
