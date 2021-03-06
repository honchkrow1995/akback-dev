angular.module("akamaiposApp", ['jqwidgets'])
    .controller('itemCountController', function($scope, $http, itemCountService, adminService){


    $('#icountTabs').on('tabclick', function(e) {
        var tab = e.args.item;
        var tabTitle = $('#icountTabs').jqxTabs('getTitleAt', tab);
        var hidingBtns = function() {
            $('#finishIcountBtn').hide();
            $('#setZeroIcountBtn').hide();
            $('#setZeroAllIcountBtn').hide();
            $('#deleteIcounlistBtn').hide();
            $('#icountlistGrid').jqxGrid('unselectallrows');
            $('#icountlistGrid').hide();
        };
        if (tab == 0) {
            hidingBtns();
            $('#addToCountBtn').hide();
        // Filters tab
        } else if (tab == 1) {
            hidingBtns();
            $('#addToCountBtn').hide();
        // Apply Scan tab
        } else if (tab == 2) {
            hidingBtns();
            // $('#scanFileCbx').val('');
            // $('#icountscanGrid').hide();
            $('#addToCountBtn').show();
        // Item Count list tab
        } else if (tab == 3) {
            $('#loadingMenuCountList').show();
            $('#icountlistGrid').show();
            setTimeout(function() {
                $('#loadingMenuCountList').hide();
                updateIcountlistGrid($scope.icountID);
            }, 400);
            $('#addToCountBtn').hide();
            $('#setZeroIcountBtn').show();
            $('#setZeroAllIcountBtn').show();
            $('#deleteIcounlistBtn').show();
            if ($scope.icountStatus == 1)
                $('#finishIcountBtn').show();
            else // 0=deleted; 2=finished; null
                $('#finishIcountBtn').hide();
        }
    });

    // var icountwindows;
    $scope.icountWindowSettings = {
        created: function (args) {
            icountwindows = args.instance;
        },
        resizable: false,
        width: "100%", //height: "100%",
        autoOpen: false,
        theme: 'darkblue',
        isModal: true,
        showCloseButton: false
    }

    /**
     * Import scan button on Count tab
     */
    $('#icount_file').jqxFileUpload({
        width: 300,
        uploadUrl: SiteRoot + 'admin/ItemCount/upload',
        fileInputName: 'file',
        multipleFilesUpload: true,
        autoUpload: true,
        accept: 'text/csv, text/plain, application/text'
    });

    $scope.csvFileSelected = null;
    var uploadedFilesSelected = [];
    var uploadedFilesOriginal = [];
    $('#icount_file')
        .on('select', function(e) {
            setTimeout(function() {
                $('.jqx-file-upload-buttons-container').css({display: 'none'});
            }, 100);
        }).on('remove', function(e) {
    }).on('uploadStart', function(e) {
    }).on('uploadEnd', function(e) {
        if (e.args.file == undefined)
            return;
        $scope.csvFileSelected = JSON.parse(e.args.response);
        $scope.icountImportErrorMsg.apply('closeAll');
        if ($scope.csvFileSelected.success === true) {
            // $('#iscanTabs').jqxTabs('disableAt', 1);
            $('#fileLoadedTemp').show();
            uploadedFilesSelected.push($scope.csvFileSelected.name);
            uploadedFilesOriginal.push($scope.csvFileSelected.name);
            $('#icount_file').data('filename', uploadedFilesSelected.join());
            $('#fileLoadedTemp').html('Files loaded: <br><b>' + uploadedFilesOriginal.join(', ') + '</b>');
            var msg = "<br>Please press Save to view the file.";
            $('#icountSuccessMsg #msg').html($scope.csvFileSelected.message + msg);
            $scope.icountSuccessMsg.apply('open');
            //
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/createItemScan',
                data: {
                    'Comment': $('#icount_comment').val(),
                    'Location': $('#icount_location').val(),
                    'filename': $('#icount_file').data('filename')
                },
                dataType: 'text',
                async: false,
                success: function(resp) {
                    resp = resp.replace(/<br\s*[\/]?>/gi, '');
                    resp = JSON.parse(resp);
                    $('#scanFileCbx').jqxComboBox({source: itemCountService.getScanFileSettings().source});
                    setTimeout(function () {
                        $('#fileLoadedTemp').hide();
                        $('#scanFileCbx').jqxComboBox('val', resp.id);
                    }, 250);
                }
            })
        } else {
            $('#fileLoadedTemp').hide();
            // $('#icountErrorMsg #msg').html($scope.csvFileSelected.message);
            // $scope.icountErrorMsg.apply('open');
            $('#icountImportErrorMsg #msg').html($scope.csvFileSelected.message);
            $scope.icountImportErrorMsg.apply('open');
        }
    });


        // Item Count Grid
    $scope.icountGridProgressSettings = itemCountService.getIcountTableSettings(1);
    $scope.icountGridCompleteSettings = itemCountService.getIcountTableSettings(2);
    $scope.icountlistGridSettings = itemCountService.getIcountlistTableSettings();
    $scope.icategoryFilterSettings = itemCountService.getCategoryFilter();
    $scope.isubcategoryFilterSettings = itemCountService.getSubcategoryFilter();
    $scope.isupplierFilterSettings = itemCountService.getSupplierFilter();

    function updateIcountGrid() {
        $('#icountGrid1').jqxGrid({
            source: itemCountService.getIcountTableSettings(1).source,
            autoheight: true,
            autorowheight: true
        });
        $('#icountGrid2').jqxGrid({
            source: itemCountService.getIcountTableSettings(2).source,
            autoheight: true,
            autorowheight: true
        });
    }

    function updateIcountlistGrid(id) {
        $('#icountlistGrid').jqxGrid({
            source: itemCountService.getIcountlistTableSettings(id).source,
            autoheight: true,
            autorowheight: true
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
    $scope.icountImportErrorMsg = adminService.setNotificationSettings(0, notifContainer, undefined, false);

    // COunt controls Events
    $('#icountTabs .icountField').on('keypress keyup paste change', function(){
        if (!$(this).hasClass('filters')) {
            $('#saveIcountBtn').prop('disabled', false);
        }
    });

    $('#icountTabs .icountField.filters').on('select', function(e) {
        if (e.args) {
            $('#saveIcountBtn').prop('disabled', false);
        }
    });

    $('body').on('focus', '#icountTabs .icountField.filters .jqx-combobox-input', function(e) {
        var $this = $(this).parents('.icountField.filters');
        // $this.jqxComboBox({showArrow: true});
        $this.jqxComboBox('open');
    });

    $('body').on('bindingComplete', '#icountTabs .icountField.filters .jqx-combobox-input', function(e) {
        // var $this = $(this).parents('.icountField.filters');
        // $this.jqxComboBox({showArrow: true});
    });

    $('#icountTabs #icount_countdate').on('change valueChanged', function() {
        $('#saveIcountBtn').prop('disabled', false);
    });

    $('body').on('select', '#icount_location', function() {
        $('#saveIcountBtn').prop('disabled', false);
    });

    $("#icountlistGrid").on('cellvaluechanged', function (event)
    {
        var value = event.args.newvalue;
        var oldvalue = event.args.oldvalue;
        var datafield = event.args.datafield;
        var rowBoundIndex = event.args.rowindex;
        if (datafield  == 'CountStock') {
            var row = $(this).jqxGrid('getrowdata', rowBoundIndex);
            var current = (isNaN(parseFloat(row.CurrentStock))) ? 0 : parseFloat(row.CurrentStock);
            var newDiff = parseFloat(value) - (current);
            var nCost = parseFloat(value) * parseFloat(row.TotalCost);// parseFloat(row.Cost);
            var aCost = newDiff * parseFloat(row.TotalCost);
            var dataToSend = {
                CountStock: value,
                Difference: newDiff, // Quantity on item_stock_line
                NewCost: nCost,
                AdjustedCost: aCost
            };
            if (oldvalue == null && row.StatusCount == 2) {
                dataToSend['Status'] = row.StatusCount;
            }
            $('#loadingMenuCountList').show();
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/update_countlistById/' + row.Unique,
                dataType: 'json',
                data: dataToSend,
                success: function(response) {
                    // setTimeout(function() {
                        $('#icountlistGrid').jqxGrid('setcellvalue', rowBoundIndex, "Difference", newDiff);
                        $('#icountlistGrid').jqxGrid('setcellvalue', rowBoundIndex, "NewCost", nCost);
                        $('#icountlistGrid').jqxGrid('setcellvalue', rowBoundIndex, "AdjustedCost", aCost);
                        $('#loadingMenuCountList').hide();
                    // }, 100);
                }
            });
        } else if (datafield  == 'Comment') {
            var row = $(this).jqxGrid('getrowdata', rowBoundIndex);
            $('#loadingMenuCountList').show();
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/update_countlistById/' + row.Unique,
                dataType: 'json',
                data: {
                    Comment: value // Comment on item_stock_line
                },
                success: function(response) {
                    $('#icountlistGrid').jqxGrid('setcellvalue', rowBoundIndex, "Comment", value);
                    $('#loadingMenuCountList').hide();
                }
            });
        }
    }); //.on('bindingcomplete', function(e) {
        // $(this).show();
        // $(this).jqxGrid('hideloadelement');
     // });

    $scope.openIcount = function() {
        $scope.icountID = null;
        $scope.icountStatus = null;
        $scope.createOrEditIcount = 'create';
        // Scan Import control names
        $('#fileLoadedTemp').hide();
        uploadedFilesSelected = [];
        uploadedFilesOriginal = [];
        $('#fileLoadedTemp').html('');
        //
        // $('#icountlistGrid').jqxGrid('unselectallrows');
        $('#icount_location').val(1);
        $('#icount_comment').val('');
        $('#icount_countdate').jqxDateTimeInput({'disabled': false});
        //
        // $('#deleteIcountBtn').hide();
        $('#finishIcountBtn').hide();
        $('#setZeroIcountBtn').hide();
        $('#setZeroAllIcountBtn').hide();
        $('#deleteIcounlistBtn').hide();
        $('#icountTabs').jqxTabs('select', 0);
        $('#icountTabs').jqxTabs('disableAt', 2); // Disable Import Tab
        $('#icountTabs').jqxTabs('disableAt', 3); // Disable Count List Tab
        //
        $('#icount_location').jqxDropDownList('val', $('#loc_id').val());
        $('#icount_location').jqxDropDownList({'disabled': false});
        $('#icount_countdate').jqxDateTimeInput({'disabled': false});
        $('#icount_countdate').jqxDateTimeInput('setDate', new Date());
        // $('#icountlistGrid').hide();
        // $('#icountlistGrid').jqxGrid('showloadelement');
        // $('#icountlistGrid').jqxGrid('showloadelement');

        // $('#buildCountListBtn').prop('disabled', true);
        $('#icategoryFilter').jqxComboBox('clearSelection');
        $('#isubcategoryFilter').jqxComboBox('clearSelection');
        $('#isupplierFilter').jqxComboBox('clearSelection');
        $('.icountField.filters').jqxComboBox({disabled: false});
        $('#saveIcountBtn').html('Build Count List');
        $('#saveIcountBtn').show();
        $('#closeItemCountWin').jqxWindow('setTitle', 'New Item Count');
        setTimeout(function() {
            $('#icount_comment').focus();
            setTimeout(function(){
                $('#saveIcountBtn').prop('disabled', true);
            }, 50);
        }, 50);
        icountwindows.setTitle('New Item Count');
        icountwindows.open();
    };

    $scope.editIcount = function(e) {
        var row = e.args.row.bounddata;
        $scope.icountID = row.Unique;
        $scope.icountStatus = row.Status;
        $scope.createOrEditIcount = 'edit';
        //
        $('#icount_location').val(row.Location);
        $('#icount_comment').val(row.Comment);
        var countDate = new Date(Date.parse(row.CountDate));
        $('#icount_countdate').jqxDateTimeInput({formatString: 'MM/dd/yyyy hh:mm tt'});
        $("#icount_countdate").jqxDateTimeInput('setDate', row._CountDate);
        $('#icount_countdate').jqxDateTimeInput({'disabled': true});
        $('#icount_location').jqxDropDownList({'disabled': true});
        //
        $('#icategoryFilter').jqxComboBox('clearSelection');
        $('#isubcategoryFilter').jqxComboBox('clearSelection');
        $('#isupplierFilter').jqxComboBox('clearSelection');
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
        $("#scanFileCbx").jqxComboBox({selectedIndex: -1 });
        //
        // $('#deleteIcountBtn').show();
        $('#icountTabs').jqxTabs('select', 0);
        $('#icountTabs').jqxTabs('enableAt', 2); // Enable Import Tab
        $('#icountTabs').jqxTabs('enableAt', 3); // Enable Count List Tab
        $('.icountField.filters').jqxComboBox({disabled: true});
        $('#saveIcountBtn').html('Save');
        $('#finishIcountBtn').hide();
        $('#setZeroIcountBtn').hide();
        $('#setZeroAllIcountBtn').hide();
        $('#deleteIcounlistBtn').hide();
        $('#fileLoadedTemp').hide();
        $('#saveIcountBtn').hide();
        $('#closeItemCountWin').jqxWindow('setTitle', 'Edit Item Count');
        var btn = $('<button/>', {
            'ng-click': 'finishIcount()',
            'id': 'deleteIcountBtn'
        }).addClass('icon-trash user-del-btn');//.css('left', 0);
        var title = $('<div/>').html(' Edit Item Count | ID: '+ row.Unique + ' | ' + row.Comment).prepend(btn)
            .css('padding-left', '2em');
        icountwindows.setTitle(title);
        icountwindows.open();
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
                'filters': {},
                // Import Scan file
                // 'filename': $('#icount_file').data('filename')
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
                // dataType: 'text',
                dataType: 'json',
                async: false,
                success: function(response) {
                    // response = response.replace(/<br\s*[\/]?>/gi, '');
                    // response = JSON.parse(response);
                    if (response.status == 'success') {
                        $('#saveIcountBtn').html('Save');
                        $('#saveIcountBtn').prop('disabled', true);
                        $('#saveIcountBtn').hide();
                        $scope.icountImportErrorMsg.apply('closeAll');
                        // CREATING
                        if ($scope.createOrEditIcount == 'create') {
                            $scope.icountID = response.id;
                            $scope.createOrEditIbrand = 'edit';
                            $scope.icountStatus = 1;
                            $('#icount_countdate').jqxDateTimeInput({'disabled': true});
                            $('#icount_location').jqxDropDownList({'disabled': true});
                            $('.icountField.filters').jqxComboBox({disabled: true});
                            $('#finishIcountBtn').show();
                            $('#setZeroIcountBtn').show();
                            $('#setZeroAllIcountBtn').show();
                            $('#deleteIcounlistBtn').show();
                            $('#icountlistGrid').show();
                            updateIcountlistGrid($scope.icountID);
                            //
                            setTimeout(function() {
                                $('#icount_file').parent().parent().removeClass('ng-hide');
                                $('#icountTabs').jqxTabs('enableAt', 2); // Enable Import Tab
                                $('#icountTabs').jqxTabs('enableAt', 3); // Enable Count List Tab
                                $('#icountTabs').jqxTabs('select', 3);
                                // if (response.scanID != '') {
                                //     // $scope.scanFileCbxSettings = itemCountService.getScanFileSettings();
                                //     $('#scanFileCbx').jqxComboBox({source: itemCountService.getScanFileSettings().source});
                                //     setTimeout(function () {
                                //         $('#fileLoadedTemp').hide();
                                //         $('#scanFileCbx').jqxComboBox('val', response.scanID);
                                //     }, 250);
                                // }
                            }, 250);
                            //
                            var btn = $('<button/>', {
                                'ng-click': 'finishIcount()',
                                'id': 'deleteIcountBtn'
                            }).addClass('icon-trash user-del-btn').css('left', 0);
                            var title = $('<div/>').html(' Edit Item Count | ID: '+ response.id + ' | ' + data.Comment).prepend(btn)
                                .css('padding-left', '2em');
                            icountwindows.setTitle(title);
                            $('#icountSuccessMsg #msg').html('Item Count created successfully! <br>' +
                                'Item Count list was built. You can check it at count list subtab. ');
                            $scope.icountSuccessMsg.apply('open');
                            updateIcountGrid(1);
                        // UPDATING
                        } else {
                            if (response.scanID != '') {
                                $('#icountTabs').jqxTabs('enableAt', 3);
                                $('#icountTabs').jqxTabs('select', 3);
                                // $scope.scanFileCbxSettings = itemCountService.getScanFileSettings();
                                $('#scanFileCbx').jqxComboBox({source: itemCountService.getScanFileSettings().source});
                                setTimeout(function () {
                                    $('#fileLoadedTemp').hide();
                                    $('#scanFileCbx').jqxComboBox('val', response.scanID);
                                }, 250);
                            }
                            var btn = $('<button/>', {
                                'ng-click': 'finishIcount()',
                                'id': 'deleteIcountBtn'
                            }).addClass('icon-trash user-del-btn').css('left', 0);
                            var title = $('<div/>').html(' Edit Item Count | ID: '+ $scope.icountID + ' | ' + $('#icount_comment').val()).prepend(btn)
                                .css('padding-left', '2em');
                            icountwindows.setTitle(title);
                            $('#icountSuccessMsg #msg').html('Item Count updated successfully!');
                            $scope.icountSuccessMsg.apply('open');
                            $('#icountGrid1').jqxGrid('updatebounddata', 'filter');
                            $('#icountGrid2').jqxGrid('updatebounddata', 'filter');
                        }
                        if (toClose) {
                            icountwindows.close();
                            $('#icountTabs').jqxTabs('select', 0);
                            $('#icountTabs').jqxTabs('disableAt', 3);
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
            // $('#closeIcountBtns').hide();
            $('#closeItemCountWin').jqxWindow('close');
            $('#deleteIcountBtns').hide();
            $('#finishIcountBtns').hide();
            $('#setZeroIcountBtns').hide();
        }
        if (option == 0) {
            $scope.saveIcount(1);
        } else if (option == 1) {
            icountwindows.close();
            $('#finishIcountBtn').hide();
            $('#icountTabs').jqxTabs('select', 0);
            $('#icountTabs').jqxTabs('disableAt', 3);
        } else if (option == 2) {
        } else {
            if ($('#saveIcountBtn').is(':disabled')) {
                icountwindows.close();
                $('#finishIcountBtn').hide();
                $('#icountTabs').jqxTabs('select', 0);
                $('#icountTabs').jqxTabs('disableAt', 3);
            } else {
                $('#mainIcountBtns').hide();
                // $('#closeIcountBtns').show();
                $('#closeItemCountWin').jqxWindow('open');
                $('#deleteIcountBtns').hide();
                $('#finishIcountBtns').hide();
                $('#setZeroIcountBtns').hide();
            }
        }
    };

    $('#itemcountWindow').on('close', function() {
        $('#icountlistGrid').hide();
    });

    $('body').on('click', '#deleteIcountBtn', function(e) {
        $scope.deleteIcount();
    });

    $scope.deleteIcount = function(option) {
        if(option != undefined) {
            $('#mainIcountBtns').show();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
            $('#finishIcountBtns').hide();
            $('#setZeroIcountBtns').hide();
            $('#removeItemCountWin').jqxWindow('close');
        }
        if (option == 0) {
            $.ajax({
                url: SiteRoot + 'admin/ItemCount/deleteCount/' + $scope.icountID,
                method: 'post',
                dataType: 'json',
                success: function(response) {
                    if(response.status == 'success') {
                        updateIcountGrid();
                        icountwindows.close();
                        $('#icountTabs').jqxTabs('select', 0);
                        $('#icountTabs').jqxTabs('disableAt', 3);
                    }
                    else if (data.status == 'error') {}
                    else {}
                }
            });
        } else if (option == 1) {
            icountwindows.close();
            $('#icountTabs').jqxTabs('select', 0);
            $('#icountTabs').jqxTabs('disableAt', 3);
        } else if (option == 2) {
        } else {
            $('#icountTabs').jqxTabs('select', 0);
            $('#mainIcountBtns').hide();
            $('#closeIcountBtns').hide();
            // $('#deleteIcountBtns').show();
            $('#removeItemCountWin').jqxWindow('open');
            $('#finishIcountBtns').hide();
            $('#setZeroIcountBtns').hide();
        }
    };

    $scope.finishIcount = function(option) {
        if (option != undefined) {
            $('#mainIcountBtns').show();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
            // $('#finishIcountBtns').hide();
            // $('#setZeroIcountBtns').hide();
            $('#finishIcountWin').jqxWindow('close');
        }

        if (option == 0) {
            $('#loadingMenuItem').show();
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/finalizeCount/' + $scope.icountID ,
                dataType: 'json',
                success: function(response) {
                    if (response.status == 'success') {
                        updateIcountGrid();
                        updateIcountlistGrid($scope.icountID);
                        $('#finishIcountBtn').hide();
                        $('#loadingMenuItem').hide();
                        $('#finishIcountWin').jqxWindow('close');
                        $('#finishIcountSuccessWin').jqxWindow('open');
                        $('#icountGrid1').jqxGrid('refresh');
                        $('#icountGrid2').jqxGrid('refresh');
                        // $('#icountGrid2').jqxGrid('render');
                        $('#icountSuccessMsg #msg').html('Item Count has been completed and Stock Adjusted.');
                        $scope.icountSuccessMsg.apply('open');
                        // icountwindows.close();
                    }
                    else if (response.status == 'error') {}
                    else {}
                }
            });
        } else if (option == 1) {
        // Window with Success msg after finalize count
        } else if (option == 2) {
            $('#finishIcountSuccessWin').jqxWindow('close');
            icountwindows.close();
        } else {
            $('#mainIcountBtns').hide();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
            // $('#finishIcountBtns').show();
            // $('#setZeroIcountBtns').hide();
            $('#finishIcountWin').jqxWindow('open');
        }
    };

    $scope.setZeroIcount = function(option) {
        if (option != undefined) {
            $('#mainIcountBtns').show();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
            $('#finishIcountBtns').hide();
            // $('#setZeroIcountBtns').hide();
            $('#setzeroItemCountListWin').jqxWindow('close');
        }

        if (option == 0) {
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/setZeroCount/' + $scope.icountID ,
                dataType: 'json',
                success: function(response) {
                    if (response.status == 'success') {
                        updateIcountGrid();
                        updateIcountlistGrid($scope.icountID);
                        $('#icountGrid1').jqxGrid('refresh');
                        $('#icountGrid2').jqxGrid('refresh');
                        // $('#icountGrid2').jqxGrid('render');
                        $('#icountSuccessMsg #msg').html('Items have set successfully!.');
                        $scope.icountSuccessMsg.apply('open');
                        $('#setzeroItemCountListWin').jqxWindow('close');
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
            $('#finishIcountBtns').hide();
            $('#setzeroItemCountListWin').jqxWindow('open');
            // $('#setZeroIcountBtns').show();
        }
    };

    $scope.setZeroAllIcount = function(option) {
        if (option != undefined) {
            $('#mainIcountBtns').show();
            $('#closeIcountBtns').hide();
            $('#deleteIcountBtns').hide();
            $('#finishIcountBtns').hide();
            // $('#setZeroIcountBtns').hide();
            $('#setzeroAllItemCountListWin').jqxWindow('close');
        }

        if (option == 0) {
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/setZeroAllCount/' + $scope.icountID ,
                dataType: 'json',
                success: function(response) {
                    if (response.status == 'success') {
                        updateIcountGrid();
                        updateIcountlistGrid($scope.icountID);
                        $('#icountGrid1').jqxGrid('refresh');
                        $('#icountGrid2').jqxGrid('refresh');
                        // $('#icountGrid2').jqxGrid('render');
                        $('#icountSuccessMsg #msg').html('Items have set successfully!.');
                        $scope.icountSuccessMsg.apply('open');
                        $('#setzeroAllItemCountListWin').jqxWindow('close');
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
            $('#finishIcountBtns').hide();
            $('#setzeroAllItemCountListWin').jqxWindow('open');
            // $('#setZeroIcountBtns').show();
        }
    };

    $scope.delItemCountList = function(option) {
        if(option == 0) {
            var countgrid = $('#icountlistGrid');
            var ids = [];
            var idx = countgrid.jqxGrid('selectedrowindexes');
            $.each(idx, function(i, el) {
                ids.push(countgrid.jqxGrid('getrowdata', el).Unique);
            });
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/massDeleteItemCountList',
                dataType: 'json',
                data: {ids: ids.join()},
                success: function (response) {
                    updateIcountGrid();
                    updateIcountlistGrid($scope.icountID);
                    countgrid.jqxGrid('unselectallrows');
                    $('#delItemCountListWin').jqxWindow('close');
                }
            });
        } else if(option == 1) {
            $('#delItemCountListWin').jqxWindow('close');
        } else {
            $('#delItemCountListWin').jqxWindow('open');
        }
        // if (confirm('Are you sure to delete selected items on grid?')) {}
    };

    /**
     * @desc Apply scan subtab actions on icount windows
     * @param option
     */
    $scope.scanFileCbxSettings = itemCountService.getScanFileSettings();
    $scope.icountscanGridSettings = itemCountService.getIscanlistInCount();

    function updateIcountscanGrid(id) {
        $('#icountscanGrid').show();
        $('#icountscanGrid').jqxGrid({
            source: itemCountService.getIscanlistInCount(id).source,
            autoheight: true,
            autorowheight: true
        });
    }

    $scope.scanFileSelected = null;
    $scope.scanFileCbxChange = function(e) {
        if (e.args.item) {
            var id = e.args.item.value;
            $scope.scanFileSelected = id;
            updateIcountscanGrid(id);
            $('#addToCountBtn').prop('disabled', false);
        } else {
            $('#icountscanGrid').hide();
        }
    };

    $scope.addScanToCount = function(option) {
        if(option == 0) {
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/addScanFileToCurrentCount/' + $scope.icountID + '/' + $scope.scanFileSelected,
                dataType: 'json',
                success: function (response) {
                    if (response.status == 'success') {
                        $('#addToCountWind').jqxWindow('close');
                        setTimeout(function() {
                            $('#scanFileCbx').jqxComboBox({selectedIndex: -1});
                            $('#icountscanGrid').hide();
                            $scope.completeScanFile();
                        }, 500);
                        updateIcountGrid();
                        updateIcountlistGrid($scope.icountID);
                        // $('#markFileCompleteWind').jqxWindow('open');
                    } else {
                        console.log('There was an error..');
                    }
                }
            });
        } else if(option == 1) {
            $('#addToCountWind').jqxWindow('close');
        } else {
            $('#addToCountWind').jqxWindow('open');
        }
    };

    $scope.completeScanFile = function(option) {
        if(option == 0) {
            $.ajax({
                method: 'post',
                url: SiteRoot + 'admin/ItemCount/closeScanFileToImport/' + $scope.scanFileSelected,
                dataType: 'json',
                async: false,
                success: function (response) {
                    if (response.status == 'success') {
                        var item = $('#scanFileCbx').jqxComboBox('getItemByValue', $scope.scanFileSelected);
                        $('#scanFileCbx').jqxComboBox('removeItem', item);
                        $('#scanFileCbx').jqxComboBox('removeAt', item.index);
                        // $('#scanFileCbx').jqxComboBox({source: itemCountService.getScanFileSettings().source});
                        $('#scanFileCbx').jqxComboBox(itemCountService.getScanFileSettings());
                        //
                        $('#addToCountWind').jqxWindow('close');
                        $('#markFileCompleteWind').jqxWindow('close');
                    } else {
                        console.log('There was an error on request!');
                    }
                }
            });
        } else if(option == 1) {
            $('#markFileCompleteWind').jqxWindow('close');
        } else {
            $('#markFileCompleteWind').jqxWindow('open');
        }
    };

});