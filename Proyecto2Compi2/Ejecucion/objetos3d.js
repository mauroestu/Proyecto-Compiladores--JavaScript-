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
    constructor(Ambito,listContenido){
        this.Ambito = Ambito;
        this.listContenido = listContenido;
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

function preparar_ambiente(){
    for(var i = 0; i < 100000;i++){
        Stack.push(new ObjStack(i,ValorNulo,''));
        Heap.push(new ObjHeap(i,ValorNulo));
        Pool.push(new ObjPool(i,ValorNulo));
    }
}