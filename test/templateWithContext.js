
var $ = require('../');
  
exports['do template'] = function (test) {
	var context = {};

	context.x = "World";
	context.y = "Hello";

	test.equal(doTemplate("Hello, ${x}", context), "Hello, World");
	test.equal(doTemplate("${y}, ${x}", context), "Hello, World");
}

exports['do template using function'] = function (test) {
	var result;
	var context = {};

	context.include = function(text) { result = text; };

	doTemplate("<# include('foo'); #>", context);

	test.equal(result, 'foo');
}
	
function doTemplate(text, context)
{
    var template = $.compileTemplate(text);
    return template(null, context);
}

