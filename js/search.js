import {productos} from "./clases.js"
import { CarShop } from "./clases.js"

let acerCard=document.getElementById("acerCard")
let auth = JSON.parse(localStorage.getItem("auth")) || null
let queryString = window.location.search

// buscador

// Agrega un controlador de eventos para el clic en el botón de búsqueda
btnsearch.addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtén el valor del campo de búsqueda
    const query = searchinput.value;

    // Verifica si la consulta no está vacía
    if (query.trim() !== "") {
        // Redirige a la nueva página y pasa la consulta como parte de la URL
        window.location.href = `/pages/search.html?query=${query}`;
    } else {
        alert("Por favor, ingrese una consulta válida.");
    }
});

// Función para obtener el valor de un parámetro en la cadena de consulta
const getQueryParam=(paramName)=> {
    const params = new URLSearchParams(queryString);
    return params.get(paramName);
}

// Captura la consulta de búsqueda de la URL
const query = getQueryParam('query');

const cargarCards = () => {
    acerCard.innerHTML = "";

    // Filtra productos por marca o nombre que contenga la consulta
    const productosFiltrados = productos.filter((producto) => {
        const marcaCoincide = producto.marca.toLowerCase().includes(query.toLowerCase());
        const nombreCoincide = producto.nombre.toLowerCase().includes(query.toLowerCase());

        // Devuelve true si la marca o el nombre coinciden con la consulta
        return marcaCoincide || nombreCoincide;
    });
    productosFiltrados.map((producto) => {
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
     const productoData = {
        id: producto.id,
        cantidad: 1,
        imagen: producto.imagen,
        marca: producto.marca,
        precio: producto.precio
      };
    cart.addEventListener("click", () => {
      agregarCarrito(productoData); // Llama a la función agregarCarrito con el producto como argumento
    });
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

    const carritomodal = new bootstrap.Modal(document.getElementById('carritoModal'))


//este codigo debe ir junto con las tarjetas que ejecuta la funcion agregar producto al carrito
window.agregarCarrito = (producto) => {
  // Verifica si auth está definido y si tiene la propiedad 'carshop'
  if (auth && auth.carshop) {
    // Crea un nuevo objeto CarShop
    const addcarshop = new CarShop(producto.id, 1, producto.imagen, producto.marca, producto.precio);

    // Verifica si el producto ya está en el carrito
    let productoExistente = null;
    for (const productoCarrito of auth.carshop) {
      if (productoCarrito.id === addcarshop.id) {
        productoExistente = productoCarrito;
        break; // Detén el bucle si se encuentra una coincidencia
      }
    }

    if (productoExistente) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      productoExistente.cantidad++;
    } else {
      // Si el producto no está en el carrito, agrégalo como nuevo elemento
      addcarshop.cantidad = 1; // Inicializa la cantidad en 1
      auth.carshop.push(addcarshop);
    }

    // Actualiza el contenido de auth en la local storage
    localStorage.setItem('auth', JSON.stringify(auth));
    alert('Producto agregado al carrito');
  } else {
    // alerta al usuario que debe iniciar sesion
    alert('Inicie sesion para agregar el producto a su carrito de compra');
  }
};
}
cargarCards()