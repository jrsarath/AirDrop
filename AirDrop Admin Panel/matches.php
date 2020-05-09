<?php
 require('application/classes/application.php');
 $app = new App();
 if (isset($_GET['del'])){
   $drow = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT * FROM matches WHERE id='".$_GET['del']."'"));
   if ($drow['matchstatus'] != 'Finished'){
     $qres = mysqli_query($app->db,"SELECT * FROM join_match WHERE match_id='".$_GET['del']."'");
     while ($qrow = mysqli_fetch_assoc($qres)) {
       $u = $qrow["user"];
       $txn = 'REFUND-'.uniqid();
       $m = $drow["entryfee"];
       mysqli_query($app->db, "UPDATE wallet SET balance=balance+$m WHERE user='$u'");
       mysqli_query($app->db, "INSERT INTO transactions(id, amount, user, number, status, type) VALUES('$txn', '$m', '$u', 'null', 'SUCCESS', 'CREDIT')");
     }
     $status = 'deleted';
     $app->send_notification('Match Deleted', 'Match #'.$_GET['del'].' has been Deleted. Refunds has been sent to eligible Users');
   } else {
     $status = 'deleted';
   }
   mysqli_query($app->db, "DELETE FROM matches WHERE id='".$_GET['del']."'");
 }
 if (isset($_GET["channel"])){
   $match = mysqli_fetch_assoc(mysqli_query($app->db, "SELECT * FROM matches WHERE id='".$_GET['channel']."'"));
   if (empty($match['roomid']) && empty($match["roompassword"])) {
     $status = 'failed';
   } else {
     $app->send_channel_notification('match_'.$_GET["channel"], 'Match Starts Soon', 'Match #'.$_GET['channel'].' is about to start. Here is your Room ID:'.$match["roomid"].' & Password:'.$match["roompassword"].' ');
     $status = 'success';
   }
 }
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
                if ($status == 'deleted'){
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Done!</strong> Match deleted. This can&apos;t be undone
                    </div>
                  ';
                }
                if ($status == 'success'){
                  echo '
                    <div class="alert alert-success" role="alert">
                      <strong>Done!</strong> Sent Notification with Match ID & Password
                    </div>
                  ';
                }
                if ($status == 'failed'){
                  echo '
                    <div class="alert alert-danger" role="alert">
                      <strong>Failed!</strong> Set Room ID & Room Password First for this match.
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
                  <h3 class="mb-0">All Matches</h3>
                </div>
                <div class="col-3">
                  <select class="form-control" id='filter'>
                    <option value="all">All</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="finished">Finished</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <!-- Projects table -->
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Match ID</th>
                    <th scope="col">Map</th>
                    <th scope="col">Type</th>
                    <th scope="col">Entry Fee</th>
                    <th scope="col">Win Price</th>
                    <th scope="col">Per Kill</th>
                    <th scope="col">Ttl Player</th>
                    <th scope="col">Plyr Joined</th>
                    <th scope="col">Status</th>
                    <th scope="col">Match Time</th>
                    <th scope="col">View Players</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <?php $app->list_matches(NULL); ?>
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
  <script>
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
