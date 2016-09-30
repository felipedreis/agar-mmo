const express     = require( 'express' );
const app         = express();
const cors        = require( 'cors' );
const bodyParser  = require( 'body-parser' );
    
const PORT = 3000;

app.use( cors() ); // Used to cheat 'Same Origem Policy' from browsers

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.use( require( './routes/index.js' ) );

app.listen( PORT, function(){
  console.log( 'API running on http://localhost:' + PORT );
});