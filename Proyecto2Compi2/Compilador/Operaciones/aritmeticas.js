function suma(izq,der){
    var nodo = new Nodo3d('','','','',''), temp = '', sentencia = '';
    
    if(izq.TipoValor == con_tstr.toLowerCase() && der.TipoValor == con_tstr.toLowerCase()){
        //-----------------------------
        var temporalIzq = izq.cad, temporalDer = der.cad, temporalActual = '', etiqueta1 = '', etiqueta2 = '', retornoTemporal = '';
        temporalActual = generarTemp(); retornoTemporal = temporalActual; agregar3d(temporalActual + ' = S;\n');
        temporalActual = generarTemp(); agregar3d(temporalActual + ' = ' + temporalIzq + ';\n');
        etiqueta1 = generarEt(); etiqueta2 = generarEt(); var temporal2 = generarTemp();
        agregar3d(etiqueta1 + ':\n');
        agregar3d(temporal2 + ' = Pool[' + temporalActual + '];\n')
        agregar3d('if(' + temporal2 + ' == 0) goto ' + etiqueta2 + ';\n');
        agregar3d('Pool[S] = ' + temporal2 + ';\n');
        agregar3d('S = S + 1;\n');
        agregar3d(temporalActual + ' = ' + temporalActual + ' + 1;\n');
        agregar3d('goto ' + etiqueta1 + ';\n');
        agregar3d(etiqueta2 + ':\n');
        //------------------------------
        temporalActual = generarTemp(); agregar3d(temporalActual + ' = ' + temporalDer + ';\n');
        etiqueta1 = generarEt(); etiqueta2 = generarEt(); temporal2 = generarTemp();
        agregar3d(etiqueta1 + ':\n');
        agregar3d(temporal2 + ' = Pool[' + temporalActual + '];\n')
        agregar3d('if(' + temporal2 + ' == 0) goto ' + etiqueta2 + ';\n');
        agregar3d('Pool[S] = ' + temporal2 + ';\n');
        agregar3d('S = S + 1;\n');
        agregar3d(temporalActual + ' = ' + temporalActual + ' + 1;\n');
        agregar3d('goto ' + etiqueta1 + ';\n');
        agregar3d(etiqueta2 + ':\n');
        agregar3d("Pool[S] = 0;\n");
        agregar3d('S = S + 1;\n');
        
        nodo = new Nodo3d(retornoTemporal,'','',sentencia,con_tstr);
    }
    else if(izq.TipoValor == con_tstr.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        //-------------------------------
        var cadenaBool = '',posicion = 0, tempo = '';
        if(ToBool(ObtenerToken(der.cad)) == 1) cadenaBool = "true";
        else cadenaBool = "false";
        for(var i = 0; i < cadenaBool.length; i++){
            tempo = generarTemp();
            agregar3d(tempo + ' = S + ' + i + ';\n');
            agregar3d('Pool[' + tempo + '] = ' + cadenaBool.charCodeAt(i) + '; //Asignando caracter ' + cadenaBool.charAt(i) + ' \n');
            posicion = i;
        }
        tempo = generarTemp(); posicion++;
        agregar3d(tempo + ' = S + ' + posicion + ';\n');
        agregar3d('Pool[' + tempo + '] = 0; //Fin de la cadena \n');
        tempo = generarTemp(); posicion++; 
        agregar3d(tempo + ' = S; //Posicion del inicio de la cadena ' + cadenaBool + '\n'); agregar3d('S = S + ' + posicion + ';\n');
        //--------------------------------
        var temporalIzq = izq.cad, temporalDer = tempo, temporalActual = '', etiqueta1 = '', etiqueta2 = '', retornoTemporal = '';
        temporalActual = generarTemp(); retornoTemporal = temporalActual; agregar3d(temporalActual + ' = S;\n');
        temporalActual = generarTemp(); agregar3d(temporalActual + ' = ' + temporalIzq + ';\n');
        etiqueta1 = generarEt(); etiqueta2 = generarEt(); var temporal2 = generarTemp();
        agregar3d(etiqueta1 + ':\n');
        agregar3d(temporal2 + ' = Pool[' + temporalActual + '];\n')
        agregar3d('if(' + temporal2 + ' == 0) goto ' + etiqueta2 + ';\n');
        agregar3d('Pool[S] = ' + temporal2 + ';\n');
        agregar3d('S = S + 1;\n');
        agregar3d(temporalActual + ' = ' + temporalActual + ' + 1;\n');
        agregar3d('goto ' + etiqueta1 + ';\n');
        agregar3d(etiqueta2 + ':\n');
        //------------------------------
        temporalActual = generarTemp(); agregar3d(temporalActual + ' = ' + temporalDer + ';\n');
        etiqueta1 = generarEt(); etiqueta2 = generarEt(); temporal2 = generarTemp();
        agregar3d(etiqueta1 + ':\n');
        agregar3d(temporal2 + ' = Pool[' + temporalActual + '];\n')
        agregar3d('if(' + temporal2 + ' == 0) goto ' + etiqueta2 + ';\n');
        agregar3d('Pool[S] = ' + temporal2 + ';\n');
        agregar3d('S = S + 1;\n');
        agregar3d(temporalActual + ' = ' + temporalActual + ' + 1;\n');
        agregar3d('goto ' + etiqueta1 + ';\n');
        agregar3d(etiqueta2 + ':\n');
        agregar3d("Pool[S] = 0;\n");
        agregar3d('S = S + 1;\n');
        
        nodo = new Nodo3d(retornoTemporal,'','',sentencia,con_tstr);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tstr.toLowerCase()){
        //-------------------------------
        var cadenaBool = '',posicion = 0, tempo = '';
        if(ToBool(ObtenerToken(izq.cad)) == 1) cadenaBool = "true";
        else cadenaBool = "false";
        for(var i = 0; i < cadenaBool.length; i++){
            tempo = generarTemp();
            agregar3d(tempo + ' = S + ' + i + ';\n');
            agregar3d('Pool[' + tempo + '] = ' + cadenaBool.charCodeAt(i) + '; //Asignando caracter ' + cadenaBool.charAt(i) + ' \n');
            posicion = i;
        }
        tempo = generarTemp(); posicion++;
        agregar3d(tempo + ' = S + ' + posicion + ';\n');
        agregar3d('Pool[' + tempo + '] = 0; //Fin de la cadena \n');
        tempo = generarTemp(); posicion++; 
        agregar3d(tempo + ' = S; //Posicion del inicio de la cadena ' + cadenaBool + '\n'); agregar3d('S = S + ' + posicion + ';\n');
        //--------------------------------
        var temporalIzq = tempo, temporalDer = ObtenerToken(der.cad), temporalActual = '', etiqueta1 = '', etiqueta2 = '', retornoTemporal = '';
        temporalActual = generarTemp(); retornoTemporal = temporalActual; agregar3d(temporalActual + ' = S;\n');
        temporalActual = generarTemp(); agregar3d(temporalActual + ' = ' + temporalIzq + ';\n');
        etiqueta1 = generarEt(); etiqueta2 = generarEt(); var temporal2 = generarTemp();
        agregar3d(etiqueta1 + ':\n');
        agregar3d(temporal2 + ' = Pool[' + temporalActual + '];\n')
        agregar3d('if(' + temporal2 + ' == 0) goto ' + etiqueta2 + ';\n');
        agregar3d('Pool[S] = ' + temporal2 + ';\n');
        agregar3d('S = S + 1;\n');
        agregar3d(temporalActual + ' = ' + temporalActual + ' + 1;\n');
        agregar3d('goto ' + etiqueta1 + ';\n');
        agregar3d(etiqueta2 + ':\n');
        //------------------------------
        temporalActual = generarTemp(); agregar3d(temporalActual + ' = ' + temporalDer + ';\n');
        etiqueta1 = generarEt(); etiqueta2 = generarEt(); temporal2 = generarTemp();
        agregar3d(etiqueta1 + ':\n');
        agregar3d(temporal2 + ' = Pool[' + temporalActual + '];\n')
        agregar3d('if(' + temporal2 + ' == 0) goto ' + etiqueta2 + ';\n');
        agregar3d('Pool[S] = ' + temporal2 + ';\n');
        agregar3d('S = S + 1;\n');
        agregar3d(temporalActual + ' = ' + temporalActual + ' + 1;\n');
        agregar3d('goto ' + etiqueta1 + ';\n');
        agregar3d(etiqueta2 + ':\n');
        agregar3d("Pool[S] = 0;\n");
        agregar3d('S = S + 1;\n');
        
        nodo = new Nodo3d(retornoTemporal,'','',sentencia,con_tstr);
    }
    else if(izq.TipoValor == con_tstr.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        agregar3d(sentencia);
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        agregar3d('P = P + ' + CambioAmbito + ';\n');
        agregar3d(temporal + ' = P + 1;\n');
        agregar3d('Stack[' + temporal + '] = ' + izq.cad + ';\n');
        temporal = generarTemp();
        agregar3d(temporal + ' = P + 2;\n');
        agregar3d('Stack[' + temporal + '] = ' + ObtenerToken(der.cad) + ';\n');
        temporal = generarTemp();
        agregar3d(temporal + ' = P + 3;\n');
        agregar3d('Stack[' + temporal + '] = 1;\n');
        agregar3d('$$_numToStr();\n');
        agregar3d(temp + ' = Stack[P]; //Retorno valor. \n');
        agregar3d('$$_SGB(P,3);\n');
        agregar3d('P = P - ' + CambioAmbito + ';\n');
        
        nodo = new Nodo3d(temp,'','',sentencia,con_tstr);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tstr.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        agregar3d(sentencia);
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        agregar3d('P = P + ' + CambioAmbito + ';\n');
        agregar3d(temporal + ' = P + 1;\n');
        agregar3d('Stack[' + temporal + '] = ' + ObtenerToken(izq.cad) + ';\n');
        temporal = generarTemp();
        agregar3d(temporal + ' = P + 2;\n');
        agregar3d('Stack[' + temporal + '] = ' + der.cad + ';\n');
        temporal = generarTemp();
        agregar3d(temporal + ' = P + 3;\n');
        agregar3d('Stack[' + temporal + '] = 0;\n');
        agregar3d('$$_numToStr();\n');
        agregar3d(temp + ' = Stack[P]; //Retorno valor. \n');
        agregar3d('$$_SGB(P,3);\n');
        agregar3d('P = P - ' + CambioAmbito + ';\n');
        
        nodo = new Nodo3d(temp,'','',sentencia,con_tstr);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' + ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ToBool(ObtenerToken(izq.cad)) + ' + ' + ToBool(ObtenerToken(der.cad)) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' + ' + ToBool(ObtenerToken(der.cad)) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ToBool(ObtenerToken(izq.cad)) + ' + ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else{
        TablaError.push(new Errores('Semántico','La suma entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = 0; //Error con los casteos implicitos de la suma.\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    
    return nodo;
}

function resta(izq,der){
    var nodo = new Nodo3d('','','','',''), temp = '', sentencia = '';
    
    if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' - ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' - ' + ToBool(ObtenerToken(der.cad)) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ToBool(ObtenerToken(izq.cad)) + ' - ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else{
        TablaError.push(new Errores('Semántico','La resta entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = 0; //Error con los casteos implicitos de la resta.\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    
    return nodo;
}

function producto(izq,der){
    var nodo = new Nodo3d('','','','',''), temp = '', sentencia = '';
    
    if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' * ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ToBool(ObtenerToken(izq.cad)) + ' * ' + ToBool(ObtenerToken(der.cad)) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' * ' + ToBool(ObtenerToken(der.cad)) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ToBool(ObtenerToken(izq.cad)) + ' * ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else{
        TablaError.push(new Errores('Semántico','El producto entre un ' + izq.TipoValor + 
                                    ' y un ' + der.TipoValor + ' no es permitida.','Fila: 0, Columna: 0'));
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = 1; //Error con los casteos implicitos de la multiplicacion.\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    
    return nodo;
}

function division(izq,der){
    var nodo = new Nodo3d('','','','',''), temp = '', sentencia = '';
    
    if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' / ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' / ' + ToBool(ObtenerToken(der.cad)) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ToBool(ObtenerToken(izq.cad)) + ' / ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else{
        TablaError.push(new Errores('Semántico','La división entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = 1; //Error con los casteos implicitos de la división.\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    
    return nodo;
}

function mod(izq,der){
   var nodo = new Nodo3d('','','','',''), temp = '', sentencia = '';
    
    if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' % ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' % ' + ToBool(ObtenerToken(der.cad)) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ToBool(ObtenerToken(izq.cad)) + ' % ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else{
        TablaError.push(new Errores('Semántico','El módulo entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = 1; //Error con los casteos implicitos del mod.\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    
    return nodo;
}

function potencia(izq,der){
    var nodo = new Nodo3d('','','','',''), temp = '', sentencia = '';
    
    if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' ^ ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ObtenerToken(izq.cad) + ' ^ ' + ToBool(ObtenerToken(der.cad)) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tnum.toLowerCase() ||
            ObtenerInfo(izq.cad).toLowerCase() == con_bool.toLowerCase() && ObtenerInfo(der.cad).toLowerCase() == con_temporal.toLowerCase()){
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = ' + ToBool(ObtenerToken(izq.cad)) + ' ^ ' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else{
        TablaError.push(new Errores('Semántico','La potencia entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        temp = generarTemp(); sentencia += izq.sentencia; sentencia += der.sentencia;
        sentencia += temp + ' = 1; //Error con los casteos implicitos de la potencia.\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    
    return nodo;
}

function minus(der)
{
    var nodo = new Nodo3d('','','','',''), temp = '', sentencia = '';
    
    if(der.TipoValor == con_tnum.toLowerCase()){
        temp = generarTemp(); sentencia += der.sentencia;
        sentencia += temp + ' = -' + ObtenerToken(der.cad) + ';\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    else{
        TablaError.push(new Errores('Semántico','El unario entre un de un' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        temp = generarTemp(); sentencia += der.sentencia;
        sentencia += temp + ' = -1;\n';
        nodo = new Nodo3d(temp + ' (temporal)','','',sentencia,con_tnum);
    }
    return nodo;
}