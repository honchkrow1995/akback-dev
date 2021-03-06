angular.module('akamaiposApp')
    .service('UserAdminService', function(adminService) {

    this.userGridSettings = function () {
        var pager = adminService.loadPagerConfig();
        var settings = {
            source: {
                dataType: 'json',
                dataFields: [
                    {name: 'Unique', type: 'int'},
                    {name: 'UserName', type: 'string'},
                    {name: 'FirstName', type: 'string'},
                    {name: 'LastName', type: 'string'},
                    //{name: 'Code', type: 'string'},
                    //{name: 'Password', type: 'string'},
                    {name: 'Address1', type: 'string'},
                    {name: 'Address2', type: 'string'},
                    {name: 'City', type: 'string'},
                    {name: 'State', type: 'string'},
                    {name: 'Zip', type: 'string'},
                    {name: 'Country', type: 'string'},
                    {name: 'PrimaryPosition', type: 'string'},
                    {name: 'PrimaryPositionName', type: 'string'},
                    {name: 'Phone1', type: 'string'},
                    {name: 'Phone2', type: 'string'},
                    {name: 'Email', type: 'string'},
                    {name: 'Note', type: 'string'},
                    {name: 'Created', type: 'string'},
                    {name: 'CreatedByName', type: 'string'},
                    {name: 'Updated', type: 'string'},
                    {name: 'UpdatedByName', type: 'string'},
                    {name: 'EmailPersonal', type: 'string'},
                    {name: 'EmailEnabled', type: 'string'},
                    {name: 'eserver', type: 'string'},
                    {name: 'esecure', type: 'string'},
                    {name: 'Port', type: 'string'},
                    {name: 'eusername', type: 'string'},
                    {name: 'epassword', type: 'string'},
                    {name: 'FromEmail', type: 'string'},
                    {name: 'FromName', type: 'string'},
                    {name: 'ReplyToEmail', type: 'string'},
                    {name: 'ReplyToName', type: 'string'},
                    {name: 'Signature', type: 'string'},
                    {name: 'EmployeeID', type: 'string'},
                    {name: 'AccessCard', type: 'string'},
                ],
                id: 'Unique',
                url: SiteRoot + 'admin/user/load_users'
            },
            columns: [
                {text: 'ID', dataField: 'Unique', type: 'int'},
                {text: 'User Name', dataField: 'UserName'},
                {text: 'First Name', dataField: 'FirstName'},
                {text: 'Last Name', dataField: 'LastName'},
                {text: 'Primary Position', dataField: 'PrimaryPositionName', filtertype: 'list'},
                {dataField: 'PrimaryPosition', hidden: true},
                {text: 'Address 1', dataField: 'Address1', hidden: true},
                {text: 'Address 2', dataField: 'Address2', hidden: true},
                {text: 'City', dataField: 'City', hidden: true},
                {text: 'State', dataField: 'State', hidden: true},
                {text: 'Zip', dataField: 'Zip', hidden: true},
                {text: 'Country', dataField: 'Country', hidden: true},
                {text: 'Phone 1', dataField: 'Phone1'},
                {text: 'Phone 2', dataField: 'Phone2'},
                {text: 'Email', dataField: 'Email'},
                {dataField: 'Note', hidden: true},
                {dataField: 'Created', hidden: true},
                {dataField: 'CreatedByName', hidden: true},
                {dataField: 'Updated', hidden: true},
                {dataField: 'UpdatedByName', hidden: true},
                {dataField: 'EmailPersonal', hidden: true},
                {dataField: 'EmailEnabled', hidden: true},
                {dataField: 'eserver', hidden: true},
                {dataField: 'esecure', hidden: true},
                {dataField: 'Port', hidden: true},
                {dataField: 'eusername', hidden: true},
                {dataField: 'epassword', hidden: true},
                {dataField: 'FromEmail', hidden: true},
                {dataField: 'FromName', hidden: true},
                {dataField: 'ReplyToEmail', hidden: true},
                {dataField: 'ReplyToName', hidden: true},
                {dataField: 'Signature', hidden: true},
                {dataField: 'EmployeeID', hidden: true},
                {dataField: 'AccessCard', hidden: true}
            ],
            columnsResize: true,
            width: "99.7%",
            theme: 'arctic',
            altRows: true,
            sortable: true,
            filterable: true,
            showfilterrow: true,
            pageable: true,
            pageSize: pager.pageSize,
            pagesizeoptions: pager.pagesizeoptions,
            autoheight: true,
            autorowheight: true
        };

        return settings;
    };

    this.userPositionGridSettings = function(id) {
        var url = '';
        if (id != undefined)
            url = SiteRoot + 'admin/user/load_positionsByUser/' + id;
        return {
            source: {
                dataType: 'json',
                dataFields: [
                    {name: 'Unique', type: 'number'},
                    {name: 'PositionName', type: 'string'},
                    {name: 'PrimaryPosition', type: 'string'},
                    {name: 'ConfigUserUnique', type: 'string'},
                    {name: 'ConfigPositionUnique', type: 'string'},
                    {name: 'PrimaryPosition', type: 'string'},
                    {name: 'isPosition', type: 'string'},
                    {name: 'PayBasis', type: 'string'},
                    {name: 'PayRate', type: 'string'}
                ],
                id: 'Unique',
                url: url
            },
            columns: [
                {text: 'Unique', dataField: 'Unique', type: 'number', hidden:true},
                {text: 'Name', dataField: 'PositionName', type: 'string', width: '35%'},
                {text: 'Primary id', dataField: 'PrimaryPosition', type: 'string', hidden: true},
                {text: 'Primary', dataField: 'isPosition', type: 'string', width: '15%'},
                {text: 'User Unique', dataField: 'ConfigUserUnique', type: 'number', hidden:true},
                {text: 'Position Unique', dataField: 'ConfigPositionUnique', type: 'number', hidden:true},
                {text: 'Pay Basis', dataField: 'PayBasis', type: 'string', width: '25%'},
                {text: 'Pay Rate', dataField: 'PayRate', type: 'string', width: '25%'}
            ],
            columnsResize: true,
            width: "99%",
            theme: 'arctic',
            altRows: true,
            sortable: true,
            // filterable: true,
            // showfilterrow: true,
            pageable: true,
            pageSize: 10,
            // pagesizeoptions: pager.pagesizeoptions,
            autoheight: true,
            autorowheight: true
        };
    }
});
