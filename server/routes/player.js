const express = require( 'express' );
const router  = express.Router();

var players = [];

players.push({ name: 'luisnascimento', theme: 'red' });

router.get( '/player', function ( req, res ) {
  res.json( players );
});

module.exports = router;