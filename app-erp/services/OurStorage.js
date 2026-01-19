'use strict';

angular.module('app.erpUtils').factory('OurStorage', [
    '$location',
    function ($location) {
        var ourStorage = {};

        ourStorage.getPrefix = function () {
            let pathSegments = window.location.pathname.split('/');
            let appPath = pathSegments[1]; // Gets 'newdev', 'new', 'xpdev', or 'xp'

            if (!appPath) appPath = 'localmachine';

            return appPath + '_';
        };

        ourStorage.setItem = function (key, value) {
            localStorage.setItem(ourStorage.getPrefix() + key, value);
        };

        ourStorage.getItem = function (key = '') {
            return localStorage.getItem(ourStorage.getPrefix() + key);
        };

        ourStorage.removeItem = function (key) {
            localStorage.removeItem(ourStorage.getPrefix() + key);
        };

        ourStorage.clear = function () {
            let prefix = ourStorage.getPrefix();

            Object.keys(localStorage).forEach(function (key) {
                if (key.startsWith(prefix)) {
                    localStorage.removeItem(key);
                }
            });
        };

        return ourStorage;
    },
]);
