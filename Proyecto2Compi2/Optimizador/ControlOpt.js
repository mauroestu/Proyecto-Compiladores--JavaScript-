var CodigoOptimizado = '';
var BloqueOptimizado = '';
var nBloqueOptimizado = '';
var logReglas = '';
var listBloques = [];
var listMetodos = [];

function ReiniciarAmbienteOptimizacion(){
    CodigoOptimizado = ''; BloqueOptimizado = ''; nBloqueOptimizado = ''; logReglas = '';
    listBloques = []; listMetodos = []; listSentencias = [];
}

function agregar3dOpt(strEntrada){
    CodigoOptimizado += strEntrada;
}

function Obtener3dOpt(){
    return CodigoOptimizado;
}

function AgregarBloque(){
    if(BloqueOptimizado != '' || nBloqueOptimizado != '')
    {
        listBloques.push(new clsBloque(nBloqueOptimizado,BloqueOptimizado,logReglas));
        BloqueOptimizado = ''; nBloqueOptimizado = ''; logReglas = ''; listSentencias = [];
    }
}

function AgregarMetodo(strNombreMetodo){
    listMetodos.push(new clsReporteBloques(strNombreMetodo,listBloques));
    listaBloques = []; listSentencias = [];
}

//---- Control para las reglas 1 y 2.

var listSentencias = [];

function EliminarSentencia(asignador,sentencia){
    var RetornarSentencia = sentencia;
    
    for(var i = 0; i < listSentencias.length; i++){
        if(listSentencias[i].sentencia == sentencia)
        {
            RetornarSentencia = listSentencias[i].asignar;
            logReglas += 'Regla No. 2\n';
            break;
        }
    }
    
    var listPivote = listSentencias;
    listSentencias = [];
    for(var i = 0; i < listPivote.length; i++)
    {
        if(listPivote[i].asignar != asignador)
        {
            listSentencias.push(listPivote[i]);
        }
    }
    
    return RetornarSentencia;
}

function ExisteToken(token){
    var Existe = false;
    
    for(var i = 0; i < listSentencias.length; i++){
        if(listSentencias[i].asignar == token)
        {
            Existe = true;
            break;
        }
    }
    
    return Existe;
}

function ExisteSentencia(asignar, sentencia){
    var RetornarSentencia = sentencia, Existe = false;
    
    for(var i = 0; i < listSentencias.length; i++){
        if(listSentencias[i].sentencia == sentencia)
        {
            RetornarSentencia = listSentencias[i].asignar; Existe = true;
            logReglas += 'Regla No. 1\n';
            break;
        }
    }
    
    if(!Existe)
    {
        listSentencias.push(new clsPermutacion(asignar,sentencia));
    }
    return RetornarSentencia;
}








