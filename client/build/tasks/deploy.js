var gulp = require('gulp'),
    uglify = require('gulp-uglify-es').default,
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
    return 0;
});

gulp.task('deploy-all', function(callback) {
  return runSequence(
    'deploy-utils',
    ['deploy-dashboard', 'deploy-entryform', 'deploy-login', 'deploy-statistics'],
    callback
  );
});

gulp.task('deploy-utils', function () {
    return gulp.src('./src/utils/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/src/utils/'))
        .pipe(gulp.dest('./src/utils/'));
});

gulp.task("deploy-dashboard", function () {
    return gulp.src("./src/components/dashboard/*.js")
        .pipe(uglify(/* options */))
        // .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./dist/src/components/dashboard/"))
        .pipe(gulp.dest("./src/components/dashboard/"));
});

gulp.task("deploy-entryform", function () {
    return gulp.src("./src/components/entryform/*.js")
        .pipe(uglify(/* options */))
        // .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./dist/src/components/entryform/"))
        .pipe(gulp.dest("./src/components/entryform/"));
});

gulp.task("deploy-login", function () {
    return gulp.src("./src/components/login/*.js")
        .pipe(uglify(/* options */))
        // .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./dist/src/components/login/"))
        .pipe(gulp.dest("./src/components/login/"));
});

gulp.task("deploy-statistics", function () {
    return gulp.src("./src/components/statistics/*.js")
        .pipe(uglify(/* options */))
        // .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./dist/src/components/statistics/"))
        .pipe(gulp.dest("./src/components/statistics/"));
});