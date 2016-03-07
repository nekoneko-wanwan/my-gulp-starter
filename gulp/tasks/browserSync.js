var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    ssi         = require('browsersync-ssi'),
    conf        = require('../config'),
    bs          = conf.browserSync;

// Server build
gulp.task(bs.taskName, function() {
  // proxyモードであればそのままbuildして終了
  if (bs.proxy.use === true) {
    browserSync.init(bs.proxy);
    return;
  }

  // init.serverのプロパティに追加するmiddlewareオプションの設定
  var serverMiddleware = function() {
    var middleware = [
          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
          }
        ];
    // ssiが有効であれば、bs.ssiのオプションをmiddlewareに追加する
    if (bs.ssi.use === true) {
      middleware.unshift(ssi(bs.ssi));
    }
    return middleware;
  };
  // initにデータを追加更新
  bs.init.server['middleware'] = serverMiddleware();
  browserSync.init(bs.init);
});

// Server liveReload
gulp.task(bs.reload.taskName, function() {
  browserSync.reload();
});
