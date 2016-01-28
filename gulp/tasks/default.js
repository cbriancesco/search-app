var gulp = require('gulp');

//gulp.task('default', ['browser-sync', 'stylus', 'jade', 'fonts', 'thirdpartyJs', 'thirdpartyCss', 'data', 'root', 'images', 'scripts', 'watch']);

gulp.task('default', ['stylus', 'angular', 'fonts', 'thirdpartyJs', 'thirdpartyCss', 'data', 'root', 'images', 'scripts', 'watch']);

gulp.task('build', ['stylus-min', 'jade-min', 'fonts', 'thirdpartyJs', 'thirdpartyCss', 'data', 'root', 'images', 'scripts-min']);
