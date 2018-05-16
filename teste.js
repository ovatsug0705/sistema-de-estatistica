 // comparacao = 0;
    // for (var i = 1; i <= tamanho; i++) {
    //     if (somaFrequencia % 2 == 1) {
    //         if (somaFrequencia / 2 <= tabela[i][4]) {
    //             if (i == 1) {
    //                 fanta = 0;
    //             }
    //             else {
    //                 fanta = tabela[i - 1][4];
    //             }

    //             mediana = vetorMin[i - 1] + (((somaFrequencia / 2 - fanta) / tabela[i][2]) * intervalo);
    //             console.log("A mediana é: " + mediana);

    //             i = tamanho;
    //         }
    //     }
    //     else {
    //         if (somaFrequencia / 2 <= tabela[i][4] && comparacao == 0) {
    //             if (i == 1) {
    //                 fanta = 0;
    //             }
    //             else {
    //                 fanta = tabela[i - 1][4];
    //             }

    //             mediana = vetorMin[i - 1] + (((somaFrequencia / 2 - fanta) / tabela[i][2]) * intervalo);

    //             comparacao = 1;
    //         }

    //         if (somaFrequencia / 2 + 1 <= tabela[i][4] && comparacao == 1) {
    //             if (i == 1) {
    //                 fanta = 0;
    //             }
    //             else {
    //                 fanta = tabela[i - 1][4];
    //             }

    //             mediana += vetorMin[i - 1] + (((somaFrequencia / 2 - fanta) / tabela[i][2]) * intervalo);
    //             mediana = mediana / 2;

    //             console.log("A mediana é: " + mediana);
    //             comparacao = 2;
    //         }
    //     }
    // }