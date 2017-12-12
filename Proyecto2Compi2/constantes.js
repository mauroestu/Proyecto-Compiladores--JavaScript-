var con_str = '(cadena)';
var con_num = '(numero)';
var con_bool = '(bool)';
var con_tstr = 'str';
var con_tnum = 'num';
var con_tbool = 'bool';
var con_tnull = 'null';
var con_temporal = '(temporal)';
var con_element = '(element)';
var con_null = '(null)';
var con_nothing = 'nothing';
var con_void = 'void';
var con_global = 'global';
var con_metodo = 'metodo';
var con_funcion = 'funcion';

//---- Constantes de sentencias de control
var con_ciclo = 'ciclo';
var con_loop = 'lopp'
var con_if = 'if';
var con_switch = 'switch';

//---- Constantes para no terminales

var con_decprincipal = 'DECLARACION_PRINCIPAL';
var con_decmetodo = 'DECLARACION_METODO';
var con_decfuncion = 'DECLARACION_FUNCION';
var con_decelement = 'DECLARACION_ELEMENT';
var con_decvar = 'DEC_VAR';
var con_decif = 'DEC_IF';
var con_decswitch = 'DEC_SWITCH';
var con_decwhile = 'DEC_WHILE';
var con_decdowhile = 'DEC_DOWHILE';
var con_decrepeat = 'DEC_REPEAT';
var con_decloop = 'DEC_LOOP';
var con_deccount = 'DEC_COUNT';
var con_decwhilex = 'DEC_WHILEX';
var con_decbreak = 'DEC_BREAK';
var con_deccontinue = 'DEC_CONTINUE';
var con_decreturn = 'DEC_RETURN';
var con_asignacion = 'ASIGNACION';
var con_mllamada = 'DEC_LLAMADA';
var con_decshow = 'DEC_SHOW';
var con_decarreglo = 'DEC_ARREGLO';
var con_decbool = 'getBool';
var con_declength = 'getLength';
var con_decnum = 'getNum';
var con_outstr = 'DEC_OUTSTR';
var con_outnum = 'DEC_OUTNUM';
var con_instr = 'DEC_INSTR';
var con_innum = 'inNum';
var con_throw = 'DEC_THROW';
var con_decfor = 'DEC_FOR';

//--- Constantes de los nombres de excepciones
var ex_null = 'NullPointerException';
var ex_missing = 'MissingReturnStatement';
var ex_aritmetic = 'ArithmeticException';
var ex_stack = 'StackOverFlowException';
var ex_heap = 'HeapOverFlowException';
var ex_pool = 'PoolOverFlowException';


//---- Métodos auxiliares

function ObtenerInfo(Token){
    var strResultado = '';
        
    var token = Token.replace('"','').replace('\'','').split(' ');
    strResultado = token[token.length - 1].toString();
    
    return strResultado;
}

function ObtenerToken(Token){
    var strResultado = '';
    
    var token = Token.replace('"','').replace('\'','').split(' ');
    
    for(var i = 0; i < token.length - 1; i++){
        strResultado += token[i].toString();
    }
    
    if(strResultado == '') strResultado = ' ';
    
    
    return strResultado;
}

function ToBool(data){
    var valor = -1;
    
    if(data.toString() == 'true') valor =  1; 
    else if(data.toString() == 'false') valor = 0;
    
    return valor;
}

function AgregarSimbolo(Nombre,Tipo,Ambito,Rol,Posicion){
    //TextoSimbolos += '<tbody>'
    TextoSimbolos += '<tr>'
    TextoSimbolos += '<td>' + Nombre + '</td>'
    TextoSimbolos += '<td>' + Tipo + '</td>'
    TextoSimbolos += '<td>' + Ambito + '</td>'
    TextoSimbolos += '<td>' + Rol + '</td>'
    TextoSimbolos += '<td>' + Posicion + '</td>'
    TextoSimbolos += '</tr>'
    //TextoSimbolos += '</tbody>'
}

function AgregarErrores(){
    for(var i = 0; i < TablaError.length; i++){
        TextoErrores += '<tr>'
        TextoErrores += '<td>' + TablaError[i].Tipo + '</td>'
        TextoErrores += '<td>' + TablaError[i].Descripcion + '</td>'
        TextoErrores += '<td>' + TablaError[i].Posicion + '</td>'
        TextoErrores += '</tr>'
    }
}

//---- Constantes para codigo 3d.

var c3d_decmetodo = 'DECLARACION_METODO';
var c3d_asignacion = 'DEC_ASIGNACION';
var c3d_if = 'DEC_IF';
var c3d_goto = 'DEC_GOTO';
var c3d_etiqueta = 'DEC_ETIQUETA';
var c3d_llamada = 'DEC_LLAMADA';
var c3d_exit = 'DEC_EXIT';

//---- Constantes para el core
var c3d_sgb = 'DEC_SGB'; //listo
var c3d_show = 'DEC_SHOW'; //listo
var c3d_bool = 'DEC_BOOL'; //listo
var c3d_num = 'DEC_NUM'; //listo
var c3d_outstr = 'DEC_OUTSTR'; //listo
var c3d_outnum = 'DEC_OUTNUM'; //listo
var c3d_instr = 'DEC_INSTR'; //listo
var c3d_innum = 'DEC_INNUM'; //listo
var c3d_random = 'DEC_RANDOM'; //listo
var c3d_strlen = 'DEC_STRLEN'; //listo
var c3d_arrlen = 'DEC_ARRLEN'; //listo

//---- Constantes para funciones primitivas adicionales.
var c3d_igual = 'DEC_IGUAL';//listo
var c3d_nigual = 'DEC_NIGUAL';//listo
var c3d_mayor = 'DEC_MAYOR';//listo
var c3d_menor = 'DEC_MENOR';//listo
var c3d_numtostr = 'DEC_NUMSTR';//listo
var c3d_single = 'DEC_SINGLE';//listo
var c3d_boolstr = 'DEC_BOOLSTR';//listo

var c3d_stack = 'Stack';
var c3d_heap = 'Heap';
var c3d_pool = 'Pool';




