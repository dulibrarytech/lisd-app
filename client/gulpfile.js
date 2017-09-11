// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory
//require('require-dir')('build/tasks');

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber');

gulp.task('default', function () {
    // return gulp.src('../../client/src/utils/*.js')
    //     .pipe(plumber())
    //     .pipe(uglify())
    //     .pipe(gulp.dest('../../client/src/utils/dist'));
    console.log("GULPFILE");
    return 0;
});

