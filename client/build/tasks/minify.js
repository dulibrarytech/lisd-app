
var gulp = require('gulp');
var minify = require('gulp-minify');
 
gulp.task('compress', function() {
		console.log("Compress");
	  gulp.src('dist/utils/*.js')
	    .pipe(minify({
	        ext:{
	        	src:'-debug.js',
	            min:'.js'
	        },
	        exclude: ['tasks'],
	        ignoreFiles: []
	    }))
	    //.pipe(gulp.dest('dist/utils'))
	    .pipe(gulp.dest('src/utils'))

	   //  // Compress dashboard
	   //  gulp.src([
	  		
	  	// ])
	   //  .pipe(minify({
	   //      ext:{
	   //          min:'.min.js'
	   //      },
	   //      exclude: ['tasks'],
	   //      ignoreFiles: []
	   //  }))
	   //  .pipe(gulp.dest(''))

	   //  // Compress entryform
	   //  gulp.src([
	  		
	  	// ])
	   //  .pipe(minify({
	   //      ext:{
	   //          min:'.min.js'
	   //      },
	   //      exclude: ['tasks'],
	   //      ignoreFiles: []
	   //  }))
	   //  .pipe(gulp.dest(''))

	   //  // Compress login
	   //  gulp.src([
	  		
	  	// ])
	   //  .pipe(minify({
	   //      ext:{
	   //          min:'.min.js'
	   //      },
	   //      exclude: ['tasks'],
	   //      ignoreFiles: []
	   //  }))
	   //  .pipe(gulp.dest(''))

	   //  // Compress statistics
	   //  gulp.src([
	  		
	  	// ])
	   //  .pipe(minify({
	   //      ext:{
	   //          min:'.min.js'
	   //      },
	   //      exclude: ['tasks'],
	   //      ignoreFiles: []
	   //  }))
	   //  .pipe(gulp.dest(''))
});