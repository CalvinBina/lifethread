<?php
session_start();
$mysql_host = "localhost";
$mysql_username = "test";
$mysql_password = "test";
$mysql_db_name = "LifeThread";

mysql_connect($mysql_host, $mysql_username, $mysql_password) or die("Could not connect to DB");
mysql_select_db($mysql_db_name) or die("Could not select DB");

if (! isset($_POST['patient_id'])) {
    $patient_id = $_SESSION['user_id'];
} else {
    $patient_id = $_POST['patient_id'];
}

$result = mysql_query("select MedicalRecord.RxNumber, Prescription.Name, DATE_FORMAT(Timestamp, '%b %D, %Y') as date from MedicalRecord JOIN Prescription on MedicalRecord.RxNumber = Prescription.RxNumber where PatientID='" . $patient_id ."'");
if (! $result) {
    die("Query failed!");
}

$prescription_html = "";
while ($row = mysql_fetch_assoc($result)) {
    $prescription_html = $prescription_html . "<div class='mr-content'><h4>" . $row['Name'] . ", RX#" . $row['RxNumber'] . "</h4><p>Prescribed on " . $row['date'] . "</p></div>";
}

$result = mysql_query("select Treatment.Name, Treatment.Cost, DATE_FORMAT(Timestamp, '%b %D, %Y at %l:%i %p') as date from MedicalRecord JOIN Treatment on MedicalRecord.Trtmt_ID = Treatment.TreatmentID where PatientID='" . $patient_id ."'");
if (! $result) {
    die("Query failed!");
}

$treatment_html = "";
while ($row = mysql_fetch_assoc($result)) {
    $treatment_html = $treatment_html . "<div class='mr-content'><h4>" . $row['Name'] . "</h4><p>Total cost: $" . $row['Cost'] . "<p>Performed on " . $row['date'] . "</p></div>";
}

$result = mysql_query("select Symptom.Name, DATE_FORMAT(Timestamp, '%b %D, %Y at %l:%i %p') as date from MedicalRecord JOIN Symptom on MedicalRecord.SymptID = Symptom.SymptomID where PatientID='" . $patient_id ."'");
if (! $result) {
    die("Query failed!");
}

$symptom_html = "";
while ($row = mysql_fetch_assoc($result)) {
    $symptom_html = $symptom_html . "<div class='mr-content'><h4>" . $row['Name'] . "</h4><p>Diagnosed on " . $row['date'] . "</p></div>";
}

$result = mysql_query("select Name from User where UserID='" . $patient_id . "'");
if (! $result) {
    die("Query failed!");
}
$row = mysql_fetch_assoc($result);

$response = array();
$response[] = $symptom_html;
$response[] = $treatment_html;
$response[] = $prescription_html;
$response[] = $row['Name'];
$jsonData = json_encode($response);
echo $jsonData;
?>
