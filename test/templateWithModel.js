
var $ = require('../')
  , assert = require('assert');
  
assert.equal(doTemplate("Hello, World"), "Hello, World");

var model = {};
var context = {};

model.x = "World";
model.y = "Hello";

assert.equal(doTemplate("Hello, ${x}"), "Hello, World");
assert.equal(doTemplate("${y}, ${x}"), "Hello, World");

context.x = "Mundo";
context.z = "Hola";
assert.equal(doTemplate("${z}, ${x}"), "Hola, World");

assert.equal(doTemplate("<# for (var k = 1; k <= 3; k++) { #>\r\n${k}\r\n<# } #>\r\n"), "1\r\n2\r\n3\r\n");

function doTemplate(text)
{
    var template = $.compileTemplate(text);
    return template(model, context);
}

