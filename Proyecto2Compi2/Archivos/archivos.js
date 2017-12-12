document.getElementById('fileEntrada').addEventListener('change', AbrirArchivo, false);
document.getElementById('fileEstructura').addEventListener('change', AbrirArchivo, false);

function AbrirArchivo(evt) {
    var files = evt.target.files; 
    var contenido = "";
    if(files){
        for (var i = 0, f; f = files[i]; i++) {
            var fr = new FileReader();
            fr.onload = (function(f){
                return function(e){
                    contenido = e.target.result;
                    var extension = f.name.substring(f.name.lastIndexOf('.')).toLowerCase();
                    switch(extension){
                        case ".b3d": document.getElementById('txtEntradaCodigo').value = contenido;
                            break;
                        case ".s3d": document.getElementById('txtEstructuras').value = contenido;
                            break; 
                        default: alert("Las extensiones permitidas son .b3d o .s3d");
                    }
                };
            })(f);
            fr.readAsText(f,"UTF-8");
        }
    }
    else{
        alert("Error al cargar el archivo.");
    }
}

function GuardarArchivo(type)
{
    var Texto = "";
    var nombreArchivo = "archivo";
    if(type==1) {
        Texto = document.getElementById("txtEntradaCodigo").value;
        nombreArchivo += ".b3D";
    }
    else {
        Texto = document.getElementById("txtEstructuras").value;
        nombreArchivo += ".s3D";
    }
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

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function LimpiarAreaTexto(type)
{
    switch(type){
        case 1: document.getElementById('txtEntradaCodigo').value = "";
            break;
        case 2: document.getElementById('txtEstructuras').value = "";
            break;
    }
}

