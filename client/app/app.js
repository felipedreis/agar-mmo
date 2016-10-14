const game = new Phaser.Game( constants.GAME_WIDHT, constants.GAME_HEIGHT, Phaser.CANVAS, 'gameContainer' );

var Player;
var Coin;

var cursors;
var me;
var socket;

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
               
        socket = io( 'http://localhost:3000' );
        
        socket.on( 'player_registred', function( player ) {
            Player.create( player );
        });
        
        socket.on( 'initial_state', function( state ) {
            
            me = Player.create( state.player );

            for( var i = 0; i < state.rivals.length; i++ ){
                var rival = state.rivals[ i ];
                Player.create( rival );
            }

            for( var i = 0; i < state.coins.length; i++ ){
                var coin = state.coins[ i ];
                Coin.create( coin.position );
            }

        });
                
        socket.on( 'player_disconnected', function( playerID ){
            Player.remove( playerID );
        });

        socket.on( 'new_coin', function( coin ) {
            Coin.create( coin.position );
        });
        
        socket.on( 'player_moved', function( playerMoved ) {
            console.log( 'Player moved: ' + playerMoved.ID );
            var player = Player.getByID( playerMoved.ID );
            player.move( playerMoved.position );
        });
        
    },
    update: function () {        
        if ( me ) {
            me.preventColisions( Coin.coins, Player.players );
            var playerMoved = me.enableCursors( cursors );
            
            if ( playerMoved && socket ) {
                console.log( 'Enviando mensagem player_moved' );
                socket.emit( 'player_moved', { ID: me.ID, position: me.position } )
            }    
        }
    }
};

game.state.add( 'GameState', GameState );
game.state.start( 'GameState' );