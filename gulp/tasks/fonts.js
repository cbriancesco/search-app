var gulp = require('gulp'),
	changed = require('gulp-changed'),
    config = require('../../config.json');

gulp.task('fonts', function() {
	return gulp.src(config.paths.dev.fonts + '**/*')
	.pipe(changed(config.paths.dev.fonts))
	.pipe(gulp.dest(config.paths.prod.fonts));
});
