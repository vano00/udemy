<?php
ob_start(); // Turns on output buffering
session_start();

date_default_timezone_set("Europe/Zurich");

try {
	$con = new PDO("mysql:dbname=xxxx;host=xxxx", "xxxx", "xxxx");
	$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
}
catch (PDOException $e) {
	echo "Connection failed: ". $e->getMessage();
}

?>
