angular.module("akamaiposApp", ['jqwidgets'])
    .controller('itemCountController', function($scope, $http, adminService){


    $('#icountTabs').on('tabclick', function(e) {
        var tab = e.args.item;
        var tabTitle = $('#icountTabs').jqxTabs('getTitleAt', tab);
        if (tab == 0) {
            $('#deleteIcountBtn').show();
        } else if (tab == 1) {
            $('#deleteIcountBtn').hide();
            // if ($('#buildCountListBtn').data('list') > 0) {
            //     $('#buildListBtns').hide();
            //     $('#listGridContainer').show();
            //     updateIcountlistGrid($scope.icountID);
            // } else {
            //     $('#buildListBtns').show();
            //     $('#listGridContainer').hide();
            // }
        }
    });

    var icountwind;
    $scope.icountWindowSettings = {
        created: function (args) {
            icountwind = args.instance;
        },
        resizable: false,
        width: "100%", height: "100%",
        autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: false
    };

    // Item Count Grid
    var pager = adminService.loadPagerConfig();
    $scope.icountGridSettings = {
        source: new $.jqx.dataAdapter({
            dataType: 'json',
            dataFields: [
                {name: 'Unique', type: 'int'},
                {name: 'Location', type: 'string'},
                {name: 'LocationName', type: 'string'},
                {name: 'Station', type: 'string'},
                {name: 'Comment', type: 'string'},
                {name: 'Status', type: 'string'},
                {name: 'Created', type: 'string'},
                {name: 'CreatedByName', type: 'string'},
                {name: 'Updated', type: 'string'},
                {name: 'UpdatedByName', type: 'string'},
                {name: 'hasCountList', type: 'string'}
            ],
            id: 'Unique',
            url: SiteRoot + 'admin/ItemCount/load_itemcount'
        }),
        columns: [
            {dataField: 'Unique', hidden: true},
            {dataField: 'Location', hidden: true},
            {dataField: 'Station', hidden: true},
            {dataField: 'hasCountList', hidden: true},
            {text: 'Location', dataField: 'LocationName', width: '15%'},
            {text: 'Comment', dataField: 'Comment', width: '25%'},
            {text: 'Created By', dataField: 'CreatedByName', width: '15%'},
            {text: 'Created', dataField: 'Created', width: '15%'},
            {text: 'Updated By', dataField: 'UpdatedByName', width: '15%'},
            {text: 'Updated', dataField: 'Updated', width: '15%'}
        ],
        width: "99.7%",
        theme: 'arctic',
        filterable: true,
        showfilterrow: true,
        sortable: true,
        pageable: true,
        pageSize: pager.pageSize,
        pagesizeoptions: pager.pagesizeoptions,
        altRows: true,
        autoheight: true,
        autorowheight: true
    };

    // Item Count List Grid
    var getIcountlistSet = function(id) {
        var url = '';
        if (id != undefined)
            url = SiteRoot + 'admin/ItemCount/load_allitemcountlist/' + id;

        // to change font color if is negative
        var cellclass = function (row, datafield, value, rowdata) {
            if (value < 0) {
                return 'less_than';
            } else {
                return 'greater_than';
            }
        };
        return {
            source: new $.jqx.dataAdapter({
                dataType: 'json',
                dataFields: [
                    {name: 'Unique', type: 'int'},
                    {name: 'Item', type: 'string'},
                    {name: 'Part', type: 'string'},
                    {name: 'Description', type: 'string'},
                    {name: 'Supplier', type: 'string'},
                    {name: 'SupplierPart', type: 'string'},
                    {name: 'Category', type: 'string'},
                    {name: 'CurrentStock', type: 'number'},
                    {name: 'CountStock', type: 'number'},
                    {name: 'Difference', type: 'number'},
                    {name: 'Location', type: 'string'},
                    {name: 'ItemStockLineUnique', type: 'number'},
                    {name: 'Station', type: 'string'},
                    {name: 'Comment', type: 'string'},
                    {name: 'Status', type: 'string'},
                    {name: 'Created', type: 'string'},
                    {name: 'CreatedBy', type: 'string'},
                    {name: 'Updated', type: 'string'},
                    {name: 'UpdatedBy', type: 'string'}
                ],
                id: 'Unique',
                url: url
            }),
            columns: [
                {dataField: 'Unique', hidden: true},
                {text: 'Item', dataField: 'Item', editable: false},
                {text: 'Part', dataField: 'Part', editable: false},
                {text: 'Description', dataField: 'Description', editable: false},
                {text: 'Supplier', dataField: 'Supplier', editable: false},
                {text: 'Category', dataField: 'Category', editable: false},
                {text: 'Cost', dataField: 'Cost', editable: false},
                {text: 'Current', dataField: 'CurrentStock', editable: false},
                {text: 'Count', dataField: 'CountStock', columntype: 'textbox'},
                {text: 'Difference', dataField: 'Difference', editable: false,
                    cellclassname:cellclass
                },
                {text: 'Comment', dataField: 'Comment'},
                {dataField: 'Station', hidden: true},
                {dataField: 'Created', hidden: true},
                {dataField: 'Updated', hidden: true},
                {dataField: 'CreatedBy', hidden: true},
                {dataField: 'UpdatedBy', hidden: true}
            ],
            width: "99.7%",
            theme: 'arctic',
            filterable: true,
            showfilterrow: true,
            sortable: true,
            pageable: true,
            pageSize: pager.pageSize,
            pagesizeoptions: pager.pagesizeoptions,
            altRows: true,
            autoheight: true,
            autorowheight: true,
            editable: true,
            editmode: 'click',
        }
    };

    $scope.icountlistGridSettings = getIcountlistSet();

    function updateIcountGrid() {
        $('#icountGrid').jqxGrid({
            source: $scope.icountGridSettings.source
        });
    }

    function updateIcountlistGrid(id) {
        $('#icountlistGrid').jqxGrid({
            source: getIcountlistSet(id).source
        });
    }

    // Notifications settings
    var notifContainer = '#notification_container_icount';
    $scope.icountSuccessMsg = adminService.setNotificationSettings(1, notifContainer);
    $scope.icountErrorMsg = adminService.setNotificationSettings(0, notifContainer);

    $('#icountTabs .form-control').on('keypress keyup paste change select', function(){
        $('#saveIcountBtn').prop('disabled', false);
    });

    $('body').on('select', '#icount_location', function() {
        $('#saveIcountBtn').prop('disabled', false);
    });

    $("body").on('cellvaluechanged', '#icountlistGrid', function (event)
    {
        var value = args.newvalue;
        var oldvalue = args.oldvalue;
        var datafield = event.args.datafield;
        if (datafield  == 'CountStock') {
            var args = event.args;
            var rowBoundIndex = args.rowindex;
            var row = $(this).jqxGrid('getrowdata', rowBoundIndex);
            var newDiff = parseFloat(value) - ((row.Difference != null) ? parseFloat(row.Difference) : 0);
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/update_countlistById/' + row.Unique,
                dataType: 'json',
                data: {
                    CountStock: value,
                    Difference: newDiff
                },
                success: function(response) {
                    $('#icountlistGrid').jqxGrid('setcellvalue', rowBoundIndex, "Difference", newDiff);
                }
            });
        } else if (datafield  == 'Comment') {
            var data = {
                Comment: value
            };
            //TODO make ajax request if comment will be inserted HERE
        }
    });

    $scope.openIcount = function() {
        $scope.icountID = null;
        $scope.createOrEditIcount = 'create';
        //
        $('#icount_location').val(1);
        $('#icount_comment').val('');
        //
        $('#deleteIcountBtn').hide();
        $('#icountTabs').jqxTabs('disableAt', 1);
        $('#saveIcountBtn').prop('disabled', true);
        $('#buildCountListBtn').prop('disabled', true);
        icountwind.setTitle('New Item Count');
        icountwind.open();
    };

    $scope.editIcount = function(e) {
        var row = e.args.row.bounddata;
        $scope.icountID = row.Unique;
        $scope.createOrEditIcount = 'edit';
        //
        $('#icount_location').val(row.Location);
        $('#icount_comment').val(row.Comment);
        // $('#buildCountListBtn').data("id", row.Unique);
        $('#buildCountListBtn').data("loc", row.Location);
        $('#buildCountListBtn').data("list", row.hasCountList);
        //
        setTimeout(function(){
            if ($('#buildCountListBtn').data('list') > 0) {
                $('#icountTabs').jqxTabs('enableAt', 1);
                $('#buildCountListBtn').prop('disabled', true);
                updateIcountlistGrid($scope.icountID);
            } else {
                $('#icountTabs').jqxTabs('disableAt', 1);
                $('#buildCountListBtn').prop('disabled', false);
            }
        }, 250);
        //
        $('#deleteIcountBtn').show();
        $('#icountTabs').jqxTabs('enableAt', 1);
        $('#saveIcountBtn').prop('disabled', true);
        icountwind.setTitle('Edit Item Count | ID: '+ row.Unique);
        icountwind.open();
    };

    $scope.saveIcount = function(toClose) {
        var required = function() {
            if ($('#icount_comment').val() == '') {
                $('#ibrandsErrorMsg #msg').html('Name field is required');
                $scope.ibrandsErrorMsg.apply('open');
                return false;
            }

            return true;
        };

        if (required) {
            var url = '';
            var data = {
                'Location': $('#icount_location').val(),
                'Comment': $('#icount_comment').val()
            };
            if ($scope.createOrEditIcount == 'create') {
                url = SiteRoot + 'admin/ItemCount/createCount'
            } else if ($scope.createOrEditIcount == 'edit') {
                url = SiteRoot + 'admin/ItemCount/updateCount/' + $scope.icountID
            }

            $.ajax({
                url: url,
                data: data,
                method: 'post',
                dataType: 'json',
                success: function(response) {
                    if (response.status == 'success') {
                        $('#saveIcountBtn').prop('disabled', true);
                        if ($scope.createOrEditIcount == 'create') {
                            $scope.icountID = response.id;
                            $scope.createOrEditIbrand = 'edit';
                            $('#buildCountListBtn').prop('disabled', false);
                            $('#buildCountListBtn').data("loc", data.Location);
                            $('#buildCountListBtn').data("list", 0);
                            //
                            icountwind.setTitle('Edit Item Count | ID:' + response.id);
                            $('#icountSuccessMsg #msg').html('Item Count created successfully!');
                            $scope.icountSuccessMsg.apply('open');
                        } else {
                            $('#icountSuccessMsg #msg').html('Item Count updated successfully!');
                            $scope.icountSuccessMsg.apply('open');
                        }
                        updateIcountGrid();
                        if (toClose) {
                            icountwind.close();
                            $('#icountTabs').jqxTabs('select', 0);
                            $('#icountTabs').jqxTabs('disableAt', 1);
                        }
                    } else if (response.status == 'error') {
                    } else {}
                }
            });
        }
    };

    $scope.closeIcount = function(option) {
        if (option != undefined) {
            $('#mainIcountBtns').show();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
        }
        if (option == 0) {
            $scope.saveIcount(1);
        } else if (option == 1) {
            icountwind.close();
            $('#icountTabs').jqxTabs('select', 0);
            $('#icountTabs').jqxTabs('disableAt', 1);
        } else if (option == 2) {
        } else {
            if ($('#saveIcountBtn').is(':disabled')) {
                icountwind.close();
                $('#icountTabs').jqxTabs('select', 0);
                $('#icountTabs').jqxTabs('disableAt', 1);
            } else {
                $('#mainIcountBtns').hide();
                $('#closeIcountBtns').show();
                $('#deleteIcountBtns').hide();
            }
        }
    };

    $scope.deleteIcount = function(option) {
        if(option != undefined) {
            $('#mainIcountBtns').show();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
        }
        if (option == 0) {
            $.ajax({
                url: SiteRoot + 'admin/ItemCount/deleteCount/' + $scope.icountID,
                method: 'post',
                dataType: 'json',
                success: function(response) {
                    if(response.status == 'success') {
                        updateIcountGrid();
                        icountwind.close();
                        $('#icountTabs').jqxTabs('select', 0);
                        $('#icountTabs').jqxTabs('disableAt', 1);

                    }
                    else if (data.status == 'error') {}
                    else {}
                }
            });
        } else if (option == 1) {
            icountwind.close();
            $('#icountTabs').jqxTabs('select', 0);
            $('#icountTabs').jqxTabs('disableAt', 1);
        } else if (option == 2) {
        } else {
            $('#mainIcountBtns').hide();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').show();
        }
    };

    $scope.buildCountList = function() {
        console.info('building');
        var hasList = $('#buildCountListBtn').data('list'),
        loc = $('#buildCountListBtn').data('loc'),
        id = $('#buildCountListBtn').data('id');
        if (hasList == 0) {
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/create_countlistById/' + $scope.icountID + '/' + loc ,
                dataType: 'json',
                data: '',
                success: function(response) {
                    if (response.status == 'success') {
                        console.log(response);
                        $('#icountTabs').jqxTabs('enableAt', 1);
                        $('#buildCountListBtn').prop('disabled', true);
                        $('#buildCountListBtn').data("list", 1);
                        updateIcountlistGrid($scope.icountID);
                        $('#icountSuccessMsg #msg').html('Item Count list was built. You can check it at count list subtab.');
                        $scope.icountSuccessMsg.apply('open');
                    } else if (response.status == 'error') {
                    }
                    else {
                    }
                }
            });
        } else {
            console.error('Count list Exists, please check!');
        }
    }

});