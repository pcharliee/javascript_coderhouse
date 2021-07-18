// HechizosBoton.addEventListener('click', imprimirInformacion);

// /* FUNCIONES*/
// function imprimirInformacion(e) {
//   if (!Hechizos) return alert('Hubo un error. Refresca la página')
//   let hechizosOrdenados = Hechizos.sort(function (a,b) {
//     if(a.hechizo < b.hechizo) { return -1; }
//     if(a.hechizo > b.hechizo) { return 1; }
//     return 0
//   });
//   hechizosOrdenados.forEach(el => {
//     let li = document.createElement('li')
//     li.classList.add('item-information')
//     li.textContent = el.hechizo
//     HechizosBoton.setAttribute('disabled', true)
//     Lista.appendChild(li)
//   });
// };