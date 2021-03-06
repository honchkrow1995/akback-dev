<div class="gridContentTab">
    <div class="col-md-12">
        <button class="btn btn-info" ng-click="openInventoryWind()" style="margin: 10px 0;">
            New Item
        </button>
    </div>
    <div class="col-md-12">
        <jqx-grid id="inventoryItemsGrid"
                  jqx-settings="inventoryItemsGrid"
                  jqx-on-rowdoubleclick="editInventoryWind(e)"
                  jqx-create="inventoryItemsGrid"
        ></jqx-grid>
    </div>
    <jqx-window jqx-on-close="closeInventoryWind($event)" jqx-settings="itemsInventoryWindowSettings"
                jqx-create="itemsInventoryWindowSettings" id="invMainWindow">
        <div>
            New Item | Details
        </div>
        <div flow-init flow-name="uploader.flow"
             flow-files-submitted="submitUpload($files, $event, $flow)"
             flow-file-added="fileAddedUpload($file, $event, $flow)"
             flow-file-success="successUpload($file, $message, $flow)">
            <jqx-tabs jqx-width="'100%'"
                      jqx-on-selecting=""
                      id="inventoryTabs">
                <ul>
                    <li>Item</li>
                    <li>Cost</li>
                    <li>Prices</li>
                    <li>Stock Level</li>
                    <li>Tax</li>
                    <li>Barcode</li>
                    <li>Questions</li>
                    <li>Printers</li>
                    <li>Options</li>
                    <li id="picture_tab">Picture</li>
                </ul>
                <!-- Item subtab -->
                <div class="">
                    <?php $this->load->view($inventory_item_subtab_view); ?>
                </div>
                <!-- Cost subtab -->
                <div class="">
                    <?php $this->load->view($inventory_cost_subtab_view); ?>
                </div>
                <!-- Price subtab -->
                <div class="">
                    <?php $this->load->view($inventory_price_subtab_view); ?>
                </div>
                <!-- Stock Level subtab -->
                <div class="">
                    <?php $this->load->view($inventory_stocklevel_subtab_view); ?>
                </div>
                <!-- Tax subtab -->
                <div class="">
                    <?php $this->load->view($inventory_tax_subtab_view); ?>
                </div>
                <!-- Barcode subtab -->
                <div class="">
                    <?php $this->load->view($inventory_barcode_subtab_view); ?>
                </div>
                <!-- Question subtab -->
                <div class="">
<!--                    --><?php //$this->load->view($items_questions_subtab_view); ?>
                    <?php $this->load->view($inventory_question_subtab_view); ?>
                </div>
                <!-- Printer subtab -->
                <div class="">
                    <?php $this->load->view($inventory_printer_subtab_view); ?>
                </div>
                <!-- Options subtab -->
                <div class="">
                    <?php $this->load->view($inventory_options_subtab_view); ?>
                </div>
                <!-- Picture subtab -->
                <div class="">
                    <?php $this->load->view($inventory_picture_subtab_view); ?>
                </div>
            </jqx-tabs>

            <!-- Main buttons before saving item on grid -->
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <div id="mainButtonsOnItemInv" class="rowMsgInv">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <span class="btn btn-success" id="uploadItemPictureBtn" flow-btn style="display: none;">
                                    Upload Picture
                                </span>
                                <button type="button" id="saveInventoryBtn" ng-click="saveInventoryAction()"
                                        class="btn btn-primary" disabled>
                                    Save
                                </button>
                                <button type="button" ng-click="closeInventoryAction()" class="btn btn-warning">Close</button>
<!--                                <button type="button" id="deleteInventoryBtn" ng-click="deleteInventoryAction()" class="btn btn-danger"-->
<!--                                        style="overflow:auto;display: none;">Delete-->
<!--                                </button>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Prompt before saving item on grid -->
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <div id="promptCloseItemInv" class="rowMsgInv" style="display: none">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <div class="message">Do you want to save your changes?</div>
                                <button type="button" ng-click="closeInventoryAction(0)" class="btn btn-primary">Yes</button>
                                <button type="button" ng-click="closeInventoryAction(1)" class="btn btn-warning">No</button>
                                <button type="button" ng-click="closeInventoryAction(2)" class="btn btn-info">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Prompt before saving item to add features on grid -->
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <div id="promptMoveItemInv" class="rowMsgInv" style="display: none">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <div class="message">To add a <label id="tabTitleOnMsg"></label> new item must first be saved. Do you want to save now ?</div>
                                <button type="button" ng-click="moveTabInventoryAction(0)" class="btn btn-primary">Yes</button>
                                <button type="button" ng-click="moveTabInventoryAction(2)" class="btn btn-info">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Prompt before delete an item on grid -->
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <div id="promptToDeleteItemInv" class="rowMsgInv" style="display: none">
                        <div class="form-group">
                            <div class="col-sm-12">
                                Do you really want to delete it?
                                <button type="button" ng-click="deleteInventoryAction(0)" class="btn btn-primary">Yes</button>
                                <button type="button" ng-click="deleteInventoryAction(1)" class="btn btn-warning">No</button>
                                <button type="button" ng-click="deleteInventoryAction(2)" class="btn btn-info">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- NOTIFICATIONS AREA -->
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <jqx-notification jqx-settings="inventorySuccessMsg" id="inventorySuccessMsg">
                        <div id="notification-content"></div>
                    </jqx-notification>
                    <jqx-notification jqx-settings="inventoryErrorMsg" id="inventoryErrorMsg">
                        <div id="notification-content"></div>
                    </jqx-notification>
                    <div id="notification_container_inventory"
                         style="width: 100%; height:60px; margin-top: 15px; background-color: #F2F2F2; border: 1px dashed #AAAAAA; overflow: auto;"></div>
                </div>
            </div>
        </div>
    </jqx-window>

</div>

<style>
    #invMainWindow {
        max-height: 90%!important;
    }
    .required-ast {
        color: #F00;
        text-align: left;
        padding: 4px;
        font-weight: bold;
    }
    .inventory_tab {
        padding-top: 10px;
        padding-bottom: 5px;
        background-color: #f5f5f5;
        border: 1px solid #dddddd;
    }
    .inventory_tab .row {
        margin-bottom: 5px;
    }
    .row.inventory_tab {
        margin: 0!important;
    }
</style>