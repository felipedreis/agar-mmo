const game = new Phaser.Game( constants.GAME_WIDHT, constants.GAME_HEIGHT, Phaser.CANVAS, 'gameContainer' );

var Player;
var Coin;

var cursors;
var me;

const GameState = {
    preload: function () {
        game.load.image( 'background', 'assets/space.jpg' );
        game.load.image( 'coin', 'assets/coin.png' ); 

        cursors = game.input.keyboard.createCursorKeys();
    },
    create: function () {
        
        game.physics.startSystem( Phaser.Physics.ARCADE );
        game.physics.setBoundsToWorld();
        
        game.add.sprite( 0, 0, 'background' );

        Player = playerModule( game );
        Coin = coinModule( game );       
        
        Coin.create();
        
        var socket = io( 'http://localhost:3000' );
        
        socket.on( 'player_registred', function( player ) {
            Player.create( player );
        });
        
        socket.on( 'player_credencials', function( player ) {
            me = Player.create( player );
        });
                
        socket.on( 'player_disconnected', function( playerID ){
            console.log( 'Deletando jogador ' + playerID );
            Player.remove( playerID );
        });
        
    },
    update: function () {        
        if ( me ) {
            me.move( cursors );
            me.preventColisions( Coin.coins, Player.players );    
        }
    }
};

game.state.add( 'GameState', GameState );
game.state.start( 'GameState' );