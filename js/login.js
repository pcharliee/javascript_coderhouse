
localStorage.setItem('usuario', JSON.stringify({ nombre: 'Muggle sin nombre'}));

class Usuario {
  constructor(username, nombre, email, bio) {
    this.username = username;
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
    console.log($('input').map(e => e))
  }
  console.log('com', completion)
  location.href = '../landing.html';
};

function ingresarUsuario(e) {
  e.preventDefault();
  let username = $('#username-login').val();
  let nombre = $('#nombre-login').val();
  let email = $('#email-login').val();
  let bio = $('#bio-login').val();
  let nuevoUsuario = new Usuario (username, nombre, email, bio);
  
  localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  loginValidation();
};

$('#button').on('click', ingresarUsuario);