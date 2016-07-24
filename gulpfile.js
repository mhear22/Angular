var	gulp 		= require('gulp'),
	gulpUtil	= require('gulp-util'),
	webserver 	= require('gulp-webserver'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	inject	 	= require('gulp-inject'),
	runSequ		= require('run-sequence'),
	cleanCss 	= require('gulp-clean-css'),
	tsc 		= require('gulp-typescript'),
	tsify 		= require('tsify'),
	source		= require('vinyl-source-stream'),
	browserify	= require('browserify'),
	watchify	= require('watchify'),
	project 	= tsc.createProject("tsconfig.json");

gulp
.task('default',['develop'])
.task('run', ['build:develop',])

///Release
.task('release', function () {
	return runSequ('inject:release')
})

.task('compile:release',['clean:release'], function () {
	return project
		.src()
		.pipe(tsc(project))
		.js
		.pipe(gulp.dest('dist'))
})

.task('move:release',['clean:release'], function () {
	return gulp
		.src(['./src/**/*.html'])
		.pipe(gulp.dest('dist'));
})

.task('inject:release', ['compile:release', 'move:release','minify:js','minify:css', 'cleanjs:release'],function () {
	var target = gulp.src('./dist/index.html');
	var source = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
	return target
		.pipe(inject(source,{relative: true}))
		.pipe(gulp.dest('./dist'));
})

.task('clean:release', function () {
	return del('./dist/**/*');
})

.task('cleanjs:release',['compile:release', 'minify:js'], function () {
	return del(['./dist/**/*.js', '!./dist/a.js']);
})

.task('minify:js',['compile:release'] ,function () {
	return gulp.src('./dist/**/*.js')
		.pipe(concat('a.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})

.task('minify:css',['clean:release'] ,function () {
	return gulp.src('./src/**/*.css')
		.pipe(concat('c.css'))
		.pipe(cleanCss())
		.pipe(gulp.dest('dist'));
})


///Develop
.task('develop', ['inject:develop'],function () {
})

.task('clean:develop', function () {
	del('./dev/**/*');
})

.task('compile:develop',['clean:develop'], function () {
	return browserify({
		basedir: '.',
		debug: true,
		entries: ['src/app.ts'],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('dev'));
})

.task('move:develop',['clean:develop'], function () {
	return gulp
		.src(['./src/**/*.css', './src/**/*.html'])
		.pipe(gulp.dest('dev'));
})

.task('inject:develop',['move:develop', 'compile:develop'], function () {
	var target = gulp.src('./dev/index.html');
	var source = gulp.src(['./dev/**/*.js', './dev/**/*.css'], {read: false});
	return target
		.pipe(inject(source,{relative: true}))
		.pipe(gulp.dest('./dev'));
})

//.task('depend',['move:develop'], function () {
//	return gulp
//		.src(['./node_modules/angular/angular.js'])
//		.pipe(gulp.dest('dev'))
//})