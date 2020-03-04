

// allow some convenience shortcuts
const Cfg = {};

// store our workers
let worker1, worker2, worker3;

// automatically start the app
(() => {
	// grab a reference to the button to start everything and an element to log things
	Cfg.workerBtn = document.getElementById( 'js-start-workers' );
	Cfg.output = document.getElementById( 'js-worker-output' );

	Cfg.workerBtn.addEventListener( 'click', startWorkers );
})();


function startWorkers()
{
	Cfg.output.innerHTML = '';
	output( 'generating list' );
	// generate a big list of random integers
	let list = [];
	const listSize = 10000;
	for( let i = 0; i < listSize; i++ )
		list.push( Math.round( Math.random() * listSize ) );

	// we'll have 3 different sorting methods to start with
	output( 'starting workers' );
	worker1 = new Worker( 'workers/sort-1.js' );
	worker2 = new Worker( 'workers/sort-2.js' );
	worker3 = new Worker( 'workers/sort-3.js' );

	// set up handlers to receive messages back
	worker1.onmessage = onmessage;
	worker2.onmessage = onmessage;
	worker3.onmessage = onmessage;

	// send the list to each worker so they can begin sorting
	output( 'sending list to each worker' );
	worker1.postMessage( list );
	worker2.postMessage( list );
	worker3.postMessage( list );
}

function onmessage( {data, target} )
{
	// figure out which worker sent us a message
	let worker_name =
		target === worker1 ? 'worker-1' :
		(target === worker2 ? 'worker-2' :
		(target === worker3 ? 'worker-3' :
		'unknown'
	));
	output( 'message received back from ' + worker_name );

	// TODO remove this debug
	console.log( worker_name, data );

	// worker is finished with now so we can terminate it
	target.terminate();
}



// convenience function to append a message to a visual component for the user
function output( str )
{
	Cfg.output.innerHTML += '<p>' + str + '</p>';
}