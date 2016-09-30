const gulp    = require( 'gulp' );
const nodemon = require( 'nodemon' );

const nodemonTask = function(){
  return nodemon({
    script: 'app.js',
    debug: true,
    ignore: [
      'gulp/',
      'node_modules/',
      'gulpfile.js',
      'package.json'
    ]
  }).on( 'restart', function () {
    console.log( 'Restarting server...' );
    gulp.start( 'lint' );
  });
};

module.exports = nodemonTask;
module.exports.dependencies = [ 'lint' ];