var	gulp 		= require('gulp'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	inject	 	= require('gulp-inject'),
	source		= require('vinyl-source-stream'),
	es 			= require('event-stream'),
	tsc 		= require('gulp-typescript'),
	project 	= tsc.createProject("tsconfig.json"),
	webpack 	= require('webpack-stream');

///Develop
gulp.task('develop', ['inject:develop'],function () {
})

.task('clean:develop', function () {
	del('./dev/**/*');
})

.task('compile:develop', ['clean:develop'], function(){
	return gulp.src(['./src/**/*.ts'])
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('dev'))
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
	gulp.src([
		'./node_modules/bootstrap/dist/css/bootstrap.min.css'
	]).pipe(concat('vendor.css'))
	.pipe(gulp.dest('dev'));

	
	return gulp.src([
			'./node_modules/zone.js/dist/zone.js',
			'./node_modules/reflect-metadata/Reflect.js',
			'./node_modules/systemjs/dist/system.src.js',
			'./node_modules/jquery/dist/jquery.js',
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('dev'))
})

.task('inject:develop',['move:develop', 'compile:develop', 'vendors:develop'], function () {
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