let carrito = [];
let totalPrecio = 0;

function agregarAlCarritoPa(nombreProducto, precioProducto) {
    const productoExistente = carrito.find(producto => producto.nombre === nombreProducto);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
    }
    totalPrecio += precioProducto;
    document.getElementById('totalprecio').textContent = totalPrecio;
    alert(`Has agregado ${nombreProducto} al carrito. Total: $${totalPrecio}`);
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    let mensajeCarrito = "Productos en el carrito:\n";
    carrito.forEach(producto => {
        mensajeCarrito += `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio por unidad: $${producto.precio}\n`;
    });
    mensajeCarrito += `\nTotal: $${totalPrecio}`;
    alert(mensajeCarrito);
}

document.getElementById('mostrarCarritoBtn').onclick = mostrarCarrito;