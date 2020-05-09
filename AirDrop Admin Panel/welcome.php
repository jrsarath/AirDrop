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
      $days = +$diff->format('%d');
      if (!$hours >= 3 && $days == 0) {
        $email = base64_decode(explode('-', $decoded)[1]);
        // PROCCESS VERIFICATION
        $res = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT * FROM users WHERE email='".$email."'"));

        if ($res['eVerified'] == 'false'){
          if (mysqli_query($app->db, "UPDATE users SET eVerified='true' WHERE email='".$email."'")) {
            $status = 'success';
          } else {
            $status = 'error';
          }
        } elseif ($res['eVerified'] == 'true'){
          $status = 'verified';
        } else {
          $status = 'error';
        }
      } else {
        $status = 'expired';
        session_destroy();
      }
      //$app->reset_password('');
    } else {
      header("Location: https://gamesetter.in");
    }
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Reset Your Password - Gamesetter">
  <meta name="author" content="Jr Sarath">
  <title>Verify Email - Game Setter</title>
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
              <h1 class="text-white">Welcome to Game Setter</h1>
              <p class="text-lead text-light">Earn real cash by playing PUBG</p>
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
          <div class="card bg-secondary shadow border-0">
            <div class="card-body px-lg-5 py-lg-5" style="display:flex;justify-content: center;flex-direction: column;align-items: center;">
              <?php
                if (!empty($status)){
                  switch ($status) {
                    case 'success':
                      echo '
                        <img src="/assets/img/check.png" class="w-50 mb-5" />
                        <h3>Nice! Email is now verified</h3>
                      ';
                      break;
                    case 'error':
                        echo '
                          <img src="/assets/img/error.png" class="w-50 mb-5" />
                          <h3>Something went wrong! try again later</h3>
                        ';
                        break;
                    case 'verified':
                        echo '
                          <img src="/assets/img/verified-account.png" class="w-50 mb-5" />
                          <h3>No need! Email is already verified</h3>
                        ';
                        break;
                    case 'expired':
                        echo '
                          <img src="/assets/img/hourglass.png" class="w-50 mb-5" />
                          <h3>Uh oh! This link has been expired</h3>
                          <form method="post">
                            <button type="submit" name="submit" class="btn btn-success mt-4">Resend Link</button>
                          </form>
                        ';
                        break;
                    default:
                      header("Location: https://gamesetter.in");
                      break;
                  }
                }
              ?>
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
