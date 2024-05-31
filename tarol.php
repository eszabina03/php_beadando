<?php

$sql = require('adatbazis.php');

session_start();

if (isset($_SESSION["felhasznalo_id"])) {
    $query = "SELECT * FROM felhasznalo WHERE id = ?";
    $stmt = $sql->prepare($query);
    $stmt->bind_param("i", $_SESSION["felhasznalo_id"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $data = json_decode(file_get_contents("php://input"), true);
    
    if ($data) {
        $time = $data["time"];
        $type = $data["type"];
        $query = "INSERT INTO pontszam (ido, tipus, felhasznalo_id) VALUES (?, ?, ?)";
        $stmt = $sql->prepare($query);
        $stmt->bind_param("isi", $time, $type, $user["id"]);

        if ($stmt->execute()) {
            echo "Az eredmény rögzítve!";
        } else {
            echo "Hiba!";
        }
        
        $stmt->close();
    } else {
        echo "Nincs adat!";
    }
    
    $sql->close();
} else {
    echo "Felhasználó nincs bejelentkezve!";
}
?>
