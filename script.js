let mazo = [];

const figuras = ["C", "D", "H", "S"];
const alfabeticos = ["A", "J", "Q", "K"];

let valores_jugador = [];
let cartas_maquina = [];

let puntucion_jugador = 0;
let puntuacion_maquina = 0;

// Botones
const boton_iniciar_juego = document.getElementById("boton_juego_nuevo");
const boton_pedir = document.getElementById("boton_pedir_carta");
const boton_plantarse = document.getElementById("boton_plantarse");
const mesa_jugador = document.getElementById("cartas_jugador");
const mesa_pc = document.getElementById("cartas_pc");
const lbl_puntos_jugador = document.getElementById("puntos_jugador");
const lbl_puntos_pc = document.getElementById("puntos_pc");

// =======================
// CALCULAR PUNTOS
// =======================

const suma = (cartas) => {
  let total = 0;
  let ases = 0;

  cartas.forEach((carta) => {
    let valor = carta.slice(0, -1);

    if (!isNaN(valor)) {
      total += parseInt(valor);
    } else if (valor === "A") {
      ases++;
    } else {
      total += 10;
    }
  });

  // Contar ases
  for (let i = 0; i < ases; i++) {
    if (total + 11 <= 21) {
      total += 11;
    } else {
      total += 1;
    }
  }

  return total;
};

// =======================
// CREAR MAZO
// =======================

const crear_mazo = () => {
  mazo = [];

  for (let figura of figuras) {
    for (let valor = 2; valor <= 10; valor++) {
      mazo.push(`${valor}${figura}`);
    }
  }

  for (let figura of figuras) {
    for (let alfabetico of alfabeticos) {
      mazo.push(`${alfabetico}${figura}`);
    }
  }

  mazo = _.shuffle(mazo);

  // Limpiar mesas
  mesa_jugador.innerHTML = "";
  mesa_pc.innerHTML = "";

  // Reiniciar variables
  valores_jugador = [];
  cartas_maquina = [];

  puntucion_jugador = 0;
  puntuacion_maquina = 0;

  lbl_puntos_jugador.textContent = 0;
  lbl_puntos_pc.textContent = 0;

  return mazo;
};

// =======================
// PEDIR CARTA
// =======================

const pedir_carta = () => {
  if (mazo.length === 0) {
    alert("No quedan cartas");
    return;
  }

  let carta = mazo.pop();

  valores_jugador.push(carta);

  const carta_img = document.createElement("img");

  carta_img.src = `assets/cartas/${carta}.png`;
  carta_img.classList.add("carta");

  mesa_jugador.append(carta_img);

  puntucion_jugador = suma(valores_jugador);
  lbl_puntos_jugador.textContent = puntucion_jugador;

  console.log("Jugador:", puntucion_jugador);

  if (puntucion_jugador > 21) {
    alert("Te pasaste de 21. Perdiste.");
    determinar_ganador();
  } else if (puntucion_jugador === 21) {
    turno_maquina();
  }
};

// =======================
// TURNO MAQUINA
// =======================

const turno_maquina = () => {
  while (puntuacion_maquina < 17 && puntucion_jugador <= 21) {
    if (mazo.length === 0) {
      break;
    }

    let carta = mazo.pop();

    cartas_maquina.push(carta);

    // Dibujar carta de la PC
    const carta_img = document.createElement("img");

    carta_img.src = `assets/cartas/${carta}.png`;
    carta_img.classList.add("carta");

    mesa_pc.append(carta_img);

    puntuacion_maquina = suma(cartas_maquina);
    lbl_puntos_pc.textContent = puntuacion_maquina;

    console.log(`PC obtiene: ${carta}`);
    console.log(`Puntuación PC: ${puntuacion_maquina}`);
  }

  determinar_ganador();
};
// =======================
// GANADOR
// =======================

const determinar_ganador = () => {
  if (puntucion_jugador > 21) {
    alert("La máquina gana.");
  } else if (puntuacion_maquina > 21) {
    alert("La máquina se pasó. ¡Ganaste!");
  } else if (puntucion_jugador > puntuacion_maquina) {
    alert("¡Ganaste!");
  } else if (puntucion_jugador < puntuacion_maquina) {
    alert("La máquina gana.");
  } else {
    alert("Empate.");
  }
};

// =======================
// EVENTOS
// =======================

boton_iniciar_juego.addEventListener("click", crear_mazo);

boton_pedir.addEventListener("click", pedir_carta);

boton_plantarse.addEventListener("click", () => {
  turno_maquina();
});
