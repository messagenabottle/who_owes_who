<?php
// This will need to be a file locatated /core/ajax/store-debt.php
if (!isset($_POST['action']) or 'store-debt' !== $_POST['action'] ) {
	return;
}

if ( !$_POST['formData']['debtId'] ) {
	// Insert new row.
	return;
}

$debt_id = $_POST['formData']['debtId'];
// Update row where debt_id = $debt_id