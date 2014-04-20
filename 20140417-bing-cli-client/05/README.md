# Bing CLI client step five

Time to parse that response from Bing. To do that, we'll use another
third-party module: `[jsdom](https://www.npmjs.org/package/jsdom)`. `jsdom` is
a JavaScript implementation of the W3C DOM.

To install it, add the following to `package.json`:

```javascript
"dependencies": {
	"jsdom": "0.10.x",
	"request": "2.34.x"
},
```

Then run `npm install` again.

Next, open up our custom module, `searcher.js`, and load it below request:

```javascript
var request = require('request'),
	jsdom = require('jsdom');
```

In the `get` method of our searcher, let's not pass the `body` to our callback,
instead we'll create a utility function, `parseResponse` and handle the HTML
there:

```javascript
request(url + term, function(error, response, body) {
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
```

And this is `parseResponse`:

```javascript
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
	})
};
```

`parseResponse` gets passed the HTML from our request and a callback. We then
pass that HTML to the `env` method of `jsdom`. The second parameter passed to
`jsdom` is an array of JS files to be injected into the DOM (in this case,
we want jQuery) and third is a callback for `jsdom`.

In that callback, we use jQuery to find all DOM elements with a class of
"b_algo" and then loop through them, constructing an array of objects to
return. These objects will have the following structure:

```javascript
{
	index: integer,
	link: URL to search result,
	title: Text of search result
}
```

We then pass that array all the way back to our original searcher, in
`bing-cli.js`, which needs to be updated to display our results:

```javascript
searcher.get(answer, function(err, results) {
	if (err) {
		throw new Error(err);
	}
	if (results && results.length) {
		results.forEach(function(val, i) {
			var result = (val.index + 1) + ') ' + val.title + '\n';
			rl.write(result);
		});
	}
	rl.close();
});
```

So, at this point, we're pretty close. In our next, and final, step, we'll go
out and retrieve the HTML of the search result the user selects.