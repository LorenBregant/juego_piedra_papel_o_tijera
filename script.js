function eleccionBot() {
    const opciones = ["piedra", "papel", "tijera"];
    return opciones[Math.floor(Math.random() * opciones.length)]
}

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

let puntajeJugador = 0;
let puntajeComputadora = 0;

function actualizarPuntaje(ganador) {
    if (ganador == "usuario") {
        puntajeJugador++
    }
    else if (ganador == "computadora") {
        puntajeComputadora++
    }
}

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

function jugar(eleccionUsuario) {
    let eleccionComputadora = eleccionBot();
    let ganador = determinarGanador(eleccionUsuario, eleccionComputadora);
    actualizarPuntaje(ganador);
    let resultado = terminaPartida(puntajeJugador, puntajeComputadora);
    return {
            eleccionUsuario,
            eleccionComputadora,
            ganador,
            puntajeJugador,
            puntajeComputadora,
            resultado
        }
}

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

console.log(controlarPartida());