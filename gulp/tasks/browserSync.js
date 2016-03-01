var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    ssi = require('browsersync-ssi');
    conf = require('../config').browserSync,

gulp.task(conf.taskName, function() {
  // ssiが有効であれば、
  if (conf.ssi.use === true) {
    conf.init.server.middleware.unshift(ssi(conf.ssi));
  }

  // server build
  if (conf.proxy.use === true) {
    browserSync.init(conf.proxy);
  } else {
    browserSync.init(conf.init);
  }

  // live reload
  if (conf.liveReload.watch === true) {
    gulp.watch(conf.liveReload.targetPath).on('change', browserSync.reload);
  }
});
