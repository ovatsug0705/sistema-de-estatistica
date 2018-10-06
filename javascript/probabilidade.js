//distribuição binomial
function distribuicaoBinomial() {
    var n, p, q, result = 0, k = [];

    n = document.querySelector("#n").value;
    k = document.querySelector("#k").value;
    p = document.querySelector("#p").value;
    q = document.querySelector("#q").value;

    k = k.split(";")

    n = Number(n);
    p = Number(p);
    q = Number(q);
    for (var i = 0; i < k.length; i++) {
        k[i] = Number(k[i]);
    }

    for (var i = 0; i < k.length; i++) {
        if (k[i] != 0) {
            result += (fatorial(n) / (fatorial(k[i]) * fatorial(n - k[i]))) * (Math.pow(p, k[i]) * (Math.pow(q, n - k[i]))) * 100;
        }
        else {
            result += (Math.pow(q, n)) * 100;
        }
    }

    var paragraph = document.querySelectorAll(".result__paragraph")[0];
    paragraph.innerHTML = "A probabilidade segundo a Distribuição Binomial é de: " + result.toFixed(2) + "%.";
    document.querySelectorAll(".result")[0].style.border = "1px solid #039BE5";
    paragraph.style.padding = "20px";
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

    if (document.querySelector("#menor_que").checked) {
        tipo = document.querySelector("#menor_que").value;
    }
    else if (document.querySelector("#entre").checked) {
        tipo = document.querySelector("#entre").value;
    }
    else {
        tipo = document.querySelector("#maior_que").value;
    }

    media = document.querySelector("#media").value;
    dp = document.querySelector("#dp").value;
    num = document.querySelector("#dados").value.split(";");

    media = Number(media);
    dp = Number(dp);
    for (var i = 0; i < num.length; i++) {
        num[i] = Number(num[i]);
    }

    if (tipo == "entre") {
        for (var i = 0; i < 2; i++) {
            valores.push(buscaTabela(num[i], media, dp));
            if (num[i] > media) {
                cont++;
            }
        }

        if (valores[0] == 1) {
            result = "Não é possível calcular a Distribuição normal";
        }
        else if (cont != 1) {
            result = (Math.abs(valores[0] - valores[1])) * 100;
        }
        else {
            result = (valores[0] + valores[1]) * 100;
        }
    }
    else if (tipo == "maior") {
        valores.push(buscaTabela(num[0], media, dp));

        if (valores[0] == 1) {
            result = "Não é possível calcular a Distribuição normal";
        }
        else if (num[0] > media) {
            result = (Math.abs(0.5 - valores[0])) * 100;
        }
        else {
            result = (valores[0] + 0.5) * 100;
        }
    }
    else if (tipo == "menor") {
        valores.push(buscaTabela(num[0], media, dp));

        if (valores[0] == 1) {
            result = "Não é possível calcular a Distribuição normal";
        }
        else if (num[0] > media) {
            result = (valores[0] + 0.5) * 100;
        }
        else {
            result = (Math.abs(0.5 - valores[0])) * 100;
        }
    }

    var p = document.querySelectorAll(".result__paragraph")[0];
    p.innerHTML = "A probabilidade segundo a Distribuição Normal é de: " + result.toFixed(2) + "%.";

    document.querySelectorAll(".result__paragraph")[0].style.padding = "20px";
    document.querySelectorAll(".result")[0].style.border = "1px solid #039BE5";
}

function buscaTabela(num, media, dp) {
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

    if (z < 4) {
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
    else {
        return 1
    }

}

//distribuicao uniforme
function distribuicaoUniforme() {
    var media, dp, cv, probabilidade, tipo, min, max, intervalo = [];

    if (document.querySelector("#menor_que").checked) {
        tipo = document.querySelector("#menor_que").value;
    }
    else if (document.querySelector("#entre").checked) {
        tipo = document.querySelector("#entre").value;
    }
    else {
        tipo = document.querySelector("#maior_que").value;
    }

    max = document.querySelector("#max").value;
    min = document.querySelector("#min").value;
    intervalo = document.querySelector("#dados").value.split(";");

    max = Number(max);
    min = Number(min);
    for (var i = 0; i < intervalo.length; i++) {
        intervalo[i] = Number(intervalo[i]);
    }

    media = (max + min) / 2;

    dp = Math.sqrt((Math.pow(max - min, 2)) / 12);

    cv = (dp / media) * 100;

    if (tipo == "menor") {
        probabilidade = (1 / (max - min)) * (intervalo[0] - min);
    }
    else if (tipo == "maior") {
        probabilidade = (1 / (max - min)) * (max - intervalo[0]);
    }
    else {
        probabilidade = (1 / (max - min)) * Math.abs(intervalo[0] - intervalo[1]);
    }

    var p = document.querySelectorAll(".result__paragraph")[0];
    p.innerHTML = "A probabilidadde segundo a Distribuição Uniforme é de: " + (probabilidade * 100).toFixed(2) + "%";

    var p = document.querySelectorAll(".result__paragraph")[1];
    p.innerHTML = "A media é de: " + media.toFixed(2);

    var p = document.querySelectorAll(".result__paragraph")[2];
    p.innerHTML = "O desvio padrão é de: " + dp.toFixed(2);

    var p = document.querySelectorAll(".result__paragraph")[3];
    p.innerHTML = "O coeficiente de variação é de: " + cv.toFixed(2) + "%";

    for (var i = 0; i < 4; i++) {
        document.querySelectorAll(".result__paragraph")[i].style.padding = "25px";
        document.querySelectorAll(".result")[i].style.border = "1px solid #039BE5";
    }

}