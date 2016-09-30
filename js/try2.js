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

    // $('#removeButton').click(function() {
    //     if (count = 1) {
    //         count = 1;
    //     }

    //     else {
    //         count = count - 1;
    //     }

    //     // console.log(count);
    //     var name = '<input autocomplete="off" class="input" id="name' + count + '" name="name' + count + '" type="text" placeholder="Name">';
    //     var howMuchOwed = '<input autocomplete="off" class="input" id="howMuchOwed' + count + '" name="howMuchOwed' + count + '" type="text" placeholder="Owes this much">';
    //     var toWhom = '<input autocomplete="off" class="input" id="toWhom' + count + '" name="toWhom' + count + '" type="text" placeholder="To whom">';
    //     var forWhat = '<input autocomplete="off" class="input" id="forWhat' + count + '" name="forWhat' + count + '" type="text" placeholder="For what">';
    //     var newIOU = '<div id="field' + count + '">' + name + howMuchOwed + toWhom + forWhat + '</div>';
    //     $('.fields').prepend(newIOU);
    // });

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

                        //same name variables
                        var $nameSame_out = ["Mark", "Mark"];
                        var $howMuchOwedSame_out = [];
                        var $toWhomSame_out = ["Mark", "Jessie"];
                        var $forWhatSame_out = [];
                        
                        //two people owe each other variables
                        var $nameCross_out = [];
                        var $toWhomCross_out = [];
                        var $howMuchOwedCross_out = [];
                        var $forWhatCross_out = [];

                        //circular debt variables
                        var $howMuchOwedCirc_out = [];
                        var $nameCirc_out = [];
                        var $toWhomCirc_out = [];
                        var $forWhatCirc_out = [];

                        //single debt variables
                        var $nameSingle_out = [];
                        var $howMuchOwedSingle_out = [];
                        var $toWhomSingle_out = [];
                        var $forWhatSingle_out = [];
                        
                        //ignore if the payer and payee are the same name
                        if (($name_val_a == $toWhom_val_a) || ($name_val_b == $toWhom_val_b)) {
                            continue;
                        }

                        //consolidate lines that have the same payer and payee fields
                        else if (($name_val_a == $name_val_b) && ($toWhom_val_a == $toWhom_val_b)) {
                            
                            // If name exists in $nameSame_out array
                            if ($nameSame_out.indexOf($name_val_a) != -1) {
                                // Find index of existing name
                                var $index = $nameSame_out.indexOf($name_val_a);
                                // Add amounts and for what to existing names 
                                $nameSame_out[$index] = $name_val_a;
                                $howMuchOwedSame_out[$index] += howMuchOwed_val_b;
                                $toWhom[index] = $toWhom_val_a;
                                if ($forWhatSame_out.indexOf($forWhat_val_a) = -1) {
                                    $forWhatSame_out[index] += $forWhat_val_a;
                                }
                                $forWhatSame_out[index] += ', ' + $forWhat_val_b;
                            }

                            // Insert new name into $nameSame_out array
                            else {
                                $nameSame_out.push($name_val_a);
                                var $howMuchOwed_temp = $howMuchOwed_val_a + $howMuchOwed_val_b;
                                $howMuchOwedSame_out.push($howMuchOwed_temp);
                                $toWhomSame_out.push($toWhom_val_a);
                                //If $forWhat doesn't contain item, add it, then add forWhat_val_b
                                if ($forWhatSame_out.indexOf($forWhat_val_a) == -1) {
                                    $forWhatSame_out.push($forWhat_val_a);
                                }
                                $forWhatSame_out.push($forWhat_val_b);
                            }
                        }

                        //if two people owe each other, figure out difference
                        else if (($name_val_a == $toWhom_val_b) && ($name_val_b == $toWhom_val_a)) {
                            
                            var $howMuchOwedCross_temp = 0;
                            //If person A owes more than person B, add person A to array
                            if ($howMuchOwed_val_b < $howMuchOwed_val_a) {
                                if ($nameCross_out.indexOf($name_val_a) != -1) {
                                    var $index = $nameCross_out.indexOf($name_val_a);
                                    $nameCross_out[$index] = $name_val_a;
                                    $howMuchOwedCross_out[$index] == $howMuchOwed_val_a - $howMuchOwed_val_b;
                                    $toWhomCross_out[$index] = $toWhom_val_a;
                                    $forWhatCross_out[$index] = $forWhat_val_a + ' minus the cost of ' + $forWhat_val_b;
                                }
                                else if ($nameCross_out.indexOf($name_val_a) = -1) {
                                    $nameCross_out.push($name_val_a);
                                    $howMuchOwedCross_temp == $howMuchOwed_val_a - $howMuchOwed_val_b;
                                    $howMuchOwedCross_out.push($howMuchOwedCross_temp);
                                    $toWhomCross_out.push($toWhom_val_a);
                                    $forWhatCross_temp = $forWhat_val_a + ' minus the cost of ' + $forWhat_val_b;
                                    $forWhatCross_out.push($forWhatCross_temp);
                                }
                            }

                            //If person B owes more than person A, add person B to array
                            else if ($howMuchOwed_val_a < $howMuchOwed_val_b) {
                                if ($nameCross_out.indexOf($name_val_b) != -1) {
                                    var $index = $nameCross_out.indexOf($name_val_b);
                                    $nameCross_out[$index] = $name_val_b;
                                    $howMuchOwedCross_out[$index] == $howMuchOwed_val_b - $howMuchOwed_val_a;
                                    $toWhomCross_out[$index] = $toWhom_val_b;
                                    $forWhatCross_out[$index] = $forWhat_val_b + ' minus the cost of ' + $forWhat_val_a;
                                }
                                else if ($nameCross_out.indexOf($name_val_b) = -1) {
                                    $nameCross_out.push($name_val_b);
                                    $howMuchOwedCross_temp == $howMuchOwed_val_b - $howMuchOwed_val_a;
                                    $howMuchOwedCross_out.push($howMuchOwedCross_temp);
                                    $toWhomCross_out.push($toWhom_val_b);
                                    $forWhatCross_temp = $forWhat_val_b + ' minus the cost of ' + $forWhat_val_a;
                                    $forWhatCross_out.push($forWhatCross_temp);
                                }
                            }

                            //If person A and person B's debts cancel out, move on
                            else {
                                continue;
                            }
                        }

                        //Circular debts
                        //If Person A owes more than Person B, push to respective arrays.
                        else if (($toWhom_val_a = $name_val_b) && ($howMuchOwed_val_a >= $howMuchOwed_val_b)) {
                            var $howMuchOwed_temp_a = $howMuchOwed_val_a - $howMuchOwed_val_b;
                            var $howMuchOwed_temp_b = $howMuchOwed_val_b;
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
                            var $howMuchOwed_temp_a = $howMuchOwed_val_b - $howMuchOwed_val_a;
                            var $howMuchOwed_temp_b = $howMuchOwed_val_a;
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
                            $nameSingle_out.push($name_val_a);
                            $howMuchOwedSingle_out.push($howMuchOwed_val_a);
                            $toWhomSingle_out.push($toWhom_val_a);
                            $forWhatSingle_out.push($forWhat_val_a);
                        }
                        
                    }
                }
                

                var $same_out;
                var $cross_out;
                var $circ_out;
                var $single_out;
                var num;

                for (k = 0; num = $nameSame_out.length, k < num; k++) {
                    $same_out = $nameSame_out[k] + ' owes ' + $toWhomSame_out[k] + ' $' + $howMuchOwedSame_out[k] + ' for ' + $forWhatSame_out[k] + '.<p></p>'; 
                }

                for (l = 0; num = $nameCross_out.length, k < num; k++) {
                    $cross_out = $nameCross_out[k] + ' owes ' + $toWhomCross_out[k] + ' $' + $howMuchOwedCross_out[k] + ' for ' + $forWhatCross_out[k] + '.<p></p>'; 
                }

                for (m = 0; num = $nameCirc_out.length, k < num; k++) {
                    $circ_out = $nameCirc_out[k] + ' owes ' + $toWhomCirc_out[k] + ' $' + $howMuchOwedCirc_out[k] + ' for ' + $forWhatCirc_out[k] + '.<p></p>'; 
                }

                for (p = 0; num = $nameSingle_out.length, k < num; k++) {
                    $single_out = $nameSingle_out[k] + ' owes ' + $toWhomSingle_out[k] + ' $' + $howMuchOwedSingle_out[k] + ' for ' + $forWhatSingle_out[k] + '.<p></p>'; 
                }



                // foreach($same_out) {
                //     $same_out = $nameSame_out + ' owes ' + $toWhomSame_out + ' $' + $howMuchOwedSame_out + ' for ' + $forWhatSame_out + '.<p></p>';
                // }

                // foreach($cross_out) {
                //     $cross_out = $nameCross_out + ' owes ' + $toWhomCross_out + ' $' + $howMuchOwedCross_out + ' for ' + $forWhatCross_out + '.<p></p>';
                // }

                // foreach($circ_out) {
                //     $circ_out = $nameCirc_out + ' owes ' + $toWhomCirc_out + ' $' + $howMuchOwedCirc_out + ' for ' + $forWhatCirc_out + '.<p></p>';
                // }

                // foreach($single_out) {
                //     $single_out = $nameSingle_out + ' owes ' + $toWhomSingle_out + ' $' + $howMuchOwedSingle_out + ' for ' + $forWhatSingle_out + '.<p></p>';
                // }


                $('#results').append($same_out + $cross_out + $circ_out + $single_out);
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