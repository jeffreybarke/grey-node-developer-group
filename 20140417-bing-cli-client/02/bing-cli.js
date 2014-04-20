/* jshint node: true */

var readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

rl.question('Search Google for: ', function(answer) {
	'use strict';
	console.log('You\'re searching for...', answer);
	rl.close();
});