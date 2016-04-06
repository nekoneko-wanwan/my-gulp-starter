var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    conf = require('../config').kss;

/* ガイドのコンパイル */
gulp.task(conf.taskName.compile, $.shell.task(conf.compileCmd, {templateData: conf.templateData}));

/* ガイド用の静的サーバービルド */
gulp.task(conf.taskName.server,  $.shell.task(conf.serverBuildCmd));
