/* INFORMACION INICIAL PARA FUNCIONAR */
const spells = [];
const characters = [];
const sectionCards = [];
const usuario = localStorage.getItem('usuario');
let pageSections = false;

$('document').ready(() => {
  // HECHIZOS //
  const API_URL = "https://fedeperin-harry-potter-api.herokuapp.com/db";
  $.get(API_URL, (req, res) => {
    if(res == 'success') {
      req.hechizos.map(el => spells.push(el));
      req.personajes.map(el => characters.push(el))
      localStorage.setItem('spells', JSON.stringify(spells))
      localStorage.setItem('characters', JSON.stringify(characters))
    };
  });
  
  // CARDS //
  const CARDS_JSON = "data/cards.json"
  $.getJSON(CARDS_JSON, (req, res) => {
    if(res == 'success') {
      let cards = req;
      cards.map(el => sectionCards.push(el));
      localStorage.setItem('section-cards', JSON.stringify(sectionCards));
      crearTarjetas(cards)
    };
  });
});

const user = JSON.parse(localStorage.getItem('usuario'));
const Hechizos = JSON.parse(localStorage.getItem('spells'));
const Personajes = JSON.parse(localStorage.getItem('characters'));

// VARIABLES

let welcome = $('#welcome');
let sections = $('#sections');
let cards = $('#cards');
let counter = 0;
let scrolled = false;
let onSections = false;
let userName = !user.nombre ? 'Muggle sin nombre' : user.nombre

// DOM MANIPULATION

$('body').prepend(`
<div id='scroll-to' class='scroll-to'></div>
`);
cards.addClass('cards-section');

// FUNCTIONS

function goToStore() {
  location.href = '../store.html';
};

function crearTarjetas (sectionCards) {
  sectionCards.map((card, index) => {
    counter++;
    cards.append(`
    <div class="card" id=${index}>
      <img src=${card.img} id=${card.id}>
      <div class="info">
        <div class="card-title-section"><h3>${card.nombre}</h3></div>
        <p>${card.descripcion}</p>
        <input type='button' class='card-btn' value='Ver'>
      </div>
    </div>`)
  });
  $('#ollivanders').css({
    'filter': 'invert(0.75)'
  });
  $('#flourish-blotts').css({
    'filter': 'invert(0.9)'
  });

  $(`.card-btn`).on('click', goToStore)
};

// DOM INTERACTIONS

welcome.append(`<h2 class='welcome-information-titulo'>Bienvenido, ${userName}!<h2>`);
welcome.append(`<p class='welcome-information-cta'>
Da un paseo por nuestro sitio y no olvides visitar la tienda exclusiva para magos
</p>`);
$('.welcome-information-cta').delay(3000).slideDown(1000);

$('.landing-bg').hover(function () {
  scrolled = false;
  onSections = false;
  $('#store-home-btn').text('Tienda');
});

$('#scroll-to').on('click', function (e) {
  e.preventDefault;
  // $('html, body').animate({
  //   scrollTop: $('.sections-bg').offset().top
  // }, 50);
  location.href = '#section'
  $('#store-home-btn').text('Home');
  pageSections = true;
});

$(window).on('scroll', function (e) {
  scrolled = true;
  /* Condicion para ocular o mostrar el boton */
  if(this.scrollY < 570) {
    $('#scroll-to').fadeIn()
    pageSections = false;
  } else if(this.scrollY > 570) {
    $('#scroll-to').fadeOut()
    $('#store-home-btn').text('Home');
    pageSections = true;
  }
  
  
  // Validating user is scrolling down
  let scrollingUp = this.oldScroll > this.scrollY
  this.oldScroll = this.scrollY
  let scrollTop = $(this).scrollTop();
  if(scrollingUp || onSections || scrollTop < 30) return;
  $('#scroll-to').trigger('click');
  onSections = true;
});

// ANIME JS //

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

$('#store-home-btn').on('click', function (e) {
  e.preventDefault()
  pageSections = !pageSections;
  if (pageSections) {
    $('#store-home-btn').text('Home')
    location.href = '#section';
    $('#scroll-to').trigger('click');
  } else {
    $('#store-home-btn').text('Tienda')
    location.href = '#landing'
  }
})