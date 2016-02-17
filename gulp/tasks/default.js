var gulp = require('gulp');

gulp.task('default', ['jade', 'stylus', 'fonts', 'images', 'scripts', 'watch']);

gulp.task('build', ['stylus-min', 'jade-min', 'fonts', 'images', 'scripts-min']);
