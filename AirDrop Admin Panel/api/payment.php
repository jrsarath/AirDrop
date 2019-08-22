<?php
    /**
    * PAYMENTS API ENDPOINT V1.0
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
            case "add":
                break;
            case "withdraw";
                $response = $app->withdraw($data["amount"],$data["user"], $data["gateway"]);
                echo json_encode($response);
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
                break;
            case 'transactions':
                echo json_encode($app->get_user_transactions($data['user']));
                break;
            default;
                header('HTTP/1.0 403 Forbidden');
                break;
        }
        if (isset($_GET["action"]) && $_GET["action"] == 'payucallback'){
            // PAYU POST DATA
            $postdata           =   $_POST;
            $key				=   $app->PAY_KEY;
            $salt				=   $app->PAY_SALT;
            $txnid 				= 	$postdata['txnid'];
            $amount      		= 	$postdata['amount'];
            $productInfo  		= 	$postdata['productinfo'];
            $firstname    		= 	$postdata['firstname'];
            $email        		=	$postdata['email'];
            $udf5				=   $postdata['udf5'];
            $mihpayid			=	$postdata['mihpayid'];
            $status				= 	$postdata['status'];
            $resphash			= 	$postdata['hash'];
            //Calculate response hash to verify	
            $keyString 	  		=  	$key.'|'.$txnid.'|'.$amount.'|'.$productInfo.'|'.$firstname.'|'.$email.'|||||'.$udf5.'|||||';
            $keyArray 	  		= 	explode("|",$keyString);
            $reverseKeyArray 	= 	array_reverse($keyArray);
            $reverseKeyString	=	implode("|",$reverseKeyArray);
            $CalcHashString 	= 	strtolower(hash('sha512', $salt.'|'.$status.'|'.$reverseKeyString));
            
            switch ($_GET["response"]) {
                case 'success':
                    // UPDATE DB
                    if ($status == 'success'  && $resphash == $CalcHashString) {
                        echo "Transaction Successful, Please Wait..";
                        // UPDATE TRANSACTION AS SUCCESS
                        $app->update_transaction($txnid, 'SUCCESS', $amount, $email);
                    } else {
                        echo "Transaction Failed, Please Wait..";
                        // UPDATE TRANSACTION AS FAILED
                        $app->update_transaction($txnid, 'FAILED', $amount, $email);
                    } 
                    break;
                case 'failed':
                    echo "Transaction Failed, Please Wait..";
                    // UPDATE DB
                    $app->update_transaction($txnid, 'FAILED', $amount, $email);
                    break;
                default:
                    # code...
                    break;
            }
        }
    } else {
        header('HTTP/1.0 403 Forbidden');
    }