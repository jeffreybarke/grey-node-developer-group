/* jshint node: true */

var readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	}),

	request = require('request');

rl.question('Search Google for: ', function(answer) {
	'use strict';
	answer = answer.trim();
	if (answer.length) {
		console.log('You\'re searching for...', answer);
		request('https://www.bing.com/search?go=&qs=ds&form=QBLH&q=' + answer,
				function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log(body);
			} else {
				console.log('Something went wrong... ', error);
			}
			rl.close();
		});
	} else {
		console.log('You didn\'t enter anything!');
		rl.close();
	}
});