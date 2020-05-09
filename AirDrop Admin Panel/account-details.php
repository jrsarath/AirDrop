<?php
 require('application/classes/application.php');
 $app = new App();
 if ($res = mysqli_query($app->db, "SELECT * FROM users WHERE email='".$_GET["user"]."'")){
   $user = mysqli_fetch_assoc($res);
   $wallet = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT * FROM wallet WHERE user='".$_GET["user"]."'"));
 } else {
   error_log("MYSQLI ERROR: ".mysqli_error($app->db));
 }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Account Details <?php echo $user['name'] ?></title>
  <?php require('inc/templates/header.inc.php'); ?>
</head>

<body>
  <!-- Sidenav -->
  <?php require('inc/templates/sidenav.inc.php'); ?>
  <!-- Main content -->
  <div class="main-content">
    <!-- Header -->
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
            <?
              if (!empty($status)){
                if ($status == 'deleted'){
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Done!</strong> Account deleted. This can&apos;t be undone
                    </div>
                  ';
                }
              }
            ?>
        </div>
      </div>
    </div>
    <!-- Page content -->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">

          <div class="card shadow mb-5">
              <div class="card-header bg-transparent">
                <div class="row align-items-center">
                  <div class="col">
                    <h3>Account Details</h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h4 class='text-muted mb-3'>Personal Details</h4>
                  <h3><b class='text-muted mr-3'>Name :</b> <? echo $user["name"]?></h3>
                  <h3><b class='text-muted mr-3'>Gamertag :</b> <? echo $user["gamertag"]?></h3>
                  <h3><b class='text-muted mr-3'>Email :</b> <? echo $user["email"]?></h3>
                  <h3><b class='text-muted mr-3'>Phone :</b> <? echo $user["phone"]?></h3>
                  <h3><b class='text-muted mr-3'>Refer Code :</b> <? echo $user["refercode"]?></h3>
                  <h3><b class='text-muted mr-3'>Referred By :</b> <? echo $user["referrer"]?></h3>
                  <h3><b class='text-muted mr-3'>Joined :</b> <? echo date_format(date_create($user["signup"]),"d-M-Y")?></h3>
                <h4 class="text-muted my-3">Wallet</h4>
                  <h3><b class='text-muted mr-3'>Wallet Balance :</b> ₹<? echo $wallet["balance"]?></h3>
                  <h3><b class='text-muted mr-3'>Bonus Balance :</b> ₹<? echo $wallet["bonus"]?></h3>
              </div>
          </div>
          <div class="card shadow mb-5">
              <div class="card-header bg-transparent">
                <div class="row align-items-center">
                  <div class="col">
                    <h3>Referred Users</h3>
                  </div>
                </div>
              </div>
              <div class="card-body p-0">
                <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gamertag</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Joined At</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                    if ($rres = mysqli_query($app->db, "SELECT * FROM users WHERE referrer='".$user["refercode"]."'")) {
                      $i = 1;
                      while($rrow = mysqli_fetch_assoc($rres)){
                        echo '
                          <tr>
                            <td scope="row"><b>'.$i.'</b></th>
                            <td>'.$rrow["name"].'</td>
                            <td>'.$rrow["email"].'</td>
                            <td>'.$rrow["gamertag"].'</td>
                            <td>'.$rrow["phone"].'</td>
                            <td>'.date_format(date_create($row["log_date"]),"h:i d-M-Y").'</td>
                          </tr>
                        ';
                        $i++;
                      }
                    } else {
                      error_log("SQL Error: ".mysqli_error($app->db));
                    }
                  ?>
                </tbody>
              </table>
              </div>
          </div>
          <div class="card shadow mb-5">
              <div class="card-header bg-transparent">
                <div class="row align-items-center">
                  <div class="col">
                    <h3>Matches Played</h3>
                  </div>
                </div>
              </div>
              <div class="card-body p-0">
                <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Match ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Gamertag</th>
                    <th scope="col">Kill Count</th>
                    <th scope="col">Winner</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Time Joined</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                    if ($res = mysqli_query($app->db, "SELECT * FROM join_match WHERE user='".$_GET["user"]."'")) {
                      while($row = mysqli_fetch_assoc($res)){
                        $winner_stat = $row["winner"] == 'true' ? '<i class="fas fa-trophy text-success" style="font-size: 25px;"></i><span style="color:#fff">True</span>' : null ;
                        echo '
                          <tr>
                            <td scope="row"><b>'.$row["match_id"].'</b></th>
                            <td>'.$row["user"].'</td>
                            <td>'.$user["gamertag"].'</td>
                            <td>'.$row["kill_count"].'</td>
                            <td>'.$winner_stat.'</td>
                            <td>'.$user["phone"].'</td>
                            <td>'.date_format(date_create($row["log_date"]),"h:i d-M-Y").'</td>
                          </tr>
                        ';
                      }
                    } else {
                      error_log("SQL Error: ".mysqli_error($app->db));
                    }
                  ?>
                </tbody>
              </table>
              </div>
          </div>
          <div class="card shadow mb-5">
              <div class="card-header bg-transparent">
                <div class="row align-items-center">
                  <div class="col">
                    <h3>Transaction</h3>
                  </div>
                </div>
              </div>
              <div class="card-body p-0">
                <table class="table align-items-center table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">TRANSACTION ID</th>
                      <th scope="col">AMOUNT</th>
                      <th scope="col">USER</th>
                      <th scope="col">TYPE</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                      if ($tres = mysqli_query($app->db, "SELECT * FROM transactions WHERE user='".$_GET["user"]."'")) {
                        while ($mt = mysqli_fetch_assoc($tres)){
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
                      } else {
                        error_log("MYSQL ERROR: ".mysqli_error($app->db));
                      }
                    ?>
                  </tbody>
                </table>

              </div>
          </div>
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h3>KYC Documents for</h3>
                  <h5 class="text-uppercase text-muted ls-1 mb-1">Status : <?php echo $user['docverified'] ?></h5>
                </div>
                <div class="col">
                  <ul class="nav justify-content-end">
                    <a href="#" onclick="downloadImg('#front')" class="btn btn-primary py-2 px-3 mr-2" data-toggle="tab">
                      <span>Download Front Side</span>
                    </a>
                    <a href="#" onclick="downloadImg('#back')" class="btn btn-primary py-2 px-3" data-toggle="tab">
                      <span>Download Back Side</span>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <img src="<?php echo $user['docfront'] ?>" class='w-100 border rounded-lg' alt="" id='front'>
                </div>
                <div class="col-md-6">
                  <img src="<?php echo $user['docback'] ?>" class='w-100 border rounded-lg' alt="" id='back'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <?php require('inc/templates/footer.inc.php'); ?>
    </div>
  </div>
  <?php require('inc/templates/scripts.inc.php'); ?>
  <script src="/assets/js/downloader.js"></script>
  <script>
    function downloadImg(t){
      var img = $(t).attr('src');
      /*var url = img.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      window.open(url);
      console.log(url);*/
      download(img, Math.random().toString(36).substring(7)+".jpg", "image/jpg" );
    }
  </script>
</body>
</html>
