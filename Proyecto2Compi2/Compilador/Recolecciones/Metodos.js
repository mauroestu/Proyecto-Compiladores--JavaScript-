class AsignarMetodo{
    constructor(strTipoMetodo,strNombreMetodo,ListaParametros,ptnCuerpoMetodo){
        this.strTipoMetodo = strTipoMetodo;
        this.strNombreMetodo = strNombreMetodo;
        this.ListaParametros = ListaParametros;
        this.ptnCuerpoMetodo = ptnCuerpoMetodo;
    }
    GuardarMetodo()
    {
        var ParametrosRepetidos = false;
        for(var i = 0; i < this.ListaParametros.length; i++)
        {
            for(var j = 0; j < this.ListaParametros.length; j++)
            {
                if(this.ListaParametros[i].strNombreSimbolo == this.ListaParametros[j].strNombreSimbolo && i!=j)
                {
                    ParametrosRepetidos = true;
                }
            }
        }
        
        if(!ParametrosRepetidos){
            var ExisteFunc = false;
            if(StackSym[0].ExisteFuncion(this.strNombreMetodo,this.strTipoMetodo,this.ListaParametros)){
                ExisteFunc = true;
            }
            if(!ExisteFunc){
                var EtqRetorno = generarEt();
                
                //agregar3d('void metodo_'+ contadorMetodos +'(){\n');
                if(this.strTipoMetodo == 'void') StackSym.push(new Simbolos(con_metodo,'',this.ptnCuerpoMetodo,'',EtqRetorno,0,[]));
                else StackSym.push(new Simbolos(con_funcion,'',this.ptnCuerpoMetodo,'',EtqRetorno,0,[]));
                
                
                for(var i = 0; i < this.ListaParametros.length; i++){
                    var Posicion = ObtenerPosicion(true);
                    if(this.ListaParametros[i].isArray)
                    {
                        var cont = new Contenido(this.ListaParametros[i].strNombreSimbolo,this.ListaParametros[i].strTipoValor,true,this.ListaParametros[i].ValorSimbolo,true,
                                             null,null,null,this.ListaParametros[i].Dimensiones,this.ListaParametros[i].Elementos,true,
                                                 this.ListaParametros[i].ListaObjetos,this.ListaParametros[i].isObjeto,Posicion);
                        StackSym[StackSym.length - 1].listContenido.push(cont);
                    }
                    else
                    {
                        var cont = new Contenido(this.ListaParametros[i].strNombreSimbolo,this.ListaParametros[i].strTipoValor,true,ValorNulo,true,
                                             null,null,null,null,null,null,this.ListaParametros[i].ListaObjetos,this.ListaParametros[i].isObjeto,Posicion);
                        StackSym[StackSym.length - 1].listContenido.push(cont);
                    }                    
                }
                
                //EjecutarInstrucciones(this.ptnCuerpoMetodo);
                var cont = new Contenido(this.strNombreMetodo,this.strTipoMetodo,false,null,false,EtqRetorno,this.ListaParametros,true,
                                             null,null,null,this.ptnCuerpoMetodo,'metodo_' + contadorMetodos,ObtenerPosicion(false));
                StackSym[0].listContenido.push(cont);
                
                StackSym.pop();
                //agregar3d(EtqRetorno+': //Retorno de metodo_'+contadorMetodos);
                //agregar3d('\n}\n\n');
                contadorMetodos++;
            }
            else{
                TablaError.push(new Errores('Semántico','El método ' + this.strNombreMetodo + ' ya existe.',0));
            }
        }
        else{
            TablaError.push(new Errores('Semántico','El método ' + this.strNombreMetodo + ' tiene parametros repetidos.',0));
        }
    }
    
}

function GenerarMetodo3d(conte)
{
    try
    {
        var EtqRetorno = generarEt();
        agregar3d('void '+ conte.isObjeto +'(){\n');
        
        if(conte.strTipoValor == 'void') StackSym.push(new Simbolos(con_metodo,'',conte.ListaObjetos,'',EtqRetorno,0,[]));
        else StackSym.push(new Simbolos(con_funcion,'',conte.ListaObjetos,'',EtqRetorno,0,[]));
        
        for(var i = 0; i < conte.ListParametros.length; i++)
        {
            var Posicion = ObtenerPosicion(true);
            if(conte.ListParametros[i].isArray)
            {
                var cont = new Contenido(conte.ListParametros[i].strNombreSimbolo,conte.ListParametros[i].strTipoValor,true,conte.ListParametros[i].ValorSimbolo,true,
                                     null,null,null,conte.ListParametros[i].Dimensiones,conte.ListParametros[i].Elementos,true,
                                         conte.ListParametros[i].ListaObjetos,conte.ListParametros[i].isObjeto,Posicion);
                StackSym[StackSym.length - 1].listContenido.push(cont);
            }
            else
            {
                var cont = new Contenido(conte.ListParametros[i].strNombreSimbolo,conte.ListParametros[i].strTipoValor,true,ValorNulo,true,
                                     null,null,null,null,null,null,conte.ListParametros[i].ListaObjetos,conte.ListParametros[i].isObjeto,Posicion);
                StackSym[StackSym.length - 1].listContenido.push(cont);
            }
        }
        
        EjecutarInstrucciones(conte.ListaObjetos);
        StackSym.pop();
        agregar3d(EtqRetorno+': //Retorno de '+conte.isObjeto);
        agregar3d('\n}\n\n');
    }
    catch(err)
    {
        console.log(err);
    }
}

class ObtenerMetodo{
    constructor(strNombreMetodo,ListaParametros,strTipo){
        this.strNombreMetodo = strNombreMetodo;
        this.ListaParametros = ListaParametros;
        this.strTipo = strTipo;
    }
    
    InvocarMetodo(){
        var [Existe,NombreMetodo,Tamanio] = RecorrerMetodoGeneral(this.strNombreMetodo,this.strTipo,this.ListaParametros);
        if(!Existe)
        {
            TablaError.push(new Errores('Semántico','El método ' + this.strNombreMetodo + ' a invocar no existe.',0));
        }
        else
        {
            var Referencias = ObtenerTipoReferencias(this.strNombreMetodo,this.strTipo,this.ListaParametros);
            var CambioAmbito = ObtenerPosicion(false) + 1;
            agregar3d('P = P + ' + CambioAmbito + ';\n');
            for(var i = 0; i < this.ListaParametros.length; i++)
            {
                if(this.ListaParametros[i][1] == con_tstr)
                {
                    var temporal = generarTemp(), temporal2 = generarTemp();
                    agregar3d(temporal + ' = P + ' + (i + 1).toString() + ';  \n');
                    agregar3d('Stack[' + temporal + '] = H;\n');
                    agregar3d('H = H + 1;\n');
                    agregar3d(temporal2 + ' = P + ' + (i + 1).toString() + ';  \n');
                    temporal = generarTemp(); 
                    agregar3d(temporal  + ' = Stack[' + temporal2 + '];  \n');
                    agregar3d('Heap[' + temporal + '] = ' + this.ListaParametros[i][0] + '; //Asignando parametro. \n');
                }
                else if(this.ListaParametros[i][1] == 'array')
                {
                    
                    var temporal1 = generarTemp();
                    agregar3d(temporal1 + ' = P + ' + (i + 1).toString() + ';\n');
                    agregar3d('Stack[' + temporal1 + '] = ' + this.ListaParametros[i][0] + '; //Asignando al parametro arreglo\n');
                }
                else
                {
                    var temporal = generarTemp();
                    agregar3d(temporal + ' = P + ' + (i + 1).toString() + ';  \n');
                    agregar3d('Stack[' + temporal + '] = ' + this.ListaParametros[i][0] + '; //Asignando parametro. \n');
                }
            }
            agregar3d(NombreMetodo + '();\n');
            agregar3d('$$_SGB(P,' + (Tamanio + 1) + ');\n');
            agregar3d('P = P - ' + CambioAmbito + ';\n');
            AgregarSimbolo(this.strNombreMetodo,this.strTipo,'Global','Método',0);
        }
    }
}

function ObtenerTipoReferencias(strNombreMetodo,strTipo,ListaParametros)
{
    var Referencias = [];
    
    Referencias = StackSym[0].ObtenerReferencias(strNombreMetodo,strTipo,ListaParametros);
    
    return Referencias;
}

function RecorrerMetodoGeneral(strNombreMetodo,strTipo,ListaParametros){
    var Existe = false, NombreMetodo = '', Tamanio = 0;
    
    [Existe,NombreMetodo,Tamanio] = StackSym[0].ObtenerMetodo(strNombreMetodo,strTipo,ListaParametros);
    
    return [Existe,NombreMetodo,Tamanio];
}





