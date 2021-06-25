///////////////////
/////FUNCIONES/////
///////////////////

// let input = prompt("Asi que quieres ser un Mortífago... ¿Cómo te llamas?").toLowerCase();
// let primeraLetra = input.substr(0, 1).toUpperCase();
// let nombre = `${input.substr(0, 1).toUpperCase()}${input.substr(1)}`

// let nombre = prompt('')
let comprar = document.getElementById('comprar').value
console.log(comprar)

let boton = document.getElementById('comprar')

boton.innerHTML = 'pera'
boton.addEventListener("click", comprarVarita);

function comprarVarita () {
  boton.value = "ES MIA"
  boton.setAttribute("disabled", true)
  alert("Compraste la varita maldita")
}
