<?php

session_start();

$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

if ($_SESSION['user_type'] == "Patient") {
    $result = mysql_query("CALL view_prescription_history('" . $_SESSION['user_id'] . "')");
    if (! $result) {
        die("Query failed!");
    }    
    $count = mysql_num_rows($result);
    if ($count == 0) {
        echo "no prescriptions";
    }
    else {
        echo "<table class=\"table\">";
        for ($i = 0; $i < $count; $i++) {
            $row = $mysql_fetch_assoc($result);
            echo "<tr>";
            echo "<td>" . $row['RxNumber'] . "</td>";
            echo "<td>" . $row['Name'] . "</td>";
            echo "<td>" . $row['Quantity'] . "</td>";
            echo "<td>" . $row['Refills'] . "</td>";
            echo "</tr>";   
        }
        echo "</table>";
    }
}

?>