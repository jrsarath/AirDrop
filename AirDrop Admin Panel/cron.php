<?php
  require('/home/gamesetter/public_html/manage/application/classes/application.php');
  $app = new App();
  // DEBUG MSG
  // error_log('Running Cron');

  if ($res = mysqli_query($app->db, "SELECT * FROM matches")) {
    while ($row = mysqli_fetch_assoc($res)){
      $date = date_create_from_format("d/m/Y h:i A", $row['matchschedule']);
      $currentDate = new DateTime();
      $diff = date_diff($currentDate, $date);
      if ($diff->invert == 0 && (int)$diff->format('%i') == 15){
        error_log('Sending notification for match #'.$row['id']);
        $app->send_notification('15 Minute Remaining','Match #'.$row["id"].' starts in 15 minutes. Get in now to know match details');
      }
    }
  } else {
    error_log('SQL Error(Cron): '.mysqli_error($app->db));
  }

?>
