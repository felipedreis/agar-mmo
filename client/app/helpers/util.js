const util = ( function () {
    
    function postToServer( url, data, onSuccess, onError ) {
        
        $.post( url, data, function ( data, status ) {
            if ( status === 'success' ) {
                if ( typeof onSuccess === 'function' ) onSuccess( data );
            }
            else {
                if ( typeof onError === 'function' ) onError( data );
            }
        });
        
    }
    
    function getFromServer( url, onSuccess, onError ) {
        
        $.get( url, function ( data, status ) {
            if ( status === 'success' ) {
                if ( typeof onSuccess === 'function' ) onSuccess( data );
            }
            else {
                if ( typeof onError === 'function' ) onError( data );
            }
        });
        
    }
    
    return {
        postToServer: postToServer,
        getFromServer: getFromServer
    }
    
})();