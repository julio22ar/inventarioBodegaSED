document.getElementById("registerForm").addEventListener("submit", function(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        event.preventDefault();
        alert("Las contraseñas no coinciden. Por favor, verifícalas.");
    }
});


document.getElementById("loginForm").addEventListener("submit", function(event) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email.trim() === "" || password.trim() === "") {
        event.preventDefault();
        alert("Todos los campos son obligatorios. Por favor, complételos.");
    }
});
