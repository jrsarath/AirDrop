<?php
 require('application/classes/application.php');
 $app = new App();

 // MARK WITHDRAW APPROVED
 if (isset($_GET['approve'])) {
    if(mysqli_query($app->db, "UPDATE withdraw SET status='SUCCESS' WHERE id='".$_GET['approve']."'")) {
      $status = 'approved';
    } else {
      error_log("MYSQLI ERROR: ".mysqli_error($app->db));
    }
  }
  // DECLINE WITHDRAW AND REFUND
  if (isset($_GET['decline'])) {
    if(mysqli_query($app->db, "UPDATE withdraw SET status='FAILED' WHERE id='".$_GET['decline']."'")) {
      // SEND REFUND
      
      $status = 'declined';
    } else {
      error_log("MYSQLI ERROR: ".mysqli_error($app->db));
    }
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Transactions</title>
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
              if ($status == 'approved'){
                echo '
                  <div class="alert alert-success" role="alert">
                    <strong>Approved!</strong> Withdraw marked as Approved
                  </div>
                ';
              }
              if ($status == 'declined'){
                echo '
                  <div class="alert alert-danger" role="alert">
                    <strong>Refunded!</strong> Withdraw marked as Declined, Refund sent to wallet.
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
                  <h3 class="mb-0">Withdraw Requests</h3>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <!-- Projects table -->
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">TRANSACTION ID</th>
                    <th scope="col">AMOUNT</th>
                    <th scope="col">USER</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">WITHDRAW METHOD</th>
                    <th scope="col">WITHDRAW DETAILS</th>
                    <th scope="col">DATE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <?php $app->withdraw_requests(); ?>
                </tbody>
              </table>
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
