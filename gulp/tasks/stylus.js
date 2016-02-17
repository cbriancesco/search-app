var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
    config = require('../../config.json');

// Get one .styl file and render 
gulp.task('stylus', function () {
	gulp.src(config.paths.dev.css.pages + '*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(config.paths.prod.css.root));
});

gulp.task('stylus-min', function () {
    gulp.src(config.paths.dev.css.pages + '*.styl')
    .pipe(stylus({
        compress: true
    }))
    .pipe(gulp.dest(config.paths.prod.css.root));
});