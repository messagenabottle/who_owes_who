// ' + count + ';
// var newIOU = "hello";
var count = 1;
var persons = [];

$(document).ready(function() {
  
    $('#addButton').click(function() {
        count = count + 1;
        // console.log(count);
        var name = '<input autocomplete="off" class="input" id="name' + count + '" name="name' + count + '" type="text" placeholder="Name">';
        var howMuchOwed = '<input autocomplete="off" class="input" id="howMuchOwed' + count + '" name="howMuchOwed' + count + '" type="text" placeholder="Owes this much">';
        var toWhom = '<input autocomplete="off" class="input" id="toWhom' + count + '" name="toWhom' + count + '" type="text" placeholder="To whom">';
        var forWhat = '<input autocomplete="off" class="input" id="forWhat' + count + '" name="forWhat' + count + '" type="text" placeholder="For what">';
        var newIOU = '<div id="field' + count + '">' + name + howMuchOwed + toWhom + forWhat + '</div>';
        $('.fields').prepend(newIOU);
    });

    // $("div:field" + count).text( "<b>Some</b> new text." );

    // .each()

    var math = {
    };

    $('#calculate').click(function() {
        //How many entries
        var entries = $("div").length - 2;
        // console.log(entries);


        $.ajax({url: math.result,
            type: 'POST',
            success: function(data) {

                for (i = 1; i <= entries; i++) {
                    var $name_val = $("#name" + i).val();
                    // console.log($name_val);
                    var $toWhom_val = $("#toWhom" + i).val();
                    var $howMuchOwed_val = Number($("#howMuchOwed" + i).val());
                    var $forWhat_val = $("#forWhat" + i).val();

                    for (j = 2; j <= entries ; j++) {
                        if (($name_val == $("#name" + j).val()) && ($toWhom_val == $("#toWhom" + j).val())) {
                            console.log($toWhom_val);
                            console.log($("#toWhom" + j).val());
                            $howMuchOwed_val += Number($("#howMuchOwed" + j).val());
                            $forWhat_val = "multiple items";
                            i++;
                        }
                    }


                    var $output = $name_val + ' owes ' + $toWhom_val + ' $' + $howMuchOwed_val + ' for ' + $forWhat_val + '.<p></p>';
                    $('#results').append($output);
                    }
            }});
    });

        
    // function calculate(callback, keywords) {

    //   $.ajax({
    //     url: api.root + "/discover/movie",
    //     data: {
    //       api_key: api.token,
    //       with_keywords: keywords
    //     },
    //     success: function(response) {
    //       model.browseItems = response.results;
    //       callback(response);
    //     }
    //   });
    // }
});