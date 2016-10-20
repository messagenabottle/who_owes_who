<?php

	require_once 'partials/header.php';
	require_once 'partials/body_left.php';
	$auth_user = new USER();


	$user_id = $_SESSION['user_session'];

	$stmt = $auth_user->runQuery("SELECT * FROM users WHERE user_id=:user_id");
	$stmt->execute(array(":user_id"=>$user_id));

	$userRow=$stmt->fetch(PDO::FETCH_ASSOC);

?>

<h1>Choose a Previous Debt</h1>
	</div>
		<?php
			var_dump(get_debts($user_id));
		?>


<?php
	require_once 'partials/footer.php';
?>