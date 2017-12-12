var contadorTemp = 0; //Contador de todos los temporales
var contadorEt = 0; //Contador de todas las etiquetas
var Codigo3d = ""; //Guarda todo el código3d generado.

function ReiniciarControl3D(){
    contadorTemp = 0;
    contadorEt = 0;
    Codigo3d = "";
}

function TempActual(){
    return 't'+(contadorTemp - 1);
}

function generarTemp(){
    return 't'+contadorTemp++;
}

function EtActual(){
    return 'L'+(contadorEt-1);
}

function generarEt(){
    return 'L'+contadorEt++;
}

function agregar3d(sentencia){
    Codigo3d += sentencia;
}

function Imprimir3d(){
    console.log(Codigo3d);
}

function Obtener3d(){
    return Codigo3d;
}