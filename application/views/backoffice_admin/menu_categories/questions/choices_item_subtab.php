<div class="col-md-12 col-md-offset-0">
    <div class="row itemQuestionFormContainer">
        <div style=" width:100%;float:left;">
            <div style="float:left; padding:2px; width:100%;">
                <div style="float:left; padding:8px; text-align:right; width:60px; font-weight:bold;">
                    Item:
                </div>
                <div style="float:left; width:250px;">
                    <jqx-combo-box
                        jqx-settings="itemsCbxSettings"
                        jqx-on-change="itemsCbxSelecting(event)"
                        id="qItem_ItemUnique" class="required-in">
                    </jqx-combo-box>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
                <div style="float:left; padding:8px; text-align:right; width:100px; font-weight:bold;">
                    Description:
                </div>
                <div style="float:left; width:400px;">
                    <input id="qItem_Description" class="form-control" style="width: 220px" readonly/>
                </div>
            </div>
            <div style="width: 500px">
                <div style="float:left; padding:8px; text-align:right; width:60px; font-weight:bold;">
                    Price:
                </div>
                <div style="float:left; width:80px;">
                    <jqx-number-input id="qItem_SellPrice"
                                      jqx-symbol="$ "
                                      jqx-input-mode="'simple'"
                                      jqx-disabled="questionDisabled"
                                      jqx-width="'80px'"
                                      jqx-height="25"
                                      jqx-text-align="left"
                                      jqx-decimal-digits="<?php echo $decimalsPrice; ?>"
                    ></jqx-number-input>
                </div>
            </div>
            <br><br><br><br><br>
            <div style="float:left; padding:2px; width:100%; ">
                <div style=" float:left; padding:8px; text-align:right; width:60px; font-weight:bold;">
                    Label:
                </div>
                <div style=" float:left; width:250px; ">
                    <textarea class="form-control required-in" id="qItem_Label"
                              name="qItem_Label" placeholder="Label"
                              cols="30" rows="3"></textarea>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
            </div>

<!--            <div style="float:left; padding:2px; width:500px;"></div>-->

            <div style=" float:left; padding:2px; width:500px; ">
                <div style="float:left; padding:8px; text-align:right; width:60px; font-weight:bold;">
                    Sort:
                </div>
                <div style=" float:left; width:60px!important;">
                    <jqx-number-input
                        style='margin-top: 3px;padding-left: 10px;' class="form-control required-in"
                        id="qItem_sort" name="qItem_sort" jqx-width="110"
                        jqx-settings="numberItemQuestion" jqx-min="1" jqx-max="99999" jqx-value="1" jqx-digits="5"
                    ></jqx-number-input>
                </div>
                <div style="float:left;">
                    <span style="color:#F00; text-align:left; padding:4px; font-weight:bold;">*</span>
                </div>
            </div>
        </div>
    </div>
</div>