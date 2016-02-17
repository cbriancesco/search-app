var gulp = require('gulp'),
    jade = require('gulp-jade'),
    config = require('../../config.json');


gulp.task('jade', function() {
    return gulp.src(config.paths.dev.views.templates + '*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest(config.paths.prod.views.templates));
});


gulp.task('jade-min', function() {
    return gulp.src(config.paths.dev.views.templates + '*.jade')
    .pipe(jade())
    .pipe(gulp.dest(config.paths.prod.views.templates));
});


