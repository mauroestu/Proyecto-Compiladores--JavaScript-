class Nodo3d{
    constructor(cad,verdadera,falsa,sentencia,TipoValor){
        this.cad = cad;
        this.verdadera = verdadera;
        this.falsa = falsa;
        this.sentencia = sentencia;
        this.TipoValor = TipoValor;
    }
}

class Estructura{
    constructor(Posicion,Valor,Nombre){
        this.Posicion = Posicion;
        this.Valor = Valor;
        this.Nombre = Nombre;
    }
}

class Dato{
    constructor(objDato,Tipo,Objetos,isElement,Elementos,Dimensiones,isArray){
        this.objDato = objDato;
        this.Tipo = Tipo;
        this.Objetos = Objetos;
        this.isElement = isElement;
        this.Elementos = Elementos;
        this.Dimensiones = Dimensiones;
        this.isArray = isArray;
    }
}

class Errores{
    constructor(Tipo,Descripcion,Posicion){
        this.Tipo = Tipo;
        this.Descripcion = Descripcion;
        this.Posicion = Posicion;
    }
}

class Simbolos{
    constructor(Ambito,idLoop,ptnSentencia,EtqInicio,EtqFinal,tamanio,listContenido){
        this.Ambito = Ambito;
        this.idLoop = idLoop;
        this.ptnSentencia = ptnSentencia;
        this.EtqInicio = EtqInicio;
        this.EtqFinal = EtqFinal;
        this.tamanio = tamanio;
        this.listContenido = listContenido;
    }
    
    ObtenerTamanioDimension(strNombreVariable,nDimension)
    {
        var Tamanio = 0;
        
        for(var i = 0; this.listContenido.length; i++)
        {
            if(this.listContenido[i].strNombreSimbolo == strNombreVariable && this.listContenido[i].IsVar && this.listContenido[i].isArray)
            {
                Tamanio = this.listContenido[i].Dimensiones[nDimension].Superior - this.listContenido[i].Dimensiones[nDimension].Inferior;
                break;
            }
        }
        
        return Tamanio;
    }
    
    ObtenerPosicion(strNombreVariable){
        var Posicion = 0;
        
        for(var i = 0; this.listContenido.length; i++)
        {
            if(this.listContenido[i].strNombreSimbolo == strNombreVariable && this.listContenido[i].IsVar)
            {
                Posicion = this.listContenido[i].Posicion;
                break;
            }
        }
        
        return Posicion;
    }
    
    ObtenerReferencias(strNombre,strTipo,ListaParametros){
        var Referencias = [], Existe = false;
        
        for(var i = 0; i < this.listContenido.length; i++)
        {
            if(this.listContenido[i].strNombreSimbolo == strNombre  && this.listContenido[i].strTipoValor == strTipo)
            {
                if(this.listContenido[i].ListParametros.length == ListaParametros.length)
                {
                    for(var j = 0;  j < ListaParametros.length; j++)
                    {
                        if(ListaParametros[j][1] == this.listContenido[i].ListParametros[j].strTipoValor) {
                            Existe = true;
                        }
                        else{
                            Existe = false; break;
                        }
                    }
                    if(ListaParametros.length == 0) Existe = true;
                    if(Existe && ListaParametros.length > 0)
                    {
                        for(var j = 0;  j < ListaParametros.length; j++)
                        {
                            Referencias.push(this.listContenido[i].ListParametros[j].Referenciable);
                        }
                        break;
                    }
                }
            }
        }
        
        return Referencias;
    }
    
    ObtenerMetodo(strNombre,strTipo,ListaParametros){
        var Existe = false, NombreMetodo = '', Tamanio = 0;
        
        for(var i = 0; i < this.listContenido.length; i++)
        {
            if(this.listContenido[i].strNombreSimbolo == strNombre  && this.listContenido[i].strTipoValor == strTipo)
            {
                if(this.listContenido[i].ListParametros.length == ListaParametros.length)
                {
                    for(var j = 0;  j < ListaParametros.length; j++)
                    {
                        if(ListaParametros[j][1] == this.listContenido[i].ListParametros[j].strTipoValor || ListaParametros[j][1] == 'array') {
                            Existe = true;
                        }
                        else{
                            Existe = false; break;
                        }
                    }
                    if(ListaParametros.length == 0) Existe = true;
                    if(Existe){
                        NombreMetodo = this.listContenido[i].isObjeto; Tamanio = this.listContenido[i].Posicion;
                        break;
                    }
                }
            }
        }
        
        return [Existe,NombreMetodo,Tamanio];
    }
    
    ExisteFuncion(strNombre,strTipo,ListaParametros){
        var Existe = false;
        
        for(var i = 0; i < this.listContenido.length; i++){
            if(this.listContenido[i].strNombreSimbolo == strNombre && this.listContenido[i].strTipoValor == strTipo){
                if(this.listContenido[i].ListParametros.length == ListaParametros.length && this.listContenido[i].strTipoValor == strTipo){
                    for(var j = 0; j < ListaParametros.length; j++){
                        if(ListaParametros[j].strTipoValor == this.listContenido[i].ListParametros[j].strTipoValor){
                            Existe = true;
                        }
                        else{
                            Existe = false; break;
                        }
                    }
                    if(Existe){ break; }
                }
            }
        }
        
        return Existe;
    }
    
    ExisteElement(strNombre){
        var Existe = false;
        
        for(var i = 0; i < this.listContenido.length; i++)
        {
            if(this.listContenido[i].strNombreSimbolo == strNombre && this.listContenido[i].isObjeto)
            {
                Existe = true;
                break;
            }
        }
        
        return Existe;
    }
    
    ExisteSimbolo(strNombre){
        var Existe = false;
        
        for(var i = 0; i < this.listContenido.length; i++)
        {
            if(this.listContenido[i].strNombreSimbolo == strNombre && this.listContenido[i].IsVar)
            {
                Existe = true;
                break;
            }
        }
        
        return Existe;
    }
    
    ObtenerValGeneral(ptnId,Dimensiones,Lista,Contador,IsGlobal){
        var Existe = false, Valor = ValorNulo, TipoValor = '';
        
        for(var i = 0; i < Lista.length; i++)
        {
            var strNombreVariable = ptnId.Nodes[Contador].FindTokenAndGetText();
            if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 != Contador) && IsGlobal)
            {
                if(Lista[i].isObjeto)
                {
                    var temporal = generarTemp(), HeapPivote = generarTemp();
                    agregar3d(temporal + ' = ' + Lista[i].Posicion + '; //Obtienendo el contenido del objeto ' + Lista[i].strNombreSimbolo + '\n');
                    agregar3d(HeapPivote + ' = ' + ' Heap[' + temporal + ']; \n');
                    return RecursivoObtenerValGeneral(ptnId,Dimensiones,Lista[i].ListaObjetos,Contador + 1,IsGlobal,HeapPivote);
                }
            }
            else if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 != Contador))
            {
                if(Lista[i].isObjeto)
                {
                    var temporal = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal + ' = ' + ' P + ' + Lista[i].Posicion + '; \n');
                    agregar3d(temporal2 + ' = ' + ' Stack[' + temporal + ']; //Obteniendo posicion inicio de ' + strNombreVariable + ' \n');
                    return RecursivoObtenerValGeneral(ptnId,Dimensiones,Lista[i].ListaObjetos,Contador + 1,IsGlobal,temporal2);
                }
            }
            else if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 == Contador) && IsGlobal)
            {
                if(Lista[i].isArray)
                {
                    var resultado = MapeoLexicografico(Lista[i].Dimensiones,Dimensiones);
                    var temporal1 = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal1 + ' = ' + Lista[i].Posicion + ' + ' +  resultado + ';\n');
                    agregar3d(temporal2 + ' = Heap[' + temporal1 + ']; //Obteniendo el valor del arreglo global ' + Lista[i].strNombreSimbolo + '\n');
                    Existe = true; Valor = temporal2; TipoValor = Lista[i].strTipoValor; 
                    return [Existe,Valor,TipoValor];
                }
                
                if(Lista[i].isObjeto)
                {
                    
                    var temporal = generarTemp(), HeapPivote = generarTemp();
                    agregar3d(temporal + ' = ' + Lista[i].Posicion + '; //Obtienendo el contenido del objeto ' + Lista[i].strNombreSimbolo + '\n');
                    agregar3d(HeapPivote + ' = ' + 'Heap[' + temporal + ']; \n');
                    Existe = true; Valor = HeapPivote; TipoValor = Lista[i].strTipoValor;
                    return [Existe,Valor,TipoValor];
                }
                
                var temporal = generarTemp();
                agregar3d(temporal + ' = Heap[' + Lista[i].Posicion + ']; //Obtienendo el contenido de la variable ' + Lista[i].strNombreSimbolo + '\n');
                Existe = true; Valor = temporal; TipoValor = Lista[i].strTipoValor;
            }
            else if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 == Contador))
            {
                
                
                if(Lista[i].isArray)
                { 
                    if(Dimensiones.length == 0)
                    {
                        var temporal1 = generarTemp(), temporal2 = generarTemp();
                        agregar3d(temporal1 + ' = P + ' + Lista[i].Posicion + ';\n');
                        agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                        Existe = true; Valor = temporal2; TipoValor = 'array';
                        return [Existe,Valor,TipoValor];
                    }
                    else
                    {
                        
                        var resultado = MapeoLexicografico(Lista[i].Dimensiones,Dimensiones);
                        var temporal1 = generarTemp(),temporal2 = generarTemp(),temporal3 = generarTemp(), temporal4 = generarTemp();
                        agregar3d(temporal1 + ' = P + ' + Lista[i].Posicion + ';\n');
                        agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                        agregar3d(temporal3 + ' = ' +temporal2 + ' + ' + resultado + ';\n');
                        agregar3d(temporal4 + ' = Heap[' + temporal3 + ']; //Obteniendo el valor del arreglo ' + Lista[i].strNombreSimbolo + '\n');
                        Existe = true; Valor = temporal4; TipoValor = Lista[i].strTipoValor; 
                        return [Existe,Valor,TipoValor];
                    }
                }
                
                if(Lista[i].isObjeto)
                {
                    var temporal = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal + ' = P + ' + Lista[i].Posicion + ';\n');
                    agregar3d(temporal2 + ' = Stack[' + temporal + ']; //Obtienendo el contenido del objeto. ' + Lista[i].strNombreSimbolo + '\n');
                    Existe = true; Valor = temporal2; TipoValor = Lista[i].strTipoValor; 
                    return [Existe,Valor,TipoValor];
                }
                
                if(Lista[i].strTipoValor == con_tstr)
                {
                    var temporal1 = generarTemp(), temporal2 = generarTemp(), temporal3 = generarTemp();
                    agregar3d(temporal1 + ' = P + ' + Lista[i].Posicion + ';\n');
                    agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                    agregar3d(temporal3 + ' = Heap[' + temporal2 + ']; //Obtienendo el contenido de la variable ' + Lista[i].strNombreSimbolo + '\n');
                    Existe = true; Valor = temporal3; TipoValor = Lista[i].strTipoValor;
                }
                else
                {
                    var temporal = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal + ' = P + ' + Lista[i].Posicion + ';\n');
                    agregar3d(temporal2 + ' = Stack[' + temporal + ']; //Obtienendo el contenido de la variable ' + Lista[i].strNombreSimbolo + '\n');
                    Existe = true; Valor = temporal2; TipoValor = Lista[i].strTipoValor;
                }
            }
            else if((Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsFuncion && ptnId.Nodes.length >= 2)){
                
                [Valor,TipoValor] = InvocarFuncion(Lista,ptnId,i); Existe = true;
                
                //Accediendo a los atributos de la función.
                {
                    Contador++;
                    if(Contador != ptnId.Nodes.length - 1) {  }  
                }
            }
            
        }
        
        return [Existe,Valor,TipoValor];
    }
    
    AsignarValorGeneral(ptnId,Valor,Dimensiones,strTipoValor,Lista,Contador,IsGlobal,IsNuevo){
        var Existe = false;
        
        for(var i = 0; i < Lista.length; i++)
        {
            var strNombreVariable = ptnId.Nodes[Contador].FindTokenAndGetText();
            
            if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 != Contador) && IsGlobal)
            {
                if(Lista[i].isObjeto)
                {
                    var temporal = generarTemp(), HeapPivote = generarTemp();
                    agregar3d(temporal + ' = ' + Lista[i].Posicion + '; //Ingresando al objeto ' + Lista[i].strNombreSimbolo + '\n');
                    agregar3d(HeapPivote + ' = ' + ' Heap[' + temporal + ']; \n');
                    return RecursivoAsignarValGeneral(ptnId,Valor,Dimensiones,strTipoValor,Lista[i].ListaObjetos,Contador + 1,IsGlobal,HeapPivote,IsNuevo);
                }
            }
            else if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 != Contador))
            {
                if(Lista[i].isObjeto)
                {
                    var temporal = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal + ' = ' + ' P + ' + Lista[i].Posicion + '; \n');
                    agregar3d(temporal2 + ' = ' + ' Stack[' + temporal + ']; //Ingresando al objeto ' + strNombreVariable + ' \n');
                    return RecursivoAsignarValGeneral(ptnId,Valor,Dimensiones,strTipoValor,Lista[i].ListaObjetos,Contador + 1,IsGlobal,temporal2,IsNuevo);
                }
            }
            else if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 == Contador) && IsGlobal)
            {
                if(Lista[i].isArray)
                {
                    var resultado = MapeoLexicografico(Lista[i].Dimensiones,Dimensiones);
                    var temporal1 = generarTemp();
                    agregar3d(temporal1 + ' = ' + Lista[i].Posicion + ' + ' +  resultado + ';\n');
                    agregar3d('Heap[' + temporal1 + '] = ' + Valor + '; //Asignando al arreglo global ' + Lista[i].strNombreSimbolo + '\n');
                    Existe = true;
                    return Existe;
                }
                
                if(Lista[i].isObjeto)
                {
                    if(IsNuevo)
                    {
                        if(Lista[i].strTipoValor == strTipoValor)
                        {
                            var [Existe,Elementos] = ObtenerElementos(strTipoValor);
                            var tempo = generarTemp(), HeapPivote = generarTemp();
                            Lista[i].ListaObjetos = Elementos;
                            agregar3d(tempo + ' = ' + Lista[i].Posicion + '; \n');
                            agregar3d('Heap[' + tempo + '] = H; \n')
                            agregar3d(HeapPivote + ' = H; \n'); 
                            agregar3d('H = H + ' + Elementos.length.toString() + '; //Aumentamos el puntero el numero de atributos. \n');
                            DeclararVariableElement(Elementos,HeapPivote);
                        }
                        else
                        {}
                    }
                    else
                    {
                        agregar3d('Heap[' + Lista[i].Posicion + '] = ' + Valor + '; //Asignando a la variable global ' + strNombreVariable + '\n');
                        Existe = true;
                    }
                    return Existe;
                }
                
                if(Lista[i].strTipoValor == strTipoValor || Valor == ValorNulo )
                {
                    Lista[i].ValorSimbolo = Valor;
                    agregar3d('Heap[' + Lista[i].Posicion + '] = ' + Valor + '; //Asignando a la variable global ' + strNombreVariable + '\n');
                    Existe = true;
                }
                else
                {
                    Existe = CasteoImplicito(strNombreVariable,Lista[i].strTipoValor,Lista[i].Posicion,Valor,strTipoValor,IsGlobal,Lista,i,false,'');
                }
                
                
            }
            else if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 == Contador))
            {
                if(Lista[i].isArray)
                {
                    if(Dimensiones.length == null || Dimensiones.length == 0)
                    {
                        alert("qui");
                        var temporal1 = generarTemp();
                        agregar3d(temporal1 + ' = P + ' + Lista[i].Posicion + ';\n');
                        agregar3d('Stack[' + temporal1 + '] = ' + Valor + '; //Asignando al arreglo ' + Lista[i].strNombreSimbolo + '\n');
                        
                        Existe = true;
                        return Existe;
                    }
                    else
                    {
                        
                        var resultado = MapeoLexicografico(Lista[i].Dimensiones,Dimensiones);
                        var temporal1 = generarTemp(),temporal2 = generarTemp(),temporal3 = generarTemp();
                        agregar3d(temporal1 + ' = P + ' + Lista[i].Posicion + ';\n');
                        agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                        agregar3d(temporal3 + ' = ' +temporal2 + ' + ' + resultado + ';\n');
                        agregar3d('Heap[' + temporal3 + '] = ' + Valor + '; //Asignando al arreglo ' + Lista[i].strNombreSimbolo + '\n');
                        Existe = true;
                        return Existe;
                    }
                }
                
                if(Lista[i].isObjeto)
                {
                    if(IsNuevo)
                    {
                        if(Lista[i].strTipoValor == strTipoValor)
                        {
                            var [Existe,Elementos] = ObtenerElementos(strTipoValor);
                            Lista[i].ListaObjetos = Elementos;
                            var temporal = generarTemp();
                            agregar3d(temporal + ' = P + ' + Lista[i].Posicion + ';\n');
                            agregar3d('Stack[' + temporal + '] = H; \n')
                            var HeapPivote = generarTemp();
                            agregar3d(HeapPivote + ' = H; \n'); 
                            agregar3d('H = H + ' + Elementos.length.toString() + '; //Aumentamos el puntero el numero de atributos. \n');
                            DeclararVariableElement(Elementos,HeapPivote);
                        }
                        else
                        {}
                    }
                    else
                    {
                        var temporal = generarTemp();
                        agregar3d(temporal + ' = P + ' + Lista[i].Posicion + ';\n');
                        agregar3d('Stack[' + temporal + '] = ' + Valor + '; //Asignando a la variable ' + strNombreVariable + '\n');
                        Existe = true;
                    }
                    return Existe;
                }
                
                if((Lista[i].strTipoValor == con_tstr && strTipoValor == con_tstr) || (Lista[i].strTipoValor == con_tstr && Valor == ValorNulo))
                {
                    var temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + Lista[i].Posicion + ';\n');
                    agregar3d('Stack[' + temporal + '] = H;\n')
                    agregar3d('H = H + 1;\n');
                    var temporal1 = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal1 + ' = P + ' + Lista[i].Posicion + ';\n');
                    agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                    agregar3d('Heap[' + temporal2 + '] = ' + Valor + '; //Asignando la variable ' + Lista[i].strNombreSimbolo + '\n');
                    Lista[i].ValorSimbolo = temporal2;
                    Existe = true;
                }
                else if((Lista[i].strTipoValor == con_tnum && strTipoValor == con_tnum || (Lista[i].strTipoValor == con_tnum && Valor == ValorNulo)) ||
                       (Lista[i].strTipoValor == con_tbool && strTipoValor == con_tbool || (Lista[i].strTipoValor == con_tbool && Valor == ValorNulo)))
                {
                    Lista[i].ValorSimbolo = Valor;
                    var temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + Lista[i].Posicion + ';\n');
                    agregar3d('Stack[' + temporal + '] = ' + Valor + '; //Asignando a la variable ' + strNombreVariable + '\n');
                    Existe = true;
                }
                else
                {
                    Existe = CasteoImplicito(strNombreVariable,Lista[i].strTipoValor,Lista[i].Posicion,Valor,strTipoValor,IsGlobal,Lista,i,false,'');
                }
                
            }
        }
        
        return Existe;
    }
}

function InvocarFuncion(Lista,ptnId,i){
    var strTipoRetorno = Lista[i].strTipoValor, strNombreMetodo = Lista[i].isObjeto, Tamanio = Lista[i].Posicion,ValorRetorno = ValorNulo;
    var ListaParametros = [], ptnParametros = ptnId.Nodes[1];
    
    try
    {
        for(var j = 0; j < ptnParametros.Nodes.length; j++){
            var [Valor,TipoValor] = GenerarExpresion(ptnParametros.Nodes[j]);
            ListaParametros.push([Valor,TipoValor]);
        }

        var CambioAmbito = ObtenerPosicion(false) + 1;
        agregar3d('P = P + ' + CambioAmbito + ';\n');

        for(var j = 0; j < ptnParametros.Nodes.length; j++){
            if(ListaParametros[j][1] == con_tstr)
            {
                var temporal = generarTemp(), temporal2 = generarTemp();
                agregar3d(temporal + ' = P + ' + (j + 1).toString() + ';  \n');
                agregar3d('Stack[' + temporal + '] = H;\n');
                agregar3d('H = H + 1;\n');
                agregar3d(temporal2 + ' = P + ' + (j + 1).toString() + ';  \n');
                temporal = generarTemp(); 
                agregar3d(temporal  + ' = Stack[' + temporal2 + ']; //Asignando parametro. \n');
                agregar3d('Heap[' + temporal + '] = ' + ListaParametros[j][0] + '; //Asignando parametro. \n');
            }
            else
            {
                var temporal = generarTemp();
                agregar3d(temporal + ' = P + ' + (j + 1).toString() + ';  \n');
                agregar3d('Stack[' + temporal + '] = ' + ListaParametros[j][0] + '; //Asignando parametro. \n');
            }
        }
            
        AgregarSimbolo(strNombreMetodo,strTipoRetorno,'Global','Función',0);
        
        if(strTipoRetorno == con_tstr){
            agregar3d(strNombreMetodo + '();\n');
            ValorRetorno = generarTemp();
            agregar3d(ValorRetorno + ' = Stack[P]; //Retornando valor. \n');
            agregar3d('$$_SGB(P,' + (Tamanio + 1) + ');\n');
            agregar3d('P = P - ' + CambioAmbito + ';\n');        
        }
        else if(strTipoRetorno == 'void'){
            var temporal = generarTemp();
            agregar3d(temporal + ' = ' + ValorNulo + '; //No se puede retornar un void. \n');
            TablaError.push(new Errores('Semántico','No se puede retornar un método void.',0));
            Existe = true; Valor = temporal; TipoValor = con_tnum;
        }
        else{
            agregar3d(strNombreMetodo + '();\n');
            ValorRetorno = generarTemp();
            agregar3d(ValorRetorno + ' = Stack[P]; //Retornando valor. \n');
            agregar3d('$$_SGB(P,' + (Tamanio + 1) + ');\n');
            agregar3d('P = P - ' + CambioAmbito + ';\n');
            
        }
    }
    catch(err)
    {
        console.log(err);
    }
    return [ValorRetorno,strTipoRetorno];
}

function CasteoImplicito(strNombre,strTipoVariable,Posicion,Valor,TipoValor,IsGlobal,Lista,i,IsAtributo,TemporalAnterior)
{
    var Existe = false;
    
    try
    {
        if(IsGlobal && !IsAtributo)
        {
            if(strTipoVariable == con_tstr && TipoValor == con_tnum)
            {
                var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                agregar3d('P = P + ' + CambioAmbito + ';\n');
                agregar3d(temporal + ' = P + 1;\n');
                agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
                agregar3d('$$_singleNumToStr();\n');
                agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                agregar3d('$$_SGB(P,1);\n');
                agregar3d('P = P - ' + CambioAmbito + ';\n');
                
                Lista[i].ValorSimbolo = Valor;
                agregar3d('Heap[' + Lista[i].Posicion + '] = ' + EtiquetaRetorno + '; //Asignando a la variable global ' + strNombre + '\n');
                
                Existe = true;
            }
            else if(strTipoVariable == con_tstr && TipoValor == con_tbool)
            {
                var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                agregar3d('P = P + ' + CambioAmbito + ';\n');
                agregar3d(temporal + ' = P + 1;\n');
                agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
                agregar3d('$$_boolToStr();\n');
                agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                agregar3d('$$_SGB(P,1);\n');
                agregar3d('P = P - ' + CambioAmbito + ';\n');
                
                Lista[i].ValorSimbolo = Valor;
                agregar3d('Heap[' + Lista[i].Posicion + '] = ' + EtiquetaRetorno + '; //Asignando a la variable global ' + strNombre + '\n');
                
                Existe = true;
            }
            else if(strTipoVariable == con_tbool && TipoValor == con_tnum)
            {
                var ValorGuardar = generarTemp(); var verdadera = generarEt(), falsa = generarEt(), salida = generarEt();;
                agregar3d('if(' + Valor + ' > 0' + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n');
                agregar3d(verdadera + ':\n');
                agregar3d(ValorGuardar + ' = 1;\n');
                agregar3d('goto ' + salida + ';\n');
                agregar3d(falsa + ':\n');
                agregar3d(ValorGuardar + ' = 0;\n');
                agregar3d(salida + ':\n');
                
                Lista[i].ValorSimbolo = Valor;
                agregar3d('Heap[' + Lista[i].Posicion + '] = ' + ValorGuardar + '; //Asignando a la variable global ' + strNombre + '\n');
                Existe = true;
                
            }
            else if(strTipoVariable == con_tnum && TipoValor == con_tbool)
            {
                Lista[i].ValorSimbolo = Valor;
                agregar3d('Heap[' + Lista[i].Posicion + '] = ' + Valor + '; //Asignando a la variable global ' + strNombre + '\n');
                Existe = true;
            }
        }
        else if(!IsGlobal && !IsAtributo)
        {
            if(strTipoVariable == con_tstr && TipoValor == con_tnum)
            {
                
                var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                agregar3d('P = P + ' + CambioAmbito + ';\n');
                agregar3d(temporal + ' = P + 1;\n');
                agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
                agregar3d('$$_singleNumToStr();\n');
                agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                agregar3d('$$_SGB(P,1);\n');
                agregar3d('P = P - ' + CambioAmbito + ';\n');

                temporal = generarTemp();
                agregar3d(temporal + ' = P + ' + Posicion + ';\n');
                agregar3d('Stack[' + temporal + '] = H;\n')
                agregar3d('H = H + 1;\n');
                var temporal1 = generarTemp(), temporal2 = generarTemp();
                agregar3d(temporal1 + ' = P + ' + Posicion + ';\n');
                agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                agregar3d('Heap[' + temporal2 + '] = ' + EtiquetaRetorno + '; //Asignando la variable ' + strNombre + '\n');
                Lista[i].ValorSimbolo = temporal2;

                Existe = true;
            }
            else if(strTipoVariable == con_tstr && TipoValor == con_tbool)
            {
                var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                agregar3d('P = P + ' + CambioAmbito + ';\n');
                agregar3d(temporal + ' = P + 1;\n');
                agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
                agregar3d('$$_boolToStr();\n');
                agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                agregar3d('$$_SGB(P,1);\n');
                agregar3d('P = P - ' + CambioAmbito + ';\n');
                
                temporal = generarTemp();
                agregar3d(temporal + ' = P + ' + Posicion + ';\n');
                agregar3d('Stack[' + temporal + '] = H;\n')
                agregar3d('H = H + 1;\n');
                var temporal1 = generarTemp(), temporal2 = generarTemp();
                agregar3d(temporal1 + ' = P + ' + Posicion + ';\n');
                agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                agregar3d('Heap[' + temporal2 + '] = ' + EtiquetaRetorno + '; //Asignando la variable ' + strNombre + '\n');
                Lista[i].ValorSimbolo = temporal2;

                Existe = true;
            }
            else if(strTipoVariable == con_tbool && TipoValor == con_tnum)
            {
                var ValorGuardar = generarTemp(); var verdadera = generarEt(), falsa = generarEt(), salida = generarEt();;
                agregar3d('if(' + Valor + ' > 0' + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n');
                agregar3d(verdadera + ':\n');
                agregar3d(ValorGuardar + ' = 1;\n');
                agregar3d('goto ' + salida + ';\n');
                agregar3d(falsa + ':\n');
                agregar3d(ValorGuardar + ' = 0;\n');
                agregar3d(salida + ':\n');
                
                Lista[i].ValorSimbolo = Valor;
                var temporal = generarTemp();
                agregar3d(temporal + ' = P + ' + Lista[i].Posicion + ';\n');
                agregar3d('Stack[' + temporal + '] = ' + ValorGuardar + '; //Asignando a la variable ' + strNombre + '\n');
                
                Existe = true;
            }
            else if(strTipoVariable == con_tnum && TipoValor == con_tbool)
            {
                Lista[i].ValorSimbolo = Valor;
                var temporal = generarTemp();
                agregar3d(temporal + ' = P + ' + Lista[i].Posicion + ';\n');
                agregar3d('Stack[' + temporal + '] = ' + Valor + '; //Asignando a la variable ' + strNombre + '\n');
                Existe = true;
            }
        }
        else if(IsAtributo)
        {
            if(strTipoVariable == con_tstr && TipoValor == con_tnum)
            {
                var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                agregar3d('P = P + ' + CambioAmbito + ';\n');
                agregar3d(temporal + ' = P + 1;\n');
                agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
                agregar3d('$$_singleNumToStr();\n');
                agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                agregar3d('$$_SGB(P,1);\n');
                agregar3d('P = P - ' + CambioAmbito + ';\n');
                
                temporal = generarTemp();
                agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
                agregar3d('Heap[' + temporal + '] = ' + EtiquetaRetorno + '; //Asignando valor a ' + strNombre + '\n');
                Existe = true;
            }
            else if(strTipoVariable == con_tstr && TipoValor == con_tbool)
            {
                var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                agregar3d('P = P + ' + CambioAmbito + ';\n');
                agregar3d(temporal + ' = P + 1;\n');
                agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
                agregar3d('$$_boolToStr();\n');
                agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                agregar3d('$$_SGB(P,1);\n');
                agregar3d('P = P - ' + CambioAmbito + ';\n');
                
                temporal = generarTemp();
                agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
                agregar3d('Heap[' + temporal + '] = ' + EtiquetaRetorno + '; //Asignando valor a ' + strNombre + '\n');
                Existe = true;
            }
            else if(strTipoVariable == con_tbool && TipoValor == con_tnum)
            {
                var ValorGuardar = generarTemp(); var verdadera = generarEt(), falsa = generarEt(), salida = generarEt();;
                agregar3d('if(' + Valor + ' > 0' + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n');
                agregar3d(verdadera + ':\n');
                agregar3d(ValorGuardar + ' = 1;\n');
                agregar3d('goto ' + salida + ';\n');
                agregar3d(falsa + ':\n');
                agregar3d(ValorGuardar + ' = 0;\n');
                agregar3d(salida + ':\n');
                
                var temporal = generarTemp();
                agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
                agregar3d('Heap[' + temporal + '] = ' + ValorGuardar + '; //Asignando valor a ' + strNombre + '\n');
                Existe = true;
            }
            else if(strTipoVariable == con_tnum && TipoValor == con_tbool)
            {
                var temporal = generarTemp();
                agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
                agregar3d('Heap[' + temporal + '] = ' + Valor + '; //Asignando valor a ' + strNombre + '\n');
                Existe = true;
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
    return Existe;
}

function RecursivoAsignarValGeneral(ptnId,Valor,Dimensiones,strTipoValor,Lista,Contador,IsGlobal,TemporalAnterior,IsNuevo)
{
    var Existe = false;
    
    try
    {
        for(var i = 0; i < Lista.length; i++)
        {
            var strNombreVariable = ptnId.Nodes[Contador].FindTokenAndGetText();

            if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 != Contador))
            {
                var temporal = generarTemp(); var Posicion = Lista[i].Posicion;
                agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
                var temporal2 = generarTemp();
                agregar3d(temporal2 + ' = Heap[' + temporal + ']; //Ingresando a ' + strNombreVariable + '\n');
                if(Lista[i].ListaObjetos.length == 0)
                {
                }

                return RecursivoAsignarValGeneral(ptnId,Valor,Dimensiones,strTipoValor,Lista[i].ListaObjetos,Contador + 1,IsGlobal,temporal2,IsNuevo);
            }
            else if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 == Contador))
            {
                if(IsNuevo)
                {
                    var [Existe,Elementos] = ObtenerElementos(strTipoValor); var Posicion = Lista[i].Posicion;
                    Lista[i].ListaObjetos = Elementos;
                    var tempo = generarTemp(), HeapPivote = generarTemp();
                    agregar3d(tempo + ' = ' + TemporalAnterior + ' + ' + Posicion + '; \n');
                    agregar3d('H = H + 1; \n');
                    agregar3d(HeapPivote + ' = H; \n'); 
                    agregar3d('Heap[' + tempo + '] = ' + HeapPivote + '; \n');
                    agregar3d('H = H + ' + Elementos.length.toString() + '; //Aumentamos el puntero el numero de atributos. \n');
                    DeclararVariableElement(Elementos,HeapPivote);
                    Existe = true;
                }
                else
                {
                    if(Lista[i].strTipoValor == con_tstr || Lista[i].strTipoValor == con_tnum || Lista[i].strTipoValor == con_tbool)
                    {
                        if(Lista[i].strTipoValor == strTipoValor)
                        {
                            var temporal = generarTemp(); var Posicion = Lista[i].Posicion;
                            agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
                            agregar3d('Heap[' + temporal + '] = ' + Valor + '; //Asignando valor a ' + strNombreVariable + '\n');
                            Existe = true;
                        }
                        else
                        {
                            Existe = CasteoImplicito(strNombreVariable,Lista[i].strTipoValor,Lista[i].Posicion,Valor,strTipoValor,IsGlobal,Lista,i,true,TemporalAnterior);
                        }

                    }
                    else
                    {
                        if(Lista[i].ListaObjetos.length == 0)
                        {
                            var[Existe,Elementos] = ObtenerElementos(Lista[i].strTipoValor);
                            if(Existe)
                            {
                                Lista[i].ListaObjetos = Elementos;
                                var HeapPivote = generarTemp();
                                agregar3d(HeapPivote + ' = H; \n');
                                agregar3d('H = H + ' + Lista[i].ListaObjetos.length + '; //Aumentamos el puntero el numero de atributos. \n');
                                DeclararVariableElement(Elementos,HeapPivote);
                            }
                            else
                            {
                                TablaError.push(new Errores('Semántico','El element ' + Lista[i].strTipoValor + ' no existe.',0));
                            }
                        }
                        var temporal = generarTemp(); var Posicion = Lista[i].Posicion;
                        agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
                        agregar3d('Heap[' + temporal + '] = ' + Valor + '; //Asignando valor a ' + strNombreVariable + '\n');
                        Existe = true;
                    }
                }
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }
    return Existe;
}

function RecursivoObtenerValGeneral(ptnId,Dimensiones,Lista,Contador,IsGlobal, TemporalAnterior){
    var Existe = false, Valor = ValorNulo, TipoValor = '';
    
    for(var i = 0; i < Lista.length; i++)
    {
        var strNombreVariable = ptnId.Nodes[Contador].FindTokenAndGetText();
        if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 != Contador))
        {
            var temporal = generarTemp(); var Posicion = Lista[i].Posicion;
            agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
            var temporal2 = generarTemp();
            agregar3d(temporal2 + ' = Heap[' + temporal + ']; //Ingresando a ' + strNombreVariable + '\n');
            
            return RecursivoObtenerValGeneral(ptnId,Dimensiones,Lista[i].ListaObjetos,Contador + 1, IsGlobal,temporal2);
        }
        else if(Lista[i].strNombreSimbolo == strNombreVariable && Lista[i].IsVar && (ptnId.Nodes.length - 1 == Contador))
        {
            var temporal = generarTemp(); var Posicion = Lista[i].Posicion;
            agregar3d(temporal + ' = ' + TemporalAnterior + ' + ' + Posicion + ';\n');
            var temporal2 = generarTemp();
            agregar3d(temporal2 + ' = Heap[' + temporal + ']; //Obteniendo atributo. ' + strNombreVariable + '\n');
            
            Existe = true; Valor = temporal2, TipoValor = Lista[i].strTipoValor;
        }
    }
    return [Existe,Valor,TipoValor];
}

function MapeoLexicografico(Dimensiones,Indices){
    var resultado = '';
    
    for(var i = 0; i < Indices.length; i++){
        var Inferior = Dimensiones[i].Inferior, indice = Indices[i], Superior = Dimensiones[i].Superior;
        
        
        if(i == 0)
        {
            resultado = generarTemp();
            agregar3d(resultado + ' = ' + indice + ' - ' + Inferior + ';\n');
        }
        else
        {
            var resAnterior = TempActual();
            resultado = generarTemp();
            var temporal1 = generarTemp();
            agregar3d(temporal1 + ' = ' + resAnterior + ' * ' + Superior + ';\n');
            var temporal = generarTemp();
            agregar3d(temporal + ' = ' + indice + ' - ' + Inferior + ';\n');
            agregar3d(resultado + ' = ' + temporal1 + ' + ' + temporal + ';\n');
        }
    }
        
    return resultado;
}

class Contenido{
    constructor(strNombreSimbolo,strTipoValor,Referenciable,ValorSimbolo,IsVar,Retorno,ListParametros,IsFuncion,Dimensiones,Elementos,isArray,ListaObjetos,isObjeto,
                Posicion){
        this.strNombreSimbolo = strNombreSimbolo;
        this.strTipoValor = strTipoValor;
        this.Referenciable = Referenciable;
        this.ValorSimbolo = ValorSimbolo;
        this.IsVar = IsVar;
        this.Retorno = Retorno;
        this.ListParametros = ListParametros;
        this.IsFuncion = IsFuncion;
        this.Dimensiones = Dimensiones;
        this.Elementos = Elementos;
        this.isArray = isArray;
        this.ListaObjetos = ListaObjetos;
        this.isObjeto = isObjeto;
        this.Posicion = Posicion;
    }
}

class clsDimension{
    constructor(Inferior,Superior){
        this.Inferior = Inferior;
        this.Superior = Superior;
    }
}




