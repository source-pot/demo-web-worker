

// allow some convenience shortcuts
const Cfg = {};

// store our workers
let worker1, worker2, worker3;
let workersOutstanding = 0;

let startTime;

// automatically start the app
(() => {
	// grab a reference to the button to start everything and an element to log things
	Cfg.workerBtn = document.getElementById( 'js-start-workers' );
	Cfg.output    = document.getElementById( 'js-output' );

	Cfg.workerBtn.addEventListener( 'click', startWorkers );
})();


function startWorkers()
{
	Cfg.workerBtn.disabled = true;

	Cfg.output.innerHTML = '';
	output( 'Generating random list of numbers' );
	// generate a big list of random integers
	let list = [];
	const listSize = 10000;
	for( let i = 0; i < listSize; i++ )
		list.push( Math.round( Math.random() * listSize ) );

	// we'll have 3 different sorting methods to start with
	output( 'Starting workers' );
	worker1 = new Worker( 'workers/sort-1.js' );
	worker2 = new Worker( 'workers/sort-2.js' );
	worker3 = new Worker( 'workers/sort-3.js' );

	// store the number of works we have running
	workersOutstanding = 3;

	// set up handlers to receive messages back
	worker1.onmessage = onmessage;
	worker2.onmessage = onmessage;
	worker3.onmessage = onmessage;

	// set up timing so we can see how long each sort took
	startTime = Date.now();

	// send the list to each worker so they can begin sorting
	output( 'Sending list to each worker (which starts their work)' );
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
	timeTaken = Math.floor( Date.now() - startTime );
	output( `${worker_name} finished in ${timeTaken} ms` );

	// worker is finished with now so we can terminate it
	target.terminate();

	// check if all workers have finished and re-enable the button
	if( --workersOutstanding === 0 )
		Cfg.workerBtn.disabled = false;
}



// convenience function to append a message to a visual component for the user
function output( str )
{
	Cfg.output.innerHTML += `<li>${str}</li>`;
}