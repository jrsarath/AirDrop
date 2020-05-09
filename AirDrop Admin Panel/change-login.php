<?php
 require('application/classes/application.php');
 $app = new App();
 if (isset($_POST['submit'])){
   if ($_POST["password"] == $_POST["cnfPassword"]) {
     $file = 'admins.php';
     $handle = fopen($file, 'w') or die('Cannot open file');
     $data = '<?php
                $userinfo = array("gamesetter2019@gmail.com"=>"'.strtoupper(md5($_POST["password"])).'");
             ';
     if(fwrite($handle, $data)){
      $status = 'success';
    } else {
      $status == false;
    }
   } else {
     $status = 'not-match';
   }
 }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Change Password</title>
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
                if ($status == 'success'){
                  echo '
                    <div class="alert alert-success" role="alert">
                      <strong>Done!</strong> Password Updated successfully
                    </div>
                  ';
                } elseif ($status == 'not-match'){
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Failed!</strong> Password &apos; Confirm Password doesn&apos;t match
                    </div>
                  ';
                } else {
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Failed!</strong> Password couldn&apos;t be updated at this moment
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
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3>Change Login Password</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form action="" method='post'>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>New Password*</label>
                        <input type="password" name="password" class="form-control" placeholder="New strong password" required>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Confirm Password*</label>
                        <input type="password" name="cnfPassword" class="form-control" placeholder="Confirm password" required>
                    </div>
                </div>
                <div class="col-12 mb-5 mt-3">
                    <input type="submit" class="btn btn-success btn-block" name="submit">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <?php require('inc/templates/footer.inc.php'); ?>
    </div>
  </div>
  <?php require('inc/templates/scripts.inc.php'); ?>
</body>
</html>
