var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    sg   = require('sc5-styleguide'),
    conf = require('../config').sass,
    // タスク名のショートハンド
    t = {
      sass: conf.taskName,
      sg: conf.styleguide.taskName
    }

/**
 * [注意事項]
 * 普通のsassのコンパイルにはgulp-ruby-sassを使用しているが、
 * styleguideの生成にはgulp-sassを使用している
 * ※ruby-sassを使うとgulp.srcにglobを使った場合に、sc5-styleguideが対応していないため
 */

// sassのコンパイルタスク
gulp.task(t.sass, function () {
  // copyオプションが有効であれば
  if (conf.srcCopy.use === true) {
    gulp.src(conf.src).pipe(gulp.dest(conf.srcCopy.dest));
  }
  return $.rubySass(conf.src, conf.sassOption)
    .pipe($.if(conf.autoprefixer, $.autoprefixer(conf.autoprefixer)))
    .pipe($.if(conf.csscomb, $.csscomb()))
    .pipe(gulp.dest(conf.dest));
});

// styleguideの生成タスク
gulp.task(t.sg.generate, function() {
  return gulp.src(conf.src)
    .pipe(sg.generate(conf.styleguide.options))
    .pipe(gulp.dest(conf.styleguide.dest));
});

// ソースのコンパイル
gulp.task(t.sg.apply, function() {
  return gulp.src(conf.src)
    .pipe($.sass({errLogToConsole: true}))
    .pipe(sg.applyStyles())
    .pipe(gulp.dest(conf.styleguide.dest));
});

// watchに登録するための、生成とリロードを兼ねたタスク
gulp.task(t.sg.base, function() {
  // useがtrueでなければ何も返さない
  if (conf.styleguide.use === false) {
    return;
  }
  return gulp.start([t.sg.generate, t.sg.apply]);
});
