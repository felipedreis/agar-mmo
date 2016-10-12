const express     = require( 'express' );
const app         = express();
const cors        = require( 'cors' );
const bodyParser  = require( 'body-parser' );
const http        = require( 'http' ).Server( app );
    
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

io.set( 'origins', '*:*' );
io.on( 'connection', function( socket ){
  console.log( 'User connected.' );
});