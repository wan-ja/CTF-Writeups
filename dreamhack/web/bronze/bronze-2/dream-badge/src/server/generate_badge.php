<?php
    include './db/lib.php';
    session_start();

    if (!isset($_SESSION['username'])) {
        header("Location: login.php");
        exit();
    }

    function generateRandomKey($length = 32) {
        return bin2hex(random_bytes($length / 2));
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!isset($_POST['password']) || empty($_POST['password'])) {
            header("Location: generate_badge.php");
            exit();
        }

        $username = $_SESSION['username'];
        $password = $_POST['password'];
        
        $stmt = $pdo->prepare("SELECT password FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || ($password!==$user['password'])) {
            echo "<script>alert('Wrong password.....');location.href='/generate_badge.php';</script>";
            exit();
        }
        
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM dreambadge WHERE username = ?");
        $stmt->execute([$username]);
        $badgeExists = $stmt->fetchColumn();

        if ($badgeExists > 0) {
            $stmt = $pdo->prepare("SELECT badge_key FROM dreambadge WHERE username = ?");
            $stmt->execute([$username]);
            $badgeKey = $stmt->fetchColumn();

            setcookie('key', $badgeKey, time() + 3600, "/");

            echo "<script>alert('your badge already exists!');location.href='/view_badge.php';</script>";
            exit();
        }

        $badgeName = $username . "_badge";
        $accessKey = generateRandomKey();
        $stmt = $pdo->prepare("INSERT INTO dreambadge (username, badge_name, badge_key) VALUES (?, ?, ?)");
        $stmt->execute([$username, $badgeName, $accessKey]);
        setcookie('key', $accessKey, time() + 3600, "/");

        echo "<script>alert('Success!');location.href='/view_badge.php';</script>";
        exit();
    }
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Create Dream Badge</title>
    <link rel="stylesheet" href="/static/css/generate_badge.css">
</head>
<body>
    <div class="container">
        <h1>Create Dream Badge</h1>
        <p>Dream Badge를 발급하시려면 비밀번호를 입력하세요.</p>
        
        <form action="" method="POST">
            <input type="password" name="password" placeholder="비밀번호" required>
            <button type="submit">Create</button>
        </form>
    </div>
</body>
</html>