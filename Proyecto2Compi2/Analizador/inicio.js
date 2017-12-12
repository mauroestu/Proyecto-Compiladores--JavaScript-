document.write('<script src="Analizador/gramatica.js" type="text/javascript"></script>');
document.write('<script src="Compilador/generacion3D.js" type="text/javascript"></script>');
document.write('<script src="Compilador/control3d.js" type="text/javascript"></script>');

document.write('<script src="Ejecucion/gramatica3d.js" type="text/javascript"></script>');
document.write('<script src="Ejecucion/ejecutar3D.js" type="text/javascript"></script>');

var arbol = null, arbol3d = null;
var contador = 0;
var grafo = "";
var TextoSimbolos = '', TextoErrores = '';
//---- Tablas de errores y de simbolos
var TablaError = [];
var StackSym = [];


//---- Variables Auxiliares
var contadorMetodos = 0;
var ValorNulo = -20140383142546468;
function ReiniciarVarAux(){
    contadorMetodos = 0; PunteroP = 0; PunteroH = 0; PunteroS = 0; 
}
//----
function IniciarOptimizacion()
{
    TextoSimbolos = ''; TextoErrores = '';
    var strEntrada = document.getElementById('txtEstructuras').value;
    strEntrada += "\n" + document.getElementById('txtEntradaCodigo').value;
    contador = 0; grafo = "";
    ReiniciarControl3D();
    ReiniciarVarAux();
    try
    {
        gramatica.parse(strEntrada);
        IniciarCompilacion(arbol);
        Imprimir3d();
        localStorage.setItem('Entrada3D',Obtener3d());
        window.location = 'optimizador.html';
    }
    catch(err)
    {
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(err);
    }
}

function IniciarDebugIntermedio()
{
    TextoSimbolos = ''; TextoErrores = '';
    var strEntrada = ObtenerCodigo();
    contador = 0; grafo = "";
    ReiniciarControl3D();
    ReiniciarVarAux();
    try
    {
        gramatica.parse(strEntrada);
        IniciarCompilacion(arbol);
        Imprimir3d();
        localStorage.setItem('Debug3D',Obtener3d());
        window.location = 'debugger.html';
    }
    catch(err)
    {
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(err);
    }
}

function IniciarDebugBasico()
{
    TextoSimbolos = ''; TextoErrores = '';
    var strEntrada = document.getElementById('txtEntrada').value;
    contador = 0; grafo = "";
    ReiniciarControl3D();
    ReiniciarVarAux();
    try
    {
        gramatica.parse(strEntrada);
        IniciarCompilacion(arbol);
        Imprimir3d();
        localStorage.setItem('Debug3D',Obtener3d());
        window.location = 'debugger.html';
    }
    catch(err)
    {
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(err);
    }
}

function IniciarDebug()
{
    var strEntrada = document.getElementById('txtEstructuras').value;
    strEntrada += "\n" + document.getElementById('txtEntradaCodigo').value;
    contador = 0; grafo = "";
    ReiniciarControl3D();
    ReiniciarVarAux();
    try
    {
        gramatica.parse(strEntrada);
        IniciarCompilacion(arbol);
        Imprimir3d();
        localStorage.setItem('Debug3D',Obtener3d());
        window.location = 'debugger.html';
    }
    catch(err)
    {
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(err);
    }
}

//----

function IniciarAnalisisIntermedio(){
    TextoSimbolos = ''; TextoErrores = '';
    var strEntrada = ObtenerCodigo();
    contador = 0; grafo = "";
    ReiniciarControl3D();
    ReiniciarVarAux();
     try{
        gramatica.parse(strEntrada);
        //generarAST(arbol,'arbol');
        IniciarCompilacion(arbol);
        //
        IniciarEjecucion(Codigo3d);
        Imprimir3d(); 
    }
    catch(error){
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(error);
    }
}

function IniciarAnalisisBasico(){
    TextoSimbolos = ''; TextoErrores = '';
    var strEntrada = document.getElementById('txtEntrada').value;
    contador = 0; grafo = "";
    ReiniciarControl3D();
    ReiniciarVarAux();
    try{
        gramatica.parse(strEntrada);
        //generarAST(arbol,'arbol');
        IniciarCompilacion(arbol);
        //
        IniciarEjecucion(Codigo3d);
        Imprimir3d(); 
    }
    catch(error){
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(error);
    }
}

function IniciarAnalisis(){
    TextoSimbolos = ''; TextoErrores = '';
    var strEntrada = document.getElementById('txtEstructuras').value;
    strEntrada += "\n" + document.getElementById('txtEntradaCodigo').value;
    contador = 0; grafo = "";
    ReiniciarControl3D();
    ReiniciarVarAux();
    try{
        gramatica.parse(strEntrada);
        //generarAST(arbol,'arbol');
        IniciarCompilacion(arbol);
        Imprimir3d(); 
        IniciarEjecucion(Codigo3d);
    }
    catch(error){
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(error);
    }
}

//---- Stack, Heap y StringPool
var Stack = [], PunteroP = 0;
var Heap = [], PunteroH = 0;
var Pool = [], PunteroS = 0;
var Sym3d = [];
function ReiniciarAmbientes(){
    Stack = []; Heap = []; Pool = []; Sym3d = [];
}

function IniciarEjecucion(Codigo){
    try{
        ReiniciarAmbientes(); 
        gramatica3d.parse(Codigo);
        //generarAST(arbol3d,'arbol3d');
        IniciarEjecucion3D(arbol3d);
        AgregarErrores();
    }
    catch(error){
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(error);
    }
}

function IniciarEjecucion3dOptimizado(){
    try
    {
        ReiniciarAmbientes(); arbol3d = null;
        var Codigo = document.getElementById('txtEntrada3d').value;
        gramatica3d.parse(Codigo);
        IniciarEjecucion3D(arbol3d);
        AgregarErrores();
    }
    catch(error){
        TablaError.push(new Errores('Sintáctico/Léxico',error.message,error.index));
        AgregarErrores();
        console.log(error);
    }
}

function InicializarProcesoOptimizacion()
{
    try
    {
        ReiniciarAmbientes();
        var strCodigo = document.getElementById('txtEntrada3d').value;
        gramatica3d.parse(strCodigo);
        //generarAST(arbol3d,'arbol3d');
        IniciarOptimizacion3D(arbol3d);
        //-------------------------------------------------
    }
    catch(error){
        console.log(error);
    }
}

function generarAST(raiz,nombre){
    var Texto = getGrafo(raiz);
    var nombreArchivo = nombre + '.dot';
    
    var textFileAsBlob = new Blob([Texto], {type:'text/plain'});
    
    var downloadLink = document.createElement("a");
    downloadLink.download = nombreArchivo;
    downloadLink.innerHTML = "Link descarga";
    window.URL = window.URL || window.webkitURL;
          
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    
    downloadLink.onclick = destroyClickedElement;
    
    downloadLink.style.display = "none";
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function getGrafo(raiz){
    grafo = 'digraph G {';
    grafo += 'nodo0[label=\"' + remplazo(raiz.Token) + '\"];\n';
    contador = 1;
    recorrerArbol('nodo0', raiz);
    grafo += '}';
    
    return grafo;
}

function recorrerArbol(padre,hijos){
    for(var i = 0; i < hijos.Nodes.length ; i++){
        var nombreHijo = 'nodo' + contador.toString();
        grafo += nombreHijo + '[label=\"' + remplazo(hijos.Nodes[i].Token) + '\"];\n';
        grafo += padre + '->' + nombreHijo + ';\n';
        contador++;
        recorrerArbol(nombreHijo,hijos.Nodes[i]);
    }
}

function remplazo(cadena){
    cadena = cadena.replace('\\','\\\\');
    cadena = cadena.replace(/"/g,'\\\"');
    
    return cadena;
}

//*********************************************

function VerReporteSimbolos(){
    localStorage.setItem('txtSimbolos',TextoSimbolos);
    window.location = 'simbolos.html';
}

function VerReporteErrores(){
    localStorage.setItem('txtErrores',TextoErrores);
    window.location = 'errores.html';
}

function VerReporteLog(){
    var strLog = '';
    try
    {
        for(var i = 0; i < listMetodos.length; i++)
        {
            for(var j = 0; j < listMetodos[i].listaBloques.length; j++)
            {
                strLog += '<tr>';
                strLog += '<td>' + listMetodos[i].listaBloques[j].bloque + '</td>'
                strLog += '<td>' + listMetodos[i].listaBloques[j].bloqueOpt + '</td>'
                strLog += '<td>' + listMetodos[i].listaBloques[j].log + '</td>'
                strLog += '<td>Bloque No. ' + (j + 1).toString() + '</td>'
                strLog += '</tr>';
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
    localStorage.setItem('txtLog',strLog);
    window.location = 'log.html';
}

function VerReporteBloques(){
    try
    {
        var strReporte = '';
        for(var i = 0; i < listMetodos.length; i++)
        {
            strReporte += listMetodos[i].Nombre
            
            for(var j = 0; j < listMetodos[i].listaBloques.length; j++)
            {
                strReporte += ' | Bloque No. ' + (j + 1);
                  
            }
            if((i+1)!=listMetodos.length) strReporte += ',';            
        }
        
        localStorage.setItem('txtBloques',strReporte);
        window.location = 'bloques.html';
    }
    catch(err)
    {
        console.log(err);
    }
}








