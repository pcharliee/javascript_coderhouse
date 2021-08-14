// DOM MANIPULATION

$('#cart-display').append(`
  <div class='cart-container'>
    <h6 class='cart-title'>Tu tienda</h6>
  </div>
`)

// FUNCTIONS

function parsePrice(item) {
  let parsedItem = item.split(' ');
  let price = parseFloat(parsedItem[0]);
  return price;
};

function increaseCount(value, item) {
  let newQty = value+1;
  let newPrice = parsePrice(item.precio) * newQty;
  
  $(`#item-price-${item.id}`).replaceWith(`
  <p id='item-price-${item.id}' class='cart-item-price'>${newPrice} galeones</p>
  `)

  $(`#cart-item-counter-${item.id}`)
  .replaceWith(`<p id='cart-item-counter-${item.id}'>${newQty}</p>`);

  cartSummary();
};

function removeFromCart(id) {
  let eliminarItem = confirm('Quieres eliminar el item del carrito?');
  if (eliminarItem) {
    $(`#cart-item-id-${id}`).remove();
    let currentCart = getUpdatedCart();
    let newCart = currentCart.filter(item => item.id != id);
    localStorage.setItem('carrito', JSON.stringify(newCart));
    localStorage.setItem('carritoModificado', JSON.stringify(newCart));
    cartSummary();
  };
};

function decreaseCount(value, item) {
  if(value == 1) return removeFromCart(item.id);
  let newQty = value-1;
  let newPrice = parsePrice(item.precio) * newQty;

  $(`#item-price-${item.id}`).replaceWith(`
  <p id='item-price-${item.id}' class='cart-item-price'>${newPrice} galeones</p>
  `);

  $(`#cart-item-counter-${item.id}`)
      .replaceWith(`<p id='cart-item-counter-${item.id}'>${newQty}</p>`);

  cartSummary();
};

function getUpdatedCart() {
  let carrito = JSON.parse(localStorage.getItem('carrito'));
  if(!carrito) return;
  let modifiedCart = JSON.parse(localStorage.getItem('carritoModificado'));
  if(!!modifiedCart) {
    carrito.map(element => {
      let checkIfItemExists = modifiedCart.findIndex(item => item.id == element.id)
      if(checkIfItemExists === -1) modifiedCart.push(element)
    });
    localStorage.setItem('carritoModificado', JSON.stringify(modifiedCart));
    return modifiedCart;
  };
  return carrito;
};


function cartSummary() { 
  $('.cart-summary-container').remove();
  let precioTotal = 0;
  const carritoModificado = []
  let currentCart = getUpdatedCart();
  
  currentCart.map(item => {
    let currentPrice = parsePrice($(`#item-price-${item.id}`).text());
    let currentQty = parseInt($(`#cart-item-counter-${item.id}`).text());
    let modifiedCart = Object.assign({}, item, { cantidad: currentQty || 1});
    carritoModificado.push(modifiedCart);
    localStorage.setItem('carritoModificado', JSON.stringify(carritoModificado));
    precioTotal += currentPrice;
  });
  
  $('.cart-items-container').after(`
    <div class='cart-summary-container'>
      <div class='cart-summary'>
        <p>Precio total</p>
        <span id='precio-total'>${precioTotal} galeones</span>
      </div>
      <button type='button' id='cart-guardar' class='comprar-btn'>Guardar</button>
      <button type='button' id='cart-comprar' class='comprar-btn'>Comprar</button>
    </div>
  `);
};

function getItemsFromCart() {
  let currentCart = getUpdatedCart();

  $('.cart-items-container').remove();
  $('#cart-display .cart-title').after(`
    <div class='cart-items-container'></div>
  `);

  for (const item of currentCart) {
    let currentPrice = parsePrice(item.precio) * item.cantidad;
    $('.cart-items-container').append(`
      <div id='cart-item-id-${item.id}' class='cart-item'>
        <div class='cart-item-info'>
          <p class='cart-item-name'>${item.nombre}</p>
          <p id='item-price-${item.id}' class='cart-item-price'>${currentPrice} galeones</p>
          <div class='cart-item-modifier'>
            <button id='cart-minus-btn-${item.id}' type='button'>-</button>
            <p id='cart-item-counter-${item.id}'>${item.cantidad}</p>
            <button id='cart-plus-btn-${item.id}' type='button'>+</button>
          </div>
        </div>
        <div class='cart-item-img-container'>
          <img src=${item.thumbnail} class='cart-item-img'>
        </div>
      </div>
    `);

    // MODIFIERS FUNCTIONALITY
    $(`#cart-plus-btn-${item.id}`).on('click', function () {
      let currentQty = parseInt($(`#cart-item-counter-${item.id}`).text());
      increaseCount(currentQty, item);
    });
    $(`#cart-minus-btn-${item.id}`).on('click', function () {
      let currentQty = parseInt($(`#cart-item-counter-${item.id}`).text());
      decreaseCount(currentQty, item);
    });

    // Google Chrome render
    $('.cart-items-container').on('scroll', function () {
      cartSummary();
    });
  };
};

function cartOpenedSuccess() {
  $('#cart-display').toggle(400);
  getItemsFromCart()
  cartSummary();
};

// DOM FUNCTIONALITIES

$('#trolley').on('click', function () {
  cartOpened = !cartOpened;
  cartOpened ? cartOpenedSuccess() : $('#cart-display').toggle(400);
});


