Blockly.Blocks['principal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Para Principal");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.setColour(290);
    this.setTooltip('Declaración de método principal.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['principal'] = function(block) {
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
    var code = 'Principal()\n{\n' + statements_cuerpo + '}\n';
    ActualizarFunciones('principal',code);
    
  return code;
};

Blockly.Blocks['parametro'] = {
  init: function() {
    this.appendValueInput("dec_parametro")
        .setCheck(null)
        .appendField("Parámetro Tipo:")
        .appendField(new Blockly.FieldTextInput("num"), "type")
        .appendField("Nombre")
        .appendField(new Blockly.FieldTextInput(""), "nombre");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Parametro');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['parametro'] = function(block) {
  var text_type = block.getFieldValue('type');
  var text_nombre = block.getFieldValue('nombre');
  var value_dec_parametro = Blockly.JavaScript.valueToCode(block, 'dec_parametro', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = text_type + ' ' + text_nombre;
  return code;
};

Blockly.Blocks['funcion'] = {
  init: function() {
    this.appendStatementInput("parametros")
        .setCheck(null)
        .appendField("Parametros");
    this.appendStatementInput("cuerpo")
        .setCheck(null)
        .appendField("Cuerpo Función");
    this.appendValueInput("nombre")
        .setCheck(null)
        .appendField("Nombre de la función");
    this.appendValueInput("retorno")
        .setCheck(null)
        .appendField("Tipo retorno");
    this.setInputsInline(true);
    this.setColour(105);
    this.setTooltip('Declaración de una función.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['funcion'] = function(block) {
  var statements_parametros = Blockly.JavaScript.statementToCode(block, 'parametros');
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  var value_nombre = Blockly.JavaScript.valueToCode(block, 'nombre', Blockly.JavaScript.ORDER_ATOMIC);
  var value_retorno = Blockly.JavaScript.valueToCode(block, 'retorno', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '';
    if(value_nombre != ''){
        code = value_retorno.replace('(','').replace(')','') + ': ' + value_nombre.replace('(','').replace(')','') + '(' + statements_parametros + ')\n{\n' + statements_cuerpo + '}\n';
        ActualizarFunciones(value_nombre.replace('(','').replace(')',''),code);
    }
  return code;
};

Blockly.Blocks['tipo_retorno'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Retorna: ")
        .appendField(new Blockly.FieldTextInput("void"), "retorno");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip('Tipo de retorno para métodos y funciones.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['tipo_retorno'] = function(block) {
  var text_retorno = block.getFieldValue('retorno');
  // TODO: Assemble JavaScript into code variable.
  var code = text_retorno;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['nombre_funcion'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "Nombre");
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip('Indica el nombre de la función o struct.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['nombre_funcion'] = function(block) {
  var text_nombre = block.getFieldValue('Nombre');
  // TODO: Assemble JavaScript into code variable.
  var code = text_nombre.replace('(','').replace(')','');
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['struct'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("Nombre:");
    this.appendStatementInput("atributos")
        .setCheck(null)
        .appendField("Atributos:");
    this.setInputsInline(true);
    this.setColour(180);
    this.setTooltip('Declaración de un struct');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['struct'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_atributos = Blockly.JavaScript.statementToCode(block, 'atributos');
  // TODO: Assemble JavaScript into code variable.
  var code = '';
    if(value_name != ''){
        code = 'element: ' + value_name.replace('(','').replace(')','') + '\n{\n' + statements_atributos + '}\n'
        ActualizarFunciones(value_name.replace('(','').replace(')',''),code);
    }
  return code;
};

Blockly.Blocks['atributo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tipo")
        .appendField(new Blockly.FieldTextInput(""), "tipo")
        .appendField("Nombre")
        .appendField(new Blockly.FieldTextInput(""), "nombre");
    this.appendValueInput("valor_inicial")
        .setCheck(null)
        .appendField("Valor");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
    this.setTooltip('Atributo para elements.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['atributo'] = function(block) {
  var text_tipo = block.getFieldValue('tipo');
  var text_nombre = block.getFieldValue('nombre');
  var value_valor_inicial = Blockly.JavaScript.valueToCode(block, 'valor_inicial', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = text_tipo + ' ' + text_nombre + ': ' + value_valor_inicial.replace('(','').replace(')','') + ';\n';
  return code;
};