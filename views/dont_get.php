<?php

	require_once 'partials/header.php';
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
      <?php 
		require_once 'partials/body_left.php';
		require_once 'partials/formula_fields.php';
		?>

      <!-- Place sample inputs in fields -->
      	<script>
    //   		while ($count < 5) {
	   //    		$('#addButton').click(function() {
				//     $count += 1;
				//     var $newIOU = '<div class="fields" id="field' + $count + '">' + $fromWhom + $debt + $toWhom + $forWhat + '</div>';
				//     $fields.append($newIOU);
				// });
    //   		}
	      	$(document).ready(function(){
				$('#field1').find('#fromWhom').val("Tom");
				$('#field1').find('#debt').val(35.00);
				$('#field1').find('#toWhom').val("Brad");
				$('#field1').find('#forWhat').val("Item 1");
				$('#field2').find('#fromWhom').val("Brad");
				$('#field2').find('#debt').val(83.00);
				$('#field2').find('#toWhom').val("Sally");
				$('#field2').find('#forWhat').val("Item 2");
				$('#field3').find('#fromWhom').val("Sally");
				$('#field3').find('#debt').val(28.00);
				$('#field3').find('#toWhom').val("Tom");
				$('#field3').find('#forWhat').val("Item 3");
				$('#field4').find('#fromWhom').val("Sally");
				$('#field4').find('#debt').val(34.00);
				$('#field4').find('#toWhom').val("Brad");
				$('#field4').find('#forWhat').val("Item 4");

				var debts = [
					{
						from : 'Tom',
						debt : 35.00,
						to   : 'Brad',
						for  : 'Item 1',
					},
					{
						from : 'Tom',
						debt : 35.00,
						to   : 'Brad',
						for  : 'Item 1',
					},
					{
						from : 'Tom',
						debt : 35.00,
						to   : 'Brad',
						for  : 'Item 1',
					},
					{
						from : 'Tom',
						debt : 35.00,
						to   : 'Brad',
						for  : 'Item 1',
					},
				];

				$.each(debts, function(key, value) {
					formula.count += 1;
				    var $newIOU = '<div class="fields clearfix" id="field' + formula.count + '">' + $fromWhom + $debt + $toWhom + $forWhat + '</div>';
				    $('.form').append($newIOU);
				    formula.updateIndexIds();

					// formula.addRow(value.from, value.debt, value.to, value.for);


				});			
		    });
		</script>

<!--       <div class="row">
	      <div class="col-sm-12 col-md-8">
		    <form action="js/formula.js" class="form-inline" id="form" method="post"
		    name="form" onsubmit="return false;">
		        <div class="form">
		            <div class="fields" id="field1">
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="fromWhom" name="fromWhom" placeholder=
		                    "From whom" type="text" value="Tom"></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><label class=
		                    "sr-only">Amount</label><span class=
		                    "input-group"><span class=
		                    "input-group-addon">$</span><input autocomplete="off"
		                    class="form-control" id="debt" min="0" name="debt"
		                    placeholder="Debt" step="0.25" type="number" value="35.00"></span></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="toWhom" name="toWhom" placeholder=
		                    "To whom" type="text" value="Brad"></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="forWhat" name="forWhat" placeholder=
		                    "For what" type="text" value="Item 1"></span>
		                </div>
		            </div>
		            <div class="fields" id="field2">
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="fromWhom" name="fromWhom" placeholder=
		                    "From whom" type="text" value="Brad"></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><label class=
		                    "sr-only">Amount</label><span class=
		                    "input-group"><span class=
		                    "input-group-addon">$</span><input autocomplete="off"
		                    class="form-control" id="debt" min="0" name="debt"
		                    placeholder="Debt" step="0.25" type="number" value="83.00"></span></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="toWhom" name="toWhom" placeholder=
		                    "To whom" type="text" value="Sally"></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="forWhat" name="forWhat" placeholder=
		                    "For what" type="text" value="Item 2"></span>
		                </div>
		            </div>
		            <div class="fields" id="field3">
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="fromWhom" name="fromWhom" placeholder=
		                    "From whom" type="text" value="Sally"></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><label class=
		                    "sr-only">Amount</label><span class=
		                    "input-group"><span class=
		                    "input-group-addon">$</span><input autocomplete="off"
		                    class="form-control" id="debt" min="0" name="debt"
		                    placeholder="Debt" step="0.25" type="number" value="28.00"></span></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="toWhom" name="toWhom" placeholder=
		                    "To whom" type="text" value="Tom"></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="forWhat" name="forWhat" placeholder=
		                    "For what" type="text" value="Item 3"></span>
		                </div>
		            </div>
		            <div class="fields" id="field4">
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="fromWhom" name="fromWhom" placeholder=
		                    "From whom" type="text" value="Sally"></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><label class=
		                    "sr-only">Amount</label><span class=
		                    "input-group"><span class=
		                    "input-group-addon">$</span><input autocomplete="off"
		                    class="form-control" id="debt" min="0" name="debt"
		                    placeholder="Debt" step="0.25" type="number" value="34.00"></span></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="toWhom" name="toWhom" placeholder=
		                    "To whom" type="text" value="Brad"></span>
		                </div>
		                <div class="form-group col-sm-12 col-md-3 ipad">
		                    <span class="input-group"><input autocomplete="off" class=
		                    "form-control" id="forWhat" name="forWhat" placeholder=
		                    "For what" type="text" value="Item 4"></span>
		                </div>
		            </div>
		        </div>
		    </form>
          <br>
      </div> -->
		<?php require_once 'partials/body_right.php'; ?>
		<?php require_once 'partials/calculate.php'; ?>

<?php
	require_once 'partials/footer.php';
?>