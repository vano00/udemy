<?php
class VideoProcessor {

	private $con;
	private $sizeLimit = 500000000;
	private $allowedTypes = array("mp4", "flv", "webm", "vob", "ogv", "ogg", "avi", "wmv", "mov", "mpeg", "mpg");
	private $ffmpegPath = "ffmpeg/bin/ffmpeg";
	private $ffprobePath = "ffmpeg/bin/ffprobe";

	public function __construct($con) {
		$this->con = $con;
	}

	public function upload($videoUploadData) {
		$targetDir = "uploads/videos/";
		$videoData = $videoUploadData->getVideoDataArray();

		$tempFilePath = $targetDir . uniqid() . basename($videoData["name"]);

		$tempFilePath = str_replace(" ", "_", $tempFilePath);

		$isValidData = $this->processData($videoData, $tempFilePath);

		if(!$isValidData) {
			return false;
		}

		if(move_uploaded_file($videoData["tmp_name"], $tempFilePath)) {
			$finalFilePath = $targetDir . uniqid() . ".mp4";

			if(!$this->insertVideoData($videoUploadData, $finalFilePath)) {
				echo "Insert query failed";
				return false;
			}

			if(!$this->convertVideoToMp4($tempFilePath, $finalFilePath)) {
				echo "Upload failed";
				return false;
			}

			if(!$this->deleteFile($tempFilePath)) {
				echo "Upload failed";
				return false;
			}

			if(!$this->generateThumbnails($finalFilePath)) {
				echo "Upload failed, could not generate thumbnails!";
				return false;
			}
		}
	}

	private function processData($videoData, $filePath) {
		$videoType = pathinfo($filePath, PATHINFO_EXTENSION);

		if(!$this->isValidSize($videoData)) {
			echo "File too large. Can't be more than " . $this->sizeLimit / 1000000 . " Mb";
			return false;
		}
		else if(!$this->isValidType($videoType)) {
			echo "Invalid file type! Accepted file types: " . implode(", ", $this->allowedTypes);
			return false;
		}
		else if($this->hasError($videoData)) {
			echo "Error code: " . $videoData["error"];
			return false;
		}

		return true;
	}

	private function isValidSize($data) {
		return $data["size"] <= $this->sizeLimit;
	}

	private function isValidType($type) {
		$lowercased = strtolower($type);
		return in_array($lowercased, $this->allowedTypes);
	}

	private function hasError($data) {
		return $data["error"] != 0;
	}

	private function insertVideoData($uploadData, $filePath) {
		$title = $uploadData->getTitle();
		$uploadedBy = $uploadData->getUploadedBy();
		$description = $uploadData->getDescription();
		$privacy = $uploadData->getPrivacy();
		$category = $uploadData->getCategory();

		$query = $this->con->prepare("INSERT INTO videos(title, uploadedBy, description, privacy, category, filePath)
										VALUES(:title, :uploadedBy, :description, :privacy, :category, :filepath)");
		$query->bindParam(":title", $title);
		$query->bindParam(":uploadedBy", $uploadedBy);
		$query->bindParam(":description", $description);
		$query->bindParam(":privacy", $privacy);
		$query->bindParam(":category", $category);
		$query->bindParam(":filepath", $filePath);

		return $query->execute();
	}

	public function convertVideoToMp4($tempFilePath, $finalFilePath) {
		$cmd = "$this->ffmpegPath -i $tempFilePath $finalFilePath 2>&1";

		$outputLog = array();
		exec($cmd, $outputLog, $returnCode);

		if($returnCode != 0) {
			//command failed
			foreach ($outputLog as $line) {
				echo $line . "<br>";
			}
			return false;
		}
		return true;
	}

	private function deleteFile($filePath) {
		if(!unlink($filePath)) {
			echo "Could not delete file\n";
			return false;
		}
		return true;
	}

	public function generateThumbnails($filePath) {
		$thumbnailSize = "210x118";
		$numThumnails = 3;
		$pathToThumbnail = "uploads/videos/thumbnails";

		$duration = $this->getVideoDuration($filePath);

		$videoId = $this->con->lastInsertId();

		$this->updateDuration($duration, $videoId);
	}

	public function getVideoDuration($filePath) {
		return shell_exec("$this->ffprobePath -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $filePath");
	}

	private function updateDuration($duration, $videoId) {
		$duration = (int)$duration;
		$hours = floor($duration / 3600);
		$minutes = floor(($duration - ($hours*3600)) / 60);
		$seconds = floor($duration % 60);

		$hours = ($hours < 1) ? "" : $hours . ":";
		$minutes = ($minutes < 10) ? "0" . $minutes .":" : $minutes . ":";
		$seconds = ($seconds < 10) ? "0" . $seconds : $seconds;

		$duration = $hours.$minutes.$seconds;

		$query = $this->con->prepare("UPDATE videos SET duration=:duration WHERE id=:videoId");
		$query->bindParam(":duration", $duration);
		$query->bindParam(":videoId", $videoId);

		return $query->execute();
	}
}

?>
