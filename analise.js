function medidaSeparatriz(separatriz){
    if (separatriz == "quartil"){
        document.querySelector("#valor").step = "25";
        document.querySelector("#valor").value = "0"
    }
    else if(separatriz == "quintil"){
        document.querySelector("#valor").step = "20";
        document.querySelector("#valor").value = "0";
    }
    else if (separatriz == "decil"){
        document.querySelector("#valor").step = "10";
        document.querySelector("#valor").value = "0";
    }
    else{
        document.querySelector("#valor").step = "1";
        document.querySelector("#valor").value = "0";
    }
}

function habilitarOrdinal(variavel){
    if (variavel == "ordinal"){
        document.querySelector(".ordinal").removeAttribute("disabled");
        document.querySelector(".ordinal").setAttribute("required" , "true");
    }
    else{
        document.querySelector(".ordinal").setAttribute("disabled" , "true");
        document.querySelector(".ordinal").removeAttribute("required");
        document.querySelector(".ordinal").value = "";
    }
}

function passardados() {
    
    //dados para o processo
    var dado = document.querySelectorAll(".dados")[2].value;
    window.localStorage.setItem("dados", dado); 

    //tipo da variavel
    if (document.querySelectorAll(".item")[0].checked) {
        dado = document.querySelectorAll(".item")[0].value;
        window.localStorage.setItem("variavel" , dado);
    }
    else if (document.querySelectorAll(".item")[1].checked) {
        dado = document.querySelectorAll(".item")[1].value;
        window.localStorage.setItem("variavel" , dado);
        dado = document.querySelector(".ordinal").value;
        window.localStorage.setItem("ordinal" , dado);        
    }
    else if (document.querySelectorAll(".item")[2].checked) {
        dado = document.querySelectorAll(".item")[2].value;
        window.localStorage.setItem("variavel" , dado);  
    }
    else if (document.querySelectorAll(".item")[3].checked) {
        dado = document.querySelectorAll(".item")[3].value;
        window.localStorage.setItem("variavel" , dado);      
    }

    //censo ou estimação
    if (document.querySelectorAll(".item")[4].checked){
        dado = document.querySelectorAll(".item")[4].value;
        window.localStorage.setItem("dadoestatistico" , dado);       
    }
    else{
        dado = document.querySelectorAll(".item")[5].value;
        window.localStorage.setItem("dadoestatistico" , dado);
    }

    //nome variavel e nome frequencia
    dado = document.querySelectorAll(".dados")[0].value;
    window.localStorage.setItem("nomevariavel" , dado);

    dado = document.querySelectorAll(".dados")[1].value;
    window.localStorage.setItem("nomefrequencia" , dado);

    //valor medida separatriz
    dado = document.querySelector("#valor").value;
    window.localStorage.setItem("medidaseparatriz", dado);
}

function analisar() {

    var variavel = window.localStorage.getItem("variavel"),
        dados = window.localStorage.getItem("dados").split(";"),
        processoEstatistico = window.localStorage.getItem("dadoestatistico"),
        nomeVariavel = window.localStorage.getItem("nomevariavel"),
        nomeFrequencia = window.localStorage.getItem("nomefrequencia"),
        medidaSeparatriz = window.localStorage.getItem("medidaseparatriz");

    if (variavel == "continua") {
        quantitativaContinua(dados, processoEstatistico, nomeVariavel, nomeFrequencia, medidaSeparatriz, variavel);
    }
    else {
        var ordinal = window.localStorage.getItem("ordinal");
        qualitativa_quantitativaDiscreta(dados, ordinal, nomeVariavel, nomeFrequencia, variavel, processoEstatistico, medidaSeparatriz);
    }
}

function qualitativa_quantitativaDiscreta(dados2, ordinal, nomeVar, nomeFreq, tipo, processo, medida) {
    var ultima = 0,
        ord, ordem, tabela = [[]], comparacao, numero = 0, aux = 0, aux2 = 0,
        tamanho = 1, cont = 1, cont2 = 0,
        media = 0, moda = [],
        moda2 = [], valorModa, mediana = 2, somaFrequencia = 0,
        desvioPadrao = 0,
        coeficienteDeVariacao = 0,
        medidaSeparatriz = 0;

    //ordena os dados
    if (tipo == "nominal") {
        dados2.sort();
    }
    else if (tipo == "ordinal") {
        ord = ordinal.split(";");

        for (var i = 0; i < ord.length - 1; i++) {
            for (var x = 0; x < dados2.length; x++) {
                if (dados2[x] == ord[i]) {
                    ordem = dados2[ultima];
                    dados2[ultima] = dados2[x];
                    ultima++;
                    dados2[x] = ordem;
                }
            }
        }
    }
    else {
        for (var i = 0; i < dados2.length; i++) {
            dados2[i] = Number(dados2[i]);
        }

        dados2.sort(ordenaNum);
    }

    console.log(dados2)

    //adiciona as variaveis dentro da coluna de variaveis
    tabela[0][1] = dados2[0];
    comparacao = dados2[0];
    for (var i = 0; i < dados2.length; i++) {
        if (dados2[i] != comparacao) {
            tabela.push([]);
            tabela[tamanho][1] = dados2[i];
            tamanho++;
            comparacao = dados2[i];
        }
    }

    //adiciona as frequencias simples
    comparacao = dados2[0];
    for (var i = 1; i < dados2.length; i++) {
        if (comparacao == dados2[i]) {
            cont++;
        }
        else {
            tabela[cont2][2] = cont;
            cont2++
            cont = 1;
            comparacao = dados2[i];
        }

        if (i == dados2.length - 1) {
            tabela[cont2][2] = cont;
            cont2++
            cont = 1;
            comparacao = dados2[i];
        }
    }

    //adiciona as frequencias simples percentual, acumulada, acumulada percentual e classes na tabela
    for (var i = 0; i < tamanho; i++) {
        numero = (tabela[i][2] / dados2.length) * 100;
        tabela[i][3] = parseFloat(numero.toFixed(2));
        tabela[i][0] = i + 1;

        tabela[i][4] = aux + tabela[i][2];
        aux = tabela[i][4];
        numero = aux2 + tabela[i][3];
        tabela[i][5] = parseFloat(numero.toFixed(2));
        aux2 = tabela[i][5];
    }

    //adiciona o cabeçalho da tabela
    tabela.unshift(["Classe", nomeVar, nomeFreq, "Frequencia Simples Percentual",
        "Frequencia Acumulada", "Frequencia Acumulada Percentual"])

    console.log(tabela);

    if (tipo == "discreta") {
        //Cálculo Média e Moda
        for (var i = 1; i <= tamanho; i++) {
            media += tabela[i][1] * tabela[i][2];
            somaFrequencia += tabela[i][2];

            if (i == 1) {
                moda.push(tabela[i][2]);
                moda2.push(tabela[i][1]);
            }
            else if (tabela[i][2] > moda[moda.length - 1]) {
                moda.length = 0;
                moda.push(tabela[i][2]);
                moda2.length = 0;
                moda2.push(tabela[i][1]);
            }
            else if (tabela[i][2] == moda[moda.length - 1]) {
                moda.push(tabela[i][2]);
                moda2.push(tabela[i][1]);
            }
        }
        media = media / somaFrequencia;
        media = parseFloat(media.toFixed(2));

        console.log("A media é: " + media)

        if (moda2.length == tamanho) {
            valorModa = "Amodal"
            console.log(valorModa);
        }
        else {
            valorModa = moda2;
            console.log("A(s) moda(s) é(são): " + valorModa);
        }

        //calculo mediana
        if (somaFrequencia % 2 == 0) {
            mediana = (dados2[somaFrequencia / 2 - 1] + dados2[somaFrequencia / 2]) / 2;
        }
        else {
            mediana = dados2[Math.floor(somaFrequencia / 2)];
        }
        console.log("Mediana: " + mediana);

        //Desvio Padrão
        for (var i = 1; i <= tamanho; i++) {
            desvioPadrao += ((Math.pow(tabela[i][1] - media, 2)) * tabela[i][2]);
        }
        if (processo == "populacao") {
            desvioPadrao = Math.sqrt(desvioPadrao / somaFrequencia);
        }
        else if (processo == "amostra") {
            desvioPadrao = Math.sqrt(desvioPadrao / (somaFrequencia - 1));
        }
        desvioPadrao = desvioPadrao.toFixed(2);
        coeficienteDeVariacao = (desvioPadrao / media) * 100;
        coeficienteDeVariacao = coeficienteDeVariacao.toFixed(2);
        console.log("O desvio padrão é de: " + desvioPadrao);
        console.log("O coeficiente de variação é de: " + coeficienteDeVariacao);

        //Medida Separatriz
        medidaSeparatriz = Math.round((parseInt(medida) * somaFrequencia) / 100);
        comparacao = true;
        cont = 1;
        while (comparacao) {
            if (medidaSeparatriz <= tabela[cont][4]) {
                console.log(medida + "% dos dados são " + tabela[cont][1] + " ou menos.");
                console.log(100 - medida + "% dos dados são " + tabela[cont][1] + " ou mais.");
                comparacao = false;
                medidaSeparatriz = tabela[cont][1];
            }
            cont++;
        }
    }

    saidaDados(tabela, tamanho, media, mediana, valorModa, desvioPadrao, coeficienteDeVariacao, medida, medidaSeparatriz, tipo);
}

function quantitativaContinua(dados2, processo, nomeVar, nomeFreq, medida, tipo) {

    //ordena os dados
    for (var i = 0; i < dados2.length; i++) {
        dados2[i] = Number(dados2[i]);
    }

    dados2.sort(ordenaNum);
    console.log(dados2)

    var tabela = [], comparacao, aux = 0, aux2 = 0, tamanho = 0, somaFrequencia = 0, cont = 0, amp = 0, classe = 0,
        classes = [], rep = true, min = 0, max = 0, media = 0, mediana = 0, moda = [], moda2 = [], moda3 = [],
        modaPearson = 0, modaKing = [], modaCzuber = [], valorModa, vetorMin = [], vetorMax = [], vetorPM = [], x = 0,
        numero = 0, desvioPadrao = 0, fanta = 0, fiant = 0, fipos = 0, intervalo = 0, medidaSeparatriz;

    //Amplitude
    amp = ((dados2[dados2.length - 1]) - dados2[0]) + 1;

    //Número de classes
    classe = Math.floor(Math.sqrt(dados2.length));
    classes = [classe, classe - 1, classe + 1];

    //Intervalo das classes
    while (rep) {
        if (amp % classes[0] == 0) {
            intervalo = amp / classes[0];
            tamanho = classes[0];
            rep = false;
        }
        else if (amp % classes[1] == 0) {
            intervalo = amp / classes[1];
            tamanho = classes[1];
            rep = false;
        }
        else if (amp % classes[2] == 0) {
            intervalo = amp / classes[2];
            tamanho = classes[2];
            rep = false;
        }
        amp++
    }

    //Preenche a tabela
    min = dados2[0];
    vetorMin.push(min);
    max = dados2[0] + intervalo;
    vetorMax.push(max);
    vetorPM.push((max + min) / 2)
    rep = true;
    for (var i = 0; i < tamanho; i++) {
        tabela.push([]);
        tabela[i][1] = "de " + min + " até " + max;
        tabela[i][0] = i + 1;

        while (rep) {
            if (dados2[x] >= min && dados2[x] < max) {
                cont++;
            }
            else {
                tabela[i][2] = cont;
                somaFrequencia += tabela[i][2];
                cont = 0;
                rep = false;
                x--;
            }
            x++;
            if (x == dados2.length) {
                tabela[i][2] = cont;
                somaFrequencia += tabela[i][2];
                cont = 0;
                rep = false;
            }
        }
        rep = true;
        min = max;
        vetorMin.push(min);
        max = max + intervalo;
        vetorMax.push(max);
        vetorPM.push((max + min) / 2)

        numero = (tabela[i][2] / dados2.length) * 100;
        tabela[i][3] = parseFloat(numero.toFixed(2));

        tabela[i][4] = aux + tabela[i][2];
        aux = tabela[i][4];
        tabela[i][5] = aux2 + tabela[i][3];
        aux2 = tabela[i][5];
    }

    vetorMin.pop();
    vetorMax.pop();
    vetorPM.pop();

    //adiciona o cabeçalho da tabela
    tabela.unshift(["Classe", nomeVar, nomeFreq, "Frequencia Simples Percentual",
        "Frequencia Acumulada", "Frequencia Acumulada Percentual"])

    console.log(tabela);

    //media e Moda Convencional

    for (var i = 1; i <= tamanho; i++) {
        media += vetorPM[i - 1] * tabela[i][2];

        if (i == 1) {
            moda.push(tabela[i][2]);
            moda2.push(vetorPM[i - 1]);
            moda3.push(tabela[i][0]);
        }
        else if (tabela[i][2] > moda[moda.length - 1]) {
            moda.length = 0;
            moda.push(tabela[i][2]);
            moda2.length = 0;
            moda2.push(vetorPM[i - 1]);
            moda3.length = 0;
            moda3.push(tabela[i][0]);
        }
        else if (tabela[i][2] == moda[moda.length - 1]) {
            moda.push(tabela[i][2]);
            moda2.push(vetorPM[i - 1]);
            moda3.push(tabela[i][0]);
        }
    }

    //saida da media
    media = media / somaFrequencia;
    console.log("Esta é a media: " + media);

    //mediana
    comparacao = true;
    cont = 0;
    cont2 = 0;
    if (somaFrequencia % 2 == 1) {
        while (comparacao) {
            cont++;
            if (somaFrequencia / 2 <= tabela[cont][4]) {
                if (cont == 1) {
                    fanta == 0;
                }
                else {
                    fanta = tabela[cont - 1][4];
                }

                mediana = vetorMin[cont - 1] + (((somaFrequencia / 2 - fanta) / tabela[cont][2]) * intervalo);
                comparacao = false;
            }
        }
    }
    else {
        while (cont2 < 2) {
            cont++;
            if ((somaFrequencia / 2 + cont2) <= tabela[cont][4]) {
                if (cont == 1) {
                    fanta == 0;
                }
                else {
                    fanta = tabela[cont - 1][4];
                }

                mediana += vetorMin[cont - 1] + (((somaFrequencia / 2 - fanta) / tabela[cont][2]) * intervalo);
                cont2++;

                if ((somaFrequencia / 2 + cont2) <= tabela[cont][4] && cont2 < 2) {
                    mediana += vetorMin[cont - 1] + (((somaFrequencia / 2 - fanta) / tabela[cont][2]) * intervalo);
                    cont2++;
                }
            }
        }
        mediana = mediana / 2;
    }
    console.log("Mediana: " + mediana);

    //Saida da Moda Convencional
    if (moda2.length == tamanho) {
        valorModa = "Amodal";
        console.log(valorModa);
    }
    else {
        valorModa = moda2;
        console.log("A(s) moda(s) convencional(s) é(são): " + valorModa);

        //Moda de Pearson
        modaPearson = 3 * mediana - 2 * media;
        modaPearson = modaPearson.toFixed(2);
        console.log("A moda de Pearson é: " + modaPearson);

        //Moda de King e Czuber
        for (var i = 0; i < moda.length; i++) {
            if (moda3[i] != 1 && moda3[i] != tamanho) {
                fiant = tabela[moda3[i] - 1][2];
                fipos = tabela[moda3[i] + 1][2];
                modaKing.push(vetorMin[moda3[i] - 1] + (fipos / (fipos + fiant)) * intervalo);
                modaCzuber.push(vetorMin[moda3[i] - 1] + ((tabela[moda3[i]][2] - fiant)
                    / ((tabela[moda3[i]][2] - fiant) + (tabela[moda3[i]][2] - fipos))) * intervalo);
            }
            else if (tamanho == 1) {
                fiant = 0;
                fipos = 0;
                modaKing.push(vetorMin[moda3[i] - 1]);
                modaCzuber.push(vetorMin[moda3[i] - 1] + ((tabela[moda3[i]][2] - fiant)
                    / ((tabela[moda3[i]][2] - fiant) + (tabela[moda3[i]][2] - fipos))) * intervalo);
            }
            else if (moda3[i] == 1) {
                fiant = 0;
                fipos = tabela[moda3[i] + 1][2];
                modaKing.push(vetorMin[moda3[i] - 1] + (fipos / (fipos + fiant)) * intervalo);
                modaCzuber.push(vetorMin[moda3[i] - 1] + ((tabela[moda3[i]][2] - fiant)
                    / ((tabela[moda3[i]][2] - fiant) + (tabela[moda3[i]][2] - fipos))) * intervalo);
            }
            else if (moda3[i] == tamanho) {
                fiant = tabela[moda3[i] - 1][2];
                fipos = 0;
                modaKing.push(vetorMin[moda3[i] - 1] + (fipos / (fipos + fiant)) * intervalo);
                modaCzuber.push(vetorMin[moda3[i] - 1] + ((tabela[moda3[i]][2] - fiant)
                    / ((tabela[moda3[i]][2] - fiant) + (tabela[moda3[i]][2] - fipos))) * intervalo);
            }
        }
        console.log("A(s) moda(s) de King é(são): " + modaKing);
        console.log("A(s) moda(s) de Czuber é(são): " + modaCzuber);
    }

    //Desvio Padrão
    for (var i = 1; i <= tamanho; i++) {
        desvioPadrao += ((Math.pow(vetorPM[i - 1] - media, 2)) * tabela[i][2]);
    }
    if (processo == "populacao") {
        desvioPadrao = Math.sqrt(desvioPadrao / somaFrequencia);
    }
    else if (processo == "amostra") {
        desvioPadrao = Math.sqrt(desvioPadrao / (somaFrequencia - 1));
    }
    desvioPadrao = desvioPadrao.toFixed(2);
    coeficienteDeVariacao = (desvioPadrao / media) * 100;
    coeficienteDeVariacao = coeficienteDeVariacao.toFixed(2);
    console.log("O desvio padrão é de: " + desvioPadrao);
    console.log("O coeficiente de variação é de: " + coeficienteDeVariacao + "%");

    //Medida Separatriz
    medidaSeparatriz = Math.round((parseInt(medida) * somaFrequencia) / 100);
    comparacao = true;
    cont = 1;
    while (comparacao) {
        if (medidaSeparatriz <= tabela[cont][4]) {
            if (cont == 1) {
                fanta == 0;
            }
            else {
                fanta = tabela[cont - 1][4];
            }

            medidaSeparatriz = vetorMin[cont - 1] + (((medidaSeparatriz - fanta) / tabela[cont][2]) * intervalo);

            console.log(medida + "% dos dados são " + medidaSeparatriz + " ou menos.");
            console.log(100 - medida + "% dos dados são " + medidaSeparatriz + " ou mais.");
            comparacao = false;
        }
        cont++;
    }

    saidaDados(tabela, tamanho, media, mediana, valorModa, desvioPadrao, coeficienteDeVariacao, medida, medidaSeparatriz, tipo, modaCzuber, modaKing, modaPearson);
}

//função auxiliar da ordenação dos números da continua e discreta
function ordenaNum(a, b) {
    return a - b
}

//exibe a tabela, o gráfico e os dados analisados
function saidaDados(tabela, tamanho, media, mediana, valorModa, desvioPadrao, coeficienteDeVariacao, medida, medidaSeparatriz, variavel, modaCzuber, modaKing, modaPearson) {

    //insere a tabela na tela
    var table = document.createElement("table");
    var div = document.querySelector(".container");

    table.setAttribute("id", "tabelaDados");
    div.appendChild(table);

    var tr = document.createElement("tr");
    table.appendChild(tr);

    for (var i = 0; i < 6; i++) {
        var th = document.createElement("th");
        th.textContent = tabela[0][i];
        tr.appendChild(th);
    }

    for (var i = 1; i <= tamanho; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for (var x = 0; x < 6; x++) {
            var td = document.createElement("td");
            td.textContent = tabela[i][x];
            tr.appendChild(td);
        }
    }

    if (variavel == "discreta" || variavel == "continua") {

        var div2 = document.querySelector(".container2");
        var text;

        //insere a media
        var p = document.createElement("p");
        text = document.createTextNode("A media é: " + media);
        div2.appendChild(p);
        p.appendChild(text);

        //insere a mediana
        var p2 = document.createElement("p");
        text = document.createTextNode("A mediana é: " + mediana);
        div2.appendChild(p2);
        p2.appendChild(text);

        //insere a moda
        var p3 = document.createElement("p");
        if (valorModa == "Amodal") {
            text = document.createTextNode("Os dados são amodais");
        }
        else {
            text = document.createTextNode("A(s) modas são:" + valorModa);
        }
        div2.appendChild(p3);
        p3.appendChild(text);

        //insere as modas exclusivas da mediana
        if (variavel == "continua") {
            var p8 = document.createElement("p");
            text = document.createTextNode("A moda de Czuber é: " + modaCzuber);
            div2.appendChild(p8);
            p8.appendChild(text);

            var p9 = document.createElement("p");
            text = document.createTextNode("A moda de King é: " + modaKing);
            div2.appendChild(p9);
            p9.appendChild(text);

            var p10 = document.createElement("p");
            text = document.createTextNode("A moda de Peason é: " + modaPearson);
            div2.appendChild(p10);
            p10.appendChild(text);
        }

        //insere o desvio padrão
        var p4 = document.createElement("p");
        text = document.createTextNode("O desvio padrão é: " + desvioPadrao);
        div2.appendChild(p4);
        p4.appendChild(text);

        //insere o coeficiente de variação
        var p5 = document.createElement("p");
        text = document.createTextNode("O coeficiente de variação é" + mediana);
        div2.appendChild(p5);
        p5.appendChild(text);

        //insere a medida separatriz
        var p6 = document.createElement("p");
        text = document.createTextNode(medida + "% dos dados são  " + medidaSeparatriz + " ou menos");
        div2.appendChild(p6);
        p6.appendChild(text);
        var p7 = document.createElement("p");
        text = document.createTextNode(100 - medida + "% dos dados são  " + medidaSeparatriz + " ou mais");
        div2.appendChild(p7);
        p7.appendChild(text);
    }

    //gerar graficos
    var label = [], cores = [], valores = [], tipo, espaco = .9;

    for (var i = 1; i <= tamanho; i++) {
        label.push(tabela[i][1]);
        valores.push(tabela[i][3]);
        cores.push('rgb(' + Math.random() * 250 + ', ' + Math.random() * 250 + ', ' + Math.random() * 250 + ')')
    }

    if (variavel == "ordinal" || variavel == "nominal") {
        tipo = "pie";
    }
    else if (variavel == "discreta") {
        tipo = "bar";
    }
    else {
        tipo = "bar";
        espaco = 1.25;
    }

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: tipo,
        data: {
            labels: label,
            datasets: [{
                label: variavel,
                data: valores,
                backgroundColor: cores,
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                }],

                xAxes: [{
                    categotyPercentage: espaco,
                    barPercentage: espaco,
                }]
            },

            title: {
                display: true,
                text: 'Gráfico'
            },

        }
    });

}

//distribuição binomial
function distribuicaoBinomial() {
    var n, p, q, result = 0, k = [0, 1, 2];

    n = 30;
    q = 0.9;
    p = 0.1;

    for (var i = 0; i < k.length; i++) {
        if (k[i] != 0) {
            result += (fatorial(n) / (fatorial(k[i]) * fatorial(n - k[i]))) * (Math.pow(p, k[i]) * (Math.pow(q, n - k[i]))) * 100;
        }
        else {
            result += (Math.pow(q, n)) * 100;
        }
    }
    console.log("A probabilidade segundo a Distribuição Binomial é: " + result.toFixed(2));
}

function fatorial(num) {

    var fatorial = 1;

    for (var i = 1; i <= num; i++) {
        fatorial = fatorial * i;
    }

    return fatorial
}

//distribuição normal
function distribuicaoNormal() {
    
    var valores = [], cont = 0, media, dp, tipo, result;

    // tipo = "menor";
    // tipo = "maior";
    tipo = "entre";

    var num = [90];
    media = 90;
    dp = 5;

    if (tipo == "entre"){
        for(var i = 0; i < 2; i++){
            valores.push(buscaTabela(num[i], media, dp));
            if(num[i] > media){
                cont++;
            }
        }

        if(cont != 1){
            result = (Math.abs(valores[0] - valores[1])) * 100;
        }
        else{
            result = (valores[0] + valores[1]) * 100;            
        }
    }
    else if(tipo == "maior"){
        valores.push(buscaTabela(num[0], media, dp));

        if(num[0] > media){
            result = (Math.abs(0.5 - valores[0])) * 100;
        }
        else{
            result = (valores[0] + 0.5) * 100;            
        }
    }
    else if(tipo == "menor"){
        valores.push(buscaTabela(num[0], media, dp));

        if(num[0] > media){
            result = (valores[0] + 0.5) * 100;                
        }
        else{
            result = (Math.abs(0.5 - valores[0])) * 100;     
        }
    }

    console.log("A probabilidade segundo a Distribuição Normal é de: " + result + "%.");

}

function buscaTabela(num, media, dp){
    var tabelaCurvaNormal = [
        ["z", 0.0000, 1.0000, 2.0000, 3.0000, 4.0000, 5.0000, 6.0000, 7.0000, 8.0000, 9.0000],
        [0.0, 0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
        [0.1, 0.0389, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0754],
        [0.2, 0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
        [0.3, 0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
        [0.4, 0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
        [0.5, 0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
        [0.6, 0.2258, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2518, 0.2549],
        [0.7, 0.2580, 0.2612, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
        [0.8, 0.2881, 0.2910, 0.2939, 0.2967, 0.2996, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
        [0.9, 0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
        [1.0, 0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
        [1.1, 0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
        [1.2, 0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
        [1.3, 0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
        [1.4, 0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
        [1.5, 0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
        [1.6, 0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
        [1.7, 0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
        [1.8, 0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
        [1.9, 0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
        [2.0, 0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4893, 0.4808, 0.4812, 0.4817],
        [2.1, 0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857],
        [2.2, 0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
        [2.3, 0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
        [2.4, 0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
        [2.5, 0.4938, 0.4940, 0.4941, 0.4943, 0.4045, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
        [2.6, 0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
        [2.7, 0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
        [2.8, 0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
        [2.9, 0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
        [3.0, 0.4986, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
        [3.1, 0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
        [3.2, 0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
        [3.3, 0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
        [3.4, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
        [3.5, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
        [3.6, 0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.7, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.8, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.9, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000]
    ];

    var condicao = true, cont = 0, x, y, z;
    
    z = Math.abs(((num - media) / dp).toFixed(2));

    num = z.toString();

    x = num.substr(0, 3);
    y = num.substr(3, 1);

    while (condicao) {
        cont++;
        if (y == tabelaCurvaNormal[0][cont]) {
            y = cont;
            condicao = false;
            cont = 0;
        }
    }
    
    while (!condicao) {
        cont++;
        if (x == tabelaCurvaNormal[cont][0]) {
            x = cont;
            condicao = true;
            cont = 0
        }
    }

    return tabelaCurvaNormal[x][y]
}

//distribuicao uniforme
function distribuicaoUniforme(){
    var media, dp, cv, probabilidade, tipo, min, max, intervalo = [1000, 100];

    min = 800;
    max = 1800;
    tipo = "entre"

    media = (max + min )/2
    console.log(media);

    dp = Math.sqrt((Math.pow(max - min , 2))/12);

    cv = (dp / media) * 100;

    if (tipo == "menor"){
        probabilidade = (1 / (max - min)) * (intervalo[0] - min);
    }
    else if (tipo == "maior"){
        probabilidade = (1 / (max - min)) * (max - intervalo[0]);
    }
    else{
        probabilidade = (1 / (max - min)) * Math.abs(intervalo[0] - intervalo[1]);        
    }

    console.log("A probabilidadde segundo a Distribuição Uniforme é de: " + probabilidade * 100);
    console.log("A media é de: " + media);
    console.log("O desvio padrão é de: " + dp);
    console.log("O coeficiente de variação é de: " + cv);   

}

function correlacaoEregressao(){
    var variavelDependente = "preco apartamento", variavelndependente = "idade do imovel", 
        var1 = [300000, 400000, 320000, 450000], var2= [10, 8, 9, 6], x, y, r = 0,
        num = var1.length, somaX = 0, somaY = 0, somaXY = 0, somaX2 = 0, somaY2 = 0, a = 0, b = 0;

    for (var i =0; i < num; i++){
        somaX += var2[i];
        somaY += var1[i];
        somaXY += var1[i] * var2[i];
        somaX2 += Math.pow(var2[i], 2);
        somaY2 += Math.pow(var1[i], 2);
    }
            
    //correlação
    r = ((num * somaXY) - (somaX * somaY))/
        (Math.sqrt(((num * somaX2) - (Math.pow(somaX, 2))) * ((num * somaY2) - (Math.pow(somaY, 2)) )));
    
    console.log("Coeficiente de correlação linear: " + r.toFixed(2));

    //regressão
    a  = ((num * somaXY) - (somaX * somaY))/
         ((num * somaX2) - (Math.pow(somaX, 2)));

    b = (somaY / 4) - a * (somaX / 4);

    console.log("A equação da regrssão é: y = " + a.toFixed(2) + "x + " + b.toFixed(2) + ".");
}



