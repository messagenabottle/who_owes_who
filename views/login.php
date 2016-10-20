<?php

    require_once 'partials/header.php';


    if (!isset($_SESSION)) {
        session_start();
    }

    $login = new USER();

    if($login->is_loggedin()!="")
    {
    	$login->redirect('../index.php');
    }

    if(isset($_POST['btn-login']))
    {
    	$uname = strip_tags($_POST['txt_uname_email']);
    	$umail = strip_tags($_POST['txt_uname_email']);
    	$upass = strip_tags($_POST['txt_password']);
    		
    	if($login->doLogin($uname,$umail,$upass))
    	{
    		$login->redirect('../index.php');
    	}
    	else
    	{
    		$error = "Wrong Details !";
    	}	
    }

?>

<div class="signin-form">

	<div class="container">
      
      <div class="row">
        
        <div class="col-xs-12 col-sm-5">
        
           <form class="form-signin" method="post" id="login-form">
          
            <h2 class="form-signin-heading">Log In</h2><hr />
            
            <div id="error">
            <?php
    			if(isset($error))
    			{
    				?>
                    <div class="alert alert-danger">
                       <i class="glyphicon glyphicon-warning-sign"></i> &nbsp; <?php echo $error; ?> !
                    </div>
                    <?php
    			}
    		?>
            </div>
            
            <div class="form-group">
            <input type="text" class="form-control" name="txt_uname_email" placeholder="Username or E mail ID" required />
            <span id="check-e"></span>
            </div>
            
            <div class="form-group">
            <input type="password" class="form-control" name="txt_password" placeholder="Your Password" />
            </div>
           
         	<hr />
            
            <div class="form-group">
                <button type="submit" name="btn-login" class="btn submit_Btn">
                    	<i class="glyphicon glyphicon-log-in"></i> &nbsp; SIGN IN
                </button>
            </div>  
          	<br />
                <label>Don't have account yet ! <a href="../core/database/sign-up.php">Sign Up</a></label>
          </form>

        </div>
        
    </div>

<?php
    require_once 'partials/footer.php';
?>