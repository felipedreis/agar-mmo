function playerModule( game ) {
    
    var players = game.add.group();
    players.enableBody = true;

    function create( options ) {
        var player = players.create( options.position.x, options.position.y, 'coin' );
        
        game.physics.arcade.enable( player );        
        
        player.anchor.set( 0.5 );
        
        player.tint = 0xff00ff;
        player.scale.setTo( 0.8, 0.8 );
        
        var style = { font: '30px Arial', fill: '#ffffff', align: 'center', fontSize: 20 };
        
        var score = game.add.text( 0, 0, options.score, style );
        score.position.x -= score.width * 0.5;
        score.position.y -= score.height * 0.5;
        player.addChild( score );
        
        var name = game.make.text( 0, 0, options.name, style );
        name.position.x -= name.width * 0.5;
        name.position.y += name.height * 1.5;
        player.addChild( name );
        
        player.move = move;
        player.preventColisions = preventColisions;

        player.body.collideWorldBounds = true;
        
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
    
    function loadPlayers( me ) {
        
        playerService.getPlayers( function onSuccess( data ) {
            $.each( data, function( index, player ) {
                create( player );    
            })            
        }, function onError( data ) {
            console.log( data );
        });
        
    }
    
    function preventColisions( coins, players ){
        game.physics.arcade.collide( this, coins, function collisionCallback( player, coin ){
            coin.kill();
            
            var score = player.getChildAt( 0 );
            score.text = parseInt( score.text ) + 1;            
        });
        
        game.physics.arcade.collide( this, players, function collisionCallback( me, player ){
                      
        });
    }
    
    return {
        create: create,
        loadPlayers: loadPlayers,
        players: players
    }

}