document.addEventListener("DOMContentLoaded", async function () {
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
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-index="${producto.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${producto.id}">Eliminar</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    // Obtener productos del servidor
    async function cargarProductos() {
        productos = await getProducts();
        renderizarProductos();
    }

    // Mostrar modal para agregar producto
    addProductBtn.addEventListener("click", () => {
        productForm.reset();
        document.getElementById("productModalLabel").textContent = "Agregar Producto";
        productForm.setAttribute("data-editing", "false");
        productModal.show();
    });

    // Envío del formulario de producto (Agregar o Editar)
    productForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nombre = document.getElementById("productName").value;
        const cantidad = document.getElementById("productQuantity").value;
        const precio = document.getElementById("productPrice").value;
        const categoria = document.getElementById("productCategory").value;

        const nuevoProducto = { nombre, cantidad, precio, categoria };

        if (productForm.getAttribute("data-editing") === "true") {
            const id = productForm.getAttribute("data-index");
            await updateProduct(id, nuevoProducto);
        } else {
            await addProduct(nuevoProducto);
        }

        cargarProductos();
        productModal.hide();
    });

    // Delegar eventos de edición y eliminación
    productTableBody.addEventListener("click", async (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const id = event.target.getAttribute("data-index");
            const producto = productos.find(p => p.id == id);

            document.getElementById("productName").value = producto.nombre;
            document.getElementById("productQuantity").value = producto.cantidad;
            document.getElementById("productPrice").value = producto.precio;
            document.getElementById("productCategory").value = producto.categoria;

            document.getElementById("productModalLabel").textContent = "Editar Producto";
            productForm.setAttribute("data-editing", "true");
            productForm.setAttribute("data-index", id);
            productModal.show();
        } else if (event.target.classList.contains("delete-btn")) {
            const id = event.target.getAttribute("data-index");
            await deleteProduct(id);
            cargarProductos();
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

    // Cargar productos al cargar la página
    cargarProductos();
});
