<div class="row inventory_tab">
    <div class="col-md-12">
        <button class="btn btn-info" ng-click="openPrinterItemWin()" style="margin: 10px 0;">
            New Printer
        </button>
    </div>
    <div class="col-md-12">
        <jqx-grid id="printerItemTable"
                  jqx-settings="printerInventoryGridSettings"
                  jqx-create="printerInventoryGridSettings"
                  jqx-on-rowdoubleclick="updateItemPrinter()"
        >
        </jqx-grid>
    </div>
</div>
<jqx-window jqx-on-close="close()" jqx-settings="printerInvWindowSettings"
            jqx-create="printerInvWindowSettings" class="">
    <div>
        New Printer
    </div>
    <div>
        <div class="col-md-12 col-md-offset-0">
            <div class="row itemqFormContainer">
                <div style=" width:100%;float:left;">
                    <div style="float:left; padding:2px; width:500px;">
                        <div style="float:left; padding:8px; text-align:right; width:100px; font-weight:bold;">Printer:</div>
                        <div style="float:left; width:350px;">
                            <jqx-drop-down-list id="printerInvList"
                                                jqx-settings="printerInvList"
                                                jqx-width="'100%'"
                                                jqx-on-select="">
                            </jqx-drop-down-list>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="primaryCheckContainer">
                <div style=" width:100%;float:left;">
                    <div style="float:left; padding:2px; width:500px;">
                        <div style="float:left; padding:8px; text-align:right; width:100px; font-weight:bold;">Primary?</div>
                        <div style="float:left; width:350px;">
                            <jqx-check-box id="primaryPrinterChbox" style='margin: 10px 0 10px 0; float: left;'
                                jqx-checked="false"
                                jqx-theme="'summer'"
                                ng-disabled=""
                            ></jqx-check-box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main buttons before saving questions on current item -->
        <div class="col-md-12 col-md-offset-0">
            <div class="row">
                <div id="mainButtonsPrinterInv">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <button type="button" id="saveBtnPrinterInv" ng-click="saveItemPrinter()" class="btn btn-primary" disabled>
                                Save
                            </button>
                            <button	type="button" id="" ng-click="promptClosePrinterItemWin()" class="btn btn-warning">
                                Close
                            </button>
                            <button	type="button" id="deleteBtnPrinterInv" ng-click="beforeDeleteItemPrinter()" class="btn btn-danger" style="overflow:auto;">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Prompt before saving printers by item -->
        <div class="col-md-12 col-md-offset-0">
            <div class="row">
                <div id="promptToClosePrinterInv" class="" style="display: none">
                    <div class="form-group">
                        <div class="col-sm-12">
                            Do you want to save your changes?
                            <button type="button" ng-click="promptClosePrinterItemWin(0)" class="btn btn-primary">Yes
                            </button>
                            <button type="button" ng-click="promptClosePrinterItemWin(1)" class="btn btn-warning">No</button>
                            <button type="button" ng-click="promptClosePrinterItemWin(2)" class="btn btn-info">Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Prompt to delete itemp printer -->
        <div class="col-md-12 col-md-offset-0">
            <div class="row">
                <div id="promptDeletePrinterInv" style="display: none;">
                    <div class="form-group">
                        <div class="col-sm-12">
                            Are you sure you want to delete it?
                            <button type="button" ng-click="beforeDeleteItemPrinter(0)" class="btn btn-primary">Yes</button>
                            <button type="button" ng-click="beforeDeleteItemPrinter(1)" class="btn btn-warning">No</button>
                            <button type="button" ng-click="beforeDeleteItemPrinter(2)" class="btn btn-info">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- NOTIFICATIONS AREA -->
        <div class="col-md-12 col-md-offset-0">
            <div class="row">
                <jqx-notification jqx-settings="printerInventorySuccess"
                                  id="printerInventorySuccess">
                    <div id="notification-content"></div>
                </jqx-notification>
                <jqx-notification jqx-settings="printerInventoryError"
                                  id="printerInventoryError">
                    <div id="notification-content"></div>
                </jqx-notification>
                <div id="notif_printerInventory" style="width: 100%; height:60px; margin-top: 15px; background-color: #F2F2F2; border: 1px dashed #AAAAAA; overflow: auto;"></div>
            </div>
        </div>
    </div>
</jqx-window>