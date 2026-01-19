angular.module('app.erp').controller('UomFormCtrl', function ($rootScope, $scope, $stateParams, $window, Utility_ERP, Uoms_Service) {
    // Data to View
    $scope.form = {};
    $scope.form.submitted = false;

    // CRUD: Create, Read, Update, Delete
    $scope.Is_Read = false;
    $scope.Is_Create = false;
    $scope.Is_Update = false;
    $scope.Is_Writeable = false;

    $scope.still_processing = false;

    let model_Template = {
        Code: '',
        Description: '',
        ShortName: '',
        Active: true,
        IsPackingUom: false,
        PackingLevel: 0,
    };

    $scope.model = { ...model_Template };

    // some Functions
    $scope.showData = async function () {
        if (!$scope.Is_Read) return;

        Utility_ERP.Still_Processing($scope, true);
        let response = await Uoms_Service.DataSingle($scope.model.Code);
        if (!response.success) {
            Utility_ERP.Still_Processing($scope, false);
            return;
        }

        if (!response.data) {
            let code = $scope.model.Code;

            // reset
            $scope.model = { ...model_Template };

            messageValidasi(`Data dengan code '${code}', tidak ditemukan`);
            Utility_ERP.Still_Processing($scope, false);
            return;
        }

        $scope.model = response.data;

        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.saveData = async function (skipConfirmation = false) {
        if ($scope.still_processing) return;

        $scope.form.submitted = true;
        Utility_ERP.Still_Processing($scope, true);

        if (!(await $scope.Valid_toSave(skipConfirmation))) {
            Utility_ERP.Still_Processing($scope, false);

            return;
        }

        let data = {
            dataInput: $scope.model,
        };

        $rootScope.SanitizeInput(data, model_Template);

        let resultSave = await Uoms_Service.Save(data.dataInput, $scope.Is_Create);

        if (!resultSave.success) {
            Utility_ERP.Still_Processing($scope, false);
            $scope.form.submitted = false;

            return;
        }

        messageInfo('Data berhasil disimpan');
    };

    $scope.Valid_toSave = async function (skipConfirmation) {
        if ($rootScope.Not_ValidString($scope.model.Code)) {
            messageValidasi('Code must not be empty');
            return false;
        }

        if ($rootScope.Not_ValidString($scope.model.ShortName)) {
            messageValidasi('ShortName must not be empty');
            return false;
        }

        if ($rootScope.Not_ValidString($scope.model.Description)) {
            messageValidasi('Description must not be empty');
            return false;
        }

        return true;
    };

    function messageValidasi(content) {
        $.bigBox({
            title: 'Error: Message',
            content: content,
            color: '#C46A69',
            icon: 'fa fa-warning shake animated',
            number: '',
            timeout: 5000,
        });
    }

    function messageInfo(content) {
        let alreadyBack = false;

        $.bigBox(
            {
                title: 'Informasi',
                content: content,
                color: '#739E73',
                timeout: $rootScope.Timeout_Save(),
                icon: 'fa fa-check',
                number: '',
            },
            function () {
                Utility_ERP.Still_Processing($scope, false);
                $scope.form.submitted = false;

                alreadyBack = true;
                $window.history.back();
            }
        );

        setTimeout(() => {
            Utility_ERP.Still_Processing($scope, false);
            $scope.form.submitted = false;

            if (alreadyBack) return;
            $window.history.back();
        }, $rootScope.Timeout_Save());
    }

    $scope.Toggle_debugScope_ = function () {
        $rootScope.Toggle_debugScope($scope);
    }

    async function Data_References() { }

    $scope.Set_Editable = async function () {
        if ($scope.still_processing) return;

        $scope.Is_Read = false;
        $scope.Is_Create = false;
        $scope.Is_Update = true;

        $scope.Is_Writeable = $scope.Is_Create || $scope.Is_Update;

        Data_References();
    }

    $scope.handleParameters = function () {
        $scope.model.Code = $rootScope.Simple_Decode($rootScope.getParamValue($stateParams, 'code'));

        $scope.Is_Read = $rootScope.Not_Null($scope.model.Code);

        $scope.Is_Create = !$scope.Is_Read;
        $scope.Is_Update = false;

        $scope.Is_Writeable = $scope.Is_Create || $scope.Is_Update;
    }

    $scope.initialize_Page = async function () {
        $scope.handleParameters();

        await Data_References();

        await $scope.showData();

        // Langsung Mode Edit, jika sedang dalam kondisi Mode - Read
        if ($scope.Is_Read) {
            $scope.Set_Editable();
        }
    };

    $scope.initialize_Page();

});