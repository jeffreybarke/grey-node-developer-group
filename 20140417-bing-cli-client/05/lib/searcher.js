/* jshint node: true */

var request = require('request'),
	jsdom = require('jsdom');

module.exports = function() {
	'use strict';

	var url = 'https://www.bing.com/search?go=&qs=ds&form=QBLH&q=',

		parseResponse = function(html, cb) {
			var ret = [];
			jsdom.env(html, [
				'http://code.jquery.com/jquery.js'
			], function(err, w) {
				var $ = w.$;
				if (err) {
					cb(err);
				} else {
					$('.b_algo').each(function(i, elem) {
						var $link = $(elem).find('h2 a');
						ret.push({
							index: i,
							link: $link.attr('href'),
							title: $link.text()
						});
					});
					cb(null, ret);
				}
			});
		};

	this.get = function(term, cb) {
		if (term) {
			request({
				url: url + term,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS ' +
							'X 10.8; rv:28.0) Gecko/20100101 Firefox/28.0'
				}
			}, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					parseResponse(body, function(err, results) {
						if (err) {
							cb(err);
						} else {
							cb(null, results);
						}
					});
				} else {
					cb(error);
				}
			});
		} else {
			cb('We need a URL, yo!');
		}
	};

};