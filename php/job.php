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

switch ($_SERVER["REQUEST_METHOD"])
{
    case "GET":
        $queryString = "SELECT * FROM job";

        $query = $__query($con, $queryString) or exit("RIP");

        $data = [];

        while ($row = $__fetch($query)) {
            $data[] = $row;
        }

        echo json_encode($data, JSON_PRETTY_PRINT);
        break;

    case "POST":
        $jobName = $_POST["name"];
        $jobPosition = $_POST["position"];
        $jobDescription = $_POST["description"];
        $jobOwner = 0;

        $queryString = "INSERT INTO job (name, position, description, owner_id) VALUES";
        $inputArray = [$jobName, $jobPosition, $jobDescription, $jobOwner];

        // Sanitized query
        if ($db_type > 0) {
            pg_prepare($con, "newUser", "$queryString ($1, $2, $3, $4)");
            pg_execute($con, "newUser", $inputArray);
        } else {
            $query = $con->prepare("$queryString (?, ?, ?, ?)");
            $query->bind_param("sssi", ...$inputArray);
            $query->execute();
        }
        break;
}
?>
