angular.module('app.frmUtils').controller('LoginXCtrl', function ($scope, $rootScope, $location, AuthenticationService) {
    $scope.inputLogin = '';
    $scope.inputPassword = '';
    $rootScope.GlobalMessage = '';

    $scope.login = async function () {
        let passwd = $scope.inputPassword;
        if (passwd == '') {
            messageValidasi('Password tidak boleh kosong');
            return;
        }

        AuthenticationService.ClearSessions();

        var [userName, domain] = $scope.inputLogin.split('@');

        domain = 'Organization_Domain';

        let response = await AuthenticationService.Check_UserDomain(userName, domain);

        // not ok, exit immediately
        if (!response.success) {
            $rootScope.GlobalMessage = response.data;

            return;
        }

        response = await AuthenticationService.Check_User(userName, passwd, response.data.OrganizationId);

        // not ok, exit immediately
        if (!response.success) {
            $rootScope.GlobalMessage = response.data;

            return;
        }

        // clear
        $rootScope.GlobalMessage = '';

        // redirect
        $location.path($rootScope.LandingPage_for_User());
    };

    function messageValidasi(content) {
        $rootScope.GlobalMessage = content;

        $.bigBox({
            title: 'Error: Message',
            content: content,
            color: '#C46A69',
            icon: 'fa fa-warning shake animated',
            number: '',
            timeout: 4000,
        });
    }
});
