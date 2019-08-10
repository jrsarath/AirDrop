<?php
  /**
   * FULL APPLICATION CONTROLLER
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
    public $PAY_ENV_TEST = true;
    public $PAY_MID;
    public $PAY_MKEY;

    function __construct(){
      $database = new DB();
      $this->db = $database->connect();
      $this->dbHelper = $database;
      // PAYMENT GATEWAY CONFIGS
      $this->PAY_ENV_TEST == true ? $this->PAY_MID = 'MfaUR5to': $this->PAY_MID = 'MfaUR5to'; // PAYU
      $this->PAY_ENV_TEST == true ? $this->PAY_MKEY = '9KfDBmH40i': $this->PAY_MKEY = '9KfDBmH40i'; // PAYU
    }
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
                        <a class="dropdown-item" href="#"><i class="fas fa-key"></i> Reset Password</a>
                        <!--a class="dropdown-item" href="#"><i class="fas fa-ban"></i> Disable Account</a-->
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
    function add_match(){
      if (mysqli_query($this->db, "INSERT INTO matches(map,type,livelink,matchtype,roomid,roompassword,banner,totalplayer,totalplayerjoined,entryfee,winprice,perkill,matchstatus,matchschedule)
                                               VALUES('".$_POST['map']."','".$_POST['viewMode']."','".$_POST['livelink']."','".$_POST['matchtype']."','".$_POST['roomid']."','".$_POST['roompassword']."','".$_POST['banner']."','".$_POST['totalplayer']."','".$_POST['totalplayerjoined']."','".$_POST['entryfee']."','".$_POST['winprice']."','".$_POST['perkill']."','".$_POST['matchstatus']."','".$_POST['matchdate']." ".$_POST['matchtime']."')")) {
        return 'success';
      } else {
        error_log('SQL Error: '.mysqli_error($this->db));
      }
    }

    // API FUNCTIONS
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
    function signup($email,$name,$password,$gamertag){
      $e = $this->dbHelper->sqlSafeValue($email);
      $n = $this->dbHelper->sqlSafeValue($name);
      $p = $this->dbHelper->sqlSafeValue($password);
      $g = $this->dbHelper->sqlSafeValue($gamertag);
      $d = date('Y-m-d G:i:s');
      if (mysqli_query($this->db, "INSERT INTO users(email,name,password,gamertag) VALUES('$e','$n','$p','$g')")){
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
      if ($row = mysqli_query($this->db, "SELECT * FROM matches WHERE matchstatus='Ongoing'")) {
        $array = array();
        while ($res = mysqli_fetch_assoc($row)){
          $array[] = $res;
        }
        return $array;
      } else {
        error_log("MYSQL ERROR: ".mysqli_error($this->db));
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
    function update_user($email,$name,$gamertag,$phone,$bank,$googlepay,$amazonpay){
      $b = serialize($bank);
      if (mysqli_query($this->db, "UPDATE users SET name='$name',gamertag='$gamertag',phone='$phone',bank='$bank',googlepay='$googlepay',amazonpay='$amazonpay' WHERE email='$email'")) {
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
    // PAYMENT STUFF
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
    function get_wallet($user){
      if ($res = mysqli_query($this->db, "SELECT * FROM wallet WHERE user='$user'")){
        $row = mysqli_fetch_assoc($res);
        return array('balance' =>  $row["balance"]);
      }

    }
  }

?>
