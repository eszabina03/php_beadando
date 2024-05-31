<?php
$sql = require('adatbazis.php');


//email validálása
if(!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
    echo("Érvényes email cím szükséges");
    $sql->close();
}
//felhasználónév validálása
if (empty($_POST["felhasznalo"])){
    echo("A felhasználó név mező kötelező");
    $sql->close();
}
//jelszó validálása
if(strlen($_POST["jelszo"]) < 6){
    echo("Hiba: A jelszónak legalább 6 karekter hosszúnak kell lennie! Kérem próbálja újra!");
    $sql->close();
}
if(! preg_match("/[a-z]/i", $_POST["jelszo"])){
    echo("Hiba: A jelszónak tartalmaznia kell egy kis betűt! Kérem próbálja újra!");
    $sql->close();
}
if(! preg_match("/[A-Z]/i", $_POST["jelszo"])){
    echo("Hiba: A jelszónak tartalmaznia kell egy nagy betűt! Kérem próbálja újra!");
    $sql->close();
}
if(! preg_match("/[0-9]/i", $_POST["jelszo"])){
    echo("Hiba: A jelszónak tartalmaznia kell egy számot! Kérem próbálja újra!");
    $sql->close();
}
//jelszavak ellenőrzése
if($_POST["jelszo"] !== $_POST["jelszo-megerosit"]){
    echo("Hiba: A két jelszó nem egyezik! Kérem próbálja újra!");
    $sql->close();
}

$query = "INSERT INTO felhasznalo (email, nev, jelszo_hash)  VALUES (?, ?, ?)";
$stmt = $sql->stmt_init();

if(! $stmt->prepare($query)){
    echo("Hiba: ". $sql->error);
    
}
$jelszo_hash = password_hash($_POST["jelszo"], PASSWORD_DEFAULT);
$stmt->bind_param("sss",
            $_POST["email"],
            $_POST["felhasznalo"],
            $jelszo_hash );
if($stmt->execute()){
    echo("Siker!");
    header("Location: sikeres_regisztracio.html");
    $sql->close();
    exit;
}else{
    if($sql->errno === 1062)
    {
        echo("Hiba: ilyen felhasználónévvel vagy e-mailel már korábban regisztráltak");
        $sql->close();
    }else{
        echo($sql->error . " " . $sql->errno);
        $sql->close();
    }
}
