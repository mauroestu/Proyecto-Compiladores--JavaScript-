class ParseTreeNode{
    
    constructor(Token,Fila,Columna,Nodes){
        this.Token = Token;
        this.Fila = Fila;
        this.Columna = Columna;
        this.Nodes = Nodes;
    }
    
    FindTokenAndGetText(){
        var strResultado = '';
        
        var token = this.Token.replace('"','').replace('\'','').split(' ');
        
        for(var i = 0; i < token.length - 1; i++){
            strResultado += token[i].toString();
        }
        
        if(strResultado == '') strResultado = ' ';
        
        return strResultado;
    }       
    
    FindTokenAndGetString(){
        var strResultado = '';
        
        var token = this.Token.replace('"','').replace('\'','').split(' ');
        
        for(var i = 0; i < token.length - 1; i++){
            strResultado += token[i].toString() + ' ';
        }
        
        return strResultado.substring(0,strResultado.length - 2);
    }
    
    FindTokenAndGetInfo(){
        var strResultado = '';
        
        var token = this.Token.replace('"','').replace('\'','').split(' ');
        strResultado = token[token.length - 1].toString();
        
        return strResultado;
    }
}

