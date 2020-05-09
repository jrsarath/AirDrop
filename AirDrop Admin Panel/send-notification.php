<?php
  require('application/classes/application.php');
  $app = new App();
  if ($_POST['send']){
    if ($app->send_notification($_POST['title'], $_POST['body'])) {
        $status = 'success';
    } else {
        $status = 'failed';
    }
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Send Notification</title>
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
                      <strong>Done!</strong> Notification sent to all users
                    </div>
                  ';
                } else {
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Failed!</strong> Can&apos;t send Notifcation at this moment
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
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col">
                  <h3>Send Notifications</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form action="" method='post'>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Title*</label>
                        <input type="text" name="title" class="form-control" placeholder="Notification Title" required>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Notification Body*</label>
                        <textarea name="body" class="form-control" rows="5" placeholder="Notification Content"></textarea>
                    </div>
                </div>
                <div class="col-12 mb-5 mt-3">
                    <input type="submit" class="btn btn-success btn-block" name="send">
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
