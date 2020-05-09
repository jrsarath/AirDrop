<!--
* AIRDROP ADMIN PANEL
* AIRDROP - A COMPLETE PUBGM TOURNAMENT MANAGEMENT SOLUTION
* Copyright © 2019, JR Sarath - Noobs Labs
* GNU GENERAL PUBLIC LICENSE Version 3
-->
<?php
  session_start();
  if (!isset($_SESSION['admin_logged_in'])){
    header('Location: /login');
  }
?>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="AIRDROP - A COMPLETE PUBGM TOURNAMENT MANAGEMENT SOLUTION">
<meta name="author" content="Jr Sarath">
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
<!-- Icons -->
<link href="./assets/vendor/nucleo/css/nucleo.css" rel="stylesheet">
<link href="./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
<!-- Argon CSS -->
<link type="text/css" href="./assets/css/argon.css?v=1.0.0" rel="stylesheet">
<link type="text/css" href="./assets/css/dropzone.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<style>
  .form-control {
    color: #212121;
    font-weight: 700;
  }
</style>
