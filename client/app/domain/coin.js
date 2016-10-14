function coinModule( game ) {
    
    var coins = game.add.group();
    coins.enableBody = true;

    function create( config ){
        
        var coin = coins.create( config.position.x, config.position.y, 'coin' );
        
        coin.scale.setTo( 0.15, 0.15 );
        coin.body.immovable = true;
        
        coin.ID = config.ID;
        
        return coin;
    }
    
    function remove( coinID ) {
        var coin = getByID( coinID );                
        coin.kill();
    }
    
    function getByID( coinID ) {
        var coin = coins.filter( function( coin ){
            return coin.ID == coinID;   
        }).list[0];
        
        return coin;
    }

    
    return {
        create: create,
        coins: coins,
        remove: remove
    }

}