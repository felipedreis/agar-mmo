const jshint = require( 'gulp-jshint' );
const gulp   = require( 'gulp' );
 
const lintTask =  function() {
  return gulp.src([ '../**/*.js', '!node_modules/**/*.js' ])
    .pipe( jshint({ esversion: 6 }) )
    .pipe( jshint.reporter( 'default' ) )
    .pipe( jshint.reporter( 'fail' ) );
};

module.exports = lintTask;
module.exports.dependencies = [];