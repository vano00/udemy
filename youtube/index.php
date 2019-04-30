<?php require_once("includes/header.php"); ?>

<?php
if(isset($_SESSION["userLoggedIn"])) {
	echo "Welcome " . $userLoggedInObj->getName();
} else {
	echo "You are not logged in";
}
?>

<?php require_once("includes/footer.php"); ?>
