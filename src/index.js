
var HelloWorld = require('./hello-world');

var helloWorld = new HelloWorld({
  target: 'hello world'
});
helloWorld.seed(function(error) {
	if (error) console.error(error);
});