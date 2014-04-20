a = 'Module global';
console.log('Module: ' + a);

module.exports = function() {
//	console.log(a);
	return a;
};