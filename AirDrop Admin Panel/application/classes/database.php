<?php
  /**
  * DATABASE HELPER
  * AIRDROP - A COMPLETE PUBGM TOURNAMENT MANAGEMENT SOLUTION
  * Copyright © 2019, JR Sarath - Noobs Labs
  * GNU GENERAL PUBLIC LICENSE Version 3
  */
  class DB {
    function sqlSafePost($post) {
      return mysqli_real_escape_string($this->connect(), $_POST[$post]);
    }
    function sqlSafeValue($value) {
      return mysqli_real_escape_string($this->connect(), $value);
    }

    function connect() {
      $db_host = "localhost";
      $db_name = "gamesett_data";
      $db_user = "gamesett_gameset";
      $db_pass = "jVs4KM0A!8-o";
      //$db = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

      if (!$db = mysqli_connect($db_host, $db_user, $db_pass, $db_name)){
        error_log('SQL Error :'.mysqli_connect_error());
      } else {
        return $db;
      }
    }
    function debug(){
      return $this->debug;
    }
  }
