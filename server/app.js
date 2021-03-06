const express     = require( 'express' );
const app         = express();
const cors        = require( 'cors' );
const bodyParser  = require( 'body-parser' );
const http        = require( 'http' ).Server( app );
const extend      = require( 'util' )._extend;

const Coin        = require( './domain/coin.js' );
const Player      = require( './domain/player.js' );
    
const PORT = 3000;

app.use( cors() ); // Used to cheat 'Same Origem Policy' from browsers
app.use( express.static( __dirname + '/node_modules' ) );

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.use( require( './routes/index.js' ) );
app.use( require( './routes/player.js' ) );

const server = app.listen( PORT, function() {
  console.log( 'API running on http://localhost:' + PORT );
});

const io = require( 'socket.io' )( server );

io.on( 'connection', function( socket ){
    
  socket.on( 'disconnect', function() {
    Player.remove( socket.ID );
    socket.broadcast.emit( 'player_disconnected', socket.ID );
  });
  
  socket.on( 'player_moved', function( playerMoved ) {
    var player = Player.getByID( playerMoved.ID ); 
    player.position = playerMoved.position;
    
    socket.broadcast.emit( 'player_moved', playerMoved );
  });
  
  socket.on( 'coin_eaten', function( coinID ) {
    var coin = Coin.getByID( coinID );
    coin.remove( function removeCallback() {
      socket.broadcast.emit( 'coin_eaten', coinID );  
    });    
    
    var player = Player.getByID( socket.ID );    
    player.score += 1;
    
    io.emit( 'player_scored', player );
  });
    
  var rivals = extend( [], Player.players ); // Copyng object instead of passing as reference
  var coins = extend( [], Coin.coins );
  var player = Player.register();
  
  socket.ID = player.ID;
  
  socket.broadcast.emit( 'player_registred', player );
  
  socket.emit( 'initial_state', {
    player: player,
    rivals: rivals,
    coins: coins
  });
    
  setInterval( function() {
    
    if( Coin.coins.length <= Player.players.length * 3 ) {
      var coin = Coin.generate();
      io.emit( 'new_coin', coin );
    }
        
  }, 5 * 1000 );

});