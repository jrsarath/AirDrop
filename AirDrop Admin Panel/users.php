<?php
 require('application/classes/application.php');
 $app = new App();
 if (isset($_GET['delete'])){
   if (mysqli_query($app->db, "DELETE FROM users WHERE id='".$_GET['delete']."'")){
      $status = 'deleted';
   } else {
     error_log("MYSQLI ERROR: ".mysqli_error($app->db));
   }
 }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Users</title>
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
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">All Users</h3>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <!-- Projects table -->
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">PUBGM ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <?php $app->list_users(null); ?>
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
