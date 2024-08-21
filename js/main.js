let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalPrecio = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
let carritoVisible = false;

document.getElementById('totalprecio').textContent = totalPrecio;

function agregarAlCarritoPa(nombre, precio) {
    const producto = carrito.find(p => p.nombre === nombre);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    totalPrecio += precio;
    document.getElementById("totalprecio").textContent = totalPrecio;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensajeCarrito(nombre);

    if (carritoVisible) {
        mostrarCarrito();
    }
}

function eliminarDelCarrito(nombre) {
    const productoIndex = carrito.findIndex(p => p.nombre === nombre);
    if (productoIndex !== -1) {
        const producto = carrito[productoIndex];
    
        totalPrecio -= producto.precio * producto.cantidad;
        document.getElementById("totalprecio").textContent = totalPrecio;
    
        carrito.splice(productoIndex, 1);
    
        localStorage.setItem("carrito", JSON.stringify(carrito));

        if (carritoVisible) {
            mostrarCarrito();
        }
    }
}

function mostrarMensajeCarrito(nombre) {
    const mensajeContainer = document.getElementById('mensajeContainer');
    const mensaje = document.createElement('p');
    mensaje.textContent = "Agregaste " + nombre + " al carrito.";
    mensaje.style.color = "green";

    mensajeContainer.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 1500);
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "El carrito está vacío.";
        carritoContainer.appendChild(mensajeVacio);
    } else {
        carrito.forEach(producto => {
            const productoItem = document.createElement("div");
            productoItem.innerHTML = `
                <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio por unidad: $${producto.precio}</p>
                <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
            `;
            productoItem.style.color = "rgb(253, 97, 26)";
            carritoContainer.appendChild(productoItem);
        });

        const totalItem = document.createElement('p');
        totalItem.textContent = `Total: $${totalPrecio}`;
        carritoContainer.appendChild(totalItem);
    }

    carritoContainer.style.display = carritoVisible ? 'none' : 'block';
    carritoVisible = !carritoVisible;
}

document.getElementById("mostrarCarritoPa").onclick = function() {
    mostrarCarrito();
};

window.onload = function() {
    if (carrito.length > 0) {
        mostrarCarrito();
    }
};