<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods: POST,GET");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");;

include("connection.php");

// $__ = Internal Function alias
$__query = $db_type > 0 ? "pg_query" : "mysqli_query";
$__fetch = $db_type > 0 ? "pg_fetch_object" : "mysqli_fetch_object";

switch ($_SERVER['REQUEST_METHOD'])
{
    case "GET":
        $queryString = "SELECT * FROM alumni";
        $query = $__query($con, $queryString) or exit("RIP");

        $data = array();
         
        while ($row=$__fetch($query)) {
            $data[] = $row;
        }
        break;
    case "POST":
        $alumniName=$_POST["name"];
        $alumniEmail=$_POST["email"];
        $alumniYear=$_POST["gradYear"];
        $alumniProdi=$_POST["prodi"];
        $alumniGender=$_POST["gender"];
        $alumniPassword=$_POST["password"];

        if (isset($_FILES["file"])) {
            $fileName = $_FILES["file"]["name"];
            $fileType = $_FILES["file"]["type"];
            $tempName = $_FILES["file"]["tmp_name"];
            $fileSize = $_FILES["file"]["size"];
            if (
                ($fileType == "image/gif") || ($fileType == "image/jpeg")
                || ($fileType == "image/png") || ($fileType == "image/pjpeg")
                || ($fileType == "image/jpg")
            ) {
                compress_image($tempName, "../alumniPhoto/" . $fileName, 80);
                $queryString = "INSERT INTO alumni (name, email, year, prodi, gender, photo, pass) VALUES ('$alumniName', '$alumniEmail', '$alumniYear',
                    '$alumniProdi', '$alumniGender', '$fileName', '$alumniPassword')";
                $__query($con, $queryString);
            }
        }
        break;
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

echo json_encode($data,JSON_PRETTY_PRINT);
