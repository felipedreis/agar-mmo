var gulp = require( './gulp' )([
  'nodemon'
]);

gulp.on( 'err', function( err ){
  console.log( err );
  process.exit( 1 );
});

gulp.task( 'develop', [ 'nodemon' ] );
gulp.task( 'default', [ 'develop' ] );