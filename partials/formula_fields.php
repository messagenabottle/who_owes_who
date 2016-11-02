<?php
$account_id = isset($_GET['account']) ? $_GET['account'] : '';
$debts = [];

if ('' !== $account_id) {
  $debts = get_debts($account_id);
}

?>

  <form onsubmit="return false;" class="form-inline" id="form" action="../js/formula.js" method="post">
    <div class="form">
      <input type="hidden" value="<?php echo $account_id ?>" name="account_id" class="account_id">
      <?php if (empty($debts)) { ?>
      <div class="fields clearfix" id="field1">
        <!-- From Whom Field -->
        <div class="form-group col-sm-12 col-md-3">
          <span class="input-group"><input autocomplete="off" class="form-control" id="fromWhom" value=""  name="fromWhom" type="text" placeholder="From whom">
          </span>
        </div>
        <!-- Amount Owed Field -->
        <div class="form-group col-sm-12 col-md-3">
          <span class="input-group"><label class="sr-only">Amount</label>
            <span class="input-group">
              <span class="input-group-addon">$</span>
              <input autocomplete="off" type="number" min="0" step="0.25" class="form-control" id="debt" value="" name="debt" placeholder="Debt">
            </span>
          </span>
        </div>
        <!-- To Whom Field -->
        <div class="form-group col-sm-12 col-md-3">
          <span class="input-group">
            <input autocomplete="off" class="form-control" id="toWhom" name="toWhom" value="" type="text" placeholder="To whom">
          </span>
        </div>
        <!-- For What Field -->
        <div class="form-group col-sm-12 col-md-3">
          <span class="input-group">
            <input autocomplete="off" class="form-control" id="forWhat" name="forWhat" value="" type="text" placeholder="For what">
          </span>
        </div>
      <input type="hidden" value="" name="id" id="debt_id">
      </div>
      <?php } ?>

    	<?php foreach ($debts as $key => $debt) { ?>
    		<?php $index = $key + 1; ?>

    		  <div class="fields clearfix" id="field<?php echo $index; ?>">
            <!-- From Whom Field -->
            <div class="form-group col-sm-12 col-md-3">
              <span class="input-group"><input autocomplete="off" class="form-control" id="fromWhom" value="<?php echo $debt['from_whom'] ?>"  name="fromWhom" type="text" placeholder="From whom">
              </span>
            </div>
            <!-- Amount Owed Field -->
            <div class="form-group col-sm-12 col-md-3">
              <span class="input-group"><label class="sr-only">Amount</label>
                <span class="input-group">
                  <span class="input-group-addon">$</span>
                  <input autocomplete="off" type="number" min="0" step="0.25" class="form-control" id="debt" value="<?php echo $debt['debt'] ?>" name="debt" placeholder="Debt">
                </span>
              </span>
            </div>
            <!-- To Whom Field -->
            <div class="form-group col-sm-12 col-md-3">
              <span class="input-group">
                <input autocomplete="off" class="form-control" id="toWhom" name="toWhom" value="<?php echo $debt['to_whom'] ?>" type="text" placeholder="To whom">
              </span>
            </div>
            <!-- For What Field -->
            <div class="form-group col-sm-12 col-md-3">
              <span class="input-group">
                <input autocomplete="off" class="form-control" id="forWhat" name="forWhat" value="<?php echo $debt['for_what'] ?>" type="text" placeholder="For what">
              </span>
            </div>
          <input type="hidden" value="<?php echo $debt['id'] ?>" name="id" id="debt_id">
    		  </div>

    		  
    	<?php } ?>
    </div>
  </form>
  </br>
</div>