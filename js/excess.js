// variables for each person
var person = {
  name: [],
  owesThisMuch: [],
  toWhom: "",
  forWhat: ""
};

// person.forEach(function(formula) {
//     formula.preventDefault();

//     var form = document.getElementById(newIOU);






// document.getElementById("person").innerHTML = person.name;

// $name = person.name;
// $owesThisMuch = person.owesThisMuch;
// $toWhom = person.toWhom;
// $forWhat = person.forWhat;

// function owesMoney(name, owesThisMuch, toWhom, forWhat) {
// 	var dif = 0;
// 		for (var i = 0; i < person.length; i++) {
// 			for (var j = 0; j < person.length; j++) {
// 				var dif = person.owesThisMuch[j] - person.owesThisMuch[i];
// 				if (dif == 0) {
// 					return 0;
// 				}
// 				else {
// 					return dif;
// 				}
// 			}
// 		}
// };

// // Form
// $(document).ready(function(){
//     var next = 1;
//     $(".add-more").click(function(e){
//         e.preventDefault();
//         var addto = "#field" + next;
//         var addRemove = "#field" + (next);
//         next = next + 1;
//         var newIn = '<input autocomplete="off" class="input form-control" id="field' + next + '" name="field' + next + '" type="text">';
//         var newInput = $(newIn);
//         var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
//         var removeButton = $(removeBtn);
//         $(addto).after(newInput);
//         $(addRemove).after(removeButton);
//         $("#field" + next).attr('data-source',$(addto).attr('data-source'));
//         $("#count").val(next);  
        
//             $('.remove-me').click(function(e){
//                 e.preventDefault();
//                 var fieldNum = this.id.charAt(this.id.length-1);
//                 var fieldID = "#field" + fieldNum;
//                 $(this).remove();
//                 $(fieldID).remove();
//             });
//     });
// });
