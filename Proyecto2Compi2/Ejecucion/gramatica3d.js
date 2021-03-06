/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica3d = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[5,7],$V1=[8,13,38,41,42,43,44,45,46,47,48,51,52,53,54,55,56,57,58,59,60,61,63,64,75,76,77,78,79,82,83],$V2=[1,98],$V3=[1,97],$V4=[1,99],$V5=[1,100],$V6=[1,101],$V7=[1,109],$V8=[1,104],$V9=[1,105],$Va=[1,106],$Vb=[1,107],$Vc=[1,108],$Vd=[1,110],$Ve=[1,111],$Vf=[1,112],$Vg=[1,118],$Vh=[1,114],$Vi=[1,115],$Vj=[1,116],$Vk=[1,117],$Vl=[10,86,87,88,89,90,91],$Vm=[1,152],$Vn=[1,153],$Vo=[1,154],$Vp=[1,155],$Vq=[40,69,70,71,72,73,74],$Vr=[10,40,50,69,70,71,72,73,74,81],$Vs=[39,75,76,77,78],$Vt=[40,69,70],$Vu=[40,69,70,71,72,74];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"PADRE":3,"CUERPO_3D":4,"EOF":5,"DECLARACION_METODO":6,"pr_void":7,"id":8,"pr_abierto":9,"pr_cerrado":10,"pr_labierto":11,"INSTRUCCIONES_3D":12,"pr_lcerrado":13,"DEC_ETIQUETA":14,"DEC_GOTO":15,"DEC_IF":16,"DEC_LLAMADA":17,"DEC_ASIGNACION":18,"DEC_SGB":19,"DEC_SHOW":20,"DEC_BOOL":21,"DEC_NUM":22,"DEC_OUTSTR":23,"DEC_OUTNUM":24,"DEC_INSTR":25,"DEC_INNUM":26,"DEC_RANDOM":27,"DEC_STRLEN":28,"DEC_ARRLEN":29,"DEC_IGUAL":30,"DEC_NIGUAL":31,"DEC_MAYOR":32,"DEC_MENOR":33,"DEC_NUMSTR":34,"DEC_SINGLE":35,"DEC_BOOLSTR":36,"DEC_EXIT":37,"pr_exit":38,"numero":39,"pr_puncoma":40,"pr_booltostr":41,"pr_numtostr":42,"pr_single":43,"pr_fmenor":44,"pr_fmayor":45,"pr_fnigual":46,"pr_figual":47,"pr_sgb":48,"EXP":49,"pr_coma":50,"pr_arrlen":51,"pr_strlen":52,"pr_getrandom":53,"pr_innum":54,"pr_instr":55,"pr_outnum":56,"pr_outstr":57,"pr_getnum":58,"pr_getbool":59,"pr_show":60,"etiqueta":61,"pr_puntos":62,"pr_goto":63,"pr_if":64,"RELACIONAL":65,"RECIBIDOR":66,"pr_igual":67,"EXPRESION":68,"pr_mas":69,"pr_menos":70,"pr_por":71,"pr_div":72,"pr_pot":73,"pr_mod":74,"temporal":75,"pr_p":76,"pr_h":77,"pr_s":78,"pr_stack":79,"pr_cabierto":80,"pr_ccerrado":81,"pr_heap":82,"pr_pool":83,"OP_REL":84,"SIGNO_REL":85,"pr_digual":86,"pr_nigual":87,"pr_imenor":88,"pr_imayor":89,"pr_menor":90,"pr_mayor":91,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"pr_void",8:"id",9:"pr_abierto",10:"pr_cerrado",11:"pr_labierto",13:"pr_lcerrado",38:"pr_exit",39:"numero",40:"pr_puncoma",41:"pr_booltostr",42:"pr_numtostr",43:"pr_single",44:"pr_fmenor",45:"pr_fmayor",46:"pr_fnigual",47:"pr_figual",48:"pr_sgb",50:"pr_coma",51:"pr_arrlen",52:"pr_strlen",53:"pr_getrandom",54:"pr_innum",55:"pr_instr",56:"pr_outnum",57:"pr_outstr",58:"pr_getnum",59:"pr_getbool",60:"pr_show",61:"etiqueta",62:"pr_puntos",63:"pr_goto",64:"pr_if",67:"pr_igual",69:"pr_mas",70:"pr_menos",71:"pr_por",72:"pr_div",73:"pr_pot",74:"pr_mod",75:"temporal",76:"pr_p",77:"pr_h",78:"pr_s",79:"pr_stack",80:"pr_cabierto",81:"pr_ccerrado",82:"pr_heap",83:"pr_pool",86:"pr_digual",87:"pr_nigual",88:"pr_imenor",89:"pr_imayor",90:"pr_menor",91:"pr_mayor"},
productions_: [0,[3,2],[4,2],[4,0],[6,7],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,2],[12,0],[37,5],[36,4],[34,4],[35,4],[33,4],[32,4],[31,4],[30,4],[19,7],[29,4],[28,4],[27,4],[26,4],[25,4],[24,4],[23,4],[22,4],[21,4],[20,4],[14,2],[15,3],[16,7],[17,4],[18,4],[68,3],[68,3],[68,3],[68,3],[68,3],[68,3],[68,2],[68,1],[68,1],[68,1],[68,1],[68,1],[68,4],[68,4],[68,4],[66,1],[66,1],[66,1],[66,1],[66,4],[66,4],[66,4],[49,1],[49,1],[49,1],[49,1],[49,1],[65,3],[84,1],[84,1],[84,1],[84,1],[84,1],[85,1],[85,1],[85,1],[85,1],[85,1],[85,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

    this.$ = new ParseTreeNode('PADRE',yylineno,yyleng,[]);
    this.$.Nodes.push($$[$0-1]);
    arbol3d = this.$;

break;
case 2: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28:

    this.$ = this.$;
    this.$.Nodes.push($$[$0]);

break;
case 3:

    this.$ = new ParseTreeNode('CUERPO_3D',yylineno,yyleng,[]);

break;
case 4:

    this.$ = new ParseTreeNode('DECLARACION_METODO',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-5] + ' (id)',yylineno,yyleng,[])); this.$.Nodes.push($$[$0-1])

break;
case 29:

    this.$ = new ParseTreeNode('INSTRUCCIONES_3D',yylineno,yyleng,[]);

break;
case 30:

    this.$ = new ParseTreeNode('DEC_EXIT',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-2] + ' (codigo)',yylineno,yyleng,[]));

break;
case 31:

    this.$ = new ParseTreeNode('DEC_BOOLSTR',yylineno,yyleng,[]);

break;
case 32:

    this.$ = new ParseTreeNode('DEC_NUMSTR',yylineno,yyleng,[]);

break;
case 33:

    this.$ = new ParseTreeNode('DEC_SINGLE',yylineno,yyleng,[]);

break;
case 34:

    this.$ = new ParseTreeNode('DEC_MENOR',yylineno,yyleng,[]);

break;
case 35:

    this.$ = new ParseTreeNode('DEC_MAYOR',yylineno,yyleng,[]);

break;
case 36:

    this.$ = new ParseTreeNode('DEC_NIGUAL',yylineno,yyleng,[]);

break;
case 37:

    this.$ = new ParseTreeNode('DEC_IGUAL',yylineno,yyleng,[]);

break;
case 38:

    this.$ = new ParseTreeNode('DEC_SGB',yylineno,yyleng,[]);
    this.$.Nodes.push($$[$0-4]); this.$.Nodes.push($$[$0-2]);

break;
case 39:

    this.$ = new ParseTreeNode('DEC_ARRLEN',yylineno,yyleng,[]);

break;
case 40:

    this.$ = new ParseTreeNode('DEC_STRLEN',yylineno,yyleng,[]);

break;
case 41:

    this.$ = new ParseTreeNode('DEC_RANDOM',yylineno,yyleng,[]);

break;
case 42:

    this.$ = new ParseTreeNode('DEC_INNUM',yylineno,yyleng,[]);

break;
case 43:

    this.$ = new ParseTreeNode('DEC_INSTR',yylineno,yyleng,[]);

break;
case 44:

    this.$ = new ParseTreeNode('DEC_OUTNUM',yylineno,yyleng,[]);

break;
case 45:

    this.$ = new ParseTreeNode('DEC_OUTSTR',yylineno,yyleng,[]);

break;
case 46:

    this.$ = new ParseTreeNode('DEC_NUM',yylineno,yyleng,[]);

break;
case 47:

    this.$ = new ParseTreeNode('DEC_BOOL',yylineno,yyleng,[]);

break;
case 48:

    this.$ = new ParseTreeNode('DEC_SHOW',yylineno,yyleng,[]);

break;
case 49:

    this.$ = new ParseTreeNode('DEC_ETIQUETA',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-1] + ' (etiqueta)',yylineno,yyleng,[]));

break;
case 50:

    this.$ = new ParseTreeNode('DEC_GOTO',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-1] + ' (etiqueta)',yylineno,yyleng,[]));

break;
case 51:

    this.$ = new ParseTreeNode('DEC_IF',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-6] + ' (reservada)',yylineno,yyleng,[])); this.$.Nodes.push($$[$0-4]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-1] + ' (etiqueta)',yylineno,yyleng,[]));

break;
case 52:

    this.$ = new ParseTreeNode('DEC_LLAMADA',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-3] + ' (reservada)',yylineno,yyleng,[]));

break;
case 53:

    this.$ = new ParseTreeNode('DEC_ASIGNACION',yylineno,yyleng,[]);
    this.$.Nodes.push($$[$0-3]); this.$.Nodes.push($$[$0-1]);

break;
case 54: case 55: case 56: case 57: case 58: case 59:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push($$[$0-2]); this.$.Nodes.push(new ParseTreeNode($$[$0-1]+ ' (reservada)',yylineno,yyleng,[])); this.$.Nodes.push($$[$0]);

break;
case 60:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-1]+ ' (reservada)',yylineno,yyleng,[])); this.$.Nodes.push($$[$0]);

break;
case 61:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (temporal)',yylineno,yyleng,[]));

break;
case 62:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (p)',yylineno,yyleng,[]));

break;
case 63:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (h)',yylineno,yyleng,[]));

break;
case 64:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (s)',yylineno,yyleng,[]));

break;
case 65:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (numero)',yylineno,yyleng,[]));

break;
case 66:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-3]+ ' (stack)',yylineno,yyleng,[])); this.$.Nodes.push($$[$0-1]);

break;
case 67:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-3]+ ' (heap)',yylineno,yyleng,[])); this.$.Nodes.push($$[$0-1]);

break;
case 68:

    this.$ = new ParseTreeNode('EXPRESION',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0-3]+ ' (pool)',yylineno,yyleng,[])); this.$.Nodes.push($$[$0-1]);

break;
case 69: case 76:

    this.$ = new ParseTreeNode('TEMPORAL',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0],yylineno,yyleng,[]));

break;
case 70: case 77:

    this.$ = new ParseTreeNode('PUNTERO_P',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0],yylineno,yyleng,[]));

break;
case 71: case 78:

    this.$ = new ParseTreeNode('PUNTERO_H',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0],yylineno,yyleng,[]));

break;
case 72: case 79:

    this.$ = new ParseTreeNode('PUNTERO_S',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0],yylineno,yyleng,[]));

break;
case 73:

    this.$ = new ParseTreeNode('STACK',yylineno,yyleng,[]);
    this.$.Nodes.push($$[$0-1]);

break;
case 74:

    this.$ = new ParseTreeNode('HEAP',yylineno,yyleng,[]);
    this.$.Nodes.push($$[$0-1]);

break;
case 75:

    this.$ = new ParseTreeNode('POOL',yylineno,yyleng,[]);
    this.$.Nodes.push($$[$0-1]);

break;
case 80:

    this.$ = new ParseTreeNode('NUMERO',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0],yylineno,yyleng,[]));

break;
case 81:

    this.$ = new ParseTreeNode('RELACIONAL',yylineno,yyleng,[]);
    this.$.Nodes.push($$[$0-2]); this.$.Nodes.push($$[$0-1]); this.$.Nodes.push($$[$0]);

break;
case 82:

    this.$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (temporal)',yylineno,yyleng,[]));

break;
case 83:

    this.$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (numero)',yylineno,yyleng,[]));

break;
case 84:

    this.$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (p)',yylineno,yyleng,[]));

break;
case 85:

    this.$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (h)',yylineno,yyleng,[]));

break;
case 86:

    this.$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (s)',yylineno,yyleng,[]));

break;
case 87: case 88: case 89: case 90: case 92:

    this.$ = new ParseTreeNode('SIGNO_REL',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (relacional)',yylineno,yyleng,[]));

break;
case 91:

    this.$ = new ParseTreeNode('OP_REL',yylineno,yyleng,[]);
    this.$.Nodes.push(new ParseTreeNode($$[$0]+ ' (relacional)',yylineno,yyleng,[]));

break;
}
},
table: [o($V0,[2,3],{3:1,4:2}),{1:[3]},{5:[1,3],6:4,7:[1,5]},{1:[2,1]},o($V0,[2,2]),{8:[1,6]},{9:[1,7]},{10:[1,8]},{11:[1,9]},o($V1,[2,29],{12:10}),{8:[1,39],13:[1,11],14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:20,23:21,24:22,25:23,26:24,27:25,28:26,29:27,30:28,31:29,32:30,33:31,34:32,35:33,36:34,37:35,38:[1,59],41:[1,58],42:[1,56],43:[1,57],44:[1,55],45:[1,54],46:[1,53],47:[1,52],48:[1,41],51:[1,51],52:[1,50],53:[1,49],54:[1,48],55:[1,47],56:[1,46],57:[1,45],58:[1,44],59:[1,43],60:[1,42],61:[1,36],63:[1,37],64:[1,38],66:40,75:[1,60],76:[1,61],77:[1,62],78:[1,63],79:[1,64],82:[1,65],83:[1,66]},o($V0,[2,4]),o($V1,[2,5]),o($V1,[2,6]),o($V1,[2,7]),o($V1,[2,8]),o($V1,[2,9]),o($V1,[2,10]),o($V1,[2,11]),o($V1,[2,12]),o($V1,[2,13]),o($V1,[2,14]),o($V1,[2,15]),o($V1,[2,16]),o($V1,[2,17]),o($V1,[2,18]),o($V1,[2,19]),o($V1,[2,20]),o($V1,[2,21]),o($V1,[2,22]),o($V1,[2,23]),o($V1,[2,24]),o($V1,[2,25]),o($V1,[2,26]),o($V1,[2,27]),o($V1,[2,28]),{62:[1,67]},{61:[1,68]},{9:[1,69]},{9:[1,70]},{67:[1,71]},{9:[1,72]},{9:[1,73]},{9:[1,74]},{9:[1,75]},{9:[1,76]},{9:[1,77]},{9:[1,78]},{9:[1,79]},{9:[1,80]},{9:[1,81]},{9:[1,82]},{9:[1,83]},{9:[1,84]},{9:[1,85]},{9:[1,86]},{9:[1,87]},{9:[1,88]},{9:[1,89]},{9:[1,90]},{67:[2,69]},{67:[2,70]},{67:[2,71]},{67:[2,72]},{80:[1,91]},{80:[1,92]},{80:[1,93]},o($V1,[2,49]),{40:[1,94]},{39:$V2,65:95,75:$V3,76:$V4,77:$V5,78:$V6,84:96},{10:[1,102]},{39:$V7,68:103,70:$V8,75:$V9,76:$Va,77:$Vb,78:$Vc,79:$Vd,82:$Ve,83:$Vf},{39:$Vg,49:113,75:$Vh,76:$Vi,77:$Vj,78:$Vk},{10:[1,119]},{10:[1,120]},{10:[1,121]},{10:[1,122]},{10:[1,123]},{10:[1,124]},{10:[1,125]},{10:[1,126]},{10:[1,127]},{10:[1,128]},{10:[1,129]},{10:[1,130]},{10:[1,131]},{10:[1,132]},{10:[1,133]},{10:[1,134]},{10:[1,135]},{39:[1,136]},{39:$Vg,49:137,75:$Vh,76:$Vi,77:$Vj,78:$Vk},{39:$Vg,49:138,75:$Vh,76:$Vi,77:$Vj,78:$Vk},{39:$Vg,49:139,75:$Vh,76:$Vi,77:$Vj,78:$Vk},o($V1,[2,50]),{10:[1,140]},{85:141,86:[1,142],87:[1,143],88:[1,144],89:[1,145],90:[1,146],91:[1,147]},o($Vl,[2,82]),o($Vl,[2,83]),o($Vl,[2,84]),o($Vl,[2,85]),o($Vl,[2,86]),{40:[1,148]},{40:[1,149],69:[1,150],70:[1,151],71:$Vm,72:$Vn,73:$Vo,74:$Vp},{39:$Vg,49:156,75:$Vh,76:$Vi,77:$Vj,78:$Vk},o($Vq,[2,61]),o($Vq,[2,62]),o($Vq,[2,63]),o($Vq,[2,64]),o($Vq,[2,65]),{80:[1,157]},{80:[1,158]},{80:[1,159]},{50:[1,160]},o($Vr,[2,76]),o($Vr,[2,77]),o($Vr,[2,78]),o($Vr,[2,79]),o($Vr,[2,80]),{40:[1,161]},{40:[1,162]},{40:[1,163]},{40:[1,164]},{40:[1,165]},{40:[1,166]},{40:[1,167]},{40:[1,168]},{40:[1,169]},{40:[1,170]},{40:[1,171]},{40:[1,172]},{40:[1,173]},{40:[1,174]},{40:[1,175]},{40:[1,176]},{40:[1,177]},{10:[1,178]},{81:[1,179]},{81:[1,180]},{81:[1,181]},{63:[1,182]},{39:$V2,75:$V3,76:$V4,77:$V5,78:$V6,84:183},o($Vs,[2,87]),o($Vs,[2,88]),o($Vs,[2,89]),o($Vs,[2,90]),o($Vs,[2,91]),o($Vs,[2,92]),o($V1,[2,52]),o($V1,[2,53]),{39:$V7,68:184,70:$V8,75:$V9,76:$Va,77:$Vb,78:$Vc,79:$Vd,82:$Ve,83:$Vf},{39:$V7,68:185,70:$V8,75:$V9,76:$Va,77:$Vb,78:$Vc,79:$Vd,82:$Ve,83:$Vf},{39:$V7,68:186,70:$V8,75:$V9,76:$Va,77:$Vb,78:$Vc,79:$Vd,82:$Ve,83:$Vf},{39:$V7,68:187,70:$V8,75:$V9,76:$Va,77:$Vb,78:$Vc,79:$Vd,82:$Ve,83:$Vf},{39:$V7,68:188,70:$V8,75:$V9,76:$Va,77:$Vb,78:$Vc,79:$Vd,82:$Ve,83:$Vf},{39:$V7,68:189,70:$V8,75:$V9,76:$Va,77:$Vb,78:$Vc,79:$Vd,82:$Ve,83:$Vf},o($Vq,[2,60]),{39:$Vg,49:190,75:$Vh,76:$Vi,77:$Vj,78:$Vk},{39:$Vg,49:191,75:$Vh,76:$Vi,77:$Vj,78:$Vk},{39:$Vg,49:192,75:$Vh,76:$Vi,77:$Vj,78:$Vk},{39:$Vg,49:193,75:$Vh,76:$Vi,77:$Vj,78:$Vk},o($V1,[2,48]),o($V1,[2,47]),o($V1,[2,46]),o($V1,[2,45]),o($V1,[2,44]),o($V1,[2,43]),o($V1,[2,42]),o($V1,[2,41]),o($V1,[2,40]),o($V1,[2,39]),o($V1,[2,37]),o($V1,[2,36]),o($V1,[2,35]),o($V1,[2,34]),o($V1,[2,32]),o($V1,[2,33]),o($V1,[2,31]),{40:[1,194]},{67:[2,73]},{67:[2,74]},{67:[2,75]},{61:[1,195]},{10:[2,81]},o($Vt,[2,54],{71:$Vm,72:$Vn,73:$Vo,74:$Vp}),o($Vt,[2,55],{71:$Vm,72:$Vn,73:$Vo,74:$Vp}),o($Vu,[2,56],{73:$Vo}),o($Vu,[2,57],{73:$Vo}),o($Vu,[2,58],{73:$Vo}),o($Vu,[2,59],{73:$Vo}),{81:[1,196]},{81:[1,197]},{81:[1,198]},{10:[1,199]},o($V1,[2,30]),{40:[1,200]},o($Vq,[2,66]),o($Vq,[2,67]),o($Vq,[2,68]),{40:[1,201]},o($V1,[2,51]),o($V1,[2,38])],
defaultActions: {3:[2,1],60:[2,69],61:[2,70],62:[2,71],63:[2,72],179:[2,73],180:[2,74],181:[2,75],183:[2,81]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* IGNORE */
break;
case 2:return 7;
break;
case 3:return 64;
break;
case 4:return 63;
break;
case 5:return 79;
break;
case 6:return 82;
break;
case 7:return 83;
break;
case 8:return 76;
break;
case 9:return 77;
break;
case 10:return 78;
break;
case 11:return 38;
break;
case 12:return 48;
break;
case 13:return 60;
break;
case 14:return 59;
break;
case 15:return 58;
break;
case 16:return 57;
break;
case 17:return 56;
break;
case 18:return 55;
break;
case 19:return 54;
break;
case 20:return 53;
break;
case 21:return 51;
break;
case 22:return 52;
break;
case 23:return 47;
break;
case 24:return 46;
break;
case 25:return 45;
break;
case 26:return 44;
break;
case 27:return 42;
break;
case 28:return 43;
break;
case 29:return 41;
break;
case 30:return 71
break;
case 31:return 72
break;
case 32:return 70
break;
case 33:return 69
break;
case 34:return 73
break;
case 35:return 74
break;
case 36:return 88;
break;
case 37:return 89;
break;
case 38:return 90;
break;
case 39:return 91;
break;
case 40:return 86;
break;
case 41:return 87;
break;
case 42:return 67;
break;
case 43:return 9;
break;
case 44:return 10;
break;
case 45:return 11;
break;
case 46:return 13;
break;
case 47:return 80;
break;
case 48:return 81;
break;
case 49:return 40;
break;
case 50:return 62;
break;
case 51:return 50;
break;
case 52:return 39;
break;
case 53:return 75;
break;
case 54:return 61;
break;
case 55:return 8;
break;
case 56:return 5
break;
case 57:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/,/^(?:\/\/.*)/,/^(?:void\b)/,/^(?:if\b)/,/^(?:goto\b)/,/^(?:Stack\b)/,/^(?:Heap\b)/,/^(?:Pool\b)/,/^(?:P\b)/,/^(?:H\b)/,/^(?:S\b)/,/^(?:exit\b)/,/^(?:\$\$_SGB\b)/,/^(?:\$\$_show\b)/,/^(?:\$\$_getBool\b)/,/^(?:\$\$_getNum\b)/,/^(?:\$\$_outStr\b)/,/^(?:\$\$_outNum\b)/,/^(?:\$\$_inStr\b)/,/^(?:\$\$_inNum\b)/,/^(?:\$\$_getRandom\b)/,/^(?:\$\$_getArrLength\b)/,/^(?:\$\$_getStrLength\b)/,/^(?:\$\$_igual\b)/,/^(?:\$\$_nigual\b)/,/^(?:\$\$_mayor\b)/,/^(?:\$\$_menor\b)/,/^(?:\$\$_numToStr\b)/,/^(?:\$\$_singleNumToStr\b)/,/^(?:\$\$_boolToStr\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\^)/,/^(?:%)/,/^(?:<=)/,/^(?:>=)/,/^(?:<)/,/^(?:>)/,/^(?:==)/,/^(?:!=)/,/^(?:=)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:;)/,/^(?::)/,/^(?:,)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:[t]([0-9])*)/,/^(?:[L]([0-9])*)/,/^(?:[a-zA-Z]([a-zA-Z]|[0-9]|_)*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica3d;
exports.Parser = gramatica3d.Parser;
exports.parse = function () { return gramatica3d.parse.apply(gramatica3d, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}