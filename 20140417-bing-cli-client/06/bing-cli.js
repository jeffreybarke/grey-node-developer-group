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
			if (results && results.length) {
				results.forEach(function(val) {
					var result = (val.index + 1) + ') ' + val.title + '\n';
					rl.write(result);
				});
			}
			rl.question('Get a search result (#) or "Q" to quit: ',
					function(answer) {
				if (answer === 'Q' || answer === 'q') {
					rl.write('Bye!' + '\n');
					rl.close();
				} else {
					searcher.getPage(results[answer - 1].link,
							function(err, body) {
						console.log(body);
						rl.close();
					});
				}
			});
		});
	} else {
		console.log('You didn\'t enter anything!');
		rl.close();
	}
});