<?php
session_start();
// Allowed origins to upload images
$accepted_origins = array("http://manage.gamesetter.in", "https://manage.gamesetter.in");

reset($_FILES);
$temp = current($_FILES);

    function compress($source, $destination, $quality) {
		$info = getimagesize($source);
		if ($info['mime'] == 'image/jpeg') 
			$image = imagecreatefromjpeg($source);
		elseif ($info['mime'] == 'image/gif') 
			$image = imagecreatefromgif($source);
		elseif ($info['mime'] == 'image/png') 
            $image = imagecreatefrompng($source);
            
		imagejpeg($image, $destination, $quality);

		return $destination;
    }
    
if(is_uploaded_file($temp['tmp_name'])){
    if(isset($_SERVER['HTTP_ORIGIN'])){
        // VERIFY ORIGIN IF SET
        if(in_array($_SERVER['HTTP_ORIGIN'], $accepted_origins)){
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        }else{
            header("HTTP/1.1 403 Origin Denied");
            return;
        }
    }

    // SANITIZE FILE NAME
    if(preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $temp['name'])){
        header("HTTP/1.1 400 Invalid file name.");
        return;
    }

    // VERIFY EXTENSION
    if(!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "png"))){
        header("HTTP/1.1 400 Invalid extension.");
        return;
    }

    $file_tmp= $temp['tmp_name'];
    $destination_img = __DIR__.'temp.jpg';
    $compressed_image = compress($file_tmp, $destination_img, 90);

    $type = pathinfo($temp['name'], PATHINFO_EXTENSION);
    $data = file_get_contents($file_tmp);
    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    //$base64 = base64_decode($data);
    echo $base64;

  } else {
      // RETURN 500
      header("HTTP/1.1 500 Server Error");
  }
?>