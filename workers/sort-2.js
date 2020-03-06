
onmessage = function( {data} )
{
	sort( data );
}

/**
 * Quicksort.
 * This sort works by partitioning the list into 2 sections
 * The first partition holds the sorted list (so grows as we sort)
 * The second partition holds the unsorted data (so shrinks as we sort)
 * We check each item in turn and move it from the unsorted partition to
 * the correct place in the sorted partition until the sorted partition is empty
 */
function sort( list )
{
	// sort the list and return it to the client
	for( let i = 0; i < list.length; i++ )
	{
		// the sorted partition is list[0] to list[i-1]
		// unsorted it list[i] to list[list.length-1]
		
		// as the sorted partition is already sorted, as soon as we find that we're smaller than a number, we can insert ourselves in that position
		for( let j = 0; j < i; j++ )
		{
			if( list[i] < list[j] )
			{
				let value = list[i];
				list.splice( i,1 );
				list.splice( j,0,value );
				break;
			}
		}
	}

	// in this example we'll just send a message back to say we're done
	postMessage( list );
}