angular.module('app.erp').controller('SettingsCtrl', function ($rootScope, $scope, $stateParams, $window, Utility_ERP, Uoms_Service) {
    // Data to View
    $scope.form = {};
    $scope.form.submitted = false;

    // CRUD: Create, Read, Update, Delete
    $scope.Is_Read = false;
    $scope.Is_Create = false;
    $scope.Is_Update = false;
    $scope.Is_Writeable = false;

    $scope.still_processing = false;

    let model_Data_Inside = {
        Code: '',
        Name: '',
        LegalName: '',
        Active: true,
        Address: '',
        AddressLine2: '',
        AddressLine3: '',
        AddressLine4: '',
        City: '',
        Province: '',
        CountryCode: '',
        PostalCode: '',
        PhoneNumber: '',
        Email: '',
        Website: '',
        TaxId: '',
        KppName: '',
        TaxStatus: '',
        PpnStatus: false,
        PpnTariff: '',
        TaxType: '',
        CompanyLogo: null,
        CompanyLogoFile: null
    };

    let model_Template = {
        Kunci: 'Setting_Company',
        Data: { ...model_Data_Inside },
    };

    $scope.model = { ...model_Template };

    // some Functions
    $scope.showData = async function () {
        //if (!$scope.Is_Read) return;

        Utility_ERP.Still_Processing($scope, true);
        let response = await Utility_ERP.GeDataStore($scope.model.Kunci);
        if (!response.success) {
            Utility_ERP.Still_Processing($scope, false);
            return;
        }

        if (!response.data) {
            // let code = $scope.model.Kunci;

            // // reset
            // $scope.model = { ...model_Template };

            // messageValidasi(`Data dengan code '${code}', tidak ditemukan`);
            // Utility_ERP.Still_Processing($scope, false);
            return;
        }
        $scope.model.Data = JSON.parse(response.data.Data);

        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.saveData = async function (skipConfirmation = false) {
        //if ($scope.still_processing) return;

        $scope.form.submitted = true;
        Utility_ERP.Still_Processing($scope, true);

        if (!(await $scope.Valid_toSave(skipConfirmation))) {
            Utility_ERP.Still_Processing($scope, false);

            return;
        }

        let data = {
            dataInput: {
                Kunci: $scope.model.Kunci,
                Data: JSON.stringify($scope.model.Data),
            }
        };

        $rootScope.SanitizeInput(data, model_Template);

        let resultSave = await Utility_ERP.SaveDataStore(data.dataInput);

        if (!resultSave.success) {
            Utility_ERP.Still_Processing($scope, false);
            $scope.form.submitted = false;

            return;
        }

        messageInfo('Data berhasil disimpan');
    };

    $scope.Valid_toSave = async function (skipConfirmation) {
        // if ($rootScope.Not_ValidString($scope.model.Code)) {
        //     messageValidasi('Code must not be empty');
        //     return false;
        // }

        // if ($rootScope.Not_ValidString($scope.model.ShortName)) {
        //     messageValidasi('ShortName must not be empty');
        //     return false;
        // }

        // if ($rootScope.Not_ValidString($scope.model.Description)) {
        //     messageValidasi('Description must not be empty');
        //     return false;
        // }

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
            }
        );

        setTimeout(() => {
            Utility_ERP.Still_Processing($scope, false);
            $scope.form.submitted = false;
        }, $rootScope.Timeout_Save());
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

    $scope.initialize_Page = async function () {

        await Data_References();

        await $scope.showData();

        // Langsung Mode Edit, jika sedang dalam kondisi Mode - Read
        if ($scope.Is_Read) {
            $scope.Set_Editable();
        }
    };

    $scope.initialize_Page();

});