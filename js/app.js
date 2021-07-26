// import anime from 'animejs/lib/anime.es.js'
// const anime = require('animejs');

/* INFORMACION INICIAL PARA FUNCIONAR */
const spells = [];
const characters = [];
const books = [];
const sectionCards = [
  {
    id: 'ollivanders',
    nombre: 'Ollivanders',
    descripcion: 'Todo mago necesita una varita mágica. Visita la tienda de Ollivander´s y consigue la tuya.',
    img: `../media/ollivanders-t.png`,

  },
  {
    id: 'quidditch-supplies',
    nombre: 'Quality Quidditch Supplies',
    descripcion: 'Ya sea que juegues al Quidditch o la uses para hacer las compras, en Articulos de Calidad para Quidditch tenemos la escoba que se adapta a tus necesidades ',
    img: `../media/qqs.png`,
  },
  {
    id: 'flourish-blotts',
    nombre: 'Flourish and Blotts ',
    descripcion: 'Encuentra todos los libros que necesitas para iniciar tu nuevo año escolar.',
    img: `../media/flourish.png`,
  },
];

$('document').ready(() => {
  const API_URL = "https://fedeperin-harry-potter-api.herokuapp.com/db";
  fetch(API_URL)
  .then((res) => res.json())
  .then((data) => { 
    data.hechizos.map(el => spells.push(el));
    data.personajes.map(el => characters.push(el));
  })
  .then(function () {
    localStorage.setItem('spells', JSON.stringify(spells))
    localStorage.setItem('characters', JSON.stringify(characters))
    console.log('se cargo todo')
  })
});

const user = JSON.parse(localStorage.getItem('usuario'));
const Hechizos = JSON.parse(localStorage.getItem('spells'));
const Personajes = JSON.parse(localStorage.getItem('characters'));

/* VARIABLES */

let welcome = $('#welcome');
let sections = $('#sections');
let cards = $('#cards');
let counter = 0;
let scrolled = false;
let onSections = false;
let userName = !user.nombre ? 'Muggle sin nombre' : user.nombre

// DOM MANIPULATION

$('body').prepend(`
  <div id='scroll-to' class='scroll-to'>Scroll down</div>
`);
cards.addClass('cards-section');

// FUNCTIONS

function crearTarjetas (sectionCards) {
  sectionCards.map((card, index) => {
    counter++;
    imgUrl = card.img;
    cards.append(`
    <div class="card" id=${index}>
      <img src=${card.img} id=${card.id}>
      <div class="info">
        <div class="card-title-section"><h3>${card.nombre}</h3></div>
        <p>${card.descripcion}</p>
        <input type=button value='Ir a la tienda'>
      </div>
    </div>`)
  });
};

crearTarjetas(sectionCards)

$('#ollivanders').css({
  'filter': 'invert(0.75)'
});
$('#flourish-blotts').css({
  'filter': 'invert(0.9)'
});
// DOM INTERACTIONS

$('.landing-bg').hover(function () {
  scrolled = false;
  onSections = false;
  sectionCards.map((card, index) => {
    $(`#${index}`).fadeOut(500);
  });
});

$('.sections-bg').on('mouseenter', function () {
  if(scrolled) return;
  sectionCards.map((card, index) => {
    $(`#${index}`).fadeIn(800)
  });
});

welcome.append(`<h2 class='welcome-information-titulo'>Hola, ${userName}!<h2>`);
welcome.append(`<p class='welcome-information-cta'>
Da un paseo por nuestro sitio y no te olvides de visitar las tienda exclusiva para magos
</p>`);

$('.welcome-information-cta').delay(3000).slideDown(1000)

$('#scroll-to').on('click', function (e) {
  e.preventDefault;
  $('html, body').animate({
    scrollTop: $('.sections-bg').offset().top
  }, 50);
  $('.sections-bg').trigger('mouseenter')
});

$(window).on('scroll', function (e) {
  scrolled = true;
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
anime.timeline({loop: false})
  .add({
    targets: '.welcome-information-titulo .letter',
    opacity: [0,1],
    easing: 'easeInOutQuad',
    duration: 1500,
    delay: (el, i) => 150 * (i+1)
  });











