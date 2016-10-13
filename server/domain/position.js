const constants = require( '../helpers/constants' );

module.exports = {
    getRandomPosition : function() {
        return {
            x : Math.floor( Math.random() * constants.GAME_WIDHT ),
            y : Math.floor( Math.random() * constants.GAME_HEIGHT )    
        };      
    }
};