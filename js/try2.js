var debt = {
	names: [],
	howMuchOweds: [],
	toWhoms: [],
	forWhats: []
}

$(document).ready(function() {

	var $count = 1;
	var $field = $("#field" + $count);
	var $fields = $('.fields');
	console.log($field);

    var $name = '<input autocomplete="off" class="input" id="name" name="name" type="text" placeholder="Name">';
    var $howMuchOwed = '<input autocomplete="off" class="input" id="howMuchOwed" name="howMuchOwed" type="text" placeholder="Owes this much">';
    var $toWhom = '<input autocomplete="off" class="input" id="toWhom" name="toWhom" type="text" placeholder="To whom">';
    var $forWhat = '<input autocomplete="off" class="input" id="forWhat" name="forWhat" type="text" placeholder="For what">';
	var $addButton = '<button id="addButton" type="button">+</button>';
	var $removeButton = '<button id="removeButton" type="button">-</button>';
	var $firstIOU = '<div id="field' + $count + '">' + $name + $howMuchOwed + $toWhom + $forWhat + $addButton + $removeButton + '</div>';
	$fields.append($firstIOU);

	$('#addButton').click(function() {
	    $count += 1;
	    console.log($count);
	    var $newIOU = '<div id="field' + $count + '">' + $name + $howMuchOwed + $toWhom + $forWhat + '</div>';
	    $fields.append($newIOU);
	});

	$('#removeButton').click(function() {
		if ($count > 1) {
			$('#field' + $count).remove();
			$count -= 1;
			console.log($count);
		}
	});

	$('#calculate').click(function() {
		
	})


	// for (name in names, howMuchOwed in howMuchOweds, toWhom in toWhoms, forWhat in forWhats) {
	// 	debt.names.push($("#name").val());
	// 	debt.howMuchOweds.push($("#howMuchOwed").val());
	// 	debt.toWhoms.push($("#toWhom").val());
	// 	debt.forWhats.push($("#forWhat").val());

	// 	var $name_val_a = $("#name" + i).val();
	//     var $name_val_b = $("#name" + j).val();
	//     var $howMuchOwed_val_a = Number($("#howMuchOwed" + i).val());
	//     var $howMuchOwed_val_b = Number($("#howMuchOwed" + j).val());
	//     var $toWhom_val_a = $("#toWhom" + i).val();
	//     var $toWhom_val_b = $("#toWhom" + j).val();
	//     var $forWhat_val_a = $("#forWhat" + i).val();
	//     var $forWhat_val_b = $("#forWhat" + j).val();
	// }

	// function subtractDebts(name, howMuchOwed, toWhom, forWhat) {
	// 	for (i = 1; i <= entries; i++) {
	// 		for (j = 1; j <= entries; j++) {
	// 			col[i][j] - col[j][i]
	// }
});