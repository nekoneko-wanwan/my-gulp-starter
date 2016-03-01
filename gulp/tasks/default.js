var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    conf = require('../config').default;

gulp.task('default', function() {
  var val;
  for (prop in conf) {
    if (conf[prop] === true) {
      gulp.start([prop]);
    }
  }
});
