var debt = {
	names : [],
	howMuchOweds: [],
	toWhoms: [],
	forWhats: []
}




for (name in names, howMuchOwed in howMuchOweds, toWhom in toWhoms, forWhat in forWhats) {
	debt.names.push($("#name").val());
	debt.howMuchOweds.push($("#howMuchOwed").val());
	debt.toWhoms.push($("#toWhom").val());
	debt.forWhats.push($("#forWhat").val());

	var $name_val_a = $("#name" + i).val();
    var $name_val_b = $("#name" + j).val();
    var $howMuchOwed_val_a = Number($("#howMuchOwed" + i).val());
    var $howMuchOwed_val_b = Number($("#howMuchOwed" + j).val());
    var $toWhom_val_a = $("#toWhom" + i).val();
    var $toWhom_val_b = $("#toWhom" + j).val();
    var $forWhat_val_a = $("#forWhat" + i).val();
    var $forWhat_val_b = $("#forWhat" + j).val();
}

function subtractDebts(name, howMuchOwed, toWhom, forWhat) {
	for (i = 1; i <= entries; i++) {
		for (j = 1; j <= entries; j++) {
			col[i][j] - col[j][i]
}