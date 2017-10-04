var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy-files', function(callback) {
  return runSequence(
    'compress',
    ['deploy-min-js', 'remove-js', 'rename-min'],
    callback
  );
});

gulp.task('deploy-min-js', [], function(callback) {
  console.log("deploying");
});

gulp.task('remove-js', [], function(callback) {
  console.log("removing js");
});

gulp.task('rename-min', function(callback) {
  console.log("Renaming minfiles to js");
});