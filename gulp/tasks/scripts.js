var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    config = require('../../config.json');
    

//  CONCATENATE ALL JS FILES INTO ONE, COMPRESS IT AND PUT IT INTO JS FOLDER
 
gulp.task('scripts', function() {
    return gulp.src([config.paths.dev.js.base + 'app.js', config.paths.dev.js.services + '**/*', config.paths.dev.js.controllers + '**/*'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.paths.prod.js.base));
});

gulp.task('scripts-min', function() {
    return gulp.src([config.paths.dev.js.base + 'app.js', config.paths.dev.js.services + '**/*', config.paths.dev.js.controllers + '**/*'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.prod.js.base));
});



