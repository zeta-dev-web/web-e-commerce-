import {productos} from "./clases.js"

let acerCard=document.getElementById("acerCard")


const cargarCards= ()=>{
    acerCard.innerHTML=""
    let acerProd=productos.filter((producto)=>producto.marca=="Msi") 
    console.log(acerProd)
    acerProd.map((producto)=>{
    let col=document.createElement("div") 
    col.classList="col"
    let card=document.createElement("card")
    card.classList="card h-100 shadow-sm"
    let imgCard=document.createElement("img")
    imgCard.src=producto.imagen
    imgCard.classList="card-img-top"
    let labelTop=document.createElement("div")
    labelTop.classList="label-top shadow-sm"
    labelTop.innerText=producto.nombre
    let cardBody=document.createElement("div")
    cardBody.classList="card-body cat-body"
    let clearFix=document.createElement("div")
    clearFix.classList="clearfix mb-3"
    let floatStart=document.createElement("span")
    floatStart.classList="float-start badge rounded-pill catcard "
    floatStart.innerText=`${producto.precio}$`
    let floatEnd=document.createElement("span")
    floatEnd.classList="float-end small text-muted"
    floatEnd.innerText=`Stock:${producto.stock}`
    let cardTitle=document.createElement("h5")
    cardTitle.classList="card-title"
    cardTitle.innerText=producto.descripcion
    let textCenter=document.createElement("div")
    textCenter.classList="text-center my-4"
    let cart=document.createElement("a")
    cart.id="cart"
    cart.classList="btn btn-primary catcard cat-btn"
    cart.innerText="Agregar al carrito"
    col.append(card)
    card.append(imgCard)
    card.append(labelTop)
    card.append(cardBody)
    cardBody.append(clearFix)
    clearFix.append(floatStart)
    clearFix.append(floatEnd)
    cardBody.append(cardTitle)
    cardBody.append(textCenter)
    textCenter.append(cart)
acerCard.append(col)

    })  
}
cargarCards()