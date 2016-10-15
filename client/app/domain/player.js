function playerModule( game ) {
    
    var players = game.add.group();
    players.enableBody = true;

    function create( config ) {
        var player = players.create( config.position.x, config.position.y, 'coin' );
        
        game.physics.arcade.enable( player );     
        
        player.anchor.set( 0.5 );
        
        player.tint = config.color;
        player.scale.setTo( 0.8, 0.8 );
        
        var style = { font: '30px Arial', fill: '#ffffff', align: 'center', fontSize: 20 };
        
        var score = game.add.text( 0, 0, config.score, style );
        score.position.x -= score.width * 0.5;
        score.position.y -= score.height * 0.5;
        player.addChild( score );
        
        var name = game.make.text( 0, 0, config.name, style );
        name.position.x -= name.width * 0.5;
        name.position.y += name.height * 1.5;
        player.addChild( name );
        
        player.enableCursors = enableCursors;
        player.preventColisions = preventColisions;
        player.move = move;
        player.updateScore = updateScore;

        player.body.collideWorldBounds = true;
        player.body.immovable = true;
        player.ID = config.ID;
        
        return player;
    }
    
    function remove( playerID ) {
        var player = getByID( playerID );                
        player.kill();
    }
    
    function getByID( playerID ) {
        var player = players.filter( function( player ){
            return player.ID == playerID;   
        }).list[0];
        
        return player;
    }

    function enableCursors( cursors ) {
        
        var playerMoved = false; 
        
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        
        if ( ( cursors.left.isDown && cursors.right.isDown ) ||
             ( cursors.up.isDown && cursors.down.isDown ) )
             return playerMoved;
             
        if ( cursors.left.isDown ) {
            this.body.velocity.x = -200;
            playerMoved =  true;
        }            
        
        if ( cursors.right.isDown ) {
            this.body.velocity.x = 200;
            playerMoved =  true;
        }
        
        if ( cursors.up.isDown ) {
            this.body.velocity.y = -200;
            playerMoved =  true;
        }
        
        if ( cursors.down.isDown ) {
            this.body.velocity.y = 200;
            playerMoved =  true;
        }
            
        return playerMoved;
        
    }
    
    function move( position ) {
        this.x = position.x;
        this.y = position.y;
    }
    
    function updateScore( newScore ) {
        var score = this.getChildAt( 0 );
        score.text = newScore; 
    }
    
    function preventColisions( coins, players, socket ){
        game.physics.arcade.collide( this, coins, function collisionCallback( player, coin ){
            coin.kill();
            
            if ( socket )
                socket.emit( 'coin_eaten', coin.ID );                
        });
        
        game.physics.arcade.collide( this, players, function collisionCallback( me, player ){
                      
        });
    }
    
    return {
        create: create,
        players: players,
        remove: remove,
        getByID: getByID
    }

}