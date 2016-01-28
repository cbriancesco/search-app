var gulp = require('gulp'),
    jade = require('gulp-jade'),
    config = require('../../config.json');


gulp.task('angular', function() {
    return gulp.src(config.paths.dev.views.angular.templates + '*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest(config.paths.prod.angular.templates));
});


