function coinModule( game ) {
    
    var coins = [];

    function create(){
        var x = Math.floor( Math.random() * constantsModule.GAME_WIDHT );
        var y = Math.floor( Math.random() * constantsModule.GAME_HEIGHT );

        var coin = game.add.sprite( x, y, 'coin' );
        
        coin.scale.setTo( 0.15, 0.15 );
        
        coins.push( coin );

        return coin;
    }
    
    return {
        create: create
    }

}