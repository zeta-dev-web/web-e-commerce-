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
let avatarnav = document.querySelector("#avatar"),
useravatar=document.querySelector("#user-avatar")

//oculto botones al admin master 
if (!auth) {
 mainadmin.innerHTML= ""
  closeuser.classList= "d-none"
    useravatar.innerHTML=""
}else if(auth.admin=="master" || auth.admin=="secundario") {
  avatarnav.src= auth.avatar
  document.querySelector("#search").classList="d-none"
document.querySelector("#buttoncart").classList="d-none"
  }
//oculto botones y usuarios al admin secundario
if (auth.admin==="secundario") {
  document.querySelector("#buttoncart").classList="d-none"
  avatarnav.src= auth.avatar
document.querySelector("#admin-user").classList="d-none"
document.querySelector("#menu-user").classList="d-none"
document.querySelector("#search").classList="d-none"
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

const showInfo = () => {
  document.querySelectorAll(".detallesProd").forEach(info => info.remove());
  productos.forEach((producto, index) => {
    let createElement = `<tr class="detallesProd d-flex">
        <td class="col-1">${index + 1}</td>
        <td class="col-2"><img src="${producto.imagen}" alt="" width="50" height="50"></td>
        <td class="col-3">${producto.nombre}</td>
        <td class="col-1">${producto.marca}</td>    
        <td class="col-1">${producto.precio}</td>   
        <td class="col-1">${producto.stock}</td>
        <td class="col-3">
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#readData" onclick="readInfo('${producto.imagen}', '${producto.nombre}', '${producto.marca}', '${producto.precio}', '${producto.descripcion}', '${producto.stock}')">
          <i class="fa fa-eye" aria-hidden="true"></i>
        </button>
        <button class="btn btn-primary" onclick="editInfo(${index},'${producto.imagen}','${producto.nombre}','${producto.marca}','${producto.precio}','${producto.descripcion}','${producto.stock}')" data-bs-toggle="modal" data-bs-target="#userForm" id="edit">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteInfo(${index})">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        </td>
        </tr>`;
    userInfo.innerHTML += createElement;
  });
};

window.readInfo = (img, nombre, marca, precio, desc, stock) => {
  document.querySelector("#showImgurl").value = img;
  document.querySelector("#showName").value = nombre;
  document.querySelector("#showBrand").value = marca;
  document.querySelector("#showPrice").value = precio;
  document.querySelector("#showDesc").value = desc;
  document.querySelector("#showStock").value = stock;
};

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
submitbtn.classList="btn btn-warning"
modalTitle.innerText="Actualizar el producto"
document.querySelector(".modal-header").classList="bg-warning modal-header"
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
       stock.value)
    
     if(!isEdit){
        productos.push(producto)
     } else{
        isEdit=false
        productos[editId]=producto
     }
 
    localStorage.setItem("productos", JSON.stringify(productos))
    submitbtn.innerText="Guardar"
    modalTitle.innerHTML="Rellena el formulario"
    alert("Los datos del producto se han guardado correctamente")
    location.reload()

showInfo()
    form.reset()
    modal.style.display="none"
    document.querySelector(".modal-backdrop").remove()
})
const newProduct=()=>{
  isEdit = false
  form.reset()
  submitbtn.innerText="Guardar"
  submitbtn.classList="btn btn-dark"
    modalTitle.innerHTML="Nuevo Producto"
    document.querySelector(".modal-header").classList="bg-info modal-header"
}
let btnNew=document.getElementById("btnNew")
btnNew.addEventListener("click",newProduct)

// Función para llenar el menú desplegable
function fillMobileProductMenu() {
  const mobileProductMenu = document.getElementById('mobile-product-menu');
  productos.forEach((producto, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = `${producto.nombre} - ${producto.marca}`;
    mobileProductMenu.appendChild(option);
  });
}

// Manejar la selección del usuario en el menú desplegable
document.addEventListener('DOMContentLoaded', function () {
  fillMobileProductMenu();

  const mobileProductMenu = document.getElementById('mobile-product-menu');
  mobileProductMenu.addEventListener('change', function () {
    const selectedProductId = parseInt(this.value);
    if (!isNaN(selectedProductId)) {
      // Obtén los datos del producto seleccionado
      const selectedProduct = productos[selectedProductId - 1];

      // Llama a la función readInfo() para actualizar los datos del modal
      readInfo(selectedProduct.imagen, selectedProduct.nombre, selectedProduct.marca, selectedProduct.precio, selectedProduct.descripcion, selectedProduct.stock);

      // Abre el modal correspondiente (usando el ID "readData")
      const modal = new bootstrap.Modal(document.getElementById('readData'));
      modal.show();
    }
  });
});


//codigo leo z
// panel de admin de usuarios --------------------------------------------------------------
const userModal = new bootstrap.Modal(document.getElementById('userModal'));
 // Obtén los usuarios almacenados en la local storage (asegúrate de que los datos estén almacenados como un arreglo)
  const usuarios = JSON.parse(localStorage.getItem("users")) || [];
const admin = JSON.parse(localStorage.getItem("admin")) 
// Función para mostrar la lista de usuarios en la tabla
const showUsers = () => {
   const usuariosTableBody = document.querySelector("#usuarios-data");
  //  const usuariosTableBody2 = document.querySelector("#usuarios-data2");
  // Limpiar la tabla antes de agregar nuevas filas
  usuariosTableBody.innerHTML = '';
// muestro el admin primero
    let adminRow = document.createElement("tr");
adminRow.classList = "d-flex";

let adminCells = `
    <td class="col-3">${admin.admin}</td>
    <td class="col-4">${admin.email}</td>
    <td class="col-2">Admin Master</td>
    <td class="col-3"> 
          <button id="viewButtonAdmin" class="btn btn-success btn-view">
            <i class="fa fa-eye" aria-hidden="true"></i>
          </button>
          <button id="editButtonAdmin" class="btn btn-primary btn-view" id="btn-edit">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </td>
`;

adminRow.innerHTML = adminCells;
usuariosTableBody.append(adminRow);
    
// Agrega un evento de clic al botón de mostrar
      const viewButtonAdmin = document.querySelector("#viewButtonAdmin");
      viewButtonAdmin.addEventListener("click", () => {
        readAdmin()})

// Agrega un evento de clic al botón editar
      const editButtonAdmin = document.querySelector("#editButtonAdmin");
      editButtonAdmin.addEventListener("click", () => {
        editAdmin();
      })
        // funcion para mostrar el admin
const readAdmin = () => {
  document.querySelector("#modal-header-user").classList=`modal-header bg-success bg-gradient`
  document.querySelector("#titulouserModalLabel").innerHTML=`<h5><b>Datos del Admin Master</b>`
   document.querySelector("#bodyuserModal").innerHTML=`
<form id="userForm">
              <div class="mb-3 d-flex justify-content-center">
                <div
                  id="avatar"
                  style="width: 50px; height: 50px; overflow: hidden"
                >
                  <img
                    id="avatarPreview"
                    src=""
                    alt="Avatar"
                    style="max-width: 100%; max-height: 100%"
                  />
                </div>
              </div>
              <div class="mb-3 d-flex justify-content-center">
                <label id="nombre" class="form-label">Admin</label>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  type="pass"
                  class="form-control"
                  id="password"
                  name="password"
                  required
                />
              </div>
            </form>`
  document.querySelector("#nombre").innerHTML=`<h5><b>Nombre:</b> ${admin.username}</h5>`;
  document.querySelector("#email").value=`${admin.email}`;
  document.querySelector("#password").value=`${admin.pass}`;  
  // document.querySelector("#codigoSeguridad").innerHTML=`<h5><b>Codigo de Recuperacion:</b> no posee</h5>`;
  // document.querySelector("#adminstatus").innerHTML=`<h5><b>Admin:</b> Es admin Master</h5>`;   
  document.querySelector("#avatarPreview").src=admin.avatar;
  document.querySelector("#btn-guardar").classList="d-none";
  userModal.show()
};
// funcion para editar el admin
const editAdmin = ()=>{
   document.querySelector("#modal-header-user").classList=`modal-header bg-success bg-warning`
  document.querySelector("#btn-guardar").classList="btn btn-primary";
  document.querySelector("#titulouserModalLabel").innerHTML=`<h5><b>Datos del Admin Master</b>`
  document.querySelector("#bodyuserModal").innerHTML=`
<form id="userForm">
              <div class="mb-3 d-flex justify-content-center">
                <div
                  id="avatar"
                  style="width: 50px; height: 50px; overflow: hidden"
                >
                  <img
                    id="avatarPreview"
                    src=""
                    alt="Avatar"
                    style="max-width: 100%; max-height: 100%"
                  />
                </div>
              </div>
              <div class="mb-3 d-flex justify-content-center">
                <label id="nombre" class="form-label">Admin</label>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  type="pass"
                  class="form-control"
                  id="password"
                  name="password"
                  required
                />
              </div>
            </form>`
  document.querySelector("#nombre").value = admin.username;
  document.querySelector("#email").value = admin.email;
    document.querySelector("#avatarPreview").src=admin.avatar;
  document.querySelector("#password").value = admin.pass;
            userModal.show()
            // Agrega un evento de clic al botón "Guardar"
const guardarButtonAdmin = document.querySelector("#btn-guardar");
guardarButtonAdmin.addEventListener("click", saveAdmin,);
showUsers();
}

// Función para editar y guardar el admin
const saveAdmin = () => {
if (document.querySelector("#nombre").value = admin.username) {
   // Actualiza los datos del usuario en el arreglo users
admin.email = document.querySelector("#email").value;
admin.pass = document.querySelector("#password").value;
  // Guarda el arreglo actualizado en la local storage bajo la clave "users"
  localStorage.setItem("admin", JSON.stringify(admin));

  alert("Los datos del admin se han actualizado correctamente");

  // Cierra el modal
  userModal.hide();

  // Vuelve a mostrar la lista de usuarios actualizada
  location.reload() 
}
};

// ------------------------ USUARIOS ----------------------
  // Verifica si hay usuarios para mostrar
  if (usuarios.length === 0 && admin === 0) {
    // No hay usuarios
    usuariosTableBody.innerHTML = '<tr><td colspan="8">No hay usuarios registrados ni administrador.</td></tr>';

  } else {

// Hay usuarios, crea filas para cada usuario
    usuarios.map((usuario, index) => {
      let fila = document.createElement("tr");
fila.classList="d-flex"
      let celdas = `
        <td class="col-3">${usuario.admin}</td>
        <td class="col-4">${usuario.email}</td>
        <td class="col-2">${usuario.username}</td>
        <td class="col-3"> 
          <button class="btn btn-success btn-view">
            <i class="fa fa-eye" aria-hidden="true"></i>
          </button>
          <button class="btn btn-primary btn-view" id="btn-edit">
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
      // Agrega un evento de clic al botón editar
      const editButton = fila.querySelector("#btn-edit");
      editButton.addEventListener("click", () => {
        editUser(index);
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
    location.reload();
  }
};

// funcion para mostrar el usuario
let posicionUsuario = null;
const readUser = (index) => {
  document.querySelector("#modal-header-user").classList=`modal-header bg-success bg-gradient`
  document.querySelector("#titulouserModalLabel").innerHTML=`<h5><b>Datos del usuario</b>`
  document.querySelector("#bodyuserModal").innerHTML=`
<form id="userForm">
              <div class="mb-3">
                <div
                  id="avatar"
                  style="width: 50px; height: 50px; overflow: hidden"
                >
                  <img
                    id="avatarPreview"
                    src=""
                    alt="Avatar"
                    style="max-width: 100%; max-height: 100%"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  name="nombre"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              </div>
              <div class="mb-3">
              <label for="admin" class="form-label"
                  >Estado de Admin</label
                >
<input
                  type="text"
                  class="form-control"
                  id="adminstatus"
                  name="adminstatus"
                  required
                />                               
              </div>
            </form>`
  document.querySelector("#nombre").value=`${usuarios[index].username}`;
  document.querySelector("#email").value=`${usuarios[index].email}`;
  if (usuarios[index].admin==="secundario") {
   document.querySelector("#adminstatus").value=`secundario`;   
  }
  else{document.querySelector("#adminstatus").value=`No es Admin`}
  document.querySelector("#avatarPreview").src=usuarios[index].avatar;
  document.querySelector("#btn-guardar").classList="d-none";
  userModal.show()
};
// funcion para editar el usuario
const editUser = (index)=>{
  document.querySelector("#btn-guardar").classList="btn btn-primary";
  document.querySelector("#titulouserModalLabel").innerHTML=`<h5><b>Datos del usuario</b>`
  document.querySelector("#bodyuserModal").innerHTML=`
<form id="userForm">
              <div class="mb-3">
                <div
                  id="avatar"
                  style="width: 50px; height: 50px; overflow: hidden"
                >
                  <img
                    id="avatarPreview"
                    src=""
                    alt="Avatar"
                    style="max-width: 100%; max-height: 100%"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  name="nombre"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div class="mb-3">
              <label for="admin" class="form-label"
                  >Estado de Admin</label
                >
                               <select class="form-select" id="adminstatus" aria-label="Default select example">
  <option value="secundario">Secundario</option>
  <option value="false">No es Admin</option>
</select>
              </div>
            </form>`
  document.querySelector("#nombre").value = usuarios[index].username;
  document.querySelector("#email").value = usuarios[index].email;
  document.querySelector("#avatarPreview").src=usuarios[index].avatar;
const adminStatus = usuarios[index].admin;

// Establece la opción en función del valor de user.admin
if (adminStatus == "secundario") {
    document.getElementById("adminstatus").value = "secundario";
} else if (adminStatus === "false" || adminStatus === false) {
    document.getElementById("adminstatus").value = "false";
}
            userModal.show()
            posicionUsuario = index;
}
// Función para editar y guardar el usuario
const saveUser = () => {
  // Obtén el arreglo original users de la local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Actualiza los datos del usuario en el arreglo users
users[posicionUsuario].username = document.querySelector("#nombre").value;
users[posicionUsuario].email = document.querySelector("#email").value;
users[posicionUsuario].admin = document.querySelector("#adminstatus").value;
users[posicionUsuario].carshop = []
  // Guarda el arreglo actualizado en la local storage bajo la clave "users"
  localStorage.setItem("users", JSON.stringify(users));

  alert("Los datos del usuario se han actualizado correctamente");

  // Cierra el modal
  userModal.hide();

  // Vuelve a mostrar la lista de usuarios actualizada
  location.reload()
};

// Agrega un evento de clic al botón "Guardar"
const guardarButton = document.querySelector("#btn-guardar");
guardarButton.addEventListener("click", saveUser,);
showUsers();

// Función para llenar el menú desplegable
function fillMobileUserMenu() {
  const mobileUserMenu = document.getElementById('mobile-user-menu');
  usuarios.forEach((usuario, index) => {
    const option = document.createElement('option');
    option.value = index; 
    option.textContent = usuario.username;
    mobileUserMenu.appendChild(option);
  });
}

// Manejar la selección del usuario en el menú desplegable
document.addEventListener('DOMContentLoaded', function () {
  fillMobileUserMenu();

  const mobileUserMenu = document.getElementById('mobile-user-menu');
  mobileUserMenu.addEventListener('change', function () {
    const selectedUserIndex = parseInt(this.value);
    if (!isNaN(selectedUserIndex)) {
      // Obtén los datos del usuario seleccionado
      const selectedUser = usuarios[selectedUserIndex];

      // Llama a la función readUser() para actualizar los datos del modal
      readUser(selectedUserIndex);
    }
  });
});