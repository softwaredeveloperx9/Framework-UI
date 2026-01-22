'use strict';

/**
 * @ngdoc overview
 * @name app [framework-ui]
 * @description
 * # app [framework-ui]
 *
 * Main module of the application.
 */

angular
    .module('app', [
        'vsGoogleAutocomplete',
        'ngSanitize',
        'ngAnimate',
        'restangular',
        'ui.router',
        'ui.bootstrap',

        // Smartadmin Angular Common Module
        'SmartAdmin',

        // App
        'app.auth',
        'app.layout',

        'cur.$mask',
        'app.frm',
    ])
    .config(function ($provide, $httpProvider, RestangularProvider) {
        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function ($q, $rootScope, $location) {
            var errorCounter = 0;

            var error401 = 0;
            var error404 = 0;
            var error405 = 0;
            var error_Minus_1 = 0;

            function notifyError(rejection) {
                // check apakah Error terjadi karena akses ke API untuk Logout ?
                // jika iya, ignore Error
                try {
                    if (rejection.config.url.includes('/Logout')) return;
                } catch (ex) { }

                /**
                 * BackEnd:
                 *      1. Tidak ada {Error code: -1}
                 *      2. Ada, tetapi Url salah {Error code: 404}
                 *      3. Ada {Error code: 401}
                 *          o User account not found
                 *          o Invalid credentials
                 *          o Unauthorized {Token salah} - tidak punya akses 
                 *      4. lainnya  {Error code: 400, 405, 500, ...}
                 *          o kesalahan pada Aplikasi
                 */

                let content = `
                                Sesi Anda telah berakhir. Silahkan login kembali.
                                <br>
                                <br>
                                <button class="btn btn-default" onclick="redirectToLogin()">Login</button>
                `;

                let title = '';
                let number = rejection.status;
                let timeout = 10000;

                switch (rejection.status) {
                    case 401:
                        if (rejection.data == 'User account not found') {
                            content = rejection.data;
                            title = rejection.status + ' ' + rejection.statusText;
                            number = ++errorCounter;
                            timeout = 5000;
                            break;
                        }
                        if (rejection.data == 'Invalid credentials') {
                            content = rejection.data;
                            title = rejection.status + ' ' + rejection.statusText;
                            number = ++errorCounter;
                            timeout = 5000;
                            break;
                        }

                        if (error401 >= 1) {
                            // agar tidak tampil Error Message yang sama
                            return;
                        }

                        error401++;
                        error404 = 0;
                        error405 = 0;
                        break;
                    case 404:
                        content = 'URL not found:<br/>' + rejection.config.url;

                        if (error404 >= 1) {
                            // agar tidak tampil Error Message yang sama
                            return;
                        }

                        error401 = 0;
                        error404++;
                        error405 = 0;
                        break;
                    case 405:
                        content = rejection.data + rejection.config.url;
                        title = rejection.status + ' ' + rejection.statusText;

                        if (error405 >= 1) {
                            // agar tidak tampil Error Message yang sama
                            return;
                        }

                        error401 = 0;
                        error404 = 0;
                        error405++;
                        break;
                    default:
                        if (rejection.status == -1) {
                            if (error_Minus_1 >= 1) {
                                // agar tidak tampil Error Message yang sama
                                return;
                            }

                            error_Minus_1++;
                        }

                        content = rejection.data || 'Terjadi kesalahan pada sistem.';
                        title = rejection.status + ' ' + rejection.statusText;
                        number = ++errorCounter;
                        timeout = 5000;
                        break;
                }

                $.bigBox({
                    title: title,
                    content: content,
                    color: '#C46A69',
                    icon: 'fa fa-warning shake animated',
                    number: number,
                    timeout: timeout,
                });

                setTimeout(function () {
                    // reset, supaya Error Message bisa muncul lagi
                    error401 = 0;
                    error404 = 0;
                    error405 = 0;
                    error_Minus_1 = 0;
                }, timeout);
            }

            window.redirectToLogin = function () {
                $rootScope.$apply(function () {
                    $rootScope.logout();
                });
            };

            return {
                // On request failure
                requestError: function (rejection) {
                    // show notification
                    notifyError(rejection);

                    // Return the promise rejection.
                    return $q.reject(rejection);
                },

                // On response failure
                responseError: function (rejection) {
                    // show notification
                    notifyError(rejection);
                    // Return the promise rejection.
                    return $q.reject(rejection);
                },
            };
        });

        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('ErrorHttpInterceptor');

        RestangularProvider.setBaseUrl(location.pathname.replace(/[^\/]+?$/, ''));
    })
    .constant('APP_CONFIG', window.appConfig)

    .run([
        '$rootScope',
        '$state',
        '$stateParams',
        '$location',
        '$http',
        'Global_Data_FRM',
        function ($rootScope, $state, $stateParams, $location, $http, Global_Data_FRM) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            // editableOptions.theme = 'bs3';

            Global_Data_FRM.Generate($rootScope);

            // keep user logged in after page refresh
            if ($rootScope.FRM.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.FRM.currentUser.token;
            }

            //$rootScope.$on('$locationChangeStart', function (event, next, current) {
            //$rootScope.$on('$routeChangeStart', function (event, next, current) {
            $rootScope.$on('$stateChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() == '/login') return;
                if ($location.path() == '/forgotpassword') return;

                if (!$rootScope.FRM) {
                    //$location.path('/login');
                    return;
                }

                if (!$rootScope.FRM.currentUser) {
                    //$location.path('/login');
                    return;
                }
            });
        },
    ]);
