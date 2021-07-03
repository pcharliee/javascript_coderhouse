const hechizos = JSON.parse(localStorage.getItem('spells'));
const personajes = JSON.parse(localStorage.getItem('characters'));
const usuario = JSON.parse(localStorage.getItem('usuario'));
let informacion = document.getElementById('Lista');

let usuarioCompletado = 0;
let character;

let gryffindor = document.getElementById('Gryffindor');
gryffindor.addEventListener('click', seleccionarCasa);

let ravenclaw = document.getElementById('Ravenclaw');
ravenclaw.addEventListener('click', seleccionarCasa);

let slytherin = document.getElementById('Slytherin');
slytherin.addEventListener('click', seleccionarCasa);

let hufflepuff = document.getElementById('Hufflepuff');
hufflepuff.addEventListener('click', seleccionarCasa);

let nombre = document.getElementById('nombre');
nombre.addEventListener('click', obtenerNombre);

let edad = document.getElementById('edad');
edad.addEventListener('click', obtenerEdad);

let hechizo = document.getElementById('hechizo');
hechizo.addEventListener('click', obtenerHechizo);

let animal = document.getElementById('animal');
animal.addEventListener('click', obtenerAnimal);


class Personaje {
  constructor (nombre, edad, hechizo, animal, casa) {
    this.nombre = nombre;
    this.edad = edad;
    this.hechizo = hechizo;
    this.animal = animal;
    this.casa = casa;
  }
  hechizar() {
    this.hechizo = this.hechizo.toUpperCase()
    alert(`Ten cuidado de donde usas ${this.hechizo}`)
  }
  patronus() {
    alert(`¿Sabías que tu patronus es un ${this.animal}?`)
  }
  calcularTiempo() {
    let graduacion = Number(this.edad) + 7;
    
    alert(`Si eres buen estudiante, te graduarás cuando tengas ${graduacion} años`)
  }
}

function obtenerNombre() {
  let input = prompt('Ingresa tu nombre');
  if(!input || !isNaN(input)) return alert('Ingresa un nombre válido');
  let primeraLetra = input.substr(0, 1).toUpperCase();
  let nombreArreglado = `${input.substr(0, 1).toUpperCase()}${input.substr(1)}`;
  nombre.value = nombreArreglado;
  nombre.setAttribute('disabled', true);
  document.getElementById('nombre-label').style.textDecoration = 'line-through';
  usuarioCompletado++;
}

function obtenerEdad() {
  let input = prompt('Ingresa tu edad');
  if(isNaN(input) || !input) return alert("Pon tu edad con números");
  edad.value = input;
  edad.setAttribute('disabled', true);
  document.getElementById('edad-label').style.textDecoration = 'line-through';
  usuarioCompletado++;
}

function obtenerHechizo() {
  let input = prompt('Ingresa tu hechizo favorito');
  if(!input || !isNaN(input)) return alert('Ingresa un hechizo válido');
  let primeraLetra = input.substr(0, 1).toUpperCase();
  let nombreArreglado = `${input.substr(0, 1).toUpperCase()}${input.substr(1)}`;
  hechizo.value = nombreArreglado;
  hechizo.setAttribute('disabled', true);
  document.getElementById('hechizo-label').style.textDecoration = 'line-through';
  usuarioCompletado++;
}

function obtenerAnimal() {
  let input = prompt('Ingresa tu animal favorito');
  if(!input || !isNaN(input)) return alert('Ingresa un animal válido');
  let primeraLetra = input.substr(0, 1).toUpperCase();
  let nombreArreglado = `${input.substr(0, 1).toUpperCase()}${input.substr(1)}`;
  animal.value = nombreArreglado;
  animal.setAttribute('disabled', true);
  document.getElementById('animal-label').style.textDecoration = 'line-through';
  usuarioCompletado++;
}

function seleccionarCasa(e) {
  console.log('e papa', e.target)
  let casa = e.target.id
  if(usuarioCompletado < 4) return alert('Te faltan algunos datos');
  character = new Personaje(nombre.value, edad.value, hechizo.value, animal.value, casa);
  gryffindor.style.cursor = 'not-allowed'
  slytherin.style.cursor = 'not-allowed'
  ravenclaw.style.cursor = 'not-allowed'
  hufflepuff.style.cursor = 'not-allowed'
  creacionExitosa(character)
}

function creacionExitosa(character) {
  localStorage.setItem('usuario', JSON.stringify(character))
  console.log('character', character)
  let casa = character.casa.toUpperCase();
  
  let companerosCasa = personajes.filter(el => el.casaDeHogwarts == character.casa)
  
  informacion.innerHTML = `
      Bienvenido ${character.nombre} a tu nueva casa ${casa}.
      Mira quién más ha pertenecido a esta casa: 
    `;
  
  companerosCasa.forEach(el => Lista.innerHTML += `
      <li class='item-informacion'>${el.personaje}</li>
    `);
    character.hechizar();
    character.patronus();
    character.calcularTiempo();
  };