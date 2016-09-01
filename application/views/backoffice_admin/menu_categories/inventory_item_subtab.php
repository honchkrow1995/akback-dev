<div class="col-md-12 inventory_tab">
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Item Number:</label>

            <div class="col-sm-4">
                <input type="text" class="form-control item_textcontrol req" id="item_Item" name="item_Item"
                       data-field="Item" placeholder="Item Number" autofocus>
            </div>
            <span class="required-ast">*</span>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Barcode:</label>

            <div class="col-sm-4">
                <input type="text" class="form-control item_textcontrol req" id="item_Part" name="item_Part"
                       data-field="Part" placeholder="Barcode">
            </div>
            <span class="required-ast">*</span>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Description:</label>

            <div class="col-sm-4">
                <input type="text" class="form-control item_textcontrol" id="item_Description" name="item_Description"
                       data-field="Description" placeholder="Description">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Supplier:</label>

            <div class="col-sm-4">
                <jqx-combo-box id="item_supplier" jqx-on-select="" jqx-settings=""></jqx-combo-box>
            </div>
            <span class="edit_sel_supplier_message" style="color:#F00;"></span>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Supplier Part:</label>

            <div class="col-sm-4">
                <input type="text" class="form-control item_textcontrol" id="item_SupplierPart" name="supplierpart"
                       data-field="SupplierPart" placeholder="Supplier Part Number">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Brand:</label>

            <div class="col-sm-4">
                <jqx-combo-box id="item_brand" jqx-on-select="" jqx-settings=""></jqx-combo-box>
            </div>
            <span class="edit_sel_brand_message" style="color:#F00;"></span>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Category:</label>

            <div class="col-sm-4">
                <jqx-combo-box id="item_category" jqx-on-select="" jqx-settings=""></jqx-combo-box>
            </div>
            <span class="edit_sel_category_message" style="color:#F00;"></span>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Sub Category:</label>

            <div class="col-sm-4">
                <jqx-combo-box id="item_subcategory" jqx-on-select="" jqx-settings=""></jqx-combo-box>
            </div>
            <span class="edit_sel_subcat_message" style="color:#F00;"></span>
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">List Price:</label>

            <div class="col-sm-4">
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    <jqx-number-input id="item_ListPrice" class="item_textcontrol"
                                      jqx-width="80" jqx-height="30"
                                      jqx-spin-buttons="false" jqx-input-mode="simple"
                                      jqx-symbol="''" ng-change="EditInventoryChange()"
                                      ng-model="price.amount" data-field="ListPrice"
                    ></jqx-number-input>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="form-group">
            <label for="inputType" class="col-sm-3 control-label">Sell Price:</label>

            <div class="col-sm-4">
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    <jqx-number-input id="item_Price1" class="item_textcontrol"
                                      jqx-width="80" jqx-height="30"
                                      jqx-spin-buttons="false" jqx-input-mode="simple"
                                      jqx-symbol="''" ng-change="EditInventoryChange()"
                                      ng-model="saleprice.amount" data-field="price1"
                    ></jqx-number-input>
                </div>
            </div>
        </div>
    </div>
</div>