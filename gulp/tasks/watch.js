var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    fs   = require('fs'),
    path = require('path'),
    conf = require('../config'),
    w    = conf.watch,
    loadJsonSync = function(filename) {
      return JSON.parse(fs.readFileSync(filename, 'utf8'));
    };


/************************************************
 * watchのパターンごとにタスクを作成
 ************************************************/


/************************************************
* - sassのコンパイル
* - styleguideの生成
* - ライブリロード
************************************************/
gulp.task('watch-sass', function() {
  $.watch(conf.sass.src, function() {
    gulp.start([conf.sass.taskName, conf.sass.styleguide.taskName.base]);
  });
  $.watch(conf.browserSync.reload.watchPath, function() {
    gulp.start([conf.browserSync.reload.taskName]);
  });
});


/************************************************
* - sassのコンパイル
* - styleguideの生成
* - jadeのコンパイル
* - ライブリロード
************************************************/
gulp.task('watch-sass-jade', function() {
  $.watch(conf.sass.src, function() {
    gulp.start([conf.sass.taskName, conf.sass.styleguide.taskName.base]);
  });
  $.watch(conf.jade.src, function() {
    gulp.start([conf.jade.taskName]);
  });
  $.watch(conf.browserSync.reload.watchPath, function() {
    gulp.start([conf.browserSync.reload.taskName]);
  });
});


/************************************************
* - sassのコンパイル
* - styleguideの生成
* - jadeのコンパイル
* - SFTPによる差分アップデート
* - ライブリロード
************************************************/
gulp.task('watch-sass-jade-sftp', function() {
  $.watch(conf.sass.src, function() {
    gulp.start([conf.sass.taskName, conf.sass.styleguide.taskName.base]);
  });
  $.watch(conf.jade.src, function() {
    gulp.start([conf.jade.taskName]);
  });

  // 監視対象に変更があったらSFTPでアップしてからリロード
  // 複数ファイルが同時に変更されたらリロードのタイミングはズレるかも
  gulp.watch(conf.browserSync.reload.watchPath, function(e) {
    // 変更ファイルのpathを取得
    // c:/Users/...始まりだが動作に影響はないためこのまま
    var localPath  = e.path;

    // アップロード先のpathを取得
    // sftpconfig.jsonのremotePathに追加する前提
    // そのためベースディレクトリ以下からファイルまでのディレクトリ名を取得（ベースディレクトリを除く）
    // ディレクトリを指定するためファイル名（最後の/以下）は削除する
    var remotePath = path.relative(conf.sftpReload.baseDir, path.dirname(e.path)).replace(/\\/g, '/') + '/';

    var sftp = require('./sftpReload.js');
    sftp(localPath, remotePath);
  });
});


/************************************************
* configで指定した小タスクをwatchタスクとして実行
************************************************/
gulp.task(w.taskName, function() {
  gulp.start([w.useWatchTaskName]);
});
