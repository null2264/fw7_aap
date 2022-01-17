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
        $queryString = "SELECT * FROM post";

        $query = $__query($con, $queryString) or exit("RIP");

        $data = [];

        while ($row = $__fetch($query)) {
            $data[] = $row;
        }

        echo json_encode($data, JSON_PRETTY_PRINT);
        break;

    case "POST":
        $blogTitle = $_POST["name"];
        $blogContent = $_POST["position"];
        $blogDate = microtime(true);
        $blogAuthor = 0;

        $queryString = "INSERT INTO post (title, content, date, author_id) VALUES";
        $inputArray = [$blogTitle, $blogContent, $blogDate, $blogAuthor];

        // Sanitized query
        if ($db_type > 0) {
            pg_prepare($con, "newPost", "$queryString ($1, $2, $3, $4)");
            pg_execute($con, "newPost", $inputArray);
        } else {
            $query = $con->prepare("$queryString (?, ?, ?, ?)");
            $query->bind_param("sdsi", ...$inputArray);
            $query->execute();
        }
        break;
}
?>
