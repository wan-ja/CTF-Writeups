<?php
    include './db/lib.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $userExists = $stmt->fetchColumn();

        if ($userExists > 0) {
            echo "<script>alert('username already exists...'); location.href='register.php';</script>";
            exit();
        }

        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");

        if ($stmt->execute([$username, $password])) {
            echo "<script>alert('Register Success!');location.href='login.php';</script>";
        } else {
            echo "<script>alert('Something Wrong....')</script>";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="/static/css/register.css">
</head>
<body>
    <div class="register-container">
        <h2>회원가입</h2>
        <form action="register.php" method="POST">
            <input type="text" name="username" placeholder="아이디" required>
            <input type="password" name="password" placeholder="비밀번호" required>
            <button type="submit">회원가입</button>
        </form>
    </div>
</body>
</html>