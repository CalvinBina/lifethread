<?php
session_start();
$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

$addr = $_POST['addr'];
$pass = $_POST['pass'];
$user_id = $_SESSION['user_id'];
$result = mysql_query("UPDATE User SET Address='" . $addr . "', Password='" . $pass . "' WHERE UserID = '" . $user_id . "'");
if (! $result) {
    echo 0;
} else {
    echo "UPDATE User SET Address='" . $addr . "', Password='" . $pass . "' WHERE UserID = '" . $userid . "'";
}
?>
