var gulp = require('gulp');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var clean = require('gulp-clean');

gulp.task('deploy-files', ['bundle'], function(callback) {
  return runSequence(
    'remove-js',
    ['compress'],
    callback
  );
});

gulp.task('remove-js', function(callback) {
	console.log("removing");
  return gulp.src('src/utils/**.js', {read: false})
        .pipe(clean());
});
