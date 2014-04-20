/* jshint node: true */

var readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	}),

	Searcher = require('./lib/searcher'),
	searcher = new Searcher();

rl.question('Search Google for: ', function(answer) {
	'use strict';
	answer = answer.trim();
	if (answer.length) {
		console.log('You\'re searching for...', answer);
		searcher.get(answer, function(err, results) {
			if (err) {
				throw new Error(err);
			}
			console.log(results);
			rl.close();
		});
	} else {
		console.log('You didn\'t enter anything!');
		rl.close();
	}
});