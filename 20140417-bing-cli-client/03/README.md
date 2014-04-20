# Bing CLI client step three

In step three, we'll use the third-party
`[request](https://www.npmjs.org/package/request)` module to actually make a
request to Bing.

To install the `request` module, update the `dependencies` object of
`package.json` with the module name (in this case, "request") and the version
desired (see "[Package.json dependencies done right](http://blog.nodejitsu.com/package-dependencies-done-right/)"):

```javascript
"dependencies": {
	"request": "2.34.x"
},
```

Once that's done, run the following in Terminal in the same directory as
`package.json`:

    npm install

A `node_modules` directory will appear containing `request`. Now, we'll update
`bing-cli.js` to use it:

```javascript
/* jshint node: true */

var readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	}),

	request = require('request');
```

Within `rl.question`, first we'll check to ensure the user has provided an
answer:

```javascript
rl.question('Search Google for: ', function(answer) {
	'use strict';
	var answer = answer.trim();
	if (answer.length) {
		console.log('You\'re searching for...', answer);
		// We'll make our request here
	} else {
		console.log('You didn\'t enter anything!');
		rl.close();
	}
});
```

Where it says, "We'll make our request here", we will:

```javascript
request('https://www.bing.com/search?go=&qs=ds&form=QBLH&q=' + answer,
		function(error, response, body) {
	if (!error && response.statusCode === 200) {
		console.log(body);
	} else {
		console.log('Something went wrong... ', error);
	}
	rl.close();
});
```

At this point, the code should be relatively straightforward, though not
particularly elegant. And the response from Bing is just a bunch of HTML
dumped into the terminal. We'll try and do something about that in the next
step.

_Actually, there is one thing to note. There are two calls to rl.close in this
code. There can't be just one call to rl.close, outside of the first if
condition, since the request won't have time to execute. When working with
Node, final actions have to be called within callbacks._