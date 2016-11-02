<?php
	
	require_once '../../constants.php';
    require_once(WOW_ROOT . '/core/database/session.php');
	
	$user_logout = new USER();
	
	if($user_logout->is_loggedin()!="")
	{
		$user_logout->redirect(WOW_URL . 'index.php');
	}
	if(isset($_GET['logout']) && $_GET['logout']=="true")
	{
		$user_logout->doLogout();
		$user_logout->redirect(WOW_URL . '/views/login.php');
	}

?>