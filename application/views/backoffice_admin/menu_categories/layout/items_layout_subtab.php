<div class="col-md-12 col-md-offset-0">
    <div class="row editItemFormContainer">
        <div style=" width:100%;float:left;margin: 15px 0;">
            <div style=" float:left; padding:2px; width:650px; ">
                <div style="float:left; padding:8px; text-align:right; width:100px; font-weight:bold;">Row:</div>
                <div style=" float:left; width:300px;">
                    <jqx-number-input
                        style='margin-top: 3px;' class="form-control required-field"
                        id="editItem_Row" name="editItem_Row"
                        jqx-settings="numberMenuItem"  jqx-digits="2"
                    ></jqx-number-input>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
            </div>

            <div style=" float:left; padding:2px; width:650px; ">
                <div style="float:left; padding:8px; text-align:right; width:100px; font-weight:bold;">Column:</div>
                <div style=" float:left; width:300px;">
                    <jqx-number-input
                        style='margin-top: 3px;' class="form-control required-field"
                        id="editItem_Column" name="editItem_Column"
                        jqx-settings="numberMenuItem"  jqx-digits="2"
                    ></jqx-number-input>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
            </div>

            <div style=" float:left; padding:2px; width:650px; ">
                <div style="float:left; padding:8px; text-align:right; width:100px; font-weight:bold;">Sort:</div>
                <div style=" float:left; width:300px;">
                    <jqx-number-input
                        style='margin-top: 3px;' class="form-control required-field"
                        id="editItem_sort" name="editItem_sort"
                        jqx-settings="numberMenuItem" jqx-min="1" jqx-max="99999"
                        jqx-value="1" jqx-digits="5"
                    ></jqx-number-input>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
            </div>

            <div style=" float:left; padding:2px; width:650px; ">
                <div style="float:left; padding:8px; text-align:right; width:100px; font-weight:bold;">Status:</div>
                <div style=" float:left; width:300px;">
                    <select name="editItem_Status" id="editItem_Status">
                        <option value="1">Enabled</option>
                        <option value="2">Disabled</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>