class Producto {
    constructor(nombre,precio,marca,imagen,descripcion,stock){
        this.id = Producto.getNextId()
        this.nombre=nombre
        this.precio=precio
        this.marca=marca
        this.imagen=imagen
        this.descripcion=descripcion
        this.stock=stock
    }
    static getNextId() {
        if (!this.nextId) {
          this.nextId = 1;
        }
        return this.nextId++;
      }
}


const productos=JSON.parse(localStorage.getItem("productos")) ||[]


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
userInfo=document.querySelector("#data")


let isEdit=false,editId

const showInfo= ()=>{
    document.querySelectorAll(".detallesProd").forEach(info=>info.remove())
    productos.forEach((producto,index)=>{
        let createElement=`<tr class="detallesProd">
        <td>${producto.id}</td>
        <td><img src="${producto.imagen}" alt="" width="50" height="50"></td>
        <td>${producto.nombre}</td>
        <td>${producto.marca}</td>    
        <td>${producto.precio}</td>   
        <td>${producto.stock}</td>
        <td>
        <button class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#readData" onclick="readInfo('${producto.imagen}', '${producto.nombre}', '${producto.marca}', '${producto.precio}', '${producto.descripcion}', '${producto.stock}')">
          <i class="fa fa-eye" aria-hidden="true"></i>
        </button>
        <button class="btn btn-primary" onclick="editInfo(${index},'${producto.imagen}','${producto.nombre}','${producto.marca}','${producto.precio}','${producto.descripcion}','${producto.stock}')" data-bs-toggle="modal" data-bs-target="#userForm">
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
const readInfo=(img,nombre,marca,precio,desc,stock)=>{
document.querySelector("#showImgurl").value=img,
document.querySelector("#showName").value=nombre,
document.querySelector("#showBrand").value=marca,
document.querySelector("#showPrice").value=precio,
document.querySelector("#showDesc").value=desc,
document.querySelector("#showStock").value=stock
}
const editInfo=(index,img,nombre,marca,precio,descr,cant)=>{
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
const deleteInfo=(index)=>{
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

//panel de admin de usuarios
// Función para mostrar usuarios
const mostrarUsuarios = () => {
  // Obtén la referencia al elemento donde deseas mostrar la lista de usuarios
  const usuariosTableBody = document.getElementById("usuarios-data");

  // Obtén los usuarios almacenados en la local storage (asegúrate de que los datos estén almacenados como un arreglo)
  const usuarios = JSON.parse(localStorage.getItem("users")) || [];

  // Verifica si hay usuarios para mostrar
  if (usuarios.length === 0) {
    // No hay usuarios, muestra un mensaje
    usuariosTableBody.innerHTML = '<tr><td colspan="8">No hay usuarios registrados.</td></tr>';
  } else {
    // Hay usuarios, crea filas para cada usuario
    let usuariosHTML = "";
    usuarios.forEach((usuario) => {
      usuariosHTML += `
        <tr>
          <td class=col-1>${usuario.admin}</td>
          <td class=col-2>${usuario.email}</td>
          <td class=col-2>${usuario.pass}</td>
          <td class=col-1>${usuario.code}</td>
          <td class=col-1>
            <button class="btn btn-danger" onclick="eliminarUsuario(${usuario.id})">x</button>
          </td>
        </tr>
      `;
    });

    // Agrega las filas de usuarios a la tabla
    usuariosTableBody.innerHTML = usuariosHTML;
  }
};

// Llama a la función para mostrar usuarios al cargar la página
mostrarUsuarios();

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

