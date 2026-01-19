"use strict";

(function ($) {

    $.fn.smartCollapseToggle = function () {

        return this.each(function () {

            var $body = $('body');
            var $this = $(this);

            // only if not  'menu-on-top'
            if ($body.hasClass('menu-on-top')) {


            } else {

                $body.hasClass('mobile-view-activated')

                // toggle open
                $this.toggleClass('open');

                // for minified menu collapse only second level
                if ($body.hasClass('minified')) {
                    if ($this.closest('nav ul ul').length) {
                        $this.find('>a .collapse-sign .fa').toggleClass('fa-minus-square-o fa-plus-square-o');
                        $this.find('ul:first').slideToggle(appConfig.menu_speed || 200);
                    }
                } else {
                    // toggle expand item
                    $this.find('>a .collapse-sign .fa').toggleClass('fa-minus-square-o fa-plus-square-o');
                    $this.find('ul:first').slideToggle(appConfig.menu_speed || 200);
                }
            }
        });
    };

    // Function untuk expand tanpa toggle
    $.fn.smartCollapseExpand = function () {
        return this.each(function () {
            var $body = $('body');
            var $this = $(this);

            if (!$body.hasClass('menu-on-top') && !$this.hasClass('open')) {
                $this.addClass('open');

                if ($body.hasClass('minified')) {
                    if ($this.closest('nav ul ul').length) {
                        $this.find('>a .collapse-sign .fa').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                        $this.find('ul:first').slideDown(appConfig.menu_speed || 200);
                    }
                } else {
                    $this.find('>a .collapse-sign .fa').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                    $this.find('ul:first').slideDown(appConfig.menu_speed || 200);
                }
            }
        });
    };

})(jQuery);

angular.module('SmartAdmin.Layout').directive('smartMenu', function ($state, $rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var $body = $('body');

            var $collapsible = element.find('li[data-menu-collapse]');

            // *** SIMPLIFIED: Function untuk expand menu berdasarkan state dengan CoC ***
            var expandMenuForState = function (stateName, stateUrl) {
                // Normalize state name: hapus "Form" suffix untuk mencari base menu
                var baseStateName = stateName;

                // Normalize state name: handle both patterns
                var baseStateName = stateName;

                // Pattern 1: projects + projectsForm → projects
                // Pattern 2: customers + customerForm → customers

                var suffixPatterns = ['form', 'view', 'verify'];

                for (var i = 0; i < suffixPatterns.length; i++) {
                    var suffix = suffixPatterns[i];

                    if (stateName.toLowerCase().endsWith(suffix)) {
                        var beforeSuffix = stateName.substring(0, stateName.length - suffix.length);

                        // Check if it already ends with 's'
                        if (beforeSuffix.toLowerCase().endsWith('s')) {
                            baseStateName = beforeSuffix;
                        } else {
                            // baseStateName = beforeSuffix + 's';

                            // untuk saat ini, pakai saja sebagai as is
                            baseStateName = beforeSuffix;
                        }

                        // Break after first match
                        break;
                    }
                }

                // Cari menu link yang match dengan base state name
                var $matchedLink = null;

                // 1. Coba exact match dengan base state
                element.find('a[data-ui-sref]').each(function () {
                    var uiSref = $(this).attr('data-ui-sref');
                    if (uiSref === baseStateName) {
                        $matchedLink = $(this);
                        return false; // break loop
                    }
                });

                // 2. Jika tidak ketemu, coba exact match dengan state name asli
                if (!$matchedLink) {
                    element.find('a[data-ui-sref]').each(function () {
                        var uiSref = $(this).attr('data-ui-sref');
                        if (uiSref === stateName) {
                            $matchedLink = $(this);
                            return false; // break loop
                        }
                    });
                }

                // Expand parent menu dari link yang cocok
                if ($matchedLink) {
                    // Remove active dari semua menu
                    element.find('li').removeClass('active');

                    var $parentMenuItems = $matchedLink.parents('li[data-menu-collapse]');

                    // Expand semua parent menu
                    $parentMenuItems.each(function () {
                        var $parentLi = $(this);
                        $parentLi.smartCollapseExpand();
                        $parentLi.addClass('active');
                    });

                    // Tambahkan class active ke link item
                    $matchedLink.parent('li').addClass('active');
                }
            };

            var bindEvents = function () {
                $collapsible.each(function (idx, li) {
                    var $li = $(li);
                    $li
                        .on('click', '>a', function (e) {

                            // collapse all open siblings
                            $li.siblings('.open').smartCollapseToggle();

                            // toggle element
                            $li.smartCollapseToggle();

                            // add active marker to collapsed element if it has active childs
                            if (!$li.hasClass('open') && $li.find('li.active').length > 0) {
                                $li.addClass('active')
                            }

                            e.preventDefault();
                        })
                        .find('>a').append('<b class="collapse-sign"><em class="fa fa-plus-square-o"></em></b>');

                    // initialization toggle
                    if ($li.find('li.active').length) {
                        $li.smartCollapseToggle();
                        $li.find('li.active').parents('li').addClass('active');
                    }
                });
            }
            bindEvents();

            // Jalankan expand menu saat directive pertama kali load
            $timeout(function () {
                if ($state.current && $state.current.name) {
                    expandMenuForState($state.current.name, $state.current.url);
                }
            }, 150);


            // click on route link
            element.on('click', 'a[data-ui-sref]', function (e) {
                // collapse all siblings to element parents and remove active markers
                $(this)
                    .parents('li').addClass('active')
                    .each(function () {
                        $(this).siblings('li.open').smartCollapseToggle();
                        $(this).siblings('li').removeClass('active')
                    });

                if ($body.hasClass('mobile-view-activated')) {
                    $rootScope.$broadcast('requestToggleMenu');
                }
            });


            // Listen to state change untuk expand menu yang sesuai
            scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                // Tunggu sebentar agar DOM ready
                $timeout(function () {
                    expandMenuForState(toState.name, toState.url);
                }, 100);
            });


            scope.$on('$smartLayoutMenuOnTop', function (event, menuOnTop) {
                if (menuOnTop) {
                    $collapsible.filter('.open').smartCollapseToggle();
                }
            });
        }
    }
});