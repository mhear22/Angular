var	gulp 		= require('gulp'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	inject	 	= require('gulp-inject'),
	source		= require('vinyl-source-stream'),
	es 			= require('event-stream'),
	webpack 	= require('webpack-stream'),
	webpackcon	= require('./webpack.config.js')
	webpackrel	= require('./webpack.config.release.js')
;
///Develop
gulp.task('develop', ['inject:develop'],function () { })

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
		'./src/**/*.html',
		'./src/web.config'
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
		'./node_modules/systemjs/dist/system.src.js',
	])
	.pipe(concat('vendor2.js'))
	.pipe(gulp.dest('dev'))
})

.task('inject:develop',['move:develop', 'compile:develop', 'vendorcss:develop', 'vendorjs:develop'], function () {
	var target = gulp.src('./dev/index.html');
	var source = gulp.src([
		'./dev/**/*.js',
		'!./dev/vendor.js',
		'!./dev/main.js',
		'./dev/**/*.css',
		'!./dev/style.css'
		], {read: false});
	var bundle = gulp.src(['./dev/vendor.js','./dev/main.js', './dev/style.css']);
	return target
		.pipe(inject(es.merge(source,bundle),{relative: true}))
		.pipe(gulp.dest('./dev'));
})

/*****************************************************************************************************************************/
/***********************************************RELEASE***********************************************************************/
/*****************************************************************************************************************************/

.task('release', ['inject:release'], function(){})

.task('compile:release', ['clean:release'], function(){
	return gulp.src(['./src/**/*.ts'])
		.pipe(webpack(webpackrel))
		.pipe(gulp.dest('dist'))
})

.task('move:release',['clean:release'], function () {
	return gulp.src([
		'./src/**/*.css', 
		'./src/**/*.html',
		'./src/web.config'
	])
	.pipe(gulp.dest('dist'));
})

.task('vendorcss:release', ['clean:release'], function(){
	gulp.src([
		'./node_modules/font-awesome/fonts/**/*'
	]).pipe(gulp.dest('dist/fonts'));
	
	return gulp.src([
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/font-awesome/css/font-awesome.min.css'
	])
	.pipe(concat('vendor.css'))
	.pipe(gulp.dest('dist'));
})

.task('vendorjs:release',['clean:release'], function () {
	return gulp.src([
		'./node_modules/zone.js/dist/zone.js',
		'./node_modules/reflect-metadata/Reflect.js',
		'./node_modules/systemjs/dist/system.src.js'
	])
	.pipe(concat('vendor2.js'))
	.pipe(gulp.dest('dist'))
})

.task('inject:release', ['clean:release', 'vendorcss:release', 'vendorjs:release', 'move:release', 'compile:release'], function(){
	var target = gulp.src('./dist/index.html');
	var source = gulp.src([
		'./dist/**/*.js',
		'!./dist/vendor.js',
		'!./dist/main.js',
		'./dist/**/*.css',
		'!./dist/s.css'
		], {read: false});
	var bundle = gulp.src(['./dist/vendor.js','./dist/main.js', './dist/s.css']);
	return target
		.pipe(inject(es.merge(source,bundle),{relative: true}))
		.pipe(gulp.dest('./dist'));
})
.task('clean:release',function() {
	return del('./dist');
})