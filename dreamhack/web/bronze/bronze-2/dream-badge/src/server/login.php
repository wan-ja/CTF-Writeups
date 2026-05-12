<?php
    include './db/lib.php';
    session_start();

    $errorMessage = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && ($password === $user['password'])) {
            if (isset($_COOKIE['key'])) {
                setcookie('key', '', time() - 3600, '/');
            }

            $_SESSION['username'] = $username;

            $stmt = $pdo->prepare("SELECT badge_key FROM dreambadge WHERE username = ?");
            $stmt->execute([$username]);
            $dreamBadge = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($dreamBadge) {
                setcookie('key', $dreamBadge['badge_key'], time() + 3600, '/');
            }

            echo "<script>alert('Login Success!');location.href='/';</script>";
        } else {
            $errorMessage = "Wrong ID or Password.....";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/static/css/login.css">
</head>
<body>
    <div class="login-container">
        <h2>로그인</h2>
        <?php if ($errorMessage): ?>
            <div class="error-message"><?php echo $errorMessage; ?></div>
        <?php endif; ?>
        <form action="login.php" method="POST">
            <input type="text" name="username" placeholder="아이디" required>
            <input type="password" name="password" placeholder="비밀번호" required>
            <button type="submit">로그인</button>
        </form>
    </div>
</body>
</html>