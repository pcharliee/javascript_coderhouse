let user = JSON.parse(localStorage.getItem('usuario'));
// DOM MANIPULATION

$('#cart-display').append(`
  <div class='cart-container'>
    <h6 class='cart-title'>Carrito de ${user.nombre}</h6>
  </div>
`);

$('body').append(`
<div id='confirmar-compra-modal' class='confirmar-compra'>
  <h6>¿Ya tienes todo lo que necesitas?</h6>
</div>
`);

$('#confirmar-compra-modal').css({ 'display': 'none' });


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

function removeFromCartSuccess(id) {
  $(`#cart-item-id-${id}`).remove();
    let currentCart = getUpdatedCart();
    let newCart = currentCart.filter(item => item.id != id);
    localStorage.setItem('carrito', JSON.stringify(newCart));
    localStorage.setItem('carritoModificado', JSON.stringify(newCart));
    cartSummary();
};

function removeFromCartConfirm(id) {
  let eliminarItem = confirm('Quieres eliminar el item del carrito?');
  if (eliminarItem) removeFromCartSuccess(id);
};

function decreaseCount(value, item) {
  if(value == 1) return removeFromCartConfirm(item.id);
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
      let checkIfItemExists = modifiedCart.findIndex(item => item.id == element.id);
      if(checkIfItemExists === -1) modifiedCart.push(element);
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
      <div class='cart-action-btn-container'>
        <button type='button' id='cart-eliminar' class='eliminar-btn'>Eliminar items</button>
        <button type='button' id='cart-comprar' class='comprar-btn'>Comprar</button>
      </div>
    </div>
  `);

  $('#cart-eliminar').on('click', deleteCartItems);
  $('#cart-comprar').on('click', confirmarCompraModal);
  
  return precioTotal;
};

function deleteCartItems() {
  let currentCart = getUpdatedCart();
  if (!currentCart.length) return;
  let confirmDelete = confirm('Se van a eliminar todos los items del carrito. Esto no se puede revertir');

  if(confirmDelete) {
    currentCart.forEach(item => {
      removeFromCartSuccess(item.id);
    });
    location.reload();
  };
};

function getItemsFromCartSuccess(currentCart) {
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
        <span id='cart-remove-btn-${item.id}' class="cart-remove-btn"></span>
      </div>
    `);

    cartSummary();

    // MODIFIERS FUNCTIONALITY
    $(`#cart-plus-btn-${item.id}`).on('click', function () {
      let currentQty = parseInt($(`#cart-item-counter-${item.id}`).text());
      increaseCount(currentQty, item);
    });
    $(`#cart-minus-btn-${item.id}`).on('click', function () {
      let currentQty = parseInt($(`#cart-item-counter-${item.id}`).text());
      decreaseCount(currentQty, item);
    });

    $(`#cart-remove-btn-${item.id}`).on('click', function () {
      removeFromCartConfirm(item.id);
    });
    
    // Google Chrome render
    $('.cart-items-container').on('scroll', function () {
      cartSummary();
    });
  };
}

function getItemsFromCart() {
  let currentCart = getUpdatedCart();
  if (!currentCart.length) {
    $('.cart-items-container').remove();
    $('#cart-display .cart-title').after(`
    <div class='cart-items-container'>hoasooal</div>
   `);
    return;
  }

  $('.cart-items-container').remove();
  $('#cart-display .cart-title').after(`
    <div class='cart-items-container'></div>
  `);

  getItemsFromCartSuccess(currentCart)
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

function confirmarCompraModal() {
  $('.store').css({
    'opacity': '0.6',
    'background-color': 'rgba(0, 0, 0, 0.3)'
  })
  $('.confirmar-compra-container').remove();
  $('#confirmar-compra-modal').show(200);
  $('#confirmar-compra-modal').append(`
  <section class='confirmar-compra-container'>
  <div class='confirmar-compra-converter'>
  <p>El total de tu compra es: ${cartSummary()} galeones</p>
    <div class='coin-converter'>
      <img class='coin' src='../media/misc/Galleon_coin.png'>
      <p>USD$ ${(cartSummary() * 25).toLocaleString('en-US')} dolares</p>
    </div>
    <div class='coin-converter'>
      <img class='coin' src='../media/misc/Sickle_coin.png'>
      <p>${(cartSummary() * 17).toLocaleString('en-US')} Sickles</p>
    </div>
    <div class='coin-converter'>
      <img class='coin-knut' src='../media/misc/Knut_coin.png'>
      <p>${(cartSummary() * 493).toLocaleString('en-US')} Sickles</p>
    </div>
    <input id='confirmar-compra-btn' type='button' value='Confirmar compra'>
  </div>
  </section>
  `);

  $('#confirmar-compra-btn').on('click', compraSuccess)
};

function compraSuccess() {
  alert('GRACIAS')
  deleteCartItems(true);
}