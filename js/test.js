$(document).ready(function(){
   
    $( "#form" ).keypress(function(e) {
      if ( e.which == 13 ) {
         e.preventDefault();
      }
    });
    
    var next = 1;
    $(".add-more").click(function(e) {
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div>';
        var removeButton = $(removeBtn);
        var name = '<input autocomplete="off" class="input" id="field' + next + '" name="name' + next + '" type="text" placeholder="Name" data-items="8">';
        var howMuchOwed = '<input autocomplete="off" class="input" id="field' + next + '" name="howMuchOwed' + next + '" type="text" placeholder="Owes this much" data-items="8">';
        var toWhom = '<input autocomplete="off" class="input" id="field' + next + '" name="toWhom' + next + '" type="text" placeholder="To whom" data-items="8">';
        var forWhat = '<input autocomplete="off" class="input" id="field' + next + '" name="forWhat' + next + '" type="text" placeholder="For what" data-items="8">';
        var newIn = '<div id="field' + next + '">' + name + howMuchOwed + toWhom + forWhat  + removeBtn + '</div>';
        console.log(newIn);
        var newInput = $(newIn);
        // $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);  
        $(addto).after(newInput);
        // $(addRemove).after(removeButton);
        
        $('.remove-me').click(function(e) {
            e.preventDefault();
            var fieldNum = this.id.charAt(this.id.length-1);
            var fieldID = "#field" + fieldNum;
            $(this).remove();
            $(fieldID).remove();
            console.log(fieldNum);
            });

        // $("#submit").click(function(){
        // $.ajax({
        //  type: 'POST',
        //  url: "mysubmitpage.php",
        //  data: $('#addCommentForm').serialize(), 
        //  success: function(response) {
        //     alert("Submitted comment"); 
        //      $("#commentList").append("Name:" + $("#name").val() + "<br/>comment:" + $("#body").val());
        //  },
        // error: function() {
        //      //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
        //     alert("There was an error submitting comment");
        // }
        // });
    });
    

    
});

