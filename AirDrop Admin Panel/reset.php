<?php
    session_start();
    require $_SERVER["DOCUMENT_ROOT"].'/application/classes/application.php';
    if (isset($_GET['crc'])) {
      $app = new App();
      $decoded = base64_decode($_GET["crc"]);
      $date = explode('-', $decoded)[0];
      $currentDate = date("h:i:s d.m.Y");
      $diff = date_diff(date_create($date), date_create($currentDate));
      $hours = +$diff->format('%h');
      if (!$hours >= 3 && $days == 0) {
        $_SESSION['reset-email'] = $email = base64_decode(explode('-', $decoded)[1]);
      } else {
        $status = 'expired';
        session_destroy();
      }
      //$app->reset_password('');
    } else {
      header("Location: https://gamesetter.in");
    }

    if (isset($_POST['reset'])) {
      $_SESSION['reset-email'] = $email;
      if ($_POST['password'] == $_POST['cnfpassword']) {
        if (preg_match('/^(?=.*\d).{4,16}$/', $_POST['cnfpassword'])){
          if ($app->reset_password($email, md5($_POST['cnfpassword']))){
            $status = 'true';
            session_destroy();
          } else {
            $status = 'false';
          }
        } else {
          $status = 'weak';
        }
      } else {
        $status = 'dont-match';
      }
    }
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Reset Your Password - Gamesetter">
  <meta name="author" content="Jr Sarath">
  <title>Reset Password - Game Setter</title>
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
  <!-- Icons -->
  <link href="../assets/vendor/nucleo/css/nucleo.css" rel="stylesheet">
  <link href="../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
  <!-- Argon CSS -->
  <link type="text/css" href="../assets/css/argon.css?v=1.0.0" rel="stylesheet">
</head>

<body class="bg-default">
  <div class="main-content">
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <h1 class="text-white">Forgot Password</h1>
              <p class="text-lead text-light">Reset your password</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <?php
            if (isset($status) && $status == 'expired'){
              echo '
                <div class="alert alert-danger" role="alert">
                  <strong>Sorry!</strong> Reset link is Expired.
                </div>
              ';
            } else if (isset($status) && $status == 'weak'){
              echo '
                <div class="alert alert-warning" role="alert">
                  <strong>Error!</strong> Password is too weak, Please use 4-16 Digits, Atleast one number one alphabet.
                </div>
              ';
            } else if (isset($status) && $status == 'dont-match'){
              echo '
                <div class="alert alert-warning" role="alert">
                  <strong>Error!</strong> Passwords dont match.
                </div>
              ';
            } else if (isset($status) && $status == 'false'){
              echo '
                <div class="alert alert-danger" role="alert">
                  <strong>Error!</strong> Unknown error! Contact support
                </div>
              ';
            } else if (isset($status) && $status == 'true'){
              echo '
                <div class="alert alert-success" role="alert">
                  <strong>Success!</strong> Password updated, Keep Gaming
                </div>
              ';
            }

          ?>
          <div class="card bg-secondary shadow border-0">
            <div class="card-body px-lg-5 py-lg-5">
              <form role="form" class='mt-4' method="post">
                <div class="form-group mb-3">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text" style="background:#e9ecef"><i class="ni ni-email-83"></i></span>
                    </div>
                    <input class="form-control" placeholder="Email" type="email" value='<?php echo $email ?>' name='email' disabled>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input class="form-control" placeholder="New Password" type="password" name='password' required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input class="form-control" placeholder="Confirm Password" type="password" name='cnfpassword' required>
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary my-4 btn-block" name='reset'>Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->

  <!-- Argon Scripts -->
  <!-- Core -->
  <script src="../assets/vendor/jquery/dist/jquery.min.js"></script>
  <script src="../assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Argon JS -->
  <script src="../assets/js/argon.js?v=1.0.0"></script>
</body>
</html>
