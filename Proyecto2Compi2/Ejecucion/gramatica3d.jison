/* Analizador léxico */
%lex
%%
//---- Tokens ignorados
\s+                   /* skip whitespace */
"//".*                                /* IGNORE */
//---- Palabras reservadas
"void"      return 'pr_void';
"if"        return 'pr_if';
"goto"      return 'pr_goto';
"Stack"     return 'pr_stack';
"Heap"      return 'pr_heap';
"Pool"      return 'pr_pool';
"P"         return 'pr_p';
"H"         return 'pr_h';
"S"         return 'pr_s';
"exit"      return 'pr_exit';

//---- Funciones core
"$$_SGB"    return 'pr_sgb';
"$$_show"   return 'pr_show';
"$$_getBool"    return 'pr_getbool';
"$$_getNum" return 'pr_getnum';
"$$_outStr" return 'pr_outstr';
"$$_outNum" return 'pr_outnum';
"$$_inStr"  return 'pr_instr';
"$$_inNum"  return 'pr_innum';
"$$_getRandom"  return 'pr_getrandom';
"$$_getArrLength"   return 'pr_arrlen';
"$$_getStrLength"   return 'pr_strlen';

//---- Funciones extras para el core
"$$_igual"  return 'pr_figual';
"$$_nigual"  return 'pr_fnigual';
"$$_mayor"  return 'pr_fmayor';
"$$_menor"  return 'pr_fmenor';
"$$_numToStr" return 'pr_numtostr';
"$$_singleNumToStr" return 'pr_single';
"$$_boolToStr" return 'pr_booltostr';

//---- Operadores Aritmeticos
"*"         return 'pr_por'
"/"         return 'pr_div'
"-"         return 'pr_menos'
"+"         return 'pr_mas'
"^"         return 'pr_pot'
"%"         return 'pr_mod'

//---- Operadores Relacionales
"<="        return 'pr_imenor';
">="        return 'pr_imayor';
"<"         return 'pr_menor';
">"         return 'pr_mayor';
"=="        return 'pr_digual';
"!="        return 'pr_nigual';

//---- Otros
"="         return 'pr_igual';
"("         return 'pr_abierto';
")"         return 'pr_cerrado';
"{"         return 'pr_labierto';
"}"         return 'pr_lcerrado';
"["         return 'pr_cabierto';
"]"         return 'pr_ccerrado';
";"         return 'pr_puncoma';
":"         return 'pr_puntos';
","         return 'pr_coma';

//---- Expresiones regulares.
[0-9]+("."[0-9]+)?\b  return 'numero';
[t]([0-9])* return 'temporal';
[L]([0-9])* return 'etiqueta';
[a-zA-Z]([a-zA-Z]|[0-9]|_)* return 'id';


//---- Extras
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* asociación y precedencia de operadores */

%left pr_digual, pr_nigual, pr_imayor, pr_imenor, pr_mayor, pr_menor
%left pr_mas pr_menos
%left pr_por pr_div pr_mod 
%right pr_pot
%left UMINUS

%start PADRE

%% /* Gramática */
    
PADRE : CUERPO_3D EOF{
    $$ = new ParseTreeNode('PADRE',yylineno,yyleng,[]);
    $$.Nodes.push($1);
    arbol3d = $$;
}
;

//---- Cuerpo general
CUERPO_3D : CUERPO_3D DECLARACION_METODO{
    $$ = $$;
    $$.Nodes.push($2);
}
|{
    $$ = new ParseTreeNode('CUERPO_3D',yylineno,yyleng,[]);
}
;

//---- Declaración de métodos.
DECLARACION_METODO : pr_void id pr_abierto pr_cerrado pr_labierto INSTRUCCIONES_3D pr_lcerrado{
    $$ = new ParseTreeNode('DECLARACION_METODO',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($2 + ' (id)',yylineno,yyleng,[])); $$.Nodes.push($6)
};

//---- Instrucciones generales del código 3d.

INSTRUCCIONES_3D : INSTRUCCIONES_3D DEC_ETIQUETA{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_GOTO{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_IF{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_LLAMADA{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_ASIGNACION{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_SGB{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_SHOW{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_BOOL{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_NUM{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_OUTSTR{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_OUTNUM{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_INSTR{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_INNUM{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_RANDOM{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_STRLEN{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_ARRLEN{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_IGUAL{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_NIGUAL{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_MAYOR{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_MENOR{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_NUMSTR{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_SINGLE{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_BOOLSTR{
    $$ = $$;
    $$.Nodes.push($2);
}
|INSTRUCCIONES_3D DEC_EXIT{
    $$ = $$;
    $$.Nodes.push($2);
}
|{
    $$ = new ParseTreeNode('INSTRUCCIONES_3D',yylineno,yyleng,[]);
}
;

//---- Función exit
DEC_EXIT : pr_exit pr_abierto numero pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_EXIT',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($3 + ' (codigo)',yylineno,yyleng,[]));
}
;

//---- Core boolToStr
DEC_BOOLSTR : pr_booltostr pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_BOOLSTR',yylineno,yyleng,[]);
}
;

//---- Core numToStr
DEC_NUMSTR : pr_numtostr pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_NUMSTR',yylineno,yyleng,[]);
}
;

//---- Core singleNumToStr
DEC_SINGLE : pr_single pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_SINGLE',yylineno,yyleng,[]);
}
;

//---- Core menor
DEC_MENOR : pr_fmenor pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_MENOR',yylineno,yyleng,[]);
}
;

//---- Core mayor
DEC_MAYOR : pr_fmayor pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_MAYOR',yylineno,yyleng,[]);
}
;

//---- Core no igual
DEC_NIGUAL : pr_fnigual pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_NIGUAL',yylineno,yyleng,[]);
}
;

//---- Core igual
DEC_IGUAL : pr_figual pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_IGUAL',yylineno,yyleng,[]);
}
;

//---- Core sgb
DEC_SGB : pr_sgb pr_abierto EXP pr_coma EXP pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_SGB',yylineno,yyleng,[]);
    $$.Nodes.push($3); $$.Nodes.push($5);
}
;

//--- Core getArrLength
DEC_ARRLEN : pr_arrlen pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_ARRLEN',yylineno,yyleng,[]);
}
;

//--- Core getStrLength
DEC_STRLEN : pr_strlen pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_STRLEN',yylineno,yyleng,[]);
}
;

//--- Core getRandom
DEC_RANDOM : pr_getrandom pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_RANDOM',yylineno,yyleng,[]);
}
;

//---- Core inNum
DEC_INNUM : pr_innum pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_INNUM',yylineno,yyleng,[]);
}
;

//---- Core inStr
DEC_INSTR : pr_instr pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_INSTR',yylineno,yyleng,[]);
}
;

//---- Core outNum
DEC_OUTNUM : pr_outnum pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_OUTNUM',yylineno,yyleng,[]);
}
;

//---- Core outStr
DEC_OUTSTR : pr_outstr pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_OUTSTR',yylineno,yyleng,[]);
}
;

//---- Core getNum
DEC_NUM : pr_getnum pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_NUM',yylineno,yyleng,[]);
}
;

//---- Core getBool
DEC_BOOL : pr_getbool pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_BOOL',yylineno,yyleng,[]);
}
;

//---- Core show
DEC_SHOW : pr_show pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_SHOW',yylineno,yyleng,[]);
}
;

//---- Declaracion de etiquetas.
DEC_ETIQUETA : etiqueta pr_puntos{
    $$ = new ParseTreeNode('DEC_ETIQUETA',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (etiqueta)',yylineno,yyleng,[]));
};

//---- Declaracion del goto, saltos incondicionales.
DEC_GOTO : pr_goto etiqueta pr_puncoma{
    $$ = new ParseTreeNode('DEC_GOTO',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($2 + ' (etiqueta)',yylineno,yyleng,[]));
}
;

//---- Declaracion del if
DEC_IF : pr_if pr_abierto RELACIONAL pr_cerrado pr_goto etiqueta pr_puncoma{
    $$ = new ParseTreeNode('DEC_IF',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
    $$.Nodes.push(new ParseTreeNode($6 + ' (etiqueta)',yylineno,yyleng,[]));
}
;

//---- Llamada a métodos
DEC_LLAMADA : id pr_abierto pr_cerrado pr_puncoma{
    $$ = new ParseTreeNode('DEC_LLAMADA',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1 + ' (reservada)',yylineno,yyleng,[]));
}
;

DEC_ASIGNACION : RECIBIDOR pr_igual EXPRESION pr_puncoma{
    $$ = new ParseTreeNode('DEC_ASIGNACION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push($3);
}
;

/********************************************************/
/********************************************************/
/********************************************************/

EXPRESION : EXPRESION pr_mas EXPRESION{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
|EXPRESION pr_menos EXPRESION{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
|EXPRESION pr_por EXPRESION{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
|EXPRESION pr_div EXPRESION{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
|EXPRESION pr_pot EXPRESION{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
|EXPRESION pr_mod EXPRESION{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push(new ParseTreeNode($2+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
| pr_menos EXP %prec UMINUS{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (reservada)',yylineno,yyleng,[])); $$.Nodes.push($2);
}
| temporal{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (temporal)',yylineno,yyleng,[]));
}
| pr_p{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (p)',yylineno,yyleng,[]));
}
| pr_h{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (h)',yylineno,yyleng,[]));
}
| pr_s{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (s)',yylineno,yyleng,[]));
}
|numero{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (numero)',yylineno,yyleng,[]));
}
|pr_stack pr_cabierto EXP pr_ccerrado{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (stack)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
|pr_heap pr_cabierto EXP pr_ccerrado{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (heap)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
|pr_pool pr_cabierto EXP pr_ccerrado{
    $$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (pool)',yylineno,yyleng,[])); $$.Nodes.push($3);
}
;

RECIBIDOR : temporal{
    $$ = new ParseTreeNode('TEMPORAL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
|pr_p{
    $$ = new ParseTreeNode('PUNTERO_P',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
|pr_h{
    $$ = new ParseTreeNode('PUNTERO_H',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
|pr_s{
    $$ = new ParseTreeNode('PUNTERO_S',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
|pr_stack pr_cabierto EXP pr_ccerrado{
    $$ = new ParseTreeNode('STACK',yylineno,yyleng,[]);
    $$.Nodes.push($3);
}
|pr_heap pr_cabierto EXP pr_ccerrado{
    $$ = new ParseTreeNode('HEAP',yylineno,yyleng,[]);
    $$.Nodes.push($3);
}
|pr_pool pr_cabierto EXP pr_ccerrado{
    $$ = new ParseTreeNode('POOL',yylineno,yyleng,[]);
    $$.Nodes.push($3);
}
;

EXP : temporal{
    $$ = new ParseTreeNode('TEMPORAL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
|pr_p{
    $$ = new ParseTreeNode('PUNTERO_P',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
|pr_h{
    $$ = new ParseTreeNode('PUNTERO_H',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
|pr_s{
    $$ = new ParseTreeNode('PUNTERO_S',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
|numero{
    $$ = new ParseTreeNode('NUMERO',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1,yylineno,yyleng,[]));
}
;

//---- Operaciones relacionales
RELACIONAL : OP_REL SIGNO_REL OP_REL{
    $$ = new ParseTreeNode('RELACIONAL',yylineno,yyleng,[]);
    $$.Nodes.push($1); $$.Nodes.push($2); $$.Nodes.push($3);
}
;

OP_REL : temporal{
    $$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (temporal)',yylineno,yyleng,[]));
}
|numero{
    $$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (numero)',yylineno,yyleng,[]));
}
|pr_p{
    $$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (p)',yylineno,yyleng,[]));
}
|pr_h{
    $$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (h)',yylineno,yyleng,[]));
}
|pr_s{
    $$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (s)',yylineno,yyleng,[]));
}
;

SIGNO_REL : pr_digual{
    $$ = new ParseTreeNode('SIGNO_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (relacional)',yylineno,yyleng,[]));
}
|pr_nigual{
    $$ = new ParseTreeNode('SIGNO_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (relacional)',yylineno,yyleng,[]));
}
|pr_imenor{
    $$ = new ParseTreeNode('SIGNO_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (relacional)',yylineno,yyleng,[]));
}
|pr_imayor{
    $$ = new ParseTreeNode('SIGNO_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (relacional)',yylineno,yyleng,[]));
}
|pr_menor{
    $$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (relacional)',yylineno,yyleng,[]));
}
|pr_mayor{
    $$ = new ParseTreeNode('SIGNO_REL',yylineno,yyleng,[]);
    $$.Nodes.push(new ParseTreeNode($1+ ' (relacional)',yylineno,yyleng,[]));
}
;













