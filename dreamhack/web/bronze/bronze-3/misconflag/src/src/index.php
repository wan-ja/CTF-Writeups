<!doctype html>
<meta charset="utf-8">
<title>MisConfig</title>
<link rel="stylesheet" href="/style.css">

<div class="container">
  <div class="card">
    <h1>Token Check</h1>
    <p>Can you brute-force this?</p>

    <form action="/check.php" method="GET" autocomplete="off">
      <input name="token" placeholder="16-hex token" spellcheck="false">
      <button type="submit">Verify</button>
    </form>
  </div>
</div>
