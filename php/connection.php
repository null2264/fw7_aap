<?php

$host = "localhost";
$user = "";
$pass = "";
$db = "alumni";

include "secret.php";

/* -- MySQL
 * Uncomment to use MySQL, then comment PostgreSQL
 */
// $con = mysqli_connect($host, $user, $pass, $db)

/* -- PostgreSQL
 * Uncomment to use PostgreSQL, then comment MySQL
 */
$con = pg_connect("host=$host dbname=$db user=$user password=$pass");
?>
