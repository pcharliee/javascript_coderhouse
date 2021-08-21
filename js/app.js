/* INFORMACION INICIAL PARA FUNCIONAR */
const characters = [];
const sectionCards = [];
const usuario = localStorage.getItem('usuario');
let pageSections = false;

$('document').ready(() => {
  /* CARDS */
  const CARDS_JSON = "data/cards.json";
  $.getJSON(CARDS_JSON, (req, res) => {
    if(res == 'success') {
      let cards = req;
      cards.map(el => sectionCards.push(el));
      localStorage.setItem('section-cards', JSON.stringify(sectionCards));
      crearTarjetas(cards);
    };
  });
});

/* VARIABLES */

const user = JSON.parse(localStorage.getItem('usuario'));
const Personajes = JSON.parse(localStorage.getItem('characters'));
let welcome = $('#welcome');
let sections = $('#sections');
let cards = $('#cards');
let scrolled = false;
let onSections = false;
let userName = user.nombre;

/* DOM GENERATION */

$('body').prepend(`<div id='scroll-to' class='scroll-to'></div>`);
cards.addClass('cards-section');

welcome.append(`<h2 class='welcome-information-titulo'>Welcome ${userName}!</h2>`);
welcome.append(`
  <p class='welcome-information-cta'>
    Da un paseo por nuestro sitio y no olvides visitar la tienda exclusiva para magos
  </p>
`);
$('.welcome-information-cta').delay(2800).slideDown(1000);

/* FUNCTIONS */

function crearTarjetas (sectionCards) {
  sectionCards.map((card, index) => {
    cards.append(`
    <div class="card" id=${index}>
      <img src=${card.img} id=${card.id}>
      <div class="info">
        <div class="card-title-section"><h3>${card.nombre}</h3></div>
        <p>${card.descripcion}</p>
        <input type='button' id='${card.categoria}' class='card-btn' value='Ver'>
      </div>
    </div>`);
  });

  $(`.card-btn`).on('click', function (e) {
    localStorage.setItem('categoria', e.target.id);
    location.href = './store.html';
  });
};

/* DOM FUNCTIONALITIES */

$('.landing-bg').hover(function () {
  scrolled = false;
  onSections = false;
  $('#store-home-btn').text('Tienda');
});

$('#scroll-to').on('click', function (e) {
  e.preventDefault;
  location.href = '#section'
  $('#store-home-btn').text('Home');
  pageSections = true;
});

$(window).on('scroll', function (e) {
  scrolled = true;
  /* Condicion para ocultar o mostrar el boton */
  if(this.scrollY < 570) {
    $('#scroll-to').fadeIn()
    pageSections = false;
  } else if(this.scrollY > 570) {
    $('#scroll-to').fadeOut();
    $('#store-home-btn').text('Home');
    pageSections = true;
  }

  /* Validando que el usuario este scrolleando para abajo */
  let scrollingUp = this.oldScroll > this.scrollY
  this.oldScroll = this.scrollY
  let scrollTop = $(this).scrollTop();
  if(scrollingUp || onSections || scrollTop < 30) return;
  $('#scroll-to').trigger('click');
  onSections = true;
});

$('#store-home-btn').on('click', function (e) {
  e.preventDefault()
  pageSections = !pageSections;
  if (pageSections) {
    $('#store-home-btn').text('Home');
    location.href = '#section';
    $('#scroll-to').trigger('click');
  } else {
    $('#store-home-btn').text('Tienda');
    location.href = '#landing'
  };
});

/* ANIME JS LIBRARY */

var textWrapper = document.querySelector('.welcome-information-titulo');
textWrapper.innerHTML = textWrapper.textContent
  .replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({loop: true})
  .add({
    targets: '.welcome-information-titulo .letter',
    opacity: [0,1],
    easing: 'easeInOutQuad',
    duration: 1500,
    delay: (el, i) => 150 * (i+1)
});