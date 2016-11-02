<?php
require_once dirname(__DIR__). '/database/functions.php';

// This will need to be a file locatated /core/ajax/store-debt.php
if (!isset($_POST['action']) or 'store-debt' !== $_POST['action'] ) {
	return;
}

$user = get_user();

if (!$user or !isset($_POST['accountId'])) {
	return;
}

$auth_user = new USER();
$user_id = $user['user_id'];
$account_id = $_POST['accountId'];

// $stmt = $auth_user->runQuery("SELECT id FROM accounts WHERE user_id=:user_id");
// $stmt->execute(array(":user_id"=>$user_id));

// $accounts = $stmt->fetchAll(PDO::FETCH_ASSOC);

// =====================================
// Store account in acounts table.
// =====================================
if( '' === $account_id and false !== $account_id) {
	;
	$stmt = $auth_user->runQuery("INSERT INTO accounts (user_id) VALUES (:user_id)");
	$account = $stmt->execute(array(":user_id"=>$user_id));	
	$account_id = $auth_user->db()->lastInsertId();
} else {
	$account_id = $_POST['accountId'];
}

// =====================================
// Store Debt details in Debts table.
// =====================================
$debt_ids = [];
foreach ($_POST['formData'] as $data) {
	$debt_id = isset($data['debtId']) ? $data['debtId'] : '';
	$from_whom = isset($data['fromWhom']) ? $data['fromWhom'] : '';
	$debt = isset($data['debt']) ? $data['debt'] : 0;
	$to_whom = isset($data['toWhom']) ? $data['toWhom'] : '';
	$for_what = isset($data['forWhat']) ? $data['forWhat'] : '';
	$index = isset($data['index']) ? $data['index'] : 0;

	if ( ''  === $debt_id ) {
		$stmt = $auth_user->runQuery("INSERT INTO debts (from_whom, debt, to_whom, for_what, `index`, account_id) VALUES (:from_whom, :debt, :to_whom, :for_what, :index, :account_id)");
		$account = $stmt->execute(array(":from_whom" => $from_whom, ":debt" => $debt, ":to_whom" => $to_whom, ":for_what" => $for_what, ":index" => $index, ":account_id" => $account_id));	
		$debt_id = $auth_user->db()->lastInsertId();
	} else {
		$stmt = $auth_user->runQuery("UPDATE debts SET from_whom=:from_whom, debt=:debt, to_whom=:to_whom, for_what=:for_what, account_id=:account_id, `index`=:index WHERE id=:id");
		$account = $stmt->execute(array(
			":from_whom" => $from_whom, 
			":debt" => $debt, 
			":to_whom" => $to_whom, 
			":for_what" => $for_what, 
			":index" => $index, 
			":account_id" => $account_id, 
			':id' => $debt_id,
		));	
		$debt_id = $auth_user->db()->lastInsertId();
	}

	$debt_ids[] = $debt_id;
}


// Delete all rows where account_id = $account_id AND debt_id is NOT in $debt_ids.

// if (!empty($debt_ids)) {
// 		$stmt = $auth_user->runQuery("DELETE FROM debts WHERE account_id=:account_id and id NOT IN (:debt_ids)");
// 		$stmt->execute(array(
// 			":account_id"=>$account_id, 
// 			":debt_ids"=> $debt_ids
// 		));
// }

// =============================================
// Delete all deleted debts from debts table
// =============================================

echo json_encode(compact('account_id', 'debt_ids', 'deleted_ids'));
exit();




