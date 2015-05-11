<?php

session_start();

if ($_POST['attribute'] == "name") {
    echo $_SESSION['name'];
}

?>