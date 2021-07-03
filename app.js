/* INFORMACION INICIAL PARA FUNCIONAR */
const spells = [];
const characters = [];
const books = [];
let isPageLoaded = false;

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
  isPageLoaded = true;
});

const Hechizos = JSON.parse(localStorage.getItem('spells'));
const Personajes = JSON.parse(localStorage.getItem('characters'));
const Usuario = JSON.parse(localStorage.getItem('usuario'));

/*  VARIABLES    */

const PersonajesBoton = document.getElementById('Personajes');
const HechizosBoton = document.getElementById('Hechizos');
const Lista = document.getElementById('Lista');

/* ADICION DE FUNCIONALIDADES AL HTML */

PersonajesBoton.addEventListener('click', imprimirInformacion);
HechizosBoton.addEventListener('click', imprimirInformacion);


/* FUNCIONES*/
function imprimirInformacion(e) {
  if (!Hechizos || !Personajes) return alert('Hubo un error. Refresca la página')
  Lista.innerHTML = '';
  
  switch (e.target.id) {
    case 'Personajes':
    let personajesOrdenados = Personajes.sort(function (a,b) {
      if(a.personaje < b.personaje) { return -1; }
      if(a.personaje > b.personaje) { return 1; }
      return 0
    });
    personajesOrdenados.forEach(el => {
      Lista.innerHTML += `<li class='item-informacion'>${el.personaje}</li>`
    });
    break;
    case 'Hechizos':
    let hechizosOrdenados = Hechizos.sort(function (a,b) {
      if(a.hechizo < b.hechizo) { return -1; }
      if(a.hechizo > b.hechizo) { return 1; }
      return 0
    });
    hechizosOrdenados.forEach(el => {
      Lista.innerHTML += `<li class='item-informacion'>${el.hechizo}</li>`
    });
    break;
    default:
    alert('Hubo un error, intenta de nuevo');
    break;
  };
};

console.log(Hechizos[0])
console.log(Personajes)