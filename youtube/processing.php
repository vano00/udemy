<?php
require_once("includes/header.php");
require_once("includes/classes/VideoUploadData.php");
require_once("includes/classes/VideoProcessor.php");

if(!isset($_POST["uploadButton"])) {
	echo "No file sent to page";
	exit();
}

// 1) Create file upload data
$videoUploadData = new VideoUploadData(
							$_FILES["fileInput"],
							$_POST["titleInput"],
							$_POST["descInput"],
							$_POST["categoriesInput"],
							$_POST["privacyInput"],
							"REPLACE-THIS"
						);

// 2) Process video data (upload)
$videoProcessor = new VideoProcessor($con);
$wasSuccessful = $videoProcessor->upload($videoUploadData);

// 3) Check if upload was successful
if($wasSuccessful) {
	echo "Upload successfull";
}

?>
