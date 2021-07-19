/* INFORMACION INICIAL PARA FUNCIONAR */
const spells = [];
const characters = [];
const books = [];
const sectionCards = [
  {
    nombre: 'Varitas',
    descripcion: 'Todo mago necesita una varita mágica. Visita la tienda de Ollivander´s y consigue la tuya.',
    img: `./media/ollivanders.png`,
  },
  {
    nombre: 'Escobas',
    descripcion: 'Ya sea que juegues al Quidditch o la uses para hacer las compras, en Articulos de Calidad para Quidditch tenemos la escoba que se adapta a tus necesidades ',
    img: `./media/Ollivanders.jpg`,
  },
  {
    nombre: 'Libros',
    descripcion: 'Seleccion de lib',
    img: `./media/Ollivanders.jpg`,
  },
]

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

const Hechizos = JSON.parse(localStorage.getItem('spells'));
const Personajes = JSON.parse(localStorage.getItem('characters'));

/* INFORMACION INICIAL PARA FUNCIONAR */

class Usuario {
  constructor(username, nombre, email, bio) {
    this.username = username;
    this.nombre = nombre;
    this.email = email;
    this.bio = bio;
  };
};

let button = $('#button');
let welcome = $('#welcome');
let sections = $('#sections')


function ingresarUsuario() {
  let username = $('#username-login').val();
  let nombre = $('#nombre-login').val();
  let email = $('#email-login').val();
  let bio = $('#bio-login').val();
  let nuevoUsuario = new Usuario (username, nombre, email, bio);
  
  localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  location.href = './landing.html'
};
const user = JSON.parse(localStorage.getItem('usuario'));

button.on('click', ingresarUsuario);
$('.form-container > p').addClass('prueba');
welcome.append(`<h2 class='welcome-information-titulo'>Bienvenida, ${user.nombre}<h2>`);
welcome.append(`<p class='welcome-information-cta'>
Da un paseo por nuestro sitio y no te olvides de visitar la tienda exclusiva para magos
</p>`);

function crearTarjetas (sectionCards) {
  sectionCards.map(card => {
    sections.append(`<div class="card-body">
    <div class="card-img"></div>
    <div class="card-title"><p>Prueba de texto</p></div>
    <div class="card-description"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officiis mollitia obcaecati quae accusamus nihil!</p></div>
    <input type="button" class='boton-card' id='' value='Ir a Ollivanders'>
  </div>`)
  });
};

crearTarjetas(sectionCards);









