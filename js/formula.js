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

                //clear previous results
                $('#results').empty();

                //declare global variables
                var $howMuchOwed = 0;
                var $forWhat = "";
                
                var $name_out = "";
                var $toWhom_out = "";
                var $howMuchOwed_out = 0;
                var $forWhat_out = "";
                
                var $name_mult_out = "";
                var $toWhom_mult_out = "";
                var $howMuchOwed_mult_out = 0;
                var $forWhat_mult_out = "";

                
                //loops to compare lines
                for (i = 1; i <= entries; i++) {
                    for (j = 1; j <= entries; j++) {
                        
                        //declare loop variables
                        var $name_val_a = $("#name" + i).val();
                        var $name_val_b = $("#name" + j).val();
                        var $howMuchOwed_val_a = Number($("#howMuchOwed" + i).val());
                        var $howMuchOwed_val_b = Number($("#howMuchOwed" + j).val());
                        var $toWhom_val_a = $("#toWhom" + i).val();
                        var $toWhom_val_b = $("#toWhom" + j).val();
                        var $forWhat_val_a = $("#forWhat" + i).val();
                        var $forWhat_val_b = $("#forWhat" + j).val();

                        //ignore if the payer and payee are the same name
                        if (($name_val_a == $toWhom_val_a) || ($name_val_b == $toWhom_val_b)) {
                            continue;
                        }

                        //consolidate lines that have the same payer and payee fields
                        var $nameSame_out = [];
                        var $howMuchOwedSame_out = [];
                        var $toWhomSame_temp = toWhom_val_b;
                        var $toWhomSame_out = [];
                        var $forWhatSame_out = [];
                        else if (($name_val_a == $name_val_b) && ($toWhom_val_a == $toWhom_val_b)) {
                            if ($nameSame_out.indexOf($name_val_a) != -1) {
//figure out what variable to put in the index                                $howMuchOwedSame_out[] += howMuchOwed_val_b;
                            }

                            else {

                            }

                            var $howMuchOwed_temp == $howMuchOwed_val_a + $howMuchOwed_val_b;
                            var $forWhat_temp = $forWhat_val_a + ', ' + $forWhat_val_b;
                            $name_mult_out = $name_val_a;
                            $toWhom_mult_out = $toWhom_a;
                            $howMuchOwed_mult_out += $howMuchOwed_temp;
                            $forWhat_mult_out += $forWhat_temp;
                        }

                        //if two people owe each other, figure out difference
                        else if (($name_val_a == $toWhom_val_b) && ($name_val_b == $toWhom_val_a)) {
                            var $howMuchOwed_temp == 0;
                            if ($howMuchOwed_val_a <= $howMuchOwed_val_b) {
                                $name_out = $name_val_b;
                                $toWhom_out = $toWhom_val_b
                                $howMuchOwed_temp == $howMuchOwed_val_b - $howMuchOwed_val_a;
                                $forWhat_temp = $forWhat_val_b + ' minus the cost of ' + $forWhat_val_a + ' ';
                                $forWhat_out += $forWhat_temp;
                            }
                            else {
                                $name_out = $name_val_a;
                                $toWhom_out = $toWhom_val_a
                                $howMuchOwed_temp == $howMuchOwed_val_a - $howMuchOwed_val_b;
                                $forWhat_temp = $forWhat_val_a + ' minus the cost of ' + $forWhat_val_b + ' ';
                                $forWhat_out += $forWhat_temp;
                            }
                        }

                        //Circular debts
                        var $howMuchOwedCirc_out = [];
                        var $nameCirc_out = [];
                        var $toWhomCirc_out = [];
                        var $forWhatCirc_out = [];

                        //If Person A owes more than Person B, push to respective arrays.
                        else if (($toWhom_val_a = $name_val_b) && ($howMuchOwed_val_a >= $howMuchOwed_val_b)) {
                            var $howMuchOwed_temp_a == $howMuchOwed_val_a - $howMuchOwed_val_b;
                            var $howMuchOwed_temp_b == $howMuchOwed_val_b;
                            $howMuchOwedCirc_out.push($howMuchOwed_temp_a);
                            $howMuchOwedCirc_out.push($howMuchOwed_temp_b);
                            var $nameCirc_temp_a = $name_val_a;
                            var $nameCirc_temp_b = $name_val_b;
                            $nameCirc_out.push($nameCirc_temp_a);
                            $nameCirc_out.push($nameCirc_temp_b);
                            var $toWhomCirc_temp_a = $toWhom_val_a;
                            var $toWhomCirc_temp_b = $toWhom_val_b;
                            $toWhomCirc_out.push($toWhomCirc_temp_a);
                            $toWhomCirc_out.push($toWhomCirc_temp_b);
                            var $forWhatCirc_temp_a = $forWhat_val_a;
                            var $forWhatCirc_temp_b = $forWhat_val_b;
                            $forWhatCirc_out.push($forWhatCirc_temp_a);
                            $forWhatCirc_out.push($forWhatCirc_temp_b);
                        }

                        //If Person A owes less than Person B, push to respective arrays.
                        else if (($toWhom_val_a = $name_val_b) && ($howMuchOwed_val_a < $howMuchOwed_val_b)) {
                            var $nameCirc_temp_a = $name_val_b;
                            var $nameCirc_temp_b = $name_val_a;
                            $nameCirc_out.push($nameCirc_temp_a);
                            $nameCirc_out.push($nameCirc_temp_b);
                            var $howMuchOwed_temp_a == $howMuchOwed_val_b - $howMuchOwed_val_a;
                            var $howMuchOwed_temp_b == $howMuchOwed_val_a;
                            $howMuchOwedCirc_out.push($howMuchOwed_temp_a);
                            $howMuchOwedCirc_out.push($howMuchOwed_temp_b);
                            var $toWhomCirc_temp_a = $toWhom_val_b;
                            var $toWhomCirc_temp_b = $toWhom_val_a;
                            $toWhomCirc_out.push($toWhomCirc_temp_a);
                            $toWhomCirc_out.push($toWhomCirc_temp_b);
                            var $forWhatCirc_temp_a = $forWhat_val_b;
                            var $forWhatCirc_temp_b = $forWhat_val_a;
                            $forWhatCirc_out.push($forWhatCirc_temp_a);
                            $forWhatCirc_out.push($forWhatCirc_temp_b);
                        }

                        else {
                            var $nameSingle_out.push($name_val_a);
                            var $howMuchOwedSingle_out.push($howMuchOwed_val_a);
                            var $toWhomSingle_out.push($toWhom_val_a);
                            var $forWhatSingle_out.push($forWhat_val_a);
                        }
                        
                        console.log($howMuchOwed_mult);
                        console.log($howMuchOwed_);
                        var $output_mult = $name_mult + ' owes ' + $toWhom_mult + ' $' + $howMuchOwed_mult + ' for ' + $forWhat_mult + '.<p></p>';
                        var $output = $name_val_a + ' owes ' + $toWhom_val + ' $' + $howMuchOwed_val + ' for ' + $forWhat_val + '.<p></p>';
                        $('#results').append($output_mult + $output);
                    }
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