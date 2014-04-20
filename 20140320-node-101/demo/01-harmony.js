'use strict';

const x = 9;
console.log('My constant x:', x);

// Even with a try/catch, assignment to a const will cause the script to bail
/*
try {
	x = 10;
} catch(e) {
	console.log(e);
}
*/

console.log('y has block-level scope:');
for (var i = 0; i < 10; i++) {
	let y = i;
	console.log(y);
}
try {
	console.log(y);
} catch(e) {
	console.log(e);
}