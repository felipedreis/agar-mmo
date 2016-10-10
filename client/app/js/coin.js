function coinModule( game ) {
    
    var coins = game.add.group();
    coins.enableBody = true;

    function create(){
        var x = Math.floor( Math.random() * constantsModule.GAME_WIDHT );
        var y = Math.floor( Math.random() * constantsModule.GAME_HEIGHT );

        var coin = coins.create( x, y, 'coin' );
        
        coin.scale.setTo( 0.15, 0.15 );
        coin.body.immovable = true;
        
        return coin;
    }
    
    return {
        create: create,
        coins: coins
    }

}