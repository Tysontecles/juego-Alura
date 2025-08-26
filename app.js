let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// Esperar a que el DOM esté listo para registrar el Enter
document.addEventListener('DOMContentLoaded', () => {
  const inputUsuario = document.getElementById('valorUsuario');
  const btnReiniciar = document.getElementById('reiniciar');

  if (inputUsuario && btnReiniciar) {
    inputUsuario.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        if (!btnReiniciar.disabled) {
          btnReiniciar.click();   // reinicia si ya ganaste
        } else {
          verificarIntento();     // si no, verifica el intento
        }
      }
    });
  }
});

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value, 10);

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      'p',
      `Acertaste el número en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`
    );
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    // El usuario no acertó
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento('p', 'El número secreto es menor');
    } else {
      asignarTextoElemento('p', 'El número secreto es mayor');
    }
    intentos++;
    limpiarCaja();
  }
}

function limpiarCaja() {
  const input = document.querySelector('#valorUsuario');
  input.value = '';
  input.focus(); // calidad de vida: listo para el siguiente intento
}

function generarNumeroSecreto() {
  // Si ya sorteamos todos los números, cerramos el juego
  if (listaNumerosSorteados.length === numeroMaximo) {
    asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    // Opcional: deshabilitar también el input para cerrar el ciclo de UX
    const input = document.getElementById('valorUsuario');
    if (input) input.setAttribute('disabled', 'true');
    return null; // no hay más números disponibles
  }

  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  // Evitar repetidos con recursividad controlada
  if (listaNumerosSorteados.includes(numeroGenerado)) {
    return generarNumeroSecreto();
  } else {
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
  }
}

function condicionesIniciales() {
  asignarTextoElemento('h1', 'Juego del número secreto!');
  asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;

  // Asegurar que el input esté habilitado al iniciar
  const input = document.getElementById('valorUsuario');
  if (input) {
    input.removeAttribute('disabled');
    input.focus();
  }

  // Deshabilitar botón reiniciar al iniciar una nueva partida
  document.querySelector('#reiniciar').setAttribute('disabled', 'true');

  // (Opcional) Log para depuración
  // console.log('Secreto:', numeroSecreto, 'Sorteados:', listaNumerosSorteados);
}

function reiniciarJuego() {
  // Limpiar caja
  limpiarCaja();
  // Restablecer mensajes, número secreto e intentos
  condicionesIniciales();
}

condicionesIniciales();
