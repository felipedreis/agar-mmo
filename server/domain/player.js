const position = require( './position' );

module.exports = ( function() {
    
    var players = [];
    var idCount = 0;
    
    function register() {
        idCount++;
            
        var player = {
            ID : idCount,
            name : 'Jogador ' + idCount,
            theme : 'blue',
            position : position.getRandomPosition(),
            score : 0
        };
        
        players.push( player );
        
        return player;        
    }
    
    function remove( playerID ) {
        
        var player = players.filter( function( player ) {
            return player.ID == playerID;
        });
        
        var index = players.indexOf( player[0] );
        
        if ( index > -1 ) 
            players.splice( index, 1 );
        
    }
    
    return {
        register: register,
        players: players,
        remove: remove
    };
    
})();