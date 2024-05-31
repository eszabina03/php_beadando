<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/ranglista.css">
    <link rel="stylesheet" href="css/header.css">
    <title>Ranglista</title>
</head>
<body>
<header>
        <nav>
            <div class="vissza">
                <a href="index.php">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 15.75 2 12m0 0 4.75-3.75M2 12h20" />
                    </svg>
                </a>
            </div>
        </nav>
    </header>
    <h1>Ranglista</h1>
    <h2>Top 10 leggyorsabb kódfeltörő</h2>
    <?php
        $sql = require('adatbazis.php');
        $query = "SELECT felhasznalo.nev, pontszam.tipus, pontszam.ido FROM pontszam JOIN felhasznalo ON pontszam.felhasznalo_id = felhasznalo.id ORDER BY pontszam.ido ASC LIMIT 10";
        $result = $sql->query($query);
        if ($result->num_rows > 0) {
            echo "<table>";
            echo "<tr><th>Név</th><th>Témakör</th><th>Idő</th></tr>";
            while ($row = $result->fetch_assoc()) {
                echo "<tr><td>" . $row["nev"] . "</td><td>" . $row["tipus"] . "</td><td>" . $row["ido"] . " mp</td></tr>";
            }
            echo "</table>";
        } else {
            echo "Még nincsenek időeredmények.";
        }
        $sql->close();
    ?>
</body>
</html>