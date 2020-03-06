
onmessage = function( {data} )
{
	sort( data );
}

// move-largest-to-end-sort
// no idea what this is called, i just made it up
function sort( list )
{
	// sort the list and return it to the client
	for( let i = 0; i < list.length; i++ )
	{
		let idx = i, max = list[i];
		for( let j = i+1; j < list.length; j++ )
		{
			if( list[j] > max )
			{
				max = list[j];
				idx = j;
			}
		}

		list.splice( i, 0, max );
		list.splice( idx,1 );
	}

	// in this example we'll just send a message back to say we're done
	postMessage( list );
}