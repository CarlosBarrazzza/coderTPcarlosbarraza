let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalPrecio = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
let carritoVisible = false;

function actualizarCarrito() {
    document.getElementById("totalCarrito").textContent = totalPrecio;
    
    const itemCountElement = document.getElementById('itemCount');
    if (carrito.length > 0) {
        itemCountElement.textContent = carrito.length;
        itemCountElement.style.display = "inline";
    } else {
        itemCountElement.style.display = "none";
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarNotificacionFachera(texto) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
}

function agregarAlCarritoPa(nombre, precio) {
    const producto = carrito.find(p => p.nombre === nombre);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    totalPrecio += precio;
    actualizarCarrito();

    mostrarNotificacionFachera(`¡${nombre} agregado al carrito!`);

    if (carritoVisible) {
        mostrarCarrito();
    }
}

function eliminarDelCarrito(nombre) {
    const productoIndex = carrito.findIndex(p => p.nombre === nombre);
    if (productoIndex !== -1) {
        const producto = carrito[productoIndex];
        totalPrecio -= producto.precio * producto.cantidad;
        carrito.splice(productoIndex, 1);
        
        actualizarCarrito();
        mostrarCarrito();
        
        localStorage.setItem("carrito", JSON.stringify(carrito));

        if (carritoVisible) {
            mostrarCarrito();
        }
    }
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "Su carrito está vacío, llénala de escabio y compra pa.";
        carritoContainer.appendChild(mensajeVacio);
    } else {
        carrito.forEach(producto => {
            const productoItem = document.createElement("div");
            productoItem.innerHTML = `
                <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio por unidad: $${producto.precio}</p>`;
            carritoContainer.appendChild(productoItem);
        });
    }
}

document.getElementById("carritoIcon").onclick = function() {
    carritoVisible = !carritoVisible;
    document.getElementById('panelCarrito').classList.toggle('visible');
    mostrarCarrito();
    actualizarCarrito();
};

document.getElementById("closePanel").onclick = function() {
    carritoVisible = false;
    document.getElementById('panelCarrito').classList.remove('visible');
    actualizarCarrito();
};

document.getElementById("eliminarCarrito").onclick = function() {
    carrito = [];
    totalPrecio = 0;
    actualizarCarrito();
    mostrarCarrito();
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

document.getElementById("finalizarCompra").onclick = function() {
    if (carrito.length > 0) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Una vez compres, se te llegara una factura por mail!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, finalizar la compra',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                enviarDatosCarrito(carrito).then(response => {
                    if (response.ok) {
                        Swal.fire('¡Gracias por tu compra!', 'Tu pedido ha sido procesado exitosamente.', 'success');
                        carrito = [];
                        totalPrecio = 0;
                        actualizarCarrito();
                        mostrarCarrito();
                    } else {
                        Swal.fire('Error', 'No se pudo procesar tu pedido. Intenta de nuevo.', 'error');
                    }
                });
            }
        });
    } else {
        Swal.fire('Tu carrito está vacío.', 'Agrega productos para continuar.', 'info');
    }
};

function enviarDatosCarrito(carrito) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
            });
        }, 1000);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    totalPrecio = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    actualizarCarrito();
});