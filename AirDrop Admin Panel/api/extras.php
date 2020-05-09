<?php
    /**
    * USERS API ENDPOINT V1.0
    * AIRDROP - A COMPLETE PUBGM TOURNAMENT MANAGEMENT SOLUTION
    * Copyright © 2019, JR Sarath - Noobs Labs
    * GNU GENERAL PUBLIC LICENSE Version 3
    */
    header('Content-Type: application/json');
    require $_SERVER["DOCUMENT_ROOT"].'/application/classes/application.php';
    $app = new App();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        switch ($data["action"]) {
            case "contactMail":
                if ($app->contact_email($data["email"],$data["subject"],$data["body"])){
                    echo json_encode(array('status' =>  'success' ));
                } else {
                    echo json_encode(array('status' =>  'false' ));
                }
                break;
            case "version":
                echo json_encode(array('version' => $app->versionCode, 'maintenance' => $app->maintenance ));
            default:
                header('HTTP/1.0 403 Forbidden');
        }
    } else {
        header('HTTP/1.0 403 Forbidden');
    }
?>
