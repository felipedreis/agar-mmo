const game = new Phaser.Game( constants.GAME_WIDHT, constants.GAME_HEIGHT, Phaser.CANVAS, 'gameContainer' );

var Player;
var Coin;

var cursors;
var player;

const GameState = {
    preload: function () {
        game.load.image( 'background', 'assets/space.jpg' );
        game.load.image( 'coin', 'assets/coin.png' ); 

        cursors = game.input.keyboard.createCursorKeys();
        
        var socket = io( 'http://localhost:3000' );
        socket.on( 'connect', function() {
            console.log( 'Connected' );
        });
    },
    create: function () {
        
        game.physics.startSystem( Phaser.Physics.ARCADE );
        game.physics.setBoundsToWorld();
        
        game.add.sprite( 0, 0, 'background' );

        Player = playerModule( game );
        Coin = coinModule( game );       
        
        Coin.create();
        
        setInterval( function(){
            Coin.create();
        }, 15 * 1000);        
        
        var me = {
            name: 'luisnascimento',
            theme: 'blue',
            position: {
                x: game.world.centerX,
                y: game.world.centerY
            },
            score: 0
        }
        player = Player.create( me );
                
        Player.loadPlayers( me );
    },
    update: function () {
        player.move( cursors );
        player.preventColisions( Coin.coins, Player.players );
    }
};

game.state.add( 'GameState', GameState );
game.state.start( 'GameState' );