import {productos,Producto} from "./clases.js"


let form= document.querySelector("#myForm"),
imgurl=document.querySelector("#imgurl"),
productName=document.querySelector("#name"),
brand=document.querySelector("#brand"),
price=document.querySelector("#price"),
desc=document.querySelector("#desc"),
stock=document.querySelector("#stock"),
submitbtn=document.querySelector(".submit"),
modal=document.querySelector("#userForm"),
modalTitle=document.querySelector("#userForm .modal-title"),
userInfo=document.querySelector("#data"),
mainadmin = document.querySelector("#main-admin")
let isEdit=false,editId
let closeuser = document.querySelector("#close-sesion"),
login = document.querySelector("#login"),
auth = JSON.parse(localStorage.getItem("auth")) || null


//oculto 
 if (!auth) {
  closeuser.classList= "d-none"
  mainadmin.innerHTML= ""
}


//cierro cesion de administrador
closeuser.addEventListener("click", () => {
  closesesion();
});

const closesesion =() =>{
auth = null
localStorage.removeItem("auth")
location.replace("../index.html")
}


const showInfo= ()=>{
    document.querySelectorAll(".detallesProd").forEach(info=>info.remove())
    productos.forEach((producto,index)=>{
        let createElement=`<tr class="detallesProd">
        <td>${index+1}</td>
        <td><img src="${producto.imagen}" alt="" width="50" height="50"></td>
        <td>${producto.nombre}</td>
        <td>${producto.marca}</td>    
        <td>${producto.precio}</td>   
        <td>${producto.stock}</td>
        <td>
        <button class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#readData" onclick="readInfo('${producto.imagen}', '${producto.nombre}', '${producto.marca}', '${producto.precio}', '${producto.descripcion}', '${producto.stock}')">
          <i class="fa fa-eye" aria-hidden="true"></i>
        </button>
        <button class="btn btn-primary" onclick="editInfo(${index},'${producto.imagen}','${producto.nombre}','${producto.marca}','${producto.precio}','${producto.descripcion}','${producto.stock}')" data-bs-toggle="modal" data-bs-target="#userForm" id="edit">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteInfo(${index})">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        </td>

        </tr>`
        userInfo.innerHTML+=createElement
    })
}
window.readInfo=(img,nombre,marca,precio,desc,stock)=>{
document.querySelector("#showImgurl").value=img,
document.querySelector("#showName").value=nombre,
document.querySelector("#showBrand").value=marca,
document.querySelector("#showPrice").value=precio,
document.querySelector("#showDesc").value=desc,
document.querySelector("#showStock").value=stock
}

window.editInfo=(index,img,nombre,marca,precio,descr,cant)=>{
isEdit=true
editId=index
imgurl.value=img
productName.value=nombre
brand.value=marca
price.value=precio
desc.value=descr
stock.value=cant

submitbtn.innerText="Actualizar"
modalTitle.innerText="Actualizar el producto"
}

window.deleteInfo=(index)=>{
    if(confirm("Estas seguro que quieres eliminar el producto?")){
        productos.splice(index,1)
        localStorage.setItem("productos",JSON.stringify(productos))
        showInfo()
    }
}
showInfo()

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const producto=new Producto(
       productName.value,
       price.value,
       brand.value,
       imgurl.value,
       desc.value,
       stock.value

      
    )
    
   
   
   
 
     if(!isEdit){
        productos.push(producto)
     } else{
        isEdit=false
        productos[editId]=producto
     }
 
    localStorage.setItem("productos", JSON.stringify(productos))
    submitbtn.innerText="Guardar"
    modalTitle.innerHTML="Rellena el formulario"
showInfo()
    form.reset()
    modal.style.display="none"
    document.querySelector(".modal-backdrop").remove()
})
const newProduct=()=>{
  isEdit = false
  form.reset()
}
let btnNew=document.getElementById("btnNew")
btnNew.addEventListener("click",newProduct)
// //probando funcion de menu desplegable
//  // Datos de ejemplo para los productos
//     const products = [
//         { id: 1, nombre: 'Producto 1', marca: 'Marca 1', precio: 100, stock: 50 },
//         { id: 2, nombre: 'Producto 2', marca: 'Marca 2', precio: 200, stock: 30 },
//         // Agrega más productos según sea necesario
//     ];

//     // Función para llenar el menú desplegable
//     function fillMobileProductMenu() {
//         const mobileProductMenu = document.getElementById('mobile-product-menu');
//         products.forEach((product) => {
//             const option = document.createElement('option');
//             option.value = product.id;
//             option.textContent = `${product.nombre} - ${product.marca}`;
//             mobileProductMenu.appendChild(option);
//         });
//     }

//     // Manejar la selección del usuario en el menú desplegable
//     document.addEventListener('DOMContentLoaded', function () {
//         fillMobileProductMenu();

//         const mobileProductMenu = document.getElementById('mobile-product-menu');
//         mobileProductMenu.addEventListener('change', function () {
//             const selectedProductId = parseInt(this.value);
//             if (!isNaN(selectedProductId)) {
//                 // Aquí puedes mostrar los detalles del producto seleccionado
//                 // utilizando JavaScript según tus necesidades.
//             }
//         });
//     });


//codigo leo z
// panel de admin de usuarios
const userModal = new bootstrap.Modal(document.getElementById('userModal'));
 // Obtén los usuarios almacenados en la local storage (asegúrate de que los datos estén almacenados como un arreglo)
  const usuarios = JSON.parse(localStorage.getItem("users")) || [];

// Función para mostrar la lista de usuarios en la tabla
const showUsers = () => {
  // Obtén la referencia al elemento donde deseas mostrar la lista de usuarios
  const usuariosTableBody = document.getElementById("usuarios-data");

  // Limpiar la tabla antes de agregar nuevas filas
  usuariosTableBody.innerHTML = '';

  // Verifica si hay usuarios para mostrar
  if (usuarios.length === 0) {
    // No hay usuarios, muestra un mensaje
    usuariosTableBody.innerHTML = '<tr><td colspan="8">No hay usuarios registrados.</td></tr>';
  } else {
    // Hay usuarios, crea filas para cada usuario
    usuarios.map((usuario, index) => {
      let fila = document.createElement("tr");
      let celdas = `
        <td>${usuario.admin}</td>
        <td>${usuario.email}</td>
        <td>${usuario.pass}</td>
        <td>${usuario.code}</td>
        <td> 
          <button class="btn btn-success btn-view">
            <i class="fa fa-eye" aria-hidden="true"></i>
          </button>
          <button class="btn btn-primary btn-view">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button class="btn btn-danger btn-delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      `;

      fila.innerHTML = celdas;
      usuariosTableBody.append(fila);
// Agrega un evento de clic al botón de mostrar
      const viewButton = fila.querySelector(".btn-view");
      viewButton.addEventListener("click", () => {
        readUser(index);
      })
      // Agrega un evento de clic al botón de eliminación
      const deleteButton = fila.querySelector(".btn-delete");
      deleteButton.addEventListener("click", () => {
        delUser(index);
      });
    });
  }
};

// función para borrar el usuario
const delUser = (index) => {
  const usuarios = JSON.parse(localStorage.getItem("users")) || [];
  let validar = confirm(
    `¿Está seguro que quiere eliminar al usuario: ${usuarios[index].username}?`
  );
  if (validar) {
    usuarios.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(usuarios));
    alert("El usuario fue eliminado con éxito");
    showUsers();
  }
};
let posicionUsuario = null;
const readUser = (index) => {
  document.querySelector("#nombre").value = usuarios[index].username;
  document.querySelector("#email").value = usuarios[index].email;
  document.querySelector("#password").value = usuarios[index].password;
  document.querySelector("#codigoSeguridad").value = usuarios[index].code;
  document.querySelector("#admin").value = usuarios[index].admin;
  posicionUsuario = index;
  userModal.show()
};




// // Función para mostrar los datos del usuario en el modal
// const showUserData = (filaId) => {
//   const userModal = new bootstrap.Modal(document.getElementById('userModal'));
//   const titulousuarioModal = document.querySelector("#titulouserModalLabel");
//   const cuerpomodal = document.querySelector("#bodyuserModal");

//   titulousuarioModal.innerHTML = `Datos de usuario`;
//   userModal.show();

//   // Encuentra el objeto usuarioData correspondiente al filaId
//   const usuarioData = usuariosData.find((usuario) => usuario.username === filaId);

//   // Muestra los datos del usuario en el modal
//   cuerpomodal.innerHTML = `
//     <form id="userForm">
//       <div class="mb-3">
//         <label for="nombre" class="form-label">Nombre</label>
//         <input type="text" class="form-control" id="nombre" name="nombre" value="${usuarioData.username}" required>
//       </div>
//       <div class="mb-3">
//         <label for="email" class="form-label">Email</label>
//         <input type="email" class="form-control" id="email" name="email" value="${usuarioData.email}" required>
//       </div>
//       <div class="mb-3">
//         <label for="password" class="form-label">Contraseña</label>
//         <input type="password" class="form-control" id="password" name="password" value="${usuarioData.password}" required>
//       </div>
//       <div class="mb-3">
//         <label for="codigoSeguridad" class="form-label">Código de Seguridad</label>
//         <input type="text" class="form-control" id="codigoSeguridad" name="codigoSeguridad" required>
//       </div>
//       <div class="mb-3">
//         <label for="avatar" class="form-label">Avatar (URL de la imagen)</label>
//         <input type="text" class="form-control" id="avatar" name="avatar" value="${usuarioData.avatar}">
//       </div>
//       <div class="mb-3">
//         <label for="admin" class="form-label">Estado de Admin</label>
//         <input type="text" class="form-control" id="admin" name="admin" value="${usuarioData.admin}" required>
//       </div>
//     </form>
//   `;
// };

// // Agrega un evento click a toda la página para capturar el clic en el botón "Ver"
// document.addEventListener("click", (event) => {
//   if (event.target.classList.contains("btn-view")) {
//     const filaId = event.target.getAttribute("data-fila-id");

//     // Llama a la función para mostrar los datos del usuario en el modal
//     showUserData(filaId);
//   }
// });

// Llama a la función para mostrar la lista de usuarios en la tabla
showUsers();
// window.verUsuario = () => {
// titulousuarioModal.innerHTML=`Datos de usuario`  
// userModal.show()
// cuerpomodal.innerHTML=`<form id="userForm">
//   <div class="mb-3">
//     <label for="nombre" class="form-label">Nombre</label>
//     <input type="text" class="form-control" id="nombre" name="nombre" required>
//   </div>
//   <div class="mb-3">
//     <label for="email" class="form-label">Email</label>
//     <input type="email" class="form-control" id="email" name="email" required>
//   </div>
//   <div class="mb-3">
//     <label for="password" class="form-label">Contraseña</label>
//     <input type="password" class="form-control" id="password" name="password" required>
//   </div>
//   <div class="mb-3">
//     <label for="codigoSeguridad" class="form-label">Código de Seguridad</label>
//     <input type="text" class="form-control" id="codigoSeguridad" name="codigoSeguridad" required>
//   </div>
//   <div class="mb-3">
//     <label for="avatar" class="form-label">Avatar (URL de la imagen)</label>
//     <input type="text" class="form-control" id="avatar" name="avatar">
//   </div>
// <div class="mb-3">
//     <label for="admin" class="form-label">Estado de Admin</label>
//     <input type="text" class="form-control" id="admin" name="codigoSeguridad" required>
//   </div>
// </form>`
// }
// verUsuario()

// let cr1 = document.querySelector(".cr1")
// let cr2 = document.querySelector(".cr2")
// const cargarCar= ()=>{
// cr1.innerHTML=""
// cr2.innerHTML=""
// vendidas=productos.filter((producto)=>producto.stock<10)
// buscadas=productos.filter((producto)=>producto.stock>10)
// vendidas.map((producto,index)=>{
   
//     let carItem1=document.createElement("div")
//     if (index==0) {
//         carItem1.classList="carousel-item active  " 
//     }else{
//         carItem1.classList="carousel-item " 
//     }
//    let minicar1= document.createElement("div")
//    minicar1.classList="mini-carousel"
//    let imagen1=document.createElement("img")
//    imagen1.src=producto.imagen
//    imagen1.classList="d-block w-100"
//    imagen1.alt=producto.nombre
//    let cardbody=document.createElement("div")
//    cardbody.classList="card-body d-flex flex-column justify-content-between"
// let text1=document.createElement("div")
// text1.classList="text-center px-5 my-2"
// let titu1=document.createElement("h1")
// titu1.classList="badge text-bg-warning text-white fs-5"
// titu1.innerText="Las más vendidas"
// let parr1=document.createElement("p")
// parr1.classList="text-center"
// parr1.innerText="Estas son las notebook más vendidas en el mercado, con los mejores componentes"
// let boton1=document.createElement("div")
// boton1.classList="mt-auto text-center"
// let ancla1=document.createElement("a")
// ancla1.classList="btn btn-warning text-white fs-5 mb-3"
// ancla1.innerText="Más información"



// carItem1.append(minicar1)
// minicar1.append(imagen1)
// cr1.append(carItem1)
// carItem1.append(cardbody)
// cardbody.append(text1)
// text1.append(titu1)
// text1.append(parr1)
// carItem1.append(boton1)
// boton1.append(ancla1)


// })
// buscadas.map((producto,index)=>{
   
//     let carItem1=document.createElement("div")
//     if (index==0) {
//         carItem1.classList="carousel-item active  " 
//     }else{
//         carItem1.classList="carousel-item " 
//     }
//    let minicar1= document.createElement("div")
//    minicar1.classList="mini-carousel"
//    let imagen1=document.createElement("img")
//    imagen1.src=producto.imagen
//    imagen1.classList="d-block w-100"
//    imagen1.alt=producto.nombre
//    let cardbody=document.createElement("div")
//    cardbody.classList="card-body d-flex flex-column justify-content-between"
// let text1=document.createElement("div")
// text1.classList="text-center px-5 my-2"
// let titu1=document.createElement("h1")
// titu1.classList="badge text-bg-warning text-white fs-5"
// titu1.innerText="Las más buscadas"
// let parr1=document.createElement("p")
// parr1.classList="text-center"
// parr1.innerText="Estas son las notebook mas buscadas por la gente, con la mejor calidad y rendimiento."
// let boton1=document.createElement("div")
// boton1.classList="mt-auto text-center"
// let ancla1=document.createElement("a")
// ancla1.classList="btn btn-warning text-white fs-5 mb-3"
// ancla1.innerText="Más información"



// carItem1.append(minicar1)
// minicar1.append(imagen1)
// cr2.append(carItem1)
// carItem1.append(cardbody)
// cardbody.append(text1)
// text1.append(titu1)
// text1.append(parr1)
// carItem1.append(boton1)
// boton1.append(ancla1)


// })
// }
// cargarCar()