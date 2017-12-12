/* Analizador léxico */
%lex
%%
//---- Tokens ignorados
\s+                   /* skip whitespace */
"%%".*                                /* IGNORE */
    
//---- Tipos de datos
"bool"      return 'pr_bool';
"num"       return 'pr_num';
"str"       return 'pr_str';
"array"     return 'pr_array';
"element"   return 'pr_element';
"void"      return 'pr_void';

"true"      return 'pr_true';
"false"     return 'pr_false';
"NULL"      return 'pr_null';

//---- Funciones primitivas
"Principal" return 'pr_principal';
"getBool"   return 'pr_getbool';
"getNum"    return 'pr_getnum';
"outStr"    return 'pr_outstr';
"outNum"    return 'pr_outnum';
"inStr"     return 'pr_instr';
"inNum"     return 'pr_innum';
"show"      return 'pr_show';
"getRandom" return 'pr_getrandom';
"getLength" return 'pr_getlength';

//---- Excepciones
"throws"     return 'pr_throws';
"NullPointerException"  return 'pr_nullpointer'; //102
"MissingReturnStatement"    return 'pr_missing'; //243
"ArithmeticException"       return 'pr_aritmetic'; //0  
"StackOverFlowException"    return 'pr_stackover'; //624
"HeapOverFlowException"     return 'pr_heap';  //789
"PoolOverFlowException"     return 'pr_pool';   //801

//---- Sentencias
"create"    return 'pr_create';
"if"        return 'pr_if';
"then"      return 'pr_then';
"else"      return 'pr_else';
"switch"    return 'pr_switch';
"case"      return 'pr_case';
"default"   return 'pr_default';
"break"     return 'pr_break';
"continue"  return 'pr_continue';
"return"    return 'pr_return';
"while"     return 'pr_while';
"do"        return 'pr_do';
"repeat"    return 'pr_repeat';
"until"     return 'pr_until';
"for"       return 'pr_for';
"loop"      return 'pr_loop';
"count"     return 'pr_count';
"whilex"    return 'pr_whilex';

//---- Operadores Aritmeticos
"*"         return 'pr_por';
"/"         return 'pr_div';
"++"        return 'pr_aumento';
"--"        return 'pr_disminucion';
"-"         return 'pr_menos';
"+"         return 'pr_mas';
"^"         return 'pr_pot';
"%"         return 'pr_mod';

//---- Operadores Relacionales
"<="        return 'pr_imenor';
">="        return 'pr_imayor';
"<"         return 'pr_menor';
">"         return 'pr_mayor';
"=="        return 'pr_digual';
"!="        return 'pr_nigual';

//---- Operadores lógicos
"&&"        return 'pr_and';
"||"        return 'pr_or';
"!"         return 'pr_not';
"|&"        return 'pr_xor';
"&?"        return 'pr_nand';
"|?"        return 'pr_nor';

//---- Otros
"of"        return 'pr_of';
"="         return 'pr_igual';
"("         return 'pr_abierto';
")"         return 'pr_cerrado';
"{"         return 'pr_labierto';
"}"         return 'pr_lcerrado';
"["         return 'pr_cabierto';
"]"         return 'pr_ccerrado';
":"         return 'pr_puntos';
";"         return 'pr_puncoma';
","         return 'pr_coma';
".."        return 'pr_dospuntos';
"."         return 'pr_punto';

//---- Expresiones regulares
[0-9]+("."[0-9]+)?\b  return 'numero';
//('"'|"'")([^\'"']|\\.)*('"'|"'")   ("\""|"'")[^("\\\""|"\\\'")]*("\""|"'") 
('"'|"'")([^\'"']|\\.)*('"'|"'")   return 'cadena';
[a-zA-Z]([a-zA-Z]|[0-9]|_)* return 'id';
"¿¿"[^]*"??"          /* IGNORE */


//---- Extras
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* asociación y precedencia de operadores */


%left pr_or pr_nor
%left pr_and pr_nand
%left pr_xor
%left pr_not 
%left pr_digual, pr_nigual, pr_imayor, pr_imenor, pr_mayor, pr_menor
%left pr_mas pr_menos
%left pr_por pr_div pr_mod 
%right pr_pot
%left UMINUS

%start PADRE

%% /* Gramática */

PADRE : CUERPO_B3D EOF{ 
    $$ = new ParseTreeNode('PADRE',0,0,[]);
    $$.Nodes.push($1);
    arbol = $$;
}
;

//---- Cuerpo general
CUERPO_B3D : CUERPO_B3D DECLARACION_PRINCIPAL{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_B3D DEC_VAR{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_B3D DEC_ARREGLO{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_B3D DECLARACION_METODO{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_B3D DECLARACION_FUNCION{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_B3D DECLARACION_ELEMENT{
    $$ = $$;
    $$.Nodes.push($2);
}
|{
    $$ = new ParseTreeNode('CUERPO_B3D',0,0,[]);
}
;

//---- Declaración de elements.
DECLARACION_ELEMENT : pr_element pr_puntos id pr_labierto CUERPO_ELEMENT pr_lcerrado{
    $$ = new ParseTreeNode('DECLARACION_ELEMENT',@1,@1,[]);
    $$.Nodes.push(new ParseTreeNode($3 + ' (id)',@3,@3,[])); $$.Nodes.push($5);
}
;

CUERPO_ELEMENT : CUERPO_ELEMENT PROPIEDAD{
    $$ = $$;
    $$.Nodes.push($2); 
}
| CUERPO_ELEMENT DECLARACION_ELEMENT{
    $$ = $$;
    $$.Nodes.push($2);
}
| DECLARACION_ELEMENT{
    $$ = new ParseTreeNode('CUERPO_ELEMENT',0,0,[]);
    $$.Nodes.push($1);
}
| PROPIEDAD{
    $$ = new ParseTreeNode('CUERPO_ELEMENT',0,0,[]);
    $$.Nodes.push($1);
}
;

PROPIEDAD : TIPO id pr_puntos EXP pr_puncoma{
    $$ = new ParseTreeNode('PROPIEDAD',@2,@2,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2 + ' (id)',@2,@2,[])); $$.Nodes.push($4);
}
;

//---- Metodo principal
DECLARACION_PRINCIPAL : pr_principal pr_abierto pr_cerrado pr_labierto CUERPO_INSTRUCCION pr_lcerrado{
    $$ = new ParseTreeNode('DECLARACION_PRINCIPAL',@1,@1,[]);
    $$.Nodes.push($5);
}
;

//---- Declaración de funciones
DECLARACION_FUNCION : TIPO DIMS pr_puntos id pr_abierto LISTA_PARAMETROS pr_cerrado pr_labierto CUERPO_INSTRUCCION pr_lcerrado{
    $$ = new ParseTreeNode('DECLARACION_FUNCION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push($2); $$.Nodes.push(new ParseTreeNode($4 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($6); $$.Nodes.push($9);
}
;

DIMS : DIMS pr_cabierto pr_ccerrado{
    $$ = $$;
    $$.Nodes.push(new ParseTreeNode('(dimension)',yylineno,yyleng,[]));
}
|{
    $$ = new ParseTreeNode('DIMS',0,0,[]);
}
;

//---- Declaración de métodos
DECLARACION_METODO : pr_void pr_puntos id pr_abierto LISTA_PARAMETROS pr_cerrado pr_labierto CUERPO_INSTRUCCION pr_lcerrado{
    $$ = new ParseTreeNode('DECLARACION_METODO',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($3 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($5); $$.Nodes.push($8);
}
;

LISTA_PARAMETROS : LISTA_PARAMETROS pr_coma PARAMETRO{
    $$ = $$;
    $$.Nodes.push($3);
}
|PARAMETRO{
    $$ = new ParseTreeNode('LISTA_PARAMETROS',yylineno,yyleng,[]);
    $$.Nodes.push($1);
}
|{
    $$ = new ParseTreeNode('LISTA_PARAMETROS',yylineno,yyleng,[]);
}
;

PARAMETRO : TIPO id  DIMENSHON{
    $$ = new ParseTreeNode('PARAMETRO',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2 + ' (id)',yylineno,yyleng,[]));  $$.Nodes.push($3);
}
;

//---- Declaración de arreglos
DEC_ARREGLO : pr_array pr_puntos id DIMENSIONES pr_of TIPO pr_puncoma{
    $$ = new ParseTreeNode('DEC_ARREGLO',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($3 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($4); $$.Nodes.push($6);
}
;

DIMENSIONES : DIMENSIONES pr_cabierto CUERPO_DIMENSION pr_ccerrado{
    $$ = $$;
    $$.Nodes.push($3);
}
|pr_cabierto CUERPO_DIMENSION pr_ccerrado{
    $$ = new ParseTreeNode('DIMENSIONES',yylineno,yyleng,[]);
    $$.Nodes.push($2);
};

DIMENSHON : DIMENSHON pr_cabierto CUERPO_DIMENSION pr_ccerrado{
    $$ = $$;
    $$.Nodes.push($3);
}
|{
    $$ = new ParseTreeNode('DIMENSHON',yylineno,yyleng,[]);
}
;

CUERPO_DIMENSION : EXP pr_dospuntos EXP{
    $$ = new ParseTreeNode('CUERPO_DIMENSION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push($3);
}
| EXP{
    $$ = new ParseTreeNode('CUERPO_DIMENSION',yylineno,yyleng,[]);
    $$.Nodes.push($1);
};

//---- Declaracion de variables
DEC_VAR : TIPO LISTA_ID ASIG_VAR pr_puncoma{
    $$ = new ParseTreeNode('DEC_VAR',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push($2); $$.Nodes.push($3);
}
;

ASIG_VAR : pr_puntos CUERPO{
    $$ = new ParseTreeNode('ASIG_VAR',0,0,[]);
    $$.Nodes.push($2);
}
|{
    $$ = new ParseTreeNode('ASIG_VAR',0,0,[]);
}
;

CUERPO : EXP{
    $$ = new ParseTreeNode('CUERPO',0,0,[]);
    $$.Nodes.push($1);
}
| pr_create pr_abierto id pr_cerrado{
    $$ = new ParseTreeNode('CREATE',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($3 + ' (id)',yylineno,yyleng,[]));
}
;

LISTA_ID : LISTA_ID pr_coma id{
    $$ = $$;
    $$.Nodes.push(new ParseTreeNode($3 + ' (id)',yylineno,yyleng,[]));  
}
| id{
    $$ = new ParseTreeNode('LISTA_ID',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (id)',yylineno,yyleng,[]));  
}
;

TIPO : pr_str REF{
    $$ = new ParseTreeNode('TIPO',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (tipo)',yylineno,yyleng,[])); $$.Nodes.push($2);
} 
| pr_num{
    $$ = new ParseTreeNode('TIPO',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (tipo)',yylineno,yyleng,[]));  
}
| pr_bool{
    $$ = new ParseTreeNode('TIPO',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (tipo)',yylineno,yyleng,[]));  
}
| id{
    $$ = new ParseTreeNode('TIPO',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (element)',yylineno,yyleng,[]));  
}
;

REF : pr_por{
    $$ = new ParseTreeNode('REF',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (puntero)',yylineno,yyleng,[]));
}
|{
    $$ = new ParseTreeNode('REF',yylineno,yyleng,[]);
}
;
//---- Instrucciones generales
CUERPO_INSTRUCCION : CUERPO_INSTRUCCION DEC_IF{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_VAR{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_ARREGLO{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_WHILE{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_DOWHILE{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_REPEAT{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_LOOP{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_COUNT{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_WHILEX{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_RETURN{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_CONTINUE{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_BREAK{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_OUTSTR{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_OUTNUM{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_INSTR{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_SHOW{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_THROW{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_SWITCH{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION ASIGNACION{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_LLAMADA{
    $$ = $$;
    $$.Nodes.push($2);
}
| CUERPO_INSTRUCCION DEC_FOR{
    $$ = $$;
    $$.Nodes.push($2);
}
|{
    $$ = new ParseTreeNode('CUERPO_INSTRUCCION',0,0,[]);
}
;

//---- Llamadas a métodos
DEC_LLAMADA: DEC_ID pr_puncoma{
    $$ = new ParseTreeNode('DEC_LLAMADA',0,0,[]);
    $$.Nodes.push($1);
};

//---- Asignacion general
ASIGNACION : DEC_ID DIMENSION pr_igual CUERPO pr_puncoma{
    $$ = new ParseTreeNode('ASIGNACION',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push($2); $$.Nodes.push($4);
};

DIMENSION : DIMENSION pr_cabierto EXP pr_ccerrado{
    $$ = $$;
    $$.Nodes.push($3);
}
|{
    $$ = new ParseTreeNode('DIMENSION',0,0,[]);
}
;

//---- Para todos los ids
DEC_ID : DEC_ID pr_punto id{
    $$ = $$;
    $$.Nodes.push(new ParseTreeNode($3 + ' (id)',yylineno,yyleng,[]));
}
| DEC_ID pr_abierto LISTA_EXP pr_cerrado{
    $$ = $$;
    $$.Nodes.push($3);
}
| TIPO{
    $$ = new ParseTreeNode('DEC_ID',@1,@1,[]);
    $$.Nodes.push(new ParseTreeNode($1.Nodes[0].FindTokenAndGetText() + ' (id)',yylineno,yyleng,[]));
}
;

LISTA_EXP : LISTA_EXP pr_coma EXP{
    $$ = $$;
    $$.Nodes.push($3);
}
| EXP{
    $$ = new ParseTreeNode('LISTA_EXP',0,0,[]);
    $$.Nodes.push($1);
}
|{
    $$ = new ParseTreeNode('LISTA_EXP',0,0,[]);
}
;
    
//---- Switch
DEC_SWITCH : pr_switch pr_abierto EXP pr_coma EXP pr_cerrado pr_labierto LISTA_CASOS CASO_DEFAULT pr_lcerrado{
    $$ = new ParseTreeNode('DEC_SWITCH',@1,@2,[]);
    $$.Nodes.push($3); $$.Nodes.push($5); $$.Nodes.push($8); $$.Nodes.push($9);
}
;

LISTA_CASOS : LISTA_CASOS pr_case EXP pr_puntos CUERPO_INSTRUCCION{
    $$ = $$;
    $$.Nodes.push($3); $$.Nodes.push($5);
}
|pr_case EXP pr_puntos CUERPO_INSTRUCCION{
    $$ = new ParseTreeNode('LISTA_CASOS',@1,@1,[]);
    $$.Nodes.push($2); $$.Nodes.push($4);
}
;

CASO_DEFAULT : pr_default pr_puntos CUERPO_INSTRUCCION{
    $$ = new ParseTreeNode('CASO_DEFAULT',yylineno,yyleng,[]);
    $$.Nodes.push($3);
}
|{
    $$ = new ParseTreeNode('CASO_DEFAULT',yylineno,yyleng,[]);
}
;

//---- Excepciones 
DEC_THROW : pr_throws pr_abierto EXCEPCIONES pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_THROW',yylineno,yyleng,[]);
    $$.Nodes.push($3);
}
;

EXCEPCIONES : pr_nullpointer { 
    $$ = new ParseTreeNode('null',0,0,[]); $$.Nodes.push(new ParseTreeNode($1 + ' (err)',yylineno,yyleng,[]));  
}
| pr_missing{ 
    $$ = new ParseTreeNode('missing',0,0,[]); $$.Nodes.push(new ParseTreeNode($1 + ' (err)',yylineno,yyleng,[]));  
}
| pr_aritmetic{ 
    $$ = new ParseTreeNode('aritmetic',0,0,[]); $$.Nodes.push(new ParseTreeNode($1 + ' (err)',yylineno,yyleng,[]));  
}
| pr_stackover{ 
    $$ = new ParseTreeNode('stack',0,0,[]); $$.Nodes.push(new ParseTreeNode($1 + ' (err)',yylineno,yyleng,[]));  
}
| pr_heap{ 
    $$ = new ParseTreeNode('heap',0,0,[]); $$.Nodes.push(new ParseTreeNode($1 + ' (err)',yylineno,yyleng,[]));  
}
| pr_pool{ 
    $$ = new ParseTreeNode('pool',0,0,[]); $$.Nodes.push(new ParseTreeNode($1 + ' (err)',yylineno,yyleng,[]));  
}
;

//---- show
DEC_SHOW : pr_show pr_abierto EXP pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_SHOW',yylineno,yyleng,[]);
    $$.Nodes.push($3);
}
;

//---- inStr
DEC_INSTR : pr_instr pr_abierto id pr_coma EXP pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_INSTR',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($3 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($5);
}
;

//---- outStr
DEC_OUTSTR : pr_outstr pr_abierto EXP pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_OUTSTR',yylineno,yyleng,[]);
    $$.Nodes.push($3);
}
;

//---- outNum
DEC_OUTNUM : pr_outnum pr_abierto EXP pr_coma EXP pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_OUTNUM',yylineno,yyleng,[]);
    $$.Nodes.push($3); $$.Nodes.push($5);
}
;

//---- do-whilex
DEC_WHILEX : pr_do pr_labierto CUERPO_INSTRUCCION pr_lcerrado pr_whilex pr_abierto EXP pr_coma EXP pr_cerrado{
    $$ = new ParseTreeNode('DEC_WHILEX',yylineno,yyleng,[]);
    $$.Nodes.push($3); $$.Nodes.push($7); $$.Nodes.push($9);
}
;

//---- count
DEC_COUNT : pr_count pr_abierto EXP pr_cerrado pr_labierto CUERPO_INSTRUCCION pr_lcerrado{
    $$ = new ParseTreeNode('DEC_COUNT',yylineno,yyleng,[]); 
    $$.Nodes.push($3); $$.Nodes.push($6);
}
;

//---- loop
DEC_LOOP : pr_loop id pr_labierto CUERPO_INSTRUCCION pr_lcerrado{
    $$ = new ParseTreeNode('DEC_LOOP',yylineno,yyleng,[]); 
    $$.Nodes.push(new ParseTreeNode($2 + ' (id)',@1,@1,[])); $$.Nodes.push($4);
}
;

//---- repeat-until
DEC_REPEAT : pr_repeat pr_labierto CUERPO_INSTRUCCION pr_lcerrado pr_until pr_abierto EXP pr_cerrado{
    $$ = new ParseTreeNode('DEC_REPEAT',@1,@1,[]); 
    $$.Nodes.push($3); $$.Nodes.push($7);
}
;

//---- do while
DEC_DOWHILE : pr_do pr_labierto CUERPO_INSTRUCCION pr_lcerrado pr_while pr_abierto EXP pr_cerrado{
    $$ = new ParseTreeNode('DEC_DOWHILE',@1,@1,[]); 
    $$.Nodes.push($3); $$.Nodes.push($7);
}
;

//---- while
DEC_WHILE : pr_while pr_abierto EXP pr_cerrado pr_labierto CUERPO_INSTRUCCION pr_lcerrado{
    $$ = new ParseTreeNode('DEC_WHILE',@1,@1,[]); 
    $$.Nodes.push($3); $$.Nodes.push($6);
}
;

//---- Ciclo for
DEC_FOR: pr_for pr_abierto VAR_CONTROL pr_puncoma EXP pr_puncoma ASIG_CONTROL pr_cerrado pr_labierto CUERPO_INSTRUCCION pr_lcerrado{
    $$ = new ParseTreeNode('DEC_FOR',@1,@1,[]); 
    $$.Nodes.push($3); $$.Nodes.push($5); $$.Nodes.push($7); $$.Nodes.push($10);
}
;

ASIG_CONTROL : id CUERPO_ASIG{
    $$ = new ParseTreeNode('ASIG_CONTROL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($2);
}
;

CUERPO_ASIG : pr_igual EXP{
    $$ = new ParseTreeNode('NORMAL',yylineno,yyleng,[]);
    $$.Nodes.push($2);
}
| pr_aumento{
    $$ = new ParseTreeNode('AUMENTO',yylineno,yyleng,[]);
}
| pr_disminucion{
    $$ = new ParseTreeNode('DISMINUCION',yylineno,yyleng,[]);
}
;

VAR_CONTROL : TIPO id pr_puntos EXP{
    $$ = new ParseTreeNode('DECLARACION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($4);
}
| id pr_igual EXP{
    $$ = new ParseTreeNode('ASIGNACION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
;

//---- if else
DEC_IF : pr_if pr_abierto EXP pr_cerrado pr_then pr_labierto CUERPO_INSTRUCCION pr_lcerrado DEC_ELSE{
    $$ = new ParseTreeNode('DEC_IF',@1,@1,[]); 
    $$.Nodes.push($3); $$.Nodes.push($7); $$.Nodes.push($9);
}
;

DEC_ELSE : pr_else pr_labierto CUERPO_INSTRUCCION pr_lcerrado{
    $$ = new ParseTreeNode('DEC_ELSE',@1,@1,[]);
    $$.Nodes.push($3);
}
|{
    $$ = new ParseTreeNode('DEC_ELSE',0,0,[]);
}
;

//---- Sentencias de branching o ramificación ----//

//---- Break
DEC_BREAK : pr_break CUERPO_BREAK pr_puncoma{
    $$ = new ParseTreeNode('DEC_BREAK',yylineno,yyleng,[]);
    $$.Nodes.push($2);
}
;

CUERPO_BREAK : id{
    $$ = new ParseTreeNode('CUERPO_BREAK',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (id)',yylineno,yyleng,[]));
}
|{
    $$ = new ParseTreeNode('CUERPO_BREAK',yylineno,yyleng,[]);
}
;

//---- Continue
DEC_CONTINUE : pr_continue pr_puncoma{
    $$ = new ParseTreeNode('DEC_CONTINUE',yylineno,yyleng,[]);
}
;

//---- Return
DEC_RETURN : pr_return CUERPO_RETURN pr_puncoma{
    $$ = new ParseTreeNode('DEC_RETURN',yylineno,yyleng,[]);
    $$.Nodes.push($2);
}
;

CUERPO_RETURN : EXP{
    $$ = new ParseTreeNode('CUERPO_RETURN',yylineno,yyleng,[]);
    $$.Nodes.push($1);
}
|{
    $$ = new ParseTreeNode('CUERPO_RETURN',yylineno,yyleng,[]);
}
;


//---- Expresiones
EXP : EXP pr_mas EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_menos EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_por EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_div EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_pot EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_mod EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| pr_menos EXP %prec UMINUS{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($2);
}
| pr_mas EXP %prec UMINUS{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($2);
}
| EXP pr_imayor EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_imenor EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_mayor EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_menor EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_digual EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_nigual EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_and EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_or EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| pr_not EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($2);
}
| EXP pr_xor EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_nand EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| EXP pr_nor EXP{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| pr_abierto EXP pr_cerrado{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($2);
}
| DEC_IDS DIMENSION {
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push($1); $$.Nodes.push($2); 
}
| numero{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (numero)',yylineno,yyleng,[]));
}
| pr_true{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (bool)',yylineno,yyleng,[]));
}
| pr_false{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (bool)',yylineno,yyleng,[]));
}
| cadena{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (cadena)',yylineno,yyleng,[]));
}
| pr_null{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (null)',@1,@1,[]));
}
| pr_getbool pr_abierto EXP pr_cerrado{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+' (primitiva)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| pr_getnum pr_abierto EXP pr_coma EXP pr_coma EXP pr_cerrado{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+' (primitiva)',yylineno,yyleng,[])); 
    $$.Nodes.push($3); $$.Nodes.push($5); $$.Nodes.push($7);
}
| pr_innum pr_abierto EXP pr_coma EXP pr_cerrado{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+' (primitiva)',yylineno,yyleng,[]));
    $$.Nodes.push($3); $$.Nodes.push($5);
}
|  pr_getrandom pr_abierto pr_cerrado{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+' (primitiva)',yylineno,yyleng,[]));
}
|  pr_getlength pr_abierto CUERPO_LEN pr_cerrado{
    $$ = new ParseTreeNode('EXP',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1+' (primitiva)',yylineno,yyleng,[]));
    $$.Nodes.push($3);
}
;

//---- Para todos los ids
DEC_IDS : DEC_IDS pr_punto id{
    $$ = $$;
    $$.Nodes.push(new ParseTreeNode($3 + ' (id)',yylineno,yyleng,[]));
}
| DEC_IDS pr_abierto LISTA_EXP pr_cerrado{
    $$ = $$;
    $$.Nodes.push($3);
}
| id{
    $$ = new ParseTreeNode('DEC_IDS',@1,@1,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (id)',yylineno,yyleng,[]));
}
;


CUERPO_LEN : id pr_coma EXP{
    $$ = new ParseTreeNode('CUERPO_LEN',0,0,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
|EXP{
    $$ = new ParseTreeNode('CUERPO_LEN',0,0,[]);
    $$.Nodes.push($1);
}
;



















