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
isEdit=false,editId

const showInfo= ()=>{
    document.querySelectorAll(".detallesProd").forEach(info=>info.remove())
    productos.forEach((producto,index)=>{
        let createElement=`<tr class="detallesProd">
        <td>${index+1}</td>
        <td><img src="${producto.imagen}" alt="" width="50" height="50"></td>
        <td>${producto.nombre}</td>
        <td>${producto.marca}</td>    
        <td>${producto.precio}</td>   
        <td>${producto.descripcion}</td>
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
