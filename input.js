// /* DATA */
// const label = [
//   { id: 'nombre-label', for: 'nombre', text: `¿Cómo te llamas?` },
//   { id: 'hechizo-label', for: 'hechizo', text: `¿Cúal es tu hechizo favorito?` },
//   { id: 'edad-label', for: 'edad', text: `¿Cuántos años tienes?`},
//   { id: 'animal-label', for: 'animal', text: `¿Cúal es tu animal favorito?` },
// ];

// const inputStyle = ['text', 'boton-seleccion text-center'];
// const inputArray = [
//   { placeholder: 'Nombre', type: inputStyle[0], class: inputStyle[1] },
//   { placeholder: 'Hechizo', type: inputStyle[0], class: inputStyle[1] },
//   { placeholder: 'Animal', type: inputStyle[0], class: inputStyle[1] },
//   { placeholder: 'Edad', type: inputStyle[0], class: inputStyle[1] },
// ];

// const casas = [ `Gryffindor`, `Slytherin`, `Ravenclaw`, `Hufflepuff`];

// /* DOM ELEMENTS */
// const casasContainer = document.getElementById('Casas');
// const form = document.getElementById('formulario');
// const infoTitle = document.getElementById('information-title');
// let busquedaBox = createDomElement(`div`, `Busqueda-box`, `busqueda-box`);
// let busqueda = createDomElement(`input`, `Busqueda`,'busqueda text-center', `input`);
// busqueda.setAttribute('placeholder', 'Hechizo')
// busqueda.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') buscarHechizo();
// })

// let button = createDomElement(`input`,'busqueda-boton', 'boton-seleccion', `button`);
// button.setAttribute('value', 'Buscar');

// /* DOM EVENT HANDLERS */
// button.addEventListener('click', buscarHechizo);

// /* DOM INSERTIONS */
// form.prepend(busquedaBox);
// busquedaBox.prepend(busqueda);
// busquedaBox.append(button);

// /* FUNCTIONS */
// function buscarHechizo(Spells) {
//   let hechizoEncontrado = spells.find(spell => spell.hechizo.toLowerCase() == busqueda.value.toLowerCase());
//   hechizoEncontrado ? infoTitle.textContent = hechizoEncontrado.uso : infoTitle.textContent = `No pudimos encontrar ese hechizo...`
// };

// function crearCasas(casas) {
//   casas.map(c => {
//     let i = document.createElement('i');
//     i.setAttribute('id', `${c}`);
//     i.setAttribute('class', `${c.toLowerCase()}`);
//     casasContainer.appendChild(i);
//   });
// };

// function createDomElement(type, id, className, inputType) {
//   let element = document.createElement(type);
//   element.setAttribute('id', id);
//   if(className) element.setAttribute('class', className);
//   if(inputType) element.setAttribute('type', inputType);
//   return element;
// };

// crearCasas(casas);