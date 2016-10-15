const position  = require( './position' );
const locks     = require( 'locks' ); 

module.exports = ( function() {

	var coins = [];
	var idCount = 0;
    
    var mutex = locks.createMutex();

    function generate(){
    	idCount++;

    	var coin = {
            ID : idCount,
            position : position.getRandomPosition(),
            remove: function ( callback ) {
                var coin = this;
                mutex.lock( function() {
                    var index = coins.indexOf( coin );
                    
                    if ( index > -1 ) {
                        coins.splice( index, 1 );
                        
                        if ( typeof callback === 'function' ) 
                            callback();
                    }                        
                    
                    mutex.unlock();    
                });                
            }
        };

        coins.push( coin );

        return coin;
    }
    
    function getByID( coinID ) {
        var coin = coins.filter( function( coin ) {
            return coin.ID == coinID;
        })[0];
        
        return coin;
    }
    
    return {
        generate: generate,
        coins: coins,
        getByID: getByID
    };
    
})();