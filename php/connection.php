<?php
$host = "localhost";
$user = "";
$pass = "";
$db = "alumni";
/* -- DB Type
 * 0 = MySQL
 * 1 = PostgreSQL
 */
$db_type = 1;

include "secret.php";

switch ($db_type)
{
    case 0:
        $con = mysqli_connect($host, $user, $pass, $db);
        break;
    case 1:
        $con = pg_connect("host=$host dbname=$db user=$user password=$pass");
        break;
}
?>
