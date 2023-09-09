export const crearProductos = () => {
const productos = [
  {
    id: 1,
    nombre: "msi GL65 Leopard",
    precio: 476275,
    marca: "msi",
    imagen: "https://netpc.uy/wp-content/uploads/2020/10/2-23-10.jpg",
    descripcion: "Procesador Intel Core i7, 16GB de RAM, 512GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce RTX 2070, Windows 10 Home",
    stock: 14
  },
  {
    id: 2,
    nombre: "msi Prestige 14",
    precio: 439927,
    marca: "msi",
    imagen: "https://th.bing.com/th/id/R.724b01e704136c4a325464423ec2f9d5?rik=F63eVTplvDtuzA&pid=ImgRaw&r=0",
    descripcion: "Procesador Intel Core i7, 16GB de RAM, 1TB de almacenamiento SSD, pantalla de 14 pulgadas, tarjeta gráfica NVIDIA GeForce GTX 1650, Windows 10 Home",
    stock: 25
  },
  {
    id: 3,
    nombre: "msi Modern 14",
    precio: 329367,
    marca: "msi",
    imagen: "https://th.bing.com/th/id/OIP.oFb89qTF98XiHGrxj7GOiAHaFj?pid=ImgDet&rs=1",
    descripcion: "Procesador Intel Core i5, 8GB de RAM, 512GB de almacenamiento SSD, pantalla de 14 pulgadas, tarjeta gráfica Intel UHD Graphics, Windows 10 Home",
    stock: 6
  },
  {
    id: 4,
    nombre: "msi Bravo 15",
    precio: 384917,
    marca: "msi",
    imagen: "https://www.notebookcheck.net/typo3temp/_processed_/e/6/csm_81dM-o6z9WL._AC_SL1500__8b98ef1621.jpg",
    descripcion: "Procesador AMD Ryzen 7, 16GB de RAM, 512GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica AMD Radeon RX 5500M, Windows 10 Home",
    stock: 9
  },
  {
    id: 5,
    nombre: "acer Nitro 5",
    precio: 287997,
    marca: "acer",
    imagen: "https://th.bing.com/th/id/OIP.NaUY-YJpytBSqzPjfGmtzQHaEj?pid=ImgDet&rs=1",
    descripcion: "Procesador AMD Ryzen 5, 8GB de RAM, 512GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce GTX 1650, Windows 10 Home",
    stock: 30
  },
  {
    id: 6,
    nombre: "acer Swift 3",
    precio: 251997,
    marca: "acer",
    imagen: "https://th.bing.com/th/id/R.4f89820d7c9c3a2cf40641a26d10202b?rik=ihEhamuSoua%2fKw&pid=ImgRaw&r=0",
    descripcion: "Procesador AMD Ryzen 5, 8GB de RAM, 256GB de almacenamiento SSD, pantalla de 14 pulgadas, tarjeta gráfica AMD Radeon Graphics, Windows 10 Home",
    stock: 17
  },
  {
    id: 7,
    nombre: "acer Aspire 5",
    precio: 179997,
    marca: "acer",
    imagen: "https://th.bing.com/th/id/R.a7099091cc454d4ba8f8151dabb48dae?rik=Y5qdy%2bp%2fL0gFSQ&pid=ImgRaw&r=0",
    descripcion: "Procesador Intel Core i5, 8GB de RAM, 512GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica Intel UHD Graphics, Windows 10 Home",
    stock: 6
  },
  {
    id: 8,
    nombre: "acer Spin 5",
    precio: 329367,
    marca: "acer",
    imagen: "https://th.bing.com/th/id/OIP.Li09PZhD2BbudpLJEFA9zAHaFC?pid=ImgDet&rs=1",
    descripcion: "Procesador Intel Core i7, 16GB de RAM, 512GB de almacenamiento SSD, pantalla de 13.5 pulgadas, tarjeta gráfica Intel Iris Xe Graphics, Windows 10 Home",
    stock: 4
  },
  {
    id: 9,
    nombre: "hp Pavilion",
    precio: 329367,
    marca: "hp",
    imagen: "https://th.bing.com/th/id/R.de4551897297b37f8dfda42460243d89?rik=t57ePlgychC0Tw&pid=ImgRaw&r=0",
    descripcion: "Procesador Intel Core i5, 8GB de RAM, 256GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce GTX 1650, Windows 10 Home",
    stock: 40
  },
  {
    id: 10,
    nombre: "hp Envy x360",
    precio: 384917,
    marca: "hp",
    imagen: "https://images.esellerpro.com/2660/I/384/876/6bk06eaabu_hp_laptop_02_m_p.png",
    descripcion: "Procesador AMD Ryzen 7, 16GB de RAM, 512GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica AMD Radeon Graphics, Windows 10 Home",
    stock: 28
  },
  {
    id: 11,
    nombre: "hp Spectre x360",
    precio: 539927,
    marca: "hp",
    imagen: "https://th.bing.com/th/id/OIP.z0MPnz3qNXiFzCv4RUqDWAHaGQ?pid=ImgDet&rs=1",
    descripcion: "Procesador Intel Core i7, 16GB de RAM, 1TB de almacenamiento SSD, pantalla de 14 pulgadas, tarjeta gráfica Intel Iris Xe Graphics, Windows 10 Home",
    stock: 2
  },
  {
    id: 12,
    nombre: "hp Omen",
    precio: 476275,
    marca: "hp",
    imagen: "https://th.bing.com/th/id/OIP.doNj4NH9Rcaow7i-gbZUqgHaFc?pid=ImgDet&rs=1",
    descripcion: "Procesador Intel Core i7, 16GB de RAM, 512GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce RTX 2060, Windows 10 Home",
    stock: 5
  },
  {
    id: 13,
    nombre: "asus ROG Strix G15",
    precio: 659917,
    marca: "asus",
    imagen: "https://th.bing.com/th/id/R.e1e55401082cbcc567510ba2cad692ac?rik=cOBUzFdILhkOFw&pid=ImgRaw&r=0",
    descripcion: "Procesador Intel Core i7, 16GB de RAM, 1TB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce RTX 3060, Windows 10 Home",
    stock: 31
  },
  {
    id: 14,
    nombre: "asus VivoBook S15",
    precio: 329367,
    marca: "asus",
    imagen: "https://th.bing.com/th/id/R.88df23f47ce7277394f7a0ba2b6dedbb?rik=dFhgus5IwRN1LQ&pid=ImgRaw&r=0",
    descripcion: "Procesador Intel Core i5, 8GB de RAM, 512GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce MX350, Windows 10 Home",
    stock: 21
  },
  {
    id: 15,
    nombre: "asus ZenBook Duo",
    precio: 659917,
    marca: "asus",
    imagen: "https://th.bing.com/th/id/OIP.ZHi8xa6plt5hclfJNeLeVAHaE7?pid=ImgDet&rs=1",
    descripcion: "Procesador Intel Core i7, 16GB de RAM, 1TB de almacenamiento SSD, pantalla principal de 14 pulgadas y pantalla secundaria de 12.6 pulgadas, tarjeta gráfica NVIDIA GeForce MX250, Windows 10 Home",
    stock: 4
  },
  {
    id: 16,
    nombre: "asus TUF Gaming",
    precio: 439927,
    marca: "asus",
    imagen: "https://th.bing.com/th/id/R.b2b34fe1e636a0f5b231f3eb529d22b6?rik=V22ME0Nxbb2Ehg&pid=ImgRaw&r=0",
    descripcion: "Procesador AMD Ryzen 7, 16GB de RAM, 512GB de almacenamiento SSD, pantalla de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce GTX 1650, Windows 10 Home",
    stock: 8
  }
];
localStorage.setItem("productos", JSON.stringify(productos))
console.log(productos);}