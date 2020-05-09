<?php
 require('application/classes/application.php');
 $app = new App();
 if ($res = mysqli_query($app->db, "SELECT * FROM users WHERE id='".$_GET["user"]."'")){
   $row = mysqli_fetch_assoc($res);
 } else {
   error_log("MYSQLI ERROR: ".mysqli_error($app->db));
 }
?>
<!DOCTYPE html>
<html>
<head>
  <title>KYC Documents for <?php echo $row['name'] ?></title>
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
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h3>KYC Documents for : <?php echo $row['name'] ?></h3>
                  <h5 class="text-uppercase text-muted ls-1 mb-1">Status : <?php echo $row['docverified'] ?></h5>
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
                  <img src="<?php echo $row['docfront'] ?>" class='w-100 border rounded-lg' alt="" id='front'>
                </div>
                <div class="col-md-6">
                  <img src="<?php echo $row['docback'] ?>" class='w-100 border rounded-lg' alt="" id='back'>
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
