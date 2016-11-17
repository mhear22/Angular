var	gulp 		= require('gulp'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	inject	 	= require('gulp-inject'),
	source		= require('vinyl-source-stream'),
	es 			= require('event-stream'),
	tsc 		= require('gulp-typescript'),
	project 	= tsc.createProject("tsconfig.json"),
	webpack 	= require('webpack-stream'),
	mincss		= require('gulp-clean-css');

///Develop
gulp.task('develop', ['inject:develop'],function () {
})

.task('clean:develop', function () {
	del('./dev/**/*');
})

.task('clean:release', function(){
	del('./dist/**/*');
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
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/font-awesome/css/font-awesome.min.css'
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

.task('release',['release:inject'], function(){ })

.task('minjs', ['clean:release', 'inject:develop'], function(){
	return gulp.src([
		'./dev/**/*.js',
		'!./dev/**/vendor.js'
	])
	.pipe(gulp.dest('dist'));
})

.task('mincss', ['clean:release', 'inject:develop'], function(){
	return gulp.src([
		'./dev/**/*.css',
		'!./dev/**/vendor.css'
	])
	.pipe(mincss())
	.pipe(gulp.dest('dist'));
})

.task('release:move', ['clean:release', 'inject:develop'], function(){
	return gulp.src([
		'./dev/**/*',
		'!./dev/**/*.js',
		'!./dev/**/*.css'
	])
	.pipe(gulp.dest('dist'));
})

.task('release:inject', ['release:move', 'mincss', 'minjs'], function(){
	var target = gulp.src('./dist/index.html');
	var source = gulp.src([
		'./dev/**/*.js',
		'!./dev/main.js',
		'./dev/**/*.css',
		'!./dev/style.css'
		], {read: false});
	var bundle = gulp.src(['./dev/main.js', './dev/style.css']);
	return target
		.pipe(inject(es.merge(source,bundle),{relative: true}))
		.pipe(gulp.dest('./dist'));
})
