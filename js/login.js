import { User } from "./clases.js"; /* IMPORTO LA CLASE PARA CREAR USUARIOS */

let logemail = document.querySelector("#logemail"),
  logpass = document.querySelector("#logpass"),
  buttonlogin = document.querySelector("#buttonlogin"),
  regname = document.querySelector("#regname"),
  regemail = document.querySelector("#regemail"),
  regpass = document.querySelector("#regpass"),
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

const updateAuth = (user, email, avatar, pass, [], admin) => { //funcion para guardar el inicio de sesion
  auth = {
    user: user,
    email: email,
    avatar: avatar,
    pass: pass,
    carshop: [],
    admin: admin,
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
   updateAuth(admin.username, admin.email, admin.avatar, admin.pass, "master");
  // Limpiar el mensaje de alerta y redirigir después de 4 segundos
  setTimeout(() => {
    errorlogin.innerHTML = "";
    errorlogin.classList = "";
    location.replace("/pages/admin.html");
  }, 4000);
  isLoggedIn = true;
  isAdmin = true;
  return;
} else {
    for (const user of users) {
      if (user.email === email && user.pass === pass) { 
        if (user.admin) { //verifico si es admin secundario
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
 updateAuth(user.username, user.email, user.avatar, user.pass, "secundario");
  // Limpiar el mensaje de alerta y redirigir después de 4 segundos
  setTimeout(() => {
    errorlogin.innerHTML = "";
    errorlogin.classList = "";
    location.replace("/pages/admin.html");
  }, 4000);
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
 updateAuth(user.username, user.email, user.avatar, user.pass, user.carshop, "false");
  // Limpiar el mensaje de alerta y redirigir después de 4 segundos
  setTimeout(() => {
    errorlogin.innerHTML = "";
    errorlogin.classList = "";
    location.replace("../index.html");
  }, 4000);
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

  const user = new User( //creo el usuario dada las condiciones
    regname.value,
    regemail.value,
    regpass.value,
    regavatar.value,
    registrationCode,
  );

  console.log(users);
  console.log(user);

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users)); //actualizo la local Storage

  // Actualizar el arreglo users con los datos del Local Storage
  users = JSON.parse(localStorage.getItem("users"));

  regname.value = "";
  regemail.value = "";
  regpass.value = "";

  // Modifica el contenido del modal-body con el mensaje y el código
const modalBody = modalSeg.querySelector(".modal-body");
modalBody.innerHTML = `
    <p><b>IMPORTANTE:</p></b> 
    <p>Guarde el siguiente código por si olvida su contraseña: <b>${registrationCode}</b></p>
`;

// Muestra el modal
codeModal.show();
}}

closeAndRedirect.addEventListener("click", () => {
  location.replace("../index.html");
  codeModal.hide();
});
// recuperacion de clave
// Captura el modal del código de seguridad
const recoveryModal = new bootstrap.Modal(document.getElementById('codeModal'));

// Captura el botón de recuperación
const btnRecovery = document.getElementById('btnrecovery');

btnRecovery.addEventListener('click', (event) => {
  event.preventDefault();

  const modalBody = modalSeg.querySelector(".modal-body");
  const passrecoveryLabel = document.querySelector("#exampleModalLabel")
  passrecoveryLabel.innerHTML=`<b>Recuperacion de Contraseña</b>` 
  modalBody.innerHTML = `
    <p>Para recuperar su contraseña, ingrese su email y su código de seguridad proporcionado al registrarse.</p>
    <input type="email" id="recoveryEmail" placeholder="Email"class="col-7">
    <input type="text" id="recoveryCode" placeholder="Código" class="col-2">
    <button type="button" id="confirmRecovery" class="btn btn-primary">Confirmar</button>
`;

  recoveryModal.show();

  const confirmRecoveryButton = document.getElementById("confirmRecovery");

  confirmRecoveryButton.addEventListener('click', () => {
    const email = document.getElementById("recoveryEmail").value;
    const recoveryCode = document.getElementById("recoveryCode").value;
    
    // Buscar el usuario en el arreglo users
    const foundUser = users.find(user => user.email === email && user.code === recoveryCode);

    if (foundUser) {
      modalBody.innerHTML = `
        <p>Ingrese nueva contraseña</p>
        <input type="password" id="newPassword" placeholder="Contraseña" class="col-9">
        <button type="button" id="confirmPass" class="btn btn-primary">Confirmar</button>
      `;

      const confirmPassButton = document.getElementById("confirmPass");

      confirmPassButton.addEventListener('click', () => {
        // Modificar la contraseña
        const newPassword = document.getElementById("newPassword").value;
        foundUser.pass = newPassword;

        // Actualizar el arreglo en localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Mostrar mensaje de éxito o hacer alguna otra acción
        modalBody.innerHTML = `
          <p>Contraseña actualizada con éxito!</p>
        `;
      });
    } else {
      // Mostrar mensaje de error
      modalBody.innerHTML = `
        <p>No se encontró ningún usuario con el email y código de seguridad proporcionados</p>
      `;
    }
  });
});

