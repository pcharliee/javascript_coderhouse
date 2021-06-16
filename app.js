///////////////////
///CONDICIONALES///
///////////////////

let error, coterraneo;

let nombre = prompt('Hola! Como te llamas?').toUpperCase()
alert(`Mucho gusto ${nombre}. Perdon que grite, es que me alegra que estes aca!`)
let edad = parseInt(prompt('Cuantos años tienes?'))
let destino = prompt('De donde eres?').toLowerCase()
let sugerencia;

if (destino == "venezuela") { 
  alert(`Que interesante, yo tambien soy de ${destino}`) 
  coterraneo = false;
} else { 
  alert(`Que interesante, nunca fui a ${destino}`) 
  coterraneo = true
}

if (edad < 18) {
  sugerencia = `Aprovecha que aun tienes ${edad} años, mira que despues tienes que trabajar :P`
} else if (edad >= 18) {
  sugerencia = `A seguir dandole a la vida, lo que te propongas lo lograrás :)`
}

alert(`Ya me canse de aparecer y desaparecer a modo de 'alert', lo próximo lo voy a escribir en el HTML :)`);

let resultado = `
  Muchas gracias por pasar ${nombre.toLowerCase()}. Espero algún día conocer ${destino}.
  En vista de que tienes ${edad} años, te dejo un consejo: ${sugerencia}.
  Nos vemos pronto!
`;

document.getElementById("resultado").innerHTML = resultado