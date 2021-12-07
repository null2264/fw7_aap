<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");;

include("connection.php");

$alumniName=$_POST["name"];
$alumniEmail=$_POST["email"];
$alumniYear=$_POST["gradYear"];
$alumniProdi=$_POST["prodi"];
$alumniGender=$_POST["gender"];

if (isset($_FILES["file"])) {
	$fileName1 = $_FILES["file"]["name"];
	$fileType = $_FILES["file"]["type"];
	$tempName = $_FILES["file"]["tmp_name"];
	$fileSize = $_FILES["file"]["size"];
	if (
		($fileType == "image/gif") || ($fileType == "image/jpeg")
		|| ($fileType == "image/png") || ($fileType == "image/pjpeg")
		|| ($fileType == "image/jpg")
	) {
		compress_image($tempName, "../alumniPhoto/" . $fileName1, 80);
		$sql2 = "INSERT INTO alumni (name, email, year, prodi, gender, photo) VALUES ('$alumniName', '$alumniEmail', '$alumniYear', '$alumniProdi', '$alumniGender', '$fileName1')";
	       	// mysqli_query($con, $sql2);
	       	pg_query($con, $sql2);
	}
}

function compress_image($source_url, $destination_url, $quality) {
	$info = getimagesize($source_url);
	if ($info['mime'] == 'image/jpeg')
		$image = imagecreatefromjpeg($source_url);
	elseif ($info['mime'] == 'image/gif')
		$image = imagecreatefromgif($source_url);
	elseif ($info['mime'] == 'image/png')
		$image = imagecreatefrompng($source_url);
	elseif ($info['mime'] == 'image/jpg')
		$image = imagecreatefrompng($source_url);
	elseif ($info['mime'] == 'image/pjpeg')
		$image = imagecreatefrompng($source_url);
	imagejpeg($image, $destination_url, $quality);
}
?>
