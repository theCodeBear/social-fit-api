var gulp = require('gulp'),
    jshint = require('gulp-jshint');

// default task to run watch task on gulp command
gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src(['./**/*.js', '!./gulpfile.js', '!./node_modules/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', ['jshint'], function() {
  gulp.watch(['./**/*.js', '!./gulpfile.js'], ['jshint']);
});
