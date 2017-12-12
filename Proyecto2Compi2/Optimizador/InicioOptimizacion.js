
document.write('<script src="Optimizador/ControlOpt.js" type="text/javascript"></script>');
document.write('<script src="Optimizador/clsOptimizacion.js" type="text/javascript"></script>');
var NuevoBloque = false;
var Bandera = false;

function IniciarOptimizacion3D(arbol)
{
    try
    {
        ReiniciarAmbienteOptimizacion();
        var ptnCuerpoTotal = arbol.Nodes[0];
        
        for(var i = 0; i < ptnCuerpoTotal.Nodes.length; i++)
        {
            var ptnMetodo = ptnCuerpoTotal.Nodes[i];
            
            agregar3dOpt('void ' + ptnMetodo.Nodes[0].FindTokenAndGetText() + '(){\n');
            LecturaMetodo(ptnMetodo.Nodes[1]);
            agregar3dOpt('}\n\n');
            listSentencias = []; 
            AgregarBloque();
            AgregarMetodo(ptnMetodo.Nodes[0].FindTokenAndGetText());
            listBloques = [];
        }
        document.getElementById('txtSalida3d').value = CodigoOptimizado;
    }
    catch(err)
    {
        console.log(err);
    }
}

function LecturaMetodo(raiz){
    try
    {
        for(var i = 0; i < raiz.Nodes.length; i++)
        {
            var InfoToken = raiz.Nodes[i].Token;
            switch(InfoToken)
            {
                case c3d_asignacion: OptimizarAsignacion(raiz.Nodes[i]);
                    break;
                case c3d_etiqueta: OptimizarEtiqueta(raiz.Nodes[i]);
                    break;
                case c3d_goto: OptimizarGoto(raiz.Nodes[i]);
                    break;
                case c3d_if: OptimizarIf(raiz.Nodes[i]);
                    break;
                case c3d_llamada: OptimizarLlamada(raiz.Nodes[i]);
                    break;
                case c3d_show: OptimizarShow(raiz.Nodes[i]);
                    break;
                case c3d_sgb: OptimizarSGB(raiz.Nodes[i]);
                    break;
                case c3d_bool: OptimizarBool(raiz.Nodes[i]);
                    break;
                case c3d_num: OptimizarNum(raiz.Nodes[i]);
                    break;
                case c3d_outstr: OptimizarOutStr(raiz.Nodes[i]);
                    break;
                case c3d_outnum: OptimizarOutNum(raiz.Nodes[i]);
                    break;
                case c3d_random: OptimizarRandom(raiz.Nodes[i]);
                    break;
                case c3d_strlen: OptimizarStrLen(raiz.Nodes[i]);
                    break;
                case c3d_instr: OptimizarInStr(raiz.Nodes[i]);
                    break;
                case c3d_innum: OptimizarInNum(raiz.Nodes[i]);
                    break;
                case c3d_arrlen: OptimizarArrLen(raiz.Nodes[i]);
                    break;
                case c3d_igual: OptimizarIgual(raiz.Nodes[i]);
                    break;
                case c3d_nigual: OptimizarnIgual(raiz.Nodes[i]);
                    break;
                case c3d_mayor: OptimizarMayor(raiz.Nodes[i]);
                    break;
                case c3d_menor: OptimizarMenor(raiz.Nodes[i]);
                    break;
                case c3d_numtostr: OptimizarNumStr(raiz.Nodes[i]);
                    break;
                case c3d_single: OptimizarSingle(raiz.Nodes[i]);
                    break;
                case c3d_boolstr: OptimizarBoolStr(raiz.Nodes[i]);
                    break;
                case c3d_exit: OptimizarExit(raiz.Nodes[i]);
                    break;
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarExit(raiz){
    try
    {
        var sentencia = 'exit(' + raiz.Nodes[0].FindTokenAndGetText() + ');\n'
        agregar3dOpt(sentencia);
        BloqueOptimizado += sentencia;
        nBloqueOptimizado += sentencia;
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarBoolStr(raiz){
    try
    {
        agregar3dOpt('$$_boolToStr();\n');
        BloqueOptimizado += '$$_boolToStr();\n';
        nBloqueOptimizado += '$$_boolToStr();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarSingle(raiz){
    try
    {
        agregar3dOpt('$$_singleNumToStr();\n');
        BloqueOptimizado += '$$_singleNumToStr();\n';
        nBloqueOptimizado += '$$_singleNumToStr();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarNumStr(raiz){
    try
    {
        agregar3dOpt('$$_numToStr();\n');
        BloqueOptimizado += '$$_numToStr();\n';
        nBloqueOptimizado += '$$_numToStr();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarMenor(raiz){
    try
    {
        agregar3dOpt('$$_menor();\n');
        BloqueOptimizado += '$$_menor();\n';
        nBloqueOptimizado += '$$_menor();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarMayor(raiz){
    try
    {
        agregar3dOpt('$$_mayor();\n');
        BloqueOptimizado += '$$_mayor();\n';
        nBloqueOptimizado += '$$_mayor();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarIgual(raiz){
    try
    {
        agregar3dOpt('$$_igual();\n');
        BloqueOptimizado += '$$_igual();\n';
        nBloqueOptimizado += '$$_igual();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarnIgual(raiz){
    try
    {
        agregar3dOpt('$$_nigual();\n');
        BloqueOptimizado += '$$_nigual();\n';
        nBloqueOptimizado += '$$_nigual();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarArrLen(raiz){
    try
    {
        agregar3dOpt('$$_getArrLength();\n');
        BloqueOptimizado += '$$_getArrLength();\n';
        nBloqueOptimizado += '$$_getArrLength();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarInNum(raiz){
    try
    {
        agregar3dOpt('$$_inNum();\n');
        BloqueOptimizado += '$$_inNum();\n';
        nBloqueOptimizado += '$$_inNum();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarInStr(raiz){
    try
    {
        agregar3dOpt('$$_inStr();\n');
        BloqueOptimizado += '$$_inStr();\n';
        nBloqueOptimizado += '$$_inStr();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarStrLen(raiz){
    try
    {
        agregar3dOpt('$$_getStrLength();\n');
        BloqueOptimizado += '$$_getStrLength();\n';
        nBloqueOptimizado += '$$_getStrLength();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarRandom(raiz){
    try
    {
        agregar3dOpt('$$_getRandom();\n');
        BloqueOptimizado += '$$_getRandom();\n';
        nBloqueOptimizado += '$$_getRandom();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarOutNum(raiz){
    try
    {
        agregar3dOpt('$$_outNum();\n');
        BloqueOptimizado += '$$_outNum();\n';
        nBloqueOptimizado += '$$_outNum();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarOutStr(raiz){
    try
    {
        agregar3dOpt('$$_outStr();\n');
        BloqueOptimizado += '$$_outStr();\n';
        nBloqueOptimizado += '$$_outStr();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarNum(raiz){
    try
    {
        agregar3dOpt('$$_getNum();\n');
        BloqueOptimizado += '$$_getNum();\n';
        nBloqueOptimizado += '$$_getNum();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarBool(raiz){
    try
    {
        agregar3dOpt('$$_getBool();\n');
        BloqueOptimizado += '$$_getBool();\n';
        nBloqueOptimizado += '$$_getBool();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarShow(raiz){
    try
    {
        agregar3dOpt('$$_show();\n');
        BloqueOptimizado += '$$_show();\n';
        nBloqueOptimizado += '$$_show();\n';
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarSGB(raiz){
    try
    {
        var sentencia = '$$_SGB(' + OptimizarExp(raiz.Nodes[0]) + ',' +  OptimizarExp(raiz.Nodes[1]) + ');\n';
        agregar3dOpt(sentencia);
        BloqueOptimizado += sentencia;
        nBloqueOptimizado += sentencia;
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarLlamada(raiz){
    try
    {
        var sentencia = raiz.Nodes[0].FindTokenAndGetText() + '();\n';
        agregar3dOpt(sentencia);
        BloqueOptimizado += sentencia;
        nBloqueOptimizado += sentencia;
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarIf(raiz){
    try
    {
        agregar3dOpt('if(');
        var sentencia = OptimizarRelacional(raiz.Nodes[1]);
        agregar3dOpt(') goto ' + raiz.Nodes[2].FindTokenAndGetText());
        agregar3dOpt(';\n');
        
        BloqueOptimizado += 'if(' + sentencia + ') goto ' + raiz.Nodes[2].FindTokenAndGetText() + ';\n';
        nBloqueOptimizado += 'if(' + sentencia + ') goto ' + raiz.Nodes[2].FindTokenAndGetText() + ';\n';
        AgregarBloque();
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarGoto(raiz){
    try
    {
        var sentencia = '';
        if(raiz.Nodes[0].FindTokenAndGetText() == 'L1') sentencia = 'goto L2;\n';
        else sentencia = 'goto ' + raiz.Nodes[0].FindTokenAndGetText() + ';\n';
        agregar3dOpt(sentencia);
        BloqueOptimizado += sentencia;
        nBloqueOptimizado += sentencia; logReglas += "Regla No. 17";
        AgregarBloque();
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarEtiqueta(raiz){
    try
    {    
        AgregarBloque();
        var sentencia = raiz.Nodes[0].FindTokenAndGetText() + ':\n';
        agregar3dOpt(sentencia);
        BloqueOptimizado += sentencia;
        nBloqueOptimizado += sentencia;
    }
    catch(err)
    {
        console.log(err);
    }
}

function OptimizarAsignacion(raiz){
    try
    {
        var ptnAsignacion = raiz.Nodes[0], valor = raiz.Nodes[1];
        var SentenciaOpt = '', nSentenciaOpt = '', Imprimir = true;
        
        [SentenciaOpt,nSentenciaOpt,Imprimir] = OptimizarExpresion(ptnAsignacion.Nodes[0].Token,valor);
        
        switch(ptnAsignacion.Token)
        {
            case 'TEMPORAL':
                {
                    if(Imprimir){
                        agregar3dOpt(ptnAsignacion.Nodes[0].Token + ' = ' + SentenciaOpt + ';\n');
                        BloqueOptimizado += ptnAsignacion.Nodes[0].Token + ' = ' + SentenciaOpt + ';\n';
                    }
                    nBloqueOptimizado += ptnAsignacion.Nodes[0].Token + ' = ' + nSentenciaOpt + ';\n';
                }
                break;
            case 'PUNTERO_P':
                {
                    if(Imprimir){
                        agregar3dOpt('P = ' + SentenciaOpt + ';\n');
                        BloqueOptimizado += 'P = ' + SentenciaOpt + ';\n';
                    }
                    nBloqueOptimizado += 'P = ' + nSentenciaOpt + ';\n';
                }
                break;
            case 'PUNTERO_H':
                {
                    if(Imprimir){
                        agregar3dOpt('H = ' + SentenciaOpt + ';\n');
                        BloqueOptimizado += 'H = ' + SentenciaOpt + ';\n';
                    }
                    nBloqueOptimizado += 'H = ' + nSentenciaOpt + ';\n';
                }
                break;
            case 'PUNTERO_S':
                {
                    if(Imprimir){
                        agregar3dOpt('S = ' + SentenciaOpt + ';\n');
                        BloqueOptimizado += 'S = ' + SentenciaOpt + ';\n';
                    }
                    nBloqueOptimizado += 'S = ' + nSentenciaOpt + ';\n';
                }
                break;
            case 'STACK':
                {
                    if(Imprimir){
                        agregar3dOpt('Stack[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + SentenciaOpt + ';\n');
                        BloqueOptimizado += 'Stack[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + SentenciaOpt + ';\n';
                    }
                    nBloqueOptimizado += 'Stack[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + nSentenciaOpt + ';\n';
                }
                break;
            case 'HEAP':
                {
                    if(Imprimir){
                        agregar3dOpt('Heap[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + SentenciaOpt + ';\n');
                        BloqueOptimizado += 'Heap[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + SentenciaOpt + ';\n';
                    }
                    nBloqueOptimizado += 'Heap[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + nSentenciaOpt + ';\n';
                }
                break;
            case 'POOL':
                {
                    if(Imprimir){
                        agregar3dOpt('Pool[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + SentenciaOpt + ';\n');
                        BloqueOptimizado += 'Pool[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + SentenciaOpt + ';\n';
                    }
                    nBloqueOptimizado += 'Pool[' + OptimizarExp(ptnAsignacion.Nodes[0]) + '] = ' + nSentenciaOpt + ';\n';
                }
                break;
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

//---- Funciones que se optimizan
function RetornarOperadorOptimizado(raiz){
    var valor = '';
    
    try
    {
        var InfoToken = raiz.Nodes[0].FindTokenAndGetInfo();
        
        if(InfoToken == '(temporal)') valor = raiz.Nodes[0].FindTokenAndGetText();
        else if(InfoToken == '(numero)') valor = raiz.Nodes[0].FindTokenAndGetText();
        else if(InfoToken == '(p)') valor = 'P';
        else if(InfoToken == '(h)') valor = 'H';
        else if(InfoToken == '(s)') valor = 'S';
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return valor;
}

function OptimizarRelacional(raiz){
    var sentencia = '';
    
    try
    {
        var ptnOperador1 = raiz.Nodes[0], ptnSigno = raiz.Nodes[1], ptnOperador2 = raiz.Nodes[2];
        var Operador1 = RetornarOperadorOptimizado(ptnOperador1), Signo = ptnSigno.Nodes[0].FindTokenAndGetText(), Operador2 = RetornarOperadorOptimizado(ptnOperador2);
        sentencia = Operador1 + ' ' + Signo + ' ' + Operador2;
        agregar3dOpt(sentencia);
    }
    catch(err)
    {
        console.log(err);
    }
    
    return sentencia;
}

function OptimizarExpresion(Token,raiz){
    var SentenciaOpt = '', nSentenciaOpt = '', Imprimir = true;
    
    try
    {
        switch(raiz.Nodes.length)
        {
            case 1:
                {
                    var InfoToken = raiz.Nodes[0].FindTokenAndGetInfo();
            
                    if(InfoToken == '(temporal)'){
                        SentenciaOpt = raiz.Nodes[0].FindTokenAndGetText(); nSentenciaOpt = raiz.Nodes[0].FindTokenAndGetText();
                    }
                    else if(InfoToken == '(p)'){
                        SentenciaOpt = 'P'; nSentenciaOpt = 'P';
                    }
                    else if(InfoToken == '(h)'){
                        SentenciaOpt = 'H'; nSentenciaOpt = 'H';
                    }
                    else if(InfoToken == '(s)'){
                        SentenciaOpt = 'S'; nSentenciaOpt = 'S';
                    }
                    else if(InfoToken == '(numero)'){
                        SentenciaOpt = raiz.Nodes[0].FindTokenAndGetText(); nSentenciaOpt = raiz.Nodes[0].FindTokenAndGetText();
                    }
                }
                break;
            case 2:
                {
                    var signo = raiz.Nodes[0].FindTokenAndGetText();
                    switch(signo)
                    {
                        case '-':
                            break;
                        default:
                            var Estructura = raiz.Nodes[0].FindTokenAndGetInfo();
                            var Posicion = OptimizarExp(raiz.Nodes[1]);
                            if(Estructura == '(stack)'){
                                SentenciaOpt = 'Stack[' + Posicion + ']'; nSentenciaOpt = 'Stack[' + Posicion + ']';
                            }
                            else if(Estructura == '(heap)'){
                                SentenciaOpt = 'Heap[' + Posicion + ']'; nSentenciaOpt = 'Heap[' + Posicion + ']';
                            }
                            else if(Estructura == '(pool)'){
                                SentenciaOpt = 'Pool[' + Posicion + ']'; nSentenciaOpt = 'Pool[' + Posicion + ']';
                            }
                    }
                }
                break;
            case 3:
                {
                    var operador1 = raiz.Nodes[0].Nodes[0].FindTokenAndGetText(), 
                        signo = raiz.Nodes[1].FindTokenAndGetText(), 
                        operador2 = raiz.Nodes[2].Nodes[0].FindTokenAndGetText();
                    
                    nSentenciaOpt = operador1 + ' ' + signo + ' ' + operador2;
                    
                    switch(signo)
                    {
                        case '+':
                            if((operador1 == '0' || operador2 == '0') && (Token == operador2 || Token == operador1)){
                                logReglas += 'Regla No. 3\n';
                                Imprimir = false;
                            }
                            else if((operador1 == '0' || operador2 == '0') && (Token != operador2 || Token != operador1)){
                                if(operador1 == '0'){
                                    SentenciaOpt = operador2;
                                    logReglas += 'Regla No. 7\n';
                                }
                                else if(operador2 == '0'){
                                    SentenciaOpt = operador1;
                                    logReglas += 'Regla No. 7\n';
                                }
                            }
                            else
                            {
                                if(Token == operador2 || Token == operador1 || ExisteToken(Token))
                                {
                                    SentenciaOpt = EliminarSentencia(Token,nSentenciaOpt);
                                }
                                else
                                {
                                    if(NoEsPuntero(operador1) && NoEsPuntero(operador2))
                                    {
                                        SentenciaOpt = ExisteSentencia(Token,nSentenciaOpt);
                                    }
                                    else
                                    {
                                        SentenciaOpt = nSentenciaOpt;
                                    }
                                }
                                
                            }
                            break;
                        case '-':
                            if(operador2 == '0' && Token == operador1){
                                logReglas += 'Regla No. 4\n';
                                Imprimir = false;
                            }
                            else if(operador2 == '0' && Token != operador1){
                                SentenciaOpt = operador1;
                                logReglas += 'Regla No. 8\n';
                            }
                            else
                            {
                                if(Token == operador2 || Token == operador1 || ExisteToken(Token))
                                {
                                    SentenciaOpt = EliminarSentencia(Token,nSentenciaOpt);
                                }
                                else
                                {
                                    if(NoEsPuntero(operador1) && NoEsPuntero(operador2))
                                    {
                                        SentenciaOpt = ExisteSentencia(Token,nSentenciaOpt);
                                    }
                                    else
                                    {
                                        SentenciaOpt = nSentenciaOpt;
                                    }
                                }
                            }
                            break;
                        case '*':
                            if((operador1 == '1' || operador2 == '1') && (Token == operador2 || Token == operador1)){
                                logReglas += 'Regla No. 5\n';
                                Imprimir = false;
                            }
                            else if((operador1 == '1' || operador2 == '1') && (Token != operador2 || Token != operador1)){
                                if(operador1 == '1'){
                                    SentenciaOpt = operador2;
                                    logReglas += 'Regla No. 9\n';
                                }
                                else if(operador2 == '1'){
                                    SentenciaOpt = operador1;
                                    logReglas += 'Regla No. 9\n';
                                }
                            }
                            else if(operador1 == '0' || operador2 == '0'){
                                SentenciaOpt = '0';
                                logReglas += 'Regla No. 10\n';
                            }
                            else if(operador2 == '2'){
                                SentenciaOpt = operador1 + ' + ' + operador1;
                                logReglas += 'Regla No. 16\n';
                            }
                            else
                            {
                                if(Token == operador2 || Token == operador1 || ExisteToken(Token))
                                {
                                    SentenciaOpt = EliminarSentencia(Token,nSentenciaOpt);
                                }
                                else
                                {
                                    if(NoEsPuntero(operador1) && NoEsPuntero(operador2))
                                    {
                                        SentenciaOpt = ExisteSentencia(Token,nSentenciaOpt);
                                    }
                                    else
                                    {
                                        SentenciaOpt = nSentenciaOpt;
                                    }
                                    
                                }
                            }
                            break;
                        case '/':
                            if(operador2 == '1' && Token == operador1){
                                logReglas += 'Regla No. 6\n';
                                Imprimir = false;
                            }
                            else if(operador2 == '1' && Token != operador1){
                                SentenciaOpt = operador1;
                                logReglas += 'Regla No. 11\n';
                            }
                            else if(operador1 == '0'){
                                SentenciaOpt = '0';
                                logReglas += 'Regla No. 12\n';
                            }
                            else
                            {
                                if(Token == operador2 || Token == operador1 || ExisteToken(Token))
                                {
                                    SentenciaOpt = EliminarSentencia(Token,nSentenciaOpt);
                                }
                                else
                                {
                                    if(NoEsPuntero(operador1) && NoEsPuntero(operador2))
                                    {
                                        SentenciaOpt = ExisteSentencia(Token,nSentenciaOpt);
                                    }
                                    else
                                    {
                                        SentenciaOpt = nSentenciaOpt;
                                    }
                                }
                            }
                            break;
                        case '%':
                            if(Token == operador2 || Token == operador1 || ExisteToken(Token))
                            {
                                SentenciaOpt = EliminarSentencia(Token,nSentenciaOpt);
                            }
                            else
                            {
                                if(NoEsPuntero(operador1) && NoEsPuntero(operador2))
                                    {
                                        SentenciaOpt = ExisteSentencia(Token,nSentenciaOpt);
                                    }
                                    else
                                    {
                                        SentenciaOpt = nSentenciaOpt;
                                    }
                            }
                            break;
                        case '^':
                            if(operador2 == '0'){
                                SentenciaOpt = '1';
                                logReglas += 'Regla No. 13\n';
                            }
                            else if(operador2 == '1'){
                                SentenciaOpt = operador1;
                                logReglas += 'Regla No. 14\n';
                            }
                            else if(operador2 == '2'){
                                SentenciaOpt = operador1 + ' * ' + operador1;
                                logReglas += 'Regla No. 15\n';
                            }
                            else
                            {
                                if(Token == operador2 || Token == operador1 || ExisteToken(Token))
                                {
                                    SentenciaOpt = EliminarSentencia(Token,nSentenciaOpt);
                                }
                                else
                                {
                                    if(NoEsPuntero(operador1) && NoEsPuntero(operador2))
                                    {
                                        SentenciaOpt = ExisteSentencia(Token,nSentenciaOpt);
                                    }
                                    else
                                    {
                                        SentenciaOpt = nSentenciaOpt;
                                    }
                                }
                            }
                            break;
                    }
                }
                break;
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
    return [SentenciaOpt,nSentenciaOpt,Imprimir];
}

function NoEsPuntero(operador){
    var Retorno = true;
    
    if(operador == 'P' || operador == 'S' || operador == 'H') Retorno = false;
    
    return Retorno;
}

function OptimizarExp(raiz){
    var valor = '';
    
    switch(raiz.Token){
        case 'TEMPORAL': valor = raiz.Nodes[0].Token;
            break;
        case 'PUNTERO_P': valor = 'P';
            break;
        case 'PUNTERO_H': valor = 'H';
            break;
        case 'PUNTERO_S': valor = 'S';
            break;
        case 'NUMERO': valor = raiz.Nodes[0].Token;
            break;
    }
    
    return valor;
}







