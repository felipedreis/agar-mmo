const position = require( './position' );

module.exports = ( function() {

	var coins = [];
	var idCount = 0;

    function generate(){
    	idCount++;

    	var coin = {
            ID : idCount,
            position : position.getRandomPosition()
        };

        coins.push( coin );

        return coin;
    }
    
    function remove( coinID ) {
    	var coin = coins.filter( function( coin ) {
            return coin.ID == coinID;
        });
        
        var index = coins.indexOf( coin[0] );
        
        if ( index > -1 ) 
            coins.splice( index, 1 );
    }
    
    return {
        generate: generate,
        remove: remove,
        coins: coins
    };
    
})();