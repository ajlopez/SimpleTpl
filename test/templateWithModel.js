
var $ = require('../');

exports['do template'] = function (test) {
	test.equal(doTemplate("Hello, World"), "Hello, World");
}

exports['do template with model'] = function (test) {
	var model = {};
	var context = {};

	model.x = "World";
	model.y = "Hello";

	test.equal(doTemplate("Hello, ${x}", model, context), "Hello, World");
	test.equal(doTemplate("${y}, ${x}", model, context), "Hello, World");
}
	
exports['do template with model and context'] = function (test) {
	var model = {};
	var context = {};

	model.x = "World";
	model.y = "Hello";

	context.x = "Mundo";
	context.z = "Hola";

	test.equal(doTemplate("${z}, ${x}", model, context), "Hola, World");
}

exports['do template with for command'] = function (test) {
	test.equal(doTemplate("<# for (var k = 1; k <= 3; k++) { #>\r\n${k}\r\n<# } #>\r\n"), "1\r\n2\r\n3\r\n");
}
	
function doTemplate(text, model, context)
{
    var template = $.compileTemplate(text);
    return template(model, context);
}

