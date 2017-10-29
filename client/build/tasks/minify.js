var gulp = require('gulp'),
    uglify = require('gulp-uglify-es').default,
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
    return 0;
});

gulp.task('minify-all', function(callback) {
  return runSequence(
    'minify-utils',
    ['minify-dashboard', 'minify-entryform', 'minify-login', 'minify-statistics'],
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

gulp.task("minify-entryform", function () {
    return gulp.src("./src/components/entryform/*.js")
        .pipe(uglify(/* options */))
        // .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./dist/src/components/entryform/"));
});

gulp.task("minify-login", function () {
    return gulp.src("./src/components/login/*.js")
        .pipe(uglify(/* options */))
        // .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./dist/src/components/login/"));
});

gulp.task("minify-statistics", function () {
    return gulp.src("./src/components/statistics/*.js")
        .pipe(uglify(/* options */))
        // .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./dist/src/components/statistics/"));
});