$(document).ready(function(){
   
    $( "#form" ).keypress(function(e) {
      if ( e.which == 13 ) {
         e.preventDefault();
      }
    });
    
    var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = '<input autocomplete="off" class="input" id="field' + next + '" name="name' + next + '" type="text" placeholder="Name"><input autocomplete="off" class="input" id="field' + next + '" name="howMuchOwed' + next + '" type="text" placeholder="Owes this much" data-items="8"><input autocomplete="off" class="input" id="field' + next + '" name="toWhom' + next + '" type="text" placeholder="To whom" data-items="8"><input autocomplete="off" class="input" id="field' + next + '" name="forWhat' + next + '" type="text" placeholder="For what" data-items="8">';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);  
        
            $('.remove-me').click(function(e){
                e.preventDefault();
                var fieldNum = this.id.charAt(this.id.length-1);
                var fieldID = "#field" + fieldNum;
                $(this).remove();
                $(fieldID).remove();
            });
    });
    

    
});

