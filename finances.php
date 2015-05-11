<?php 

session_start();

$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

if ($_POST['action'] == "view") {
    echo view_balance($_SESSION['user_id']);
}
else if ($_POST['action'] == "pay") {
    echo make_payment(urldecode($_POST['amount']), urldecode($_POST['patient']));
}
else {
}

function view_balance($user_id) {
    $result = mysql_query("CALL view_account_balance('" . $user_id . "')");
    if (! $result) {
        die("Query failed");
    }
    $row = mysql_fetch_row($result);
    return $row[0] ? $row[0] : "0.00";
}

function make_payment($amount, $user_id) {
    $result = mysql_query("CALL make_payment('" . $amount . "', '" . $user_id . "')");
    if (! $result) {
      return "0";
    }
    else {
      return view_balance($user_id);
    }
}

?>
