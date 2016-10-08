const game = new Phaser.Game( constantsModule.GAME_WIDHT, constantsModule.GAME_HEIGHT, Phaser.AUTO, 'gameContainer' );

const Player = playerModule( game );
const Coin = coinModule( game );

var player;

const GameState = {
    preload: function () {
        game.load.image( 'background', 'assets/space.jpg' );
        game.load.image( 'coin', 'assets/coin.png' );
    },
    create: function () {
        game.add.sprite( 0, 0, 'background' );

        Coin.create();

        player = Player.create();
    },
    update: function () {
        player.update();
    }
};

game.state.add( 'GameState', GameState );
game.state.start( 'GameState' );