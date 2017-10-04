
var gulp = require('gulp');
var minify = require('gulp-minify');
 
gulp.task('compress', function() {
	  gulp.src([
	  		'dist/utils/SystemUtils.js'
	  	])
	    .pipe(minify({
	        ext:{
	            src:'-debug.js',
	            min:'.js'
	        },
	        exclude: ['tasks'],
	        ignoreFiles: []
	    }))
	    .pipe(gulp.dest('src/dist'))
});