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
// function controlarPartida() {
//     let eleccionUsuario = "tijera";
//     let resultadoPartida = jugar(eleccionUsuario);
//     if (resultadoPartida.resultado == "Continuar Partida") {
//         return controlarPartida();
//     }
//     else {
//         return resultadoPartida;
//     }
// }

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

    // Descripción para el usuario.
    const descripcion = document.createElement("p");
    descripcion.textContent = "Elige tu mano y compite contra la computadora. ¡El primero en llegar a 5 puntos gana!";

    const botonIniciar = document.createElement("button");
    botonIniciar.textContent = "Iniciar Juego";

    botonIniciar.addEventListener("click", function () {
        const aplicacion = document.getElementById("app");
        aplicacion.replaceChildren();

        crearPantallaJuego();
    })

    aplicacion.appendChild(titulo);
    aplicacion.appendChild(descripcion);
    aplicacion.appendChild(botonIniciar);
}

function crearPantallaJuego() {
    const aplicacion = document.getElementById("app");

    const titulo = document.createElement("h1");
    titulo.textContent = "Juega!";

    // Puntajes de usuario
    const marcadorUsuario = document.createElement("p");
    marcadorUsuario.id = "marcadorUsuario";
    marcadorUsuario.textContent = "Jugador: 0";

    // Puntajes de computadora
    const marcadorComputadora = document.createElement("p");
    marcadorComputadora.id = "marcadorComputadora";
    marcadorComputadora.textContent = "Computadora: 0";

    // Contenedor de los marcadores.
    const marcador = document.createElement("div");
    marcador.id = "marcador";

    // Agrupa los puntajes de ambos participantes.
    marcador.appendChild(marcadorUsuario);
    marcador.appendChild(marcadorComputadora);

    // Instrucción para el usuario.
    const descripcion = document.createElement("p");
    descripcion.textContent = "Elige tu opción:";

    // Todos los botones.
    const botones = document.createElement("div");
    botones.id = "botones";

    // Botón piedra.
    const btnPiedra = document.createElement("button");
    btnPiedra.id = "btnPiedra";
    btnPiedra.addEventListener("click", function () {
        procesarJugada("piedra");
    });
    const imagenPiedra = document.createElement("img");
    imagenPiedra.src = "img/piedra.png";
    imagenPiedra.alt = "Piedra";

    btnPiedra.appendChild(imagenPiedra);

    // Botón papel.
    const btnPapel = document.createElement("button");
    btnPapel.id = "btnPapel";
    btnPapel.addEventListener("click", function () {
        procesarJugada("papel");
    });
    const imagenPapel = document.createElement("img");
    imagenPapel.src = "img/papel.png";
    imagenPapel.alt = "Papel";

    btnPapel.appendChild(imagenPapel);

    // Botón tijera.
    const btnTijera = document.createElement("button");
    btnTijera.id = "btnTijera";
    btnTijera.addEventListener("click", function () {
        procesarJugada("tijera");
    });
    const imagenTijera = document.createElement("img");
    imagenTijera.src = "img/tijera.png";
    imagenTijera.alt = "Tijera";

    btnTijera.appendChild(imagenTijera);

    // Resultado de cada ronda.
    const resultadoRonda = document.createElement("p");
    resultadoRonda.id = "resultadoRonda";
    resultadoRonda.textContent = "Espera tu elección...";

    const imgUsuario = document.createElement("img");
    imgUsuario.id = "imgUsuario";
    imgUsuario.alt = "Elección del jugador";
    imgUsuario.hidden = true;

    const imgComputadora = document.createElement("img");
    imgComputadora.id = "imgComputadora";
    imgComputadora.alt = "Elección de la computadora";
    imgComputadora.hidden = true;

    const zonaElecciones = document.createElement("div");
    zonaElecciones.id = "zonaElecciones";

    zonaElecciones.appendChild(imgUsuario);
    zonaElecciones.appendChild(imgComputadora);

    // Resultado final.
    const resultadoFinal = document.createElement("p");
    resultadoFinal.id = "resultadoFinal";

    botones.appendChild(btnPiedra);
    botones.appendChild(btnPapel);
    botones.appendChild(btnTijera);

    aplicacion.appendChild(titulo);
    aplicacion.appendChild(marcador);
    aplicacion.appendChild(descripcion);
    aplicacion.appendChild(botones);
    aplicacion.appendChild(resultadoRonda);
    aplicacion.appendChild(resultadoFinal);
    aplicacion.appendChild(zonaElecciones);
}

function procesarJugada(eleccionUsuario) {
    const resultado = jugar(eleccionUsuario);

    if (resultado.resultado == "Partida Terminada") {
        return;
    }

    const imgUsuario = document.getElementById("imgUsuario");
    const imgComputadora = document.getElementById("imgComputadora");

    imgUsuario.src = "img/" + resultado.eleccionUsuario + ".png";
    imgUsuario.hidden = false;
    imgComputadora.src = "img/" + resultado.eleccionComputadora + ".png";
    imgComputadora.hidden = false;

    const aplicacion = document.getElementById("app");
    const marcadorUsuario = document.getElementById("marcadorUsuario");
    const marcadorComputadora = document.getElementById("marcadorComputadora");
    const resultadoRonda = document.getElementById("resultadoRonda");

    marcadorUsuario.textContent = "Jugador: " + resultado.puntajeJugador;
    marcadorComputadora.textContent = "Computadora: " + resultado.puntajeComputadora;

    if (resultado.ganador == "empate") {
        resultadoRonda.textContent = "Empate! Ambos eligieron " + resultado.eleccionUsuario;
    }
    else if (resultado.ganador == "usuario") {
        resultadoRonda.textContent = "Ganaste! Elegiste " + resultado.eleccionUsuario + " y la computadora eligió " +
            resultado.eleccionComputadora;
    }
    else {
        resultadoRonda.textContent = "Perdiste! Elegiste " + resultado.eleccionUsuario + " y la computadora eligió " +
            resultado.eleccionComputadora;
    }

    if (resultado.resultado == "Ganador Jugador" || resultado.resultado == "Ganador Computadora") {
        const resultadoFinal = document.getElementById("resultadoFinal");

        document.getElementById("btnPiedra").disabled = true;
        document.getElementById("btnPapel").disabled = true;
        document.getElementById("btnTijera").disabled = true;

        if (resultado.resultado == "Ganador Jugador") {
            resultadoFinal.textContent = "Ganaste la partida.";
        }
        else {
            resultadoFinal.textContent = "La computadora ganó la partida.";
        }

        const btnReiniciar = document.createElement("button");
        btnReiniciar.textContent = "Reiniciar Partida";
        btnReiniciar.addEventListener("click", function () {
            reiniciarPartida();
            aplicacion.replaceChildren();
            crearPantallaJuego();
        });

        aplicacion.appendChild(btnReiniciar);
    };
}

crearMenuInicial();