var gulp = require('gulp'),
    config = require('../../config.json');

gulp.task('watch', ['setWatch'], function() {
	gulp.watch(config.paths.dev.css.root + '**/*', ['stylus']);
	gulp.watch(config.paths.dev.images + '**/*', ['images']);
    gulp.watch(config.paths.dev.views.angular.templates + '**/*', ['angular']);
	gulp.watch(config.paths.dev.fonts + '**/*', ['fonts']);
	gulp.watch(config.paths.dev.js.root + '**/*', ['scripts']);
    gulp.watch(config.paths.dev.data + '**/*', ['data']);
	gulp.watch(config.paths.dev.js.thirdparty + '**/*', ['thirdpartyJs']);
    gulp.watch(config.paths.dev.css.thirdparty + '**/*', ['thirdpartyCss']);
});