<div class="gridContentTab">
    <div>
        <a style="outline:0;margin: 10px 2px;" class="btn btn-info" ng-click="newMenuAction()">
            <span class="icon-new"></span>
            New
        </a>
    </div>
    <jqx-grid id="menuGridTable"
                jqx-settings="menuTableSettings"
                jqx-on-rowdoubleclick="updateMenuAction(event)">
    </jqx-grid>
    <!-- Menu window -->
    <jqx-window jqx-on-close="close()" jqx-settings="addMenuWindowSettings"
                jqx-create="addMenuWindowSettings" class="">
        <div>
            Add new menu
        </div>
        <div>
            <div class="col-md-12 col-md-offset-0" id="menuWindowContent">
                <div class="row menuFormContainer">
                    <div style=" width:330px;float:left;">
                        <div style="float:left; padding:2px; width:450px;">
                            <div style="float:left; padding:8px; text-align:right; width:150px; font-weight:bold;">Menu Name:</div>
                            <div style="float:left; width:180px;">
                                <input type="text" class="form-control required-field" id="add_MenuName" name="add_MenuName" placeholder="Menu Name" autofocus>
                            </div>
                            <div style="float:left;">
                                <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                            </div>
                        </div>

                        <div style="float:left; padding:2px; width:450px;">
                            <div style="float:left; padding:8px; text-align:right; width:150px; font-weight:bold;">Category Row:</div>
                            <div style="float:left; width:180px;">
                                <jqx-number-input
                                    style='margin-top: 3px;padding-left: 12px;' class="required-field form-control"
                                    id="add_MenuRow" name="add_Row"
                                    jqx-settings="number_mainmenuTab"
                                    jqx-value="2" jqx-min="1"
                                ></jqx-number-input>

                            </div>
                            <div style="float:left;">
                                <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                            </div>
                        </div>

                        <div style="float:left; padding:2px; width:450px;">
                            <div style="float:left; padding:8px; text-align:right; width:150px; font-weight:bold;">Category Column:</div>
                            <div style="float:left; width:180px;">
                                <jqx-number-input
                                    style='margin-top: 3px;padding-left: 12px;' class="required-field form-control"
                                    id="add_MenuColumn" name="add_Column"
                                    jqx-settings="number_mainmenuTab"
                                    jqx-value="5" jqx-min="1"
                                ></jqx-number-input>
                            </div>
                            <div style="float:left;">
                                <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                            </div>
                        </div>

                        <div style="float:left; padding:2px; width:450px;">
                            <div style="float:left; padding:8px; text-align:right; width:150px; font-weight:bold;">Item Row:</div>
                            <div style="float:left; width:180px;">
                                <jqx-number-input
                                    style='margin-top: 3px;padding-left: 12px;' class="required-field form-control"
                                    id="add_MenuItemRow" name="add_MenuItemRow"
                                    jqx-settings="number_mainmenuTab"
                                    jqx-value="5" jqx-min="1"
                                ></jqx-number-input>
                            </div>
                            <div style="float:left;">
                                <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                            </div>
                        </div>

                        <div style="float:left; padding:2px; width:450px;">
                            <div style="float:left; padding:8px; text-align:right; width:150px; font-weight:bold;">Item Column:</div>
                            <div style="float:left; width:180px;">
                                <jqx-number-input
                                    style='margin-top: 3px;padding-left: 12px;' class="required-field form-control"
                                    id="add_MenuItemColumn" name="add_MenuItemRowColumn"
                                    jqx-settings="number_mainmenuTab"
                                    jqx-value="5" jqx-min="1"
                                ></jqx-number-input>
                            </div>
                            <div style="float:left;">
                                <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                            </div>
                        </div>
                        <div style="float:left; padding:2px; width:450px;">
                            <div style="float:left; padding:8px; text-align:right; width:150px; font-weight:bold;">Item Length</div>
                            <div style="float:left; width:180px;">
                                <jqx-number-input
                                    style='margin-top: 3px;padding-left: 12px;' class="required-field form-control"
                                    id="add_ItemLength" name="add_ItemLength"
                                    jqx-settings="number_mainmenuTab"
                                    jqx-value="25" jqx-min="0"
                                ></jqx-number-input>
                            </div>
                            <div style="float:left;">
                                <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                            </div>
                        </div>

                        <div style="float:left; padding:2px; width:450px;">
                            <div style="float:left; padding:8px; text-align:right; width:150px; font-weight:bold;">Status:</div>
                            <div style="float:left; width:180px;">
                                <select name="add_Status" id="add_Status">
                                    <option value="1">Enabled</option>
                                    <option value="2">Disabled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <div id="mainButtonsForMenus">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <button type="button" id="saveMenuBtn" ng-click="SaveMenuWindows()" class="btn btn-primary" disabled>Save</button>
                                <button	type="button" id="" ng-click="CloseMenuWindows()" class="btn btn-warning">Close</button>
                                <!--<button	type="button" id="deleteMenuBtn" ng-click="beforeDeleteMenu()" class="btn btn-danger " style="display:none; overflow:auto;">Delete</button>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ALERT MESSAGES BEFORE ACTIONS -->
            <style>
                .alertButtonsMenuCategories {
                    display:none;
                }
            </style>
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <div id="beforeDeleteMenu" class="alertButtonsMenuCategories">
                        <div class="form-group">
                            <div class="col-sm-12">
                                Are you sure you want to delete it?
                                <button type="button" ng-click="beforeDeleteMenu(0)" class="btn btn-primary">Yes</button>
                                <button type="button" ng-click="beforeDeleteMenu(1)" class="btn btn-warning">No</button>
                                <button type="button" ng-click="beforeDeleteMenu(2)" class="btn btn-info">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <div id="promptToSaveInCloseButtonMenu" class="alertButtonsMenuCategories">
                        <div class="form-group">
                            <div class="col-sm-12">
                                Do you want to save your changes?
                                <button type="button" ng-click="CloseMenuWindows(0)" class="btn btn-primary">Yes</button>
                                <button type="button" ng-click="CloseMenuWindows(1)" class="btn btn-warning">No</button>
                                <button type="button" ng-click="CloseMenuWindows(2)" class="btn btn-info">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- NOTIFICATIONS AREA -->
            <div class="col-md-12 col-md-offset-0">
                <div class="row">
                    <jqx-notification jqx-settings="menuNotificationsSuccessSettings" id="menuNotificationsSuccessSettings">
                        <div id="notification-content"></div>
                    </jqx-notification>
                    <jqx-notification jqx-settings="menuNotificationsErrorSettings" id="menuNotificationsErrorSettings">
                        <div id="notification-content"></div>
                    </jqx-notification>
                    <div id="notification_container" style="width: 100%; height:60px; margin-top: 15px; background-color: #F2F2F2; border: 1px dashed #AAAAAA; overflow: auto;"></div>
                </div>
            </div>
        </div>
    </jqx-window>
</div>