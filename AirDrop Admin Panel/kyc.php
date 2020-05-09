<?php
 require('application/classes/application.php');
 $app = new App();
 if (isset($_GET['approve'])){
   if (mysqli_query($app->db, "UPDATE users SET docverified='true' WHERE id='".$_GET['approve']."'")){
      $status = 'approved';
   } else {
     error_log("MYSQLI ERROR: ".mysqli_error($app->db));
   }
 }

 if (isset($_GET['reject'])){
   if (mysqli_query($app->db, "UPDATE users SET docverified='false' WHERE id='".$_GET['reject']."'")){
      $status = 'rejected';
   } else {
     error_log("MYSQLI ERROR: ".mysqli_error($app->db));
   }
 }
?>
<!DOCTYPE html>
<html>
<head>
  <title>KYC Requests</title>
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
                if ($status == 'rejected'){
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Rejected!</strong> KYC Request Rejected
                    </div>
                  ';
                } else if ($status == 'approved'){
                  echo '
                    <div class="alert alert-success" role="alert">
                      <strong>Approved!</strong> KYC Request Approved
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
                <div class="col-9">
                  <h3 class="mb-0">User KYC Requests</h3>
                </div>
                <div class="col-3">
                  <select id="filter" class="form-control">
                    <option value="all">All</option>
                    <option value="true">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="false">Declined</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <!-- Projects table -->
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Email</th>
                    <th scope="col">Doc Type</th>
                    <th scope="col">Kyc Status</th>
                    <th scope="col">View Document</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <?php $app->list_kyc_requests(null); ?>
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
  <script src="/assets/js/downloader.js"></script>
  <script>
    function downloadImg(){
      var img = $('#front').attr('src');
      var imgE = $('#back').attr('src');
      /*var url = img.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      window.open(url);
      console.log(url);*/
      download(img, Math.random().toString(36).substring(7)+".jpg", "image/jpg" );
      download(imgE, Math.random().toString(36).substring(7)+".jpg", "image/jpg" );
    }

    $('#filter').change(function(){
      var filter = $('#filter').val();
      if (filter == 'all') {
        $('tr').css('display','table-row');
      } else {
        $('tr').css('display','none');
        $('tr[data-status="'+filter+'"]').css('display','table-row');
      }
    })
  </script>
</body>
</html>
