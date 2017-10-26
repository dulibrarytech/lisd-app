var gulp = require('gulp'),
    uglify = require('gulp-uglify-es').default,
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
    return 0;
});

gulp.task('minify', function(callback) {
  return runSequence(
    'minify-utils',
    ['minify-dashboard'],
    callback
  );
});

gulp.task('minify-utils', function () {
    return gulp.src('./src/utils/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/src/utils/'));
});

gulp.task("minify-dashboard", function () {
    return gulp.src("./src/components/dashboard/*.js")
        .pipe(uglify(/* options */))
        // .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./dist/src/components/dashboard/"));
});