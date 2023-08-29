//DECLARO VARIABLES

let auth = JSON.parse(localStorage.getItem("auth")) || null,
useravatar = document.getElementById('user-avatar'),
closeuser = document.getElementById('close-user'),
avatar = document.getElementById('avatar')


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




