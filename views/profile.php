<?php

  $page_title = "Profile";

  require_once '../constants.php';
  require_once WOW_ROOT . 'partials/header.php';
  require_once WOW_ROOT . 'partials/body_left.php';
  require_once WOW_ROOT . 'partials/body_right.php';
  $auth_user = new USER();  
  $user_id = $_SESSION['user_session'];
  
  $stmt = $auth_user->runQuery("SELECT * FROM users WHERE user_id=:user_id");
  $stmt->execute(array(":user_id"=>$user_id));
  
  $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
  
?>


<div class="container-fluid">
      
      <div class="row">
      <div class="col-sm-12 col-md-8">
    <h1>Profile</h1>
      </div>
              