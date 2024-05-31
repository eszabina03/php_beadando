<?php
$sql = require('adatbazis.php');


$query = sprintf("SELECT * FROM felhasznalo WHERE email = '%s'", $sql->real_escape_string($_GET["email"]));
                
$result = $sql->query($query);

$is_available = $result->num_rows === 0;

header("Content-Type: application/json");

echo json_encode(["available" => $is_available]);