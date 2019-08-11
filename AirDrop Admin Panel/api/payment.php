<?php
    header('Content-Type: application/json');
    require $_SERVER["DOCUMENT_ROOT"].'/application/classes/application.php';
    $app = new App();

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        switch ($data["action"]) {
            case "add":
                break;
            case "widthdraw";
                break;
            case 'paymentRequest':
                $response = $app->generatePayUHash($data["amount"],$data["user"]);
                echo json_encode($response);
                break;
            case 'verifyPayment':
                $response = $app->verifyPaymentRequest($data['order_id'], $data['user']);
                echo json_encode($response);
                break;
            case 'getWallet':
                echo json_encode($app->get_wallet($data['user']));
            default;
                header('HTTP/1.0 403 Forbidden');
                break;
        }
    } else {
        header('HTTP/1.0 403 Forbidden');
    }