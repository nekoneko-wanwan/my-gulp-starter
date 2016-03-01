var gulp = require('gulp'),
    requireDir = require('require-dir');

// recurse: true で再帰処理（更に下でディレクトリを切りたいときに使う）
requireDir('./gulp/tasks', {recurse: false});