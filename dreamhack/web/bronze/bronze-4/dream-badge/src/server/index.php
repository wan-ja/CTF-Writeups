<?php
session_start();
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Dream Badge</title>
    <link rel="stylesheet" href="/static/css/index.css">
</head>
<body>
    <div class="container">
        <h1>50000명 기념 Dream Badge를 발급하세요!</h1>
        
        <div class="btn-container">
            <?php
            if(isset($_SESSION['username'])) {
                echo '<a href="view_badge.php" class="btn btn-primary">View Badge</a>';
                echo '<a href="generate_badge.php" class="btn btn-secondary">Generate Badge</a>';
                echo '<a href="logout.php" class="btn btn-logout">Logout</a>';
            } else {
                echo '<p>Dream Badge를 받기 위해 로그인 또는 회원가입을 해주세요.</p>';
                echo '<a href="login.php" class="btn btn-primary">Login</a>';
                echo '<a href="register.php" class="btn btn-secondary">Register</a>';
            }
            ?>
        </div>
    </div>
</body>
</html>