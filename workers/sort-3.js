
onmessage = ( {data} ) => {
	sort( data );
}

/**
 * Selection sort.
 * 
 * This sort works by finding the lowest number in the list and moving it to position (i)
 * We do this repeatedly, incrementing (i) then finding the lowest number in the list again,
 * until there are no more items to check (when (i) is final element in the list)
 */
const sort = ( list ) => {
	// sort the list and return it to the client
	for( let i = 0; i < list.length; i++ )
	{
		let idx = i, min = list[i];
		for( let j = i+1; j < list.length; j++ )
		{
			if( list[j] < min )
			{
				min = list[j];
				idx = j;
			}
		}

		if( idx > i )
		{
			list.splice( idx,1 );
			list.splice( i, 0, min );
		}
	}

	// in this example we'll just send a message back to say we're done
	postMessage( list );
}