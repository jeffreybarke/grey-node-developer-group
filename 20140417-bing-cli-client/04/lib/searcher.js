/* jshint node: true */

var request = require('request');

module.exports = function() {
	'use strict';

	var url = 'https://www.bing.com/search?go=&qs=ds&form=QBLH&q=';

	this.get = function(term, cb) {
		if (term) {
			request(url + term, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					cb(null, body);
				} else {
					cb(error);
				}
			});
		} else {
			cb('We need a URL, yo!');
		}
	};

};