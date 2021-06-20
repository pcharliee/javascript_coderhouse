///////////////////
//////BUCLES///////
///////////////////

let input = prompt("Asi que quieres ser un Mortífago... ¿Cómo te llamas?").toLowerCase();
let primeraLetra = input.substr(0, 1).toUpperCase();
let nombre = `${input.substr(0, 1).toUpperCase()}${input.substr(1)}`

for(let i = 3; i > 0; i--) {
  alert(`Preparate para responder nuestra única pregunta en ... ${i}`)
};

let darkLord;
let count = 0; 
let resultado;
let intentos = `${nombre}, tus intentos fueron:`;



while(darkLord !== 'lord voldemort') {
  darkLord = prompt(`¿Quién es el líder de los Mortifagos?`).toLowerCase();
  if (darkLord !== 'lord voldemort') {
    intentos += ` "${darkLord}"`;
    count++
  }
  if (count >= 3) break;
};

if (count >= 3) {
  document.getElementById('intentos').innerHTML = intentos
  document.getElementById('resultado').classList.add('red')
  resultado = `¡¡¡AVADA KADABRA!!! ${nombre}, no mereces ser un Mortífago`
} else {
  document.getElementById('resultado').classList.add('green')
  resultado = `¡Bienvenido, ${nombre}!`
}

document.getElementById('resultado').innerHTML = resultado

