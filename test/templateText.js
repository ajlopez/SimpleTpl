
var $ = require('../');

exports['is template text'] = function (test) {
	test.ok(!$.isTemplateText());
	test.ok(!$.isTemplateText(null));
	test.ok(!$.isTemplateText("Hello, world"));
	test.ok(!$.isTemplateText("<h1>Hello, world</h1>"));

	test.ok($.isTemplateText("1 + 2 = ${1+2}"));
	test.ok($.isTemplateText("<#var x = 'My World'; #>Hello, ${x}"));
	test.ok($.isTemplateText("<#for (var k=1; k<=6; k++) writer.write(k);#>"));
};  
