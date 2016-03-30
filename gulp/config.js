var baseConf = {
      srcDir: 'src/',
      distDir: 'html/',
      taskName: {
        sass: 'sass',
        kssGuide: 'guide',
        jade: 'jade',
        js: 'js',
        bsServer: 'server',
        bsReload: 'reload',
        sftp: 'sftp:all',
        clean: 'clean',
        watch: 'watch',
      },
      jsconfig: './.js-concat-config.json',  // jsを結合する場合の設定情報
      sftpconfig: './.sftpconfig.json'  // SFTPを使用する場合のサーバの接続情報
    };
// ショートハンド
var n = baseConf.taskName;


// プロパティは変更不可
module.exports = {
  /************************************************
   * sass
   ************************************************/
  sass: {
    taskName: n.sass,
    src:  baseConf.srcDir + 'scss/**/*.scss',
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
    sassCopy: false,  // or baseConf.distDir + 'common/scss/'
    // コンパイルしたcssをkssで読み込む用に、kssのドキュメントルート以下にコピー
    cssCopyToKss: './kss/html/'
  },


  /************************************************
   * kss guide
   * watchには含めない（sassでコンパイルされたcssを直接見ているので手でリロードすれば反映される）
   ************************************************/
  guide: {
    taskName: n.kssGuide,
    cmd: [
      // kss-node compile
      'kss-node <%= source %> --homepage <%= mdFile%> <%= destination %> --template <%= template%> --css <%= cssfile %>',
      // kss用server build (my-gulp-starterがドキュメントルートとなる)
      // 'localhost/kss/html/'にアクセスするとスタイルガイドが見れる
      'http-server -p 9000 --silent'
    ],
    templateData: {
      source: baseConf.srcDir + 'scss/',
      destination: './kss/html/',
      template: './kss/template/',
      mdFile: '../../kss/styleguide-intro.md',
      cssfile: 'style.css'  // /kss/html/を基準としたパスになる（上記のcssCopyToKssで生成したファイルへのリンク）
    }
  },


  /************************************************
   * jade
   ************************************************/
  jade: {
    taskName: n.jade,
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
   * js Concat
   ************************************************/
  js: {
    taskName: n.js,
    src: baseConf.jsconfig,
    jsCopy: baseConf.distDir + 'common/js/pre_concat/', // or false, concatする前のファイルをコピーする
    uglify: true
  },


  /************************************************
   * static server, or proxy server
   ************************************************/
  browserSync: {
    taskName: n.bsServer,
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
      taskName: n.bsReload,
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
    taskName: n.sftp,
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
    taskName: n.clean,
    targetPath: [
      baseConf.distDir + 'common/scss/',
      baseConf.distDir + 'common/css/',
      baseConf.distDir + 'common/js/pre_concat/'
    ]
  },


  /************************************************
   * watch
   ************************************************/
  // 細かく条件を変えたいため、watch.js内で更にタスクを定義
  watch: {
    taskName: n.watch,
    useWatchTaskName: 'watch-sass'  // watch.jsで設定した小タスクを指定
  },


  /************************************************
   * default
   ************************************************/
  default: {
    // 各taskNameはES6記法で簡潔に指定している
    // tasks前に処理したいタスクを指定
    beforeTask: [n.bsServer],
    // 依存関係は考慮していないのでタイミングによっては無駄なタスクが走る場合がある
    tasks: {
      [n.sass]: true,
      [n.kssGuide]: true,
      [n.jade]: false,
      [n.js]: true,
      [n.sftp]: false,
      [n.watch]: true
    }
  }
};
