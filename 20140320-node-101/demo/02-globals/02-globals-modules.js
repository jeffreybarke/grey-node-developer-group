a = 5;

console.log(global.a);

var module = require('./module');
console.log('Calling function module: ', module());
console.log('Oops, overwrote a: ', global.a);