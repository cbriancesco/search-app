var gulp = require('gulp'),
	changed = require('gulp-changed'),
    config = require('../../config.json');

gulp.task('thirdpartyJs', function() {
	return gulp.src(config.paths.dev.js.thirdparty + '**/*')
	.pipe(changed(config.paths.dev.js.thirdparty))
	.pipe(gulp.dest(config.paths.prod.js.thirdparty));
});

gulp.task('thirdpartyCss', function() {
    return gulp.src(config.paths.dev.css.thirdparty + '**/*')
    .pipe(changed(config.paths.prod.css.thirdparty))
    .pipe(gulp.dest(config.paths.prod.css.thirdparty));
});
