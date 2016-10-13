const position = require( './position' );

module.exports = ( function() {

	var Coins = [];
	var idCount = 0;


    function generate(){
    	idCount++;

    	var coin = {
            ID : idCount,
            position : position.getRandomPosition()
        };

        Coins.push(coin);

        return coin;
    }
    
    function remove( coinID ) {
    	var coin = Coins.filter( function( coinID ) {
            return coin.ID == coinID;
        });
        
        var index = Coins.indexOf( coin[0] );
        
        if ( index > -1 ) 
            Coins.splice( index, 1 );
    }
    
    return {
        generate: generate,
        remove: remove
    };
    
})();