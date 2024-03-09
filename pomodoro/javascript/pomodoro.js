//conexion con HTML por medio del id

let reloj1 = document.getElementById("reloj");
let ciclosInput = document.getElementById("ciclos-input");
let inicioButton = document.getElementById("inicio-button");
let tiempo = document.getElementById("tiempo");
let pausa1 = document.getElementById("pausa");
let descanso = document.getElementById("descanso");


//evento que se ejecuta despues de que el HTML funcione

window.onload = () => {

//asigna funciones al clickear el boton

    inicioButton.onclick = () => {
        variables();
        inicioPomodoro();
    };


    let currentTime; /* minutos preparados */
    let seconds = 0;

//logica del temporizador

    function timer(){
        if(currentTime > 0 || seconds > 0){
            if (seconds == 0) {
                seconds = 59;
                currentTime--;
            } else {
                seconds--;
            }
            relojUpdate();
            console.log(currentTime, seconds);
            setTimeout(timer, 1000);
        } else{
            pomodoroController();
        }
    }


//pomodoro

    let trabajo;
    let pausa;
    let breaklargo;
    let tiemposcompletados;
    let ciclos;
    let cicloscompletados = 0;

    function pomodoroController(){
        if(isRestTime()){
            cicloscompletados++;
            if(!goalReached()){
                currentTime = breaklargo;
                timer();
                tiemposcompletados = 0;
            }else{
                console.log('pomodoro finalizado!');
            }
            return;
        }
        if(tiemposcompletados % 2 == 0){
            currentTime = trabajo;
            tiemposcompletados++;
            timer();
            console.log('hora de trabajar!' + tiemposcompletados);
        } else {
            currentTime = pausa;
            tiemposcompletados++;
            timer();
            console.log("momento de un break" + tiemposcompletados);
        }
    }

    function isRestTime() {
        return tiemposcompletados == 7;
    }

    function goalReached(){
        return ciclos == cicloscompletados;
    }

    function inicioPomodoro(){
        console.log('ya inicio el pomodoro');
        pomodoroController();
    }

    //asignar valores

    function variables(){
        console.log('valorar las variables');
        trabajo = tiempo.value;
        pausa = pausa1.value;
        breaklargo = descanso.value;
        ciclos = ciclosInput.value;
        tiemposcompletados = 0;
    }


    //tiempo
    let relojMinutos;
    let relojSegundos;

    function relojUpdate(){
        relojMinutos = formatNumbers(currentTime);
        relojSegundos = formatNumbers(seconds);
        reloj1.innerHTML = relojMinutos + ":" + relojSegundos;
    }

    
//funcion para que los numeros siempre tengan dos digitos

    function formatNumbers(time){
        let digitos;
        if(time < 10){
            digitos = "0" + time;
        } else{
            digitos = time;
        }
        return digitos;
    }
};
