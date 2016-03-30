var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    fs   = require('fs'),
    conf = require('../config').js,
    loadJsonSync = function(filename) {
      return JSON.parse(fs.readFileSync(filename, 'utf8'));
    },
    json = {}; // 設定ファイルの格納場所

/* concat前のファイル郡をコピー */
gulp.task(conf.taskName + ':copy', function() {
  json = loadJsonSync(conf.src);
  if (conf.jsCopy !== false) {
    gulp.src(json.srcList).pipe(gulp.dest(conf.jsCopy));
  }
});

/* concat task (処理前にコピータスクを実行) */
gulp.task(conf.taskName + ':concat',  [conf.taskName + ':copy'], function() {
  return gulp.src(json.srcList)
    .pipe($.plumber())
    .pipe($.concat(json.concatName))
    .pipe(gulp.dest(json.dest));
});

/* uglify task */
gulp.task(conf.taskName + ':uglify', function() {
  return gulp.src(json.dest + json.concatName)
    .pipe($.plumber())
    .pipe($.if(conf.uglify, $.uglify({
      preserveComments: 'some' // ! から始まるコメントを残すオプションを追加
    })))
    .pipe(gulp.dest(json.dest));
});

/* concatしてからuglifyする基本タスク */
gulp.task(conf.taskName, [conf.taskName + ':concat'], function () {
  gulp.start([conf.taskName + ':uglify']);
});
