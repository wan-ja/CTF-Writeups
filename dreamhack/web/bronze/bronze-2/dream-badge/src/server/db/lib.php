<?php
    $dbname = '/db/dreamdatabase.sqlite';

    try {
        $pdo = new PDO("sqlite:$dbname");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS dreambadge (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                badge_name TEXT UNIQUE NOT NULL,
                badge_key TEXT NOT NULL
            );

            INSERT OR IGNORE INTO users (username, password)
            VALUES ('admin', '{{**REDACTED**}}');

            INSERT OR IGNORE INTO dreambadge (username, badge_name, badge_key)
            VALUES ('admin', 'admin_badge', '{{**REDACTED**}}');
        ");
    } catch (PDOException $e) {
        die("Database Failed: " . $e->getMessage());
    }
?>