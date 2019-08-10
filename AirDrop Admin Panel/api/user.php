<?php
    header('Content-Type: application/json');
    require $_SERVER["DOCUMENT_ROOT"].'/application/classes/application.php';
    $app = new App();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        switch ($data["action"]) {
            case "signup":
                if ($app->signup($data["email"],$data["name"],$data["password"],$data["gamertag"]) == true){
                    echo json_encode(array('status' =>  'success' ));
                } else {
                    echo json_encode(array('status' =>  'false' ));
                }
                break;
            case "login":
                $login = $app->login($data["email"],$data["password"]) == true;
                if ($login == true){
                    echo json_encode(array('status' =>  'success' ));
                } elseif ($login == false) {
                    echo json_encode(array('status' =>  'false' ));
                } else {
                    echo json_encode(array('status' =>  $login ));
                }
                break;
            case "forgot":
                
                break;
            case 'profile':
                echo json_encode($app->get_user($data["user"]));
                break;
            case "update_profile":
                $return = $app->update_user($data["user"],$data["name"],$data["gamertag"],$data["phone"],$data["bank"],$data["googlepay"],$data["amazonpay"]);           
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
            default:
                header('HTTP/1.0 403 Forbidden');
        }
    } else {
        header('HTTP/1.0 403 Forbidden');
    }
?>
                