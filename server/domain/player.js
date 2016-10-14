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
        
        var player = getByID( playerID );
        
        var index = players.indexOf( player );
        
        if ( index > -1 ) 
            players.splice( index, 1 );
        
    }
    
    function getByID( playerID ) {
        var player = players.filter( function( player ) {
            return player.ID == playerID;
        })[0];
        
        return player;
    }
    
    return {
        register: register,
        players: players,
        remove: remove,
        getByID: getByID
    };
    
})();