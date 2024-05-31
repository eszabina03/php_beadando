<?php

$url = "mysql.caesar.elte.hu";
$adatbazis_nev = "eszabina";
$felhasznalo = "eszabina";
$jelszo = "nw18nGM6stQfwE7A";

$sql = new mysqli($url, $felhasznalo, $jelszo, $adatbazis_nev);
                     
if ($sql->connect_errno) {
    echo("Kapcsolódási hiba: " . $sql->connect_error);
}

return $sql;