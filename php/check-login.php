<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");;
include("connection.php");


$email=$_POST['email'];
$password=$_POST['password']; 
 

$query = pg_query($con, "SELECT * FROM alumni WHERE email='$email' AND pass='$password'");

$count = pg_num_rows($query);
$output = array();

if ($count >= 1){
	while ($data=pg_fetch_object($query)){
		$output[] = $data;
	}
	$output['msg'] = "Successfully logged in!";
} else {
	$output['msg'] = "Sorry, you're not registered!";
	http_response_code(403);
}
echo json_encode($output, JSON_PRETTY_PRINT); 
?>
