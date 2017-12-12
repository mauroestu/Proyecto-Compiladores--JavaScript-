document.write('<script src="Compilador/Operaciones/aritmeticas.js" type="text/javascript"></script>');
document.write('<script src="Compilador/Operaciones/relacionales.js" type="text/javascript"></script>');
document.write('<script src="Compilador/Operaciones/logicas.js" type="text/javascript"></script>');
document.write('<script src="Compilador/Recolecciones/Metodos.js" type="text/javascript"></script>');
document.write('<script src="Compilador/Recolecciones/Variables.js" type="text/javascript"></script>');
document.write('<script src="Compilador/Recolecciones/Elements.js" type="text/javascript"></script>');
document.write('<script src="Compilador/objetos.js" type="text/javascript"></script>');


function IniciarCompilacion(arbol){
    try
    {
        var CuerpoTotal = arbol.Nodes[0], MetodoPrincipal = null;

        if(CuerpoTotal.Nodes.length > 0){
            StackSym.push(new Simbolos(con_global,'',null,'','',0,[]));

            for(var i = 0; i < CuerpoTotal.Nodes.length; i++)
            {
                switch(CuerpoTotal.Nodes[i].Token)
                {
                    case con_decelement: RecolectarElement(CuerpoTotal.Nodes[i]);
                        break;
                }
            }


            agregar3d('void init(){\n');
            agregar3d('P = 0;\nH = 0;\nS = 0;\n');
            for(var i = 0; i < CuerpoTotal.Nodes.length; i++)
            {
                switch(CuerpoTotal.Nodes[i].Token)
                {
                    case con_decvar: RecolectarGlobal(CuerpoTotal.Nodes[i]);
                        break;
                    case con_decarreglo: RecolectarArregloGlobal(CuerpoTotal.Nodes[i]);
                        break;
                }
            }
            agregar3d('principal();\n');
            agregar3d('}\n\n');

            //---- Recolectar métodos y funciones.
            for(var i = 0; i < CuerpoTotal.Nodes.length; i++){
                switch(CuerpoTotal.Nodes[i].Token)
                {
                    case con_decprincipal: MetodoPrincipal = CuerpoTotal.Nodes[i];
                        break;
                    case con_decmetodo: RecolectarMetodo(CuerpoTotal.Nodes[i]);
                        break;
                    case con_decfuncion: RecolectarFuncion(CuerpoTotal.Nodes[i]);
                        break;
                }
            }

            //---- Generar 3d para métodos y funciones.
            for(var i = 0; i < StackSym[0].listContenido.length; i++)
            {
                if(StackSym[0].listContenido[i].IsFuncion)
                {
                    GenerarMetodo3d(StackSym[0].listContenido[i]);
                }
            }


            if(MetodoPrincipal == null){

            }
            else{
                var EtqRetorno = generarEt();
                agregar3d('void principal(){\n')
                StackSym.push(new Simbolos(con_metodo,'',MetodoPrincipal,'',EtqRetorno,0,[]));
                EjecutarInstrucciones(MetodoPrincipal.Nodes[0]);
                agregar3d(EtqRetorno+': //Retorno del método principal.');
                StackSym.pop();
                agregar3d('\n}\n\n');
            }
            StackSym.pop();
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

function RecolectarArregloGlobal(raiz){
    try
    {
        var strTipo = raiz.Nodes[2].Nodes[0].FindTokenAndGetText(), strId = raiz.Nodes[0].FindTokenAndGetText(), Dimensiones = raiz.Nodes[1];
        
        var ListaDimensiones = [], nElementos = 1;
        for(var i = 0; i < Dimensiones.Nodes.length; i++)
        {
            var ptnCuerpo = Dimensiones.Nodes[i];
            switch(ptnCuerpo.Nodes.length)
            {
                case 1:
                    {
                        var [Valor,TipoValor] = GenerarExpresion(ptnCuerpo.Nodes[0]);
                        if(TipoValor == con_tnum)
                        {
                            ListaDimensiones.push(new clsDimension(0,Valor));
                            nElementos *= Number(Valor);
                        }
                        else
                        {
                            TablaError.push(new Errores('Semántico','Las dimensiones debe de ser numéricas',raiz.Fila));
                            ListaDimensiones.push(new clsDimension(0,1));
                        }
                    }
                    break;
                case 2:
                    {
                        var [Valor,TipoValor] = GenerarExpresion(ptnCuerpo.Nodes[0]);
                        var [Valor2,TipoValor2] = GenerarExpresion(ptnCuerpo.Nodes[1]);
                        if(TipoValor == con_tnum && TipoValor2 == con_tnum && (Number(Valor) <= Number(Valor2)))
                        {
                            ListaDimensiones.push(new clsDimension(Valor,Valor2));
                            nElementos *= Number(Valor2 - Valor);
                        }
                        else
                        {
                            TablaError.push(new Errores('Semántico','Las dimensiones debe de ser numéricas, y el indice inferior debe se menor al superior.',raiz.Fila));
                            ListaDimensiones.push(new clsDimension(0,1));
                        }
                    }
                    break;
            }
        }
        
        new DeclararArreglo(strTipo,nElementos,ListaDimensiones,strId).GuardarArregloGlobal();
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function RecolectarElement(raiz){
    try
    {
        var ptnNombreElement = raiz.Nodes[0], ptnCuerpoElement = raiz.Nodes[1];
        var strNombreElement = ptnNombreElement.FindTokenAndGetText();
        
        new DeclararElement(strNombreElement,ptnCuerpoElement).GuardarElement();
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function RecolectarFuncion(raiz){
    try
    {
        var strTipoMetodo = raiz.Nodes[0].Nodes[0].FindTokenAndGetText(), strNombreMetodo = raiz.Nodes[2].FindTokenAndGetText();
        var ptnListaParametros = raiz.Nodes[3], ptnCuerpoMetodo = raiz.Nodes[4];
        var ListaParametros = [];
        
        for(var i = 0; i < ptnListaParametros.Nodes.length; i++){
            var Parametro = ptnListaParametros.Nodes[i];
            var strTipoValor = Parametro.Nodes[0].Nodes[0].FindTokenAndGetText();
            var strNombreParametro = Parametro.Nodes[1].FindTokenAndGetText();
            var cont = null;
            var ListaDimensiones = [], nElementos = 1;
            if(Parametro.Nodes[2].Nodes.length > 0)
            {
                var Dimensiones = Parametro.Nodes[2];
                for(var j = 0; j < Dimensiones.Nodes.length; j++)
                {
                    var ptnCuerpo = Dimensiones.Nodes[j];
                    switch(ptnCuerpo.Nodes.length)
                    {
                        case 1:
                            {
                                var [Valor,TipoValor] = GenerarExpresion(ptnCuerpo.Nodes[0]);
                                if(TipoValor == con_tnum)
                                {
                                    ListaDimensiones.push(new clsDimension(0,Valor));
                                    nElementos *= Number(Valor);
                                }
                                else
                                {
                                    TablaError.push(new Errores('Semántico','Las dimensiones debe de ser numéricas',raiz.Fila));
                                    ListaDimensiones.push(new clsDimension(0,1));
                                }
                            }
                            break;
                        case 2:
                            {
                                var [Valor,TipoValor] = GenerarExpresion(ptnCuerpo.Nodes[0]);
                                var [Valor2,TipoValor2] = GenerarExpresion(ptnCuerpo.Nodes[1]);
                                if(TipoValor == con_tnum && TipoValor2 == con_tnum && (Number(Valor) <= Number(Valor2)))
                                {
                                    ListaDimensiones.push(new clsDimension(Valor,Valor2));
                                    nElementos *= Number(Valor2 - Valor);
                                }
                                else
                                {
                                    TablaError.push(new Errores('Semántico','Las dimensiones debe de ser numéricas, y el indice inferior debe se menor al superior.',raiz.Fila));
                                    ListaDimensiones.push(new clsDimension(0,1));
                                }
                            }
                            break;
                    }
                }
                var listElementos = [];
                for(var j = 0; j < nElementos; j++) listElementos.push(ValorNulo);
                cont = new Contenido(strNombreParametro,strTipoValor,true,nElementos,true,null,null,null,ListaDimensiones,listElementos,true,null,false,null);
            }
            else
            {
                if(strTipoValor.toLowerCase() == 'str'){
                    var Referenciable = false;
                    if(Parametro.Nodes[0].Nodes[1].Nodes.length > 0) Referenciable = true;

                    cont = new Contenido(strNombreParametro,strTipoValor,Referenciable,null,true,null,null,null,null,null,null,null,false,null);
                }
                else if(ptnListaParametros.Nodes[i].Nodes[0].Nodes[0].FindTokenAndGetInfo() == con_element){
                    var [Existe,Elementos] = ObtenerElementos(strTipoValor);
                    cont = new Contenido(strNombreParametro,strTipoValor,true,null,true,null,null,null,null,null,null,Elementos,true,null);
                }
                else{
                    cont = new Contenido(strNombreParametro,strTipoValor,false,null,true,null,null,null,null,null,null,null,false,null);
                }
            }
            ListaParametros.push(cont);
        }
        
        var AsignacionMetodo = new AsignarMetodo(strTipoMetodo,strNombreMetodo,ListaParametros,ptnCuerpoMetodo);
        AsignacionMetodo.GuardarMetodo();
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function RecolectarMetodo(raiz){
    try
    {
        var strTipoMetodo = con_void, strNombreMetodo = raiz.Nodes[0].FindTokenAndGetText();
        var ptnListaParametros = raiz.Nodes[1], ptnCuerpoMetodo = raiz.Nodes[2];
        var ListaParametros = [];
        
        for(var i = 0; i < ptnListaParametros.Nodes.length; i++){
            var Parametro = ptnListaParametros.Nodes[i];
            var strTipoValor = Parametro.Nodes[0].Nodes[0].FindTokenAndGetText();
            var strNombreParametro = Parametro.Nodes[1].FindTokenAndGetText();
            var cont = null;
            var ListaDimensiones = [], nElementos = 1;
            if(Parametro.Nodes[2].Nodes.length > 0)
            {
                var Dimensiones = Parametro.Nodes[2];
                for(var j = 0; j < Dimensiones.Nodes.length; j++)
                {
                    var ptnCuerpo = Dimensiones.Nodes[j];
                    
                    switch(ptnCuerpo.Nodes.length)
                    {
                        case 1:
                            {
                                var [Valor,TipoValor] = GenerarExpresion(ptnCuerpo.Nodes[0]); 
                                
                                if(TipoValor == con_tnum)
                                {
                                    ListaDimensiones.push(new clsDimension(0,Valor));
                                    nElementos *= Number(Valor);
                                }
                                else
                                {
                                    TablaError.push(new Errores('Semántico','Las dimensiones debe de ser numéricas',raiz.Fila));
                                    ListaDimensiones.push(new clsDimension(0,1));
                                }
                            }
                            break;
                        case 2:
                            {
                                var [Valor,TipoValor] = GenerarExpresion(ptnCuerpo.Nodes[0]);
                                var [Valor2,TipoValor2] = GenerarExpresion(ptnCuerpo.Nodes[1]);
                                if(TipoValor == con_tnum && TipoValor2 == con_tnum && (Number(Valor) <= Number(Valor2)))
                                {
                                    ListaDimensiones.push(new clsDimension(Valor,Valor2));
                                    nElementos *= Number(Valor2 - Valor);
                                }
                                else
                                {
                                    TablaError.push(new Errores('Semántico','Las dimensiones debe de ser numéricas, y el indice inferior debe se menor al superior.',raiz.Fila));
                                    ListaDimensiones.push(new clsDimension(0,1));
                                }
                            }
                            break;
                    }
                }
                var listElementos = [];
                for(var j = 0; j < nElementos; j++) listElementos.push(ValorNulo);
                cont = new Contenido(strNombreParametro,strTipoValor,true,nElementos,true,null,null,null,ListaDimensiones,listElementos,true,null,false,null);
            }
            else
            {
                if(strTipoValor.toLowerCase() == 'str'){
                    var Referenciable = false;
                    if(Parametro.Nodes[0].Nodes[1].Nodes.length > 0) Referenciable = true;

                    cont = new Contenido(strNombreParametro,strTipoValor,Referenciable,null,true,null,null,null,null,null,null,null,false,null);
                }
                else if(ptnListaParametros.Nodes[i].Nodes[0].Nodes[0].FindTokenAndGetInfo() == con_element.toLowerCase()){
                    var [Existe,Elementos] = ObtenerElementos(strTipoValor);
                    cont = new Contenido(strNombreParametro,strTipoValor,true,null,true,null,null,null,null,null,null,Elementos,true,null);
                }
                else{
                    cont = new Contenido(strNombreParametro,strTipoValor,false,null,true,null,null,null,null,null,null,null,false,null);
                }
            }
            ListaParametros.push(cont);
        }
        
        var AsignacionMetodo = new AsignarMetodo(strTipoMetodo,strNombreMetodo,ListaParametros,ptnCuerpoMetodo);
        AsignacionMetodo.GuardarMetodo();
        
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function RecolectarGlobal(raiz){
    try
    {
        var ptnTipo = raiz.Nodes[0], ptnListaId = raiz.Nodes[1], ptnValorAsignado = raiz.Nodes[2];
        var strTipoVar = ptnTipo.Nodes[0].FindTokenAndGetText(); var IsObject = false; var CrearVariables = true;
        
        if(ptnTipo.Nodes[0].FindTokenAndGetInfo() == con_element) IsObject = true;
        
        var ValorAsignar = 0,TipoValor = '';
        if(ptnValorAsignado.Nodes.length == 0) 
        {
            ValorAsignar = ValorNulo;
        }
        else {
            if(ptnValorAsignado.Nodes[0].Token == 'CUERPO')
            {
                [ValorAsignar,TipoValor] = GenerarExpresion(ptnValorAsignado.Nodes[0].Nodes[0]);
                if(strTipoVar == con_tnum && TipoValor == con_tstr ||
                  strTipoVar == con_tbool && TipoValor == con_tstr)
                {
                    TablaError.push(new Errores('Semántico','No se puede inicializar una variable tipo num o bool con cadena.',raiz.Fila));
                    ValorAsignar = ValorNulo;
                }
            }
            else
            {
                var ptnElement = ptnValorAsignado.Nodes[0]; var strNombreElement = ptnElement.Nodes[0].FindTokenAndGetText();
                if(strTipoVar.toLowerCase() != strNombreElement.toLowerCase())
                {
                    CrearVariables = false;
                    TablaError.push(new Errores('Semántico','El element a declarar debe de ser igual al tipo de variable.',raiz.Fila));
                }
            }
        }
        if(CrearVariables)
        {
            for(var i = 0; i < ptnListaId.Nodes.length; i++)
            {
                var strNombreVariable = ptnListaId.Nodes[i].FindTokenAndGetText();
                new DeclararVariable(strTipoVar,ValorAsignar,strNombreVariable,IsObject,TipoValor).GuardarVariableGlobal();
            }
        }
        
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function EjecutarInstrucciones(raiz){
    if(raiz.Nodes.length > 0){
        for(var i = 0; i < raiz.Nodes.length; i++){
            switch(raiz.Nodes[i].Token){
                case con_decif: if_else(raiz.Nodes[i]);
                    break;
                case con_decswitch: control_switch(raiz.Nodes[i]);
                    break;
                case con_decwhile: ciclo_while(raiz.Nodes[i]);
                    break;
                case con_decdowhile: do_while(raiz.Nodes[i]);
                    break;
                case con_decrepeat: repeat_until(raiz.Nodes[i]);
                    break;
                case con_decloop: ciclo_loop(raiz.Nodes[i]);
                    break;
                case con_deccount: ciclo_count(raiz.Nodes[i]);
                    break;
                case con_decwhilex: do_whilex(raiz.Nodes[i]);
                    break;
                case con_decbreak: break_control(raiz.Nodes[i]);
                    break;
                case con_deccontinue: continue_control(raiz.Nodes[i]);
                    break;
                case con_decreturn: return_control(raiz.Nodes[i]);
                    break;
                case con_decvar: RecolectarVariable(raiz.Nodes[i]);
                    break;
                case con_asignacion: Asignacion(raiz.Nodes[i]);
                    break;
                case con_mllamada: llamada_metodo(raiz.Nodes[i]);
                    break;
                case con_decshow: llamada_show(raiz.Nodes[i]);
                    break;
                case con_decarreglo: RecolectarArreglo(raiz.Nodes[i]);
                    break;
                case con_outstr: llamada_outstr(raiz.Nodes[i]);
                    break;
                case con_outnum: llamada_outnum(raiz.Nodes[i]);
                    break;
                case con_instr: llamada_inStr(raiz.Nodes[i]);
                    break;
                case con_throw: llamada_throw(raiz.Nodes[i]);
                    break;
                case con_decfor: ciclo_for(raiz.Nodes[i]);
                    break;
            }
        }
    }
}

function ciclo_for(raiz){
    try
    {
        var ptnDeclaracion = raiz.Nodes[0], ptnCondicion = raiz.Nodes[1], ptnAsignacion = raiz.Nodes[2], ptnCuerpoInstruccion = raiz.Nodes[3];
        
        var EtiquetaInicio = generarEt(), EtiquetaFin = generarEt();
        
        StackSym.push(new Simbolos(con_ciclo,'',ptnCuerpoInstruccion,EtiquetaInicio,EtiquetaFin,0,[]));
        
        var Posicionamiento = 0, EsGlobal = false;
        if(ptnDeclaracion.Nodes.length == 3)
        {
            var strTipo = ptnDeclaracion.Nodes[0].Nodes[0].FindTokenAndGetText(), strNombreVariable = ptnDeclaracion.Nodes[1].FindTokenAndGetText();
            var [Valor,TipoValor] = GenerarExpresion(ptnDeclaracion.Nodes[2]);
            
            var Posicion = ObtenerPosicion(true);
            var cont = new Contenido(strNombreVariable,strTipo,true,Valor,true,null,null,null,null,null,null,null,false,Posicion);
            AgregarSimbolo(strNombreVariable,strTipo,StackSym[StackSym.length - 1].Ambito,'Variable de for',Posicion);
            StackSym[StackSym.length - 1].listContenido.push(cont);
            var temporal = generarTemp();
            agregar3d(temporal + ' = P + ' + Posicion + ';\n');
            agregar3d('Stack[' + temporal + '] = ' + Valor + '; //Se crea la variable ' + strNombreVariable + '\n');
            Posicionamiento = Posicion;
        }
        else
        {
            var strNombreVariable = ptnDeclaracion.Nodes[0].FindTokenAndGetText();
            var [Posicion,IsGlobal] = ObtenerPosicionVariable(strNombreVariable);
            var [Valor,TipoValor] = GenerarExpresion(ptnDeclaracion.Nodes[1]);
            
            var temporal = generarTemp();
            agregar3d(temporal + ' = P + ' + Posicion + ';\n');
            agregar3d('Stack[' + temporal + '] = ' + Valor + '; //Se asigna valor a la variable ' + strNombreVariable + '\n');
            
            Posicionamiento = Posicion; 
            EsGlobal = IsGlobal;
        }
        
        agregar3d(EtiquetaInicio + ':\n');
        var Condicion = GenerarCondicion(ptnCondicion);
        
        if(Condicion.verdadera != '' && Condicion.falsa != '')
        {
            agregar3d(Condicion.verdadera + '\n');
            EjecutarInstrucciones(ptnCuerpoInstruccion);
            
            var strId = ptnAsignacion.Nodes[0].FindTokenAndGetText();
            var TipoAsignacion = ptnAsignacion.Nodes[1];
            switch(TipoAsignacion.Token)
            {
                case 'NORMAL':
                    {
                        var [Valor,TipoValor] = GenerarExpresion(TipoAsignacion.Nodes[0]);
                        var temporal = generarTemp();
                        agregar3d(temporal + ' = P + ' + Posicionamiento + ';\n');
                        agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
                    }
                    break;
                case 'AUMENTO':
                    {
                        var temporal = generarTemp();
                        agregar3d(temporal + ' = P + ' + Posicionamiento + ';\n');
                        var temporal1 = generarTemp();
                        agregar3d(temporal1 + ' = Stack[' + temporal + '];\n');
                        agregar3d(temporal1 + ' = ' + temporal1 + ' + 1;\n');
                        agregar3d('Stack[' + temporal + '] = ' + temporal1 + ';\n');
                    }
                    break;
                case 'DISMINUCION':
                    {
                        var temporal = generarTemp();
                        agregar3d(temporal + ' = P + ' + Posicionamiento + ';\n');
                        var temporal1 = generarTemp();
                        agregar3d(temporal1 + ' = Stack[' + temporal + '];\n');
                        agregar3d(temporal1 + ' = ' + temporal1 + ' - 1;\n');
                        agregar3d('Stack[' + temporal + '] = ' + temporal1 + ';\n');
                    }
                    break;
            }
            
            agregar3d('goto ' + EtiquetaInicio + ';\n');
            agregar3d(Condicion.falsa + '\n');
            agregar3d(EtiquetaFin + ':\n');
        }
        else
        {
            TablaError.push(new Errores('Semántico','La condición del for debe ser booleana.',raiz.Fila));
        }        
        
        StackSym.pop();
        
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function llamada_throw(raiz){
    try
    {
        var ptnExcepcion = raiz.Nodes[0]; var strNombre = ptnExcepcion.Nodes[0].FindTokenAndGetText();
        switch(strNombre)
        {
            case ex_null: agregar3d('exit(102);\n');
                break;
            case ex_missing: agregar3d('exit(243);\n');
                break;
            case ex_aritmetic: agregar3d('exit(396);\n');
                break;
            case ex_stack: agregar3d('exit(624);\n');
                break;
            case ex_heap: agregar3d('exit(789);\n');
                break;
            case ex_pool: agregar3d('exit(801);\n');
                break;
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function llamada_inNum(mensaje,numero){
    var EtiquetaRetorno = generarTemp();
    
    try
    {
        var [Mensaje,TipoMensaje] = GenerarExpresion(mensaje);
        var [Defecto,TipoDefecto] = GenerarExpresion(numero);
        
        if(TipoMensaje == con_tstr && (TipoDefecto == con_tnum || TipoDefecto == con_tbool))
        {
            var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
            agregar3d('P = P + ' + CambioAmbito + ';\n');
            agregar3d(temporal + ' = P + 1;\n');
            agregar3d('Stack[' + temporal + '] = ' + Mensaje + ';\n');
            temporal = generarTemp();
            agregar3d(temporal + ' = P + 2;\n');
            agregar3d('Stack[' + temporal + '] = ' + Defecto + ';\n');
            agregar3d('$$_inNum();\n');
            agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor Retorno.\n');
            agregar3d('$$_SGB(P,2);\n');
            agregar3d('P = P - ' + CambioAmbito + ';\n');
        }
        else
        {
            TablaError.push(new Errores('Semántico','Los parámetros de la Función inNum deben ser str y num respectivamente.',raiz.Fila));
            agregar3d(EtiquetaRetorno + ' = 0; //Error en inNum. \n')
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return EtiquetaRetorno;
}

function llamada_inStr(raiz){
    try
    {
        var [Mensaje,TipoValor] = GenerarExpresion(raiz.Nodes[1]);
        var [Variable,IsGlobal] = ObtenerPosicionVariable(raiz.Nodes[0].FindTokenAndGetText());
        
        var PosicionHeap = generarTemp(), PosicionVariable = generarTemp();
        
        if(!IsGlobal)
        {
            agregar3d(PosicionVariable + ' = P + ' + Variable + ';\n');
            agregar3d(PosicionHeap + ' = Stack[' + PosicionVariable + '];\n');
        }
        else
        {
            agregar3d(PosicionHeap + ' = ' + Variable + ';\n')
        }
        
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        agregar3d('P = P + ' + CambioAmbito + ';\n');
        agregar3d(temporal + ' = P + 1;\n');
        agregar3d('Stack[' + temporal + '] = ' + PosicionHeap + ';\n');
        temporal = generarTemp();
        agregar3d(temporal + ' = P + 2;\n');
        agregar3d('Stack[' + temporal + '] = ' + Mensaje + ';\n');
        agregar3d('$$_inStr();\n');
        agregar3d('$$_SGB(P,2);\n');
        agregar3d('P = P - ' + CambioAmbito + ';\n');
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function llamada_lengthArreglo(raiz){
    var EtiquetaRetorno = generarTemp();
    
    try
    {
        var strId = raiz.Nodes[0].FindTokenAndGetText();
        var [Valor,TipoValor] = GenerarExpresion(raiz.Nodes[1]);
        if(TipoValor == con_tnum || TipoValor == con_tbool)
        {
            var TamanioDimension = ObtenerTamanioArreglo(strId,Valor);
            var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
            agregar3d('P = P + ' + CambioAmbito + ';\n');
            agregar3d(temporal + ' = P + 1;\n');
            agregar3d('Stack[' + temporal + '] = ' + TamanioDimension + ';\n');
            temporal = generarTemp();
            agregar3d(temporal + ' = P + 2;\n');
            agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
            agregar3d('$$_getArrLength();\n');
            agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
            agregar3d('$$_SGB(P,2);\n');
            agregar3d('P = P - ' + CambioAmbito + ';\n');
        }
        else
        {
            agregar3d(EtiquetaRetorno + ' = 0;\n');
            TablaError.push(new Errores('Semántico','Los parámetros de la Función getLength para arreglos deben ser id, num respectivamente.',raiz.Fila));
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return EtiquetaRetorno;
}

function llamada_lengthCadena(raiz){
    var EtiquetaRetorno = generarTemp();
    
    try
    {
        var [Valor, TipoValor] = GenerarExpresion(raiz);
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        agregar3d('P = P + ' + CambioAmbito + ';\n');
        agregar3d(temporal + ' = P + 1;\n');
        agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
        agregar3d('$$_getStrLength();\n');
        agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
        agregar3d('$$_SGB(P,1);\n');
        agregar3d('P = P - ' + CambioAmbito + ';\n');
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return EtiquetaRetorno;
}

function llamada_show(raiz){
    try
    {
        var [Valor, TipoValor] = GenerarExpresion(raiz.Nodes[0]);
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        agregar3d('P = P + ' + CambioAmbito + ';\n');
        agregar3d(temporal + ' = P + 1;\n');
        agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
        agregar3d('$$_show();\n');
        agregar3d('$$_SGB(P,1);\n');
        agregar3d('P = P - ' + CambioAmbito + ';\n');
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function llamada_random(){
    var EtiquetaRetorno = generarTemp();
    
    try
    {
        var CambioAmbito = ObtenerPosicion(false) + 1;
        agregar3d('P = P + ' + CambioAmbito + ';\n');
        agregar3d('$$_getRandom();\n');
        agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
        agregar3d('$$_SGB(P,2);\n');        
        agregar3d('P = P - ' + CambioAmbito + ';\n');
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return EtiquetaRetorno;
}

function llamada_outnum(raiz){
    try
    {
        var [Valor, TipoValor] = GenerarExpresion(raiz.Nodes[0]);
        var [Entero, TipoEntero] = GenerarExpresion(raiz.Nodes[1]);
        
        if(TipoValor == con_tnum && TipoEntero == con_tbool)
        {
            var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
            agregar3d('P = P + ' + CambioAmbito + ';\n');
            agregar3d(temporal + ' = P + 1;\n');
            agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
            temporal = generarTemp();
            agregar3d(temporal + ' = P + 2;\n');
            agregar3d('Stack[' + temporal + '] = ' + Entero + ';\n');
            agregar3d('$$_outNum();\n');
            agregar3d('$$_SGB(P,2);\n');
            agregar3d('P = P - ' + CambioAmbito + ';\n');
        }
        else
        {
            TablaError.push(new Errores('Semántico','Los parámetros de la Función outNum deben ser num y bool respectivamente.',raiz.Fila));
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function llamada_outstr(raiz){
    try
    {
        var [Valor, TipoValor] = GenerarExpresion(raiz.Nodes[0]);
        var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
        agregar3d('P = P + ' + CambioAmbito + ';\n');
        agregar3d(temporal + ' = P + 1;\n');
        agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
        agregar3d('$$_outStr();\n');
        agregar3d('$$_SGB(P,1);\n');
        agregar3d('P = P - ' + CambioAmbito + ';\n');
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function llamada_getnum(base,expresion,defecto){
    var EtiquetaRetorno = generarTemp();
    
    try
    {
        var [Base,TipoBase] = GenerarExpresion(base);
        var [Cadena,TipoCadena] = GenerarExpresion(expresion);
        var [Defecto,TipoDefecto] = GenerarExpresion(defecto);
        
        if(TipoBase == con_tstr && TipoCadena == con_tstr && (TipoDefecto == con_tnum || TipoDefecto == con_tbool))
        {
            var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
            agregar3d('P = P + ' + CambioAmbito + ';\n');
            agregar3d(temporal + ' = P + 1;\n');
            agregar3d('Stack[' + temporal + '] = ' + Base + ';\n');
            temporal = generarTemp();
            agregar3d(temporal + ' = P + 2;\n');
            agregar3d('Stack[' + temporal + '] = ' + Cadena + ';\n');
            temporal = generarTemp();
            agregar3d(temporal + ' = P + 3;\n');
            agregar3d('Stack[' + temporal + '] = ' + Defecto + ';\n');
            agregar3d('$$_getNum();\n');
            agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
            agregar3d('$$_SGB(P,3);\n');
            agregar3d('P = P - ' + CambioAmbito + ';\n');
        }
        else
        {
            agregar3d(EtiquetaRetorno + ' = 0;\n');
            TablaError.push(new Errores('Semántico','Los parámetros de la Función getNum deben ser str,str y num respectivamente.',raiz.Fila));
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return EtiquetaRetorno;
}

function llamada_getbool(raiz){
    var EtiquetaRetorno = generarTemp();
    
    try
    {
        var [Valor,TipoValor] = GenerarExpresion(raiz);
        if(TipoValor == con_tstr)
        {
            var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
            agregar3d('P = P + ' + CambioAmbito + ';\n');
            agregar3d(temporal + ' = P + 1;\n');
            agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
            agregar3d('$$_getBool();\n');
            agregar3d(EtiquetaRetorno + ' = Stack[P]; //Valor retorno. \n');
            agregar3d('$$_SGB(P,1);\n');
            agregar3d('P = P - ' + CambioAmbito + ';\n');            
        }
        else
        {
            agregar3d(EtiquetaRetorno + ' = 0;\n');
            TablaError.push(new Errores('Semántico','Los parámetros de la Función getBool deben ser str respectivamente.',raiz.Fila));
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return EtiquetaRetorno;
}

function RecolectarArreglo(raiz){
    try
    {
        var strTipo = raiz.Nodes[2].Nodes[0].FindTokenAndGetText(), strId = raiz.Nodes[0].FindTokenAndGetText(), Dimensiones = raiz.Nodes[1];
        
        var ListaDimensiones = [], nElementos = 1;
        for(var i = 0; i < Dimensiones.Nodes.length; i++)
        {
            var ptnCuerpo = Dimensiones.Nodes[i];
            switch(ptnCuerpo.Nodes.length)
            {
                case 1:
                    {
                        var [Valor,TipoValor] = GenerarExpresion(ptnCuerpo.Nodes[0]);
                        if(TipoValor == con_tnum)
                        {
                            ListaDimensiones.push(new clsDimension(0,Valor));
                            nElementos *= Number(Valor);
                        }
                        else
                        {
                            TablaError.push(new Errores('Semántico','Las dimensiones debe de ser numéricas',raiz.Fila));
                            ListaDimensiones.push(new clsDimension(0,1));
                        }
                    }
                    break;
                case 2:
                    {
                        var [Valor,TipoValor] = GenerarExpresion(ptnCuerpo.Nodes[0]);
                        var [Valor2,TipoValor2] = GenerarExpresion(ptnCuerpo.Nodes[1]);
                        if(TipoValor == con_tnum && TipoValor2 == con_tnum && (Number(Valor) <= Number(Valor2)))
                        {
                            ListaDimensiones.push(new clsDimension(Valor,Valor2));
                            nElementos *= Number(Valor2 - Valor);
                        }
                        else
                        {
                            TablaError.push(new Errores('Semántico','Las dimensiones debe de ser numéricas, y el indice inferior debe se menor al superior.',raiz.Fila));
                            ListaDimensiones.push(new clsDimension(0,1));
                        }
                    }
                    break;
            }
        }
        
        new DeclararArreglo(strTipo,nElementos,ListaDimensiones,strId).GuardarArreglo();
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function llamada_metodo(raiz){
    try
    {
        var ptnId = raiz.Nodes[0], ptnParametros = raiz.Nodes[0].Nodes[1];
        var ListaParametros = [], strNombreMetodo = ptnId.Nodes[0].FindTokenAndGetText();
        
        for(var i = 0; i < ptnParametros.Nodes.length; i++){
            var [Valor,TipoValor] = GenerarExpresion(ptnParametros.Nodes[i]);
            ListaParametros.push([Valor,TipoValor]);
        }
        
        new ObtenerMetodo(strNombreMetodo,ListaParametros,'void').InvocarMetodo();
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function Asignacion(raiz){
    try
    {
        var ptnId = raiz.Nodes[0], ptnDimension = raiz.Nodes[1], ptnValorAsignar = raiz.Nodes[2], IsNuevo = false;
        if(ptnDimension.Nodes.length == 0)
        {
            var ValorAsignar = ValorNulo,TipoValor = '';
            if(ptnValorAsignar.Token == 'CUERPO')
            {
                [ValorAsignar,TipoValor] = GenerarExpresion(ptnValorAsignar.Nodes[0]);
            }
            else
            {
                var strNombreElement = ptnValorAsignar.Nodes[0].FindTokenAndGetText();
                TipoValor = strNombreElement; IsNuevo = true;
            }
            
            new AsignarValor(ptnId,ValorAsignar,ptnDimension,TipoValor,IsNuevo).Asignar();
        }
        else
        {
            //Mandar lista de dimensiones, no el nodo.
            var ListaIndices = [];
            for(var i = 0; i < ptnDimension.Nodes.length; i++)
            {
                var [Valor,TipoValor] = GenerarExpresion(ptnDimension.Nodes[i]);
                if(TipoValor == con_tnum){
                    ListaIndices.push(Valor);
                }
            }
            
            var [ValorAsignar,TipoValor] = GenerarExpresion(ptnValorAsignar.Nodes[0]);
            new AsignarValor(ptnId,ValorAsignar,ListaIndices,TipoValor,IsNuevo).Asignar();
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function RecolectarVariable(raiz){
    try
    {
        var ptnTipo = raiz.Nodes[0], ptnListaId = raiz.Nodes[1], ptnValorAsignado = raiz.Nodes[2];
        var strTipoVar = ptnTipo.Nodes[0].FindTokenAndGetText(); var IsObject = false; var CrearVariables = true;
        
        if(ptnTipo.Nodes[0].FindTokenAndGetInfo() == con_element) IsObject = true;
        
        var ValorAsignar = 0, TipoValor = '';
        if(ptnValorAsignado.Nodes.length == 0) 
        {
            ValorAsignar = ValorNulo;
        }
        else {
            if(ptnValorAsignado.Nodes[0].Token == 'CUERPO')
            {
                [ValorAsignar,TipoValor] = GenerarExpresion(ptnValorAsignado.Nodes[0].Nodes[0]);
                if(strTipoVar == con_tnum && TipoValor == con_tstr ||
                  strTipoVar == con_tbool && TipoValor == con_tstr)
                {
                    TablaError.push(new Errores('Semántico','No se puede inicializar una variable tipo num o bool con cadena.',raiz.Fila));
                    ValorAsignar = ValorNulo;
                }
            }
            else
            {
                var ptnElement = ptnValorAsignado.Nodes[0]; var strNombreElement = ptnElement.Nodes[0].FindTokenAndGetText();
                if(strTipoVar.toLowerCase() != strNombreElement.toLowerCase())
                {
                    CrearVariables = false;
                    TablaError.push(new Errores('Semántico','El element a declarar debe de ser igual al tipo de variable.',raiz.Fila));
                }
            }
        }
        if(CrearVariables)
        {
            for(var i = 0; i < ptnListaId.Nodes.length; i++)
            {
                var strNombreVariable = ptnListaId.Nodes[i].FindTokenAndGetText();
                new DeclararVariable(strTipoVar,ValorAsignar,strNombreVariable,IsObject,TipoValor).GuardarVariable();
            }
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function return_control(raiz){
    try
    {
        var Existe = false, cuerpoReturn = raiz.Nodes[0];
        
        if(cuerpoReturn.Nodes.length == 0)
        {
            for(var i = StackSym.length - 1; i >= 0; i--)
            {
                if(StackSym[i].Ambito == con_metodo)
                {
                    agregar3d('goto ' + StackSym[i].EtqFinal + '; //Salida del método. \n'); Existe = true;
                    break;
                }
                else if(StackSym[i].Ambito == con_funcion)
                {
                    agregar3d('goto ' + StackSym[i].EtqFinal + '; //Salida de la función. \n'); Existe = true;
                    TablaError.push(new Errores('Semántico','Las funciones deben retornar una Exprsión.',raiz.Fila));
                    break;
                }
            }
        }
        else
        {
            for(var i = StackSym.length - 1; i >= 0; i--)
            {
                if(StackSym[i].Ambito == con_metodo)
                {
                    agregar3d('goto ' + StackSym[i].EtqFinal + '; //Salida del método. \n'); Existe = true;
                    TablaError.push(new Errores('Semántico','Los métodos no pueden retornar una expresión.',raiz.Fila));
                    break;
                }
                else if(StackSym[i].Ambito == con_funcion)
                {
                    var [Valor,TipoValor] = GenerarExpresion(cuerpoReturn.Nodes[0]);
                    if(TipoValor == con_tstr)
                    {
                        agregar3d('Heap[H] = ' + Valor + ';\n');
                        agregar3d('Stack[P] = ' + ' H; //Guardando valor de retorno \n');
                        agregar3d('H = H + 1;\n');
                    }
                    else if(TipoValor == 'array')
                    {
                        agregar3d('Stack[P] = ' + Valor + '; //Guardando valor de retorno \n');
                    }
                    else{
                        agregar3d('Stack[P] = ' + Valor + '; //Guardando valor de retorno \n');
                    }
                    agregar3d('goto ' + StackSym[i].EtqFinal + '; //Salida de la función. \n'); Existe = true;
                    break;
                }
            }
        }
        
        if(!Existe)
        {
            TablaError.push(new Errores('Semántico','La sentencia return, debe ir dentro de métodos o funciones.',raiz.Fila));
        }
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function continue_control(raiz){
    try
    {
        var Existe = false;
        for(var i = StackSym.length - 1; i >= 0; i--)
        {
            if(StackSym[i].Ambito == con_ciclo)
            {
                agregar3d('goto ' + StackSym[i].EtqInicio + '; //Inicia el ciclo. \n'); Existe = true;
                break;
            }
            else if(StackSym[i].Ambito == con_metodo || StackSym[i].Ambito == con_funcion){
                break;
            }
        }
        
        if(!Existe){
            TablaError.push(new Errores('Semántico','La sentencia continue, debe ir dentro de ciclos.',raiz.Fila));
        }
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function break_control(raiz){
    try
    {
        var Existe = false, cuerpoBreak = raiz.Nodes[0];
        
        if(cuerpoBreak.Nodes.length == 0)
        {
            for(var i = StackSym.length - 1; i >= 0; i--)
            {
                if(StackSym[i].Ambito == con_ciclo)
                {
                    agregar3d('goto ' + StackSym[i].EtqFinal + '; //Salida del ciclo. \n'); Existe = true;
                    break;
                }
                else if(StackSym[i].Ambito == con_switch)
                {
                    agregar3d('goto ' + StackSym[i].EtqFinal + '; //Salida del switch. \n'); Existe = true;
                    break;
                }
                else if(StackSym[i].Ambito == con_metodo || StackSym[i].Ambito == con_funcion){
                    break;
                }
            }
        }
        else
        {
            var strIdLoop = cuerpoBreak.Nodes[0].FindTokenAndGetText();
            
            for(var i = StackSym.length - 1; i >= 0; i--)
            {
                if(StackSym[i].Ambito == con_loop && StackSym[i].idLoop == strIdLoop)
                {
                    agregar3d('goto ' + StackSym[i].EtqFinal + '; //Salida del loop ' + strIdLoop + '. \n'); Existe = true;
                    break;
                }
                else if(StackSym[i].Ambito == con_metodo || StackSym[i].Ambito == con_funcion){
                    break;
                }
            }
        }
       
        
        if(!Existe){
            TablaError.push(new Errores('Semántico','La sentencia break, debe ir dentro de ciclos.',raiz.Fila));
        }
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function control_switch(raiz){
    try
    {
        
        var ptnExpresionComp = raiz.Nodes[0], ptnModo = raiz.Nodes[1], ptnListaCasos = raiz.Nodes[2], ptnDefault = raiz.Nodes[3];
        
        
        var EtiquetaInicio = generarEt(), EtiquetaFin = generarEt();
        
        agregar3d(EtiquetaInicio + ': //Inicio de la sentencia switch \n');
        
        var [ExpresionComp,TipoValor] = GenerarExpresion(ptnExpresionComp);
        var [ExpresionModo,TipoModo] = GenerarExpresion(ptnModo);
        
        var TemporalDefecto = generarTemp(), TemporalEncontro = generarTemp();
        agregar3d(TemporalDefecto + ' = 1;\n'); agregar3d(TemporalEncontro + ' = 0;\n');
        StackSym.push(new Simbolos(con_switch,'',null,EtiquetaInicio,EtiquetaFin,0,[]));
        
        
        if(TipoValor == con_tnum)
        {
            for(var i = 0; i < ptnListaCasos.Nodes.length; i++)
            {
                var ptnExpresion = ptnListaCasos.Nodes[i], ptnCuerpoEjecutar = ptnListaCasos.Nodes[i+1];
                if(ptnExpresion.Nodes.length == 1)
                {
                    var [Valor,TipoValor] = GenerarExpresion(ptnExpresion);
                    if(TipoValor != con_tnum)
                    { TablaError.push(new Errores('Semántico','El valor a comparar del switch debe ser numérico.',raiz.Fila)); return; }
                    var verdadera = generarEt(), falsa = generarEt(), vddPivote = generarEt(), falPivote = generarEt();
                    agregar3d('if(' + TemporalEncontro + ' == 1) goto ' + vddPivote + ';\ngoto ' + falPivote + ';\n');
                    agregar3d(falPivote + ':\n');
                    agregar3d('if(' + ExpresionComp + ' == ' + Valor + ') goto ' + verdadera + ';//Comparando\ngoto ' + falsa + ';\n');
                    agregar3d(verdadera + ':\n');
                    agregar3d(vddPivote + ':\n');
                    agregar3d(TemporalDefecto + ' = 0;\n');
                    agregar3d(TemporalEncontro + ' = 1;\n');
                    EjecutarInstrucciones(ptnCuerpoEjecutar);
                    
                    agregar3d('if(' + ExpresionModo + ' == 1) goto ' + EtiquetaInicio + ';\n');
                    agregar3d('goto ' + falsa +';\n');
                    agregar3d(falsa + ':\n');
                }
                else
                {
                    var [Valor1,TipoValor1] = GenerarExpresion(ptnExpresion.Nodes[0]); var [Valor2,TipoValor2] = GenerarExpresion(ptnExpresion.Nodes[2]);
                    if(TipoValor1 != con_tnum || TipoValor2 != con_tnum)
                    { TablaError.push(new Errores('Semántico','El valor a comparar del switch debe ser numérico.',raiz.Fila)); return; }
                    var verdadera1 = generarEt(), falsa1 = generarEt(), verdadera2 = generarEt(), falsa2 = generarEt(), vddPivote = generarEt(), falPivote = generarEt();
                    agregar3d('if(' + TemporalEncontro + ' == 1) goto ' + vddPivote + ';\ngoto ' + falPivote + ';\n');
                    agregar3d(falPivote + ':\n');
                    agregar3d('if(' + ExpresionComp + ' >= ' + Valor1 + ') goto ' + verdadera1 + ';\ngoto ' + falsa1 + ';\n');
                    agregar3d(verdadera1 + ':\n');
                    agregar3d('if(' + ExpresionComp + ' <= ' + Valor2 + ') goto ' + verdadera2 + ';\ngoto ' + falsa2 + ';\n');
                    agregar3d(verdadera2 + ':\n');
                    agregar3d(vddPivote + ':\n');
                    agregar3d(TemporalDefecto + ' = 0;\n');
                    agregar3d(TemporalEncontro + ' = 1;\n');
                    EjecutarInstrucciones(ptnCuerpoEjecutar);                    
                    agregar3d('if(' + ExpresionModo + ' == 1) goto ' + EtiquetaInicio + ';\n')
                    agregar3d(falsa1 + ':\n' + falsa2 + ':\n');
                }
                i++;
            }
            var verdadera = generarEt(), falsa = generarEt(); 
            agregar3d('if(' + TemporalDefecto + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n');
            agregar3d(verdadera + ':\n');
            if(ptnDefault.Nodes.length != 0) EjecutarInstrucciones(ptnDefault.Nodes[0]);
            agregar3d('if(' + ExpresionModo + ' == 1) goto ' + EtiquetaInicio + ';\n');
            agregar3d(falsa + ':\n');
        }
        else
        {
            for(var i = 0; i < ptnListaCasos.Nodes.length; i++)
            {
                var ptnExpresion = ptnListaCasos.Nodes[i], ptnCuerpoEjecutar = ptnListaCasos.Nodes[i+1];
                if(ptnExpresion.Nodes.length == 1)
                {
                    var [Valor,TipoValor] = GenerarExpresion(ptnExpresion);
                    if(TipoValor != con_tstr)
                    { TablaError.push(new Errores('Semántico','El valor a comparar del switch debe ser string.',raiz.Fila)); return; }                    
                    var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp(), vddPivote = generarEt(), falPivote = generarEt();
                    agregar3d('if(' + TemporalEncontro + ' == 1) goto ' + vddPivote + ';\ngoto ' + falPivote + ';\n');
                    agregar3d(falPivote + ':\n');
                    agregar3d('P = P + ' + CambioAmbito + ';\n');
                    agregar3d(temporal + ' = P + 1;\n');
                    agregar3d('Stack[' + temporal + '] = ' + ExpresionComp+ ';\n');
                    temporal = generarTemp();
                    agregar3d(temporal + ' = P + 2;\n');
                    agregar3d('Stack[' + temporal + '] = ' + Valor + ';\n');
                    agregar3d('$$_igual();\n');
                    temporal = generarTemp();
                    agregar3d(temporal + ' = Stack[P]; //Retorno valor. \n');
                    agregar3d('$$_SGB(P,2);\n');
                    agregar3d('P = P - ' + CambioAmbito + ';\n');
                    var verdadera = generarEt(), falsa = generarEt();
                    agregar3d('if(' + temporal + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n');
                    agregar3d(verdadera + ':\n');
                    agregar3d(vddPivote + ':\n');
                    agregar3d(TemporalDefecto + ' = 0;\n');
                    agregar3d(TemporalEncontro + ' = 1;\n');
                    EjecutarInstrucciones(ptnCuerpoEjecutar);
                    agregar3d('if(' + ExpresionModo + ' == 1) goto ' + EtiquetaInicio + ';\n')
                    agregar3d(falsa + ':\n');
                }
                else
                {
                    var [Valor1,TipoValor1] = GenerarExpresion(ptnExpresion.Nodes[0]); var [Valor2,TipoValor2] = GenerarExpresion(ptnExpresion.Nodes[2]);
                    if(TipoValor1 != con_tstr || TipoValor2 != con_tstr)
                    { TablaError.push(new Errores('Semántico','El valor a comparar del switch debe ser numérico.',raiz.Fila)); return; }    
                    var vddPivote = generarEt(), falPivote = generarEt();
                    agregar3d('if(' + TemporalEncontro + ' == 1) goto ' + vddPivote + ';\ngoto ' + falPivote + ';\n');
                    agregar3d(falPivote + ':\n');
                    var CambioAmbito = ObtenerPosicion(false) + 1, temporal = generarTemp();
                    agregar3d('P = P + ' + CambioAmbito + ';\n');
                    agregar3d(temporal + ' = P + 1;\n');
                    agregar3d('Stack[' + temporal + '] = ' + ExpresionComp + ';\n');
                    temporal = generarTemp();
                    agregar3d(temporal + ' = P + 2;\n');
                    agregar3d('Stack[' + temporal + '] = ' + Valor1 + ';\n');
                    agregar3d('$$_igual();\n');
                    temporal = generarTemp();
                    agregar3d(temporal + ' = Stack[P]; //Retorno valor. \n');
                    agregar3d('$$_SGB(P,2);\n');
                    agregar3d('P = P - ' + CambioAmbito + ';\n');
                    var verdadera1 = generarEt(), falsa1 = generarEt();
                    agregar3d('if(' + temporal + ' == 1) goto ' + verdadera1 + ';\ngoto ' + falsa1 + ';\n');
                    agregar3d(falsa1 + ':\n');
                    //---- Verificar el menor
                    
                        CambioAmbito = ObtenerPosicion(false) + 1; temporal = generarTemp();
                        agregar3d('P = P + ' + CambioAmbito + ';\n');
                        agregar3d(temporal + ' = P + 1;\n');
                        agregar3d('Stack[' + temporal + '] = ' + ExpresionComp + ';\n');
                        temporal = generarTemp();
                        agregar3d(temporal + ' = P + 2;\n');
                        agregar3d('Stack[' + temporal + '] = ' + Valor1 + ';\n');
                        agregar3d('$$_mayor();\n');
                        temporal = generarTemp();
                        agregar3d(temporal + ' = Stack[P]; //Retorno valor. \n');
                        agregar3d('$$_SGB(P,2);\n');
                        agregar3d('P = P - ' + CambioAmbito + ';\n');
                        var verdadera2 = generarEt(), falsa2 = generarEt();
                        agregar3d('if(' + temporal + ' == 1) goto ' + verdadera2 + ';\ngoto ' + falsa2 + ';\n');
                    
                    agregar3d(verdadera1 + ':\n' + verdadera2 + ':\n');
                    //---- Corto circuito And, para verificar el segundo valor;
                    
                        CambioAmbito = ObtenerPosicion(false) + 1; temporal = generarTemp();
                        agregar3d('P = P + ' + CambioAmbito + ';\n');
                        agregar3d(temporal + ' = P + 1;\n');
                        agregar3d('Stack[' + temporal + '] = ' + ExpresionComp + ';\n');
                        temporal = generarTemp();
                        agregar3d(temporal + ' = P + 2;\n');
                        agregar3d('Stack[' + temporal + '] = ' + Valor2 + ';\n');
                        agregar3d('$$_igual();\n');
                        temporal = generarTemp();
                        agregar3d(temporal + ' = Stack[P]; //Retorno valor. \n');
                        agregar3d('$$_SGB(P,2);\n');
                        agregar3d('P = P - ' + CambioAmbito + ';\n');
                        var verdadera3 = generarEt(), falsa3 = generarEt();
                        agregar3d('if(' + temporal + ' == 1) goto ' + verdadera3 + ';\ngoto ' + falsa3 + ';\n');
                        agregar3d(falsa3 + ':\n');
                        
                        //-----------
                        CambioAmbito = ObtenerPosicion(false) + 1; temporal = generarTemp();
                        agregar3d('P = P + ' + CambioAmbito + ';\n');
                        agregar3d(temporal + ' = P + 1;\n');
                        agregar3d('Stack[' + temporal + '] = ' + ExpresionComp + ';\n');
                        temporal = generarTemp();
                        agregar3d(temporal + ' = P + 2;\n');
                        agregar3d('Stack[' + temporal + '] = ' + Valor2 + ';\n');
                        agregar3d('$$_menor();\n');
                        temporal = generarTemp();
                        agregar3d(temporal + ' = Stack[P]; //Retorno valor. \n');
                        agregar3d('$$_SGB(P,2);\n');
                        agregar3d('P = P - ' + CambioAmbito + ';\n');
                        var verdadera4 = generarEt(), falsa4 = generarEt();
                        agregar3d('if(' + temporal + ' == 1) goto ' + verdadera4 + ';\ngoto ' + falsa4 + ';\n');
                        agregar3d(falsa3 + ':\n');
                    agregar3d(verdadera3 + ':\n' + verdadera4 + ':\n');
                    agregar3d(vddPivote + ':\n');
                    agregar3d(TemporalDefecto + ' = 0;\n');
                    agregar3d(TemporalEncontro + ' = 1;\n');
                    EjecutarInstrucciones(ptnCuerpoEjecutar);
                    agregar3d('if(' + ExpresionModo + ' == 1) goto ' + EtiquetaInicio + ';\n')
                    
                    agregar3d(falsa2 + ':\n' + falsa4 + ':\n');
                }
                i++;
            }
            var verdadera = generarEt(), falsa = generarEt();
            agregar3d('if(' + TemporalDefecto + ' == 1) goto ' + verdadera + ';\ngoto ' + falsa + ';\n');
            agregar3d(verdadera + ':\n');
            if(ptnDefault.Nodes.length != 0) EjecutarInstrucciones(ptnDefault.Nodes[0]);
            agregar3d('if(' + ExpresionModo + ' == 1) goto ' + EtiquetaInicio + ';\n');
            agregar3d(falsa + ':\n');
        }
        
        
        StackSym.pop();
        agregar3d(EtiquetaFin + ': //Fin de la sentencia switch \n');
        
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function do_whilex(raiz){
    try
    {
        var EtiquetaInicio = generarEt(), EtiquetaFin = generarEt(), CuerpoInstrucciones = raiz.Nodes[0];
        var ptnCondicion1 = raiz.Nodes[1], ptnCondicion2 = raiz.Nodes[2];
        var Condicion1 = GenerarCondicion(ptnCondicion1);
        agregar3d(Condicion1.falsa+'\n');
        var Condicion2 = GenerarCondicion(ptnCondicion2); var falsas = Condicion2.falsa;
        agregar3d(Condicion1.verdadera+'\n');
        agregar3d(Condicion2.verdadera+'\n');
        agregar3d(EtiquetaInicio + ': \n');
        //---- Inicio ámbito.
        StackSym.push(new Simbolos(con_ciclo,'',CuerpoInstrucciones,EtiquetaInicio,EtiquetaFin,0,[]));
        EjecutarInstrucciones(CuerpoInstrucciones);
        StackSym.pop();
        //---- Fin del ámbito.
        Condicion1 = GenerarCondicion(ptnCondicion1);
        agregar3d(Condicion1.verdadera+'\n');
        Condicion2 = GenerarCondicion(ptnCondicion2);
        agregar3d(Condicion2.verdadera+'\n');
        agregar3d('goto ' + EtiquetaInicio + ';\n');
        
        agregar3d(falsas+'\n');
        agregar3d(Condicion1.falsa+'\n');
        agregar3d(Condicion2.falsa+'\n');
        agregar3d(EtiquetaFin + ':\n');
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function ciclo_count(raiz){
    try
    {
        var EtiquetaInicio = generarEt(), EtiquetaFin = generarEt(), CuerpoInstrucciones = raiz.Nodes[1];
        
        var ExpresionGenerada = Expresion(raiz.Nodes[0]);
        if(ObtenerInfo(ExpresionGenerada.cad) == con_bool.toLocaleLowerCase()){
            var temporal = generarTemp();
            var sentencia = temporal + ' = ' + ObtenerToken(ExpresionGenerada.cad) +';\n';
            agregar3d(sentencia);
        }
        else if(ObtenerInfo(ExpresionGenerada.cad) == con_num.toLocaleLowerCase()){
            var temporal = generarTemp();
            var sentencia = temporal + ' = ' + ToBool(ObtenerToken(ExpresionGenerada.cad)) +';\n';
            agregar3d(sentencia);
        }
        agregar3d(ExpresionGenerada.sentencia);
        agregar3d(EtiquetaInicio + ': \n');
        if(ExpresionGenerada.verdadera == '' && ExpresionGenerada.falsa == ''){
            var verdadera = generarEt(), falsa = generarEt(), Temporal = TempActual();
            var sentencia = 'if(' + Temporal + ' > 0) goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
            agregar3d(sentencia);
            agregar3d(verdadera + ':\n');
            //---- Inicio ámbito.
            StackSym.push(new Simbolos(con_ciclo,'',CuerpoInstrucciones,EtiquetaInicio,EtiquetaFin,0,[]));
            EjecutarInstrucciones(CuerpoInstrucciones);
            StackSym.pop();
            //---- Fin del ámbito.
            sentencia = Temporal + ' = ' + Temporal + ' - 1;\n';
            agregar3d(sentencia);
            agregar3d('goto ' + EtiquetaInicio + ';\n');            
            agregar3d(falsa + ':\n');
            agregar3d(EtiquetaFin + ':\n');
        }
        else{
            TablaError.push(new Errores('Semántico','La condición del count debe ser una expresión númerica.',raiz.Fila));
        }
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function ciclo_while(raiz){
    try
    {
        var EtiquetaInicio = generarEt(), EtiquetaFin = generarEt(), CuerpoInstrucciones = raiz.Nodes[1];
        agregar3d(EtiquetaInicio + ': \n');
        
        var Condicion = GenerarCondicion(raiz.Nodes[0]);
        if(Condicion.verdadera != '' && Condicion.falsa != ''){
            agregar3d(Condicion.verdadera+'\n');
            //---- Inicio ámbito.
            StackSym.push(new Simbolos(con_ciclo,'',CuerpoInstrucciones,EtiquetaInicio,EtiquetaFin,0,[]));
            EjecutarInstrucciones(CuerpoInstrucciones);
            StackSym.pop();
            //---- Fin del ámbito.
            agregar3d('goto ' + EtiquetaInicio + ';\n');
            agregar3d(Condicion.falsa+'\n');
            agregar3d(EtiquetaFin + ':\n');
        }
        else{
            TablaError.push(new Errores('Semántico','La condición del while debe ser booleana.',raiz.Fila));
        }
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function ciclo_loop(raiz){
    try
    {
        var EtiquetaInicio = generarEt(), EtiquetaFin = generarEt(), strId = raiz.Nodes[0].FindTokenAndGetText(), CuerpoInstrucciones = raiz.Nodes[1];
        agregar3d(EtiquetaInicio + ': \n');
        //---- Inicio ámbito.
        StackSym.push(new Simbolos(con_loop,strId,CuerpoInstrucciones,EtiquetaInicio,EtiquetaFin,0,[]));
        EjecutarInstrucciones(CuerpoInstrucciones);
        StackSym.pop();
        //---- Fin del ámbito.
        agregar3d('goto ' + EtiquetaInicio + ';\n');
        agregar3d(EtiquetaFin + ':\n');
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function repeat_until(raiz){
    try
    {
        var EtiquetaInicio = generarEt(), EtiquetaFin = generarEt(), CuerpoInstrucciones = raiz.Nodes[0];
        agregar3d(EtiquetaInicio + ': \n');
        //---- Inicio ámbito.
        StackSym.push(new Simbolos(con_ciclo,'',CuerpoInstrucciones,EtiquetaInicio,EtiquetaFin,0,[]));
        EjecutarInstrucciones(CuerpoInstrucciones);
        StackSym.pop();
        //---- Fin del ámbito.
        var Condicion = GenerarCondicion(raiz.Nodes[1]);
        if(Condicion.verdadera != '' && Condicion.falsa != '')
        {
            agregar3d(Condicion.falsa+'\n');
            agregar3d('goto ' + EtiquetaInicio + ';\n');
            agregar3d(Condicion.verdadera+'\n');
            agregar3d(EtiquetaFin + ':\n');
        }
        else
        {
            TablaError.push(new Errores('Semántico','La condición del repeat-until debe ser booleana.',raiz.Fila));
        }
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function do_while(raiz){
    try
    {
        var EtiquetaInicio = generarEt(), EtiquetaFin = generarEt(), CuerpoInstrucciones = raiz.Nodes[0];
        agregar3d(EtiquetaInicio + ': \n');
        //---- Inicio ámbito.
        StackSym.push(new Simbolos(con_ciclo,'',CuerpoInstrucciones,EtiquetaInicio,EtiquetaFin,0,[]));
        EjecutarInstrucciones(CuerpoInstrucciones);
        StackSym.pop();
        //---- Fin del ámbito.
        var Condicion = GenerarCondicion(raiz.Nodes[1]);
        if(Condicion.verdadera != '' && Condicion.falsa != '')
        {
            agregar3d(Condicion.verdadera+'\n');
            agregar3d('goto ' + EtiquetaInicio + ';\n');
            agregar3d(Condicion.falsa+'\n');
            agregar3d(EtiquetaFin + ':\n');
        }
        else
        {
            TablaError.push(new Errores('Semántico','La condición del do while debe ser booleana.',raiz.Fila));
        }
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function if_else(raiz){
    try
    {
        //---- Se obtiene la condicion.
        agregar3d('//Inicio de sentencia if\n');
        var Condicion = GenerarCondicion(raiz.Nodes[0]);
        
        var EtiquetaSalto = generarEt();
        var SentenciaSalto = 'goto ' + EtiquetaSalto + ';\n'
        if(Condicion.verdadera != '' && Condicion.falsa != ''){
            agregar3d(Condicion.verdadera+'\n');
            //---- Inicio ámbito.
            StackSym.push(new Simbolos(con_if,'',null,'',EtiquetaSalto,0,[]));
            EjecutarInstrucciones(raiz.Nodes[1]);
            StackSym.pop();
            //---- Fin del ámbito.
            
            agregar3d(SentenciaSalto);
            agregar3d(Condicion.falsa);
            if(raiz.Nodes[2].Nodes.length > 0){
                
                //---- Inicio ámbito.
                StackSym.push(new Simbolos(con_if,'',null,'',EtiquetaSalto,0,[]));
                EjecutarInstrucciones(raiz.Nodes[2].Nodes[0]);
                StackSym.pop();
                //---- Fin del ámbito.
            }
            agregar3d(EtiquetaSalto + ':\n');
            agregar3d('//Fin de sentencia if\n');
        }
        else{
            TablaError.push(new Errores('Semántico','La condición del if debe ser booleana.',raiz.Fila));
        }
    }
    catch(err)
    {
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function GenerarExpresion(raiz){
    var ValorRetorno = '';
    
    var tempExpresion = generarTemp(), ExpresionGenerada = Expresion(raiz);
    
    if(ExpresionGenerada.cad == ValorNulo)
    {
        return [ValorNulo,ExpresionGenerada.TipoValor];
    }
    
    if(ObtenerInfo(ExpresionGenerada.cad) == con_bool.toLowerCase()){
        ValorRetorno = ToBool(ObtenerToken(ExpresionGenerada.cad));
    }
    else if(ObtenerInfo(ExpresionGenerada.cad) == con_num.toLowerCase())
    {
        ValorRetorno = ObtenerToken(ExpresionGenerada.cad);
    }
    else if(ObtenerInfo(ExpresionGenerada.cad) == con_null.toLowerCase())
    {
        ValorRetorno = ValorNulo;
    }
    else if(ObtenerInfo(ExpresionGenerada.TipoValor) == con_tstr.toLowerCase())
    {
        ValorRetorno = ExpresionGenerada.cad;
    }
    else if(ObtenerInfo(ExpresionGenerada.cad) == con_temporal)
    {
        agregar3d(ExpresionGenerada.sentencia);
        ValorRetorno = ObtenerToken(ExpresionGenerada.cad);
    }
    else if(ExpresionGenerada.verdadera!='' && ExpresionGenerada.falsa!='')
    {
        ValorRetorno = generarTemp(); var Salida = generarEt();
        agregar3d(ExpresionGenerada.sentencia);
        agregar3d(ExpresionGenerada.verdadera+'\n');
        agregar3d(ValorRetorno + ' = 1;\n');
        agregar3d('goto ' + Salida + ';\n');
        agregar3d(ExpresionGenerada.falsa+'\n');
        agregar3d(ValorRetorno + ' = 0;\n');
        agregar3d(Salida + ':\n');
    }
    else
    {
        agregar3d(ExpresionGenerada.sentencia);
        ValorRetorno = ObtenerToken(ExpresionGenerada.cad);
    }
    
    return [ValorRetorno,ExpresionGenerada.TipoValor];
}

function GenerarCondicion(raiz){
    var Condicion = Expresion(raiz);
    if(ObtenerInfo(Condicion.cad) == con_bool.toLowerCase()){
        var verdadera = generarEt(); var falsa = generarEt();
        var sentencia = 'if(1 == '+ ToBool(ObtenerToken(Condicion.cad)) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia);
        Condicion.verdadera = verdadera + ': '; Condicion.falsa = falsa + ': ';
    }
    else if(Condicion.TipoValor == con_tbool && ObtenerInfo(Condicion.cad) == con_temporal)
    {
        
        var verdadera = generarEt(); var falsa = generarEt();
        var sentencia = 'if(1 == '+ ObtenerToken(Condicion.cad) +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
        agregar3d(sentencia);
        Condicion.verdadera = verdadera + ': '; Condicion.falsa = falsa + ': ';
    }
    agregar3d(Condicion.sentencia);
    
    return Condicion;
}

function ExpresionSwitch(raiz,ExpresionComp){
    var EtqVerdadera = '', EtqFalsa = '', Sentencias = '';
    switch(raiz.Nodes.length)
    {
        case 1:
            var InfoToken = raiz.Nodes[0].FindTokenAndGetInfo();
            if(InfoToken == 'EXP'){
                return Expresion(raiz.Nodes[0],ExpresionComp);
            }
            else{
                var Token = raiz.Nodes[0].FindTokenAndGetText();
                var verdadera = generarEt(); var falsa = generarEt();
                var sentencia = 'if('+ ExpresionComp + ' == '+ Token +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
                Sentencias += sentencia;
                EtqVerdadera = verdadera + ':'; EtqFalsa = falsa + ': ';
            }
            break;
        case 2:
            break;
        case 3:
            var operador = raiz.Nodes[1].FindTokenAndGetText()
            switch(operador){
                case '-':
                    {
                        var Token1 = raiz.Nodes[0].Nodes[0].FindTokenAndGetText(), Token2 = raiz.Nodes[2].Nodes[0].FindTokenAndGetText();
                        var verdadera = generarEt(); var falsa = generarEt();
                        var sentencia = 'if('+ ExpresionComp + ' >='+ Token1 +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
                        Sentencias += sentencia;
                        Sentencias += verdadera + ': \n'; EtqFalsa = falsa + ': \n';
                        
                        verdadera = generarEt(); falsa = generarEt();
                        sentencia = 'if('+ ExpresionComp + ' <='+ Token2 +') goto ' + verdadera + ';\ngoto ' + falsa + ';\n';
                        Sentencias += sentencia;
                        EtqVerdadera = verdadera + ':'; EtqFalsa += falsa + ':';
                    }
                    break;
            }
            break;
    }
    
    return [EtqVerdadera,EtqFalsa,Sentencias];
}

function Expresion(raiz){
    var nodo = new Nodo3d('','','','','');
    switch(raiz.Nodes.length){
        case 1:
            var InfoToken = raiz.Nodes[0].FindTokenAndGetInfo();
            if(InfoToken == 'EXP'){
                return Expresion(raiz.Nodes[0]);
            }
            else if(InfoToken == '(primitiva)')
            {
                var ValorRandom = llamada_random();
                return new Nodo3d(ValorRandom + ' (temporal)','','','',con_tnum);
            }
            else if(InfoToken == con_str){
                var cadena = raiz.Nodes[0].FindTokenAndGetString(), posicion = 0, temporal = '', escape = false;
                for(var i = 0; i < cadena.length; i++){
                    
                    if(cadena[i] == '\\' && !escape)
                    {
                        escape = true;
                        posicion = i;
                    }
                    else if(escape)
                    {
                        var TipoCaracterEspecial = cadena[i];
                        temporal = generarTemp();
                        agregar3d(temporal + ' = S + ' + i + ';\n');
                        switch(TipoCaracterEspecial)
                        {
                            case 'n': agregar3d('Pool[' + temporal + '] = ' + 10 + '; //Asignando caracter \\n \n');
                                break;
                            case '\\': agregar3d('Pool[' + temporal + '] = ' + 92 + '; //Asignando caracter \\ \n');
                                break;
                            case 't': agregar3d('Pool[' + temporal + '] = ' + 9 + '; //Asignando caracter \\t \n');
                                break;
                        }
                        posicion = i;
                        escape = false;
                    }
                    else
                    {
                        temporal = generarTemp();
                        agregar3d(temporal + ' = S + ' + i + ';\n');
                        agregar3d('Pool[' + temporal + '] = ' + cadena.charCodeAt(i) + '; //Asignando caracter ' + cadena.charAt(i) + ' \n');
                        posicion = i;
                    }
                }
                temporal = generarTemp(); posicion++;
                agregar3d(temporal + ' = S + ' + posicion + ';\n');
                agregar3d('Pool[' + temporal + '] = 0; //Fin de la cadena \n');
                temporal = generarTemp(); posicion++; 
                agregar3d(temporal + ' = S; //Posicion del inicio de la cadena ' + cadena + '\n'); agregar3d('S = S + ' + posicion + ';\n');
                
                nodo = new Nodo3d(temporal,'','','',con_tstr);
            }
            else if(InfoToken == con_num){
                nodo = new Nodo3d(raiz.Nodes[0].Token,'','','',con_tnum);
            }
            else if(InfoToken == con_bool){
                
                nodo = new Nodo3d(raiz.Nodes[0].Token,'','','',con_tbool);
            }
            else if(InfoToken == con_null){
                
                nodo = new Nodo3d(ValorNulo,'','','',con_tnull);
            }
            else{
                
            }
            return nodo;
        case 2:
            var operador2 = raiz.Nodes[0].FindTokenAndGetText();
            switch(operador2){
                case '!': 
                    der = Expresion(raiz.Nodes[1]);
                    return not(der);
                case '-':
                    der = Expresion(raiz.Nodes[1]);
                    return minus(der);
                case con_decbool:
                    {
                        var temporal = llamada_getbool(raiz.Nodes[1]);
                        return new Nodo3d(temporal + ' (temporal)','','','',con_tbool);
                    }
                case con_declength:
                    {
                        var Parametros = raiz.Nodes[1];
                        if(Parametros.Nodes.length == 1)
                        {
                            var LargoCadena = llamada_lengthCadena(Parametros.Nodes[0]);
                            return new Nodo3d(LargoCadena + ' (temporal)','','','',con_tnum);
                        }
                        else
                        {
                            var LargoDimension = llamada_lengthArreglo(Parametros);
                            return new Nodo3d(LargoDimension + ' (temporal)','','','',con_tnum);
                        }
                    }
                default:
                    if(raiz.Nodes[0].Token == 'DEC_IDS')
                    {
                        var ptnDimension = raiz.Nodes[1];
                        if(ptnDimension.Nodes.length > 0)
                        {
                            var ptnId = raiz.Nodes[0];
                            var ListaIndices = [];
                            for(var i = 0; i < ptnDimension.Nodes.length; i++)
                            {
                                var [Valor,TipoValor] = GenerarExpresion(ptnDimension.Nodes[i]);
                                if(TipoValor == con_tnum){
                                    ListaIndices.push(Valor);
                                }
                            }
                            
                            var [Valor,TipoValor] = new ObtenerVariable(ptnId,ListaIndices).RetornarValor();
                            var temporal = '';

                            if(TipoValor == con_tstr) temporal = Valor;
                            else if(TipoValor == con_tnum || TipoValor == con_tbool) temporal = Valor + ' (temporal)';

                            return new Nodo3d(temporal,'','','',TipoValor);
                        }
                        else
                        {
                            
                            var ptnId = raiz.Nodes[0];
                            var [Valor,TipoValor] = new ObtenerVariable(ptnId,[]).RetornarValor();
                            var temporal = '';
                            
                            if(TipoValor == con_tstr) temporal = Valor;
                            else if(TipoValor == con_tnum || TipoValor == con_tbool) temporal = Valor + ' (temporal)';
                            else temporal = Valor + ' (temporal)';
                            
                            return new Nodo3d(temporal,'','','',TipoValor);
                        }
                    }
            }
        case 4:
            {
                switch(raiz.Nodes[0].FindTokenAndGetText())
                {
                    case con_decnum:
                    {
                        var temporal = llamada_getnum(raiz.Nodes[1],raiz.Nodes[2],raiz.Nodes[3]);
                        return new Nodo3d(temporal + ' (temporal)','','','',con_tnum);
                    }
                }
            }
        case 3:
            if(raiz.Nodes[0].FindTokenAndGetText() == con_innum)
            {
                var EtiquetaRetornar = llamada_inNum(raiz.Nodes[1],raiz.Nodes[2]);
                return new Nodo3d(EtiquetaRetornar + ' (temporal)','','','',con_tnum);
            }
            var operador = raiz.Nodes[1].FindTokenAndGetText(), izq = null, der = null,etq_verdad = '', etq_falsa = '';
            switch(operador){
                case '+': return suma(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '-': return resta(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '*': return producto(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '/': return division(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '%': return mod(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '^': return potencia(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '==': return igualdad(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '!=': return diferencia(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '<': return menor(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '>': return mayor(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '<=': return menor_igual(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '>=': return mayor_igual(Expresion(raiz.Nodes[0]),Expresion(raiz.Nodes[2]));
                case '&&': 
                    izq = Expresion(raiz.Nodes[0]); AndIzquierdo(izq); der = Expresion(raiz.Nodes[2]); 
                    return AndDerecho(izq,der);
                case '||': 
                    izq = Expresion(raiz.Nodes[0]); OrIzquierdo(izq); der = Expresion(raiz.Nodes[2]); 
                    return OrDerecho(izq,der);
                case '|&': 
                    izq = Expresion(raiz.Nodes[0]); der = Expresion(raiz.Nodes[2]); 
                    return Xor(izq,der);
                case '&?': 
                    izq = Expresion(raiz.Nodes[0]); NandIzquierdo(izq); der = Expresion(raiz.Nodes[2]); 
                    return NandDerecho(izq,der);
                case '|?': 
                    izq = Expresion(raiz.Nodes[0]); NorIzquierdo(izq); der = Expresion(raiz.Nodes[2]); 
                    return NorDerecho(izq,der);
            }
            break;
    }
    
    
    return nodo;
}


















