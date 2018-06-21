//leitor de arquivos
function leitorArquivo(event, tipo) {

    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        if (tipo == "1"){
            var input = document.querySelector("#data_input");
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

//muda o step da medida separatriz
function medidaSeparatriz(separatriz) {
    if (separatriz == "quartil") {
        document.querySelector("#medida_separatriz").step = "25";
        document.querySelector("#medida_separatriz").value = "0"
    }
    else if (separatriz == "quintil") {
        document.querySelector("#medida_separatriz").step = "20";
        document.querySelector("#medida_separatriz").value = "0";
    }
    else if (separatriz == "decil") {
        document.querySelector("#medida_separatriz").step = "10";
        document.querySelector("#medida_separatriz").value = "0";
    }
    else {
        document.querySelector("#medida_separatriz").step = "1";
        document.querySelector("#medida_separatriz").value = "0";
    }
}

//habilita ou não o campo da variavel ordinal
function habilitarOrdinal(variavel) {
    if (variavel == "ordinal") {
        document.querySelector("#ordem_ordinal").removeAttribute("disabled");
        document.querySelector("#ordem_ordinal").setAttribute("required", "true");
    }
    else {
        document.querySelector("#ordem_ordinal").setAttribute("disabled", "true");
        document.querySelector("#ordem_ordinal").removeAttribute("required");
        document.querySelector("#ordem_ordinal").value = "";
    }
}
