class Producto {
    constructor(nombre,precio,categoria,imagen,desc,stock){
        this.id = Producto.getNextId()
        this.nombre=nombre
        this.precio=precio
        this.categoria=categoria
        this.imagen=imagen
        this.descripcion=desc
        this.stock=stock
    }
    static getNextId() {
        if (!this.nextId) {
          this.nextId = 1;
        }
        return this.nextId++;
      }
}


let productos=[]


let producto1= new Producto("ss",45000,"saas","https://techterms.com/img/xl/laptop_586.png","rwrwrw",15)
let producto2= new Producto("ss",45000,"saas","https://consumer.huawei.com/content/dam/huawei-cbg-site/latam/mx/support/laptop-user-guide/img/laptop.png","rwrwrw",25)
let producto3= new Producto("ss",45000,"saas","https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/g-series/g16-7630/media-gallery/black/notebook-g16-7630-nt-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=536&qlt=100,1&resMode=sharp2&size=536,402&chrss=full","rwrwrw",5)
let producto4= new Producto("ss",45000,"saas","https://images.ctfassets.net/aekk6nx6e23n/OceccWc3Xzw4zrVghTzk2/5fd4b0e114949c898d5f21aa8cfd0a72/DRX_-_overview.png","rwrwrw",9)
let producto5= new Producto("ss",45000,"saas","https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-silver-select-202206?wid=1280&hei=1190&fmt=png-alpha&.v=1664497095569","rwrwrw",8)


productos.push(producto1)
productos.push(producto2)
productos.push(producto3)
productos.push(producto4)
productos.push(producto5)

let cr1 = document.querySelector(".cr1")
let cr2 = document.querySelector(".cr2")
const cargarCar= ()=>{
cr1.innerHTML=""
cr2.innerHTML=""
vendidas=productos.filter((producto)=>producto.stock<10)
buscadas=productos.filter((producto)=>producto.stock>10)
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