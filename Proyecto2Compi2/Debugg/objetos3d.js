class ObjStack{
    constructor(Posicion,Contenido,Ambito){
        this.Posicion = Posicion;
        this.Contenido = Contenido;
        this.Ambito = Ambito;
    }
}

class ObjHeap{
    constructor(Posicion,Contenido){
        this.Posicion = Posicion;
        this.Contenido = Contenido;
    }
}

class ObjPool{
    constructor(Posicion,Contenido){
        this.Posicion = Posicion;
        this.Contenido = Contenido;
    }
}

class ObjSym3d{
    constructor(Ambito,listContenido,EtqRetorno){
        this.Ambito = Ambito;
        this.listContenido = listContenido;
        this.EtqRetorno = EtqRetorno;
    }
}

class clsNodos{
    constructor(Nodo){
        this.Nodo = Nodo;
    }
}

class Contenido3d{
    constructor(strNombre,Valor,IsTemp,CuerpoMetodo,IsMetodo){
        this.strNombre = strNombre;
        this.Valor = Valor;
        this.IsTemp = IsTemp;
        this.CuerpoMetodo = CuerpoMetodo;
        this.IsMetodo = IsMetodo;
    }
}

function AgregaEtiqueta(Etiqueta,raiz){
    var Existe = false;
    
    for(var i = 0; i < ListaNodos.length; i++)
    {
        var Nodo = ListaNodos[i];
        if(Nodo.Token == c3d_etiqueta)
        {
            if(Nodo.Nodes[0].FindTokenAndGetText() == Etiqueta)
            {
                Existe = true; break;
            }
        }
    }
    
    if(!Existe)
    {
        ListaNodos.push(raiz);
    }
}

function preparar_ambiente(){
    for(var i = 0; i < 100000;i++){
        Stack.push(new ObjStack(i,ValorNulo,''));
        Heap.push(new ObjHeap(i,ValorNulo));
        Pool.push(new ObjPool(i,ValorNulo));
    }
}

function AgregaEtiquetaRetorno(metodo,etiqueta){
    for(var i = 0; i < Sym3d[0].listContenido.length; i++)
    {
        if(Sym3d[0].listContenido[i].strNombre == metodo && Sym3d[0].listContenido[i].IsMetodo)
        {
            Sym3d[0].listContenido[i].Valor = etiqueta;
            break;
        }
    }
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function SeleccionarFila(fila) {
    var txtEntrada = document.getElementById("txtEntradaCodigo"), nLinea = fila;
    nLinea--;
    var numLineas = txtEntrada.value.split("\n");

    var PosicionInicial = 0, PosFinal = txtEntrada.value.length;
    
    for (var i = 0; i < numLineas.length; i++) 
    {
        if (i === nLinea) break; 
        PosicionInicial += (numLineas[i].length + 1);

    }

    var PosFinal = numLineas[nLinea].length + PosicionInicial;


    if (typeof (txtEntrada.selectionStart) !== "undefined") {
        
        txtEntrada.blur();
        txtEntrada.focus();
        txtEntrada.selectionStart = PosicionInicial;
        txtEntrada.selectionEnd = PosFinal;
        txtEntrada.setSelectionRange(PosicionInicial, PosFinal);

    }
}

function ActualizarEstructuras(){
    var strContenido = '<thead><th>Posición</th><th>Contenido</th></thead>', CantidadNulos = 0;
    strContenido += '<tbody>'; var strPalabra = '';
    for(var i = 0; i < Pool.length; i++){
        
        if(Pool[i].Contenido == 0)
        {
            strContenido += '<tr class="success">'
            strContenido += '<td>' + (Pool[i].Posicion - strPalabra.length).toString() + '</td>'
            strContenido += '<td>' + strPalabra + '</td>'
            strContenido += '</tr>'
            
            strPalabra = '';
        }
        else if(Pool[i].Contenido == ValorNulo)
        {
            break;   
        }
        else
        {
            strPalabra += String.fromCharCode(Pool[i].Contenido);
        }
    }
    strContenido += '</tbody>';
    document.getElementById('tbPool').innerHTML = strContenido;
    
    CantidadNulos = 0; strContenido = '<thead><th>Posición</th><th>Contenido</th></thead>';
    strContenido += '<tbody>';
    for(var i = 0; i < Heap.length; i++)
    {
        if(Heap[i].Contenido != ValorNulo)
        {
            strContenido += '<tr class="danger">'
            strContenido += '<td>' + Heap[i].Posicion + '</td>'
            strContenido += '<td>' + Heap[i].Contenido + '</td>'
            strContenido += '</tr>'
        }
        else
        {
            CantidadNulos++;
        }
        if(CantidadNulos > 200){
            break;
        }
    }
    strContenido += '</tbody>';
    document.getElementById('tbHeap').innerHTML = strContenido;
    
    CantidadNulos = 0; strContenido = '<thead><th>Posición</th><th>Contenido</th></thead>';
    strContenido += '<tbody>';
    for(var i = 0; i < Stack.length; i++)
    {
        if(Stack[i].Contenido != ValorNulo)
        {
            strContenido += '<tr class="warning">'
            strContenido += '<td>' + Stack[i].Posicion + '</td>'
            strContenido += '<td>' + Stack[i].Contenido + '</td>'
            strContenido += '</tr>'
        }
        else
        {
            CantidadNulos++;
        }
        if(CantidadNulos > 100){
            break;
        }
    }
    strContenido += '</tbody>';
    document.getElementById('tbStack').innerHTML = strContenido;
    
    document.getElementById('PuntS').innerHTML = 'S: ' + PunteroS;
    document.getElementById('PuntH').innerHTML = 'H: ' + PunteroH
    document.getElementById('PuntP').innerHTML = 'P: ' + PunteroP;
}












