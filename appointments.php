<?php

session_start();

$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

if ($_POST['action'] == "view") {
    if (! isset($_POST['date'])) {
        if ($_SESSION['user_type'] == 'Patient') {
            $result = mysql_query("select AppointmentID, User.Name, Time from Appointment JOIN User on Appointment.PhysicianID = User.UserID where PatientID='" . $_SESSION['user_id'] . "'");
        } else {
            $result = mysql_query("select AppointmentID, User.Name, Time from Appointment JOIN User on Appointment.PatientID = User.UserID where PhysicianID='" . $_SESSION['user_id'] . "'");
        }
        $response = array();
        while ($row = mysql_fetch_assoc($result)) $response[] = $row;
        $jsonData = json_encode($response);
        echo $jsonData;
        return;
    }
    else if ($_SESSION['user_type'] == "Patient" && isset($_POST['date'])) {
        $physician_id = $_POST['physician_id'];
        $date = $_POST['date'];
        $result = mysql_query("SELECT DATE_FORMAT(Time, '%H:%i') FROM Appointment WHERE DATE(Time) = '" . $date . "' AND PhysicianID = '" . $physician_id);
    }
}
else if ($_POST['action'] == "schedule") {
    if ($_SESSION['user_type'] == "Patient") {
        $patient_id = $_SESSION['user_id'];
        $physician_id = $_POST['physician_id'];
    } else {
        $patient_id = $_POST['physician_id'];
        $physician_id = $_SESSION['user_id'];
    }
    $date = date('Y-m-d H:i:s', strtotime($_POST['date']));
    if ($_POST['date'] == " null") {
        echo "0";
        return;
    }
    $result = mysql_query("CALL schedule_appointment('" . $patient_id . "', '" . $physician_id . "', '" . $date . "', '" . $desc . "')");
    if (! $result) {
        echo "0";
    }
    else {
        echo "1";
    }
}
else if ($_POST['action'] == "cancel") {
    $appointment_id = $_POST['appointment_id'];
    $result = mysql_query("CALL cancel_appointment('" . $appointment_id . "')");
    if (! $result) {
        echo "0";
    }
    else {
        echo "1";
    }
}
else if ($_POST['action'] == "view_openings") {
    $date = date('Y-m-d', strtotime($_POST['date']));
    if ($_SESSION['user_type'] == 'Patient') {
        $physician_id = $_POST['physician_id'];
    } else {
        $physician_id = $_SESSION['user_id'];
    }
    $available_times = array();
    for ($i = 8; $i < 10; $i++) {
        $available_times["0" . "$i" . ":00" . " AM"] = true;
    }
    for ($i = 10; $i < 12; $i++) {
        $available_times["$i" . ":00" . " AM"] = true;
    }
    $available_times["12:00 PM"] = true;
    for ($i = 1; $i < 7; $i++) {
        $available_times["0" . "$i" . ":00" . " PM"] = true;
    }
    $result = mysql_query("SELECT DATE_FORMAT(Time, '%h:%i %p') FROM Appointment WHERE DATE(Time) = '" . $date . "' AND PhysicianID = '" . $physician_id . "'");
    if (! $result) {
        die("Query failed!");
    }
    $row = mysql_fetch_row($result);
    while ($row) {
        unset($available_times[$row[0]]);
        $row = mysql_fetch_row($result);
    }
    foreach ($available_times as $key => $value) {
        echo "<option value=\"" . $key . "\">" . $key . "</option>";
    }
}
?>
