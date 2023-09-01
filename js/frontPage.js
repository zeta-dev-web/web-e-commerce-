import {productos} from "./clases.js"


let cr1 = document.querySelector(".cr1")
let cr2 = document.querySelector(".cr2")
const cargarCar= ()=>{
cr1.innerHTML=""
cr2.innerHTML=""
let vendidas=productos.filter((producto)=>producto.stock<=10)
let buscadas=productos.filter((producto)=>producto.stock>10)
vendidas.map((producto,index)=>{
   
    let carItem1=document.createElement("div")
    if (index==0) {
        carItem1.classList="carousel-item active  " 
    }else{
        carItem1.classList="carousel-item " 
    }
   let minicar1= document.createElement("div")
   minicar1.classList="mini-carousel"
   let imagen1=document.createElement("img")
   imagen1.src=producto.imagen
   imagen1.classList="d-block w-100"
   imagen1.alt=producto.nombre
   let cardbody=document.createElement("div")
   cardbody.classList="card-body d-flex flex-column justify-content-between"
let text1=document.createElement("div")
text1.classList="text-center px-5 my-2"
let titu1=document.createElement("h1")
titu1.classList="badge text-bg-warning text-white fs-5"
titu1.innerText="Las más vendidas"
let parr1=document.createElement("p")
parr1.classList="text-center"
parr1.innerText="Estas son las notebook más vendidas en el mercado, con los mejores componentes"
let boton1=document.createElement("div")
boton1.classList="mt-auto text-center"
let ancla1=document.createElement("a")
ancla1.classList="btn btn-warning text-white fs-5 mb-3"
ancla1.innerText="Más información"



carItem1.append(minicar1)
minicar1.append(imagen1)
cr1.append(carItem1)
carItem1.append(cardbody)
cardbody.append(text1)
text1.append(titu1)
text1.append(parr1)
carItem1.append(boton1)
boton1.append(ancla1)


})
buscadas.map((producto,index)=>{
   
    let carItem1=document.createElement("div")
    if (index==0) {
        carItem1.classList="carousel-item active  " 
    }else{
        carItem1.classList="carousel-item " 
    }
   let minicar1= document.createElement("div")
   minicar1.classList="mini-carousel"
   let imagen1=document.createElement("img")
   imagen1.src=producto.imagen
   imagen1.classList="d-block w-100"
   imagen1.alt=producto.nombre
   let cardbody=document.createElement("div")
   cardbody.classList="card-body d-flex flex-column justify-content-between"
let text1=document.createElement("div")
text1.classList="text-center px-5 my-2"
let titu1=document.createElement("h1")
titu1.classList="badge text-bg-warning text-white fs-5"
titu1.innerText="Las más buscadas"
let parr1=document.createElement("p")
parr1.classList="text-center"
parr1.innerText="Estas son las notebook mas buscadas por la gente, con la mejor calidad y rendimiento."
let boton1=document.createElement("div")
boton1.classList="mt-auto text-center"
let ancla1=document.createElement("a")
ancla1.classList="btn btn-warning text-white fs-5 mb-3"
ancla1.innerText="Más información"



carItem1.append(minicar1)
minicar1.append(imagen1)
cr2.append(carItem1)
carItem1.append(cardbody)
cardbody.append(text1)
text1.append(titu1)
text1.append(parr1)
carItem1.append(boton1)
boton1.append(ancla1)


})
}
cargarCar()