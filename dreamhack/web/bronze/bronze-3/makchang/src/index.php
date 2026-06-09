<?php
    $flag = "DH{This_is_fake_flag}";
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>막창 좋아하세요?</title>
    <style>
        body {
            background-color: #fff;
            color: #000;
            text-align: center;
            font-family: 'Courier New', Courier, monospace;
            font-weight: bold; 
            overflow-x: hidden;
            padding-top: 50px;
        }

        @keyframes spin-rainbow {
            0% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg) drop-shadow(0 0 10px rgba(255,0,0,0.5)); }
            50% { transform: rotate(180deg) scale(1.5); filter: hue-rotate(180deg) drop-shadow(0 0 50px rgba(255,255,0,0.8)); }
            100% { transform: rotate(360deg) scale(1); filter: hue-rotate(360deg) drop-shadow(0 0 10px rgba(255,0,0,0.5)); }
        }

        #makchang {
            width: 300px;
            margin: 50px auto;
            animation: spin-rainbow 0.5s infinite linear;
            cursor: pointer;
        }

        .container {
            border: 10px solid #000;
            padding: 30px;
            display: inline-block;
            margin-top: 20px;
            background: #f9f9f9;
        }

        .success {
            color: #ff0000;
            font-size: 2.5em;
            text-shadow: 2px 2px #ffcc00;
            animation: blink 0.1s infinite;
            margin-top: 20px;
        }

        @keyframes blink {
            0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }
        }

        input {
            background: #fff;
            color: #000;
            border: 5px solid #000;
            padding: 10px;
            font-size: 1.5em;
            width: 150px;
            font-weight: bold;
        }

        button {
            background: #000;
            color: #fff;
            border: none;
            padding: 15px 30px;
            font-size: 1.2em;
            font-weight: bold;
            cursor: pointer;
        }

        button:hover {
            background: #ff0000;
        }

        h1 {
            font-size: 3em;
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <h1>🍖 막창 좋아하세요? 🍖</h1>
    <p style="font-size: 1.2em;">"사장님 이 막창 맛이 엄청난데요?"</p>

    <div id="makchang-container">
        <img src="food.png" id="makchang" alt="맛있는 막창">
    </div>

    <div class="container">
        <form method="GET">
            불판 온도 입력: 
            <input type="text" name="temp" maxlength="10" placeholder="??">
            <button type="submit">굽기 시작!!</button>
        </form>

        <?php
            if (isset($_GET['temp'])) {
                $temp = $_GET['temp'];
                if (strlen($temp) <= 4) {
                    if ((float)$temp > 1000000000000000) {
                        echo "<div class='success'>";
                        echo "막창이 이븐하게 익었어요. 여기 플래그에요: " . $flag;
                        echo "</div>";
                        echo "<script>document.getElementById('makchang').style.animationDuration = '0.3s';</script>";
                    } else {
                        echo "<h2 style='color:blue;'>❄️ 너무 차갑잖아!</h2>";
                    }
                } else {
                    echo "<h2 style='color:orange;'>🚫 $temp 도는 좀...</h2>";
                }
            }
        ?>
    </div>

</body>
</html>