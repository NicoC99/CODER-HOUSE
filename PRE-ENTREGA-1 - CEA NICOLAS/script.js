
let validacion = false;
let productos = []
do{
let opcion = parseInt(prompt("Seleccione una opcion: \n 1. CARGAR PRODUCTOS \n 2. SALIR"))
    if(opcion === 1){
        validacion = true
        cargarProducto()
    }else if(opcion === 2){
        validacion = true
        alert("Saliendo")
    }else{
        alert("Indique una opcion valida!")
    }

}while(validacion == false)


function cargarProducto(){
    let cantidad = parseInt(prompt("Indique la cantidad de productos que seran cargados"))
    for (let i = 1; i <= cantidad; i ++){
        let producto = {}
        alert("Ingrese los datos del producto "+ i )
        producto.nombre = prompt("Nombre del producto:")
        producto.codigo = prompt("Codigo de barras:")
        producto.precio = parseFloat(prompt("Precio del producto:"))
        producto.cantidad = parseInt(prompt("Cantidad en stock:"))

        productos.push(producto)

        alert(`Producto Agregado:\nNombre: ${producto.nombre}\nCodigo: ${producto.codigo}\nPrecio: ${producto.precio}\nCantidad en stock: ${producto.cantidad}`)
    

    }
    alert("Productos cargados con exito!")

}
