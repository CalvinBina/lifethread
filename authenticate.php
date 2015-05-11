<?php

session_start();

if (isset($_SESSION['username'])) {
    echo $_SESSION['user_type'];
}
else {
    echo "0";
}

?>