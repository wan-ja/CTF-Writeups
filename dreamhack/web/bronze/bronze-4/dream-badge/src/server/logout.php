<?php
    session_start();
    session_unset();
    session_destroy();

    if (isset($_COOKIE['key'])) {
        setcookie('key', '', time() - 3600, '/');
    }

    echo "<script>alert('Logout Success!');location.href='/';</script>";
    exit();
?>