<div class="col-md-12 col-md-offset-0">
    <div class="row editItemFormContainer">
        <div style=" width:100%;float:left;margin: 15px 0;">
            <div style="float:left; padding:2px; width:650px; ">
                <!-- Row -->
                <div style="float:left; padding:8px; text-align:right; width:80px; font-weight:bold;">Row:</div>
                <div style="float:left; width:52px;">
                    <jqx-number-input
                        style='margin-top: 3px;' class="form-control required-field"
                        id="editItem_Row" name="editItem_Row"
                        jqx-settings="numberMenuItem" jqx-min="0" jqx-max="99999"
                        jqx-value="1" jqx-digits="3"
                    ></jqx-number-input>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
                <!-- Column -->
                <div style="float:left; padding:8px; text-align:right; width:80px; font-weight:bold;">Column:</div>
                <div style="float:left; width:52px; ">
                    <jqx-number-input
                            style='margin-top: 3px;' class="form-control required-field"
                            id="editItem_Column" name="editItem_Column"
                            jqx-settings="numberMenuItem" jqx-min="0" jqx-max="99999"
                            jqx-value="1" jqx-digits="3"
                    ></jqx-number-input>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
                <!-- Sort -->
                <div style="float:left; padding:8px; text-align:right; width:80px; font-weight:bold;">Sort:</div>
                <div style="float:left; width:52px;">
                    <jqx-number-input
                            style='margin-top: 3px;' class="form-control required-field"
                            id="editItem_sort" name="editItem_sort"
                            jqx-settings="numberMenuItem" jqx-min="0" jqx-max="99999"
                            jqx-value="1" jqx-digits="3"
                    ></jqx-number-input>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
            </div>

            <div style=" float:left; padding:2px; width:650px; ">
                <div style="float:left; padding:8px; text-align:right; width:80px; font-weight:bold;">Status:</div>
                <div style="float:left; width:80px;">
                    <select name="editItem_Status" id="editItem_Status">
                        <option value="1">Enabled</option>
                        <option value="2">Disabled</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>