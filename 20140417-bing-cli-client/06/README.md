# Bing CLI client step six

In our final step, we'll allow the user to select one of the search results and
then retrieve the HTML for them. However, there's a lot more that _could_ be
done. For instance, we're only displaying the first eight search results.
Adding pagination would be fun. Or possibly doing something with the return
HTML instead of just dumping it to screen...

Regardless of where we _could_ go, for step six, let's edit `bing-cli.js` to
let the user select a search response. How could we implement that? By having
`readline` ask another question:

```javascript
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
```

We prompt them to enter a search result or press "Q" to quit. If they answer
with "q" (case-insensitive), we use the `write` method of `readline` to say
"Bye!" and then exit. If they enter anything else, we're going to call a new
method of searcher, `getPage`, and pass it a link and callback.

Note there's no validation here; we really should verify that there answer is
an integer and within the range that we presented them.

In our searcher module, let's add a new public method, `getPage`:

```javascript
	this.getPage = function(url, cb) {
		if (url) {
			request({
				url: url,
				timeout: 2000,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS ' +
							'X 10.8; rv:28.0) Gecko/20100101 Firefox/28.0'
				}
			}, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					cb(null, body);
				} else {
					cb(error);
				}
			});
		} else {
			cb('We need a URL, yo!')
		}
	};
```

It's very similar to the `get` method. So similar, in fact, that the two could
probably be refactored into one.

However, these might be tasks for the next Node Developer Group!