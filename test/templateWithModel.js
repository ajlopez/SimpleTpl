
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

function doTemplate(text)
{
    var template = $.compileTemplate(text);
    return template(model, context);
}

