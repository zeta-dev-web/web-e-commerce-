let nombre = document.getElementById("nombre")
let apellido = document.getElementById("apellido")
let area = document.getElementById("area")
let celular = document.getElementById("celular")
let email = document.getElementById("email")
let mensaje = document.getElementById("message")
let btnconsulta = document.getElementById("btnenviar");

btnconsulta.addEventListener("click", (event) => {
  event.preventDefault();
  let nombreValor = nombre.value;
let apellidoValor = apellido.value;
let celularValor = celular.value;
let areaValor =area.value
let emailValor = email.value;
let mensajeValor = mensaje.value;
const cuerpoMensaje = `<h1>Formulario de Contacto</h1><h5>Nombre:${nombreValor}<br>Apellido:${apellidoValor}<br>Telefono:${areaValor}-${celularValor}<br>Email:${emailValor}</h5><br><p><b>Consulta:</b>${mensajeValor}`
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "storenote@outlook.com",
    Password: "761632CC0966665953829FBD0F329EEB2DE7",
    To: "storenote@yopmail.com",
    From: "storenote@outlook.com",
    Subject: "consulta en tienda StoreNote💻",
    Body: cuerpoMensaje
  }).then(() => {
    // Mostrar mensaje de éxito o hacer alguna otra acción
        alert("consulta enviada con éxito");
        location.reload()
});
Email.send()
})

