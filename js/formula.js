var owes = {};
var gets = {};

// // Dwolla Payment API
// var dwolla = require('dwolla-v2');

// var client = new dwolla.Client({
//   id: process.env."7259e012-3dd6-4524-b29f-d9a8d4a94186",
//   secret: process.env."xqiDkMjM4hkGLpBsxKN7E2l2rLAMI7MnHfjZ3zaX50TQESGQHY",
//   environment: 'sandbox',
// });

// Gather all the persons who owe money function
function Owes (from_whom, debt, for_what) {
	this.from_whom = from_whom;
	this.debt = debt;
	this.for_what = [for_what];
}

// Gather all the persons who get money function
function Gets (to_whom, debt, for_what) {
	this.to_whom = to_whom;
	this.debt = debt;
	this.for_what = [for_what];
}

// Convert to currency function
function formatCurrency(total) {
	var neg = false;
	if(total < 0) {
		neg = true;
		total = Math.abs(total);
	}
	return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
};

// Place objects into arrays sorted by debt function
function sortObject(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'name': prop,
                'debt': obj[prop].debt,
                'items': obj[prop].for_what
            });
        }
    }
    arr.sort(function(a, b) {
        return b.debt - a.debt;
    });
    return arr; // returns array
}


$(document).ready(function() {
// Field variables
    var $fromWhom = '<div class="col-xs-3"><input autocomplete="off" class="form-control" id="fromWhom" name="fromWhom" type="text" placeholder="From whom"></div>';
    var $debt = '<div class="col-xs-2"><label class="sr-only">Amount</label><div class="input-group"><div class="input-group-addon">$</div><input autocomplete="off" type="number" min="0" step="0.25" class="form-control" id="debt" name="debt" placeholder="Debt"></div></div>';
    var $toWhom = '<div class="col-xs-3"><input autocomplete="off" class="form-control" id="toWhom" name="toWhom" type="text" placeholder="To whom"></div>';
    var $forWhat = '<div class="col-xs-3"><input autocomplete="off" class="form-control" id="forWhat" name="forWhat" type="text" placeholder="For what"></div>';
	var $addButton = '<button class="btn btn-info btn-xs" id="addButton" type="button">+</button>';
	var $removeButton = '<button class="btn btn-warning btn-xs" id="removeButton" type="button">-</button>';

// Establish field counting and insert first field	
	var $count = 1;
	var $field = $('#field' + $count);
	var $fields = $('.form-group');
	var $firstIOU = '<div id="field' + $count + '">' + $fromWhom + $debt + $toWhom + $forWhat + $addButton + $removeButton + '</div>';
	$fields.append($firstIOU);

// Add field
	$('#addButton').click(function() {
	    $count += 1;
	    var $newIOU = '<div id="field' + $count + '">' + $fromWhom + $debt + $toWhom + $forWhat + '</div>';
	    $fields.append($newIOU);
	});

// Remove field
	$('#removeButton').click(function() {
		if ($count > 1) {
			$('#field' + $count).remove();
			$count -= 1;
		}
	});

	$('#calculate').click(function() {
// Clear old objects		
		for (var clearOwes in owes){
    		if (owes.hasOwnProperty(clearOwes)){
        	delete owes[clearOwes];
    		}
		}
		for (var clearGets in gets){
    		if (gets.hasOwnProperty(clearGets)){
        	delete gets[clearGets];
    		}
		}

		$('.results').empty();
		var $results = $('.results');

// Loops through fields and get inputs		
		for (i=1; i <= $count; i++) {
			var $fromWhom = $('#field' + i).find('#fromWhom').val();
			var $debt = parseFloat($('#field' + i).find('#debt').val());
			var $toWhom = $('#field' + i).find('#toWhom').val();
			var $forWhat = $('#field' + i).find('#forWhat').val();

// Validate input fields
			if ($fromWhom === "" || $debt === "" || $toWhom === "" || $forWhat === "" || $debt < 0) {
				$results.append("Please complete all fields and use positive dollar amounts.");
				break;
			}

// Merge the same persons who owe money
			if (owes.hasOwnProperty($fromWhom)) {
				owes[$fromWhom].debt += $debt;
				owes[$fromWhom].for_what.push($forWhat);
			}
			else if (!owes.hasOwnProperty($fromWhom)) {
				owes[$fromWhom] = new Owes($fromWhom, $debt, $forWhat);
			}
// Merge the same persons who get money
			if (gets.hasOwnProperty($toWhom)) {
				gets[$toWhom].debt += $debt;
			}
			else if (!gets.hasOwnProperty($toWhom)) {
				gets[$toWhom] = new Gets($toWhom, $debt, $forWhat);
			}
		}

// If someone owes and gets money, subtract what they get from what they owe or vise-versa
		for (var owes_gets in owes) {
			for (var gets_owes in gets) {
				if (owes[owes_gets].from_whom == gets[gets_owes].to_whom && owes[owes_gets].debt >= gets[gets_owes].debt) {
					owes[owes_gets].debt -= gets[gets_owes].debt;
					gets[gets_owes].debt = 0;
				}
				else if (owes[owes_gets].from_whom == gets[gets_owes].to_whom && owes[owes_gets].debt < gets[gets_owes].debt) {
					gets[gets_owes].debt -= owes[owes_gets].debt;
					owes[owes_gets].debt = 0;
				}
			}
		}

// Sort receives and owes by largest to smallest debt
		var $pays = sortObject(owes);
		var $receives = sortObject(gets);	
		
// Perform all the math calculations in order from largest to smallest
		while (($pays.length && $receives.length) > 0) {
// If payer owes zero, debts were assumed during merge. remove pay amount
			if ($pays[0].debt == 0) {
				var $payerZero = '<div>' + $pays[0].name + "'s debts were cancelled out for " + $pays[0].items.join("\, ") + '</div>';
				console.log($payerZero);
				$results.append($payerZero);
				$pays.shift();
			}
// If receiver receives zero, remove receive amount
			else if ($receives[0].debt == 0) {
				var $receiverZero = '<div>' + $receives[0].name + "'s debts were cancelled out for " + $receives[0].items.join("\, ") + '</div>';
				console.log($receiverZero);
				$results.append($receiverZero);
				$receives.shift();
			}
// If payer owes more money than receiver receives, subtract receive amount from pay amount, remove receive amount from array
			else if ($pays[0].debt > $receives[0].debt) {
				var $payerMore = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($receives[0].debt) + ' and is paid up on ' + $pays[0].items.join("\, ") + '</div>';
				console.log($payerMore);
				$results.append($payerMore);
				$pays[0].debt -= $receives[0].debt;
				$receives[0].debt -= $receives[0].debt;
				$receives.shift();
			}
// If receiver receives more money than payer owes, adjust new receive amount and zero out pay amount, remove pay amount from array 
			else if ($pays[0].debt < $receives[0].debt) {
				var $receiverMore = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($pays[0].debt) + ' and is paid up on ' + $pays[0].items.join("\, ") + '</div>';
				console.log($receiverMore);
				$results.append($receiverMore);
				$receives[0].debt -= $pays[0].debt;
				$pays[0].debt -= $pays[0].debt;
				$pays.shift();
			}
// If payer owes the same amount that the receiver receives, zero out both receive and pay amounts, remove pay and receive amounts
			else if (($pays[0].debt === $receives[0].debt) && (($pays[0].debt > 0) || ($receives[0].debt > 0))) {
				var $payerEqualReceiver = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($receives[0].debt) + ' and is paid up on ' + $pays[0].items.join("\, ") + '</div>';
				console.log($payerEqualReceiver);
				$results.append($payerEqualReceiver);
				$pays[0].debt -= $pays[0].debt;
				$receives[0].debt -= $receives[0].debt;
				$pays.shift();
				$receives.shift();
			}
		}	
	});
});