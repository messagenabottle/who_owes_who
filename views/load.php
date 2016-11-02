<?php

	$page_title = "Saved Debts";

	require_once '../constants.php';
	require_once WOW_ROOT . '/partials/header.php';
	require_once WOW_ROOT . '/partials/body_left.php';
	$user = get_user();
	$accounts = [];

	if ($user) {
		$auth_user = new USER();
		$user_id = $user['user_id'];

		$stmt = $auth_user->runQuery("SELECT id FROM accounts WHERE user_id=:user_id");
		$stmt->execute(array(":user_id"=>$user_id));

		$accounts = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
?>

<h1>Choose a Previous Debt</h1>
<ul>	
	<?php foreach ($accounts as $account) { ?>
	<li>
		<a href="index.php?account=<?php echo $account['id']; ?>">Debt Account #<?php echo $account['id']; ?></a>
	</li>
	<?php } ?>
</ul>

<?php
require_once WOW_ROOT . '/partials/footer.php';
