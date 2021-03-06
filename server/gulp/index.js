const gulp = require( 'gulp' );
 
module.exports = function ( tasks ) {
    tasks.forEach( function( name ) {
        var task = require( './tasks/' + name );
        gulp.task( name, task.dependencies, task );
    });
 
    return gulp;
};