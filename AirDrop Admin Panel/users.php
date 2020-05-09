<?php
 require('application/classes/application.php');
 $app = new App();
 if (isset($_GET['delete'])){
   $res = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT * FROM users WHERE id='".$_GET['delete']."'"));
   if (mysqli_query($app->db, "DELETE FROM users WHERE id='".$_GET['delete']."'") && mysqli_query($app->db, "DELETE FROM wallet WHERE user='".$res['email']."'")){
      $status = 'deleted';
   } else {
     error_log("MYSQLI ERROR: ".mysqli_error($app->db));
   }
 }
 if (isset($_GET['edit-wallet'])){
   $dres = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT * FROM wallet WHERE user='".$_GET["edit-wallet"]."'"));
   if (isset($_POST["update-wallet"])) {
     if (mysqli_query($app->db, "UPDATE wallet SET balance='".$_POST['balance']."' WHERE user='".$_GET["edit-wallet"]."'")){
       $statusW = 'success';
     } else {
       $statusW = 'failed';
     }
   }
 }
 if (isset($_GET['edit-user'])){
   $dres = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT * FROM users WHERE email='".$_GET["edit-user"]."'"));
   if(isset($_POST['update-user'])){
     if (mysqli_query($app->db, "UPDATE users SET email='".$_POST['email']."',phone='".$_POST['phone']."',name='".$_POST['name']."',gamertag='".$_POST['gamertag']."' WHERE email='".$_GET["edit-user"]."'")){
       $statusU = 'success';
     } else {
       $statusU = 'failed';
     }
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

              if (!empty($statusW)){
                if ($statusW == 'success'){
                  echo '
                    <div class="alert alert-success" role="alert">
                      <strong>Done!</strong> Updated Wallet balance for user - '.$_GET['edit-wallet'].'
                    </div>
                  ';
                }
                if ($statusW == 'failed'){
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Failed!</strong> Failed to update Wallet balance for user - '.$_GET['edit-wallet'].'
                    </div>
                  ';
                }
              }

              if (!empty($statusU)){
                if ($statusU == 'success'){
                  echo '
                    <div class="alert alert-success" role="alert">
                      <strong>Done!</strong> Updated user details for - '.$_GET['edit-user'].'
                    </div>
                  ';
                }
                if ($statusU == 'failed'){
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Failed!</strong> Failed to update user details for - '.$_GET['edit-user'].'
                    </div>
                  ';
                }
              }
            ?>
            <?php if (isset($_GET['edit-wallet'])): ?>
              <div class="card">
              <div class="card-header">
                <h3 class="mb-0">Update Wallet - <?php echo $_GET["edit-wallet"] ?></h3>
              </div>
              <div class="card-body">
                <form method='post'>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>User Email</label>
                        <input type="text" name="user" class="form-control" placeholder="User Email" disabled value='<? echo $_GET['edit-wallet'] ?>'>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Wallet Balance*</label>
                        <input type="text" name="balance" class="form-control" value='<? echo $dres['balance']?>' required>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <input type="submit" name="update-wallet" class="btn btn-success">
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <?php endif; ?>
            <?php if (isset($_GET['edit-user'])): ?>
              <div class="card">
              <div class="card-header">
                <h3 class="mb-0">Update User - <?php echo $_GET["edit-user"] ?></h3>
              </div>
              <div class="card-body">
                <form method='post'>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Name*</label>
                        <input type="text" name="name" class="form-control" value='<? echo $dres['name']?>' required>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Gamertag*</label>
                        <input type="text" name="gamertag" class="form-control" value='<? echo $dres['gamertag']?>' required>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Email</label>
                        <input type="text" name="email" class="form-control" placeholder="Email" value='<? echo $dres['email'] ?>'>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" class="form-control" placeholder="Phone" value='<? echo $dres['phone'] ?>'>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <input type="submit" name="update-user" class="btn btn-success">
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <?php endif; ?>
        </div>
      </div>
    </div>
    <!-- Page content -->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">All Users</h3>
                </div>
                <div class="col">
                  <ul class="nav justify-content-end">
                    <a href="#" onclick="createPDF('users-list.pdf')" class="btn btn-primary py-2 px-3 mr-2" data-toggle="tab">
                      <span>Export PDF</span>
                    </a>
                    <a href="#" onclick="exportTableToCSV('users-list.csv')" class="btn btn-primary py-2 px-3" data-toggle="tab">
                      <span>Export Excel</span>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <!-- Projects table -->
              <table class="table align-items-center table-flush" id='players'>
                <thead class="thead-light">
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">PUBGM ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Name</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Bonus</th>
                    <th scope="col">Signup Date</th>
                    <th scope="col">Total Spend</th>
                    <th scope="col" class='ignore'></th>
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.5/jspdf.plugin.autotable.min.js"></script>
  <script src="/assets/js/tableHTMLExport.js" charset="utf-8"></script>
</body>
</html>
