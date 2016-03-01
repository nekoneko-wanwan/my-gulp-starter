var baseConf = {
      srcDir: 'src/',
      distDir: 'html/'
    };

var ssi = require('browsersync-ssi');

// var path = require('path');
// var relativePathToJs = path.relative('.', 'js');

module.exports = {
  sass: {
    taskName: 'sass',
    src:  baseConf.srcDir + 'scss/**/*.scss',
    dest: baseConf.distDir + 'common/css/',
    sassOption: {
      style: 'expanded',  // nested, expanded, compact, compressed
      stopOnError: false,
      cacheLocation: './sass-cache'  // 最上位のgulpfile.jsから見た位置になる
    },
    autoprefixer: {
      browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
      cascade: false
    },
    csscomb: false
  },

  browserSync: {
    taskName: 'server',
    init: {
      server: {
        baseDir: baseConf.distDir,
        directory: false,
        middleware: [
          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
          }
        ],
      },
      open: false,
      notify: false,
      port: 9999,
    },
    ssi: {
      use: true,
      baseDir:  baseConf.distDir,
      ext: '.html'
    },
    proxy: {
      use: false,
      open: false,
      notify: false,
      port: 9999,
      proxy: "www.yahoo.co.jp/"
    },
    liveReload: {
      watch: true,
      targetPath: [
        baseConf.distDir + '**/*.html',
        baseConf.distDir + '**/*.css',
        baseConf.distDir + '**/*.js'
      ]
    }
  },


  /* ++++++++++++++++++ あと追加したいもの ++++++++++++++++++ */
  // sftpの差分のみをアップロードすることができないか
  // シーケンシャルに処理したい（多分コンパイルが全て終わったら実行する、という処理に処理しない適切に動作しないハズ）
  // どうしてもできなければAtomでsftpでhtml以下の同期をとる？
  /* ++++++++++++++++++ あと追加したいもの ++++++++++++++++++ */


  // browserSyncについてはbuildと同時にwatchしないと動作しなかったのでbrowserSyncで制御
  watch: {
    taskName: 'watch',
    sass: true
  },

  // タスク名は上述のtaskNameを指定する
  default: {
    sass: true,
    server: true,
    watch: true
  }
};
