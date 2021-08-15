/* INFORMACION INICIAL PARA FUNCIONAR */
const cart = [];
const varitas = [];
let cartOpened = false;

$('document').ready(() => {
  const VARITAS_JSON = "data/varitas.json";
  $.getJSON(VARITAS_JSON, (req, res) => {
    if(res == 'success') {
      req.map(el => varitas.push(el));
      localStorage.setItem('varitas', JSON.stringify(varitas));
      crearTarjetaVaritas(0);
    };
  });
});

// DOM MANIPULATION

$('body').append(`
<div id='cart-display' class='cart-details'></div>
<span id='trolley' class='trolley-cart'></span>
`);

$('#cart-display').css({ 'display': 'none' });

// FUNCTIONS 

function previousCard() {
  let limit = varitas.length -1;
  let currentSelection = $(':input.add-to-cart')[0].id;
  if (currentSelection == 0) crearTarjetaVaritas(limit);
  $("#wand-card").remove();
  let prevSelection = Number(currentSelection)-1;
  crearTarjetaVaritas(prevSelection);
};

function nextCard() {
  let currentSelection = $(':input.add-to-cart')[0].id;
  if (currentSelection == varitas.length -1) crearTarjetaVaritas(0);
  $("#wand-card").remove();
  let nextSelection = Number(currentSelection)+1;
  crearTarjetaVaritas(nextSelection);
};

function createCardButtons (item) {
  $('.card-nav-buttons').remove()
  $('#ollivander-section').append(`
    <div class='card-nav-buttons'>
      <input type="button" id="previous" value="<">
      <input 
        type="button"
        id="${item.id}" 
        class="add-to-cart" value="Agregar al carrito">
      <input type="button" id="next" value=">">
    </div>
  `);
  alreadyInCart(item);
  
  $(`#${item.id}`).on('click', function (e) {
    let itemId = e.target.id
    const newItem = varitas.find(el => el.id == itemId);
    inCartValidation(newItem);
  });
  $('#previous').on('click', previousCard)
  $('#next').on('click', nextCard)
};

function alreadyInCart(item) {
  let currentCart = getUpdatedCart() || cart;
  let exists = currentCart.find(el => el.id == item.id);
  if(!!exists) {
    $(`#${item.id}`)
      .val('Agregado')
      .prop('disabled', true)
      .css(
      { 
        'cursor': 'not-allowed',
        'background-color': '#b33019c7',
        'cursor': 'not-allowed'
      }
    );
  };
};

function inCartValidation(item) {
  alreadyInCart(item);
  addToCartSuccess(item);
};

function addToCartSuccess(newItem) {
  let currentCart = !cart.length ? cart : getUpdatedCart();
  let objeto = { 
    id: newItem.id,
    nombre: newItem.nombre,
    precio: newItem.precio,
    cantidad: 1,
    thumbnail: newItem.img
  };
  currentCart.push(objeto);
  localStorage.setItem('carrito', JSON.stringify(currentCart));
  alreadyInCart(newItem);
  getUpdatedCart();
  getItemsFromCart();
};

function crearTarjetaVaritas(id) {
  if(id == varitas.length || id == -1) return;
  const selected = varitas.filter(el => el.id === id)
  $('#ollivander-section').append(`
    <main id="wand-card" class="wand-option">
      <article id="option-article" class="option-stage">
        <div class="option-information">
          <h4 class="option-title text-center">${selected[0].nombre}</h4>
          <p class="option-description">${selected[0].description}</p>
          <section class="option-details">
            <div class="options-details-item">
              <p class="option-details-title">Nucleo</p>
              <p class="option-details-info">${selected[0].nucleo}</p>
            </div>
            <div class="options-details-item">
              <p class="option-details-title">Longitud</p>
              <p class="option-details-info">${selected[0].longitud}</p>
            </div>
            <div class="options-details-item">
              <p class="option-details-title">Madera</p>
              <p class="option-details-info">${selected[0].madera}</p>
            </div>
          </section>
        </div>
        <img class="varita" src=${selected[0].img}>
      </article>
    </main>
  `);

  // FUNCIONALIDAD PARA AGREGAR AL CARRITO
  createCardButtons(selected[0])
};