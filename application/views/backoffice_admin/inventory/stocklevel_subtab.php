<style>
    #stocklWind .row {
        margin: 0 0 12px;
    }
</style>
<div class="col-md-12 inventory_tab">
    <div class="row">
        <div class="col-md-8">
            <div class="form-group">
                <div class="">
                    <button class="btn btn-primary" ng-click="openStockWind()">
                        <img src="<?php echo base_url("assets/img/kahon.png") ?>"/>
                    </button>
                    Adjust Quantity
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <div>
                    <jqx-combo-box id="itemstock_locationCbx"
                                   jqx-settings="stockitemLocationSettings"
                                   jqx-on-select="onSelectStockLocationList($event)"
                    ></jqx-combo-box>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <div id="" style="overflow:auto; height:auto;">
                <jqx-grid id="stockLevelItemGrid"
                          jqx-settings="stockInventoryGrid"
                          jqx-create="stockInventoryGrid"
                          jqx-on-rowdoubleclick="editStockWind(e)"
                ></jqx-grid>
            </div>
        </div>
    </div>

</div>

<jqx-window id="stocklWind"
            jqx-settings="stockWind"
            jqx-create="stockWind">
    <div class="">
        Adjust Quantity
    </div>
    <div class="">
        <div class="row">
            <label  class="col-sm-3 control-label" style="text-align:right">Location:</label>

            <div class="col-sm-5">
                <jqx-combo-box id="stockl_location" class="stockl_input"
                               jqx-settings="stockitemLocation2Settings"
                               jqx-selected-index="<?php echo $station;?>"
                               jqx-on-select="onSelectLocationAdjustQty($event)">
                </jqx-combo-box>
            </div>
        </div>
        <div class="row">
            <label  class="col-sm-3 control-label" style="text-align:right">In Stock:</label>

            <div class="col-sm-5">
                <!-- ng-model="inventoryData.stockQty" -->
                <jqx-number-input id="stockl_currentQty" class="stockl_input"
                                  jqx-width="200" jqx-height="30"
                                  jqx-spin-buttons="false" jqx-input-mode="simple"
                                  jqx-symbol="''"
                                  jqx-decimal-digits="<?= $decimalsQuantity; ?>"
                                  ng-disabled="inventoryDisabled"
                ></jqx-number-input>
            </div>
        </div>
        <div class="row">
            <label  class="col-sm-3 control-label" style="text-align:right">Adjust Quantity:</label>

            <div class="col-sm-5">
                <jqx-number-input id="stockl_addremoveQty" class="stockl_input tochange"
                                  jqx-width="200" jqx-height="30"
                                  jqx-spin-buttons="false" jqx-input-mode="simple"
                                  jqx-symbol="''" ng-change="modifyCurrentQty(0)"
                                  jqx-decimal-digits="<?= $decimalsQuantity; ?>"
                                  ng-model="inventoryData.addremoveQty"
                ></jqx-number-input>
            </div>

        </div>
        <div class="row">
            <label  class="col-md-3 control-label" style="text-align:right">New Quantity</label>

            <div class="col-sm-5">
                <jqx-number-input id="stockl_newQty" class="stockl_input tochange "
                                  jqx-width="200" jqx-height="30"
                                  jqx-spin-buttons="false" jqx-input-mode="simple"
                                  jqx-symbol="''" ng-change="modifyCurrentQty(1)"
                                  jqx-decimal-digits="<?= $decimalsQuantity; ?>"
                                  ng-model="inventoryData.newQty"
                ></jqx-number-input>
            </div>
        </div>
        <div class="row">
            <label  class="col-md-3 control-label" style="text-align:right">Date</label>

            <div class="col-sm-5">
                <jqx-date-time-input
                    id="stockl_transDate" class="stockl_input"
                    jqx-format-string="d"
                ></jqx-date-time-input>
            </div>
        </div>
        <div class="row">
            <label  class="col-md-3 control-label" style="text-align:right">Time:</label>

            <div class="col-sm-5">
                <jqx-date-time-input
                    id="stockl_transTime" class="stockl_input"
                    jqx-format-string="'hh:mm tt'"
                    jqx-show-time-button="true"
                    jqx-show-calendar-button="false"
                ></jqx-date-time-input>
            </div>
        </div>
        <div class="row">
            <label  class="col-md-3 control-label" style="text-align:right">Comment:</label>

            <div class="col-sm-5">
                    <textarea id="stockl_comment" class="form-control stockl_input"
                        style="width: 220px;"></textarea>
            </div>
        </div>
        <!--  -->
        <br>
        <div id="mainButtonsStockl">
            <div class="col-md-8">
                <button type="button" ng-click="saveStockWind()"
                        id="saveStockBtn" class="btn btn-primary" disabled>Save</button>
                <button type="button" ng-click="closeStockWind()"
                        id="closeStockBtn" class="btn btn-warning">Close</button>
                <button type="button" ng-click="deleteStockWind()" style="display: none;"
                        id="deleteStockBtn" class="btn btn-danger">Delete</button>
            </div>
        </div>
        <div id="promptButtonsStockl" style="display:none; margin-top:10px; overflow:auto;">
            <div class="col-sm-8">
                Would you like to save your changes. <br>
                <button type="button" ng-click="closeStockWind(0)" class="btn btn-primary">Yes</button>
                <button type="button" ng-click="closeStockWind(1)" class="btn btn-warning">No</button>
                <button type="button" ng-click="closeStockWind(2)" class="btn btn-info">Cancel</button>
            </div>
        </div>
        <div id="deleteButtonsStockl" style="display:none; margin-top:10px; overflow:auto;">
            <div class="col-sm-8">
                Do you really want to delete it?<br>
                <button type="button" ng-click="deleteStockWind(0)" class="btn btn-primary">Yes</button>
                <button type="button" ng-click="deleteStockWind(1)" class="btn btn-warning">No</button>
                <button type="button" ng-click="deleteStockWind(2)" class="btn btn-info">Cancel</button>
            </div>
        </div>
    </div>
</jqx-window>
<input type="hidden" id="stationID" value="<?php echo $station; ?>">