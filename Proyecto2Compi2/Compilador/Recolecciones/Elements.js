class DeclararElement{
    constructor(strNombre,Atributos){
        this.strNombre = strNombre;
        this.Atributos = Atributos;
    }
    
    GuardarElement()
    {
        if(!StackSym[0].ExisteElement(this.strNombre))
        {
            AgregarSimbolo(this.strNombre,this.strNombre,StackSym[StackSym.length - 1].Ambito,'Element',0);
            GuardarElementRecursivo(this.strNombre,this.Atributos,StackSym[0].listContenido);
        }
        else
        {
            TablaError.push(new Errores('Semántico','El element ' + this.strNombre + ' ya existe.',0));
        }
    }
}

function GuardarElementRecursivo(strNombre,Atributos,Lista)
{
    var cont = new Contenido(strNombre,strNombre,true,null,false,null,null,false,null,null,false,[],true,0);
    Lista.push(cont);
    for(var i = 0; i < Atributos.Nodes.length; i++)
    {
        if(Atributos.Nodes[i].Token == 'PROPIEDAD')
        {
            var Propiedad = Atributos.Nodes[i];
            var strTipo = Propiedad.Nodes[0].Nodes[0].FindTokenAndGetText(), strNombreAtributo = Propiedad.Nodes[1].FindTokenAndGetText(), ValorInicial = Propiedad.Nodes[2];
            if(!ExistePropiedad(strNombreAtributo,Lista[Lista.length - 1].ListaObjetos))
            {
                var contenidoAtributo = new Contenido(strNombreAtributo,strTipo,true,ValorInicial,true,null,null,false,null,null,false,[],false,i);
                AgregarSimbolo(strNombreAtributo,strTipo,strNombre,'Atributo',i);
                Lista[Lista.length - 1].ListaObjetos.push(contenidoAtributo);
            }
            else
            {
                TablaError.push(new Errores('Semántico','El atributo ' + this.strNombreAtributo + ' del element ' + strNombre + ' ya existe.',0));
            }
        }
        else
        {
            var NuevoElement = Atributos.Nodes[i];
            var strNombreNuevoElement = NuevoElement.Nodes[0].FindTokenAndGetText(), NuevosAtributos = NuevoElement.Nodes[1];
            GuardarElementRecursivo(strNombreNuevoElement,NuevosAtributos,Lista[Lista.length - 1].ListaObjetos);
        }
    }
}

function ExistePropiedad(strNombreAtributo,Lista)
{
    var Existe = false;
    
    for(var i = 0; i < Lista.length; i++)
    {
        if(Lista[i].strNombreSimbolo == strNombreAtributo)
        {
            Existe = true;
            break;
        }
    }
    
    return Existe;
}