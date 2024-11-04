<?php
include 'db.php';
include 'session.php';

// Handle user login
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($user_id, $hash, $role);
    $stmt->fetch();

    if (password_verify($password, $hash)) {
        $_SESSION['user_id'] = $user_id;
        $_SESSION['role'] = $role;
        header('Location: index.php');
    } else {
        echo "Invalid email or password";
    }

    $stmt->close();
}
?>
    