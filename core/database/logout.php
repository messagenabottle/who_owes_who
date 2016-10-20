<?php

    require_once('session.php');
	
	$user_logout = new USER();
	
	if($user_logout->is_loggedin()!="")
	{
		var_dump("is logged in");
		$user_logout->redirect('../../index.php');
	}
	if(isset($_GET['logout']) && $_GET['logout']=="true")
	{
		var_dump("is logged out");
		$user_logout->doLogout();
		$user_logout->redirect('../../views/login.php');
	}

?>