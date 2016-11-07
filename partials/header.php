<!DOCTYPE html>
<html lang="en">
  <head>
    <?php

      require_once WOW_ROOT . '/core/database/functions.php';

      if ($_SERVER['REQUEST_URI'] !== WOW_ROOT . '/views/login.php') {
        require_once WOW_ROOT . '/core/database/session.php';
      }
      $userRow = get_user();
    ?>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <title>Who Owes Who: Settle your debts in fewer steps! - <?php echo $page_title; ?></title>
    
    <!-- JQuery Source -->
    <script src="<?php echo WOW_URL ?>js/jquery-3.1.1.js"></script>  

    <!-- Formula Source -->
    <script src="<?php echo WOW_URL ?>js/formula.js"></script>
    
    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="<?php echo WOW_URL ?>css/bootstrap/bootstrap.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="<?php echo WOW_URL ?>js/bootstrap/bootstrap.js"></script>

    <!-- Stylesheet Link -->
    <link rel="stylesheet" type="text/css" href="<?php echo WOW_URL ?>css/styles.css">
    <!-- Google Fonts Link -->
    <link rel="stylesheet" href='https://fonts.googleapis.com/css?family=Lato|Oswald:700'>

  </head>


  <body>
    <header id="header">
      <div class="navigation">
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <div class="logo">
                <a class="navbar-brand" href="<?php echo WOW_URL ?>index.php">
                  <span class="glyphicon glyphicon-hand-up" aria-hidden="true"></span>
                  <span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span>
                  <span id="brand">WHO OWES WHO</span>
                  <span class="glyphicon glyphicon-hand-left" aria-hidden="true"></span>
                  <span class="glyphicon glyphicon-hand-down" aria-hidden="true"></span>
                </a>
              </div>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Debts<span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="<?php echo WOW_URL ?>index.php">New IOU Set</a></li>
                    <li><a href="<?php echo WOW_URL ?>views/load.php">Load Old IOUs</a></li>
                  </ul>
                </li>
                <li><a>||</a></li>
                <li class="dropdown">
                  <?php if(isset($_SESSION['user'])): ?>
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Welcome <?php echo($userRow['user_name']); ?><span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <!-- <li><a href="/views/profile.php">View Profile</a></li> -->
                      <li role="separator" class="divider"></li>
                      <li><a href="<?php echo WOW_URL ?>core/database/logout.php?logout=true"><span class="glyphicon glyphicon-log-out"></span>&nbsp;Log Out</a></li>
                    </ul>
                  <?php else: ?>
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Save your Debts! <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <li><a href="<?php echo WOW_URL ?>core/database/sign-up.php">Register</a></li>
                      <li><a href="<?php echo WOW_URL ?>views/login.php"><span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In</a></li>
                    </ul>
                  <?php endif; ?>
                </li>
              </ul>
            </div><!-- /.navbar-collapse -->
           
              <div id="subheading">Settle your debts in fewer steps!</div>

          </div><!-- /.container-fluid -->
        </nav>
      </div>
    </header>