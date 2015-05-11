<?php
session_start();
$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

$userid = $_SESSION['user_id'];
$result = mysql_query("SELECT Address, Password FROM User WHERE UserID = '" . $userid . "'");
if (! $result) {
    die("Query failed!");
}
$response = array();
while ($row = mysql_fetch_assoc($result)) $response[] = $row;
$jsonData = json_encode($response);
echo $jsonData;
?>
