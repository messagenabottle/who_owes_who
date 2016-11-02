// Perform all the math calculations in order from largest to smallest
		while (($pays.length || $receives.length) > 0) {

			// var paysDebt = (typeof $pays[0] === 'undefined') ? false : $pays[0].debt;
			// if (paysDebt !== false && ...for each condition below)

			// If payer owes more money than receiver receives, subtract receive amount from pay amount, remove receive amount from array
			if ($pays[0].debt > $receives[0].debt) {
				var $payerMore = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($receives[0].debt) + ' for ' + $pays[0].items.join("\, ") + '</div>';
				$results.append($payerMore);
				$pays[0].debt -= $receives[0].debt;
				$receives[0].debt -= $receives[0].debt;
				$receives.shift();
			}
			// If receiver receives more money than payer owes, adjust new receive amount and zero out pay amount, remove pay amount from array 
			else if ($pays[0].debt < $receives[0].debt) {
				var $receiverMore = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($pays[0].debt) + ' for ' + $pays[0].items.join("\, ") + '</div>';
				// console.log($receiverMore);
				$results.append($receiverMore);
				$receives[0].debt -= $pays[0].debt;
				$pays[0].debt -= $pays[0].debt;
				$pays.shift();
			}
			// If payer owes the same amount that the receiver receives, zero out both receive and pay amounts, remove pay and receive amounts
			else if (($pays[0].debt === $receives[0].debt) && (($pays[0].debt > 0) || ($receives[0].debt > 0))) {
				var $payerEqualReceiver = '<div>' + $pays[0].name + ' owes ' + $receives[0].name + ' ' + formatCurrency($receives[0].debt) + ' for ' + $pays[0].items.join("\, ") + '</div>';
				$results.append($payerEqualReceiver);
				$pays[0].debt -= $pays[0].debt;
				$receives[0].debt -= $receives[0].debt;
				$pays.shift();
				$receives.shift();
			}
			// If payer owes zero, debts were assumed during merge. remove pay amount
			else if ($pays[0] !== undefined && $pays[0].debt == 0) {
				var $payerZero = '<div>' + $pays[0].name + "'s debts were cancelled out for " + $pays[0].items.join("\, ") + '</div>';
				$results.append($payerZero);
				$pays.shift();
			}
			// If receiver receives zero, remove receive amount
			else if ($receives[0] !== undefined && $receives[0].debt == 0) {
				var $receiverZero = '<div>' + $receives[0].name + "'s debts were cancelled out for " + $receives[0].items.join("\, ") + '</div>';
				$results.append($receiverZero);
				$receives.shift();
			}
		}	
