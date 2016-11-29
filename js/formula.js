// Establish Owes and Gets Objects
var owes = {};
var gets = {};

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

// Establish counting for adding and subtracting rows
var formula = {
	count : 0,
};

// Add row function
formula.addRow = function($fromWhom, $debt, $toWhom, $forWhat) {
	$fromWhom = (typeof $fromWhom === 'undefined') ? '' : $fromWhom;
	$debt = (typeof $debt === 'undefined') ? '' : $debt;
	$toWhom = (typeof $toWhom === 'undefined') ? '' : $toWhom;
	$forWhat = (typeof $forWhat === 'undefined') ? '' : $forWhat;

    formula.count += 1;
    var $newIOU = '<div class="fields clearfix" id="field' + formula.count + '">' + $fromWhom + $debt + $toWhom + $forWhat + '</div>';
    $('.form').append($newIOU);
    formula.updateIndexIds();
};

// Remove row function
formula.removeRow = function() {
	var $fields = $('#form .fields');
	if ($fields.length > 1) {
			$fields.last().remove();
			formula.updateIndexIds();
		}
};

// Keep track of number of rows
formula.updateIndexIds = function() {
	$('.form .fields').each(function(index) {
		var $field = $( this );
		var count = index + 1;

		$field.prop('id', 'field'+count);
	});
};


$(document).ready(function() {
	// Field variables
    var $fromWhom = '<div class="form-group col-sm-12 col-md-3"><span class="input-group"><input autocomplete="off" class="form-control" id="fromWhom" name="fromWhom" type="text" placeholder="From whom"></span></div>';
    var $debt = '<div class="form-group col-sm-12 col-md-3"><span class="input-group"><label class="sr-only">Amount</label><span class="input-group"><span class="input-group-addon">$</span><input autocomplete="off" type="number" min="0" step="0.25" class="form-control" id="debt" name="debt" placeholder="Debt"></span></span></div>';
    var $toWhom = '<div class="form-group col-sm-12 col-md-3"><span class="input-group"><input autocomplete="off" class="form-control" id="toWhom" name="toWhom" type="text" placeholder="To whom"></span></div>';
    var $forWhat = '<div class="form-group col-sm-12 col-md-3"><span class="input-group"><input autocomplete="off" class="form-control" id="forWhat" name="forWhat" type="text" placeholder="For what"></span></div>';
	var $addButton = '<div class="btn-group"><button class="add_Btn" id="addButton" type="button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Debt</button></div>';
	var $removeButton = '<div class="btn-group"><button class="remove_Btn" id="removeButton" type="button"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Debt</button></div>';

	// Insert add and remove button functionality
	$('#addRemove').html($addButton + $removeButton);

	// Add additional fields when addButton is clicked
	$('#addButton').click(function() {
	    formula.addRow($fromWhom, $debt, $toWhom, $forWhat);
	});

	// Remove field when removeButton is clicked
	$('#removeButton').click(function() {
		formula.removeRow();
	});

	// Calculate figures
	$('#calculate').click(function() {
		var formData = [];

		// Clear old owes and gets objects		
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

		// Clear previous user view results
		$('.results').empty();
		var $results = $('.results');


		// Loops through fields and get inputs		
		formula.count = $('#form .fields').length;
		for (i=1; i <= formula.count; i++) {
			var $debtId = $('#field' + i).find('#debt_id').val();
			var $fromWhom = $('#field' + i).find('#fromWhom').val();
			var $debt = parseFloat($('#field' + i).find('#debt').val());
			var $toWhom = $('#field' + i).find('#toWhom').val();
			var $forWhat = $('#field' + i).find('#forWhat').val();
			
			// Push field data to formData object for database
			formData.push({
				debtId: $debtId,
				fromWhom: $fromWhom,
				debt: $debt,
				toWhom: $toWhom,
				forWhat: $forWhat,
				index: i,
			});	

			// Validate input fields
			if ($fromWhom === "" || $debt === "" || $toWhom === "" || $forWhat === "" || $debt < 0) {
				$results.append("Please complete all fields and use positive dollar amounts.");
				break;
			}
			else if ($.isNumeric($debt) == false) {
				$results.append("Please enter only number values for your debts.");
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
		while (($pays.length || $receives.length) > 0) {
			
			// Avoid performing function on undefined pays array
			if ($pays[0] === undefined && $receives.length > 0) {
				$receives.shift();
				continue;
			}

			// Avoid performing function on undefined receives array
			if ($receives[0] === undefined && $pays.length > 0) {
				$pays.shift();
				continue;
			}

			// If payer owes zero, debts were assumed during merge. remove pay amount
			if ($pays[0] !== undefined && $pays[0].debt == 0) {
				var $payerZero = '<div>' + $pays[0].name + "'s debts were cancelled out for " + $pays[0].items.join("\, ") + '</div>';
				$results.append($payerZero);
				$pays.shift();
			}
			// If receiver receives zero, remove receive amount
			if ($receives[0] !== undefined && $receives[0].debt == 0) {
				var $receiverZero = '<div>' + $receives[0].name + "'s debts were cancelled out for " + $receives[0].items.join("\, ") + '</div>';
				$results.append($receiverZero);
				$receives.shift();
			}
			// If payer owes more money than receiver receives, subtract receive amount from pay amount, remove receive amount from array
			if ($pays[0].debt > $receives[0].debt) {
				var $payerMore = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($receives[0].debt) + ' for ' + $pays[0].items.join("\, ") + '</div>';
				$results.append($payerMore);
				$pays[0].debt -= $receives[0].debt;
				$receives[0].debt -= $receives[0].debt;
				$receives.shift();
			}
			// If receiver receives more money than payer owes, adjust new receive amount and zero out pay amount, remove pay amount from array 
			if ($pays[0].debt < $receives[0].debt) {
				var $receiverMore = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($pays[0].debt) + ' for ' + $pays[0].items.join("\, ") + '</div>';
				$results.append($receiverMore);
				$receives[0].debt -= $pays[0].debt;
				$pays[0].debt -= $pays[0].debt;
				$pays.shift();
			}
			// If payer owes the same amount that the receiver receives, zero out both receive and pay amounts, remove pay and receive amounts
			if (($pays[0].debt === $receives[0].debt) && (($pays[0].debt > 0) || ($receives[0].debt > 0))) {
				var $payerEqualReceiver = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($receives[0].debt) + ' for ' + $pays[0].items.join("\, ") + '</div>';
				$results.append($payerEqualReceiver);
				$pays[0].debt -= $pays[0].debt;
				$receives[0].debt -= $receives[0].debt;
				$pays.shift();
				$receives.shift();
			}
		}	


		// AJAX Request.
		var ajaxData = {
			accountId : $('input[name="account_id"]').val(),
			formData : formData,
			action: 'store-debt',
		};

		$.post('/core/ajax/store-debt.php', ajaxData, function(data, textStatus,jqXHR) {
			console.log(data);
		});

	});
});