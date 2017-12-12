document.write('<script src="Debugg/gramatica3d.js" type="text/javascript"></script>');
document.write('<script src="Debugg/ejecutar3D.js" type="text/javascript"></script>');
document.write('<script src="Compilador/objetos.js" type="text/javascript"></script>');

var Stack = [], PunteroP = 0;
var Heap = [], PunteroH = 0;
var Pool = [], PunteroS = 0;
var Sym3d = [];


var ListaNodos = []; var recoleccion = false;

var TablaError = [];
var StackSym = [];

var arbol3d = null;
var contador = 0;
var grafo = "";

function ReiniciarAmbientes(){
    Stack = []; Heap = []; Pool = []; Sym3d = []; ListaNodos = [];
    PunteroP = 0; PunteroH = 0; PunteroS = 0; arbol3d = null; grafo = ""; contador = 0; TablaError = []; 
}

function PrepararAmbientes(){
    Stack = []; Heap = []; Pool = [];
    PunteroP = 0; PunteroH = 0; PunteroS = 0; arbol3d = null; grafo = ""; contador = 0; TablaError = [];
    preparar_ambiente();
}

function IniciarEjecucion(){
    try{
        ReiniciarAmbientes();
        var strCodigo = document.getElementById('txtEntradaCodigo').value;
        gramatica3d.parse(strCodigo);
        //generarAST(arbol3d,'arbol3d');
        IniciarEjecucion3D(arbol3d);
    }
    catch(error){
        console.log(error);
    }
}

//------------------- Todo el control del debug
var ejecutor = null;
var contador = 0, intervalo = 200;
var Fila = 1; var siguiente = false;

function Play(){
    clearInterval(ejecutor);
    ejecutor = setInterval(IniciarDebug, intervalo);
}

function Pause(){
    clearInterval(ejecutor);
    SeleccionarFila(Fila);
}

function Stop(){
    clearInterval(ejecutor);   
    window.location = 'debugger.html';
}

function Aumento(){
    clearInterval(ejecutor);
    intervalo -= 100;
    ejecutor = setInterval(IniciarDebug, intervalo);
}

function Disminucion(){
    clearInterval(ejecutor);
    intervalo += 100;
    ejecutor = setInterval(IniciarDebug, intervalo);
}

function Next(){
    ejecutor = setInterval(IniciarDebug, 0);
    siguiente = true;
}

function IniciarDebug(){
    try
    {
        if(contador < ListaNodos.length)
        {
            var InfoToken = ListaNodos[contador].Token;
            
            EjecutarInstruccion(InfoToken,ListaNodos[contador]);
            
            if(siguiente){
                clearInterval(ejecutor);
                SeleccionarFila(Fila);
                siguiente = false;
            }
            
            if(Interrupcion != 0){
                clearInterval(ejecutor);
                alert('Excepcion encontrada: ' + Interrupcion);
            }
            ActualizarEstructuras();
            contador++;
        }
        else
        {
            contador = 0;
            clearInterval(ejecutor);
        }   
    }
    catch(err)
    {
        console.log(err);
    }
}

//------------------- Finaliza el control del debug

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

function EjecutarInstruccion(InfoToken,raiz){
    
    if(InfoToken == c3d_asignacion && !EjecutandoSalto){ 
        asignacion3d(raiz);
    }
    else if(InfoToken == c3d_etiqueta){ 
        etiqueta3d(raiz);
    }
    else if(InfoToken == c3d_goto && !EjecutandoSalto){
        gotoDebug(raiz);
    }
    else if(InfoToken == c3d_if && !EjecutandoSalto){ 
        ifDebug(raiz);
    }
    else if(InfoToken == c3d_llamada && !EjecutandoSalto){ 
        llamada3d(raiz);
    }
    else if(InfoToken == c3d_sgb && !EjecutandoSalto){ 
        sgb3d(raiz);
    }
    else if(InfoToken == c3d_show && !EjecutandoSalto){ 
        show3d(raiz);
    }
    else if(InfoToken == c3d_bool && !EjecutandoSalto){ 
        bool3d(raiz);
    }
    else if(InfoToken == c3d_num && !EjecutandoSalto){ 
        num3d(raiz);
    }
    else if(InfoToken == c3d_outstr && !EjecutandoSalto){ 
        outstr3d(raiz);
    }
    else if(InfoToken == c3d_outnum && !EjecutandoSalto){ 
        outnum3d(raiz);
    }
    else if(InfoToken == c3d_random && !EjecutandoSalto){ 
        random3d(raiz);
    }
    else if(InfoToken == c3d_strlen && !EjecutandoSalto){ 
        strlen3d(raiz);
    }
    else if(InfoToken == c3d_instr && !EjecutandoSalto){ 
        instr3d(raiz);
    }
    else if(InfoToken == c3d_innum && !EjecutandoSalto){ 
        innum3d(raiz);
    }
    else if(InfoToken == c3d_arrlen && !EjecutandoSalto){ 
        arrlen3d(raiz);
    }
    else if(InfoToken == c3d_igual && !EjecutandoSalto){ 
        igual3d(raiz);
    }
    else if(InfoToken == c3d_nigual && !EjecutandoSalto){ 
        nigual3d(raiz);
    }
    else if(InfoToken == c3d_mayor && !EjecutandoSalto){ 
        mayor3d(raiz);
    }
    else if(InfoToken == c3d_menor && !EjecutandoSalto){ 
        menor3d(raiz);
    }
    else if(InfoToken == c3d_numtostr && !EjecutandoSalto){ 
        numtostr3d(raiz);
    }
    else if(InfoToken == c3d_single && !EjecutandoSalto){ 
        single3d(raiz);
    }
    else if(InfoToken == c3d_boolstr && !EjecutandoSalto){ 
        boolstr3d(raiz);
    }
    else if(InfoToken == c3d_exit && !EjecutandoSalto){ 
        exit3d(raiz);
    }
}





















