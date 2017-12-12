class DeclararArreglo{
    constructor(strTipo,Elementos,Dimensiones,strNombre){
        this.strTipo = strTipo;
        this.Elementos = Elementos;
        this.Dimensiones = Dimensiones;
        this.strNombre = strNombre;
    }
    
    GuardarArregloGlobal()
    {
        if(!RecorrerPila(this.strNombre))
        {
            var listElementos = [];
            for(var i = 0; i < this.Elementos; i++) listElementos.push(ValorNulo);
            
            var cont = new Contenido(this.strNombre,this.strTipo,true,this.Elementos,true,null,null,null,this.Dimensiones,listElementos,true,null,false,PunteroH);
            AgregarSimbolo(this.strNombre,this.strTipo,StackSym[StackSym.length - 1].Ambito,'Arreglo global',PunteroH);
            
            PunteroH += this.Elementos;
            StackSym[0].listContenido.push(cont);
            agregar3d('H = H + ' + PunteroH.toString() + ';\n');
        }
        else
        {
            TablaError.push(new Errores('Semántico','El arreglo ' + this.strNombre + ' ya existe.',0));
        }
    }
    
    GuardarArreglo()
    {
        if(!RecorrerPila(this.strNombre))
        {
            var listElementos = [];
            for(var i = 0; i < this.Elementos; i++) listElementos.push(ValorNulo);
            
            var Posicion = ObtenerPosicion(true);
            var cont = new Contenido(this.strNombre,this.strTipo,true,this.Elementos,true,null,null,null,this.Dimensiones,listElementos,true,null,false,Posicion);
            AgregarSimbolo(this.strNombre,this.strTipo,StackSym[StackSym.length - 1].Ambito,'Arreglo',Posicion);
            PunteroH += this.Elementos;
            StackSym[StackSym.length - 1].listContenido.push(cont);
            
            var temporal = generarTemp();
            
            agregar3d(temporal + ' = P + ' + Posicion + ';\n');
            agregar3d('Stack[' + temporal + '] = H; //Se crea el arreglo ' + this.strNombre + '\n')
            agregar3d('H = H + ' + PunteroH.toString() + ';\n');
        }
        else
        {
            TablaError.push(new Errores('Semántico','El arreglo ' + this.strNombre + ' ya existe.',0));
        }
    }
}

class DeclararVariable{
    constructor(strTipo,Valor,strNombreVariable,IsObjeto,TipoValor){
        this.strTipo = strTipo;
        this.Valor = Valor;
        this.strNombreVariable = strNombreVariable;
        this.IsObjeto = IsObjeto;
        this.TipoValor = TipoValor;
    }
    
    GuardarVariableGlobal()
    {
        if(!RecorrerPila(this.strNombreVariable))
        {
            
            if(this.IsObjeto)
            {
                var [Existe,Elementos] = ObtenerElementos(this.strTipo); 
                if(Existe)
                {
                    var cont = new Contenido(this.strNombreVariable,this.strTipo,true,this.Valor,true,null,null,null,null,null,null,Elementos,this.IsObjeto,PunteroH);
                    AgregarSimbolo(this.strNombreVariable,this.strTipo,StackSym[StackSym.length - 1].Ambito,'Variable global',PunteroH);
                    StackSym[0].listContenido.push(cont); var tempo = generarTemp(), HeapPivote = generarTemp();
                    if(this.Valor != ValorNulo && !isNaN(this.Valor))
                    {
                        agregar3d(tempo + ' = H; \n'); agregar3d('H = H + 1;\n'); PunteroH++;
                        agregar3d(HeapPivote + ' = H; \n'); 
                        agregar3d('Heap[' + tempo + '] = ' + HeapPivote + ';\n');
                        agregar3d('H = H + ' + Elementos.length.toString() + '; //Aumentamos el puntero el numero de atributos. \n')
                        PunteroH += Elementos.length;
                        DeclararVariableElement(Elementos,HeapPivote);
                    }
                    else if(this.Valor != ValorNulo && isNaN(this.Valor))
                    {
                        agregar3d(tempo + ' = H; \n'); agregar3d('H = H + 1;\n'); PunteroH++;
                        agregar3d('Heap[' + tempo + '] = ' + this.Valor + ';\n');
                    }
                    else
                    {
                        agregar3d(tempo + ' = H; \n'); agregar3d('H = H + 1;\n'); PunteroH++;
                        agregar3d('Heap[' + tempo + '] = ' + ValorNulo + ';\n');
                    }
                }
                else
                {
                    TablaError.push(new Errores('Semántico','El element ' + this.strTipo + ' no existe.',0));
                }
            }
            else
            {
                var cont = new Contenido(this.strNombreVariable,this.strTipo,true,this.Valor,true,null,null,null,null,null,null,null,this.IsObjeto,PunteroH);
                AgregarSimbolo(this.strNombreVariable,this.strTipo,StackSym[StackSym.length - 1].Ambito,'Variable',PunteroH);
                StackSym[0].listContenido.push(cont);
                
                if(this.strTipo == this.TipoValor || this.Valor == ValorNulo)
                {
                    agregar3d('Heap[' + PunteroH + '] = ' + this.Valor + '; //Se crea la variable global ' + this.strNombreVariable + '\n');
                    agregar3d('H = H + 1;\n');
                    PunteroH++;
                }
                else if(this.strTipo == con_tstr && this.TipoValor == con_tnum)
                {
                    var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                    agregar3d('P = P + ' + CambioAmbito + ';\n');
                    agregar3d(temporal + ' = P + 1;\n');
                    agregar3d('Stack[' + temporal + '] = ' + this.Valor + ';\n');
                    agregar3d('$$_singleNumToStr();\n');
                    agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                    agregar3d('$$_SGB(P,1);\n');
                    agregar3d('P = P - ' + CambioAmbito + ';\n');
                    
                    agregar3d('Heap[' + PunteroH + '] = ' + EtiquetaRetorno + '; //Se crea la variable global ' + this.strNombreVariable + '\n');
                    agregar3d('H = H + 1;\n');
                    PunteroH++;
                }
                else if(this.strTipo == con_tbool && this.TipoValor == con_tnum)
                {
                    var ValorGuardar = generarTemp(); var verdadera = generarEt(), falsa = generarEt(), salida = generarEt();;
                    agregar3d('if(' + this.Valor + ' > 0' + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n');
                    agregar3d(verdadera + ':\n');
                    agregar3d(ValorGuardar + ' = 1;\n');
                    agregar3d('goto ' + salida + ';\n');
                    agregar3d(falsa + ':\n');
                    agregar3d(ValorGuardar + ' = 0;\n');
                    agregar3d(salida + ':\n');
                    
                    agregar3d('Heap[' + PunteroH + '] = ' + ValorGuardar + '; //Se crea la variable global ' + this.strNombreVariable + '\n');
                    agregar3d('H = H + 1;\n');
                    PunteroH++;
                }
                else if(this.strTipo == con_tnum && this.TipoValor == con_tbool)
                {
                    agregar3d('Heap[' + PunteroH + '] = ' + this.Valor + '; //Se crea la variable global ' + this.strNombreVariable + '\n');
                    agregar3d('H = H + 1;\n');
                    PunteroH++;
                }
                else if(this.strTipo == con_tstr && this.TipoValor == con_tbool)
                {
                    var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                    agregar3d('P = P + ' + CambioAmbito + ';\n');
                    agregar3d(temporal + ' = P + 1;\n');
                    agregar3d('Stack[' + temporal + '] = ' + this.Valor + ';\n');
                    agregar3d('$$_boolToStr();\n');
                    agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                    agregar3d('$$_SGB(P,1);\n');
                    agregar3d('P = P - ' + CambioAmbito + ';\n');
                    
                    agregar3d('Heap[' + PunteroH + '] = ' + EtiquetaRetorno + '; //Se crea la variable global ' + this.strNombreVariable + '\n');
                    agregar3d('H = H + 1;\n');
                    PunteroH++;
                }
            }
        }
        else
        {
            TablaError.push(new Errores('Semántico','La variable ' + this.strNombreVariable + ' ya existe.',0));
        }
    }
    
    GuardarVariable()
    {
        if(!RecorrerPila(this.strNombreVariable))
        {
            if(this.IsObjeto)
            {
                var [Existe,Elementos] = ObtenerElementos(this.strTipo);
                if(Existe)
                {
                    var Posicion = ObtenerPosicion(true);
                    var cont = new Contenido(this.strNombreVariable,this.strTipo,true,this.Valor,true,null,null,null,null,null,null,Elementos,this.IsObjeto,Posicion);
                    
                    AgregarSimbolo(this.strNombreVariable,this.strTipo,StackSym[StackSym.length - 1].Ambito,'Variable',Posicion);
                    StackSym[StackSym.length - 1].listContenido.push(cont);
                    var temporal = generarTemp();
                    
                    if(this.Valor != ValorNulo && !isNaN(this.Valor)) 
                    {
                        agregar3d(temporal + ' = P + ' + Posicion + '; //Inicio del cuerpo del element en el Heap. \n')
                        agregar3d('Stack[' + temporal + '] = H; \n')
                        var HeapPivote = generarTemp();
                        agregar3d(HeapPivote + ' = H; \n');
                        agregar3d('H = H + ' + Elementos.length.toString() + '; //Aumentamos el puntero el numero de atributos. \n')

                        DeclararVariableElement(Elementos,HeapPivote);
                    }
                    else if(this.Valor != ValorNulo && isNaN(this.Valor))
                    {
                        agregar3d(temporal + ' = P + ' + Posicion + '; //Inicio del cuerpo del element en el Heap. \n')
                        agregar3d('Stack[' + temporal + '] = ' + this.Valor + '; \n')
                    }
                    else
                    {
                        agregar3d(temporal + ' = P + ' + Posicion + '; //Inicio del cuerpo del element en el Heap. \n')
                        agregar3d('Stack[' + temporal + '] = ' + ValorNulo + '; \n')
                    }
                }
                else
                {
                    TablaError.push(new Errores('Semántico','El element ' + this.strTipo + ' no existe.',0));
                }
            }
            else
            {
                var Posicion = ObtenerPosicion(true);
                var cont = new Contenido(this.strNombreVariable,this.strTipo,true,this.Valor,true,null,null,null,null,null,null,null,this.IsObjeto,Posicion);
                AgregarSimbolo(this.strNombreVariable,this.strTipo,StackSym[StackSym.length - 1].Ambito,'Variable',Posicion);
                StackSym[StackSym.length - 1].listContenido.push(cont);

                if(this.strTipo == con_tstr && this.TipoValor == con_tstr || (this.strTipo == con_tstr && this.Valor == ValorNulo))
                {
                    var temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + Posicion + ';\n');
                    agregar3d('Stack[' + temporal + '] = H; //Puntero del heap donde esta el inicio de la cadena. \n')
                    agregar3d('H = H + 1;\n');
                    var temporal1 = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal1 + ' = P + ' + Posicion + ';\n');
                    agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                    agregar3d('Heap[' + temporal2 + '] = ' + this.Valor + '; //Se crea la variable ' + this.strNombreVariable + '\n');
                }
                else if(this.strTipo == con_tstr && this.TipoValor == con_tnum)
                {
                    var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                    agregar3d('P = P + ' + CambioAmbito + ';\n');
                    agregar3d(temporal + ' = P + 1;\n');
                    agregar3d('Stack[' + temporal + '] = ' + this.Valor + ';\n');
                    agregar3d('$$_singleNumToStr();\n');
                    agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                    agregar3d('$$_SGB(P,1);\n');
                    agregar3d('P = P - ' + CambioAmbito + ';\n');
                    
                    temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + Posicion + ';\n');
                    agregar3d('Stack[' + temporal + '] = H; //Puntero del heap donde esta el inicio de la cadena. \n');
                    agregar3d('H = H + 1;\n');
                    var temporal1 = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal1 + ' = P + ' + Posicion + ';\n');
                    agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                    agregar3d('Heap[' + temporal2 + '] = ' + EtiquetaRetorno + '; //Se crea la variable ' + this.strNombreVariable + '\n');
                }
                else if((this.strTipo == con_tnum && this.TipoValor == con_tnum || (this.strTipo == con_tnum && this.Valor == ValorNulo)) || 
                        (this.strTipo == con_tbool && this.TipoValor == con_tbool || (this.strTipo == con_tbool && this.Valor == ValorNulo))) 
                {
                    var temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + Posicion + ';\n');
                    agregar3d('Stack[' + temporal + '] = ' + this.Valor + '; //Se crea la variable ' + this.strNombreVariable + '\n');
                }
                else if(this.strTipo == con_tbool && this.TipoValor == con_tnum)
                {
                    var ValorGuardar = generarTemp(); var verdadera = generarEt(), falsa = generarEt(), salida = generarEt();;
                    agregar3d('if(' + this.Valor + ' > 0' + ') goto ' + verdadera + ';\ngoto ' + falsa + ';\n');
                    agregar3d(verdadera + ':\n');
                    agregar3d(ValorGuardar + ' = 1;\n');
                    agregar3d('goto ' + salida + ';\n');
                    agregar3d(falsa + ':\n');
                    agregar3d(ValorGuardar + ' = 0;\n');
                    agregar3d(salida + ':\n');
                    
                    var temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + Posicion + ';\n');
                    agregar3d('Stack[' + temporal + '] = ' + ValorGuardar + '; //Se crea la variable ' + this.strNombreVariable + '\n');
                }
                else if(this.strTipo == con_tnum && this.TipoValor == con_tbool)
                {
                    var temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + Posicion + ';\n');
                    agregar3d('Stack[' + temporal + '] = ' + this.Valor + '; //Se crea la variable ' + this.strNombreVariable + '\n');
                }
                else if(this.strTipo == con_tstr && this.TipoValor == con_tbool)
                {
                    var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), EtiquetaRetorno = generarTemp();
                    agregar3d('P = P + ' + CambioAmbito + ';\n');
                    agregar3d(temporal + ' = P + 1;\n');
                    agregar3d('Stack[' + temporal + '] = ' + this.Valor + ';\n');
                    agregar3d('$$_boolToStr();\n');
                    agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
                    agregar3d('$$_SGB(P,1);\n');
                    agregar3d('P = P - ' + CambioAmbito + ';\n');
                    
                    temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + Posicion + ';\n');
                    agregar3d('Stack[' + temporal + '] = H; //Puntero del heap donde esta el inicio de la cadena. \n');
                    agregar3d('H = H + 1;\n');
                    var temporal1 = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal1 + ' = P + ' + Posicion + ';\n');
                    agregar3d(temporal2 + ' = Stack[' + temporal1 + '];\n');
                    agregar3d('Heap[' + temporal2 + '] = ' + EtiquetaRetorno + '; //Se crea la variable ' + this.strNombreVariable + '\n');
                }
            }
        }
        else
        {
            TablaError.push(new Errores('Semántico','La variable ' + this.strNombreVariable + ' ya existe.',0));
        }
    }
}

function DeclararVariableElement(Elementos,HeapPivote)
{
    try
    {
        for(var i = 0; i < Elementos.length; i++)
        {
            if(Elementos[i].ListaObjetos.length == 0)
            {
                var [Valor,TipoValor] = GenerarExpresion(Elementos[i].ValorSimbolo); var temporal = generarTemp();
                agregar3d(temporal + ' = ' + HeapPivote + ' + ' + i.toString() + ';\n');
                agregar3d('Heap[' + temporal + '] = ' + Valor + '; \n');
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }        
}

class AsignarValor{
    constructor(ptnId,Valor,Indices,strTipoValor,IsNuevo){
        this.ptnId = ptnId;
        this.Valor = Valor;
        this.Indices = Indices;
        this.strTipoValor = strTipoValor;
        this.IsNuevo = IsNuevo;
    }
    
    Asignar()
    {
        var Existe = ReasignarValorGeneral(this.ptnId,this.Valor,this.Indices,this.strTipoValor,this.IsNuevo);
        if(!Existe)
        {
            TablaError.push(new Errores('Semántico','La variable a asignar no existe.',this.ptnId.Fila));
        }
    }
    
}

function ReasignarValorGeneral(ptnId,Valor,Dimensiones,strTipoValor,IsNuevo)
{
    var Existe = false;
    
    /*if(StackSym[StackSym.length - 1].Ambito == con_global)
    {
        Existe = StackSym[0].AsignarValorGeneral(ptnId,Valor,Dimensiones,strTipoValor,StackSym[0].listContenido,0,true);
    }
    else
    {*/
    for(var i = StackSym.length - 1; i >= 0; i--)
    {
        if(StackSym[i].Ambito == con_metodo || StackSym[i].Ambito == con_funcion)
        {
            if(StackSym[i].AsignarValorGeneral(ptnId,Valor,Dimensiones,strTipoValor,StackSym[i].listContenido,0,false,IsNuevo))
            {
                Existe = true;
                break;
            }
            Existe = StackSym[0].AsignarValorGeneral(ptnId,Valor,Dimensiones,strTipoValor,StackSym[0].listContenido,0,true,IsNuevo);
            
            break;                
        }
        else
        {
            if(StackSym[i].AsignarValorGeneral(ptnId,Valor,Dimensiones,strTipoValor,StackSym[i].listContenido,0,false,IsNuevo))
            {
                Existe = true;
                break;
            }
        }
        
    }
        
    //}
    
    return Existe;
}

function ObtenerPosicion(Agregar)
{
    var Posicion = 0;
    
    for(var i = StackSym.length - 1; i >= 0; i--)
    {
        if(StackSym[i].Ambito == con_metodo || StackSym[i].Ambito == con_funcion)
        {
            if(Agregar) StackSym[i].tamanio++;
            Posicion = StackSym[i].tamanio;
            break;
        }
    }
    
    return Posicion;
}

function RecorrerPila(strNombreVariable)
{
    var Existe = false;
    
    if(StackSym[StackSym.length - 1].Ambito == con_global)
    {
        Existe = StackSym[StackSym.length - 1].ExisteSimbolo(strNombreVariable);
    }
    else
    {
        for(var i = StackSym.length - 1; i >= 0; i--)
        {
            if(StackSym[i].Ambito == con_metodo || StackSym[i].Ambito == con_funcion)
            {
                if(StackSym[i].ExisteSimbolo(strNombreVariable))
                {
                    Existe = true;
                    break;
                }
                break;
            }
            else
            {
                if(StackSym[i].ExisteSimbolo(strNombreVariable))
                {
                    Existe = true;
                    break;
                }
            }
        }
    }
    
    return Existe;
}

class ObtenerVariable{
    constructor(ptnId,Dimensiones){
        this.ptnId = ptnId;
        this.Dimensiones = Dimensiones;
    }
    
    RetornarValor()
    {
        var [Existe,Valor,TipoValor] = ObtenerValorGeneral(this.ptnId,this.Dimensiones,this.ptnId.Nodes[0].FindTokenAndGetText());
        if(!Existe)
        {
            TablaError.push(new Errores('Semántico','El simbolo ' + this.ptnId.Nodes[0].FindTokenAndGetText() + ' no existe.',this.ptnId.Fila));
        }
        return [Valor,TipoValor];
    }
}

function ObtenerValorGeneral(ptnId,Dimensiones,strNombreVariableInicial){
    var Existe = false, Valor = ValorNulo, TipoValor = '';
    
    
    for(var i = StackSym.length - 1; i >= 0; i--)
    {
        if(StackSym[i].Ambito == con_metodo || StackSym[i].Ambito == con_funcion)
        {
            if(StackSym[i].ExisteSimbolo(strNombreVariableInicial))
            {
                [Existe,Valor,TipoValor] = StackSym[i].ObtenerValGeneral(ptnId,Dimensiones,StackSym[i].listContenido,0,false);
                break;
            }
            
            [Existe,Valor,TipoValor] = StackSym[0].ObtenerValGeneral(ptnId,Dimensiones,StackSym[0].listContenido,0,true);
            break;
        }
        else
        {
            if(StackSym[i].ExisteSimbolo(strNombreVariableInicial))
            {
                [Existe,Valor,TipoValor] = StackSym[i].ObtenerValGeneral(ptnId,Dimensiones,StackSym[i].listContenido,0,false);
                break;
            }
        }
    }
    
    return [Existe,Valor,TipoValor];
}

function ObtenerTamanioArreglo(strNombre,nDimension){
    var Posicion = 0;
    
    for(var i = StackSym.length - 1; i >= 0; i--)
    {
        if(StackSym[StackSym.length - 1].Ambito == con_metodo || StackSym[StackSym.length - 1].Ambito == con_funcion)
        {
            if(StackSym[i].ExisteSimbolo(strNombre))
            {
                Posicion = StackSym[i].ObtenerTamanioDimension(strNombre,nDimension);
                break;
            }
            Posicion = StackSym[0].ObtenerTamanioDimension(strNombre,nDimension);
            break;
        }
        else
        {
            if(StackSym[i].ExisteSimbolo(strNombreVariableInicial))
            {
                Posicion = StackSym[i].ObtenerTamanioDimension(strNombre,nDimension);
                break;
            }
        }
    }
    
    return Posicion;
}

function ObtenerPosicionVariable(strNombre){
    var Posicion = 0, IsGlobal = false;
    
    for(var i = StackSym.length - 1; i >= 0; i--)
    {
        if(StackSym[i].Ambito == con_metodo || StackSym[StackSym.length - 1].Ambito == con_funcion)
        {
            if(StackSym[i].ExisteSimbolo(strNombre))
            {
                [Posicion,IsGlobal] = [StackSym[i].ObtenerPosicion(strNombre),false];
                break;
            }
            [Posicion,IsGlobal] = [StackSym[0].ObtenerPosicion(strNombre),true];
            break;
        }
        else
        {
            if(StackSym[i].ExisteSimbolo(strNombre))
            {
                [Posicion,IsGlobal] = [StackSym[i].ObtenerPosicion(strNombre),false];
                break;
            }
        }
    }
    
    return [Posicion,IsGlobal];
}

function ObtenerElementos(strNombre){
    var Existe = false, Elementos = [], PivoteElementos = null;
    
    var Lista = StackSym[0].listContenido;
    
    for(var i = 0; i < Lista.length; i++)
    {
        if(Lista[i].strNombreSimbolo == strNombre)
        {
            Existe = true;
            PivoteElementos = Lista[i].ListaObjetos;
            break;
        }
    }
    
    for(var i = 0; i < PivoteElementos.length; i++)
    {
        Elementos.push(PivoteElementos[i]);
    }
    
    return [Existe,Elementos];
}





