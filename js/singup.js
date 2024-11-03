document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos el formulario por su ID
    const signupForm = document.getElementById("signupForm");

    // Verificamos si el formulario existe en el DOM
    if (!signupForm) {
        console.error('No se encontró el formulario de registro. Asegúrate de que el ID del formulario sea correcto.');
        return;
    }

    // Añadimos un listener al evento submit del formulario
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        
        // Recolectamos los valores ingresados por el usuario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const telefono = document.getElementById("telefono").value;
        const direccion = document.getElementById("direccion").value;
        const rol = document.getElementById("rol").value;

        // Verificamos que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.");
            return;
        }

        try {
            // Realizamos la solicitud POST al servidor para registrar al usuario
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, email, password, telefono, direccion, rol })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Notificamos al usuario que el registro fue exitoso
                window.location.href = "login.html"; // Redirigimos al login
            } else {
                alert(data.error); // Mostramos el error devuelto por el servidor
            }
        } catch (error) {
            console.error('Error durante la solicitud:', error);
            alert('Ocurrió un error durante el registro. Inténtalo de nuevo.');
        }
    });
});
