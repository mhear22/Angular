var	gulp 		= require('gulp'),
	gulpUtil	= require('gulp-Util'),
	webserver 	= require('gulp-webserver'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	inject	 	= require('gulp-inject'),
	runSequ		= require('run-sequence');

gulp
.task('default',['build:develop'])
.task('run', ['build:develop', 'webserver'])

.task('build:release', function () {
	runSequ('clean:release','move:release','minify','inject:release')
})

.task('build:develop', function () {
	runSequ('clean:develop','move:develop','inject:develop');
})


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

.task('move:develop', function () {
	return gulp
		.src(['src/**/*'])
		.pipe(gulp.dest('dev'));
})

.task('move:release', function () {
	return gulp
		.src(['src/**/*.css'],['src/**/*.html'])
		.pipe(gulp.dest('dist'));
})

.task('inject:develop', function () {
	var target = gulp.src('./dev/index.html');
	var source = gulp.src(['./dev/**/*.js', './dev/**/*.css'], {read: false});
	return target
		.pipe(inject(source))
		.pipe(gulp.dest('dev'));
})

.task('inject:release', function () {
	var target = gulp.src('./dist/index.html');
	var source = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
	return target
		.pipe(inject(source))
		.pipe(gulp.dest('dist'));
})

.task('clean:develop', function () {
	return del('dev/**/*');
})

.task('clean:release', function () {
	return del('dist/**/*');
})

.task('minify', function () {
	return gulp.src('dist/**/*.js')
		.pipe(concat('a.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})