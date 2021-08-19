/* INFORMACION INICIAL PARA FUNCIONAR */
const cart = [];
const storeItems = [];
let currentItemsForCategory = [];
let currentCategory = '';
let newCategory = '';
let cartOpened = false;

$('document').ready(() => {
  const ITEMS_JSON = "data/items.json";
  $.getJSON(ITEMS_JSON, (req, res) => {
    if(res == 'success') {
      req.map(el => storeItems.push(el));
      localStorage.setItem('storeItems', JSON.stringify(storeItems));
    };
    currentCategory = localStorage.getItem('categoria');
  })
  .then(function () {
    setStore(currentCategory);
  });
});

// DOM MANIPULATION

function setStore(category) {
  let index = 0;
  storeItems.map(el => {
    if(el.categoria != category) return;
    else if(el.categoria == category) {
      el.id = index;
      index++;
      currentItemsForCategory.push(el);
    };
  });
  crearTarjetaItem(currentItemsForCategory[0]);
};

$('body').append(`
<div id='cart-display' class='cart-details'></div>
<span id='trolley' class='trolley-cart'></span>
`);

$('#cart-display').css({ 'display': 'none' });

// FUNCTIONS 

function getFilteredItem(id) {
  /* Buscamos en el array la carta que matchee con el id 'anterior' a la carta
    que esta actualmente en pantalla
  */
  let filteredItem = '';
    currentItemsForCategory.filter(item => {
    if(item.id != id) return
    if (item.id == id) filteredItem = item;
  });
  return filteredItem;
};

function previousCard() {
  /* id de la carta en la pantalla */
  let currentSelection = parseInt($(':input.add-to-cart')[0].id);

  /* Validamos que el id de la carta actual no sea la primera posicion del array 
     1. de ser verdadero, el 'id' va a ser la ultima posicion del array
  */
  let idAnterior = currentSelection == 0
    ? currentItemsForCategory.length -1
    : Number(currentSelection) -1;

  let previousItem = getFilteredItem(idAnterior);
  $("#item-card").remove();
  crearTarjetaItem(previousItem);
};

function nextCard() {
  /* id de la carta en la pantalla */
  let currentSelection = parseInt($('input.add-to-cart')[0].id);

  let idSiguiente = currentSelection == currentItemsForCategory.length -1
    ? 0
    : Number(currentSelection) +1;

  let nextItem = getFilteredItem(idSiguiente);
  $("#item-card").remove();
  crearTarjetaItem(nextItem);
};

function createCardButtons (item) {
  $('.card-nav-buttons').remove()
  $('#store-items-section').append(`
    <div class='card-nav-buttons'>
      <input type="button" id="previous" value="<">
      <input 
        type="button"
        id="${item.id}-${item.categoria}" 
        class="add-to-cart" value="Agregar al carrito">
      <input type="button" id="next" value=">">
    </div>
  `);
  alreadyInCart(item);

  $(`#${item.id}-${item.categoria}`).on('click', function (e) {
    let itemId = e.target.id.split('-')[0]
    const newItem = currentItemsForCategory.find(el => el.id == itemId);
    inCartValidation(newItem);
  });
  $('#previous').on('click', previousCard)
  $('#next').on('click', nextCard)
};

function alreadyInCart(item) {
  /* Traemos el carrito actualizado */
  let currentCart = getUpdatedCart() || cart;

  /* Verificamos que el item que queremos agregar no este ya en el carrito */
  let exists = currentCart.find(el => el.nombre == item.nombre);
  if(!!exists) {
    $(`#${item.id}-${item.categoria}`)
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
    thumbnail: newItem.img,
    categoria: newItem.categoria
  };
  currentCart.push(objeto);
  localStorage.setItem('carrito', JSON.stringify(currentCart));
  alreadyInCart(newItem);
  getUpdatedCart();
  getItemsFromCart();
};

function crearTarjetaItem(item) {
  item.categoria == 'escobas' 
    ? crearTarjetaEscobas(item)
    : crearTarjetaVaritas(item);
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
  createCardButtons(item)
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
  createCardButtons(item);
};

$('#switch-stores').on('click', function () {
  let currentCategory = localStorage.getItem('categoria');

  /* Seteamos la nueva categoria a la contraria  a la actual */
  newCategory = currentCategory == 'varitas' ? 'escobas' : 'varitas';
  localStorage.setItem('categoria', newCategory);
  location.reload();
});

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