// ' + count + ';
// var newIOU = "hello";
var count = 1;

$(document).ready(function() {
  
    $('#addButton').click(function() {
        count = count + 1;
        console.log(count);
        var name = '<input autocomplete="off" class="input" id="name' + count + '" name="name' + count + '" type="text" placeholder="Name">';
        var howMuchOwed = '<input autocomplete="off" class="input" id="howMuchOwed' + count + '" name="howMuchOwed' + count + '" type="text" placeholder="Owes this much">';
        var toWhom = '<input autocomplete="off" class="input" id="toWhom' + count + '" name="toWhom' + count + '" type="text" placeholder="To whom">';
        var forWhat = '<input autocomplete="off" class="input" id="forWhat' + count + '" name="forWhat' + count + '" type="text" placeholder="For what">';
        var newIOU = '<div id="field' + count + '">' + name + howMuchOwed + toWhom + forWhat + '</div>';
        $('.fields').prepend(newIOU);
    });
});