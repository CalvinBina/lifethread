<?php

$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

$result = mysql_query("SELECT UserID, Name FROM User WHERE UserType = 'Physician'");
if (! $result) {
    die("Query failed!");
}
$row = mysql_fetch_assoc($result);
while ($row) {
    echo "<option value=\"" . $row['UserID'] . "\">" . $row['Name'] . "</option>";
    $row = mysql_fetch_assoc($result);
}

?>