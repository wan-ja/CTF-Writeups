<?php

function get_token(): string {
  $TOKEN_PATH = "/tmp/real_token";
  if (!file_exists($TOKEN_PATH)) {
    file_put_contents($TOKEN_PATH, bin2hex(random_bytes(8))); // 16-hex
  }
  return trim(file_get_contents($TOKEN_PATH));
}
