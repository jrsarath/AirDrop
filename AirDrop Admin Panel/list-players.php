<?php
 require('application/classes/application.php');
 $app = new App();
 if (!isset($_GET["match"])){
   header('Location: /matches.php');
 }
 if (isset($_GET["set-winner"])){
   mysqli_query($app->db, "UPDATE join_match SET winner='false' WHERE match_id='".$_GET['match']."'");
   mysqli_query($app->db, "UPDATE join_match SET winner='true' WHERE match_id='".$_GET['match']."' AND user='".$_GET['user']."'");

 }
 if (isset($_GET["edit-score"])) {
   $user = $app->get_user($_GET['user']);
   $prevScore = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT * FROM join_match WHERE match_id='".$_GET['match']."' AND user='".$_GET['user']."'"));
   if (isset($_POST["submit-score"])){
     mysqli_query($app->db, "UPDATE join_match SET kill_count='".$_POST['kill_count']."',placement='".$_POST['placement']."' WHERE match_id='".$_GET['match']."' AND user='".$_GET['user']."'");
   }
 }
 if (isset($_GET["credit"])) {
   $user = $app->get_user($_GET['user']);
   if (isset($_POST['credit-user'])){
     $u = $app->dbHelper->sqlSafeValue($_POST['user']);
     $m = +$app->dbHelper->sqlSafeValue($_POST['amount']);
     $txn = 'MPRIZE-'.time();
     if (mysqli_query($app->db, "UPDATE wallet SET balance=balance+$m WHERE user='$u'")) {
       mysqli_query($app->db, "INSERT INTO transactions(id, amount, user, number, status, type) VALUES('$txn', '$m', '$u', 'null', 'SUCCESS', 'CREDIT')");
       $status = 'success';
     } else {
       $status = 'failed';
       error_log(mysqli_error($app->db));
     }
   }
 }
 $res = mysqli_query($app->db, "SELECT * FROM matches WHERE id='".$_GET["match"]."'");
 $row = mysqli_fetch_assoc($res);
?>
<!DOCTYPE html>
<html>
<head>
  <title>All Matches - GameSetter</title>
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
                    <strong>Done!</strong> User Credited
                  </div>
                ';
              } else {
                echo '
                  <div class="alert alert-danger" role="alert">
                    <strong>Failed!</strong> Cannot credit selected user
                  </div>
                ';
              }
            }
          ?>
          <?php if (isset($_GET['edit-score'])): ?>
            <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Edit Score - <?php echo $_GET["user"] ?></h3>
            </div>
            <div class="card-body">
              <form method='post'>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>User</label>
                      <input type="text" name="user" class="form-control" placeholder="Question" disabled value='<?php echo $_GET['user'] ?>'>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Gamertag</label>
                      <input type="text" name="gamertag" class="form-control" disabled value='<?php echo $user['gamertag'] ?>'>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Kill Count*</label>
                      <input type="number" name="kill_count" class="form-control" placeholder="Players Eliminated " value='<?php echo $prevScore["kill_count"] ?>' required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Placement (Optional)</label>
                      <input type="number" name="placement" class="form-control" placeholder="Team/Player Placement in Match" value='<?php echo $prevScore["placement"] ?>'>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <input type="submit" name="submit-score" class="btn btn-success">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <?php endif; ?>
          <?php if (isset($_GET['credit'])): ?>
            <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Credit User - <?php echo $_GET["user"] ?></h3>
            </div>
            <div class="card-body">
              <form method='post'>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>User</label>
                      <input type="text" name="user" class="form-control" placeholder="User Email" value='<?php echo $_GET['user'] ?>'>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Gamertag</label>
                      <input type="text" name="gamertag" class="form-control" disabled value='<?php echo $user['gamertag'] ?>'>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                        <label>Credit Amount*</label>
                        <input type="number" name="amount" class="form-control" placeholder="Credit Amount" required="">
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <input type="submit" name='credit-user' class="btn btn-success">
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
                  <h3 class="mb-0">Players List for Match #<?php echo $_GET["match"] ?></h3>
                  <h5 class="text-uppercase text-muted ls-1 mb-1 mt-2"><?php echo $row["matchstatus"] ?></h5>
                </div>
                <div class="col">
                  <ul class="nav justify-content-end">
                    <a href="#" onclick="createPDF('match-<?php echo $_GET['match'] ?>-players-list.pdf')" class="btn btn-primary py-2 px-3 mr-2" data-toggle="tab">
                      <span>Export PDF</span>
                    </a>
                    <a href="#" onclick="exportTableToCSV('match-<?php echo $_GET['match'] ?>-players-list.csv')" class="btn btn-primary py-2 px-3" data-toggle="tab">
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
                    <th scope="col">Match ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Gamertag</th>
                    <th scope="col">Kill Count</th>
                    <th scope="col">Winner</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Time Joined</th>
                    <th class="ignore"></th>
                  </tr>
                </thead>
                <tbody>
                  <?php $app->list_match_players($_GET['match']); ?>
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
