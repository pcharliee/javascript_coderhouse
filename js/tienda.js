/* INFORMACION INICIAL PARA FUNCIONAR */
const cart = [];
const storeItems = [];
let cartOpened = false;


$('document').ready(() => {
  const ITEMS_JSON = "data/items.json";
  $.getJSON(ITEMS_JSON, (req, res) => {
    if(res == 'success') {
      req.map(el => storeItems.push(el));
      localStorage.setItem('storeItems', JSON.stringify(storeItems));
      crearTarjetaItem(Math.floor(Math.random() * storeItems.length));
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
  let limit = storeItems.length -1;
  let currentSelection = $(':input.add-to-cart')[0].id;
  if (currentSelection == 0) crearTarjetaItem(limit);
  $("#item-card").remove();
  let prevSelection = Number(currentSelection)-1;
  crearTarjetaItem(prevSelection);
};

function nextCard() {
  let currentSelection = $(':input.add-to-cart')[0].id;
  if (currentSelection == storeItems.length -1) crearTarjetaItem(0);
  $("#item-card").remove();
  let nextSelection = Number(currentSelection)+1;
  crearTarjetaItem(nextSelection);
};

function createCardButtons (item) {
  $('.card-nav-buttons').remove()
  $('#store-items-section').append(`
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
    const newItem = storeItems.find(el => el.id == itemId);
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
      }
    );
  };
};

function inCartValidation(item) {
  alreadyInCart(item);
  addToCartSuccess(item);
};

function addToCartSuccess(newItem) {
  /* 
  Si el carro tiene items, aplicamos getUpdatedCart para 
  actualizarlo 
  */
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

function crearTarjetaItem(id) {
  if(id == storeItems.length || id == -1) return;
  const selected = storeItems.filter(el => el.id === id)
  selected[0].categoria == 'escobas' 
    ? crearTarjetaEscobas(selected[0])
    : crearTarjetaVaritas(selected[0])

  /* Funcion para crear botones especificos de la carta */
  createCardButtons(selected[0]);
};

function crearTarjetaEscobas(item) {
  $('#store-items-section').append(`
    <main id="item-card" class="broom-option">
    <img class='card-bg' src='../media/qqs.png'>
    <article id="option-article" class="option-stage">
    <img class="item-img" src=${item.img}>
      <div class="option-information">
        <h4 class="option-title text-center">${item.nombre}</h4>
        <span>${item.precio}</span>
        <p class="option-description">${item.description}</p>
      </div>
    </article>
    </img>
    </main>
  `);
};

function crearTarjetaVaritas(item) {
  $('#store-items-section').append(`
    <main id="item-card" class="wand-option">
    <img class='card-bg' src='../media/ollivanders-t.png'>
      <article id="option-article" class="option-stage">
      <img class="item-img" src=${item.img}>
        <div class="option-information">
          <h4 class="option-title text-center">${item.nombre}</h4>
          <span>${item.precio}</span>
          <p class="option-description">${item.description}</p>
          <section class="option-details">
            <div class="options-details-item">
              <p class="option-details-title">Nucleo</p>
              <p class="option-details-info">${item.nucleo}</p>
            </div>
            <div class="options-details-item">
              <p class="option-details-title">Longitud</p>
              <p class="option-details-info">${item.longitud}</p>
            </div>
            <div class="options-details-item">
              <p class="option-details-title">Madera</p>
              <p class="option-details-info">${item.madera}</p>
            </div>
          </section>
        </div>
      </article>
    </main>
  `);
};

$('body').keydown(function (e) {
  /* carta actual siendo mostrada */
  let current = $(':input.add-to-cart')[0].id;

  switch (e.which) {
    case 32:
      $(`#${current}`).trigger('click');
      break;
    case 37:
      $('#previous').trigger('click')
      break; 
    case 39:
      $('#next').trigger('click')
      break;
    case 38:  
    case 40:
      $('#trolley').trigger('click')
      break;
    default:
      break;
  };
});