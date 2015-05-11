<?php

$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

$username = urldecode($_POST['username']);
$password = urldecode($_POST['password']);

$result = mysql_query("SELECT UserType, UserID, Name FROM User WHERE Username = '$username' AND Password = '$password'");
if (! $result) {
    die("Query failed!");
}
$count = mysql_num_rows($result);
if ($count == 1) {
    $row = mysql_fetch_assoc($result);
    session_start();
    $_SESSION['username'] = $username;
    $_SESSION['user_type'] = $row['UserType'];
    $_SESSION['user_id'] = $row['UserID'];
    $_SESSION['name'] = $row['Name'];
    echo $row['UserType'];
}
else {
    echo "0";
}
?>