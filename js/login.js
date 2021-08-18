
localStorage.setItem('usuario', JSON.stringify({ nombre: 'Muggle sin nombre'}));

class Usuario {
  constructor(nombre, email, bio) {
    this.nombre = nombre;
    this.email = email;
    this.bio = bio;
  };
};

function loginValidation() {
  let user = JSON.parse(localStorage.getItem('usuario'));
  let loginValidation = 0;
  Object.keys(user).map((keyValue) => {
    if(!user[keyValue]) loginValidation++;
  })
  loginSuccess(loginValidation);
}

function loginSuccess(completion) {
  if(completion > 0) {
    return alert('Completa el formulario');
    return;
  }
  location.href = '../landing.html';
};

function ingresarUsuario(e) {
  e.preventDefault();
  let nombre = $('#nombre-login').val();
  let email = $('#email-login').val();
  let bio = $('#bio-login').val();
  let nuevoUsuario = new Usuario (nombre, email, bio);
  
  localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  loginValidation();
};

$('#button').on('click', ingresarUsuario);

var textWrapper = document.querySelector('.welcome-title');
textWrapper.innerHTML = textWrapper.textContent
.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({loop: true})
.add({
  targets: '.welcome-title .letter',
  opacity: [0,1],
  easing: 'easeInOutQuad',
  duration: 1150,
  delay: (el, i) => 150 * (i+1)
});

var textWrapper = document.querySelector('.welcome-title-span');
textWrapper.innerHTML = textWrapper.textContent
.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({loop: true})
.add({
  targets: '.welcome-title-span .letter',
  opacity: [0,1],
  easing: 'easeInOutQuad',
  duration: 1600,
  delay: (el, i) => 150 * (i+1)
});