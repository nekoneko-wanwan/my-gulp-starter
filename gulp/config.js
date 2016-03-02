var baseConf = {
      srcDir: 'src/',
      distDir: 'html/'
    };

// プロパティは変更不可
module.exports = {
  // meta css
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
    csscomb: false,
    // sassファイルをdestとは別にコピーする
    srcCopy: {
      use: false,
      dest: baseConf.distDir + 'common/scss/'
    }
  },

  // html template
  jade: {
    taskName: 'jade',
    src: [
      baseConf.srcDir + 'jade/**/*.jade',
      "!" + baseConf.srcDir + 'jade/**/_*.jade' // partialファイルを除外
    ],
    dest: baseConf.distDir,
    jadeOption: {
      pretty: true
    }
  },

  // static server, or proxy server
  browserSync: {
    taskName: 'server',
    init: {
      server: {
        // middlewareはbrowserSync.jsの方で管理（ほぼ変更がないため）
        baseDir: baseConf.distDir,
        directory: false
      },
      open: false,
      notify: false,
      port: 9999,
    },
    ssi: {
      use: true,
      baseDir: baseConf.distDir,
      ext: '.html'
    },
    // use: trueでinit, ssiは無視される
    proxy: {
      use: false,
      open: true,
      notify: false,
      port: 9999,
      proxy: "www.yahoo.co.jp/"
    },
    // ライブリロードは単体では実行不可（watchタスク内で使用する）
    reload: {
      taskName: 'reload',
      watchPath: [
        baseConf.distDir + '**/*.html',
        baseConf.distDir + '**/*.css',
        baseConf.distDir + '**/*.js'
      ]
    }
  },

  // sftp
  // サーバの接続情報は.sftpconfig.jsonで管理する
  sftp: {
    taskName: 'sftp',
    // watch対象
    watchPath: [
      baseConf.distDir + '**'
      // 対象から外す記述サンプル
      // '!' + baseConf.distDir + '**/*.html'
    ],
    // アップするファイル群
    localPath: [
      baseConf.distDir + '**'
    ],
    confFile: './.sftpconfig.json'
  },

  // コンパイルされたものをまとめて削除するのに使う
  // 依存関係は考慮していないため、watchやdefaultで使用するとtargetPathがwatch対象から外れることがある
  // clean->watch->sassでファイルが再生成のケースだと、watch時に対象が見つからない
  clean: {
    taskName: 'clean',
    targetPath: [
      baseConf.distDir + 'common/scss/',
      baseConf.distDir + 'common/css/'
    ]
  },

  // file watching
  watch: {
    taskName: 'watch',
    // 各taskNameをプロパティに指定
    tasks: {
      sass: true,
      jade: false,
      sftp: false,
      reload: true
    }
  },

  // CLI -> gulp
  default: {
    // tasks前に処理したいタスクをtaskNameで指定
    buildBefore: ['server'],

    // 依存関係は考慮していないのでタイミングによっては無駄なタスクが走る場合がある
    // 各taskNameをプロパティに指定
    tasks: {
      sass: true,
      jade: false,
      sftp: false,
      watch: true
    }
  }
};
