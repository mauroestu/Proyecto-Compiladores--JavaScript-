function igualdad(izq,der){
    var nodo = new Nodo3d('','','','',''), verdadera = '', falsa = '', sentencia = '';
    
    if(izq.TipoValor == con_tstr.toLowerCase() && der.TipoValor == con_tstr.toLowerCase()){
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia;
        
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        sentencia += 'P = P + ' + CambioAmbito + ';\n';
        sentencia += temporal + ' = P + 1;\n';
        sentencia += 'Stack[' + temporal + '] = ' + izq.cad + ';\n';
        temporal = generarTemp();
        sentencia += temporal + ' = P + 2;\n';
        sentencia += 'Stack[' + temporal + '] = ' + der.cad + ';\n';
        sentencia += '$$_igual();\n';
        temporal = generarTemp();
        sentencia += temporal + ' = Stack[P]; //Retorno valor. \n';
        sentencia += '$$_SGB(P,2);\n';
        sentencia += 'P = P - ' + CambioAmbito + ';\n';
        sentencia += 'if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(' + ObtenerToken(izq.cad) + ' == ' + ObtenerToken(der.cad) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        if(ToBool(ObtenerToken(izq.cad)) == -1 && ToBool(ObtenerToken(der.cad)) == -1)
        {
            sentencia += 'if(' + ObtenerToken(izq.cad) + ' == ' + ObtenerToken(der.cad) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        }
        else if(ToBool(ObtenerToken(izq.cad)) == -1)
        {
            sentencia += 'if(' + ObtenerToken(izq.cad) + ' == ' + ToBool(ObtenerToken(der.cad)) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        }
        else if(ToBool(ObtenerToken(der.cad)) == -1)
        {
            sentencia += 'if(' + ToBool(ObtenerToken(izq.cad)) + ' == ' + ObtenerToken(der.cad) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        }
        else
        {
            sentencia += 'if(' + ToBool(ObtenerToken(izq.cad)) + ' == ' + ToBool(ObtenerToken(der.cad)) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        }
        
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    else if(izq.TipoValor == con_tnull.toLowerCase() && der.TipoValor == con_tnull.toLowerCase() ||
           ObtenerInfo(izq.cad) == con_temporal && der.TipoValor == con_tnull.toLowerCase() ||
           izq.TipoValor == con_tnull.toLowerCase() && ObtenerInfo(der.cad) == con_temporal.toLowerCase()){
        
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        var temp1 = generarTemp(), temp2 = generarTemp(); var pizq = '', pder = '';
        
        if(ObtenerInfo(izq.cad) == con_temporal) { pizq = ObtenerToken(izq.cad); pder = der.cad; }
        else if(ObtenerInfo(der.cad) == con_temporal) { pizq = izq.cad; pder = ObtenerToken(der.cad); }
        else { pizq = izq.cad; pder = der.cad; }
        
        sentencia += temp1 + ' = ' + pizq + ';\n'; sentencia += temp2 + ' = ' + pder + ';\n';
        sentencia += 'if(' + temp1 + ' == ' + temp2 + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    else{
        TablaError.push(new Errores('Semántico','La igualdad entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(1 == 0) goto ' + verdadera + '; //Las operaciones relacionales solo se pueden con valores del mismo tipo. \ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    
    return nodo;
}

function diferencia(izq,der){
    var nodo = new Nodo3d('','','','',''), verdadera = '', falsa = '', sentencia = '';
    
    if(izq.TipoValor == con_tstr.toLowerCase() && der.TipoValor == con_tstr.toLowerCase()){
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia;
        
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        sentencia += 'P = P + ' + CambioAmbito + ';\n';
        sentencia += temporal + ' = P + 1;\n';
        sentencia += 'Stack[' + temporal + '] = ' + izq.cad + ';\n';
        temporal = generarTemp();
        sentencia += temporal + ' = P + 2;\n';
        sentencia += 'Stack[' + temporal + '] = ' + der.cad + ';\n';
        sentencia += '$$_nigual();\n';
        temporal = generarTemp();
        sentencia += temporal + ' = Stack[P]; //Retorno valor. \n'
        sentencia += '$$_SGB(P,2);\n';
        sentencia += 'P = P - ' + CambioAmbito + ';\n';
        sentencia += 'if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(' + ObtenerToken(izq.cad) + ' != ' + ObtenerToken(der.cad) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else if(izq.TipoValor == con_tnull.toLowerCase() && der.TipoValor == con_tnull.toLowerCase() ||
           ObtenerInfo(izq.cad) == con_temporal && der.TipoValor == con_tnull.toLowerCase() ||
           izq.TipoValor == con_tnull.toLowerCase() && ObtenerInfo(der.cad) == con_temporal.toLowerCase()){
        
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        var temp1 = generarTemp(), temp2 = generarTemp(); var pizq = '', pder = '';
        
        if(ObtenerInfo(izq.cad) == con_temporal) { pizq = ObtenerToken(izq.cad); pder = der.cad; }
        else if(ObtenerInfo(der.cad) == con_temporal) { pizq = izq.cad; pder = ObtenerToken(der.cad); }
        else { pizq = izq.cad; pder = der.cad; }
        
        sentencia += temp1 + ' = ' + pizq + ';\n'; sentencia += temp2 + ' = ' + pder + ';\n';
        sentencia += 'if(' + temp1 + ' != ' + temp2 + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    else if(izq.TipoValor == con_tbool.toLowerCase() && der.TipoValor == con_tbool.toLowerCase()){
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(' + ToBool(ObtenerToken(izq.cad)) + ' != ' + ToBool(ObtenerToken(der.cad)) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    else{
        TablaError.push(new Errores('Semántico','La igualdad entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(1 != 1) goto ' + verdadera + '; //Las operaciones relacionales solo se pueden con valores del mismo tipo. \ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    
    return nodo;
}

function mayor(izq,der){
    var nodo = new Nodo3d('','','','',''), verdadera = '', falsa = '', sentencia = '';
    
    if(izq.TipoValor == con_tstr.toLowerCase() && der.TipoValor == con_tstr.toLowerCase()){
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia;
        
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        sentencia += 'P = P + ' + CambioAmbito + ';\n';
        sentencia += temporal + ' = P + 1;\n';
        sentencia += 'Stack[' + temporal + '] = ' + izq.cad + ';\n';
        temporal = generarTemp();
        sentencia += temporal + ' = P + 2;\n';
        sentencia += 'Stack[' + temporal + '] = ' + der.cad + ';\n';
        sentencia += '$$_mayor();\n';
        temporal = generarTemp();
        sentencia += temporal + ' = Stack[P]; //Retorno valor. \n'
        sentencia += '$$_SGB(P,2);\n';
        sentencia += 'P = P - ' + CambioAmbito + ';\n';
        sentencia += 'if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(' + ObtenerToken(izq.cad) + ' > ' + ObtenerToken(der.cad) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else{
        TablaError.push(new Errores('Semántico','La igualdad entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(1 == 0) goto ' + verdadera + '; //Las operaciones relacionales solo se pueden con valores del mismo tipo. \ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    
    return nodo;
}

function menor(izq,der){
    var nodo = new Nodo3d('','','','',''), verdadera = '', falsa = '', sentencia = '';
    
    if(izq.TipoValor == con_tstr.toLowerCase() && der.TipoValor == con_tstr.toLowerCase()){
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia;
        
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        sentencia += 'P = P + ' + CambioAmbito + ';\n';
        sentencia += temporal + ' = P + 1;\n';
        sentencia += 'Stack[' + temporal + '] = ' + izq.cad + ';\n';
        temporal = generarTemp();
        sentencia += temporal + ' = P + 2;\n';
        sentencia += 'Stack[' + temporal + '] = ' + der.cad + ';\n';
        sentencia += '$$_menor();\n';
        temporal = generarTemp();
        sentencia += temporal + ' = Stack[P]; //Retorno valor. \n'
        sentencia += '$$_SGB(P,2);\n';
        sentencia += 'P = P - ' + CambioAmbito + ';\n';
        sentencia += 'if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(' + ObtenerToken(izq.cad) + ' < ' + ObtenerToken(der.cad) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else{
        TablaError.push(new Errores('Semántico','La igualdad entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(1 == 0) goto ' + verdadera + '; //Las operaciones relacionales solo se pueden con valores del mismo tipo. \ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    
    return nodo;
}

function mayor_igual(izq,der){
    var nodo = new Nodo3d('','','','',''), verdadera = '', falsa = '', sentencia = '';
    
    if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(' + ObtenerToken(izq.cad) + ' >= ' + ObtenerToken(der.cad) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else{
        TablaError.push(new Errores('Semántico','La igualdad entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(1 == 0) goto ' + verdadera + '; //Las operaciones relacionales solo se pueden con valores del mismo tipo. \ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    
    return nodo;
}

function menor_igual(izq,der){
    var nodo = new Nodo3d('','','','',''), verdadera = '', falsa = '', sentencia = '';
    
    if(izq.TipoValor == con_tnum.toLowerCase() && der.TipoValor == con_tnum.toLowerCase()){
        
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(' + ObtenerToken(izq.cad) + ' <= ' + ObtenerToken(der.cad) + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera + ': ',falsa + ': ',sentencia,con_tbool);
    }
    else{
        TablaError.push(new Errores('Semántico','La igualdad entre un ' + ObtenerInfo(izq.cad).toLowerCase() + 
                                    ' y un ' + ObtenerInfo(der.cad).toLowerCase() + ' no es permitida.','Fila: 0, Columna: 0'));
        verdadera = generarEt(); falsa = generarEt(); sentencia += izq.sentencia; sentencia += der.sentencia; 
        sentencia += 'if(1 == 0) goto ' + verdadera + '; //Las operaciones relacionales solo se pueden con valores del mismo tipo. \ngoto ' + falsa + ';\n';
        nodo = new Nodo3d('',verdadera+ ': ',falsa+ ': ',sentencia,con_tbool);
    }
    
    return nodo;
}