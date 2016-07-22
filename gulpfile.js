var	gulp 		= require('gulp'),
	gulpUtil	= require('gulp-Util'),
	webserver 	= require('gulp-webserver'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	inject	 	= require('gulp-inject'),
	runSequ		= require('run-sequence'),
	cleanCss 	= require('gulp-clean-css'),
	tsc 		= require('gulp-typescript'),
	project 	= tsc.createProject("tsconfig.json");

gulp
.task('default',['build:develop'])
.task('run', ['build:develop', 'webserver'])

.task('build:release', function () {
	runSequ('clean:release','move:release',['minify:js', 'minify:css'],'inject:release')
})

.task('build:develop', function () {
	runSequ('clean:develop','move:develop','depend','inject:develop');
})


.task('webserver', function () {
	gulp.src('./dev')
		.pipe(webserver({
			livereload: true,
			open: true,
			host: 'localhost',
			port: 8080,
		}));
})

.task('move:develop', function () {
	return gulp
		.src(['./src/**/*'])
		.pipe(gulp.dest('dev'));
})

.task('move:release', function () {
	return gulp
		.src(['./src/**/*.html'])
		.pipe(gulp.dest('dist'));
})

.task('depend', function () {
	return gulp
		.src(['./node_modules/angular/angular.js'])
		.pipe(gulp.dest('dev'))
})

.task('inject:develop', function () {
	var target = gulp.src('./dev/index.html');
	var source = gulp.src(['./dev/**/*.js', './dev/**/*.css'], {read: false});
	return target
		.pipe(inject(source,{relative: true}))
		.pipe(gulp.dest('./dev'));
})

.task('inject:release', function () {
	var target = gulp.src('./dist/index.html');
	var source = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
	return target
		.pipe(inject(source,{relative: true}))
		.pipe(gulp.dest('./dist'));
})

.task('clean:develop', function () {
	del('./dev/**/*');
})

.task('clean:release', function () {
	del('./dist/**/*');
})

.task('minify:js', function () {
	return gulp.src('./src/**/*.js')
		.pipe(concat('a.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})

.task('minify:css', function () {
	return gulp.src('./src/**/*.css')
		.pipe(concat('c.css'))
		.pipe(cleanCss())
		.pipe(gulp.dest('dist'));
})