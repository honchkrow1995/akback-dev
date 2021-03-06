<div class="col-md-12 inventory_tab">
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-2 control-label">Cost:</label>
            <div class="col-sm-6">
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    <jqx-number-input id="item_cost" class="item_textcontrol"
                                      jqx-width="120" jqx-height="30"
                                      jqx-spin-buttons="false" jqx-input-mode="simple"
                                      jqx-symbol="''"
                                      jqx-decimal-digits="<?= $decimalsPrice; ?>"
                                      ng-change="onChangeCostFields()"
                                      ng-model="inventoryData.cost"
                                      data-field="Cost"
                    ></jqx-number-input>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-2 control-label">Cost Extra:</label>
            <div class="col-sm-6">
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    <jqx-number-input id="item_Cost_Extra" class="item_textcontrol"
                                      jqx-width="120" jqx-height="30"
                                      jqx-spin-buttons="false"
                                      jqx-input-mode="simple" jqx-symbol="''"
                                      jqx-decimal-digits="<?= $decimalsPrice; ?>"
                                      ng-change="onChangeCostFields()"
                                      ng-model="inventoryData.costExtra"
                                      data-field="Cost_Extra"
                    ></jqx-number-input>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-2 control-label">Cost Freight:</label>
            <div class="col-sm-6">
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    <jqx-number-input id="item_Cost_Freight" class="item_textcontrol"
                                      jqx-width="120" jqx-height="30"
                                      jqx-spin-buttons="false" jqx-input-mode="simple"
                                      jqx-symbol="''" ng-change="onChangeCostFields()"
                                      jqx-decimal-digits="<?= $decimalsPrice; ?>"
                                      ng-model="inventoryData.costFreight"
                                      data-field="Cost_Freight"
                    ></jqx-number-input>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-2 control-label">Cost Duty:</label>
            <div class="col-sm-6">
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    <jqx-number-input id="item_Cost_Duty" class="item_textcontrol"
                                      jqx-width="120" jqx-height="30"
                                      jqx-spin-buttons="false" jqx-input-mode="simple"
                                      jqx-symbol="''" ng-change="onChangeCostFields()"
                                      jqx-decimal-digits="<?= $decimalsPrice; ?>"
                                      ng-model="inventoryData.costDuty"
                                      data-field="Cost_Duty"
                    ></jqx-number-input>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-2 control-label">Cost Landed:</label>
            <div class="col-sm-6">
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    <jqx-number-input id="item_Cost_Landed" class="item_textcontrol"
                                      jqx-width="120" jqx-height="30"
                                      jqx-spin-buttons="false" jqx-input-mode="simple"
                                      jqx-symbol="''" ng-change="onChangeCostFields()"
                                      jqx-decimal-digits="<?= $decimalsPrice; ?>"
                                      ng-model="inventoryData.costLanded"
                                      ng-disabled="inventoryDisabled"
                    ></jqx-number-input>
                </div>
            </div>
        </div>
    </div>
</div>