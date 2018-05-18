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
/*
4;4;5;6;7;7;8;9;5;4;4;7;7;7;9;9;9;9;4;7

0;0;0;1;1;1;1;1;1;1;0;0;0;0;0;1;1;1;0;2;2;2;2;2;3;3;0;0;0;0

0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;1;2;2;2;2;2;2;2;2;2;2;2;2;2;2;2;2;2;2;2;2;3;3;3;3;3;3;3;3;3;3;3;3;3;3;4;4;4;4;4;4;4;4;4;4;5;5;5;5;5;5;5;6;6;6;6;6;6;6;6;6

590;430;320;500;310;320;390;450;570;580;410;430;390;380;510;515;335;570;600;300;437;578;572;480;462;380;413;457;530;510

20;32;42;50;47;52;57;32;60;32;25;28;35;37;46;55;42;31;48;54

37;20;37;42;50;54;47;29;32;35;42;40;43;54;42;51;60;53;37;32;29;27;34;33;32;42;43;54;56;41

17;22;10;14;13;15;16;18;12

es;em;ef;ef;ef;em;em;em;em;es

f;m;f;m;m;m;m;m;f;f

20;20;20;20;30;30;30;30;30;30;30;40;30;40;40;40;50;40;30;50

12;15;13;33;35;16;17;22;24;26;28

58;58;59;59;59;51;55;59;54;56;59;59;59;53

76;75;75;77;79;79;71;76;76;73;75;77

gustavo;julia;larissa;lidiane;bruno;fulvio;guimaraes;fatima;bruno;gustavo;lidiane;julia;julia

85;79;64;76;80;74;77;72

//bom;regular;regular;bom;bom;bom;ruim;regular;ruim;ruim

ru;ru;ru;ru;ru;ru;re;re;re;re;re;re;re;re;re;re;re;re;o;o;o;o;o;o;o;o;o;o;o;o;o;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b;b

6;6;5;5;5;5;2;2;2;2;4;4;4;3;3;3;3;3;3;3

30;35;37;39;38;36;39;28;25;29;27;21;24;23;26;25;20;10;16;45;49;41;55;56;52;53;58;57;54;59
*/