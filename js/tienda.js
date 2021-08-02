/* INFORMACION INICIAL PARA FUNCIONAR */

const cart = [];
const varitas = [];

$('document').ready(() => {
  const VARITAS_JSON = "data/varitas.json";
  $.getJSON(VARITAS_JSON, (req, res) => {
    if(res == 'success') {
      console.log('res', req);
      req.map(el => varitas.push(el));
      localStorage.setItem('varitas', JSON.stringify(varitas));
      crearTarjetaVaritas(0);
    };
  });
});

// DOM MANIPULATION

$('#varitas').append(`
<div class='ollivanders-section col-5'></div>
`);

// FUNCTIONS 

function crearTarjetaVaritas(id) {
  console.log('id nueva', id)
  const selected = varitas.filter(el => el.id === id)
  $('#ollivander-section').append(`
    <aside class="wand-option">
      <article id="option-article" class="option-stage selected">
        <div class="option-information">
          <h4 class="option-title text-center">${selected[0].nombre}</h4>
          <p class="option-description">${selected[0].description}</p>
          <aside class="option-details">
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
          </aside>
        </div>
        <img class="varita" src=${selected[0].img}>
      </article>
      <input type="button" id="${selected[0].id}" class="add-to-cart" value="Agregar al carrito">
    </aside>
  `);

  $(`#${selected[0].id}`).on('click', function (e) {
    console.log(`La ${e.target.id} fue agregada al carrito`);
  });
};

$('#next').on('click', function () {
  let current = $('.add-to-cart')[0].id;
  $('#option-article').toggleClass('selected');
  let siguiente = 1;
  crearTarjetaVaritas(siguiente);
});



