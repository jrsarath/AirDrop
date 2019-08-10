<?php
  /**
   * Database Helper
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
      $db_name = "gamesetter_v2";
      $db_user = "global";
      $db_pass = "global";
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
