<!DOCTYPE html>
<html>
<head>
	<title>Youtube</title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="assets/css/style.css" />

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script src="assets/js/commonActions.js"></script>

</head>
<body>

	<div id="pageContainer">

		<div id="mastHeadContainer">
			<button class="navShowHide">
				<img src="assets/images/icons/menu.png" alt="menu icon" title="Menu Icon"/>
			</button>

			<a class="logoContainer" href="index.php">
				<img src="assets/images/icons/VideoTubeLogo.png" alt="Site Logo" title="Site Logo"/>
			</a>

			<div class="searchBarContainer">
				<form action="search.php" method="GET">
					<input type="text" class="searchBar" name="term" placeholder="Search..." />
					<button class="searchButton">
						<img src="assets/images/icons/search.png" alt="Search icon" title="Search Icon"/>
					</button>
				</form>
			</div>

			<div class="rightIcons">
				<a href="upload.php">
					<img class="upload" src="assets/images/icons/upload.png" alt="Upload Logo" title="Upload video"/>
				</a>
				<a href="#">
					<img class="profile" src="assets/images/profilePictures/default.png" alt="Profile Picture" title="Profile Picture"/>
				</a>
			</div>

		</div>

		<div id="sideNavContainer" style="display:none;">

		</div>

		<div id="mainSectionContainer">

			<div id="mainContentContainer">
