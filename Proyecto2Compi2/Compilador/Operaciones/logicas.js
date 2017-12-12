
function AndIzquierdo(izq){
    var etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(izq.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(izq.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); izq.verdadera = verdadera + ': '; izq.falsa = falsa + ': ';
        etq_verdad = izq.verdadera;
        agregar3d(etq_verdad);
    }
    else{
        agregar3d(izq.sentencia);
        etq_verdad = izq.verdadera;
        agregar3d(etq_verdad);
    }
}

function AndDerecho(izq,der){
    var nodo = new Nodo3d('','','','',''), etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(der.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(der.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); der.verdadera = verdadera + ': '; der.falsa = falsa + ': ';
        etq_falsa = izq.falsa + der.falsa; 
        etq_verdad = der.verdadera;
    }
    else{
        agregar3d(der.sentencia);
        etq_falsa = izq.falsa + der.falsa; 
        etq_verdad = der.verdadera;
    }
    
    nodo = new Nodo3d('',etq_verdad,etq_falsa,'',con_tbool);
    
    return nodo;
}

function OrIzquierdo(izq){
    var etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(izq.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(izq.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); izq.verdadera = verdadera + ': '; izq.falsa = falsa + ': ';
        etq_falsa = izq.falsa;
        agregar3d(etq_falsa);
    }
    else{
        agregar3d(izq.sentencia);
        etq_falsa = izq.falsa;
        agregar3d(etq_falsa);
    }
}

function OrDerecho(izq,der){
    var nodo = new Nodo3d('','','','',''), etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(der.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(der.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); der.verdadera = verdadera + ': '; der.falsa =  falsa + ': ';
        etq_verdad = izq.verdadera + der.verdadera; 
        etq_falsa = der.falsa;
    }
    else{
        agregar3d(der.sentencia);
        etq_verdad = izq.verdadera + der.verdadera; 
        etq_falsa = der.falsa;
    }
    
    nodo = new Nodo3d('',etq_verdad,etq_falsa,'',con_tbool);
    
    return nodo;
}

function not(der){
    var nodo = new Nodo3d('','','','',''), etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(der.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(der.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); etq_falsa = falsa + ': '; etq_verdad = verdadera + ': ';
    }
    else{
        agregar3d(der.sentencia);
        etq_verdad = der.verdadera; 
        etq_falsa = der.falsa;
    }
    
    nodo = new Nodo3d('',etq_falsa,etq_verdad,'',con_tbool);    
    return nodo;
}

function Xor(izq,der){
    var nodo = new Nodo3d('','','','',''), etq_verdad = '', etq_falsa = '';
   
    if(ObtenerInfo(izq.cad) == con_bool.toLowerCase() && ObtenerInfo(der.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(' + ToBool(ObtenerToken(izq.cad)) + ' == '+ ToBool(ObtenerToken(der.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia);
        agregar3d(verdadera + ':\n'); var EtTemporal = generarEt(); var temporal = generarTemp();
        agregar3d(temporal + ' = 0;\n'); agregar3d('goto ' + EtTemporal + ';\n');
        agregar3d(falsa + ':\n');
        agregar3d(temporal + ' = 1;\n');
        agregar3d(EtTemporal + ':\n');
        
        verdadera = generarEt(); falsa = generarEt();
        
        sentencia = 'if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); der.verdadera = verdadera + ': '; der.falsa =  falsa + ': ';
        etq_verdad = der.verdadera; 
        etq_falsa = der.falsa;
    }
    else if(ObtenerInfo(der.cad) == con_bool.toLowerCase()){
        var pivTemporal = generarTemp(); var pivEtiqueta = generarEt();
        agregar3d(izq.sentencia);
        agregar3d(izq.verdadera+'\n');
        agregar3d(pivTemporal + ' = 1;\n');
        agregar3d('goto ' + pivEtiqueta + ';\n');
        agregar3d(izq.falsa+'\n');
        agregar3d(pivTemporal + ' = 0;\n');
        agregar3d(pivEtiqueta+':\n');
        //---
        
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(' + pivTemporal + ' == '+ ToBool(ObtenerToken(der.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia);
        agregar3d(verdadera + ':\n'); var EtTemporal = generarEt(); var temporal = generarTemp();
        agregar3d(temporal + ' = 0;\n'); agregar3d('goto ' + EtTemporal + ';\n');
        agregar3d(falsa + ':\n');
        agregar3d(temporal + ' = 1;\n');
        agregar3d(EtTemporal + ':\n');
        
        verdadera = generarEt(); falsa = generarEt();
        
        sentencia = 'if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); der.verdadera = verdadera + ': '; der.falsa =  falsa + ': ';
        etq_verdad = der.verdadera; 
        etq_falsa = der.falsa;
    }
    else if(ObtenerInfo(izq.cad) == con_bool.toLowerCase()){
        var pivTemporal = generarTemp(); var pivEtiqueta = generarEt();
        agregar3d(der.sentencia);
        agregar3d(der.verdadera+'\n');
        agregar3d(pivTemporal + ' = 1;\n');
        agregar3d('goto ' + pivEtiqueta + ';\n');
        agregar3d(der.falsa+'\n');
        agregar3d(pivTemporal + ' = 0;\n');
        agregar3d(pivEtiqueta+':\n');
        
        //---
        
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(' + pivTemporal + ' == '+ ToBool(ObtenerToken(izq.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia);
        agregar3d(verdadera + ':\n'); var EtTemporal = generarEt(); var temporal = generarTemp();
        agregar3d(temporal + ' = 0;\n'); agregar3d('goto ' + EtTemporal + ';\n');
        agregar3d(falsa + ':\n');
        agregar3d(temporal + ' = 1;\n');
        agregar3d(EtTemporal + ':\n');
        
        verdadera = generarEt(); falsa = generarEt();
        
        sentencia = 'if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); der.verdadera = verdadera + ': '; der.falsa =  falsa + ': ';
        etq_verdad = der.verdadera; 
        etq_falsa = der.falsa;
    }
    else
    {
        var pivTemporal = generarTemp(); var pivEtiqueta = generarEt();
        agregar3d(izq.sentencia);
        agregar3d(izq.verdadera+'\n');
        agregar3d(pivTemporal + ' = 1;\n');
        agregar3d('goto ' + pivEtiqueta + ';\n');
        agregar3d(izq.falsa+'\n');
        agregar3d(pivTemporal + ' = 0;\n');
        agregar3d(pivEtiqueta+':\n');
        //----
        var pivTemporal2 = generarTemp(); var pivEtiqueta2 = generarEt();
        agregar3d(der.sentencia);
        agregar3d(der.verdadera+'\n');
        agregar3d(pivTemporal2 + ' = 1;\n');
        agregar3d('goto ' + pivEtiqueta2 + ';\n');
        agregar3d(der.falsa+'\n');
        agregar3d(pivTemporal2 + ' = 0;\n');
        agregar3d(pivEtiqueta2 +':\n');
        
        //-----------------
        
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(' + pivTemporal + ' == '+ pivTemporal2 +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia);
        agregar3d(verdadera + ':\n'); var EtTemporal = generarEt(); var temporal = generarTemp();
        agregar3d(temporal + ' = 0;\n'); agregar3d('goto ' + EtTemporal + ';\n');
        agregar3d(falsa + ':\n');
        agregar3d(temporal + ' = 1;\n');
        agregar3d(EtTemporal + ':\n');
        
        verdadera = generarEt(); falsa = generarEt();
        
        sentencia = 'if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); der.verdadera = verdadera + ': '; der.falsa =  falsa + ': ';
        etq_verdad = der.verdadera; 
        etq_falsa = der.falsa;
    }
    
    nodo = new Nodo3d('',etq_verdad,etq_falsa,'',con_tbool);
    return nodo;
}

function NandIzquierdo(izq){
    var etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(izq.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(izq.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); izq.verdadera = verdadera + ': '; izq.falsa = falsa + ': ';
        etq_verdad = izq.verdadera;
        agregar3d(etq_verdad);
    }
    else{
        agregar3d(izq.sentencia);
        etq_verdad = izq.verdadera;
        agregar3d(etq_verdad);
    }
}

function NandDerecho(izq,der){
    var nodo = new Nodo3d('','','','',''), etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(der.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(der.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); der.verdadera = verdadera + ': '; der.falsa = falsa + ': ';
        etq_falsa = izq.falsa + der.falsa; 
        etq_verdad = der.verdadera;
    }
    else{
        agregar3d(der.sentencia);
        etq_falsa = izq.falsa + der.falsa; 
        etq_verdad = der.verdadera;
    }
    
    nodo = new Nodo3d('',etq_falsa,etq_verdad,'',con_tbool);
    
    return nodo;
}

function NorIzquierdo(izq){
    var etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(izq.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(izq.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); izq.verdadera = verdadera + ': '; izq.falsa = falsa + ': ';
        etq_falsa = izq.falsa;
        agregar3d(etq_falsa);
    }
    else{
        agregar3d(izq.sentencia);
        etq_falsa = izq.falsa;
        agregar3d(etq_falsa);
    }
}

function NorDerecho(izq,der){
    var nodo = new Nodo3d('','','','',''), etq_verdad = '', etq_falsa = '';
    
    if(ObtenerInfo(der.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(), falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(der.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia); der.verdadera = verdadera + ': '; der.falsa =  falsa + ': ';
        etq_verdad = izq.verdadera + der.verdadera; 
        etq_falsa = der.falsa;
    }
    else{
        agregar3d(der.sentencia);
        etq_verdad = izq.verdadera + der.verdadera; 
        etq_falsa = der.falsa;
    }
    
    nodo = new Nodo3d('',etq_falsa,etq_verdad,'',con_tbool);
    
    return nodo;
}