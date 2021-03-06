<div id="styling_category_section">

    <div style="float:left; padding:2px; width:450px;">
        <div style="float:left; padding:8px; text-align:right; width:180px; font-weight:bold;">Button Primary Color:</div>
        <div style="float:left; width:180px;">
            <div style="margin: 3px; float: left;" class="dropDownParent">
                <jqx-drop-down-button jqx-on-opening="opening(event)" jqx-width="150" jqx-instance="ddb_bPrimaryColor"
                                      class="styles-control" jqx-height="22">
                    <jqx-color-picker jqx-create="createColorPicker" jqx-on-colorchange="colorChange(event)"
                                      jqx-color-mode="'hue'" jqx-width="220" jqx-height="220" data-layout="category"
                                      jqx-color="bPrimaryColor" id="bPrimaryColor" ></jqx-color-picker>
                </jqx-drop-down-button>
            </div>
        </div>
    </div>

    <div style="float:left; padding:2px; width:450px;">
        <div style="float:left; padding:8px; text-align:right; width:180px; font-weight:bold;">Button Secondary Color:</div>
        <div style="float:left; width:180px;">
            <div style="margin: 3px; float: left;">
                <jqx-drop-down-button jqx-on-opening="opening(event)" jqx-width="150" jqx-instance="ddb_bSecondaryColor"
                                      class="styles-control" jqx-height="22">
                    <jqx-color-picker jqx-create="createColorPicker" jqx-on-colorchange="colorChange(event)"
                                      jqx-color-mode="'hue'" jqx-width="220" jqx-height="220" data-layout="category"
                                      jqx-color="bSecondaryColor" id="bSecondaryColor"></jqx-color-picker>
                </jqx-drop-down-button>
            </div>
        </div>
    </div>

    <div style="float:left; padding:2px; width:450px;">
        <div style="float:left; padding:8px; text-align:right; width:180px; font-weight:bold;">Label Font Color</div>
        <div style="float:left; width:180px;">
            <div style="margin: 3px; float: left;">
                <jqx-drop-down-button jqx-on-opening="opening(event)" jqx-width="150" jqx-instance="ddb_lfontColor"
                                      jqx-height="22" class="styles-control">
                    <jqx-color-picker jqx-create="createColorPicker" jqx-on-colorchange="colorChange(event)"
                                      jqx-color-mode="'hue'" jqx-width="220" jqx-height="220" data-layout="category"
                                      jqx-color="lfontColor" id="lfontColor"></jqx-color-picker>
                </jqx-drop-down-button>
            </div>
        </div>
    </div>

    <div style="float:left; padding:2px; width:450px;">
        <div style="float:left; padding:8px; text-align:right; width:180px; font-weight:bold;">Label Font Size</div>
        <div style="float:left; width:180px;">
            <jqx-drop-down-list id="lfontSize" class="styles-control">
                <?php for ($o = 4;$o<=30;$o++) { ?>
                    <option value="<?php echo $o; ?>px"><?php echo $o; ?>px</option>
                <?php } ?>
            </jqx-drop-down-list>
        </div>
    </div>
</div>