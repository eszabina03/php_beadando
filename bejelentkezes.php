<?php
$ervenyes = false;
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $sql = require('adatbazis.php');

    $query = sprintf("SELECT * FROM felhasznalo
            WHERE email = '%s'",
        $sql->real_escape_string($_POST["email"])
    );
    $result = $sql->query($query);
    $felhasznalo = $result->fetch_assoc();
    if ($felhasznalo) {
        if (password_verify($_POST["jelszo"], $felhasznalo["jelszo_hash"])) {
            session_start();

            session_regenerate_id();
            $_SESSION["felhasznalo_id"] = $felhasznalo["id"];
            header("Location: index.php");
            exit;
        }
    }
    $ervenyes = true;
}
?>
<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bejelentkezés</title>
    <link rel="stylesheet" type="text/css" href="css/bejelentkezes.css">
    <link rel="stylesheet" type="text/css" href="css/header.css">
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
    <main>
        <h1>Bejelentkezés</h1>
        <form method="post">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="<?= htmlspecialchars($_POST["email"] ?? "") ?>"
                required><br><br>
            <label for="jelszo">Jelszó:</label>
            <input type="password" id="jelszo" name="jelszo" required><br><br>
            <?php if ($ervenyes): ?>
                <em>Hiba: érvénytelen adatok</em>
            <?php endif; ?>
            <button type="submit" class="bejelentkez">Bejelentkezés</button>
        </form>

    </main>
</body>

</html>