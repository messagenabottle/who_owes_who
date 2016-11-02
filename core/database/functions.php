<?php

require_once WOW_ROOT . '/core/database/class.user.php';

function get_user() {
	// Start session if not already started.
	if ( ! isset( $_SESSION ) ) {
		session_start();
	}

	// The user session is not set so the user is not logged in.
	if ( ! isset( $_SESSION['user_session'] ) ) {
		return false;
	}

	// The user information has already been stored in the session so we can just use that.
	if ( isset( $_SESSION['user'] ) ) {
		return $_SESSION['user'];
	}

	$auth_user = new USER();

	$user_id = $_SESSION['user_session'];

	$stmt = $auth_user->runQuery("SELECT * FROM users WHERE user_id=:user_id");
	$stmt->execute(array(":user_id"=>$user_id));
	
	$_SESSION['user'] = $stmt->fetch(PDO::FETCH_ASSOC);

	return $_SESSION['user'];
}

function get_debts($account_id) {
	$auth_user = new USER();
	$stmt = $auth_user->runQuery("SELECT * FROM debts WHERE account_id=:account_id");
	$stmt->execute(array(":account_id"=>$account_id));
	

	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

?>