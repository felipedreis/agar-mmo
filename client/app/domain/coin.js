function coinModule( game ) {
    
    var coins = game.add.group();
    coins.enableBody = true;

    function create( position ){
        
        var coin = coins.create( position.x, position.y, 'coin' );
        
        coin.scale.setTo( 0.15, 0.15 );
        coin.body.immovable = true;
        
        return coin;
    }
    
    return {
        create: create,
        coins: coins
    }

}