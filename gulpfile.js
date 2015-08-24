var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel');

// default task to run watch task on gulp command
gulp.task('default', ['watch']);

gulp.task('jshint', ['babel'], function() {
  return gulp.src('./dist/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('babel', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['jshint'], function() {
  gulp.watch('./src/**/*.js', ['jshint']);
  // gulp.watch(['./**/*.js', '!./gulpfile.js', '!./node_modules/**/*'], ['babel']);
});
