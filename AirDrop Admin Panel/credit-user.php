<?php
 require('application/classes/application.php');
 $app = new App();
 if (isset($_POST['submit'])){
   $u = $app->dbHelper->sqlSafeValue($_POST['user']);
   $m = +$app->dbHelper->sqlSafeValue($_POST['amount']);
   $txn = 'MPRIZE-'.time();
   if (mysqli_query($app->db, "UPDATE wallet SET balance=balance+$m WHERE user='$u'")) {
     mysqli_query($app->db, "INSERT INTO transactions(id, amount, user, number, status, type) VALUES('$txn', '$m', '$u', 'null', 'SUCCESS', 'CREDIT')");
     $status = 'success';
   } else {
     $status = 'failed';
     error_log(mysqli_error($app->db));
   }
 }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Credit User</title>
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
                      <strong>Done!</strong> User Credited
                    </div>
                  ';
                } else {
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Failed!</strong> Cannot credit selected user
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
                  <h3>Credit User</h3>
                  <h5 class="text-uppercase text-muted ls-1 mb-1">Distribute Match rewards/prize</h5>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form action="" method='post'>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Select User</label>
                        <select type="text" name="user" class="form-control" required>
                          <?php
                            $res = mysqli_query($app->db, "SELECT * FROM users");
                            while ($row = mysqli_fetch_assoc($res)){
                              echo '<option name="'.$row["email"].'">'.$row["email"].'</option>';
                            }
                          ?>
                        </select>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Credit Amount*</label>
                        <input type="number" name="amount" class="form-control" placeholder="Credit Amount" required>
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
