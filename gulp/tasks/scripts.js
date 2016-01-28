var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    changed = require('gulp-changed'),
    config = require('../../config.json'),
    jsonJs = require('../../src/js/pages/pages.json');
    

//  CONCATENATE ALL JS FILES INTO ONE, COMPRESS IT AND PUT IT INTO JS FOLDER
gulp.task('scripts', function(){
    for(var i = 0, max = jsonJs.pages.length; i < max; i+=1){
        var base = [config.paths.dev.js.base + 'prodi.ui.constants.js', config.paths.dev.js.pages + jsonJs.pages[i].fileName].concat(jsonJs.defaults);
        var newArr = base.concat(jsonJs.pages[i].modules);

        console.log(jsonJs.pages[i].pageName + '(' + (i+1) + ' of ' + jsonJs.pages.length + ')');

        gulp.src(newArr)
        .pipe(concat(jsonJs.pages[i].fileName))
        .pipe(gulp.dest(config.paths.prod.js.root));
    }
});

gulp.task('scripts-min', function(){
    for(var i = 0, max = jsonJs.pages.length; i < max; i+=1){
        var base = [config.paths.dev.js.base + 'prodi.ui.constants.js', config.paths.dev.js.pages + jsonJs.pages[i].fileName].concat(jsonJs.defaults);
        var newArr = base.concat(jsonJs.pages[i].modules);

        console.log(jsonJs.pages[i].pageName + '(' + (i+1) + ' of ' + jsonJs.pages.length + ')');

        gulp.src(newArr)
        .pipe(concat(jsonJs.pages[i].fileName))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.prod.js.root));
    }
});



// PUTS EVERYTHING INSIDE THE DATA FOLDER INTO DE DATA FOLDER IN BUILD
gulp.task('data', function() {
    return gulp.src(config.paths.dev.data + '**/*')
    .pipe(changed(config.paths.prod.data))
    .pipe(gulp.dest(config.paths.prod.data));
});



// PUTST EVERYTHING INSIDE THE ROOT FOLDER INTO THE BUILD ROOT
gulp.task('root', function() {
    return gulp.src(config.paths.dev.root + '**/*')
    .pipe(gulp.dest(config.paths.prod.root));
});


