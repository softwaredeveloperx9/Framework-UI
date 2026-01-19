'use strict';

angular.module('SmartAdmin.Layout').directive('minifyMenu', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var $body = $('body');

            // Fungsi untuk menyimpan status menu di localStorage
            var saveMenuState = function () {
                if ($body.hasClass('minified')) {
                    localStorage.setItem('menuMinified', 'true');
                } else {
                    localStorage.setItem('menuMinified', 'false');
                }
            };

            // Fungsi untuk toggle minified menu
            var minifyMenu = function () {
                if (!$body.hasClass('menu-on-top')) {
                    $body.toggleClass('minified');
                    $body.removeClass('hidden-menu');
                    $('html').removeClass('hidden-menu-mobile-lock');

                    // Simpan status menu
                    saveMenuState();
                }
            };

            // Cek localStorage saat halaman dimuat
            if (localStorage.getItem('menuMinified') === 'true') {
                $body.addClass('minified');
            }

            element.on('click', minifyMenu);
        },
    };
});
