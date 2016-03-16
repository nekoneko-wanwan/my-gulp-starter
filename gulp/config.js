var baseConf = {
      srcDir: 'src/',
      distDir: 'html/',
      sftpconfig: './.sftpconfig.json'  // SFTPを使用する場合のサーバの接続情報
    };

// プロパティは変更不可
module.exports = {
  /************************************************
   * sass
   ************************************************/
  sass: {
    taskName: 'sass',
    src: baseConf.srcDir + 'scss/**/*.scss', // v2.xでは、glob pattern (source/**/*.scss)はコンパイルされ、ディレクトリ指定は無効に
    dest: baseConf.distDir + 'common/css/',
    sassOption: {
      style: 'expanded',  // nested, expanded, compact, compressed
      stopOnError: false,
      cacheLocation: './.sass-cache'  // 最上位のgulpfile.jsから見た位置になる
    },
    autoprefixer: {
      browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
      cascade: false
    },
    csscomb: false,
    // sassファイルをdestとは別にコピーしたいときに使用
    srcCopy: {
      use: false,
      dest: baseConf.distDir + 'common/scss/'
    },
    // sc5-styleguideを使用
    styleguide: {
      use: true,
      taskName: {
        base: 'guide',
        generate: 'guide:generate',
        apply: 'guide:apply'
      },
      options: {
        title: 'My Styleguide',
        server: true,
        port: 9000, // localhost:portでstyleguideにアクセスできる
        rootPath: 'styleguide/html/',
        overviewPath: 'styleguide/overview.md'
      },
      dest: 'styleguide/html/'
    }
  },


  /************************************************
   * jade
   ************************************************/
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


  /************************************************
   * static server, or proxy server
   ************************************************/
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
      proxy: "192.168.33.40/php/test/",  // .sftpconfig.jsonのremotePathと合わせる
      open: false,
      notify: false,
      port: 9999
    },
    // ライブリロードはwatchタスク内で使用
    reload: {
      taskName: 'reload',
      watchPath: [
        baseConf.distDir + '**/*.html',
        baseConf.distDir + '**/*.css',
        baseConf.distDir + '**/*.js'
      ]
    }
  },


  /************************************************
   * SFTP関係
   ************************************************/
  // ドキュメントルート以下を全てSFTPアップロード
  sftp: {
    taskName: 'sftp:all',
    serverInfo: baseConf.sftpconfig,
    localPath: [
      baseConf.distDir + '**'
    ]
  },

  // 差分sftp + liveReload
  // watch内でのみ使用を想定しているため、タスクとして単独実行できない
  // 監視対象はライブリロードのwatchPathを流用（その中で更新されたファイルがアップロード
  sftpReload: {
    serverInfo: baseConf.sftpconfig,
    baseDir: baseConf.distDir
  },


  /************************************************
   * コンパイルされたものをまとめて削除
   ************************************************/
  // 依存関係は考慮していないため、watchやdefaultで使用するとtargetPathがwatch対象から外れることがある
  // clean->watch->sassでファイルが再生成のケースだと、watch時に対象が見つからない
  clean: {
    taskName: 'clean',
    targetPath: [
      baseConf.distDir + 'common/scss/',
      baseConf.distDir + 'common/css/'
    ]
  },


  /************************************************
   * watch
   ************************************************/
  // 細かく条件を変えたいため、watch.js内で更にタスクを定義
  watch: {
    taskName: 'watch',
    useWatchTaskName: 'watch-sass'  // watch.jsで設定した小タスクを指定
  },


  /************************************************
   * default
   ************************************************/
  default: {
    // tasks前に処理したいタスクをtaskNameで指定
    beforeTask: ['server'],

    // 依存関係は考慮していないのでタイミングによっては無駄なタスクが走る場合がある
    // 各taskNameをプロパティに指定
    tasks: {
      sass: true,
      guide: true, // use:trueになっている必要がある
      jade: false,
      'sftp:all': false,
      watch: true
    }
  }
};
