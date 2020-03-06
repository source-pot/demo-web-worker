
onmessage = function( {data} )
{
	sort( data );
}

function sort( list )
{
	// sort the list and return it to the client

	// in this example we'll just send a message back to say we're done
	postMessage( list );
}