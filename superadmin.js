document.addEventListener("DOMContentLoaded", function () {
    const superAdminUserTableBody = document.getElementById("superAdminUserTableBody");
    const addAdminBtn = document.getElementById("addAdminBtn");
    const addSuperAdminBtn = document.getElementById("addSuperAdminBtn");
    const superAdminModal = new bootstrap.Modal(document.getElementById("superAdminModal"));
    const superAdminForm = document.getElementById("superAdminForm");

    let usuarios = [];

    // Función para renderizar la lista de usuarios
    function renderizarUsuarios() {
        superAdminUserTableBody.innerHTML = "";
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
            superAdminUserTableBody.appendChild(row);
        });
    }

    // Mostrar modal para agregar administrador
    addAdminBtn.addEventListener("click", () => {
        superAdminForm.reset();
        document.getElementById("superAdminModalLabel").textContent = "Agregar Administrador";
        superAdminForm.setAttribute("data-editing", "false");
        document.getElementById("superAdminRole").value = "administrador";
        superAdminModal.show();
    });

    // Mostrar modal para agregar superadministrador
    addSuperAdminBtn.addEventListener("click", () => {
        superAdminForm.reset();
        document.getElementById("superAdminModalLabel").textContent = "Agregar Superadministrador";
        superAdminForm.setAttribute("data-editing", "false");
        document.getElementById("superAdminRole").value = "superadministrador";
        superAdminModal.show();
    });

    // Envío del formulario de administrador/superadministrador
    superAdminForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nombre = document.getElementById("superAdminName").value;
        const email = document.getElementById("superAdminEmail").value;
        const rol = document.getElementById("superAdminRole").value;

        const nuevoUsuario = { nombre, email, rol };

        if (superAdminForm.getAttribute("data-editing") === "true") {
            const index = superAdminForm.getAttribute("data-index");
            usuarios[index] = nuevoUsuario;
        } else {
            usuarios.push(nuevoUsuario);
        }

        renderizarUsuarios();
        superAdminModal.hide();
    });

    // Delegar eventos de edición y eliminación
    superAdminUserTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            const usuario = usuarios[index];

            document.getElementById("superAdminName").value = usuario.nombre;
            document.getElementById("superAdminEmail").value = usuario.email;
            document.getElementById("superAdminRole").value = usuario.rol;

            document.getElementById("superAdminModalLabel").textContent = "Editar Usuario";
            superAdminForm.setAttribute("data-editing", "true");
            superAdminForm.setAttribute("data-index", index);
            superAdminModal.show();
        } else if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            usuarios.splice(index, 1);
            renderizarUsuarios();
        }
    });

    // Inicializar renderizado
    renderizarUsuarios();
});
