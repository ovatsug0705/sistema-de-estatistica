//leitor de arquivos
function leitorArquivo(event, tipo) {

    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        if (tipo == "1"){
            var input = document.querySelector(".data");
            input.value = event.target.result;
        }
        else {
            var input = document.querySelector("#hist1");
            var input2 = document.querySelector("#hist2");
            var string = event.target.result;

            for (var i=0; i < 4; i++){
                string = string.replace('"','');
            }

            string = string.split("\n");
            input.value = string[0];
            input2.value = string[1];
        }
      
    };
  
    reader.readAsText(file);
}

//fecha o menu mobile
function fechaMenu() {
    document.querySelector(".check_input").checked = false;
}

function medidaSeparatriz(separatriz) {
    if (separatriz == "quartil") {
        document.querySelector("#valor").step = "25";
        document.querySelector("#valor").value = "0"
    }
    else if (separatriz == "quintil") {
        document.querySelector("#valor").step = "20";
        document.querySelector("#valor").value = "0";
    }
    else if (separatriz == "decil") {
        document.querySelector("#valor").step = "10";
        document.querySelector("#valor").value = "0";
    }
    else {
        document.querySelector("#valor").step = "1";
        document.querySelector("#valor").value = "0";
    }
}

function habilitarOrdinal(variavel) {
    if (variavel == "ordinal") {
        document.querySelector(".ordinal").removeAttribute("disabled");
        document.querySelector(".ordinal").setAttribute("required", "true");
    }
    else {
        document.querySelector(".ordinal").setAttribute("disabled", "true");
        document.querySelector(".ordinal").removeAttribute("required");
        document.querySelector(".ordinal").value = "";
    }
}
