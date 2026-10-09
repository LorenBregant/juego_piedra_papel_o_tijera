// Elige aleatoriamente una opción para la computadora.
function eleccionBot() {
    const opciones = ["piedra", "papel", "tijera"];
    return opciones[Math.floor(Math.random() * opciones.length)]
}

// Determina quién gana la ronda según las elecciones del usuario y la computadora.
function determinarGanador(eleccionUsuario, eleccionBot) {
    let ganador;
    if (eleccionUsuario == eleccionBot) {
        ganador = "empate"
    }
    else if (eleccionUsuario == "piedra" && eleccionBot == "tijera") {
        ganador = "usuario"
    }
    else if (eleccionUsuario == "tijera" && eleccionBot == "papel") {
        ganador = "usuario"
    }
    else if (eleccionUsuario == "papel" && eleccionBot == "piedra") {
        ganador = "usuario"
    }
    else {
        ganador = "computadora"
    }
    return ganador;

}

// Guarda los puntajes actuales y el estado de la partida.
let puntajeJugador = 0;
let puntajeComputadora = 0;
let partidaTerminada = false;

// Aumenta un punto al ganador de la ronda; si hay empate, no modifica el puntaje.
function actualizarPuntaje(ganador) {
    if (ganador == "usuario") {
        puntajeJugador++
    }
    else if (ganador == "computadora") {
        puntajeComputadora++
    }
}

// Comprueba si algún participante llegó a 5 puntos y devuelve el estado de la partida.
function terminaPartida(puntJug, puntBot) {
    if (puntJug == 5) {
        return "Ganador Jugador";
    }
    else if (puntBot == 5) {
        return "Ganador Computadora";
    }
    else {
        return "Continuar Partida"
    }

}

// Ejecuta una ronda, actualiza el puntaje, comprueba si terminó la partida y devuelve sus resultados.
function jugar(eleccionUsuario) {
    if (partidaTerminada) {
        return {
            resultado: "Partida Terminada"
        };
    }
    let eleccionComputadora = eleccionBot();
    let ganador = determinarGanador(eleccionUsuario, eleccionComputadora);
    actualizarPuntaje(ganador);
    let resultado = terminaPartida(puntajeJugador, puntajeComputadora);
    if (resultado == "Ganador Jugador" || resultado == "Ganador Computadora") {
        partidaTerminada = true;
    }
    return {
        eleccionUsuario,
        eleccionComputadora,
        ganador,
        puntajeJugador,
        puntajeComputadora,
        resultado
    };
}

// Juega rondas automáticamente hasta que el usuario o la computadora llega a 5 puntos.
function controlarPartida() {
    let eleccionUsuario = "tijera";
    let resultadoPartida = jugar(eleccionUsuario);
    if (resultadoPartida.resultado == "Continuar Partida") {
        return controlarPartida();
    }
    else {
        return resultadoPartida;
    }
}

// Reinicia los puntajes y habilita una nueva partida.
function reiniciarPartida() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    partidaTerminada = false;
}

// Crea el menú inicial con título, descripción y botón de inicio.
function crearMenuInicial() {
    const aplicacion = document.getElementById("app");

    const titulo = document.createElement("h1");
    titulo.textContent = "Piedra, Papel o Tijera";

    const descripcion = document.createElement("p");
    descripcion.textContent = "Elige tu mano y compite contra la computadora. ¡El primero en llegar a 5 puntos gana!";

    const botonIniciar = document.createElement("button");
    botonIniciar.textContent = "Iniciar Juego";

    aplicacion.appendChild(titulo);
    aplicacion.appendChild(descripcion);
    aplicacion.appendChild(botonIniciar);
}

crearMenuInicial();