<?php
  //require_once $_SERVER['DOCUMENT_ROOT'].'/application/classes/application.php';
  $krow = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT COUNT(email) as cnt FROM users WHERE docverified='pending'"));
  $wrow = mysqli_fetch_assoc(mysqli_query($app->db,"SELECT COUNT(user) as cnt FROM withdraw WHERE status='PENDING'"));
?>

<nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
  <div class="container-fluid">
    <!-- Toggler -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Brand -->
    <a class="navbar-brand pt-0" href="/">
      <img src="./assets/img/logo.jpg" class="navbar-brand-img" alt="...">
    </a>
    <!-- Collapse -->
    <div class="collapse navbar-collapse" id="sidenav-collapse-main">
      <!-- Collapse header -->
      <div class="navbar-collapse-header d-md-none">
        <div class="row">
          <div class="col-6 collapse-brand">
            <a href="./index.html">
              <img src="./assets/img/logo.jpg">
            </a>
          </div>
          <div class="col-6 collapse-close">
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
      <!-- Navigation -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="index.php">
            <i class="fas fa-home text-primary"></i> Dashboard
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="users.php">
            <i class="fas fa-users text-primary"></i> Players
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="kyc.php">
            <i class="fas fa-passport text-primary"></i> KYC Requests <span class="ml-3 badge badge-danger"><? echo $krow["cnt"]; ?></span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="add-match.php">
            <i class="fas fa-gamepad text-primary"></i> Add new Match
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="matches.php">
            <i class="fas fa-gamepad text-primary"></i> Matches
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="withdraw.php">
            <i class="fas fa-money-bill-wave text-primary"></i> Withdraw Requests <span class="ml-3 badge badge-danger"><? echo $wrow["cnt"]; ?></span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="credit-user.php">
            <i class="fas fa-trophy text-primary"></i> Distribute Match Prize
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="transactions.php">
            <i class="fas fa-poll-h text-primary"></i> Transactions
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="change-login.php">
            <i class="fas fa-key text-primary"></i> Change Password
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="send-notification.php">
            <i class="fas fa-bell text-primary"></i> Send Notification
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="logout.php">
            <i class="fas fa-power-off text-primary"></i> Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
