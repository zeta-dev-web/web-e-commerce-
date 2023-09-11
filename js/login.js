import { User } from "./clases.js"; /* IMPORTO LA CLASE PARA CREAR USUARIOS */

let logemail = document.querySelector("#logemail"),
  logpass = document.querySelector("#logpass"),
  buttonlogin = document.querySelector("#buttonlogin"),
  regname = document.querySelector("#regname"),
  regemail = document.querySelector("#regemail"),
  regpass = document.querySelector("#regpass"),
  regcode = null,
  buttonreg = document.querySelector("#buttonreg"),
  errorlogin = document.querySelector("#contenedor-alert"),
errorreg = document.querySelector("#contenedor-alert2"),
  users = JSON.parse(localStorage.getItem("users")) || [],
  auth = JSON.parse(localStorage.getItem("auth")) || null,
login = document.querySelector("#login")


// Llamamos a la función para crear el objeto de administrador y lo guardamos en la variable admin
const admin = {
  username: "Admin",
  email: "admin@admin.com",
  avatar: "https://cdn.icon-icons.com/icons2/2136/PNG/64/google_admin_icon_131692.png",
  pass: "12345678",
  admin: "master",
};
localStorage.setItem("admin", JSON.stringify(admin));

//verifico si el usuario esta logueado para ocultar iniciar sesion

// INICIO DE SESION
  buttonlogin.addEventListener("click", () => {
  loginUser();
});

const updateAuth = (user, email, avatar, pass, admin, []) => { //funcion para guardar el inicio de sesion
  auth = {
    user: user,
    email: email,
    avatar: avatar,
    pass: pass,
    admin: admin,
    carshop: [],
  };
  localStorage.setItem("auth", JSON.stringify(auth));
};

const loginUser = () => {
  let email = logemail.value;
  let pass = logpass.value;
  let isAdmin = false;
  let isLoggedIn = false;

  // Verificar si los campos de correo electrónico y contraseña están vacíos
  if (email === "" || pass === "") {
    const alertHTML = `
      <div>
        Por favor, complete todos los campos.
      </div>
    `;
    errorlogin.innerHTML = alertHTML;
    errorlogin.classList = "bg-danger bg-opacity-10 border border-danger mt-2";
    errorlogin.role = "alert";

    // Limpiar el mensaje de alerta después de 4 segundos
    setTimeout(() => {
      errorlogin.innerHTML = "";
      errorlogin.classList = "";
    }, 4000);
    return; 
  }

 if (email === admin.email && pass === admin.pass) { //verifico si es admin master
  const alertHTML = `
    <div>
      Iniciando sesion como administrador principal
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  errorlogin.innerHTML = alertHTML;
  errorlogin.classList = "mt-2";
  errorlogin.role = "alert";
   updateAuth(admin.username, admin.email, admin.avatar, admin.pass, "master", []);
  // Limpiar el mensaje de alerta y redirigir después de 3 segundos
  setTimeout(() => {
    errorlogin.innerHTML = "";
    errorlogin.classList = "";
    location.replace("/pages/admin.html");
  }, 3000);
  isLoggedIn = true;
  isAdmin = true;
  return;
} else {
    for (const user of users) {
      if (user.email === email && user.pass === pass) { 
        if (user.admin==="secundario") { //verifico si es admin secundario
          const alertHTML = `
    <div>
      Iniciando sesion como administrador secundario
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  errorlogin.innerHTML = alertHTML;
  errorlogin.classList = "mt-2";
  errorlogin.role = "alert";
 updateAuth(user.username, user.email, user.avatar, user.pass, "secundario", []);
  // Limpiar el mensaje de alerta y redirigir después de 3 segundos
  setTimeout(() => {
    errorlogin.innerHTML = "";
    errorlogin.classList = "";
    location.replace("/pages/admin.html");
  }, 3000);
  isLoggedIn = true;
  isAdmin = true;
  return;
        } else {//verifico si es usuario registrado
          const alertHTML = `
    <div>
      Iniciando sesion
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  errorlogin.innerHTML = alertHTML;
  errorlogin.classList = "mt-2";
  errorlogin.role = "alert";
 updateAuth(user.username, user.email, user.avatar, user.pass, "false", user.carshop);
  // Limpiar el mensaje de alerta y redirigir después de 3 segundos
  setTimeout(() => {
    errorlogin.innerHTML = "";
    errorlogin.classList = "";
    location.replace("../index.html");
  }, 3000);
  isLoggedIn = true;
        }
        break;
      }
    }
  }

  if (!isLoggedIn) {// si no es admin o usuario registrado da error
    const alertHTML = `
      <div>
        Error de email o contraseña.
      </div>
    `;
    errorlogin.innerHTML = alertHTML;
    errorlogin.classList = "bg-danger bg-opacity-10 border border-danger mt-2";
    errorlogin.role = "alert";

    // Limpiar el mensaje de alerta después de 4 segundos
    setTimeout(() => {
      errorlogin.innerHTML = "";
      errorlogin.classList = "";
    }, 4000);
  }
  // Limpia los campos de entrada
  logpass.value = "";
};


// -------------------------------------------------- //

//creo el modal para mostrar el codigo de seguridad
const modalSeg = document.querySelector("#codeModal");
const codeModal = new bootstrap.Modal(modalSeg);
const closeAndRedirect = document.querySelector("#closeAndRedirect")

// REGISTRO DE USUARIO

//generador de codigo de seguridad
const generateRandomCode = (length) => { // funcion para generar codigo para el restablecimiento de clave
  const characters = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

buttonreg.addEventListener("click", () => {
  let regavatar = document.querySelector('input[name="avatar"]:checked'); // Captura el avatar seleccionado al hacer clic en el botón
//   si no hay un avatar seleccionado da error 
 if (!regavatar) {
    const alertHTML = `
      <div>
        Seleccione un avatar.
      </div>
    `;
    errorreg.innerHTML = alertHTML;
    errorreg.classList = "bg-danger bg-opacity-10 border border-danger mt-2";
    errorreg.role = "alert";
    
    // Limpiar el mensaje de alerta después de 3 segundos
    setTimeout(() => {
      errorreg.innerHTML = "";
      errorreg.classList = "";
    }, 3000);
  } else {
    crearUsuario(regavatar);
  }
});
const crearUsuario = (regavatar) => { 
    if (regname.value === "" || regpass.value === "" || regemail.value === "") {//verifico que esten todos los campos llenos
    const alertHTML = `
                <div>
                    Llene todos los campos del registro.
                </div>
        `;
        errorreg.innerHTML = alertHTML;
        errorreg.classList = "bg-danger bg-opacity-10 border border-danger mt-2" 
        errorreg.role="alert";
        // Limpiar el mensaje de alerta despues de 3 segundos
    setTimeout(() => {
      errorreg.innerHTML = "";
      errorreg.classList = "";
    }, 3000); 
    }
    else if (!regemail.value.includes("@")) { //verifico que el email tenga un @
const alertHTML = `
                <div>
                    Email no válido.
                </div>
        `;
        errorreg.innerHTML = alertHTML;
        errorreg.classList = "bg-danger bg-opacity-10 border border-danger mt-2" 
        errorreg.role="alert";
    // Limpiar el mensaje de alerta despues de 3 segundos
    setTimeout(() => {
      errorreg.innerHTML = "";
      errorreg.classList = "";
    }, 3000); 
    }
     else if (regpass.value.length < 8 ) { // verifico que la contraseña tenga mas de 8 caracteres
const alertHTML = `
                <div>
                    La Contraseña debe tener mínimo 8 carácteres.
                </div>
        `;
        errorreg.innerHTML = alertHTML;
        errorreg.classList = "bg-danger bg-opacity-10 border border-danger mt-2" 
        errorreg.role="alert";
    // Limpiar el mensaje de alerta despues de 3 segundos
    setTimeout(() => {
      errorreg.innerHTML = "";
      errorreg.classList = "";
    }, 3000); 
    }
    else {
const registrationCode = generateRandomCode(4); //genero el codigo de recuperacion de clave
regcode =registrationCode

  const user = new User( //creo el usuario dada las condiciones
    regname.value,
    regemail.value,
    regpass.value,
    regavatar.value,
    registrationCode,
  );

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users)); //actualizo la local Storage

  // Actualizar el arreglo users con los datos del Local Storage
  users = JSON.parse(localStorage.getItem("users"));

  // Modifica el contenido del modal-body con el mensaje y el código
const modalBody = modalSeg.querySelector(".modal-body");
modalBody.innerHTML = `
    <p><b>IMPORTANTE:</p></b> 
    <p>Guarde el siguiente código por si olvida su contraseña: <b>${registrationCode}</b></p>
`;

// Muestra el modal
codeModal.show();
}}
const sendMail = (regcode) => { // Añade registrationCode como argumento
  const cuerpoCorreo = `<h2><b>👏🏻Bienvenid@ ${regname.value} a StoreNote💻👏🏻</b></h2>
  <h3>El sitio de ventas de Notebooks más grande de Argentina.</h3><br>
  <h5>⚠️ Recuerda guardar tu número de seguridad para recuperar tu clave, este es: <b>${regcode}.</b></h5>
  <p>Si tienes alguna duda o consulta, no dudes en contactarnos a nuestro <a href="https://wa.me/">Whatsapp📲</a> o por nuestras redes.</p>
`;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "storenote@outlook.com",
    Password: "761632CC0966665953829FBD0F329EEB2DE7",
    To: regemail.value,
    From: "storenote@outlook.com",
    Subject: "Te damos la bienvenida a StoreNote💻",
    Body: cuerpoCorreo
  }).then(() => {
    alert("Usuario registrado con éxito");
       window.location.href = "./login.html";
});
}


  regname.value = "";
  regemail.value = "";
  regpass.value = "";

closeAndRedirect.addEventListener("click", () => {
  // location.replace("../index.html");
  // codeModal.hide();
 sendMail(regcode); // Pasa registrationCode como argumento a sendMail
  codeModal.hide();
});
// recuperacion de clave
// Captura el modal del código de seguridad
const recoveryModal = new bootstrap.Modal(document.getElementById('recoverypass'));

// Captura el botón de recuperación
const btnRecovery = document.getElementById('btnrecovery');

btnRecovery.addEventListener('click', (event) => {
  event.preventDefault();
  const modalBody = document.querySelector("#modal-body-pass");
  modalBody.innerHTML =`
    <p>Para recuperar su contraseña, ingrese su email y su código de seguridad proporcionado al registrarse.</p>
<form>
  <div class="row g-3 align-items-center">
    <div class="col-2">
      <label class="col-form-label">Email</label>
    </div>
    <div class="col-10">
      <input type="text" id="recoveryEmail" class="form-control" aria-describedby="passwordHelpInline">
    </div>
  </div>
<div class="row g-3 align-items-center m-0 pt-1">
  <div class="col-auto p-0 m-0">
    <label class="col-form-label">Codigo de Seguridad</label>
  </div>
  <div class="col-2 p-0 m-0 ms-2">
    <input type="text" id="recoveryCode" class="form-control" aria-describedby="passwordHelpInline">
  </div>
  </div>
  <p id="btnreccode" class="btn btn-link text-warning fs-6 d-flex justify-content-center">¿No recuerdas tu codigo de Seguridad?</p>
<button type="button" id="confirmRecovery" class="btn btn-primary ms-auto d-flex justify-content-start mt-1">Confirmar</button>
</form>
`;

  recoveryModal.show();

  const recoveryCode = document.getElementById("btnreccode")
  recoveryCode.addEventListener('click', () => {
    modalBody.innerHTML = `
        <p>Ingrese su email actual</p>
    <div class="row g-3 align-items-center">
    <div class="col-12">
      <input type="text" id="emailactual" class="form-control" aria-describedby="passwordHelpInline">
    </div>
  </div>
        <button type="button" id="confirmemail" class="btn btn-primary ms-auto d-flex justify-content-start mt-1">Confirmar</button>
      `;
      const confirmemail = document.getElementById("confirmemail")

confirmemail.addEventListener('click', () => {
    const emailActual = document.getElementById("emailactual").value;

    // Buscar el email en el arreglo users
    const foundUser = users.find(user => user.email === emailActual);

    if (foundUser) {
      const sendMailcode= () => { 
  const cuerpoCorreo = `<h2><b>Estimad@ Usuario ${emailActual}:</b></h2>
  <h3>Te recordamos tu codigo de seguridad de StoreNote💻</h3><br>
  <h3>Con éste podras restablecer tu clave. Tu codigo es: ${userCode}</h3><br>
  <h5>⚠️ No compartas este código, si no lo solicitaste comunicate con soporte.</b></h5>
  <p>Si tienes alguna duda o consulta, no dudes en contactarnos a nuestro <a href="https://wa.me/">Whatsapp📲</a> o por nuestras redes.</p>
`;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "storenote@outlook.com",
    Password: "761632CC0966665953829FBD0F329EEB2DE7",
    To: emailActual,
    From: "storenote@outlook.com",
    Subject: "codigo de Seguridad de StoreNote💻",
    Body: cuerpoCorreo
  }).then(() => {
    // Mostrar mensaje de éxito o hacer alguna otra acción
        modalBody.innerHTML = `
          <p>Codigo de Seguridad enviado con éxito!</p>
        `;
});
}
sendMailcode()
    } else {
      modalBody.innerHTML = `
          <p>El email ${emailActual} no esta registrado. Verifica el email ingresado o registrate.</p>
        `
    }
});
  })  

  const confirmRecoveryButton = document.getElementById("confirmRecovery");
    
  confirmRecoveryButton.addEventListener('click', () => {
  const email = document.getElementById("recoveryEmail").value;
    const recoveryCode = document.getElementById("recoveryCode").value;
    
    // Buscar el usuario en el arreglo users
    const foundUser = users.find(user => user.email === email && user.code === recoveryCode);

    if (foundUser) {
      modalBody.innerHTML = `
        <p>Ingrese nueva contraseña</p>
    <div class="row g-3 align-items-center">
    <div class="col-12">
      <input type="text" id="newPassword" class="form-control" aria-describedby="passwordHelpInline">
    </div>
  </div>
        <button type="button" id="confirmPass" class="btn btn-primary ms-auto d-flex justify-content-start mt-1">Confirmar</button>
      `;

      const confirmPassButton = document.getElementById("confirmPass");

      confirmPassButton.addEventListener('click', () => {
        // Modificar la contraseña
        const newPassword = document.getElementById("newPassword").value;
        foundUser.pass = newPassword;

        // Actualizar el arreglo en localStorage
        localStorage.setItem("users", JSON.stringify(users));

const sendMailpass = () => { 
  const cuerpoCorreo = `<h2><b>Estimad@ Usuario ${email}:</b></h2>
  <h3>Tu contraseña fue cambiada con éxito en StoreNote💻</h3><br>
  <h5>⚠️ Si tu no realizaste el cambio, comunicate con soporte.</b></h5>
  <p>Si tienes alguna duda o consulta, no dudes en contactarnos a nuestro <a href="https://wa.me/">Whatsapp📲</a> o por nuestras redes.</p>
`;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "storenote@outlook.com",
    Password: "761632CC0966665953829FBD0F329EEB2DE7",
    To: email,
    From: "storenote@outlook.com",
    Subject: "Se cambió tu clave en nuestra tienda StoreNote💻",
    Body: cuerpoCorreo
  }).then(() => {
    // Mostrar mensaje de éxito o hacer alguna otra acción
        modalBody.innerHTML = `
          <p>Contraseña actualizada con éxito!</p>
        `;
});
}
sendMailpass()
      });
    } else {
      // Mostrar mensaje de error
      modalBody.innerHTML = `
        <p>No se encontró ningún usuario con el email y código de seguridad proporcionados</p>
      `;
    }
  });
});

