# Bing CLI client step four

In step four, we'll refactor our existing code by creating our own module,
`searcher.js`. We'll keep the CLI stuff in `bing-cli.js`, but all of the
`request` logic will get moved into `searcher.js`.

So, in a directory named `lib`, we'll create `searcher.js`, which will start
off like this:

```javascript
/* jshint node: true */

var request = require('request');

module.exports = function() {
	'use strict';

};
```

As before, we have our JSHint flag and we include the `request` module. What's
new is how we expose our module's functionality; this is done by assigning
something to `module.exports`, everything else in the module is private in
scope.

In this case, we're assigning a function to `module.exports`, because I want to
use `new` (we'll see this in a bit). This is how it ends up looking:

```javascript
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
```

Returning to `bing-cli.js`, we'll replace the previous line 9, which loads the
`request` module with the following:

```javascript
	Searcher = require('./lib/searcher'),
	searcher = new Searcher();
```

First, we load our custom module (omitting the `.js` part of the filename,
since it's superfluous). This stores the exported function in a variable named
`Searcher`. Then we create an instance by invoking that function using the
`new` operator.

We can then remove the request logic from `bing-cli.js` and use the `get`
method of our searcher:

```javascript
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
```

That's it for this step. We're still just getting a lump of HTML back from
`searcher`, but it's better to have the request code separate from the
interface code.