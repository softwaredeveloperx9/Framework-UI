angular.module('app.erp').controller('ShipmentRoutingCtrl', function ($rootScope, $scope, Utility_ERP, ShipmentRouting_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Source: { PropertyName: 'Source', Operator: 'in', Value: '' },
        Consignee: { PropertyName: 'ConsigneeID', Operator: '=', Value: '' },
        Site: { PropertyName: 'SiteCode', Operator: 'in', Value: '' },
        SourceNr: { PropertyName: 'SourceNr', Operator: 'contains', Value: '' },
        ConsigneeArea: { PropertyName: 'ConsigneeArea', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        DeliverVia: { PropertyName: 'DeliverVia', Operator: 'in', Value: '' },
        Project: { PropertyName: 'ProjectCode', Operator: 'in', Value: '' },
        DeliveryDate_date: { PropertyName: 'DeliveryDate', Operator: '=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedSource = '';
    $scope.selectedConsignee = '';
    $scope.selectedSite = '';
    $scope.selectedConsigneeArea = '';
    $scope.selectedStatus = '';
    $scope.selectedType = '';
    $scope.selectedDeliverVia = '';
    $scope.selectedProject = '';
    $scope.selectedDeliveryDate = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Source = [];
    $scope.data_Site = [];
    $scope.data_ConsigneeArea = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];
    $scope.data_Type = [];
    $scope.data_DeliverVia = [];
    $scope.data_Project = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = ShipmentRouting_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Route Nr.', 'RouteNr', 'RouteNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Source', 'Source', 'Source', 'Text', true],
            ['Source Nr.', 'SourceNr', 'SourceNr', 'Text', true],
            ['Consignee', 'Consignee', 'Consignee', 'Text', true],
            ['Ship To', 'ShipTo', 'ShipTo', 'Text', true],
            ['Area', 'Area', 'Area', 'Text', true],
            ['Qty', 'Qty', 'Qty', 'Number', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Age', 'Age', 'Age', 'Number', true],
            ['Via', 'Via', 'Via', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedBranch) {
            $scope.filters.Branch.Operator = 'in';
            $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        } else {
            $scope.filters.Branch.Operator = '=';
            $scope.filters.Branch.Value = $scope.selectedBranch;
        }

        if (!$scope.selectedSource) {
            $scope.filters.Source.Operator = 'in';
            $scope.filters.Source.Value = Utility_ERP.Value_OperatorIN_($scope.data_Source, 'Code');
        } else {
            $scope.filters.Source.Operator = '=';
            $scope.filters.Source.Value = $scope.selectedSource;
        }

        if (!$scope.selectedSite) {
            $scope.filters.Site.Operator = 'in';
            $scope.filters.Site.Value = Utility_ERP.Value_OperatorIN_($scope.data_Site, 'Code');
        } else {
            $scope.filters.Site.Operator = '=';
            $scope.filters.Site.Value = $scope.selectedSite;
        }

        if (!$scope.selectedConsigneeArea) {
            $scope.filters.ConsigneeArea.Operator = 'in';
            $scope.filters.ConsigneeArea.Value = Utility_ERP.Value_OperatorIN_($scope.data_ConsigneeArea, 'Code');
        } else {
            $scope.filters.ConsigneeArea.Operator = '=';
            $scope.filters.ConsigneeArea.Value = $scope.selectedConsigneeArea;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

        if (!$scope.selectedDeliverVia) {
            $scope.filters.DeliverVia.Operator = 'in';
            $scope.filters.DeliverVia.Value = Utility_ERP.Value_OperatorIN_($scope.data_DeliverVia, 'Code');
        } else {
            $scope.filters.DeliverVia.Operator = '=';
            $scope.filters.DeliverVia.Value = $scope.selectedDeliverVia;
        }

        if (!$scope.selectedProject) {
            $scope.filters.Project.Operator = 'in';
            $scope.filters.Project.Value = Utility_ERP.Value_OperatorIN_($scope.data_Project, 'Code');
        } else {
            $scope.filters.Project.Operator = '=';
            $scope.filters.Project.Value = $scope.selectedProject;
        }

        $scope.filters.DeliveryDate_date.Value = $rootScope.Date_to_DB($scope.selectedDeliveryDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedConsignee'] = $scope.selectedConsignee;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('ShipmentRouting', $scope);

        delete $scope.filters['selectedConsignee'];
        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Source = async function () {
        $scope.data_Source = await ShipmentRouting_Service.Dropdown_Source();
    };

    $scope.getData_Site = async function () {
        $scope.data_Site = await ShipmentRouting_Service.Dropdown_Site();
    };

    $scope.getData_ConsigneeArea = async function () {
        $scope.data_ConsigneeArea = await ShipmentRouting_Service.Dropdown_ConsigneeArea();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('ShipmentRouting');

        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        $rootScope.SetDefaultDropdownList($scope.data_Status, 'StatusId', $scope, 'selectedStatus');
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await ShipmentRouting_Service.Dropdown_Type();
    };

    $scope.getData_DeliverVia = async function () {
        $scope.data_DeliverVia = await ShipmentRouting_Service.Dropdown_DeliverVia();
    };

    $scope.getData_Project = async function () {
        $scope.data_Project = await ShipmentRouting_Service.Dropdown_Project();
    };

    $scope.selectedShowAll_Change = async function (flag = true, flag2 = true) {
        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        // just to make UX consistent
        if (flag2) $scope.selectedStatus = '';

        if (flag) {
            await $scope.showData();
        }
    };

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let source = $scope.filters.Source.Value;
        if (source && typeof source === 'string' && source.indexOf('(') >= 0) source = '';
        $scope.selectedSource = source;

        let site = $scope.filters.Site.Value;
        if (site && typeof site === 'string' && site.indexOf('(') >= 0) site = '';
        $scope.selectedSite = site;

        let consigneeArea = $scope.filters.ConsigneeArea.Value;
        if (consigneeArea && typeof consigneeArea === 'string' && consigneeArea.indexOf('(') >= 0) consigneeArea = '';
        $scope.selectedConsigneeArea = consigneeArea;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let deliverVia = $scope.filters.DeliverVia.Value;
        if (deliverVia && typeof deliverVia === 'string' && deliverVia.indexOf('(') >= 0) deliverVia = '';
        $scope.selectedDeliverVia = deliverVia;

        let project = $scope.filters.Project.Value;
        if (project && typeof project === 'string' && project.indexOf('(') >= 0) project = '';
        $scope.selectedProject = project;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedConsignee = $scope.filters['selectedConsignee'];
            delete $scope.filters['selectedConsignee'];

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Source(),
            $scope.getData_Site(),
            $scope.getData_ConsigneeArea(),
            $scope.getData_Status(),
            $scope.getData_Type(),
            $scope.getData_DeliverVia(),
            $scope.getData_Project()
        ]);

        $rootScope.LoadFilterState('ShipmentRouting', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.exportList = async function () { }

    $scope.reviseDeliveryDate = async function () { }

    $scope.pickClick = async function () { }

    $scope.viewPicked = async function () { }

    $scope.splitRoute = async function () { }

    $scope.voidClick = async function () { }

    $scope.initialize_Page();
});