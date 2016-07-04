var gulp = require('gulp');
var webserver = require('gulp-webserver')

gulp.task('default', function () {
	console.log("logged");
});

gulp.task('webserver', function () {
	gulp.src('app')
		.pipe(webserver({
			livereload: true,
			open: true,
			host: 'localhost',
			port: 8080
		}))
})