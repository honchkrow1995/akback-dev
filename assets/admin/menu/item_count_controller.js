angular.module("akamaiposApp", ['jqwidgets'])
    .controller('itemCountController', function($scope, $http, itemCountService, adminService){


    $('#icountTabs').on('tabclick', function(e) {
        var tab = e.args.item;
        var tabTitle = $('#icountTabs').jqxTabs('getTitleAt', tab);
        if (tab == 0) {
            // $('#deleteIcountBtn').show();
            $('#finishIcountBtn').hide();
        // Filters tab
        } else if (tab == 1) {
        // Item Count list tab
        } else if (tab == 2) {
            // $('#deleteIcountBtn').hide();
            if ($scope.icountStatus == 1)
                $('#finishIcountBtn').show();
            else // 0=deleted; 2=finished; null
                $('#finishIcountBtn').hide();
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
    $scope.icountGridSettings = itemCountService.getIcountTableSettings();
    $scope.icountlistGridSettings = itemCountService.getIcountlistTableSettings();
    $scope.icategoryFilterSettings = itemCountService.getCategoryFilter();
    $scope.isubcategoryFilterSettings = itemCountService.getSubcategoryFilter();
    $scope.isupplierFilterSettings = itemCountService.getSupplierFilter();

    function updateIcountGrid() {
        $('#icountGrid').jqxGrid({
            source: itemCountService.getIcountTableSettings().source
        });
    }

    function updateIcountlistGrid(id) {
        $('#icountlistGrid').jqxGrid({
            source: itemCountService.getIcountlistTableSettings(id).source
        });
    }

    $scope.categoryOnChange = function(e) {
        if (e.args.item) {
            var id = e.args.item.value;
            $scope.isubcategoryFilterSettings = itemCountService.getSubcategoryFilter(id);
        }
    };

    // Notifications settings
    var notifContainer = '#notification_container_icount';
    $scope.icountSuccessMsg = adminService.setNotificationSettings(1, notifContainer);
    $scope.icountErrorMsg = adminService.setNotificationSettings(0, notifContainer);

    $('#icountTabs .icountField').on('keypress keyup paste change select', function(){
        $('#saveIcountBtn').prop('disabled', false);
    });
    $('#icountTabs #icount_countdate').on('change valueChanged', function() {
        $('#saveIcountBtn').prop('disabled', false);
    });

    $('body').on('select', '#icount_location', function() {
        $('#saveIcountBtn').prop('disabled', false);
    });

    $("body").on('cellvaluechanged', '#icountlistGrid', function (event)
    {
        var value = event.args.newvalue;
        var oldvalue = event.args.oldvalue;
        var datafield = event.args.datafield;
        var rowBoundIndex = event.args.rowindex;
        if (datafield  == 'CountStock') {
            var row = $(this).jqxGrid('getrowdata', rowBoundIndex);
            var current = (isNaN(parseFloat(row.CurrentStock))) ? 0 : parseFloat(row.CurrentStock);
            var newDiff = parseFloat(value) - (current);
            var nCost = parseFloat(value) * parseFloat(row.Cost);
            var aCost = parseFloat(row.Cost) * newDiff;
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/update_countlistById/' + row.Unique,
                dataType: 'json',
                data: {
                    CountStock: value,
                    Difference: newDiff,
                    NewCost: nCost,
                    AdjustedCost: aCost
                },
                success: function(response) {
                    $('#icountlistGrid').jqxGrid('setcellvalue', rowBoundIndex, "Difference", newDiff);
                }
            });
        } else if (datafield  == 'Comment') {
            var row = $(this).jqxGrid('getrowdata', rowBoundIndex);
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/update_countlistById/' + row.Unique,
                dataType: 'json',
                data: {
                    Comment: value
                },
                success: function(response) {
                    $('#icountlistGrid').jqxGrid('setcellvalue', rowBoundIndex, "Comment", value);
                }
            });
        }
    })
    .on('bindingcomplete', '#icountlistGrid', function(e) {
        console.log('lol');
        $(this).show();
    });

    $scope.openIcount = function() {
        $scope.icountID = null;
        $scope.icountStatus = null;
        $scope.createOrEditIcount = 'create';
        //
        $('#icount_location').val(1);
        $('#icount_comment').val('');
        $('#icount_countdate').jqxDateTimeInput({'disabled': false});
        //
        // $('#deleteIcountBtn').hide();
        $('#finishIcountBtn').hide();
        $('#icountTabs').jqxTabs('disableAt', 2);
        //
        $('#icount_location').jqxDropDownList('val', $('#loc_id').val());
        $('#icount_location').jqxDropDownList({'disabled': false});
        $('#icount_countdate').jqxDateTimeInput({'disabled': false});
        $('#icount_countdate').jqxDateTimeInput('setDate', new Date());
        setTimeout(function(){
            $('#icount_comment').focus();
            setTimeout(function(){
                $('#saveIcountBtn').prop('disabled', true);
            }, 50);
        }, 50);
        $('#icountlistGrid').hide();

        // $('#buildCountListBtn').prop('disabled', true);
        $('#icategoryFilter').jqxComboBox('clearSelection');
        $('#isubcategoryFilter').jqxComboBox('clearSelection');
        $('#isupplierFilter').jqxComboBox('clearSelection');
        $('.icountField.filters').jqxComboBox({disabled: false});
        $('#saveIcountBtn').html('Build Count List');
        icountwind.setTitle('New Item Count');
        icountwind.open();
    };

    $scope.editIcount = function(e) {
        var row = e.args.row.bounddata;
        $scope.icountID = row.Unique;
        $scope.icountStatus = row.Status;
        $scope.createOrEditIcount = 'edit';
        //
        setTimeout(function(){
            updateIcountlistGrid(row.Unique);
            $('#icountTabs').jqxTabs('enableAt', 2);
        }, 350);
        $('#icountlistGrid').hide();
        //
        $('#icount_location').val(row.Location);
        $('#icount_comment').val(row.Comment);
        var countDate = new Date(Date.parse(row.CountDate));
        $('#icount_countdate').jqxDateTimeInput({formatString: 'MM/dd/yyyy hh:mm tt'});
        $("#icount_countdate").jqxDateTimeInput('setDate', row._CountDate);
        $('#icount_countdate').jqxDateTimeInput({'disabled': true});
        $('#icount_location').jqxDropDownList({'disabled': true});
        //
        if (row.CategoryFilter != null && row.CategoryFilter != '') {
            $('#icategoryFilter').jqxComboBox('selectItem', row.CategoryFilter);
        }
        setTimeout(function() {
            if (row.SubCategoryFilter != null && row.SubCategoryFilter != '') {
                var sub = row.SubCategoryFilter.split(',');
                $.each(sub, function(i,el) {
                    $('#isubcategoryFilter').jqxComboBox('selectItem', el);
                });
            }
            $('#saveIcountBtn').prop('disabled', true);
        }, 300);
        if (row.SupplierFilter != null && row.SupplierFilter != '') {
            var supp = row.SupplierFilter.split(',');
            $.each(supp, function(i,el) {
                $('#isupplierFilter').jqxComboBox('selectItem', el);
            });
        }
        //
        // $('#deleteIcountBtn').show();
        $('#icountTabs').jqxTabs('enableAt', 2);
        $('.icountField.filters').jqxComboBox({disabled: true});
        $('#saveIcountBtn').html('Save');
        var btn = $('<button/>', {
            'ng-click': 'finishIcount()',
            'id': 'deleteIcountBtn'
        }).addClass('icon-trash user-del-btn');//.css('left', 0);
        var title = $('<div/>').html(' Edit Item Count | ID: '+ row.Unique + ' | ' + row.Comment).prepend(btn)
            .css('padding-left', '2em');
        icountwind.setTitle(title);
        icountwind.open();
    };

    $scope.saveIcount = function(toClose) {
        var required = function() {
            if ($('#icount_comment').val() == '') {
                $('#icountErrorMsg #msg').html('Name field is required');
                $scope.ibrandsErrorMsg.apply('open');
                return false;
            }

            return true;
        };

        if (required) {
            var url = '';
            var data = {
                'Location': $('#icount_location').val(),
                'Comment': $('#icount_comment').val(),
                'CountDate': $('#icount_countdate').val(),
                'filters': {}
            };
            if ($scope.createOrEditIcount == 'create') {
                var category = $('#icategoryFilter').jqxComboBox('val');
                if (category != '') {
                    data.filters.MainCategory = category;
                    var subcategories = $('#isubcategoryFilter').jqxComboBox('getSelectedItems');
                    if (subcategories.length) {
                        data.filters.SubCategory = [];
                        $.each(subcategories, function(i, el) {
                            data.filters.SubCategory.push(el.value);
                        });
                    }
                }
                var suppliers = $('#isupplierFilter').jqxComboBox('getSelectedItems');
                if (suppliers.length) {
                    data.filters.SupplierUnique = [];
                    $.each(suppliers, function(i, el) {
                        data.filters.SupplierUnique.push(el.value);
                    });
                }
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
                            $scope.icountStatus = 1;
                            $('#icount_countdate').jqxDateTimeInput({'disabled': true});
                            $('#icount_location').jqxDropDownList({'disabled': true});
                            $('.icountField.filters').jqxComboBox({disabled: true});
                            $('#finishIcountBtn').show();
                            //
                            updateIcountlistGrid($scope.icountID);
                            setTimeout(function() {
                                $('#icountTabs').jqxTabs('enableAt', 2);
                                $('#icountTabs').jqxTabs('select', 2);
                            }, 150);
                            //
                            var btn = $('<button/>', {
                                'ng-click': 'finishIcount()',
                                'id': 'deleteIcountBtn'
                            }).addClass('icon-32-trash user-del-btn').css('left', 0);
                            var title = $('<div/>').html(' Edit Item Count | ID: '+ response.id + ' | ' + data.Comment).prepend(btn)
                                .css('padding-left', '2em');
                            icountwind.setTitle(title);
                            $('#icountSuccessMsg #msg').html('Item Count created successfully! <br>' +
                                'Item Count list was built. You can check it at count list subtab. ');
                            $scope.icountSuccessMsg.apply('open');
                        } else {
                            $('#icountSuccessMsg #msg').html('Item Count updated successfully!');
                            $scope.icountSuccessMsg.apply('open');
                        }
                        updateIcountGrid();
                        if (toClose) {
                            icountwind.close();
                            $('#icountTabs').jqxTabs('select', 0);
                            $('#icountTabs').jqxTabs('disableAt', 2);
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
            $('#finishIcountBtns').hide();
        }
        if (option == 0) {
            $scope.saveIcount(1);
        } else if (option == 1) {
            icountwind.close();
            $('#finishIcountBtn').hide();
            $('#icountTabs').jqxTabs('select', 0);
            $('#icountTabs').jqxTabs('disableAt', 2);
        } else if (option == 2) {
        } else {
            if ($('#saveIcountBtn').is(':disabled')) {
                icountwind.close();
                $('#finishIcountBtn').hide();
                $('#icountTabs').jqxTabs('select', 0);
                $('#icountTabs').jqxTabs('disableAt', 2);
            } else {
                $('#mainIcountBtns').hide();
                $('#closeIcountBtns').show();
                $('#deleteIcountBtns').hide();
                $('#finishIcountBtns').hide();
            }
        }
    };

    $('body').on('click', '#deleteIcountBtn', function(e) {
        $scope.deleteIcount();
    });

    $scope.deleteIcount = function(option) {
        if(option != undefined) {
            $('#mainIcountBtns').show();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
            $('#finishIcountBtns').hide();
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
                        $('#icountTabs').jqxTabs('disableAt', 2);

                    }
                    else if (data.status == 'error') {}
                    else {}
                }
            });
        } else if (option == 1) {
            icountwind.close();
            $('#icountTabs').jqxTabs('select', 0);
            $('#icountTabs').jqxTabs('disableAt', 2);
        } else if (option == 2) {
        } else {
            $('#mainIcountBtns').hide();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').show();
            $('#finishIcountBtns').hide();
        }
    };

    $scope.finishIcount = function(option) {
        if (option != undefined) {
            $('#mainIcountBtns').show();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
            $('#finishIcountBtns').hide();
        }

        if (option == 0) {
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/finalizeCount/' + $scope.icountID ,
                dataType: 'json',
                success: function(response) {
                    if (response.status == 'success') {
                        updateIcountGrid();
                        updateIcountlistGrid($scope.icountID);
                        $('#finishIcountBtn').hide();
                        $('#icountGrid').jqxGrid('refresh');
                        $('#icountGrid').jqxGrid('render');
                        $('#icountSuccessMsg #msg').html('Item Count has been completed and Stock Adjusted.');
                        $scope.icountSuccessMsg.apply('open');
                        // icountwind.close();
                    }
                    else if (response.status == 'error') {}
                    else {}
                }
            });
        } else if (option == 1) {
        } else {
            $('#mainIcountBtns').hide();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
            $('#finishIcountBtns').show();
        }
    }

});