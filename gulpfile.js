var gulp = require('gulp');
var mocha = require('gulp-mocha');

var config = {
  source: './src/*.js',
  testFiles: './test/*.test.js'
};
gulp.task('test', function () {
    return gulp.src(config.testFiles, {read: true})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', function() {
  return gulp.watch([config.source, config.testFiles], ['test']);
});
