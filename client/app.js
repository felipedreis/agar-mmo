const express     = require( 'express' );
const app         = express();
const bodyParser  = require( 'body-parser' );
const path        = require( 'path' );
    
const PORT = 80;

app.use( express.static( __dirname + '/app' ) );

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.use( '/', function ( req, res ){
  res.sendFile( path.join( __dirname, 'app/index.html' ) );
});

app.listen( PORT, function (){
  console.log( 'Running on http://localhost:' + PORT );
});