document.write('<script src="Ejecucion/objetos3d.js" type="text/javascript"></script>');

var EjecutandoSalto = false;
var Interrupcion = 0;
var UltEtiqueta = -1;

function IniciarEjecucion3D(arbol){
    try
    {
        PunteroP = 0; PunteroH = 0; PunteroS = 0; Stack = []; Heap = []; Pool = []; EjecutandoSalto = false; Interrupcion = 0;
        preparar_ambiente();
        var CuerpoTotal = arbol.Nodes[0];
        Sym3d.push(new ObjSym3d(con_global,[]));
        for(var i = 0; i < CuerpoTotal.Nodes.length; i++)
        {
            switch(CuerpoTotal.Nodes[i].Token)
            {
                case c3d_decmetodo: RecolectarMetodo3d(CuerpoTotal.Nodes[i]);
                    break;
            }
        }
        
        Sym3d.push(new ObjSym3d(con_metodo,[]));
        EjecutarInstrucciones3d(Sym3d[0].listContenido[0].CuerpoMetodo);
        Sym3d.pop();
        
        Sym3d.pop();
        if(Interrupcion != 0){
            switch(Interrupcion){
                case 102: TablaError.push(new Errores('Excepción','NullPointerException, controlado.',arbol.Fila));
                    break;
                case 243: TablaError.push(new Errores('Excepción','MissingReturnStatement, controlado.',arbol.Fila));
                    break;
                case 396: TablaError.push(new Errores('Excepción','ArithmeticException, controlado.',arbol.Fila));
                    break;
                case 624: TablaError.push(new Errores('Excepción','StackOverFlowException, controlado.',arbol.Fila));
                    break;
                case 789: TablaError.push(new Errores('Excepción','HeapOverFlowException, controlado.',arbol.Fila));
                    break;
                case 801: TablaError.push(new Errores('Excepción','PoolOverFlowException, controlado.',arbol.Fila));
                    break;
            }
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,arbol.Fila));
    }
}

function RecolectarMetodo3d(raiz){
    try
    {
        var strNombreMetodo = raiz.Nodes[0].FindTokenAndGetText(), ptnCuerpoMetodo = raiz.Nodes[1];
        var cont = new Contenido3d(strNombreMetodo,ValorNulo,false,ptnCuerpoMetodo,true);
        Sym3d[0].listContenido.push(cont);
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function EjecutarInstrucciones3d(raiz){
    try
    {
        for(var i = 0; i < raiz.Nodes.length && (Interrupcion == 0); i++)
        {
            var InfoToken = raiz.Nodes[i].Token;
            var IniciarConteo = false;
            
            if(InfoToken == c3d_asignacion && !EjecutandoSalto){ 
                asignacion3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_etiqueta){ 
                etiqueta3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_goto && !EjecutandoSalto){
                IniciarConteo = goto3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_if && !EjecutandoSalto){ 
                IniciarConteo = if3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_llamada && !EjecutandoSalto){ 
                llamada3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_sgb && !EjecutandoSalto){ 
                sgb3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_show && !EjecutandoSalto){ 
                show3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_bool && !EjecutandoSalto){ 
                bool3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_num && !EjecutandoSalto){ 
                num3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_outstr && !EjecutandoSalto){ 
                outstr3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_outnum && !EjecutandoSalto){ 
                outnum3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_random && !EjecutandoSalto){ 
                random3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_strlen && !EjecutandoSalto){ 
                strlen3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_instr && !EjecutandoSalto){ 
                instr3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_innum && !EjecutandoSalto){ 
                innum3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_arrlen && !EjecutandoSalto){ 
                arrlen3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_igual && !EjecutandoSalto){ 
                igual3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_nigual && !EjecutandoSalto){ 
                nigual3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_mayor && !EjecutandoSalto){ 
                mayor3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_menor && !EjecutandoSalto){ 
                menor3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_numtostr && !EjecutandoSalto){ 
                numtostr3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_single && !EjecutandoSalto){ 
                single3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_boolstr && !EjecutandoSalto){ 
                boolstr3d(raiz.Nodes[i]);
            }
            else if(InfoToken == c3d_exit && !EjecutandoSalto){ 
                exit3d(raiz.Nodes[i]);
            }
            
            if(IniciarConteo) {i = 0;}
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function exit3d(raiz){
    try
    {
        var codigoEx = Number(raiz.Nodes[0].FindTokenAndGetText());
        Interrupcion = codigoEx;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function boolstr3d(raiz){
    try
    {
        var Valor = Stack[PunteroP + 1].Contenido, InicioCadena = 0, UltimoCaracter = 0; var strTrue = "true", strFalse = "false";
        
        if(Valor == 1)
        {
            for(var i = 0; i < strTrue.length; i++)
            {
                var SimularTemporal = PunteroS + i;
                Pool[SimularTemporal].Contenido = strTrue.charCodeAt(i);
                UltimoCaracter = SimularTemporal;
            }
            UltimoCaracter++;
            Pool[UltimoCaracter].Contenido = 0;
            InicioCadena = PunteroS;
            PunteroS += strTrue.length + 1;
        }
        else
        {
            for(var i = 0; i < strFalse.length; i++)
            {
                var SimularTemporal = PunteroS + i;
                Pool[SimularTemporal].Contenido = strFalse.charCodeAt(i);
                UltimoCaracter = SimularTemporal;
            }
            UltimoCaracter++;
            Pool[UltimoCaracter].Contenido = 0;
            InicioCadena = PunteroS;
            PunteroS += strFalse.length + 1;
        }
        
        Stack[PunteroP].Contenido = InicioCadena;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function single3d(raiz){
    try
    {
        var Numero = Stack[PunteroP + 1].Contenido, InicioCadena = 0;
        var CadenaResultante = '', UltimoCaracter = 0;
        CadenaResultante = Numero.toString();
        for(var i = 0; i < CadenaResultante.length; i++)
        {
            var SimularTemporal = PunteroS + i;
            Pool[SimularTemporal].Contenido = CadenaResultante.charCodeAt(i);
            UltimoCaracter = SimularTemporal;
        }
        
        UltimoCaracter++;
        Pool[UltimoCaracter].Contenido = 0;
        InicioCadena = PunteroS;
        PunteroS += CadenaResultante.length + 1;
        
        Stack[PunteroP].Contenido = InicioCadena;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function numtostr3d(raiz){
    try
    {
        var OrdenOperacion = Stack[PunteroP + 3].Contenido, InicioCadena = 0;
        
        if(OrdenOperacion == 1)
        {
            var InicioCadena = Stack[PunteroP + 1].Contenido, Numero = Stack[PunteroP + 2].Contenido;
            var CadenaResultante = '', UltimoCaracter = 0;
            
            while(Pool[InicioCadena].Contenido != 0)
            {
                CadenaResultante += String.fromCharCode(Pool[InicioCadena].Contenido);
                InicioCadena++;
            }
            CadenaResultante += Numero.toString();
            
            for(var i = 0; i < CadenaResultante.length; i++)
            {
                var SimularTemporal = PunteroS + i;
                Pool[SimularTemporal].Contenido = CadenaResultante.charCodeAt(i);
                UltimoCaracter = SimularTemporal;
            }
            
            UltimoCaracter++;
            Pool[UltimoCaracter].Contenido = 0;
            InicioCadena = PunteroS;
            PunteroS += CadenaResultante.length + 1;
        }
        else
        {
            var InicioCadena = Stack[PunteroP + 2].Contenido, Numero = Stack[PunteroP + 1].Contenido;
            var CadenaResultante = '', UltimoCaracter = 0;
            
            while(Pool[InicioCadena].Contenido != 0)
            {
                CadenaResultante += String.fromCharCode(Pool[InicioCadena].Contenido);
                InicioCadena++;
            }
            CadenaResultante = Numero.toString() + CadenaResultante;
            
            for(var i = 0; i < CadenaResultante.length; i++)
            {
                var SimularTemporal = PunteroS + i;
                Pool[SimularTemporal].Contenido = CadenaResultante.charCodeAt(i);
                UltimoCaracter = SimularTemporal;
            }
            
            UltimoCaracter++;
            Pool[UltimoCaracter].Contenido = 0;
            InicioCadena = PunteroS;
            PunteroS += CadenaResultante.length + 1;
        }
        
        Stack[PunteroP].Contenido = InicioCadena;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function menor3d(raiz){
    try
    {
        var InicioIzq = Stack[PunteroP  + 1].Contenido, InicioDer = Stack[PunteroP  + 2].Contenido;
        var strIzq = '', strDer = '', Resultado = 0;
        
        while(Pool[InicioIzq].Contenido != 0)
        {
            strIzq += String.fromCharCode(Pool[InicioIzq].Contenido);
            InicioIzq++;
        }
        
        while(Pool[InicioDer].Contenido != 0)
        {
            strDer += String.fromCharCode(Pool[InicioDer].Contenido);
            InicioDer++;
        }
        
        if(strIzq.localeCompare(strDer) < 0)
        {
            Resultado = 1;
        }
        
        Stack[PunteroP].Contenido = Resultado;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function mayor3d(raiz){
    try
    {
        var InicioIzq = Stack[PunteroP  + 1].Contenido, InicioDer = Stack[PunteroP  + 2].Contenido;
        var strIzq = '', strDer = '', Resultado = 0;
        
        while(Pool[InicioIzq].Contenido != 0)
        {
            strIzq += String.fromCharCode(Pool[InicioIzq].Contenido);
            InicioIzq++;
        }
        
        while(Pool[InicioDer].Contenido != 0)
        {
            strDer += String.fromCharCode(Pool[InicioDer].Contenido);
            InicioDer++;
        }
        
        if(strIzq.localeCompare(strDer) > 0)
        {
            Resultado = 1;
        }
        
        Stack[PunteroP].Contenido = Resultado;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function nigual3d(raiz){
    try
    {
        var InicioIzq = Stack[PunteroP  + 1].Contenido, InicioDer = Stack[PunteroP  + 2].Contenido;
        var strIzq = '', strDer = '', Resultado = 0;
        
        while(Pool[InicioIzq].Contenido != 0)
        {
            strIzq += String.fromCharCode(Pool[InicioIzq].Contenido);
            InicioIzq++;
        }
        
        while(Pool[InicioDer].Contenido != 0)
        {
            strDer += String.fromCharCode(Pool[InicioDer].Contenido);
            InicioDer++;
        }
        
        if(strIzq.localeCompare(strDer) != 0)
        {
            Resultado = 1;
        }
        
        Stack[PunteroP].Contenido = Resultado;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function igual3d(raiz){
    try
    {
        var InicioIzq = Stack[PunteroP  + 1].Contenido, InicioDer = Stack[PunteroP  + 2].Contenido;
        var strIzq = '', strDer = '', Resultado = 0;
        
        while(Pool[InicioIzq].Contenido != 0)
        {
            strIzq += String.fromCharCode(Pool[InicioIzq].Contenido);
            InicioIzq++;
        }
        
        while(Pool[InicioDer].Contenido != 0)
        {
            strDer += String.fromCharCode(Pool[InicioDer].Contenido);
            InicioDer++;
        }
        
        if(strIzq.localeCompare(strDer) == 0)
        {
            Resultado = 1;
        }
        
        Stack[PunteroP].Contenido = Resultado;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function arrlen3d(raiz){
    try
    {
        var TamanioDimension = Stack[PunteroP  + 1].Contenido;
        Stack[PunteroP].Contenido = TamanioDimension;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function innum3d(raiz){
    try
    {
        var InicioMensaje = Stack[PunteroP  + 1].Contenido, numDefecto = Stack[PunteroP  + 2].Contenido;
        var strMensaje = '';
        
        while(Pool[InicioMensaje].Contenido != 0)
        {
            strMensaje += String.fromCharCode(Pool[InicioMensaje].Contenido);
            InicioMensaje++;
        }
        
        var NumeroIngresado = prompt(strMensaje);
        var Resultado = numDefecto;
        
        if(!isNaN(parseFloat(NumeroIngresado)))
        {
            Resultado = parseFloat(NumeroIngresado);
        }
        
        Stack[PunteroP].Contenido = Resultado;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function instr3d(raiz){
    try
    {
        var PosicionHeap = Stack[PunteroP  + 1].Contenido, InicioMensaje = Stack[PunteroP  + 2].Contenido;
        var strMensaje = '';
        
        while(Pool[InicioMensaje].Contenido != 0)
        {
            strMensaje += String.fromCharCode(Pool[InicioMensaje].Contenido);
            InicioMensaje++;
        }
        
        var CadenaIngresada = prompt(strMensaje), UltimoCaracter = 0;
        for(var i = 0; i < CadenaIngresada.length; i++)
        {
            var SimularTemporal = PunteroS + i;
            Pool[SimularTemporal].Contenido = CadenaIngresada.charCodeAt(i);
            UltimoCaracter = SimularTemporal;
        }
        UltimoCaracter++;
        Pool[UltimoCaracter].Contenido = 0;
        var InicioCadena = PunteroS;
        UltimoCaracter++;
        PunteroS += UltimoCaracter;
        Heap[PosicionHeap].Contenido = InicioCadena;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function strlen3d(raiz){
    try
    {
        var InicioCadena = Stack[PunteroP  + 1].Contenido;
        
        var CadenaResultante = '';
        
        while(Pool[InicioCadena].Contenido != 0)
        {
            CadenaResultante += String.fromCharCode(Pool[InicioCadena].Contenido);
            InicioCadena++;
        }
        Stack[PunteroP].Contenido = CadenaResultante.length;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function random3d(raiz){
    try 
    {
        Stack[PunteroP].Contenido = Math.random() * (1.0000000000000001 - 0) + 0;
        
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function outnum3d(raiz){
    try
    {
        var Valor = Stack[PunteroP  + 1].Contenido, comoEntero = Stack[PunteroP  + 2].Contenido;
        
        if(comoEntero.toString() == '1')
        {
            var strCadena = parseInt(Valor);
            ImprimirConsola(strCadena);
        }
        else
        {
            var strCadena = parseFloat(Valor).toPrecision();
            ImprimirConsola(strCadena);
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function outstr3d(raiz){
    try
    {
        var InicioCadena = Stack[PunteroP  + 1].Contenido;
        
        var CadenaResultante = '';
        
        while(Pool[InicioCadena].Contenido != 0)
        {
            if(Pool[InicioCadena].Contenido == 92 || Pool[InicioCadena].Contenido == 9 || Pool[InicioCadena].Contenido == 10)
            {
                CadenaResultante = CadenaResultante.substring(0,CadenaResultante.length - 1);
                if(Pool[InicioCadena].Contenido == 9) CadenaResultante += '    ';
                else CadenaResultante += String.fromCharCode(Pool[InicioCadena].Contenido);
                InicioCadena++;
            }
            else
            {
                CadenaResultante += String.fromCharCode(Pool[InicioCadena].Contenido);
                InicioCadena++;
            }
        }
        
        ImprimirConsola(CadenaResultante);
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function num3d(raiz){
    try
    {
        var pBase = Stack[PunteroP  + 1].Contenido, pCadena = Stack[PunteroP  + 2].Contenido, numDefecto = Stack[PunteroP  + 3].Contenido;
        var strBase = '', strCadena = '';
        while(Pool[pBase].Contenido != 0)
        {
            strBase += String.fromCharCode(Pool[pBase].Contenido);
            pBase++;
        }
        
        while(Pool[pCadena].Contenido != 0)
        {
            strCadena += String.fromCharCode(Pool[pCadena].Contenido);
            pCadena++;
        }
        
        var Resultado = numDefecto;
        switch(strBase)
        {
            case 'bin':
                {
                    var ExpRegular = new RegExp('b[01]+(.[01]+)?');
                    if(ExpRegular.test(strCadena))
                    {
                        strCadena = strCadena.substr(1,strCadena.length - 1);
                        var CadenaBinaria = strCadena.split('.');
                        
                        if(CadenaBinaria.length == 1)
                        {
                            Resultado = parseInt(strCadena,2);
                        }
                        else
                        {
                            Resultado = parseInt(CadenaBinaria[0],2);
                            Resultado += ConvertirBinario(CadenaBinaria[1]);
                        }
                    }
                }
                break;
            case 'hex':
                {
                    var ExpRegular = new RegExp('0x[A-Fa-f0-9]+');
                    
                    if(ExpRegular.test(strCadena)) Resultado = parseInt(strCadena,16);
                }
                break;
            case 'dec':
                {
                    var ExpRegular = new RegExp('(-)?[0-9]+(.[0-9]+)?');
                    
                    if(ExpRegular.test(strCadena)) Resultado = parseFloat(strCadena);
                }
                break;
        }
        Stack[PunteroP].Contenido = Resultado;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function bool3d(raiz){
    try
    {
        var InicioCadena = Stack[PunteroP  + 1].Contenido;
        var CadenaResultante = '';
        while(Pool[InicioCadena].Contenido != 0)
        {
            CadenaResultante += String.fromCharCode(Pool[InicioCadena].Contenido);
            InicioCadena++;
        }
        if(CadenaResultante.toLowerCase() == 'true') Stack[PunteroP].Contenido = 1; 
        else Stack[PunteroP].Contenido = 0; 
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function show3d(raiz){
    try
    {
        var InicioCadena = Stack[PunteroP  + 1].Contenido;
        if(InicioCadena == ValorNulo)
        {
            alert("NULL");
            return;
        }
        var CadenaResultante = '';
        
        while(Pool[InicioCadena].Contenido != 0)
        {
            if(Pool[InicioCadena].Contenido == 92 || Pool[InicioCadena].Contenido == 9 || Pool[InicioCadena].Contenido == 10)
            {
                CadenaResultante = CadenaResultante.substring(0,CadenaResultante.length - 1);
                if(Pool[InicioCadena].Contenido == 9) CadenaResultante += '    ';
                else CadenaResultante += String.fromCharCode(Pool[InicioCadena].Contenido);
                InicioCadena++;
            }
            else
            {
                CadenaResultante += String.fromCharCode(Pool[InicioCadena].Contenido);
                InicioCadena++;
            }
        }
        
        alert(CadenaResultante);        
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function sgb3d(raiz){
    try
    {
        var ValorAmbito = Exp3d(raiz.Nodes[1]);
        var InicioPila = PunteroP, FinalPila = PunteroP + ValorAmbito;
        
        for(var i = InicioPila; i <= FinalPila; i++) Stack[i].Contenido = ValorNulo;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function asignacion3d(raiz){
    try
    {
        
        var ptnAsignacion = raiz.Nodes[0], valor = Expresion3d(raiz.Nodes[1]);
        var Posicion = 0;
        switch(ptnAsignacion.Token)
        {
            case 'TEMPORAL': AsignarValorTemporal(ptnAsignacion.Nodes[0].Token,valor);
                break;
            case 'PUNTERO_P': PunteroP = valor;
                break;
            case 'PUNTERO_H': PunteroH = valor;
                break;
            case 'PUNTERO_S': PunteroS = valor;
                break;
            case 'STACK':
                Posicion = Exp3d(ptnAsignacion.Nodes[0]);
                AsignarContenidoEstructura(Posicion,c3d_stack,valor);
                break;
            case 'HEAP':
                Posicion = Exp3d(ptnAsignacion.Nodes[0]);
                AsignarContenidoEstructura(Posicion,c3d_heap,valor);
                break;
            case 'POOL':
                Posicion = Exp3d(ptnAsignacion.Nodes[0]);
                AsignarContenidoEstructura(Posicion,c3d_pool,valor);
                break;
        }
        
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function etiqueta3d(raiz){
    try
    {
        var strNombreEtiqueta = raiz.Nodes[0].FindTokenAndGetText();
        var numEtiqueta = Number(strNombreEtiqueta.replace('L',''));
        
        if(numEtiqueta == UltEtiqueta){
            EjecutandoSalto = false;
            UltEtiqueta = -1;
        }
        
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function goto3d(raiz){
    try
    {
        var EtiquetaSalto = raiz.Nodes[0].FindTokenAndGetText();
        EjecutandoSalto = true;
        var numEtiqueta = EtiquetaSalto.replace('L','');
        UltEtiqueta = Number(numEtiqueta);
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return true;
}

function if3d(raiz){
    var IniciarConteo = false;
    
    try
    {
        var CumpleCondicion = Relacional3d(raiz.Nodes[1]), EtiquetaSalto = raiz.Nodes[2].FindTokenAndGetText();
        if(CumpleCondicion){
            EjecutandoSalto = true;
            var numEtiqueta = EtiquetaSalto.replace('L','');
            UltEtiqueta = Number(numEtiqueta);
            IniciarConteo = true;
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return IniciarConteo;
}

function llamada3d(raiz){
    try
    {
        var ptnCuerpoMetodo = null, strNombreMetodo = raiz.Nodes[0].FindTokenAndGetText();
        
        for(var i = 0; i < Sym3d[0].listContenido.length; i++)
        {
            if(strNombreMetodo == Sym3d[0].listContenido[i].strNombre && Sym3d[0].listContenido[i].IsMetodo)
            {
                ptnCuerpoMetodo = Sym3d[0].listContenido[i].CuerpoMetodo;
                break;
            }
        }
        
        if(ptnCuerpoMetodo != null)
        {
            
            Sym3d.push(new ObjSym3d(con_metodo,[]));
            EjecutarInstrucciones3d(ptnCuerpoMetodo);
            Sym3d.pop();
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function AsignarValorTemporal(strNombreTempo, valor){
    try
    {
        var Existe = false;
        for(var i = 0; i < Sym3d[Sym3d.length - 1].listContenido.length; i++)
        {
            if(Sym3d[Sym3d.length - 1].listContenido[i].strNombre == strNombreTempo)
            {
                Sym3d[Sym3d.length - 1].listContenido[i].Valor = valor; Existe = true;
                break;
            }
        }
        
        if(!Existe)
        {
            var cont = new Contenido3d(strNombreTempo,valor,true,null,false);
            Sym3d[Sym3d.length - 1].listContenido.push(cont);
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function ObtenerValorTemporal(strNombreTempo){
    var valor = 0;
    
    try
    {
        var Lista = Sym3d[Sym3d.length - 1].listContenido;
        
        for(var i = 0; i < Lista.length; i++)
        {
            if(Lista[i].strNombre == strNombreTempo)
            {
                valor = Lista[i].Valor;
                break;
            }
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return valor;
}

function AsignarContenidoEstructura(Posicion,Structure,Valor){
    try
    {
        
        switch(Structure)
        {
            case c3d_stack:
                Stack[Posicion].Contenido = Valor;
                break;
            case c3d_heap: Heap[Posicion].Contenido = Valor;
                break;
            case c3d_pool: Pool[Posicion].Contenido = Valor;
                break;
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
}

function ObtenerContenidoEstructura(Posicion,Structure){
    var valor = 0;
    
    try
    {
        switch(Structure)
        {
            case c3d_stack: valor = Stack[Posicion].Contenido; 
                break;
            case c3d_heap: valor = Heap[Posicion].Contenido; 
                break;
            case c3d_pool: valor = Pool[Posicion].Contenido;
                break;
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return valor;
}

function Expresion3d(raiz){
    var valor = 0;
    
    switch(raiz.Nodes.length)
    {
        case 1:
            var InfoToken = raiz.Nodes[0].FindTokenAndGetInfo();
            
            if(InfoToken == '(temporal)'){
                valor = ObtenerValorTemporal(raiz.Nodes[0].FindTokenAndGetText());
            }
            else if(InfoToken == '(p)'){
                valor = PunteroP;
            }
            else if(InfoToken == '(h)'){
                valor = PunteroH;
            }
            else if(InfoToken == '(s)'){
                valor = PunteroS;
            }
            else if(InfoToken == '(numero)'){
                valor = Number(raiz.Nodes[0].FindTokenAndGetText());
            }
            else
            {
                valor = Number(Exp3d(raiz));    
            }
            
            return valor;
        case 2:
            var operador2 = raiz.Nodes[0].FindTokenAndGetText();
            switch(operador2)
            {
                case '-': return (Expresion3d(raiz.Nodes[1]) * (-1))
                default:
                    var Estructura = raiz.Nodes[0].FindTokenAndGetInfo();
                    if(Estructura == '(stack)'){
                        var position = Exp3d(raiz.Nodes[1]);
                        valor = ObtenerContenidoEstructura(position,c3d_stack);
                    }
                    else if(Estructura == '(heap)'){
                        var position = Exp3d(raiz.Nodes[1]);
                        valor = ObtenerContenidoEstructura(position,c3d_heap);
                    }
                    else if(Estructura == '(pool)'){
                        var position = Exp3d(raiz.Nodes[1]);
                        valor = ObtenerContenidoEstructura(position,c3d_pool);
                    }
            }
            return valor;
        case 3:
            var operador3 = raiz.Nodes[1].FindTokenAndGetText();
            switch(operador3)
            {
                case '+': return (Expresion3d(raiz.Nodes[0]) + Expresion3d(raiz.Nodes[2]));
                case '-': return (Expresion3d(raiz.Nodes[0]) - Expresion3d(raiz.Nodes[2]));
                case '*': return (Expresion3d(raiz.Nodes[0]) * Expresion3d(raiz.Nodes[2]));
                case '/': return (Expresion3d(raiz.Nodes[0]) / Expresion3d(raiz.Nodes[2]));
                case '^': return Math.pow((Expresion3d(raiz.Nodes[0]) , Expresion3d(raiz.Nodes[2])));
                case '%': return (Expresion3d(raiz.Nodes[0]) % Expresion3d(raiz.Nodes[2]));
            }
    }
    
    return valor;
}

function Relacional3d(raiz){
    var ValorRetorno = false;
    
    try
    {
        var ptnOperador1 = raiz.Nodes[0], ptnSigno = raiz.Nodes[1], ptnOperador2 = raiz.Nodes[2];
        
        var Operador1 = RetornarOperador(ptnOperador1), Signo = ptnSigno.Nodes[0].FindTokenAndGetText(), Operador2 = RetornarOperador(ptnOperador2);
        
        switch(Signo)
        {
            case '==': ValorRetorno = (Operador1 == Operador2);
                break;
            case '!=': ValorRetorno = (Operador1 != Operador2);
                break;
            case '<=': ValorRetorno = (Operador1 <= Operador2);
                break;
            case '>=': ValorRetorno = (Operador1 >= Operador2);
                break;
            case '<': ValorRetorno = (Operador1 < Operador2);
                break;
            case '>': ValorRetorno = (Operador1 > Operador2);
                break;
        }
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return ValorRetorno;
}

function RetornarOperador(raiz){
    var valor = 0;
    
    try
    {
        var InfoToken = raiz.Nodes[0].FindTokenAndGetInfo();
        
        if(InfoToken == '(temporal)') valor = ObtenerValorTemporal(raiz.Nodes[0].FindTokenAndGetText());
        else if(InfoToken == '(numero)') valor = Number(raiz.Nodes[0].FindTokenAndGetText());
        else if(InfoToken == '(p)') valor = PunteroP;
        else if(InfoToken == '(h)') valor = PunteroH;
        else if(InfoToken == '(s)') valor = PunteroS;
    }
    catch(err)
    {
        console.log(err);
        TablaError.push(new Errores('Semántico',err,raiz.Fila));
    }
    
    return valor;
}
    
function Exp3d(raiz){
    var valor = 0;
    
    switch(raiz.Token){
        case 'TEMPORAL': valor = ObtenerValorTemporal(raiz.Nodes[0].Token);
            break;
        case 'PUNTERO_P': valor = PunteroP;
            break;
        case 'PUNTERO_H': valor = PunteroH;
            break;
        case 'PUNTERO_S': valor = PunteroS;
            break;
        case 'NUMERO': valor = Number(raiz.Nodes[0].Token);
            break;
    }
    
    return valor;
}

function ImprimirConsola(Texto){
    document.getElementById('txtConsola').value += '>> ' + Texto + '\n';
}

function ConvertirBinario(strEntrada){
    var valor = 0.0;
    
    for(var i = 0; i < strEntrada.length; i++)
    {
        var caracter = Number(strEntrada[i]);
        valor += caracter * (Math.pow(2,(i+1)*(-1)));
    }
    
    return valor;
}









