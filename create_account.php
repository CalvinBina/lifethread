<?php

$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

$user_type = $_POST['user_type'];
$name = urldecode($_POST['name']);
$username = urldecode($_POST['username']);
$password = urldecode($_POST['password']);
$address = urldecode($_POST['address']);

if ($user_type == "Patient") {
    $result = mysql_query("CALL sign_up_patient('" . $name . "', '" . $username . "', '" . $password . "', '" . $address . "')");
    if (! $result) {
        echo "0";
    }    
} else {
    $result = mysql_query("CALL sign_up_caregiver('" . $user_type . "', '" . $name . "', '" . $username . "', '" . $password . "', '" . $address . "')");
    if (!$result) {
        echo "0";
    }
}
echo "1";
?>
