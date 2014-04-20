# Bing CLI client step two

In step two, we actually create the CLI using the built-in
[`readline` module](http://nodejs.org/api/readline.html). Readline "allows
reading a stream (such as `process.stdin`) on a line-by-line basis."

Looking at the code, we add a comment on line 1 to let
[JSHint](http://jshint.com/) know that this is a Node module:

```javascript
/* jshint node: true */
```

On line 3, we include the readline module. On line 4, we create a readline
`Interface` instance:

```javascript
var readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
```

The `createInterface` method takes an "options" object that has two required
properties:

* `input`: A readable stream to listen to
* `output`: A writable stream that the readline data is written to

`createInterface` is typically used with `process.stdin` and `process.stdout`,
which is exactly what we want; the command-line!

Once we have our interface, we can ask the "user" a question using the
`question` method:

```javascript
rl.question('Search Google for: ', function(answer) {
	'use strict';
	console.log('You\'re searching for...', answer);
	rl.close();
});
```

This is pretty straightforward; the most important thing to note is the
`rl.close()`. The close method is necessary to close the interface and
terminate the Node program. If you omit a call to close, you'll have to
`Ctrl+C` to exit Node and restore the Terminal prompt.