

//DECLARO VARIABLES

let auth = JSON.parse(localStorage.getItem("auth")) || null,
useravatar = document.getElementById('user-avatar'),
closeuser = document.getElementById('close-user'),
avatar = document.getElementById('avatar'),
users = JSON.parse(localStorage.getItem("users"))



//SI EL USUARIO ESTA LOGUEADO OCULTO EL PAGE LOGIN Y MUESTRO AVATAR Y BOTON CERRAR SESION

if (auth) {
  login.classList="d-none"
  avatar.src = auth.avatar
}
else{
  useravatar.classList="d-none"
  closeuser.classList= "d-none"
}

//DECLARO FUNCION PARA CERRAR SESION
closeuser.addEventListener("click", () => {
  closesesion();
});

const closesesion =() =>{
auth = null
localStorage.removeItem("auth")
location.reload()
}

//MODAL DEL PERFIL
let titulobody = document.querySelector("#titulo-body")
let perfilbody= document.querySelector("#perfil-body")
let tituloModal = document.querySelector("#tituloModal")
let inputpassword = document.querySelector("#inputPassword")
let changeemail = document.querySelector("#change-email")
const perfilmodal = new bootstrap.Modal(document.getElementById('perfilModal'))
let savechange = document.querySelector("#savechange")

const miPerfil = () => {
  titulobody.innerHTML = `<h5><em>Bienvenido <b>${auth.user}</b> a tu perfil</em></h5>`;
  tituloModal.innerHTML = `<h5>Mi perfil <img src="${auth.avatar}"</h5>`;
  changeemail.innerHTML =`<p>Su email actual es: ${auth.email}</p>`;
  
  perfilmodal.show();
};

// Agrega un evento de clic al botón
savechange.addEventListener("click", function () {
  let inputemail = document.querySelector("#inputEmail")
  // Realiza la búsqueda y modificación del usuario aquí
  for (const user of users) {
    if (user.email === auth.email) {
      console.log('Email encontrado:', user.email);

      // Modifica los valores del usuario
      user.email = inputemail.value;

      // Guarda los cambios en localStorage si es necesario
      localStorage.setItem("users", JSON.stringify(users));

      // Cierra el modal después de guardar los cambios
     

      // Puedes detener el bucle si encontraste una coincidencia
      break;
    }
    perfilmodal.hide();
    closesesion()
  }
});
//Abre modal de perfil
avatar.addEventListener("click", () => {
  miPerfil();
});
