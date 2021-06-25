///////////////////
/////FUNCIONES/////
///////////////////

let boton = document.getElementById('comprar');
let informacion = document.getElementById('informacion');
let precio = 1000;
let descuento;
let esDescuento;

boton.addEventListener("click", comprarVarita);

function updateButton () {
  boton.value = "Comprada";
  boton.setAttribute("disabled", true);
};

function aplicarDescuento () {
  esDescuento = confirm('Quieres descuento?')
  esDescuento ? descuento = (precio * 20) / 100 : descuento = 0
  let precioTotal = precio - descuento;
  informacion.innerHTML = `Felicidades, has comprado la Varita de Sauco por ${precioTotal} galeones de oro`;
};

function comprarVarita (e) {
  e.preventDefault();
  updateButton();
  aplicarDescuento();
};
