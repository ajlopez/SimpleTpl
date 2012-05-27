
var $ = require('../')
  , assert = require('assert');
  
assert.equal(doTemplate("Hello, World"), "Hello, World");

assert.equal(doTemplate("1 + 2 = ${1+2}"), "1 + 2 = 3");
assert.equal(doTemplate("<#var x = 'My World'; #>Hello, ${x}"), "Hello, My World");
assert.equal(doTemplate("<#for (var k=1; k<=6; k++) writer.write(k);#>"), "123456");
assert.equal(doTemplate("<#for (var k=1; k<=6; k++) { #>${k}<# } #>"), "123456");

var result = doTemplate("<#for (var k=1; k<=6; k++) { #>${k}<# } #> Current time ${new Date()}");
assert.ok(result.indexOf("123456") >= 0);
assert.ok(result.indexOf("Current time") >= 0);
assert.ok(result.indexOf("#>") < 0);

function doTemplate(text)
{
    var template = $.compileTemplate(text);
    return template(null, {});
}

