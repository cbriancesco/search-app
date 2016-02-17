var gulp = require('gulp'),
    config = require('../../config.json');

gulp.task('fonts', function() {
	return gulp.src(config.paths.dev.fonts + '**/*') //config.paths.dev.fonts
	.pipe(gulp.dest(config.paths.prod.fonts)); //config.paths.prod.fonts
});
