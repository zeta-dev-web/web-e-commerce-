import { CarShop } from "./clases.js"

//DECLARO VARIABLES
let auth = JSON.parse(localStorage.getItem("auth")) || null,
useravatar = document.getElementById('user-avatar'),
closeuser = document.getElementById('close-user'),
avatar = document.getElementById('avatar'),
users = JSON.parse(localStorage.getItem("users")),
login = document.querySelector("#login"),
productos = JSON.parse(localStorage.getItem("productos")),
buttoncart = document.querySelector("#buttoncart"),
avatarnav2 =document.querySelector("#avatarnav2"),
avatarnavimg =document.querySelector("#avatarnavimg")

//SI EL USUARIO ESTA LOGUEADO OCULTO EL PAGE LOGIN Y MUESTRO AVATAR Y BOTON CERRAR SESION

if (auth) {

  login.innerHTML=`<a id="cerrarSesionLink" class="nav-link" href="./pages/login.html">Cerrar Sesión</a>`
  login.classList=`d-xl-none d-lg-none`
  avatar.src = auth.avatar
avatarnav2.classList=`d-xl-none d-lg-none`
avatarnavimg.src=auth.avatar
avatarnavimg.width=35
 avatarnavimg.height=35
}
else{
  useravatar.classList="d-none"
  closeuser.classList= "d-none"
  avatarnav2.classList="d-none"
}

if (auth.admin === "master" || auth.admin === "secundario") {
  document.querySelector("#search").classList="d-none"
document.querySelector("#buttoncart").classList="d-none"
document.querySelector("#adminpage").classList="nav-item"
document.querySelector("#miPerfilLink").classList="d-none"
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

// agrego funcion a cerrar sesion en dispositivos pequeños
document.getElementById('cerrarSesionLink').addEventListener("click", function(event) {
  event.preventDefault();
    closesesion()
});

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
  let inputPassword = document.querySelector("#inputPassword")
  // Realiza la búsqueda y modificación del usuario aquí
  for (const user of users) {
    if (user.email === auth.email) {
      console.log('Email encontrado:', user.email);

      // Modifica los valores del usuario
      user.email = inputemail.value;
      user.pass = inputPassword.value;

      // Guarda los cambios en localStorage si es necesario
      localStorage.setItem("users", JSON.stringify(users));

      // Cierra el modal después de guardar los cambios
     

      // Puedes detener el bucle si encontraste una coincidencia
      break;
    }
    perfilmodal.hide();
    
  }
  closesesion()
});

//Abre modal de perfil
avatar.addEventListener("click", () => {
  if (auth.admin === "master" || auth.admin === "secundario") {
    window.location.href = "../pages/admin.html";
  } else {
    // Si no es administrador, realiza otra acción (por ejemplo, abre 'miPerfil()')
    miPerfil();
  }
});

//abre modal en dispositivos pequeños
// Agrega un evento de clic al enlace "Iniciar Sesión"
document.getElementById('miPerfilLink').addEventListener("click", function(event) {
  event.preventDefault();
    if (auth.admin === "master" || auth.admin === "secundario") { 
    window.location.href = "../pages/admin.html";} else {
    miPerfil();
}});


//carrito

const carritomodal = new bootstrap.Modal(document.getElementById('carritoModal'))


//este codigo debe ir junto con las tarjetas que ejecuta la funcion agregar producto al carrito
window.agregarCarrito = () => {
  // Crea un nuevo objeto CarShop
  const addcarshop = new CarShop(1, 1, "https://www.cordobanotebooks.com.ar/wp-content/uploads/2023/04/NP750XDA-KD1US4.jpg", "LENOVO", 150000);

  // Verifica si el producto ya está en el carrito
  let productoExistente = null;
  for (const producto of auth.carshop) {
    if (producto.id === addcarshop.id) {
      productoExistente = producto;
      break; // Detén el bucle si se encuentra una coincidencia
    }
  }

  if (productoExistente) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    productoExistente.cantidad++;
  } else {
    // Si el producto no está en el carrito, agrégalo como nuevo elemento
    addcarshop.cantidad = 1; // Inicializa la cantidad en 1
    auth.carshop.push(addcarshop); // Agrega el objeto completo, no solo su cantidad
  }

  // Actualiza el contenido de auth en la local storage
  localStorage.setItem('auth', JSON.stringify(auth));
};


// Verifica el contenido de auth.carshop
console.log(auth.carshop);


//abre modal de carrito
buttoncart.addEventListener("click", () => {
  miCarrito();
});

const miCarrito = () => {
  let carritobody = document.querySelector("#carrito-body");
  
  if (auth.carshop.length === 0) {
    // Si el arreglo está vacío, muestra un mensaje
    carritobody.innerHTML = '<h5 class="font-weight-bold">No posee productos agregados.</h5>';
  } else {
    // Si el arreglo no está vacío, genera la tabla
    let tablaHTML = '<table class="table"><thead><tr><th>CANTIDAD</th><th>FOTO</th><th>MARCA</th><th>PRECIO</th></tr></thead><tbody>';
  
    auth.carshop.forEach(function (producto) {
      tablaHTML += '<tr>';
      tablaHTML += '<td>' + producto.cantidad + '</td>';
      tablaHTML += '<td><img src="' + producto.imagen + '" alt="modelo" width="50" height="50"></td>';
      tablaHTML += '<td>' + producto.marca + '</td>';
      tablaHTML += '<td>' + producto.precio + '</td>';
      tablaHTML += '</tr>';
    });
  
    tablaHTML += '</tbody></table>';
    
    // Agrega la tabla generada al div con id "carrito-body"
    carritobody.innerHTML = tablaHTML;
  }

  carritomodal.show();
};