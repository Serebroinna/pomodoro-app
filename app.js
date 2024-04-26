//Se guardan todos los elementos HTML que vamos a manipular en constantes 
const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputMusica = document.querySelector('#alternar-musica');
const audio = new Audio('./sonidos/luna-rise-part-one.mp3');
const beep = new Audio('./sonidos/beep.mp3');
const play = new Audio('./sonidos/play.wav');
const pause = new Audio('./sonidos/pause.mp3');
const btnStarPause = document.querySelector('#start-pause');
const txtComenzarPausar = document.querySelector('#start-pause span');
const iconBotonComenzarPausar = document.querySelector('.app__card-primary-butto-icon');
const tempoEnPantalla = document.querySelector('#timer');
let tiempoEnSegundos = 0;
let idIntervalo = null;

botonCorto.addEventListener('click', () => {
    tiempoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
    
});

botonEnfoque.addEventListener('click', () => {
    tiempoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active')
    
});

botonLargo.addEventListener('click', () => {
    tiempoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
    
});

audio.loop = true; //hacemos loop para que se repita el audio hasta que lo pausemos
inputMusica.addEventListener('change', () => {
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
});

//funcion para cambiar el color de fondo, la imagen, texto de bienvenida y el foco en los botones
function cambiarContexto(contexto){
    mostrarTemporizador();
    html.setAttribute('data-contexto',contexto);
    
    //cambiar la imagen dinamicamente
    /* banner.setAttribute('src', `/imagenes/${contexto}.png`); */

    //recorremos la lista de botones y ejecutamos una funcion que remueva la clase active
    botones.forEach(function(x){
        x.classList.remove('active');
    });
    
    //Switch para cambiar dinamicamente el texto
    /* switch(contexto){
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case "descanso-corto": 
            titulo.innerHTML = `¿Que tal tomar un respiro?,<br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`;
            break;
        case "descanso-largo": 
            titulo.innerHTML = `Hora de volver a la superficie,<br>
            <strong class="app__title-strong">Haz una pausa larga.</strong>`;
            break;
    } */
}

//Logica para el temporizador
btnStarPause.addEventListener('click', iniciarPausar);

//Funcion de cuenta regresiva
const cuentaRegresiva = () => {
    if(tiempoEnSegundos <= 0){
        beep.play();
        reiniciar();
        return
    }
    tiempoEnSegundos -= 1; //subtraer 1 segundo
    mostrarTemporizador();
}

//Funcion de iniciar y pausar el temporizador
function iniciarPausar(){
    if(idIntervalo){
        pause.play();
        reiniciar();
        return
    }
    play.play();
    txtComenzarPausar.textContent = "Pause";
    cambiarIconoBtnComenzarPausar('pause');
    idIntervalo = setInterval(cuentaRegresiva,1000);
}

//Funcion para romper el flujo del temporizador
function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
    txtComenzarPausar.textContent = "Play";
    cambiarIconoBtnComenzarPausar('play_arrow');
}

function cambiarIconoBtnComenzarPausar(nombreImagen){
    iconBotonComenzarPausar.setAttribute('src',`./imagenes/${nombreImagen}.png`);
}

function mostrarTemporizador(){
    const tiempo = new Date(tiempoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit', second: '2-digit'});
    tempoEnPantalla.innerHTML = `<p>${tiempoFormateado}</p>`;
}

mostrarTemporizador();

