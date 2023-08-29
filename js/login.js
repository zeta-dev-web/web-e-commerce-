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
  password: "12345678",
  avatar: "cdn.icon-icons.com/icons2/35/PNG/64/admin_person_user_man_2839.png",
};
localStorage.setItem("admin", JSON.stringify(admin));

//verifico si el usuario esta logueado para ocultar iniciar sesion

// INICIO DE SESION
  buttonlogin.addEventListener("click", () => {
  loginUser();
});

const updateAuth = (user, email, avatar, admin) => { //funcion para guardar el inicio de sesion
  auth = {
    user: user,
    email: email,
    avatar: avatar,
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

 if (email === admin.email && pass === admin.password) { //verifico si es admin master
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
   updateAuth(admin.username, admin.email, admin.avatar, "master");
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
 updateAuth(admin.username, admin.email, admin.avatar, "secundario");
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
 updateAuth(admin.username, admin.email, admin.avatar, "false");
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
  logemail.value = "";
  logpass.value = "";
};


// -------------------------------------------------- //

//creo el modal para mostrar el codigo de seguridad
const modalSeg = document.querySelector("#codeModal");
const codeModal = new bootstrap.Modal(modalSeg);

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
    <p>IMPORTANTE: Guarde el siguiente código por si olvida su contraseña: ${registrationCode}</p>
`;

// Muestra el modal
codeModal.show();
}}

// capturo el boton de cerrar del modal y redirecciono
const close = document.getElementById("closeAndRedirect");

// Agrega un evento de clic al botón
close.addEventListener("click", () => {
    location.replace("./login.html");
});

// recuperacion de clave
// Captura el modal del código de seguridad
const recoveryModal = new bootstrap.Modal(document.getElementById('codeModal'));

// Captura el botón de recuperación
const btnRecovery = document.getElementById('btnrecovery');

btnRecovery.addEventListener('click', (event) => {
  event.preventDefault(); // Previene el comportamiento predeterminado del enlace
  recoveryModal.show(); // Muestra el modal
});

