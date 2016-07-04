var gulp = require('gulp');
var webserver = require('gulp-webserver');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('release',['build','minify','webserver']);
gulp.task('default',['build','webserver']);

gulp.task('webserver', function () {
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
		}))
})

gulp.task('build',['clean','move'], function () {
});

gulp.task('move', function () {
	gulp
		.src(['src/**/*'])
		.pipe(gulp.dest('dev'));
});

gulp.task('clean', function () {
	del('dev/**/*');
});

gulp.task('minify', function () {
	gulp.src('src/**/*.js')
		.pipe(concat('a.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})