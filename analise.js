function passardados() {

    //dados para o processo
    var dado = document.querySelector("#data_input").value;
    window.localStorage.setItem("dados", dado);

    //tipo da variavel
    if (document.querySelector("#nominal").checked) {
        dado = document.querySelector("#nominal").value;
        window.localStorage.setItem("variavel", dado);
    }
    else if (document.querySelector("#ordinal").checked) {
        dado = document.querySelector("#ordinal").value;
        window.localStorage.setItem("variavel", dado);
        dado = document.querySelector("#ordem_ordinal").value;
        window.localStorage.setItem("ordinal", dado);
    }
    else if (document.querySelector("#discreta").checked) {
        dado = document.querySelector("#discreta").value;
        window.localStorage.setItem("variavel", dado);
    }
    else if (document.querySelector("#continua").checked) {
        dado = document.querySelector("#continua").value;
        window.localStorage.setItem("variavel", dado);
    }

    //censo ou estimação
    if (document.querySelector("#processo1").checked) {
        dado = document.querySelector("#processo1").value;
        window.localStorage.setItem("dadoestatistico", dado);
    }
    else {
        dado = document.querySelector("#processo2").value;
        window.localStorage.setItem("dadoestatistico", dado);
    }

    //nome variavel e nome frequencia
    dado = document.querySelector("#nome_var").value;
    window.localStorage.setItem("nomevariavel", dado);

    dado = document.querySelector("#nome_freq").value;
    window.localStorage.setItem("nomefrequencia", dado);

    //valor medida separatriz
    dado = document.querySelector("#medida_separatriz").value;
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
    tabela.unshift(["Classe", nomeVar, nomeFreq, "Frequência Simples Percentual(%)",
        "Frequência Acumulada", "Frequência Acumulada Percentual(%)"])

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
        medidaSeparatriz = medidaSeparatriz.toFixed(2);
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
    amp = Math.round(amp);
    console.log("amplitude: " + amp);

    //Número de classes
    classe = Math.floor(Math.sqrt(dados2.length));
    classes = [classe, classe - 1, classe + 1];

    console.log("classer: " + classes);
    

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
    tabela.unshift(["Classe", nomeVar, nomeFreq, "Frequência Simples Percentual(%)",
        "Frequência Acumulada", "Frequência Acumulada Percentual(%)"])

    console.log(tabela);

    //media e Moda Convencional

    for (var i = 1; i <= tamanho; i++) {
        media += vetorPM[i - 1] * tabela[i][2];

        if (i == 1) {
            moda.push(tabela[i][2]);
            moda2.push(vetorPM[i - 1]).toFixed(2);
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
            moda2.push(vetorPM[i - 1]).toFixed(2);
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

            modaKing[i] = modaKing[i].toFixed(2);
            modaCzuber[i] = modaCzuber[i].toFixed(2);
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
    medidaSeparatriz = medidaSeparatriz.toFixed(2);

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
    var div = document.querySelector(".table");    

    table.setAttribute("class", "data__table");
    div.appendChild(table);

    var tr = document.createElement("tr");
    tr.setAttribute("class","data__table_row-header");
    table.appendChild(tr);

    for (var i = 0; i < 6; i++) {
        var th = document.createElement("th");
        th.setAttribute("class","data__table_header");
        th.textContent = tabela[0][i];
        tr.appendChild(th);
    }

    for (var i = 1; i <= tamanho; i++) {
        var tr = document.createElement("tr");
        tr.setAttribute("class","data__table_row");        
        table.appendChild(tr);
        for (var x = 0; x < 6; x++) {
            var td = document.createElement("td");
            td.setAttribute("class","data__table_data");
            td.textContent = tabela[i][x];
            tr.appendChild(td);
        }
    }

    if (variavel == "discreta" || variavel == "continua") {

        var div2 = document.querySelector(".container");

        //insere a media
        var container = document.createElement("div");
        container.setAttribute("class", "container__result");
        div2.appendChild(container);
        var title = document.createElement("h3");
        title.setAttribute("class", "container__result_title");
        title.textContent = "Média"
        container.appendChild(title);
        var p = document.createElement("p");
        p.setAttribute("class", "container__result_data");
        p.textContent = media.toFixed(2);
        container.appendChild(p);

        //insere a mediana
        var container = document.createElement("div");
        container.setAttribute("class", "container__result");
        div2.appendChild(container);
        var title = document.createElement("h3");
        title.setAttribute("class", "container__result_title");
        title.textContent = "Mediana"
        container.appendChild(title);
        var p = document.createElement("p");
        p.setAttribute("class", "container__result_data");
        p.textContent = mediana.toFixed(2);
        container.appendChild(p);

        //insere a moda
        var container = document.createElement("div");
        container.setAttribute("class", "container__result");
        div2.appendChild(container);
        var title = document.createElement("h3");
        title.setAttribute("class", "container__result_title");
        title.textContent = "Moda"
        container.appendChild(title);
        var p = document.createElement("p");
        p.setAttribute("class", "container__result_data");
        p.textContent = valorModa;
        container.appendChild(p);

        //insere as modas exclusivas da mediana
        if (variavel == "continua") {
            var container = document.createElement("div");
            container.setAttribute("class", "container__result");
            div2.appendChild(container);
            var title = document.createElement("h3");
            title.setAttribute("class", "container__result_title");
            title.textContent = "Moda de Czuber"
            container.appendChild(title);
            var p = document.createElement("p");
            p.setAttribute("class", "container__result_data");
            p.textContent = modaCzuber;
            container.appendChild(p);

            var container = document.createElement("div");
            container.setAttribute("class", "container__result");
            div2.appendChild(container);
            var title = document.createElement("h3");
            title.setAttribute("class", "container__result_title");
            title.textContent = "Moda de King"
            container.appendChild(title);
            var p = document.createElement("p");
            p.setAttribute("class", "container__result_data");
            p.textContent = modaKing;
            container.appendChild(p);

            var container = document.createElement("div");
            container.setAttribute("class", "container__result");
            div2.appendChild(container);
            var title = document.createElement("h3");
            title.setAttribute("class", "container__result_title");
            title.textContent = "Moda de Pearson"
            container.appendChild(title);
            var p = document.createElement("p");
            p.setAttribute("class", "container__result_data");
            p.textContent = modaPearson;
            container.appendChild(p);
        }

        //insere o desvio padrão
        var container = document.createElement("div");
        container.setAttribute("class", "container__result");
        div2.appendChild(container);
        var title = document.createElement("h3");
        title.setAttribute("class", "container__result_title");
        title.textContent = "Desvio Padrão"
        container.appendChild(title);
        var p = document.createElement("p");
        p.setAttribute("class", "container__result_data");
        p.textContent = desvioPadrao;
        container.appendChild(p);
        
        //insere o coeficiente de variação
        var container = document.createElement("div");
        container.setAttribute("class", "container__result");
        div2.appendChild(container);
        var title = document.createElement("h3");
        title.setAttribute("class", "container__result_title");
        title.textContent = "Coeficiente de Variação"
        container.appendChild(title);
        var p = document.createElement("p");
        p.setAttribute("class", "container__result_data");
        p.textContent = coeficienteDeVariacao + "%.";
        container.appendChild(p);

        //insere a medida separatriz
        var container = document.createElement("div");
        container.setAttribute("class", "container__result container__result--separatriz");
        div2.appendChild(container);
        var title = document.createElement("h3");
        title.setAttribute("class", "container__result_title");
        title.textContent = "Medida Separatriz"
        container.appendChild(title);
        var p = document.createElement("p");
        p.setAttribute("class", "container__result_data");
        p.textContent = medida + "% dos dados são  " + medidaSeparatriz + " ou menos";
        container.appendChild(p);
        var p = document.createElement("p");
        p.setAttribute("class", "container__result_data");
        p.textContent = 100 - medida + "% dos dados são  " + medidaSeparatriz + " ou mais";
        container.appendChild(p);
    }

    gerarGraficos(tamanho, variavel, tabela)
}

//gerar graficos
function gerarGraficos(tamanho, variavel, tabela) {
    var paletaCores = [
        "#D50000", "#FFFF00", "#1B5E20", "#03A9F4", "#FF6F00", 
        "#F50057", "#18FFFF", "#6200EA", "#1A237E", "#76FF03", 
        "#607D8B", "#76FF03", "#004D40", "#9C27B0", "#C6FF00" 
    ]
    var label = [], cores = [], valores = [], tipo, espaco = .9, cont = 0;

    for (var i = 1; i <= tamanho; i++) {
        label.push(tabela[i][1]);
        valores.push(tabela[i][3]);
        if (cont < paletaCores.length){
            cores.push(paletaCores[cont]);
        }
        else {
            cont = 0;
            cores.push(paletaCores[cont]);
        }
        cont++;
    }

    if (variavel == "ordinal" || variavel == "nominal") {
        tipo = "pie"
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: label,
                datasets: [{
                    data: valores,
                    backgroundColor: cores,
                }],
            },
            options: {
                label: {
                    display: false,
                },
            }
        });
    }
    else if (variavel == "discreta") {
        tipo = "bar";
    }
    else {
        tipo = "bar";
        espaco = 1.25;
    }

    if (tipo != "pie") {
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: tipo,
            data: {
                labels: label,
                datasets: [{
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

                label: {
                    display: false,
                },

            }
        });
    }

}






