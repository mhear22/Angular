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
	es 			= require('event-stream'),
	browserify	= require('browserify'),
	watchify	= require('watchify'),
	project 	= tsc.createProject("tsconfig.json");

gulp
.task('default',['develop'])
.task('run', ['develop'], function () {
	gulp.src('./')
		.pipe(webserver({
			livereload:true,
			directoryListing:true,
			open:true
		}))
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
		entries: ['src/main.ts'],
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
		.src([
				'./src/**/*.css', 
				'./src/**/*.html'
			])
		.pipe(gulp.dest('dev'));
})

.task('vendors:develop',['clean:develop'], function () {
	return gulp.src([
			'./node_modules/zone.js/dist/zone.js',
			'./node_modules/reflect-metadata/Reflect.js',
			'./node_modules/systemjs/dist/system.src.js'
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('dev'))
})

.task('inject:develop',['move:develop', 'compile:develop', 'vendors:develop'], function () {
	var target = gulp.src('./dev/index.html');
	var source = gulp.src([
		'./dev/**/*.js',
		'!./dev/bundle.js',
		'./dev/**/*.css'
		], {read: false});
	var bundle = gulp.src(['./dev/bundle.js']);
	return target
		.pipe(inject(es.merge(source,bundle),{relative: true}))
		.pipe(gulp.dest('./dev'));
})