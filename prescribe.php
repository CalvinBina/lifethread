<?php
session_start();
$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

$patient_id = $_POST['patient_id'];
$phys_id = $_SESSION['user_id'];
$drug = $_POST['drug'];
$qty = $_POST['qty'];
$refills = $_POST['refills'];

$result = mysql_query("CALL prescribe_med('" . $patient_id . "', '" . $phys_id ."', '" . $drug . "', '" . $qty . "', '" . $refills . "')");
if (! $result) {
    echo 0;
} else {
    echo 1;
}
?>
