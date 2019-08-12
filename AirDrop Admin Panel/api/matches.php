<?php
    header('Content-Type: application/json');
    require $_SERVER["DOCUMENT_ROOT"].'/application/classes/application.php';
    $app = new App();
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        switch ($data["action"]) {
            case "get_upcoming":
                echo json_encode($app->get_upcoming_matches());
                break;
            case "get_ongoing":
                echo json_encode($app->get_ongoing_matches($data["user"]));
                break;
            case "join_match":
                echo json_encode($app->join_match($data['match_id'], $data['user']));
                break;
            case "join_status":
                echo json_encode($app->join_status($data['match_id'], $data['user']));
                break;
            default:
                header('HTTP/1.0 403 Forbidden');
        }
    } else {
        header('HTTP/1.0 403 Forbidden');
    }
?>
