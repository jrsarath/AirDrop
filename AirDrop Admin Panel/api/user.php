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
            case "signup":
                $signup = $app->signup($data["email"],$data["name"],$data["password"],$data["gamertag"],$data['phone'],$data['referrer']);
                if ($signup == 'success'){
                    echo json_encode(array('status' =>  'success' ));
                } else {
                    echo json_encode(array('status' =>  $signup ));
                }
                break;
            case "login":
                $login = $app->login($data["email"],$data["password"]);
                if (is_array($login)){
                    $data = array('status' =>  'success' );
                    $data["data"][] = $login;
                    echo json_encode($data);
                } else {
                    echo json_encode(array('status' =>  $login ));
                }
                break;
            case "forgot":
                if ($app->reset_mail($data["email"])){
                    echo json_encode(array('status' =>  'success' ));
                } else {
                    echo json_encode(array('status' =>  'false' ));
                }
                break;
            case 'profile':
                echo json_encode($app->get_user($data["user"]));
                break;
            case 'get_stats':
                echo json_encode($app->get_user_stat($data["user"]));
                break;
            case "update_profile":
                $return = $app->update_user($data["user"],$data["name"],$data["gamertag"],$data["bank"],$data["paytm"],$data["googlepay"],$data["amazonpay"]);
                if ($return == true){
                    echo json_encode(array('status' =>  'success' ));
                } else {
                    echo $return;
                }
                break;
            case "update_password":
                $return = $app->update_password($data["user"],$data["password"]);
                if ($return == true){
                    echo json_encode(array('status' =>  'success' ));
                } else {
                    echo json_encode(array('status' =>  $return ));
                }
                break;
            case "resend_verification":
                $return = $app->send_verification($data["user"]);
                if ($return == true){
                    echo json_encode(array('status' =>  'success' ));
                } else {
                    echo json_encode(array('status' =>  $return ));
                }
                break;
            case 'verify_phone':
                $return = $app->phone_verification($data["user"]);
                if ($return == true){
                    echo json_encode(array('status' =>  'success' ));
                } else {
                    echo json_encode(array('status' =>  $return ));
                }
                break;
            case "kyc":
                if ($app->update_kyc($data['user'],$data['doctype'],$data['docfront'],$data['docback'])){
                  echo json_encode(array('status' =>  'success' ));
                } else {
                  echo json_encode(array('status' => 'false' ));
                }
                break;
            case "get_refers":
                echo json_encode($app->get_user_refers($data["user"]));
                break;
            default:
                header('HTTP/1.0 403 Forbidden');
        }
    } else {
        header('HTTP/1.0 403 Forbidden');
    }
?>
