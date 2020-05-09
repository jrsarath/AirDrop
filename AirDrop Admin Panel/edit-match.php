<?php
 require('application/classes/application.php');
 $app = new App();

 if (isset($_GET["match"])){
   $m = $_GET["match"];
   $res = mysqli_query($app->db, "SELECT * FROM matches WHERE id='$m'");
   $row = mysqli_fetch_assoc($res);
 } else {
   header("location: /matches.php");
 }

 if (isset($_POST['submit'])) {
   $m = $_GET["match"];
   $sc = $app->dbHelper->sqlSafeValue($_POST['matchdate'])." ".$app->dbHelper->sqlSafeValue($_POST['matchtime']);
   $query = "UPDATE matches set roomid='".$app->dbHelper->sqlSafeValue($_POST['roomid'])."', roompassword='".$app->dbHelper->sqlSafeValue($_POST['roompassword'])."',livelink='".$app->dbHelper->sqlSafeValue($_POST['livelink'])."',map='".$app->dbHelper->sqlSafeValue($_POST['map'])."',totalplayer='".$app->dbHelper->sqlSafeValue($_POST['totalplayer'])."',entryfee='".$app->dbHelper->sqlSafeValue($_POST['entryfee'])."',winprice='".$app->dbHelper->sqlSafeValue($_POST['winprice'])."',perkill='".$app->dbHelper->sqlSafeValue($_POST['perkill'])."',matchstatus='".$app->dbHelper->sqlSafeValue($_POST['matchstatus'])."',rule='".$app->dbHelper->sqlSafeValue($_POST['rule'])."',matchschedule='$sc' WHERE id='$m'";
   if (mysqli_query($app->db, $query)){
     $status = 'success';
     $app->send_notification('Match Updated', 'Match #'.$m.' has been updated. Open to check for more details');
   } else {
     error_log('SQL Error: '.mysqli_error($app->db));
     $status = 'false';
   }
 }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Edit Match - Game Setter</title>
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
                    <strong>Success!</strong> Match updated successfully
                  </div>
                ';
              } else if ($status == 'false'){
                echo '
                  <div class="alert alert-danger" role="alert">
                    <strong>Failed!</strong> Unable to submit Edits
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
            <div class="card-header mb-5">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Edit Match #<? echo $_GET["match"]?></h3>
                </div>
              </div>
            </div>
            <div class="container-fluid">
                <form action="" method="post">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Room ID (Optional)</label>
                                <input type="text" name='roomid' class="form-control" placeholder="Room ID" value='<? echo $row["roomid"]?>'>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Room Password (Optional)</label>
                                <input type="text" name='roompassword' class="form-control" placeholder="Room Password" value='<? echo $row["roompassword"]?>'>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label>Youtube Live Link (Optional)</label>
                                <input type="text" name='livelink' class="form-control" placeholder="Youtube Link of the live Stream" value='<? echo $row["livelink"]?>'>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Map*</label>
                                <select name="map" class="form-control" required>
                                    <option value="Erangel">Erangel</option>
                                    <option value="Miranmar">Miranmar</option>
                                    <option value="Sanhok">Sanhok</option>
                                    <option value="Miranmar">Miranmar</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Match Type</label>
                                <input class="form-control" value='<? echo $row["matchtype"]?>' disabled/>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label>Match Mode</label>
                                <input class="form-control" value='<? echo $row["type"]?>' disabled/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Total Player*</label>
                                <input type="text" name='totalplayer' class="form-control" placeholder="Total Player" value='<? echo $row["totalplayer"]?>' required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Total Player Joined*</label>
                                <input type="text" name='totalplayerjoined' class="form-control" placeholder="Total Player Joined" value='<? echo $row["totalplayerjoined"]?>' disabled>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Entry Fee*</label>
                                <input type="text" name='entryfee' class="form-control" placeholder="Entry Fee" value='<? echo $row["entryfee"]?>' required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Win Price*</label>
                                <input type="text" name='winprice' class="form-control" placeholder="Win Price" value='<? echo $row["winprice"]?>' required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Per Kill*</label>
                                <input type="text" name='perkill' class="form-control" placeholder="Per Kill" value='<? echo $row["perkill"]?>' required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Match Status*</label>
                                <select name="matchstatus" class="form-control" required>
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Finished">Finished</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                             <div class="form-group">
                                <label>Match Date*</label>
                                <div class="input-group input-group-alternative">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                                    </div>
                                    <input type="text" name="matchdate" class="form-control datepicker" placeholder="Match Date" value='<? echo explode(' ', $row["matchschedule"])[0] ?>' required>
                                </div>
                             </div>
                        </div>
                        <div class="col-md-6">
                             <div class="form-group">
                                <label>Match Time*</label>
                                <input type="text" name="matchtime" class="form-control" placeholder="Match Time - 10:50 PM" value='<? echo explode(' ', $row["matchschedule"])[1]." ".explode(' ', $row["matchschedule"])[2] ?>' required>
                             </div>
                        </div>
                        <div class="col-12">
                             <div class="form-group">
                                <label>Rules*</label>
                                <textarea class="form-control" name="rule" rows="4" required><? echo $row["rule"]?></textarea>
                             </div>
                        </div>
                        <div class="col-12 mb-5 mt-3">
                            <input type="submit" class="btn btn-success btn-block" name="submit" value='Update Match'>
                        </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
      <?php require('inc/templates/footer.inc.php'); ?>
    </div>
  </div>
  <?php require('inc/templates/scripts.inc.php');?>
</body>
</html>
