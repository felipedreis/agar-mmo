const playerService = ( function() {
    
    function getPlayers( onSucess, onError ) {
        util.getFromServer( constants.SERVER_BASE_URL + '/player', onSucess, onError );
    }
    
    return {
        getPlayers: getPlayers
    }
    
})();