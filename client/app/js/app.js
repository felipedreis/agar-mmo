const game = new Phaser.Game( constantsModule.GAME_WIDHT, constantsModule.GAME_HEIGHT, Phaser.CANVAS, 'gameContainer' );

var Player;
var Coin;

var cursors;
var player;

const GameState = {
    preload: function () {
        game.load.image( 'background', 'assets/space.jpg' );
        game.load.image( 'coin', 'assets/coin.png' ); 

        cursors = game.input.keyboard.createCursorKeys();       
    },
    create: function () {
        game.physics.startSystem( Phaser.Physics.ARCADE );

        game.add.sprite( 0, 0, 'background' );

        Player = playerModule( game );
        Coin = coinModule( game );        
        
        Coin.create();

        player = Player.create();
    },
    update: function () {
        player.move( cursors );
        player.preventColisions( Coin.coins );
    }
};

game.state.add( 'GameState', GameState );
game.state.start( 'GameState' );