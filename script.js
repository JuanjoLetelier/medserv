let productos = [
    { nombre: "Máquina de Diálisis", precio: 15000000, cantidad: 0, imagen: "img/dialisis.jpeg" },
    { nombre: "Desfibrilador", precio: 5000000, cantidad: 0, imagen: "img/desfibrilador.jpeg" },
    { nombre: "Balanza Digital", precio: 800000, cantidad: 0, imagen: "img/balanza.webp" },
    { nombre: "Planta de Agua", precio: 20000000, cantidad: 0, imagen: "img/planta_agua.jpg" },
    { nombre: "Sala de Re-Uso", precio: 18000000, cantidad: 0, imagen: "img/sala_reuso.jpg" },
    { nombre: "Repuestos y Accesorios", precio: 100000, cantidad: 0, imagen: "img/repuestos.jpeg" }
];

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    cargarCotizacion();
    document.getElementById("form-cotizacion").addEventListener("submit", enviarCotizacion);
});

function mostrarVista(vista) {
    document.querySelectorAll('.vista').forEach(seccion => seccion.style.display = 'none');
    document.getElementById(vista).style.display = 'block';

    if (vista === 'cotizar') {
        actualizarCotizacion();
        mostrarProductosCotizar();
    }
}

function mostrarProductos() {
    let lista = document.getElementById('lista-productos');
    lista.innerHTML = '';

    productos.forEach(producto => {
        let item = document.createElement('div');
        item.className = "producto";
        item.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}"> <p>${producto.nombre} - $${producto.precio}</p>`;
        lista.appendChild(item);
    });
}

function mostrarProductosCotizar() {
    let lista = document.getElementById('productos-lista');
    lista.innerHTML = '';

    productos.forEach((producto, index) => {
        let item = document.createElement('div');
        item.className = "producto-cotizacion";
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <p>${producto.nombre} - $${producto.precio}</p>
            <div>
                <button onclick="modificarCantidad(${index}, -1)">-</button>
                <span>${producto.cantidad}</span>
                <button onclick="modificarCantidad(${index}, 1)">+</button>
            </div>
        `;
        lista.appendChild(item);
    });
}


function actualizarCotizacion() {
    let contenedor = document.getElementById('productos-disponibles');
    contenedor.innerHTML = '';
    let total = 0;

    productos.forEach((producto, index) => {
        if (producto.cantidad > 0) {
            let item = document.createElement('div');
            item.className = "producto-cotizacion";
            let subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            item.innerHTML = `<p>${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${subtotal}</p>`;
            contenedor.appendChild(item);
        }
    });

    document.getElementById('total').innerText = total;
    localStorage.setItem("cotizacion", JSON.stringify(productos));
}

function modificarCantidad(index, cambio) {
    if (productos[index].cantidad + cambio >= 0) {
        productos[index].cantidad += cambio;
    }
    actualizarCotizacion();
    mostrarProductosCotizar();
}

function vaciarCotizacion() {
    productos.forEach(producto => producto.cantidad = 0);
    actualizarCotizacion();
    mostrarProductosCotizar();
}

function enviarCotizacion(event) {
    event.preventDefault();
    document.getElementById("mensaje-envio").innerText = `Cotización enviada.`;
}
