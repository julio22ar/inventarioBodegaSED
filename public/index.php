<?php
include 'session.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Bodega Inventario</title>
</head>
<body>
    <div class="container">
        <?php if (!isLoggedIn()): ?>
            <h2>Register</h2>
            <form action="register.php" method="POST">
                <input type="text" name="name" placeholder="Full Name" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <select name="role">
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="superadmin">Super Administrador</option>
                </select>
                <button type="submit" name="register">Register</button>
            </form>

            <h2>Login</h2>
            <form action="login.php" method="POST">
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" name="login">Login</button>
            </form>
        <?php else: ?>
            <h2>Welcome, <?php echo $_SESSION['role']; ?></h2>
            <a href="logout.php?logout=true">Logout</a>
        <?php endif; ?>
    </div>
</body>
</html>
