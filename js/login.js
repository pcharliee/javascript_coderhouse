
localStorage.setItem('usuario', JSON.stringify({ nombre: 'Muggle sin nombre'}));

class Usuario {
  constructor(username, nombre, email, bio) {
    this.username = username;
    this.nombre = nombre;
    this.email = email;
    this.bio = bio;
  };
};

let button = $('#button');

function loginSuccess() {
  let user = localStorage.getItem('usuario');
  if(!user.nombre)
  // localStorage.setItem('usuario', JSON.stringify({ nombre: 'Muggle sin nombre'}));
  
  location.href = 'landing.html';
}

function ingresarUsuario(e) {
  e.preventDefault();
  let username = $('#username-login').val();
  let nombre = $('#nombre-login').val();
  let email = $('#email-login').val();
  let bio = $('#bio-login').val();
  let nuevoUsuario = new Usuario (username, nombre, email, bio);
  
  localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  loginSuccess();
};

button.on('click', ingresarUsuario);
