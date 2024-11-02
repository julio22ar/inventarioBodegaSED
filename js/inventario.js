document.addEventListener("DOMContentLoaded", function () {
    const productTableBody = document.getElementById("productTableBody");
    const addProductBtn = document.getElementById("addProductBtn");
    const productModal = new bootstrap.Modal(document.getElementById("productModal"));
    const productForm = document.getElementById("productForm");
    const searchInput = document.getElementById("searchInput");

    let productos = [];

    // Función para renderizar la lista de productos en la tabla
    function renderizarProductos(productosFiltrados = productos) {
        productTableBody.innerHTML = "";
        productosFiltrados.forEach((producto, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    // Mostrar modal para agregar producto
    addProductBtn.addEventListener("click", () => {
        productForm.reset();
        document.getElementById("productModalLabel").textContent = "Agregar Producto";
        productForm.setAttribute("data-editing", "false");
        productModal.show();
    });

    // Envío del formulario de producto (Agregar o Editar)
    productForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nombre = document.getElementById("productName").value;
        const cantidad = document.getElementById("productQuantity").value;
        const precio = document.getElementById("productPrice").value;
        const categoria = document.getElementById("productCategory").value;

        const nuevoProducto = { nombre, cantidad, precio, categoria };

        if (productForm.getAttribute("data-editing") === "true") {
            const index = productForm.getAttribute("data-index");
            productos[index] = nuevoProducto;
        } else {
            productos.push(nuevoProducto);
        }

        renderizarProductos();
        productModal.hide();
    });

    // Delegar eventos de edición y eliminación
    productTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            const producto = productos[index];

            document.getElementById("productName").value = producto.nombre;
            document.getElementById("productQuantity").value = producto.cantidad;
            document.getElementById("productPrice").value = producto.precio;
            document.getElementById("productCategory").value = producto.categoria;

            document.getElementById("productModalLabel").textContent = "Editar Producto";
            productForm.setAttribute("data-editing", "true");
            productForm.setAttribute("data-index", index);
            productModal.show();
        } else if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            productos.splice(index, 1);
            renderizarProductos();
        }
    });

    // Filtrar productos en tiempo real
    searchInput.addEventListener("input", () => {
        const criterio = searchInput.value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(criterio) ||
            producto.categoria.toLowerCase().includes(criterio)
        );
        renderizarProductos(productosFiltrados);
    });

    // Renderizar productos iniciales (si los hubiera)
    renderizarProductos();
});
