var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    conf = require('../config').guide;

/* kss-nodeを利用したガイド生成 */
gulp.task(conf.taskName, $.shell.task(conf.cmd, {templateData: conf.templateData}));
