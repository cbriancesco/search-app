var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
    config = require('../../config.json');


gulp.task('images', function() {
    return gulp.src(config.paths.dev.images + '**/*')
    .pipe(imagemin({
        type: 7,
        progressive: true
    }))
    .pipe(gulp.dest(config.paths.prod.images));
});


gulp.task('image-compress', function() {
    return gulp.src(config.paths.dev.images + '**/*')
    .pipe(imagemin({
        type: 7
    }))
    .pipe(gulp.dest(config.paths.dev.images));
});
