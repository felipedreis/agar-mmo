function playerModule( game ) {
    
    var players = [];

    function create(){
        var player = game.add.sprite( game.world.centerX, game.world.centerY, 'coin' );        
        
        player.tint = 0xff00ff;
        player.scale.setTo( 0.8, 0.8 );

        players.push( player );

        return player;
    }
    
    return {
        create: create
    }

}