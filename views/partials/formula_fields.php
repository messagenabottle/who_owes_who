<?php
$debts = get_debts(0);

// $debts = array_merge($debts, $debts, $debts, $debts);
// $debts = array_values($debts);
?>

  <form onsubmit="return false;" class="form-inline" id="form" action="../js/formula.js" method="post">
    <div class="form">
    	<?php foreach ($debts as $key => $debt) { ?>
    		<?php $index = $key + 1; ?>
    		  <div class="fields clearfix" id="field<?php echo $index; ?>">
            <!-- From Whom Field -->
            <div class="form-group col-sm-12 col-md-3">
              <span class="input-group"><input autocomplete="off" class="form-control" id="fromWhom" name="fromWhom" type="text" placeholder="From whom">
              </span>
            </div>
            <!-- Amount Owed Field -->
            <div class="form-group col-sm-12 col-md-3">
              <span class="input-group"><label class="sr-only">Amount</label>
                <span class="input-group">
                  <span class="input-group-addon">$</span>
                  <input autocomplete="off" type="number" min="0" step="0.25" class="form-control" id="debt" name="debt" placeholder="Debt">
                </span>
              </span>
            </div>
            <!-- To Whom Field -->
            <div class="form-group col-sm-12 col-md-3">
              <span class="input-group">
                <input autocomplete="off" class="form-control" id="toWhom" name="toWhom" type="text" placeholder="To whom">
              </span>
            </div>
            <!-- For What Field -->
            <div class="form-group col-sm-12 col-md-3">
              <span class="input-group">
                <input autocomplete="off" class="form-control" id="forWhat" name="forWhat" type="text" placeholder="For what">
              </span>
            </div>
          <input type="hidden" value="<?php echo $debt_id ?>" name="debt_id" class="debt-id">
    		  </div>

    		
    	<?php } ?>
    </div>
  </form>
  </br>
</div>