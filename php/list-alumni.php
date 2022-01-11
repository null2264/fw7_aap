<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");;

include("connection.php");
 
$normh = $_POST['normh']; 
/* $query = mysqli_query($con,"SELECT * FROM alumni") or die(mysqli_error()); */
$query = pg_query($con,"SELECT * FROM alumni") or die(pg_result_error());

$data = array();

/* while ($row=mysqli_fetch_object($query)) { */
while ($row=pg_fetch_object($query)) {
    $data[] = $row;
}
	

echo json_encode($data,JSON_PRETTY_PRINT);
