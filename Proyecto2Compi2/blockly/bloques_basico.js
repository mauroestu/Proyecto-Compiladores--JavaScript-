
Blockly.Blocks['booleanos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "valor");
    this.setOutput(true, "Boolean");
    this.setColour(230);
    this.setTooltip('Un valor booleano');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['booleanos'] = function(block) {
  var dropdown_valor = block.getFieldValue('valor');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_valor.replace('(','').replace(')','');
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['asignar'] = {
  init: function() {
    this.appendValueInput("expresion")
        .setCheck(["Number", "Boolean", "String"])
        .appendField("Asignar");
    this.appendDummyInput()
        .appendField("a la variable:")
        .appendField(new Blockly.FieldTextInput(""), "variable");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Asigna un nuevo valor a una variable.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['asignar'] = function(block) {
  var value_expresion = Blockly.JavaScript.valueToCode(block, 'expresion', Blockly.JavaScript.ORDER_ATOMIC);
  var text_variable = block.getFieldValue('variable');
  // TODO: Assemble JavaScript into code variable.
  var code = text_variable + ' = ' + value_expresion.replace('(','').replace(')','') + ';\n';
  return code;
};

Blockly.Blocks['aniadir_for'] = {
  init: function() {
    this.appendValueInput("valor")
        .setCheck(["Boolean", "Number"])
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"], ["%","%"], ["^","^"]]), "operacion");
    this.appendDummyInput()
        .appendField("a la variable")
        .appendField(new Blockly.FieldTextInput(""), "variable");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(175);
    this.setTooltip('Realiza una operación a una variable.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['aniadir_for'] = function(block) {
  var dropdown_operacion = block.getFieldValue('operacion');
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  var text_variable = block.getFieldValue('variable');
  // TODO: Assemble JavaScript into code variable.
  var code = text_variable + ' ' + dropdown_operacion + '= ' + value_valor.replace('(','').replace(')','');
  return code;
};

Blockly.Blocks['aniadir'] = {
  init: function() {
    this.appendValueInput("valor")
        .setCheck(["Boolean", "Number"])
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"], ["%","%"], ["^","^"]]), "operacion");
    this.appendDummyInput()
        .appendField("a la variable")
        .appendField(new Blockly.FieldTextInput(""), "variable");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Realiza una operación a una variable.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['aniadir'] = function(block) {
  var dropdown_operacion = block.getFieldValue('operacion');
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  var text_variable = block.getFieldValue('variable');
  // TODO: Assemble JavaScript into code variable.
  var code = text_variable + ' ' + dropdown_operacion + '= ' + value_valor.replace('(','').replace(')','') + ';\n';
  return code;
};

Blockly.Blocks['bloque_numero'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "valor");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip('Un número');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['bloque_numero'] = function(block) {
  var number_valor = block.getFieldValue('valor');
  // TODO: Assemble JavaScript into code variable.
  var code = number_valor.replace('(','').replace(')','');
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['aritmetica'] = {
  init: function() {
    this.appendValueInput("valor1")
        .setCheck(["Number", "String", "Boolean"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"], ["%","%"], ["^","^"]]), "operacion");
    this.appendValueInput("valor2")
        .setCheck(["Number", "String", "Boolean"]);
    this.setInputsInline(true);
    this.setOutput(true, ["Number", "String", "Boolean"]);
    this.setColour(230);
    this.setTooltip('Realiza una operación de concatenación, aritmética o lógica.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['aritmetica'] = function(block) {
  var value_valor1 = Blockly.JavaScript.valueToCode(block, 'valor1', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operacion = block.getFieldValue('operacion');
  var value_valor2 = Blockly.JavaScript.valueToCode(block, 'valor2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_valor1.replace('(','').replace(')','') + ' ' + dropdown_operacion + ' ' + value_valor2.replace('(','').replace(')','');
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['break'] = {
  init: function() {
    this.appendValueInput("id")
        .setCheck(null)
        .appendField("Terminar");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Setencia break.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['break'] = function(block) {
  var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'break' + ' ' + value_id.replace('(','').replace(')','')  + ';\n';
  return code;
};

Blockly.Blocks['cadena'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("❝")
        .appendField(new Blockly.FieldTextInput(""), "valor")
        .appendField("❞");
    this.setOutput(true, "String");
    this.setColour(160);
    this.setTooltip('Una cadena de carácteres');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['cadena'] = function(block) {
  var text_valor = block.getFieldValue('valor');
  // TODO: Assemble JavaScript into code variable.
  var code = '"' + text_valor.replace('(','').replace(')','') + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['case'] = {
  init: function() {
    this.appendValueInput("valor_comparacion")
        .setCheck(null)
        .appendField("case:");
    this.appendStatementInput("cuerpo_case")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Caso de un switch.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['case'] = function(block) {
  var value_valor_comparacion = Blockly.JavaScript.valueToCode(block, 'valor_comparacion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo_case = Blockly.JavaScript.statementToCode(block, 'cuerpo_case');
  // TODO: Assemble JavaScript into code variable.
  var code = 'case ' + value_valor_comparacion.replace('(','').replace(')','')  + ':\n' + statements_cuerpo_case.replace('(','').replace(')','');
  return code;
};

Blockly.Blocks['continue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("continuar");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Sentencia continue.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['continue'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'continue;\n';
  return code;
};

Blockly.Blocks['declarar_var'] = {
  init: function() {
    this.appendValueInput("variable")
        .setCheck(null)
        .appendField("Declarar")
        .appendField(new Blockly.FieldDropdown([["num","num"], ["bool","bool"], ["str","str"]]), "tipo_dato")
        .appendField(new Blockly.FieldTextInput(""), "variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Para declarar variables.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['declarar_var'] = function(block) {
  var dropdown_tipo_dato = block.getFieldValue('tipo_dato');
  var text_variable = block.getFieldValue('variable');
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
    var code = '' ;
    if(value_variable == ''){
        code = dropdown_tipo_dato + ' ' + text_variable + ';\n';
    }
    else{
        code = dropdown_tipo_dato + ' ' + text_variable + ': ' + value_variable.replace('(','').replace(')','') + ';\n';
    }
  
  return code;
};

Blockly.Blocks['declarar_var_for'] = {
  init: function() {
    this.appendValueInput("variable")
        .setCheck(null)
        .appendField("Declarar para For")
        .appendField(new Blockly.FieldDropdown([["num","num"], ["bool","bool"], ["str","str"]]), "tipo_dato")
        .appendField(new Blockly.FieldTextInput(""), "variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('Para declarar variables.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['declarar_var_for'] = function(block) {
  var dropdown_tipo_dato = block.getFieldValue('tipo_dato');
  var text_variable = block.getFieldValue('variable');
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
 var code =   dropdown_tipo_dato + ' ' + text_variable + ': ' + value_variable.replace('(','').replace(')','');
  
  return code;
};

Blockly.Blocks['default'] = {
  init: function() {
    this.appendStatementInput("cuerpo_default")
        .setCheck(null)
        .appendField("default:");
    this.setPreviousStatement(true, null);
    this.setColour(20);
    this.setTooltip('default de un switch');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['default'] = function(block) {
  var statements_cuerpo_default = Blockly.JavaScript.statementToCode(block, 'cuerpo_default');
  // TODO: Assemble JavaScript into code variable.
  var code = 'default: \n' + statements_cuerpo_default;
  return code;
};

Blockly.Blocks['do_while'] = {
  init: function() {
    this.appendStatementInput("cuerpo while")
        .setCheck(null)
        .appendField("Hacer");
    this.appendValueInput("condicion")
        .setCheck("Boolean")
        .appendField("Mientras");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Sentencia do while.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['do_while'] = function(block) {
  var statements_cuerpo_while = Blockly.JavaScript.statementToCode(block, 'cuerpo while');
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'do\n{\n' + statements_cuerpo_while + '}\nwhile(' + value_condicion.replace('(','').replace(')','') + ')\n';
  return code;
};

Blockly.Blocks['do_whilex'] = {
  init: function() {
    this.appendStatementInput("cuerpo while")
        .setCheck(null)
        .appendField("Hacer");
    this.appendValueInput("condicion1")
        .setCheck("Boolean")
        .appendField("Mientras");
    this.appendValueInput("condicion2")
        .setCheck("Boolean")
        .appendField(",");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Sentencia do-whilex.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['do_whilex'] = function(block) {
  var statements_cuerpo_while = Blockly.JavaScript.statementToCode(block, 'cuerpo while');
  var value_condicion1 = Blockly.JavaScript.valueToCode(block, 'condicion1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condicion2 = Blockly.JavaScript.valueToCode(block, 'condicion2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'do\n{\n' + statements_cuerpo_while + '}\nwhilex(' + value_condicion1.replace('(','').replace(')','') + ',' + value_condicion2.replace('(','').replace(')','') + ')\n';
  return code;
};

Blockly.Blocks['excepcion'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Throws:")
        .appendField(new Blockly.FieldDropdown([["NullPointerException","NullPointerException"], ["MissingReturnStatement","MissingReturnStatement"], ["ArithmeticException","ArithmeticException"], ["StackOverFlowException","StackOverFlowException"], ["HeapOverFlowException","HeapOverFlowException"], ["PoolOverFlowException","PoolOverFlowException"]]), "nombre");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Lanza la excepción seleccionada.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['excepcion'] = function(block) {
  var dropdown_nombre = block.getFieldValue('nombre');
  // TODO: Assemble JavaScript into code variable.
  var code =  'throws(' + dropdown_nombre.replace('(','').replace(')','') + ');\n';
  return code;
};

Blockly.Blocks['for'] = {
  init: function() {
    this.appendStatementInput("variable_control")
        .setCheck(null)
        .appendField("Para:");
    this.appendValueInput("condicion")
        .setCheck("Boolean")
        .appendField("Mientras:");
    this.appendStatementInput("asignacion")
        .setCheck(null)
        .appendField("Asignar:");
    this.appendStatementInput("cuerpo")
        .setCheck(null)
        .appendField("Hacer:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Setencia for.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['for'] = function(block) {
  var statements_variable_control = Blockly.JavaScript.statementToCode(block, 'variable_control');
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_asignacion = Blockly.JavaScript.statementToCode(block, 'asignacion');
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code = 'for(' + statements_variable_control.replace('(','').replace(')','') + '; ' + value_condicion.replace('(','').replace(')','') + '; ' + 
      statements_asignacion.replace('(','').replace(')','') + ')\n{\n' + statements_cuerpo + '}\n' ;
  return code;
};

Blockly.Blocks['get_bool'] = {
  init: function() {
    this.appendValueInput("valor")
        .setCheck("String")
        .appendField("Obtener bool de:");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(160);
    this.setTooltip('Convierte un String a bool.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['get_bool'] = function(block) {
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'getBool(' + value_valor.replace('(','').replace(')','')  + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['get_num'] = {
  init: function() {
    this.appendValueInput("valor")
        .setCheck("String")
        .appendField("Obtener num de:");
    this.appendValueInput("base")
        .setCheck("String")
        .appendField(", base");
    this.appendValueInput("default")
        .setCheck("Number")
        .appendField("y default");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(160);
    this.setTooltip('Obtiene un número en una base predeterminada.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['get_num'] = function(block) {
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  var value_base = Blockly.JavaScript.valueToCode(block, 'base', Blockly.JavaScript.ORDER_ATOMIC);
  var value_default = Blockly.JavaScript.valueToCode(block, 'default', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'getNum(' + value_valor.replace('(','').replace(')','') + ',' + value_base.replace('(','').replace(')','') + ',' + 
      value_default.replace('(','').replace(')','') + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['get_random'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Número random");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(290);
    this.setTooltip('Obtiene un número random entre 0 y 1.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['get_random'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'getRandom()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['if'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck("Boolean")
        .appendField("Si");
    this.appendStatementInput("instrucciones")
        .setCheck(null)
        .appendField("Hacer");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('Sentencia de control if');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['if'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_instrucciones = Blockly.JavaScript.statementToCode(block, 'instrucciones');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(' + value_condicion.replace('(','').replace(')','') + ') then\n{\n' + statements_instrucciones + '}\n';
  return code;
};

Blockly.Blocks['ifelse'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck("Boolean")
        .appendField("Si");
    this.appendStatementInput("instrucciones")
        .setCheck(null)
        .appendField("Hacer");
    this.appendStatementInput("else")
        .setCheck(null)
        .appendField("Sino");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('Sentencia de control if-else');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['ifelse'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_instrucciones = Blockly.JavaScript.statementToCode(block, 'instrucciones');
  var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(' + value_condicion.replace('(','').replace(')','') + ') then\n{\n' + statements_instrucciones + '}\nelse\n{\n' + statements_else + '}\n';
  return code;
};

Blockly.Blocks['in_num'] = {
  init: function() {
    this.appendValueInput("msg")
        .setCheck("String")
        .appendField("Mostrar");
    this.appendValueInput("def")
        .setCheck("Number")
        .appendField(", default:");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(160);
    this.setTooltip('Pide un número al usuario, si no es válido, retorna el default.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['in_num'] = function(block) {
  var value_msg = Blockly.JavaScript.valueToCode(block, 'msg', Blockly.JavaScript.ORDER_ATOMIC);
  var value_def = Blockly.JavaScript.valueToCode(block, 'def', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'inNum(' + value_msg.replace('(','').replace(')','') + ',' + value_def.replace('(','').replace(')','') + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['in_str'] = {
  init: function() {
    this.appendValueInput("variable")
        .setCheck(null)
        .appendField("Guardar en:");
    this.appendValueInput("mensaje")
        .setCheck("String")
        .appendField(", mensaje:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Pide una cadena al usuario y lo guarda en la variable.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['in_str'] = function(block) {
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  var value_mensaje = Blockly.JavaScript.valueToCode(block, 'mensaje', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'inStr(' + value_variable.replace('(','').replace(')','') + ',' + value_mensaje.replace('(','').replace(')','') + ')' + ';\n';
  return code;
};

Blockly.Blocks['length_arreglo'] = {
  init: function() {
    this.appendValueInput("id")
        .setCheck(null)
        .appendField("Length de:");
    this.appendValueInput("dimension")
        .setCheck("Number")
        .appendField(", dimension:");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(290);
    this.setTooltip('Devuelve el tamaño del arreglo y su dimensión mensionados.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['length_arreglo'] = function(block) {
  var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  var value_dimension = Blockly.JavaScript.valueToCode(block, 'dimension', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'getLength(' + value_id.replace('(','').replace(')','') + ',' + value_dimension.replace('(','').replace(')','') + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['length_cadena'] = {
  init: function() {
    this.appendValueInput("cadena")
        .setCheck("String")
        .appendField("Length de:");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(290);
    this.setTooltip('Devuelve la longitud de la cadena que recibe como parámetro.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['length_cadena'] = function(block) {
  var value_cadena = Blockly.JavaScript.valueToCode(block, 'cadena', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'getLength(' + value_cadena.replace('(','').replace(')','') + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['logicos'] = {
  init: function() {
    this.appendValueInput("expresion1")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["&&","&&"], ["||","||"], ["|&","|&"], ["&?","&?"], ["|?","|?"]]), "valor");
    this.appendValueInput("expresion2")
        .setCheck("Boolean");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(210);
    this.setTooltip('Realiza una operación lógica');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['logicos'] = function(block) {
  var value_expresion1 = Blockly.JavaScript.valueToCode(block, 'expresion1', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_valor = block.getFieldValue('valor');
  var value_expresion2 = Blockly.JavaScript.valueToCode(block, 'expresion2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_expresion1.replace('(','').replace(')','') + ' ' + dropdown_valor + ' ' + value_expresion2.replace('(','').replace(')','');
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['loop'] = {
  init: function() {
    this.appendValueInput("dec_id")
        .setCheck(null)
        .appendField("Repetir");
    this.appendStatementInput("cuerpo_loop")
        .setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('Setencia loop.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['loop'] = function(block) {
  var value_dec_id = Blockly.JavaScript.valueToCode(block, 'dec_id', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo_loop = Blockly.JavaScript.statementToCode(block, 'cuerpo_loop');
  // TODO: Assemble JavaScript into code variable.
  var code = 'loop ' + value_dec_id.replace('(','').replace(')','') + '\n{\n' + statements_cuerpo_loop + '}\n';
  return code;
};

Blockly.Blocks['operador_not'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("!");
    this.appendValueInput("NAME")
        .setCheck("Boolean");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(210);
    this.setTooltip('Niega una expresión booleana');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['operador_not'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '!(' + value_name.replace('(','').replace(')','') + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['out_num'] = {
  init: function() {
    this.appendValueInput("numero")
        .setCheck("Number")
        .appendField("Imprimir número:");
    this.appendValueInput("valor_bool")
        .setCheck("Boolean")
        .appendField("como entero:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Imprime un número como entero o decimal.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['out_num'] = function(block) {
  var value_numero = Blockly.JavaScript.valueToCode(block, 'numero', Blockly.JavaScript.ORDER_ATOMIC);
  var value_valor_bool = Blockly.JavaScript.valueToCode(block, 'valor_bool', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'outNum(' + value_numero.replace('(','').replace(')','') + ',' + value_valor_bool.replace('(','').replace(')','') + ');\n';
  return code;
};

Blockly.Blocks['out_str'] = {
  init: function() {
    this.appendValueInput("cadena")
        .setCheck("String")
        .appendField("Imprimir:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Imprime en consola el texto recibido.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['out_str'] = function(block) {
  var value_cadena = Blockly.JavaScript.valueToCode(block, 'cadena', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'outStr(' + value_cadena.replace('(','').replace(')','') + ');\n';
  return code;
};

Blockly.Blocks['relacionales'] = {
  init: function() {
    this.appendValueInput("expresion1")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["==","=="], ["!=","!="], ["<","<"], [">",">"], ["<=","<="], [">=",">="]]), "NAME");
    this.appendValueInput("expresion2")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(210);
    this.setTooltip('Realiza operaciones relacionales');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['relacionales'] = function(block) {
  var value_expresion1 = Blockly.JavaScript.valueToCode(block, 'expresion1', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_name = block.getFieldValue('NAME');
  var value_expresion2 = Blockly.JavaScript.valueToCode(block, 'expresion2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_expresion1.replace('(','').replace(')','') + ' ' + dropdown_name + ' ' + value_expresion2.replace('(','').replace(')','');
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['repeat_until'] = {
  init: function() {
    this.appendStatementInput("cuerpo while")
        .setCheck(null)
        .appendField("Repetir");
    this.appendValueInput("condicion")
        .setCheck("Boolean")
        .appendField("Mientras no");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('Sentencia repeat-until.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['repeat_until'] = function(block) {
  var statements_cuerpo_while = Blockly.JavaScript.statementToCode(block, 'cuerpo while');
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'repeat \n{\n' + statements_cuerpo_while + '}\nuntil(' + value_condicion.replace('(','').replace(')','') + ')\n';
  return code;
};

Blockly.Blocks['return'] = {
  init: function() {
    this.appendValueInput("expresion")
        .setCheck(null)
        .appendField("Retornar");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('Sentencia return.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['return'] = function(block) {
  var value_expresion = Blockly.JavaScript.valueToCode(block, 'expresion', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'return ' + value_expresion.replace('(','').replace(')','') + ';\n';
  return code;
};

Blockly.Blocks['show'] = {
  init: function() {
    this.appendValueInput("cadena")
        .setCheck("String")
        .appendField("Mostrar:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Muestra una ventana emergente al usuario el texto ingresado.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['show'] = function(block) {
  var value_cadena = Blockly.JavaScript.valueToCode(block, 'cadena', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'show(' + value_cadena.replace('(','').replace(')','') + ');\n';
  return code;
};

Blockly.Blocks['switch'] = {
  init: function() {
    this.appendValueInput("exp_comparar")
        .setCheck(null)
        .appendField("Expresión:");
    this.appendValueInput("modo")
        .setCheck("Boolean")
        .appendField("Modo:");
    this.appendStatementInput("cuerpo")
        .setCheck(null)
        .appendField("Selecciona");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('Estructura de un switch.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['switch'] = function(block) {
  var value_exp_comparar = Blockly.JavaScript.valueToCode(block, 'exp_comparar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_modo = Blockly.JavaScript.valueToCode(block, 'modo', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code = 'switch(' + value_exp_comparar.replace('(','').replace(')','') + ',' + value_modo.replace('(','').replace(')','') + ')\n{\n' + statements_cuerpo + '}\n';
  return code;
};

Blockly.Blocks['variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "varNombre");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('Ingresa el nombre de una variable.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['variable'] = function(block) {
  var text_varnombre = block.getFieldValue('varNombre');
  // TODO: Assemble JavaScript into code variable.
  var code = text_varnombre.replace('(','').replace(')','');
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['while_count'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck("Boolean")
        .appendField(new Blockly.FieldDropdown([["while","while"], ["count","count"]]), "tipo_ciclo");
    this.appendStatementInput("cuerpo while")
        .setCheck(null)
        .appendField("Hacer");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Setencia while o count.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['while_count'] = function(block) {
  var dropdown_tipo_ciclo = block.getFieldValue('tipo_ciclo');
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo_while = Blockly.JavaScript.statementToCode(block, 'cuerpo while');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_tipo_ciclo + '(' + value_condicion.replace('(','').replace(')','') + ')\n{\n' + statements_cuerpo_while + '}\n';
  return code;
};



