
function compileCode(text, values)
{
    const pos = text.indexOf("<#");
    
    if (pos < 0)
    {        
        const l = values.length;
        values.push(text);
       
        return "writer.write($values[" + l + "]);";
    }
        
    let code = '';
        
    const left = text.slice(0, pos);
    
    if (left)
        code = compileToCode(left, values);

    text = text.slice(pos + 2);
    const pos2 = text.indexOf("#>");
    
    const cmd = text.slice(0, pos2);
    
    code += cmd;
    
    var right = text.slice(pos2 + 2);
    
    if (right[0] === '\r')
        right = right.substring(1);
        
    if (right[0] === '\n')
        right = right.substring(1);
    
    if (right)
        code += compileToCode(right, values);
        
    return code;
}

function compileToCode(text, values)
{
    const pos = text.indexOf("${");
    
    if (pos < 0)
        return compileCode(text, values);
        
    let code = '';
        
    const left = text.slice(0, pos);
    
    if (left)
        code = compileCode(left, values);
    
    text = text.slice(pos + 2);
    const pos2 = text.indexOf("}");
    
    const expr = text.slice(0, pos2);
    
    code += "writer.write(" + expr +");";
    
    const right = text.slice(pos2 + 1);
    
    if (right)
        code += compileToCode(right, values);
        
    return code;
}

function TemplateWriter() {
    this.output = '';
};

TemplateWriter.prototype.write = function(text)
{
    if (text == null)
        return;

    this.output += text;
};

TemplateWriter.prototype.send = function(text)
{
    this.output = text;
};

function compileTemplate($text) {
    const $values = [];
    const $code = compileToCode($text, $values);
    const fun = new Function("writer", "model", "context", "$values", "function include(name, newmodel) { model.__include(writer, name, newmodel); } with (context) with (model) {" + $code + "}");

    return function(model, context) { 
        const writer = new TemplateWriter();
        fun(writer, model || { }, context || { }, $values); 

        return writer.output;
    }
};

function isTemplateText(text)
{
    if (text == null)
        return false;

    if (text.indexOf('<#')>=0)
        return true;

    if (text.indexOf('${')>=0)
        return true;

    return false;
}

function compile(str, options)
{
    if (!isTemplateText(str))
        return function(model) { return str; };
        
    const fn = compileTemplate(str);

    return function(model) {
        return fn(model, options.context);
    }
}

module.exports = {
    compileTemplate: compileTemplate,
    isTemplateText: isTemplateText,
    compile: compile
}

