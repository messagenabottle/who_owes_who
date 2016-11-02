<?php
	
	if (!isset($_SESSION)) {
		session_start();
	}
	require_once WOW_ROOT . '/core/database/functions.php';
	$session = new USER();
?>