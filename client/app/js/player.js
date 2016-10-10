function playerModule( game ) {
    
    var players = game.add.group();
    players.enableBody = true;

    function create(){
        var player = players.create( game.world.centerX, game.world.centerY, 'coin' );

        game.physics.arcade.enable( player );      
        
        player.tint = 0xff00ff;
        player.scale.setTo( 0.8, 0.8 );

        player.move = move;
        player.preventColisions = preventColisions;

        return player;
    }

    function move( cursors ) {
        
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        
        if ( ( cursors.left.isDown && cursors.right.isDown ) ||
             ( cursors.up.isDown && cursors.down.isDown ) )
             return;
             
        if ( cursors.left.isDown )
            this.body.velocity.x = -200;
        
        if ( cursors.right.isDown )
            this.body.velocity.x = 200;
        
        if ( cursors.up.isDown )
            this.body.velocity.y = -200;
        
        if ( cursors.down.isDown )
            this.body.velocity.y = 200;
        
    }

    function preventColisions( coins ){
        var hitCoin = game.physics.arcade.collide( this, coins, function collisionCallback( player, coin ){
            coin.kill();
        });
    }
    
    return {
        create: create,
        players: players
    }

}