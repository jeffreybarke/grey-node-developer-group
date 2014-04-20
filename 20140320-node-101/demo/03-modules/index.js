var fs = require('fs'),
	cheerio = require('cheerio'),
	$ = cheerio.load('<h1>Node developer group</h1><p>Awesome fun, right?</p>');

console.log($.html());

$('p').html('Awesomesauce, right?');

console.log($.html());