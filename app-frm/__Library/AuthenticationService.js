'use strict';

angular.module('app.frmUtils').factory('AuthenticationService', [
    '$http',
    '$q',
    '$rootScope',
    '$location',
    'jwtHelper',
    'OurStorage',
    function ($http, $q, $rootScope, $location, jwtHelper, OurStorage) {
        var service = {};
        var authAPIUrl = '';

        service.app_settings = function () {
            let pathSegments = window.location.pathname.split('/');
            let appPath = pathSegments[1];

            let configPath = appPath ? `/${appPath}/app-settings.json` : '/app-settings.json';

            $http.get(configPath).then(function (response) {
                $rootScope.appSettings = response.data;
                authAPIUrl = $rootScope.appSettings.Endpoint + '/Auth';
            });
        }

        if ($location.path() === '/login') {
            // jika berada di halaman login, ambil appSettings.json
            //     # walaupun masih Login Active -- pada Tab lainnya
            //     # tujuannya untuk mendapatkan content file app-settings.json yang terbaru
            // Note:
            //     # jika Landing pada Page Login ini, tidak usah otomatis panggil Logout
            //     # Tab lainnya tidak usah otomatis ter-Logout
            //     # Logout hanya dilakukan
            //           o jika User click Menu Logout
            //           o jika User click button Login pada Page Login

            service.app_settings();
        }

        service.Check_UserDomain = function (UserName, DomainName) {
            let deferred = $q.defer();
            let apiUrl = authAPIUrl + '/UserNameAuth';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify({
                    UserName: UserName,
                    DomainName: DomainName,
                    applicationId: $rootScope.appSettings.ApplicationId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            return $http(config).then(
                function (response) {
                    response.success = true;

                    // promise is fulfilled
                    deferred.resolve(response);

                    // promise is returned
                    return deferred.promise;
                },
                function (response) {
                    response.success = false;

                    // rejects the promise
                    //deferred.reject(response);

                    // di sini gunakan resolve() dan bukan reject()
                    // karena indikator Gagal proses Check_User() sudah ditaruh pada response.success = false
                    // --> tidak usah catch pada Promise ini
                    deferred.resolve(response);

                    // promise is returned
                    return deferred.promise;
                }
            );
        };

        service.Check_User = function (username, password, organizationId) {
            let deferred = $q.defer();
            let apiUrl = authAPIUrl;

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify({
                    username: username,
                    password: password,
                    OrganizationId: organizationId,

                    applicationId: $rootScope.appSettings.ApplicationId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            return $http(config).then(
                function (response) {
                    response.success = true;

                    service.SetAuthSessions(response.data);

                    // promise is fulfilled
                    deferred.resolve(response);

                    // promise is returned
                    return deferred.promise;
                },
                function (response) {
                    response.success = false;

                    // rejects the promise
                    //deferred.reject(response);

                    // di sini gunakan resolve() dan bukan reject()
                    // karena indikator Gagal proses Check_User() sudah ditaruh pada response.success = false
                    // --> tidak usah catch pada Promise ini
                    deferred.resolve(response);

                    // promise is returned
                    return deferred.promise;
                }
            );
        };

        service.ChangePassword = function (password, newPassword) {
            let deferred = $q.defer();
            let changePasswordModel = {};
            changePasswordModel.Password = password;
            changePasswordModel.NewPassword = newPassword;

            let apiUrl = authAPIUrl + '/api/main/ChangePassword';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify(changePasswordModel),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            return $http(config).then(
                function (response) {
                    response.success = true;

                    // promise is fulfilled
                    deferred.resolve(response);

                    // promise is returned
                    return deferred.promise;
                },
                function (response) {
                    response.success = false;

                    // rejects the promise
                    //deferred.reject(response);

                    // di sini gunakan resolve() dan bukan reject()
                    // karena indikator Gagal proses Check_User() sudah ditaruh pada response.success = false
                    // --> tidak usah catch pada Promise ini
                    deferred.resolve(response);

                    // promise is returned
                    return deferred.promise;
                }
            );
        };

        service.Logout = function () {
            let apiUrl = '';

            try {
                if (!$rootScope.FRM.currentUser.token) return;
            } catch (error) {
                return;
            }

            try {
                apiUrl = $rootScope.appSettings.Endpoint + '/Main';
            } catch (error) { }

            if (apiUrl.includes('undefined')) return;
            if (apiUrl.includes('null')) return;

            if ($rootScope.Not_ValidString(apiUrl)) return;

            let deferred = $q.defer();
            apiUrl += '/Logout';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: '',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            return $http(config).then(
                function (response) {
                    response.success = true;
                    // promise is fulfilled
                    deferred.resolve(response);

                    // promise is returned
                    return deferred.promise;
                },
                function (response) {
                    response.success = false;

                    // rejects the promise
                    //deferred.reject(response);

                    // di sini gunakan resolve() dan bukan reject()
                    // karena indikator Gagal proses Check_User() sudah ditaruh pada response.success = false
                    // --> tidak usah catch pada Promise ini
                    deferred.resolve(response);

                    // promise is returned
                    return deferred.promise;
                }
            );
        };

        service.SetAuthSessions = function (token) {
            let deferred = $q.defer();

            let userInfo = jwtHelper.decodeToken(token);

            $rootScope.FRM = {
                currentUser: userInfo,
                currentScopes: userInfo.Scope.split(','),
            };

            $rootScope.FRM.currentUser.token = token;

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            OurStorage.setItem('appSettings', JSON.stringify($rootScope.appSettings));
            OurStorage.setItem('', JSON.stringify($rootScope.FRM));

            var response = { success: true };

            deferred.resolve(response);

            // promise is returned
            return deferred.promise;
        };

        service.ValidateCurrentAccessScope = function (accessScopes) {
            let found = false;
            angular.forEach(accessScopes, function (permission, index) {
                if ($rootScope.FRM.currentScopes.indexOf(permission) >= 0) {
                    found = true;
                    return;
                }
            });

            return found;
        };

        service.ClearSessions = function () {
            service.Logout();

            $rootScope.FRM = {};
            OurStorage.clear();

            // reset
            $http.defaults.headers.common.Authorization = 'Basic ';

            // load ulang, sehingga Page menjadi ready untuk proses Login berikutnya
            service.app_settings();
        };


        if (OurStorage.getItem('logout')) {
            service.ClearSessions();
        }

        return service;
    },
]);
