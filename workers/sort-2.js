
onmessage = function( {data} )
{
	console.log( 'sort-2 starting' );
	sort( data );
}

function sort( list )
{
	// sort the list and return it to the client

	// in this example we'll just send a message back to say we're done
	postMessage( list );
}