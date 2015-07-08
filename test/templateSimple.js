
var $ = require('../');

exports['simple template'] = function (test) {
	test.equal(doTemplate("Hello, World"), "Hello, World");
} 

exports['simple template with expression'] = function (test) {
	test.equal(doTemplate("1 + 2 = ${1+2}"), "1 + 2 = 3");
}

exports['simple template with variable'] = function (test) {
	test.equal(doTemplate("<# var x = 'My World'; #>Hello, ${x}"), "Hello, My World");
}

exports['simple template with for command'] = function (test) {
	test.equal(doTemplate("<#for (var k=1; k<=6; k++) writer.write(k);#>"), "123456");
}

exports['simple template with for command and expression'] = function (test) {
	var result = doTemplate("<#for (var k=1; k<=6; k++) { #>${k}<# } #> Current time ${new Date()}");
	test.ok(result.indexOf("123456") >= 0);
	test.ok(result.indexOf("Current time") >= 0);
	test.ok(result.indexOf("#>") < 0);
}
	
function doTemplate(text)
{
    var template = $.compileTemplate(text);
    return template(null, {});
}

