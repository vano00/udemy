<?php
	class VideoDetailsFormProvider {

		private $con;

		public function __construct($con) {
			$this->con = $con;
		}

		public function createUploadForm() {
			$fileInput = $this->createFileInput();
			$titleInput = $this->createTitleInput();
			$descInput = $this->createDescInput();
			$categoriesInput = $this->createCategoriesInput();
			$privacyInput = $this->createPrivacyInput();
			$uploadButton = $this->createUploadButton();
			return "<form action='processing.php' method='POST' enctype='multipart/form-data'>
						$fileInput
						$titleInput
						$descInput
						$categoriesInput
						$privacyInput
						$uploadButton
					</form>";
		}

		private function createFileInput() {
			return "<div class='form-group'>
						<input type='file' class='form-control-file' name='fileInput' required>
					</div>";
		}

		private function createTitleInput() {
			return "<div class='form-group'>
						<input class='form-control' type='text' placeholder='Title' name='titleInput'>
					</div>";
		}

		private function createDescInput() {
			return "<div class='form-group'>
						<textarea class='form-control' type='text' rows='3' placeholder='Description' name='descInput'></textarea>
					</div>";
		}

		private function createCategoriesInput() {
			$query = $this->con->prepare("SELECT * FROM categories");
			$query->execute();

			$html = "<div class='form-group'>
						<select class='form-control' name='categoriesInput'>";

			while($row = $query->fetch(PDO::FETCH_ASSOC)) {
				$name = $row['name'];
				$id = $row['id'];
				$html .= "<option value='$id'>$name</option>";
			}

			$html .= "</select>
					</div>";

			return $html;
		}

		private function createPrivacyInput() {
			return "<div class='form-group'>
						<select class='form-control' name='privacyInput'>
							<option value='0'>Private</option>
							<option value='1'>Public</option>
						</select>
					</div>";
		}

		private function createUploadButton() {
			return "<button class='btn btn-primary' type='submit' name='uploadButton'>Upload</button>";
		}
	}
?>
