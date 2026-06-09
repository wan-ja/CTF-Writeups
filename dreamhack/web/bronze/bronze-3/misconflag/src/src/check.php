<?php
require_once __DIR__ . "/token.php";

$guess = $_GET["token"] ?? "";
$real  = get_token();

if ($guess !== "" && hash_equals($real, $guess)) {
  header("Content-Type: text/plain; charset=utf-8");
  echo trim(file_get_contents(__DIR__ . "/flag.txt"));
  exit;
}

http_response_code(403);
?>
<!doctype html>
<meta charset="utf-8">
<title>Verify</title>
<link rel="stylesheet" href="/style.css">

<div class="container">
  <div class="card">
    <h1>Invalid token</h1>
    <p>try again.</p>
    <a class="btn" href="/">Back</a>
  </div>
</div>
