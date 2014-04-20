for (var i = 10; i > -1; i--) {
	setTimeout(function(i) {
		if (i === 0 ) {
			console.log('Boom!');
		} else {
			console.log(i);
		}
	}.bind(null, i), Math.abs(i - 10) * 1000);
}