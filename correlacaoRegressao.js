function passarDados(){
    var dado = document.querySelectorAll(".dados")[0].value;
    window.localStorage.setItem("nomevar1", dado);

    dado = document.querySelectorAll(".dados")[1].value;
    window.localStorage.setItem("nomevar2", dado);

    dado = document.querySelectorAll(".dados")[2].value;
    window.localStorage.setItem("hist1", dado);

    dado = document.querySelectorAll(".dados")[3].value;
    window.localStorage.setItem("hist2", dado);
}

function correlacaoRegressao(tipo) {
    var variavelDependente, variavelIndependente,
        varx = [], vary = [], x, y, r = 0,
        somaX = 0, somaY = 0, somaXY = 0, somaX2 = 0, somaY2 = 0, a = 0, b = 0,
        scatter = [], line = [], maior, menor, forca, equacao;

    variavelIndependente = window.localStorage.getItem("nomevar1");
    variavelDependente = window.localStorage.getItem("nomevar2");
    varx = window.localStorage.getItem("hist1").split(";");
    vary = window.localStorage.getItem("hist2").split(";");
    
    for (var i = 0; i < vary.length; i++) {
        varx[i] = Number(varx[i]);
        vary[i] = Number(vary[i]);
        somaX += varx[i];
        somaY += vary[i];
        somaXY += vary[i] * varx[i];
        somaX2 += Math.pow(varx[i], 2);
        somaY2 += Math.pow(vary[i], 2);
    } 
    
    //correlação
    r = ((vary.length * somaXY) - (somaX * somaY)) /
        (Math.sqrt(((vary.length * somaX2) - (Math.pow(somaX, 2))) * ((vary.length * somaY2) - (Math.pow(somaY, 2)))));

    console.log("r:" + r)
    if (Math.abs(r) == 0) {
        console.log("Não existe relação");
        forca = "Não existe";
    }
    else if (Math.abs(r) < 0.3) {
        console.log("A relação é fraca.");
        forca = "Fraca";        
    }
    else if (Math.abs(r) < 0.6) {
        console.log("A relação é média");
        forca = "Media";                
    }
    else if (Math.abs(r) < 1) {
        console.log("A relação é forte");
        forca = "Forte";                        
    }
    else {
        console.log("A relação é perfeita");
        forca = "Perfeita";                                
    }

    console.log("Coeficiente de correlação linear: " + r.toFixed(2));

    //regressão
    a = ((vary.length * somaXY) - (somaX * somaY)) /
        ((vary.length * somaX2) - (Math.pow(somaX, 2)));

    b = (somaY / vary.length) - a * (somaX / vary.length);

    console.log("A equação da regrssão é: y = " + a.toFixed(2) + "x + " + b.toFixed(2) + ".");
    equacao = "y = " + a.toFixed(2) + "x + " + b.toFixed(2);

    //gerando dados do gráfico
    maior = vary[0];
    menor = vary[0];
    for (var i = 1; i < vary.length; i++) {
        if (vary[i] > maior) {
            maior = vary[i];
        }

        if (vary[i] < menor) {
            menor = vary[i];
        }
    }

    y = maior;
    x = (y - b)/a;
    line.push({ x, y });

    y = menor;
    x = (y - b)/a;
    line.push({ x, y });
    console.log(line);

    for (var i = 0; i < vary.length; i++) {
        scatter.push({ x: varx[i], y: vary[i] });
    }
    console.log(scatter);

    if (tipo == "2"){
        var dados = document.querySelector(".dados").value.split(";");
        if(document.querySelectorAll(".item")[0].checked){
            for (var i = 0; i < dados.length; i++){
                dados[i] = Number(dados[i]);
                x = dados[i];
                y = a * x + b;
                scatter.push({ x: x, y: y });
            }
        }
        else{
            for (var i = 0; i < dados.length; i++){
                dados[i] = Number(dados[i]);
                y = dados[i];
                x = (y - b)/a;
                scatter.push({ x: x, y: y });
            }
        }
        document.querySelector(".dados").value = "";
    }

    saidaDadosGraficosCorrelacao(scatter, line, r, forca, equacao);
}

function saidaDadosGraficosCorrelacao(scatter, line, r, forca, equacao){

    var main = document.querySelector(".main");
    var container = document.querySelector(".container");
    
    var p = document.createElement("p");
        text = document.createTextNode("O coeficiente de variação é:" + r.toFixed(2));
        container.appendChild(p);
        p.appendChild(text);

    var p = document.createElement("p");
        text = document.createTextNode("O nível de correlação das variáveis é: " + forca);
        container.appendChild(p);
        p.appendChild(text);

    var p = document.createElement("p");
        text = document.createTextNode("A equação da reta é: " + equacao);
        container.appendChild(p);
        p.appendChild(text);

    var ctx = document.getElementById("myChart");
    var mixedChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'scatter',
                data: scatter,
                backgroundColor: "rgba(255,0,0,1)"
            },
            {
                type: 'line',
                label: 'Line Dataset',
                data: line,
                showLine: true,
                backgroundColor: "rgba(0,0,255,0)",
                pointBorderColor: "rgba(0,0,255,0)",                
                borderColor: "rgba(0,0,255,.5)"                

            },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                }],
                xAxes: [{
                }]
            }
        }
    });
}