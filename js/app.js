import { CarShop } from "./clases.js"
import { crearProductos } from "./productos.js";

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
avatarnavimg =document.querySelector("#avatarnavimg"),
searchinput = document.querySelector("#searchinput"),
btnsearch = document.querySelector("#btnsearch")

// creo productos demo
crearProductos()
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

if (auth && (auth.admin === "master" || auth.admin === "secundario")) {
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
const cerrarSesionLink = document.getElementById('cerrarSesionLink');
if (cerrarSesionLink) {
  // Si el elemento existe, agrega el evento
  cerrarSesionLink.addEventListener("click", function(event) {
    event.preventDefault();
    closesesion();
  });
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

savechange.addEventListener("click", function () {
  let inputemail = document.querySelector("#inputEmail");
  let inputPassword = document.querySelector("#inputPassword");
  
  // Verificar si el email y la contraseña se ingresaron
  const newEmail = inputemail.value.trim();
  const newPassword = inputPassword.value.trim();

  if (!newEmail && !newPassword) {
    alert("Por favor, complete al menos uno de los campos antes de guardar los cambios.");
    return; // Detener la ejecución si ambos campos están vacíos
  }
  
  // Preguntar al usuario si está seguro de guardar los cambios
  if (!confirm("¿Está seguro de que desea guardar los cambios?")) {
    return; // Detener la ejecución si el usuario cancela
  }
  
  // Realiza la búsqueda y modificación del usuario aquí
  for (const user of users) {
    if (user.email === auth.email) {
      // Modificar el email si se ingresó uno nuevo
      if (newEmail) {
        user.email = newEmail;
      }
      
      // Modificar la contraseña si se ingresó una nueva
      if (newPassword) {
        user.pass = newPassword;}

      // Guardar los cambios en localStorage si es necesario
      localStorage.setItem("users", JSON.stringify(users));
const sendMailchange= () => {       
const cuerpoCorreo = `<h2><b>Estimad@ Usuario ${user.email}:</b></h2>
  <h3>Los cambios en tu cuenta (email o contraseña) se realizaron con éxito en StoreNote💻</h3><br>
  <h5>⚠️ Si tu no realizaste el cambio, comunicate con soporte.</b></h5>
  <p>Si tienes alguna duda o consulta, no dudes en contactarnos a nuestro <a href="https://wa.me/">Whatsapp📲</a> o por nuestras redes.</p>
`;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "storenote@outlook.com",
    Password: "761632CC0966665953829FBD0F329EEB2DE7",
    To: user.email,
    From: "storenote@outlook.com",
    Subject: "Se cambiaron datos en nuestra tienda StoreNote💻",
    Body: cuerpoCorreo
  }).then(() => {
    // Mostrar mensaje de éxito o hacer alguna otra acción
 console.log("email enviado");
 console.log(user.email);
    closesesion();
});
}
sendMailchange()
      // Cierra el modal después de guardar los cambios
      perfilmodal.hide();

      // Puedes detener el bucle si encontraste una coincidencia
      // break;
    }
  }
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

const miCarrito = () => {
  let totalPrecio = 0;
  let carritobody = document.querySelector("#carrito-body");
  let auth = JSON.parse(localStorage.getItem("auth"))
  if (!auth || !auth.carshop || auth.carshop.length === 0){
    // Si el arreglo está vacío, muestra un mensaje
    carritobody.innerHTML = '<h5 class="font-weight-bold">No posee productos agregados al 🛒</h5>';
    carritomodal.show()
  } else {
    // Si el arreglo no está vacío, genera la tabla
   // Función para generar y mostrar la tabla en el modal
const mostrarTablaEnModal = () => {
  let tablaHTML = '<table class="table"><thead><tr><th class="text-center">CANTIDAD</th><th>FOTO</th><th>NOMBRE</th><th>PRECIO</th></tr></thead><tbody>';

  auth.carshop.forEach(function (producto, index) {
    let tablacarrito = `<tr>
      <td class="text-center">
        <button class="buttonrem btn btn-sm btn-danger" data-index="${index}">-</button>
        <span>${producto.cantidad}</span>
        <button class="buttonadd btn btn-sm btn-success" data-index="${index}">+</button>
      </td>
      <td><img src="${producto.imagen}" alt="modelo" width="50" height="50"></td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio*producto.cantidad}</td>
    </tr>`;
    tablaHTML += tablacarrito;
  });

  // Calcular el total de la columna "PRECIO"
  let totalPrecio = 0;
  auth.carshop.forEach(function (producto) {
    totalPrecio += parseFloat(producto.precio)*(producto.cantidad);
  });

  // Redondear el total a cero decimales
  totalPrecio = totalPrecio.toFixed(0);

  // Agregar una fila al final de la tabla con el total
  tablaHTML += `<tr>
    <td></td>
    <td></td>
    <td class="text-primary fs-4"><b>Total:</br></td>
    <td class="text-primary fs-4">$${totalPrecio}</td>
  </tr></tbody></table>`;

  // Agrega la tabla generada al div con id "carrito-body"
  carritobody.innerHTML = tablaHTML;

  // Obtener todos los botones de incrementar y decrementar cantidad
  const buttonrem = document.querySelectorAll(".buttonrem");
  const buttonadd = document.querySelectorAll(".buttonadd");
  const cantidadSpan = document.querySelectorAll(".text-center span");

  // Agregar eventos a los botones para modificar la cantidad
  //eliminar
  buttonrem.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dataIndex = btn.getAttribute("data-index");
      if (auth.carshop[dataIndex].cantidad > 1) {
        auth.carshop[dataIndex].cantidad--;
        cantidadSpan[dataIndex].textContent = auth.carshop[dataIndex].cantidad;
        localStorage.setItem('auth', JSON.stringify(auth));
        // Llama a la función para actualizar la tabla
        mostrarTablaEnModal();
      }
      else {
      // Si la cantidad es 1, mostrar un alert de confirmación
      const confirmarEliminar = confirm("¿Seguro que deseas eliminar este producto?");
      if (confirmarEliminar) {
        // Elimina el producto del arreglo carshop
        auth.carshop.splice(dataIndex, 1);
        localStorage.setItem('auth', JSON.stringify(auth));
        // Llama a la función para actualizar la tabla
        mostrarTablaEnModal();
        miCarrito()
      }
    }
    });
  });
  //boton agregar
  buttonadd.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dataIndex = btn.getAttribute("data-index");
      auth.carshop[dataIndex].cantidad++;
      cantidadSpan[dataIndex].textContent = auth.carshop[dataIndex].cantidad;
      localStorage.setItem('auth', JSON.stringify(auth));
      // Llama a la función para actualizar la tabla
      mostrarTablaEnModal();
    });
  });
};

// Llama a la función para generar y mostrar la tabla en el modal inicialmente
mostrarTablaEnModal();

// Abre el modal
carritomodal.show();
  }
};

//abre modal de carrito desde el boton del nav
buttoncart.addEventListener("click", () => {
  miCarrito();
});
//abre modal de carrito desde el boton flotante en dispositivos moviles
let cartfloat=document.querySelector("#cartfloat")
cartfloat.addEventListener("click", () => {
  miCarrito();

});
//boton comprar del modal
let buttonpay = document.querySelector("#pay")
       buttonpay.addEventListener("click",()=>{
        alert("Producto comprado con éxito")
        auth.carshop=[]
        localStorage.setItem('auth', JSON.stringify(auth));
        miCarrito()
      })


// buscador

// Agrega un controlador de eventos para el clic en el botón de búsqueda
btnsearch.addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtén el valor del campo de búsqueda
    const query = searchinput.value;

    // Verifica si la consulta no está vacía
    if (query.trim() !== "") {
        // Redirige a la nueva página y pasa la consulta como parte de la URL
        window.location.href = `../pages/search.html?query=${query}`;
    } else {
        alert("Por favor, ingrese una consulta válida.");
    }
});