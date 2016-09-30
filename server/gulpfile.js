var gulp = require( './gulp' )([
  'nodemon',
  'lint'
]);

gulp.on( 'err', function( err ){
  console.log( err );
});

gulp.task( 'develop', ['nodemon'] );
gulp.task( 'default', ['develop'] );