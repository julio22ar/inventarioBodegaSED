document.addEventListener("DOMContentLoaded", function () {
    const userTableBody = document.getElementById("userTableBody");
    const addUserBtn = document.getElementById("addUserBtn");
    const userModal = new bootstrap.Modal(document.getElementById("userModal"));
    const userForm = document.getElementById("userForm");

    let usuarios = [];

    // Función para renderizar la lista de usuarios en la tabla
    function renderizarUsuarios() {
        userTableBody.innerHTML = "";
        usuarios.forEach((usuario, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.rol}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Mostrar modal para agregar usuario
    addUserBtn.addEventListener("click", () => {
        userForm.reset();
        document.getElementById("userModalLabel").textContent = "Agregar Usuario";
        userForm.setAttribute("data-editing", "false");
        userModal.show();
    });

    // Envío del formulario de usuario (Agregar o Editar)
    userForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nombre = document.getElementById("userName").value;
        const email = document.getElementById("userEmail").value;
        const rol = document.getElementById("userRole").value;

        const nuevoUsuario = { nombre, email, rol };

        if (userForm.getAttribute("data-editing") === "true") {
            const index = userForm.getAttribute("data-index");
            usuarios[index] = nuevoUsuario;
        } else {
            usuarios.push(nuevoUsuario);
        }

        renderizarUsuarios();
        userModal.hide();
    });

    // Delegar eventos de edición y eliminación
    userTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            const usuario = usuarios[index];

            document.getElementById("userName").value = usuario.nombre;
            document.getElementById("userEmail").value = usuario.email;
            document.getElementById("userRole").value = usuario.rol;

            document.getElementById("userModalLabel").textContent = "Editar Usuario";
            userForm.setAttribute("data-editing", "true");
            userForm.setAttribute("data-index", index);
            userModal.show();
        } else if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            usuarios.splice(index, 1);
            renderizarUsuarios();
        }
    });

    // Renderizar usuarios iniciales (si los hubiera)
    renderizarUsuarios();
});
