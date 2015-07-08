
var $ = require('../');
  
exports['simple template'] = function (test) {
    test.equal(doTemplate("Hello, World"), "Hello, World");
    test.done();
}

exports['template using model and empty context'] = function (test) {
    var model = {};
    var context = {};

    model.x = "World";
    model.y = "Hello";

    test.equal(doTemplate("Hello, ${x}", model, context), "Hello, World");
    test.equal(doTemplate("${y}, ${x}", model, context), "Hello, World");
    
    test.done();
}

exports['template using model and context'] = function (test) {
    var model = {};
    var context = {};

    model.x = "World";
    model.y = "Hello";

    context.x = "Mundo";
    context.z = "Hola";
    
    test.equal(doTemplate("${z}, ${x}", model, context), "Hola, World");
    
    test.done();
}

function doTemplate(text, model, context)
{
    var template = $.compile(text, { context: context });
    return template(model);
}

