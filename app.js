///////////////////
/////FUNCIONES/////
///////////////////

let input = prompt("Bienvenido a Ollivander's. Acá entontrarás las mejores varitas... ¿Cómo te llamas?").toLowerCase();
let primeraLetra = input.substr(0, 1).toUpperCase();
let nombre = `${input.substr(0, 1).toUpperCase()}${input.substr(1)}`

let boton = document.getElementById('comprar');
let informacion = document.getElementById('informacion');
let precio = 1000;
let descuento, esDescuento, precioTotal;

boton.addEventListener("click", comprarVarita);

function updateButton () {
  boton.value = "Comprada";
  boton.classList.add('disabled')
  boton.setAttribute("disabled", true);
};

function aplicarDescuento (porcentaje) {
  if (porcentaje < 0 || porcentaje > 101 || isNaN(porcentaje)) 
    return alert('No ingresaste un número valido');
  esDescuento = true;
  descuento = (precio * porcentaje) / 100;
  precioTotal = precio - descuento;
  informacion.innerHTML 
    = `Felicidades ${nombre}, has comprado la Varita de Sauco por ${precioTotal} galeones de oro`;
};

function comprarVarita (e) {
  e.preventDefault();
  let porcentaje = Number(prompt('Ingresa el valor de tu cupon de descuento sin el "%"'))
  aplicarDescuento(porcentaje);
  esDescuento ? updateButton() : alert('Vuelve cuando tengas un cupón válido');
};
