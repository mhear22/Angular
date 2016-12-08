var	gulp 		= require('gulp'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	inject	 	= require('gulp-inject'),
	source		= require('vinyl-source-stream'),
	es 			= require('event-stream'),
	webpack 	= require('webpack-stream'),
	webpackcon	= require('./webpack.config.js')
;
///Develop
gulp.task('develop', ['inject:develop'],function () {
})

.task('clean:develop', function () {
	return del('./dev/**/*');
})

.task('compile:develop', ['clean:develop'], function(){
	return gulp.src(['./src/**/*.ts'])
		.pipe(webpack(webpackcon))
		.pipe(gulp.dest('dev'))
})

.task('move:develop',['clean:develop'], function () {
	return gulp.src([
		'./src/**/*.css', 
		'./src/**/*.html'
	])
	.pipe(gulp.dest('dev'));
})

.task('vendorcss:develop', ['clean:develop'], function(){
	gulp.src([
		'./node_modules/font-awesome/fonts/**/*'
	]).pipe(gulp.dest('dev/fonts'));
	
	return gulp.src([
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/font-awesome/css/font-awesome.min.css'
	])
	.pipe(concat('vendor.css'))
	.pipe(gulp.dest('dev'));
})

.task('vendorjs:develop',['clean:develop'], function () {
	return gulp.src([
		'./node_modules/zone.js/dist/zone.js',
		'./node_modules/reflect-metadata/Reflect.js',
		'./node_modules/systemjs/dist/system.src.js'
	])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('dev'))
})

.task('inject:develop',['move:develop', 'compile:develop', 'vendorcss:develop', 'vendorjs:develop'], function () {
	var target = gulp.src('./dev/index.html');
	var source = gulp.src([
		'./dev/**/*.js',
		'!./dev/main.js',
		'./dev/**/*.css',
		'!./dev/style.css'
		], {read: false});
	var bundle = gulp.src(['./dev/main.js', './dev/style.css']);
	return target
		.pipe(inject(es.merge(source,bundle),{relative: true}))
		.pipe(gulp.dest('./dev'));
})