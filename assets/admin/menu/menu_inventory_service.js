/**
 * Created by carlosrenato on 09-01-16.
 */
app.service('itemInventoryService', function ($http, inventoryExtraService, adminService) {

    // Data for items inventory grid
    this.getInventoryGridData = function (empty) {
        var url = '';
        var pages = adminService.loadPagerConfig();
        if (empty == undefined)
            url = SiteRoot + 'admin/MenuItem/getItemsData';
        return {
            source: new $.jqx.dataAdapter({
                dataType: 'json',
                dataFields: [
                    {name: 'Unique', type: 'int'},
                    {name: 'Item', type: 'string'},
                    {name: 'Part', type: 'string'},
                    {name: 'Description', type: 'string'},
                    {name: 'Supplier', type: 'string'},
                    {name: 'SupplierId', type: 'int'},
                    {name: 'SupplierPart', type: 'string'},
                    {name: 'BrandId', type: 'int'},
                    {name: 'Brand', type: 'string'},
                    {name: 'ListPrice', type: 'string'},
                    {name: 'price1', type: 'string'},
                    {name: 'price2', type: 'string'},
                    {name: 'price3', type: 'string'},
                    {name: 'price4', type: 'string'},
                    {name: 'price5', type: 'string'},
                    {name: 'Cost', type: 'string'},
                    {name: 'Cost_Extra', type: 'string'},
                    {name: 'Cost_Freight', type: 'string'},
                    {name: 'Cost_Duty', type: 'string'},
                    {name: 'Cost_Landed', type: 'string'},
                    {name: 'Quantity', type: 'string'},
                    {name: 'CategoryId', type: 'int'},
                    {name: 'Category', type: 'string'},
                    {name: 'SubCategoryId', type: 'int'},
                    {name: 'SubCategory', type: 'string'},
                    {name: 'PromptPrice', type: 'string'},
                    {name: 'PromptDescription', type: 'string'},
                    {name: 'EBT', type: 'string'},
                    {name: 'GiftCard', type: 'string'},
                    {name: 'Group', type: 'string'},
                    {name: 'MinimumAge', type: 'int'},
                    {name: 'CountDown', type: 'int'},
                    {name: 'Points', type: 'string'},
                    {name: 'ItemLabelVal', type: 'string'},
                    {name: 'ButtonPrimaryColor', type: 'string'},
                    {name: 'ButtonSecondaryColor', type: 'string'},
                    {name: 'LabelFontColor', type: 'string'},
                    {name: 'LabelFontSize', type: 'string'}
                ],
                id: 'Unique',
                url: url
            }),
            columns: [
                {text: 'ID', dataField: 'Unique', type: 'int', width: '10%'},
                {text: 'Item Number', dataField: 'Item', type: 'string', width: '16%'},
                {text: 'Category', dataField: 'Category', type: 'string', width: '12%',
                    filtertype: 'list'},
                {text: 'SubCategory', dataField: 'SubCategory', filtertype: 'list', width: '12%'},
                {text: 'Supplier', datafield: 'Supplier', filtertype: 'list', width: '10%'},
                {text: 'Description', dataField: 'Description', type: 'string', width: '16%'},
                {text: 'List', dataField: 'ListPrice', align:'right', cellsalign:'right', width: '9%'},
                {text: 'Sell', dataField: 'price1', align:'right', cellsalign:'right', width: '9%'},
                {text: 'Quantity', dataField: 'Quantity', type: 'string', width: '6%',
                    align:'right',cellsalign:'right'},
                {dataField: 'CategoryId', type: 'string', hidden: true},
                {dataField: 'Part', hidden:true},
                {dataField: 'SubCategoryId', hidden: true},
                {dataField: 'price2', hidden:true},
                {dataField: 'price3', hidden:true},
                {dataField: 'price4', hidden:true},
                {dataField: 'price5', hidden:true},
                {dataField: 'Cost', hidden:true},
                {dataField: 'Cost_Extra', hidden:true},
                {dataField: 'Cost_Freight', hidden:true},
                {dataField: 'Cost_Duty', hidden:true},
                {dataField: 'Cost_Landed', hidden:true},
                {datafield: 'SupplierId', hidden: true},
                {datafield: 'SupplierPart', hidden: true},
                {datafield: 'Brand', hidden: true},
                {datafield: 'BrandId', hidden: true},
                {dataField: 'PromptPrice', hidden:true},
                {dataField: 'PromptDescription', hidden:true},
                {dataField: 'EBT', hidden:true},
                {dataField: 'GiftCard', hidden:true},
                {dataField: 'Group', hidden:true},
                {dataField: 'MinimumAge', hidden:true},
                {dataField: 'CountDown', hidden:true},
                {dataField: 'Points', hidden:true},
                {dataField: 'ItemLabelVal', hidden:true},
                {dataField: 'ButtonPrimaryColor', hidden: true},
                {dataField: 'ButtonSecondaryColor', hidden: true},
                {dataField: 'LabelFontColor', hidden: true},
                {dataField: 'LabelFontSize', hidden: true}
            ],
            width: "100%",
            theme: 'arctic',
            filterable: true,
            showfilterrow: true,
            ready: function() {
                $('#inventoryItemsGrid').jqxGrid('updatebounddata', 'filter');
            },
            sortable: true,
            pageable: true,
            pageSize: pages.pageSize,
            pagesizeoptions: pages.pagesizeoptions,
            altRows: true,
            autoheight: true,
            autorowheight: true
        };
    };

    // Events to disable buttons
    this.onChangeEvents = function() {
        // Inputs change event
        $('body')
            .on('keypress keyup paste change', '.inventory_tab .item_textcontrol', function (e) {
                $('#saveInventoryBtn').prop('disabled', false);
            })
            .on('change',
                '.item_combobox, ' +
                '.cbxItemTaxCell .jqx-checkbox, ' +
                '.inventory_tab .cbxExtraTab',
                function(e) {
                    $('#saveInventoryBtn').prop('disabled', false);
                })
        ;
        //
        // .tochange
        $('#stocklWind .stockl_input').on('change keypress valueChanged textChanged', function() {
            $('#saveStockBtn').prop('disabled', false);
        });
        // Question subtab events
        $('#invQ_Status, #invQ_Question').on('select', function() {
            $('#saveQuestionInvBtn').prop('disabled', false);
        });
        // Printer subtab events
        $('#printerInvList').on('select', function(e) {
            $('#saveBtnPrinterInv').prop('disabled', false);
        });
        $('#primaryCheckContainer #primaryPrinterChbox').on('change', function(e) {
            $('#saveBtnPrinterInv').prop('disabled', false);
        });
    };

    this.setNotificationSettings = function (type, container) {
        if (container == undefined)
            container = '#notification_container_inventory';
        return {
            width: "auto",
            appendContainer: container,
            opacity: 0.9,
            closeOnClick: true,
            autoClose: true,
            showCloseButton: false,
            template: (type == 1) ? 'success' : 'error'
        }
    };
});