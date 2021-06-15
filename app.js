// alert('Bienvenido a la primera prueba. A continuación, te voy a pedir una serie de datos')
// let nombre = prompt('Ingresa tu nombre');
// let edad = parseInt(prompt('Cuantos años tienes?'));
// let destino = prompt('Destino de vacaciones favorito?')

// let acertijo = confirm('Pesa más un kilo de acero que un kilo de algodón?')

// alert(`
//   ${nombre}, el acertijo que respondiste esta pensado para niños... 
//   Según me cuentas, tu tienes ${edad} años. Abre la consola para saber tu resultado!
// `) 

// acertijo
// ? console.log(`${nombre}, tu resultado fue ${acertijo}! Te has ganado un pasaje a ${destino}. FELICIDADES!`) 
// : console.log(`${nombre}, tu resultado fue ${acertijo}! Refresca la página para intentar de nuevo`)

///////////////////
///CONDICIONALES///
///////////////////

let numero1 = parseInt(prompt('Ingresa un numero'))
let numero2 = parseInt(prompt('Ingresa otro numero'))
let calculo = numero1 * numero2

if(calculo > 100) {
  console.log(`mayor a 100. tu calculo fue ${calculo}`)
} else {
  console.log(`menor a 100. tu calculo fue ${calculo}`)
}

document.getElementById("resultado").innerHTML = calculo