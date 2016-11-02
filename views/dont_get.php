<?php

	$page_title = "I Don't Get It";
	
	require_once '../constants.php';
	require_once WOW_ROOT . 'partials/header.php';
	$auth_user = new USER();


	$user_id = $_SESSION['user_session'];

	$stmt = $auth_user->runQuery("SELECT * FROM users WHERE user_id=:user_id");
	$stmt->execute(array(":user_id"=>$user_id));

	$userRow=$stmt->fetch(PDO::FETCH_ASSOC);

?>
    <div class="container-fluid">
	    <div class="well">
	    	<h2>Here's how it works...</h2>
			<p>Who Owes Who is a circular debt calculator. If a group of people list all the debts owed to each other, it consolidates them into the fewest transactions possible.</p>
			<p>In the example below, everyone owes something, but they also are owed money in return. Sally, for instance, owes $62 total ($28+$34). However, she is owed $83. Wouldn't it make sense for her to just not hand over anything and get the $21 she is owed ($83 owed minus $62 she owes)?</p>
			<p>Who Owes Who basically plays the role of a banker. It takes in all money owed, and then redistributes those funds to all the people who are supposed to receive money.</p>
			<p>You can add or remove the last debt entered by clicking on the + Debt or - Debt buttons. When all debts have been entered, click 'Now, who owes who?' and you'll receive a summary of where the money goes.</p>
	    </div>
      	
      	<?php require_once WOW_ROOT . 'partials/body_left.php'; ?>
      	<?php require_once WOW_ROOT . 'partials/formula_fields.php'; ?>
		
		<?php require_once WOW_ROOT . 'partials/body_right.php'; ?>
		<?php require_once WOW_ROOT . 'partials/calculate.php'; ?>

<?php
	require_once WOW_ROOT . '/partials/footer.php';
?>