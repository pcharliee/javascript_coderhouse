/* INFORMACION INICIAL PARA FUNCIONAR */
const spells = [];
const characters = [];
const books = [];

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
});

const Hechizos = JSON.parse(localStorage.getItem('spells'));
const Personajes = JSON.parse(localStorage.getItem('characters'));
const Usuario = JSON.parse(localStorage.getItem('usuario'));

/*  VARIABLES    */

const PersonajesBoton = document.getElementById('Personajes');
const HechizosBoton = document.getElementById('Hechizos');
const Lista = document.getElementById('Lista');

/* ADICION DE FUNCIONALIDADES AL HTML */

HechizosBoton.addEventListener('click', imprimirInformacion);

/* FUNCIONES*/
function imprimirInformacion(e) {
  if (!Hechizos) return alert('Hubo un error. Refresca la página')
  let hechizosOrdenados = Hechizos.sort(function (a,b) {
    if(a.hechizo < b.hechizo) { return -1; }
    if(a.hechizo > b.hechizo) { return 1; }
    return 0
  });
  hechizosOrdenados.forEach(el => {
    let li = document.createElement('li')
    li.classList.add('item-information')
    li.textContent = el.hechizo
    HechizosBoton.setAttribute('disabled', true)
    Lista.appendChild(li)
  });
};
