const express = require( 'express' );
const router  = express.Router();

var players = [];

var juan = {
    name: 'juanlopes',
    theme: 'red',
    position: {
        x: 40,
        y: 40
    },
    score: 8
};

players.push( juan );

router.get( '/player', function ( req, res ) {
  res.json( players );
});

module.exports = router;