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
export {Producto,productos}
export class User {
    constructor(name, email, pass, avatar, code, carshop=[], admin=false){
this.username = name;
this.email = email;
this.pass =pass;
this.avatar = avatar;
this.code = code;
this.carshop = carshop;
this.admin = admin;
    }
}
export class CarShop {
    constructor (id, cantidad, imagen, marca, precio)
    {this.id= id,
        this.cantidad= cantidad;
this.imagen = imagen;
this.marca = marca;
this.precio = precio;
    }
}