<?php

	require_once 'partials/header.php';
	require_once 'partials/body_left.php';
	require_once 'partials/body_right.php';
	$auth_user = new USER();

	$user_id = $_SESSION['user_session'];

	$stmt = $auth_user->runQuery("SELECT * FROM users WHERE user_id=:user_id");
	$stmt->execute(array(":user_id"=>$user_id));

	$userRow=$stmt->fetch(PDO::FETCH_ASSOC);

?>

<h1>History</h1></div>
	</div>
</div>

<?php require_once 'partials/footer.php'; ?>