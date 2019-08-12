<?php
  /**
   * APPLICATIONS CLASS
   * AIRDROP - A COMPLETE PUBGM TOURNAMENT MANAGEMENT SOLUTION
   * Copyright © 2019, JR Sarath - Noobs Labs
   * GNU GENERAL PUBLIC LICENSE Version 3
   */
  require __DIR__ .'/database.php';
  require $_SERVER["DOCUMENT_ROOT"].'/application/vendor/paytm/lib/config_paytm.php';
  require $_SERVER["DOCUMENT_ROOT"].'/application/vendor/paytm/lib/encdec_paytm.php';

  class App {
    public $db;
    public $dbHelper;
    public $version = "1.0";
    // PAYMENT GATEWAY CONFIGS
    public $PAY_ENV_TEST = true;
    public $PAY_KEY;
    public $PAY_SALT;

    function __construct(){
      $database = new DB();
      $this->db = $database->connect();
      $this->dbHelper = $database;
      if ($this->PAY_ENV_TEST == true){
        $this->PAY_KEY = 'rjQUPktU';
        $this->PAY_SALT = 'e5iIg1jwi8';
      } else {
        $this->PAY_KEY = 'MfaUR5to';
        $this->PAY_SALT = '9KfDBmH40i';
      }
    }

    /**
    * INTERNAL APPLICATION FUNCTIONS
    * AIRDROP - A COMPLETE PUBGM TOURNAMENT MANAGEMENT SOLUTION
    * Copyright © 2019, JR Sarath - Noobs Labs
    * GNU GENERAL PUBLIC LICENSE Version 3
    */
      function list_users($type){
        if ($row = mysqli_query($this->db, "SELECT * FROM users")){
          while ($user = mysqli_fetch_assoc($row)) {
              echo '
                  <tr>
                    <th scope="row">'.$user["id"].'</th>
                    <td>'.$user["gamertag"].'</td>
                    <td>'.$user["email"].'</td>
                    <td>'.$user["phone"].'</td>
                    <td>'.$user["name"].'</td>
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <!--a class="dropdown-item" href="#"><i class="fas fa-key"></i> Reset Password</a>
                          <a class="dropdown-item" href="#"><i class="fas fa-ban"></i> Disable Account</a-->
                          <a class="dropdown-item text-danger" href="#"><i class="far fa-trash-alt"></i> Delete Account</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ';
          }
        }
      }
      function list_matches($type){
        if ($row = mysqli_query($this->db, "SELECT * FROM matches")){
          while ($mt = mysqli_fetch_assoc($row)) {
                echo '
                  <tr>
                    <th scope="row">'.$mt["id"].'</th>
                    <td>'.$mt["map"].'</td>
                    <td>'.$mt["matchtype"].'</td>
                    <td>'.$mt["entryfee"].'</td>
                    <td>'.$mt["winprice"].'</td>
                    <td>'.$mt["perkill"].'</td>
                    <td>'.$mt["totalplayer"].'</td>
                    <td>'.$mt["totalplayerjoined"].'</td>
                    <td>'.$mt["matchstatus"].'</td>
                    <td>'.$mt["matchschedule"].'</td>
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a class="dropdown-item" href="edit-match.php?match='.$mt["id"].'"><i class="fas fa-pen"></i> Edit Match</a>
                          <!--a class="dropdown-item" href="#"><i class="fas fa-ban"></i> Disable Account</a-->
                          <a class="dropdown-item text-danger" href="?del='.$mt["id"].'"><i class="far fa-trash-alt"></i> Delete Match</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ';
            }
        }
      }
      function transactions(){
        if ($row = mysqli_query($this->db, "SELECT * FROM transactions")){
          while ($mt = mysqli_fetch_assoc($row)) {
                $date = explode(" ", $mt["date"])[0];
                $date = date_create($date);
                echo '
                  <tr>
                    <th scope="row">'.$mt["id"].'</th>
                    <td>₹ '.$mt["amount"].'</td>
                    <td>'.$mt["user"].'</td>
                    <td>'.$mt["type"].'</td>
                    <td>'.$mt["status"].'</td>
                    <td>'.date_format($date,"d M Y").'</td>
                  </tr>
                ';
            }
        }
      }
      function add_match(){
        if (mysqli_query($this->db, "INSERT INTO matches(map,type,livelink,matchtype,roomid,roompassword,banner,totalplayer,totalplayerjoined,entryfee,winprice,perkill,matchstatus,matchschedule,rule)
                                                VALUES('".$_POST['map']."','".$_POST['viewMode']."','".$_POST['livelink']."','".$_POST['matchtype']."','".$_POST['roomid']."','".$_POST['roompassword']."','".$_POST['banner']."','".$_POST['totalplayer']."','".$_POST['totalplayerjoined']."','".$_POST['entryfee']."','".$_POST['winprice']."','".$_POST['perkill']."','".$_POST['matchstatus']."','".$_POST['matchdate']." ".$_POST['matchtime']."','".$_POST['rule']."')")) {
          return 'success';
        } else {
          error_log('SQL Error: '.mysqli_error($this->db));
        }
      }

    /**
    * REST API CONTROLLER FUNCTIONS
    * AIRDROP - A COMPLETE PUBGM TOURNAMENT MANAGEMENT SOLUTION
    * Copyright © 2019, JR Sarath - Noobs Labs
    * GNU GENERAL PUBLIC LICENSE Version 3
    */

      // USER API
      function login($email, $password){
        $e = $this->dbHelper->sqlSafeValue($email);
        $p = $this->dbHelper->sqlSafeValue($password);
        if ($res = mysqli_query($this->db, "SELECT * FROM users WHERE email='$e' AND password='$p'")) {
          if (mysqli_num_rows($res) == 1) {
            $row = mysqli_fetch_assoc($res);
            return true;
          } else {
            return false;
          }
        } else {
          error_log('SQL Error :'.mysqli_error($this->db));
        }
      }
      function signup($email,$name,$password,$gamertag,$phone){
        $e = $this->dbHelper->sqlSafeValue($email);
        $n = $this->dbHelper->sqlSafeValue($name);
        $p = $this->dbHelper->sqlSafeValue($password);
        $g = $this->dbHelper->sqlSafeValue($gamertag);
        $ph = $this->dbHelper->sqlSafeValue($phone);
        $d = date('Y-m-d G:i:s');
        if (mysqli_query($this->db, "INSERT INTO users(email,name,password,gamertag,$phone) VALUES('$e','$n','$p','$g', '$ph')")){
          if (mysqli_query($this->db, "INSERT INTO wallet(user,balance, last_updated) VALUES('$e','0', '$d')")) {
            return true;
          } else {
            error_log('SQL Error :'.mysqli_error($this->db));
            return false;
          }
        } else {
          error_log('SQL Error :'.mysqli_error($this->db));
          return false;
        }
      }
      function get_user($email){
        if ($row = mysqli_query($this->db, "SELECT * FROM users WHERE email='$email'")) {
          $user = mysqli_fetch_assoc($row);
          return $user;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
      function update_user($email,$name,$gamertag,$bank,$paytm,$googlepay,$amazonpay){
        $b = serialize($bank);
        if (mysqli_query($this->db, "UPDATE users SET name='$name',gamertag='$gamertag',bank='$bank',paytm='$paytm',googlepay='$googlepay',amazonpay='$amazonpay' WHERE email='$email'")) {
          return true;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
      function update_password($email, $password){
        if (mysqli_query($this->db, "UPDATE users SET password='$password' WHERE email='$email'")) {
          return true;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }

      // WALLET API
      // PAYTM SPECIFIC
      function generatePaymentRequest($amount, $email){
        $user = $this->get_user($email);
        $uid_email = $email;
        $uid_number = $user["phone"];
        $uid = $user["id"];
        //get hash of order id and update it
        $order_hash = 'ORDER-' . crc32($uid) . time(); //Every order id should be unique
        $checkSum = "";
        $paramList = array();
        // Create an array having all required parameters for creating checksum.
        $paramList["MID"] = $this->PAYTM_MID;
        $paramList["CHANNEL_ID"] = 'WAP';
        $paramList["INDUSTRY_TYPE_ID"] = 'Retail';
        $paramList["WEBSITE"] = 'APPSTAGING';
        $paramList["TXN_AMOUNT"] = $amount;
        $paramList["ORDER_ID"] = $order_hash;
        $paramList["EMAIL"] = $uid_email; //Email ID of customer
        $paramList["MOBILE_NO"] = $uid_number; //Mobile number of customer
        $paramList["CUST_ID"] = $uid; //unique user id
        $paramList["CALLBACK_URL"] = "https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp";
        $checkSum = getChecksumFromArray($paramList,$this->PAYTM_MKEY);
        $paramList["CHECKSUM"] = $checkSum;
        // ADD TRANSACTION ENTRY
        if (mysqli_query($this->db, "INSERT INTO transactions(id, amount, user, number, status) VALUES('".$paramList['ORDER_ID']."', '".$paramList['TXN_AMOUNT']."', '".$paramList['EMAIL']."', '".$paramList['MOBILE_NO']."', 'PENDING')")) {
          null;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
        return $paramList; //this param list will be used in javascript to start paytm transaction
      }
      function verifyPaymentRequest($ORDERID, $user){
        //validate payment status with Paytm using order id
        $paramList = array();
        $paramList['MID'] = $this->PAYTM_MID;
        $paramList['ORDERID'] = $ORDERID;
        $checkSum = getChecksumFromArray($paramList,$this->PAYTM_MKEY);
        $paramList['CHECKSUMHASH'] = $checkSum;
        $url = $this->PAYTM_STATUS_QUERY_URL . '?JsonData=' .json_encode($paramList);
        $f = file_get_contents($url);
        $f = json_decode($f);
        $d = date('Y-m-d G:i:s');
        if ($f->RESPCODE = "01" && $f->TXNAMOUNT != ""){
          $res = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM transactions WHERE id='$ORDERID'"));
          if ($res['status'] != 'SUCCESS'){
            if (mysqli_query($this->db, "UPDATE transactions SET status='SUCCESS' WHERE id='$ORDERID'")) {
              $amount = +$f->TXNAMOUNT;
              if ($res = mysqli_query($this->db, "UPDATE wallet SET balance=balance+$amount, last_updated='$d' WHERE user='$user'")) {
                $row = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM wallet WHERE user='$user'"));
                return array('status' =>  'success', 'balance' =>  $row["balance"]);
              } else {
                error_log("MYSQL ERROR: ".mysqli_error($this->db));
              }
            } else {
              error_log("MYSQL ERROR: ".mysqli_error($this->db));
            }
          } else {
            $row = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM wallet WHERE user='$user'"));
            return array('status' =>  'duplicate', 'balance' =>  $row["balance"]);
          }
        } else {
          if (mysqli_query($this->db, "UPDATE transactions SET status='FAILED' WHERE id='$ORDERID'")) {
            return array('status' =>  'failed' );
          } else {
            error_log("MYSQL ERROR: ".mysqli_error($this->db));
          }
        }

      }
      // PAY U SPECIFIC
      function generatePayUHash($amnt, $email){
        $user = $this->get_user($email);
        $uid = $user["id"];
        $amount = $amnt.".0";
        $txid = 'ORDER-'.crc32($uid).time();
        $productId = "wallet";
        $name = $user["name"];
        $email = $email;
        $phone = $user["phone"];
        $udf1 = $data["udf1"];
        $udf2 = $data["udf2"];
        $udf3 = $data["udf3"];
        $udf4 = $data["udf4"];
        $udf5 = $data["udf5"];

        $payhash_str = $this->PAY_KEY . '|' . $this->checkNull($txid) . '|' . $this->checkNull($amount) . '|' . $this->checkNull($productId) . '|' . $this->checkNull($name) . '|' . $this->checkNull($email) . '|' . $this->checkNull($udf1) . '|' . $this->checkNull($udf2) . '|' . $this->checkNull($udf3) . '|' . $this->checkNull($udf4) . '|' . $this->checkNull($udf5) . '||||||'. $this->PAY_SALT;

        $hash = strtolower(hash('sha512', $payhash_str));
        $data = array(
                  'name' => $name,
                  'email' => $email,
                  'phone' => $phone,
                  'order_id' => $txid,
                  'amount' => $amount,
                  'cust_id' => $uid,
                  'productId' => $productId,
                  'success_url' => "https://manage.gamesetter.in/api/payment.php?action=payucallback&response=success",
                  'failed_url' => "https://manage.gamesetter.in/api/payment.php?action=payucallback&response=failed",
                  'hash' => $hash,
                  'raw' => $payhash_str
                );
        // ADD TRANSACTION ENTRY
        if (mysqli_query($this->db, "INSERT INTO transactions(id, amount, user, number, status, type) VALUES('$txid', '$amount', '$email', '$phone', 'PENDING', 'CREDIT')")) {
          null;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
        return $data;
      }
      function checkNull($value){
          if ($value == null) {
              return '';
          } else {
              return $value;
          }
      }
      function update_transaction($ORDERID, $STATUS, $AMOUNT, $user){
          $d = date('Y-m-d G:i:s');
          $res = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM transactions WHERE id='$ORDERID'"));
          if ($STATUS == 'SUCCESS'){
            if (mysqli_query($this->db, "UPDATE transactions SET status='SUCCESS' WHERE id='$ORDERID'")) {
              $amount = +$AMOUNT;
              if ($res = mysqli_query($this->db, "UPDATE wallet SET balance=balance+$amount, last_updated='$d' WHERE user='$user'")) {
                error_log('Wallet: Balance Update for - '.$user);
              } else {
                error_log("MYSQL ERROR: ".mysqli_error($this->db));
              }
            } else {
              error_log("MYSQL ERROR: ".mysqli_error($this->db));
            }
          } else {
            if (mysqli_query($this->db, "UPDATE transactions SET status='FAILED' WHERE id='$ORDERID'")) {
              error_log('Wallet: Transaction failed for - '.$user);
            } else {
              error_log("MYSQL ERROR: ".mysqli_error($this->db));
            }
          }
      }
      
      function get_wallet($user){
        if ($res = mysqli_query($this->db, "SELECT * FROM wallet WHERE user='$user'")){
          $row = mysqli_fetch_assoc($res);
          return array('balance' =>  $row["balance"]);
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }

      }
      function withdraw($amount, $user, $gateway){
        if ($res = mysqli_query($this->db, "SELECT * FROM wallet WHERE user='$user'")){
          $row = mysqli_fetch_assoc($res);
          if (+$row["balance"] >= +$amount) {
            $txn = "WITHD-".time();
            if (mysqli_query($this->db, "INSERT INTO withdraw(user,amount,gateway,txnid) VALUES('$user', '$amount', '$gateway','$txn')")){
              $amnt = +$amount;
              mysqli_query($this->db, "UPDATE wallet SET balance=balance-$amnt WHERE user='$user'");
              return array('status' =>  'success', 'txnid' => $txn);
            } else {
              error_log("MYSQL ERROR: ".mysqli_error($this->db));
              return array('status' =>  'failed');
            }
          } else {
            return array('status' =>  'not-enough');
          }
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
      // MATCHES API
      function get_upcoming_matches(){
        if ($row = mysqli_query($this->db, "SELECT * FROM matches WHERE matchstatus='Upcoming'")) {
          $array = array();
          while ($res = mysqli_fetch_assoc($row)){
            $array[] = $res;
          }
          return $array;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
      function get_ongoing_matches($id){
        if ($res = mysqli_query($this->db, "SELECT * FROM join_match WHERE user='$id'")){
          $array = array();
          while ($row = mysqli_fetch_assoc($res)){
            $match_id = $row["match_id"];
            if ($row_match = mysqli_query($this->db, "SELECT * FROM matches WHERE matchstatus='Ongoing' AND id='$match_id'")) {
              while ($res_match = mysqli_fetch_assoc($row_match)){
                $array[] = $res_match;
              }
            } else {
              error_log("MYSQL ERROR: ".mysqli_error($this->db));
            }
          }
          return $array;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
      function join_match($id, $user, $amnt){
        if($res = mysqli_query($this->db, "SELECT * FROM join_match WHERE user='$user' AND match_id='$id'")){
          if (mysqli_num_rows($res) == 0) {
            if (mysqli_query($this->db, "INSERT INTO join_match(match_id,user) VALUES('$id','$user')")) {
              mysqli_query($this->db, "UPDATE matches SET totalplayerjoined=totalplayerjoined+1 WHERE id='$id'");
              $amount = +$amnt;
              $order_id = 'MATCH-'.time();
              mysqli_query($this->db, "UPDATE wallet SET balance=balance-$amount WHERE user='$user'");
              mysqli_query($this->db, "INSERT INTO transactions(id,amount,user,number,type,status) VALUES('$order_id', '$amount', '$user','null','MATCH-MONEY','SUCCESS')");
              return array("status" => 'success');
            } else {
              error_log("MYSQL ERROR: ".mysqli_error($this->db)); 
            }
          } else {
            return array("status" => 'duplicate');
          }
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
      function join_status($id, $user){
        if($res = mysqli_query($this->db, "SELECT * FROM join_match WHERE user='$user' AND match_id='$id'")){
          if (mysqli_num_rows($res) > 0) {
            return array("status" => 'joined');
          } else {
            return array("status" => 'not-joined');
          }
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
  }

?>
