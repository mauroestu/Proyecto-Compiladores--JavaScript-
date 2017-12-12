var listFuncion = [];

class clsFuncion{
    constructor(strNombre,strCuerpo){
        this.strNombre = strNombre;
        this.strCuerpo = strCuerpo;
    }
}

function ActualizarContenido(){
    try
    {
        var strNombre = document.getElementById('slcFunciones').value;
        for(var i = 0; i < listFuncion.length; i++)
        {
            if(listFuncion[i].strNombre == strNombre)
            {
                listFuncion[i].strCuerpo = document.getElementById('txtEntrada').value;
                break;
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

function MostrarContenido(){
    try
    {
        var strNombre = document.getElementById('slcFunciones').value;
        
        for(var i = 0; i < listFuncion.length; i++)
        {
            if(listFuncion[i].strNombre == strNombre)
            {
                document.getElementById('txtEntrada').value = listFuncion[i].strCuerpo;
                break;
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

function  ActualizarFunciones(strNombre,strCuerpo){
    try
    {
        var Existe = false;
        
        for(var i = 0; i < listFuncion.length; i++)
        {
            if(listFuncion[i].strNombre == strNombre)
            {
                listFuncion[i].strCuerpo = strCuerpo;
                Existe = true;
                break;
            }
        }
        
        if(!Existe)
        {
            listFuncion.push(new clsFuncion(strNombre,strCuerpo));
            var etiqueta = document.createElement('option');
            var texto = document.createTextNode(strNombre);
            etiqueta.appendChild(texto);
            document.getElementById('slcFunciones').appendChild(etiqueta);
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

function ObtenerCodigo(){
    
    var strCuerpo = ''; 
    for(var i = 0; i < listFuncion.length; i++){
        strCuerpo += listFuncion[i].strCuerpo + '\n';
    }
    return strCuerpo;
}