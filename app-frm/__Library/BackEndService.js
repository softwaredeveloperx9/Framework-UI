'use strict';

angular.module('app.frmUtils').factory('BackEndService', [
    '$http',
    '$q',
    '$rootScope',
    function ($http, $q, $rootScope) {
        var service = {};

        service.RequestAction = function (jsonData) {
            let deferred = $q.defer();
            let apiUrl = service.APIUrl() + '/action';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify(jsonData),
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

        service.RequestActionWithFile = function (jsonData, attachmentFile) {
            let deferred = $q.defer();
            let apiUrl = service.APIUrl() + '/actionwithfile';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                headers: {
                    'Content-Type': undefined,
                },
                transformRequest: function (data) {
                    var formData = new FormData();

                    formData.append('jsonData', JSON.stringify(jsonData));
                    formData.append('file', attachmentFile);

                    return formData;
                },
                data: {
                    model: jsonData,
                    files: attachmentFile,
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

        service.ImportData = function (jsonData, attachmentFile) {
            let deferred = $q.defer();
            let apiUrl = service.APIUrl() + '/importdata';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                headers: {
                    'Content-Type': undefined,
                },
                transformRequest: function (data) {
                    var formData = new FormData();

                    formData.append('jsonData', JSON.stringify(jsonData));
                    formData.append('file', attachmentFile);

                    return formData;
                },
                data: {
                    model: jsonData,
                    files: attachmentFile,
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

        service.RequestDataList = function (jsonData) {
            let deferred = $q.defer();
            let apiUrl = service.APIUrl() + '/getlist';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify(jsonData),
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

        service.RequestDataList_X = function (jsonData) {
            let deferred = $q.defer();
            let apiUrl = service.APIUrl() + '/getlistX';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify(jsonData),
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

        service.RequestReport = function (jsonData) {
            let deferred = $q.defer();
            let apiUrl = service.APIUrl() + '/getreport';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify(jsonData),
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            return $http(config).then(
                function (response) {
                    response.success = true;

                    var blob = response.data;
                    var contentType = response.headers('content-type');
                    var fileURL = URL.createObjectURL(blob);
                    window.open(fileURL);

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

        service.GetDataListHttpPromise = function (jsonData) {
            let apiUrl = service.APIUrl() + '/getlist';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            let myPromise = $http(config);

            return myPromise;
        };

        service.RequestDataSingle = function (jsonData) {
            let deferred = $q.defer();
            let apiUrl = service.APIUrl() + '/GetSingle';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify(jsonData),
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

        service.APIUrl = function () {
            let url = '';

            try {
                url = $rootScope.appSettings.Endpoint + '/Main';
            } catch (ex) { }

            return url;
        };

        service.Log_Activity = function (jsonData = '') {
            var apiUrl = service.APIUrl() + '/Activity';

            if (jsonData == null) jsonData = '';

            var myPromise = $http({
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            myPromise.then(
                function (response) {
                    // do nothing
                },
                function (response) {
                    // do nothing
                }
            );
        };

        return service;
    },
]);
