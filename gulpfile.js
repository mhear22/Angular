var	gulp 		= require('gulp'),
	webserver 	= require('gulp-webserver'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	include 	= require('gulp-include-source');


gulp
.task('release',['build','minify'])
.task('default',['build'])
.task('run', ['build', 'webserver'])
.task('build',['clean','move'])

.task('webserver', function () {
	gulp.src('./')
		.pipe(webserver({
			livereload: true,
			directoryListing: {
				enable: true,
				path:"./dev"
			},
			open: true,
			host: 'localhost',
			port: 8080,
			fallback: 'index.html'
		}));
})

.task('move', function () {
	gulp
		.src(['src/**/*'])
		.pipe(gulp.dest('dev'));
})

.task('clean', function () {
	del('dev/**/*');
})

.task('minify', function () {
	gulp.src('src/**/*.js')
		.pipe(concat('a.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})