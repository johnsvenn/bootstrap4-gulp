
var paths = {
    'SOURCE': './resources/assets/',
    'DEST_CSS': './public/css/',
    'DEST_JS': './public/js/',
    'NODE': './node_modules/',
};


var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var rev = require('gulp-rev');
var del = require('del');
var gutil = require('gulp-util');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

gulp.task('default', ['watch']);

/*
 * Compile
 * Compress
 * Create a revision
 * Move
 * Create a manifest file 
 */
gulp.task('compile-css', ['cleanup-css'], function () {

	gulp.src(paths.SOURCE + 'scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
        includePaths: [
            paths.NODE + 'bootstrap/scss',
        ]
	}))
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(cssnano())
	.pipe(rev())
	.pipe(gulp.dest(paths.DEST_CSS))
	.pipe(rev.manifest('manifest-css.json', {
	        base: '.'
	    }))
	.pipe(gulp.dest('./'));
	   
});

/*
 * Compile
 * Compress
 * Create a revision
 * Move
 * Create a manifest file 
 */
gulp.task('compile-js', ['cleanup-js'], function () {

	gulp.src([
		/*
		 * Uncommnet Bootstrap components as required
		 */
		paths.NODE + 'popper.js/dist/umd/popper.js', 
	    paths.NODE + 'bootstrap/js/dist/alert.js',
	    //paths.NODE + 'bootstrap/js/dist/button.js',
	    //paths.NODE + 'bootstrap/js/dist/carousel.js',
	    //paths.NODE + 'bootstrap/js/dist/collapse.js',
	    paths.NODE + 'bootstrap/js/dist/dropdown.js',
	    paths.NODE + 'bootstrap/js/dist/modal.js',
	    //paths.NODE + 'bootstrap/js/dist/popover.js',
	    //paths.NODE + 'bootstrap/js/dist/scrollspy.js',
	    //paths.NODE + 'bootstrap/js/dist/tab.js',
	    //paths.NODE + 'bootstrap/js/dist/tooltip.js',
	    paths.NODE + 'bootstrap/js/dist/util.js',
	    paths.SOURCE + 'js/default.js'
	])
	.pipe(concat('default.js'))
	.pipe(uglify())
	.pipe(rev())
	.pipe(gulp.dest(paths.DEST_JS))
	.pipe(rev.manifest('manifest-js.json', {
	        base: '.'
	    }))
	.pipe(gulp.dest('./'));
   
});

/*
 * Watch the source directories for changes
 */
gulp.task('watch', function() {

    gulp.start('compile-css');
    gulp.start('compile-js');

    gulp.watch(paths.SOURCE + 'scss/**/*.scss', ['compile-css']).on('change', function(event) {
    	
    	console.log(event.path + ' ' + event.type);
    	
    });
   
    gulp.watch(paths.SOURCE + 'js/**/*.js', ['compile-js']).on('change', function(event) {
    	
        console.log(event.path + ' ' + event.type);
        
    });

});

gulp.task('cleanup-css', function () {

	return del([
		
		paths.DEST_CSS + '*.css'
			
    ]);

});

gulp.task('cleanup-js', function () {

	return del([
			
		paths.DEST_JS + '*.js'
			
	]);

});



