<?php
session_start();
$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

$text = $_POST['text'];
$empl_id = $_SESSION['user_id'];
$patient_id = $_POST['patient_id'];

$result = mysql_query("CALL write_exam_note('" . $text . "', '" . $empl_id . "', '" . $patient_id . "')");
if (! $result) {
    echo 0;
} else {
    echo 1;
}
?>
