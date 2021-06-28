///////////////////
//////OBJETOS//////
///////////////////

let nombre = document.getElementById('nombre');
nombre.addEventListener('click', obtenerNombre);

let edad = document.getElementById('edad');
edad.addEventListener('click', obtenerEdad);

let hechizo = document.getElementById('hechizo');
hechizo.addEventListener('click', obtenerHechizo);

let animal = document.getElementById('animal');
animal.addEventListener('click', obtenerAnimal);

let gryffindor = document.getElementById('gryffindor');
gryffindor.addEventListener('click', seleccionarCasa);

let ravenclaw = document.getElementById('ravenclaw');
ravenclaw.addEventListener('click', seleccionarCasa);

let slytherin = document.getElementById('slytherin');
slytherin.addEventListener('click', seleccionarCasa);

let hufflepuff = document.getElementById('hufflepuff');
hufflepuff.addEventListener('click', seleccionarCasa);

let casaSeleccionada = document.getElementById('casa-seleccionada')
let informacion = document.getElementById('informacion')


let usuarioCompletado = 0;
let character;

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
    alert(this.hechizo)
  }
  patronus() {
    alert(`EXPECTO PATRONUM ==> *un ${this.animal} fue disparado por tu varita*`)
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
  let casa = e.target.className
  if(usuarioCompletado < 4) return alert('Te faltan algunos datos');
  character = new Personaje(nombre.value, edad.value, hechizo.value, animal.value, casa);
  gryffindor.style.cursor = 'not-allowed'
  slytherin.style.cursor = 'not-allowed'
  ravenclaw.style.cursor = 'not-allowed'
  hufflepuff.style.cursor = 'not-allowed'
  creacionExitosa(character)
}

function creacionExitosa(character) {
  casaSeleccionada.classList.add(character.casa);
  let casa = character.casa.toUpperCase();
  casaSeleccionada.innerHTML = '';
  informacion.innerHTML 
  = `Bienvenido ${character.nombre} a tu nueva casa ${casa}, aunque tengas ${character.edad}, nunca es demasiado tarde para la magia`;
  character.hechizar();
  character.patronus();
  character.calcularTiempo();
}