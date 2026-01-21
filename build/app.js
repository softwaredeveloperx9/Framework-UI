'use strict';



var appConfig = window.appConfig || {};

appConfig.menu_speed = 200;

appConfig.smartSkin = "smart-style-0";

appConfig.skins = [
    {name: "smart-style-0",
        logo: "styles/img/logo.png",
        class: "btn btn-block btn-xs txt-color-white margin-right-5",
        style: "background-color:#4E463F;",
        label: "Smart Default"},

    {name: "smart-style-1",
        logo: "styles/img/logo-white.png",
        class: "btn btn-block btn-xs txt-color-white",
        style: "background:#3A4558;",
        label: "Dark Elegance"},

    {name: "smart-style-2",
        logo: "styles/img/logo-blue.png",
        class: "btn btn-xs btn-block txt-color-darken margin-top-5",
        style: "background:#fff;",
        label: "Ultra Light"},

    {name: "smart-style-3",
        logo: "styles/img/logo-pale.png",
        class: "btn btn-xs btn-block txt-color-white margin-top-5",
        style: "background:#f78c40",
        label: "Google Skin"},

    {name: "smart-style-4",
        logo: "styles/img/logo-pale.png",
        class: "btn btn-xs btn-block txt-color-white margin-top-5",
        style: "background: #bbc0cf; border: 1px solid #59779E; color: #17273D !important;",
        label: "PixelSmash"},

    {name: "smart-style-5",
        logo: "styles/img/logo-pale.png",
        class: "btn btn-xs btn-block txt-color-white margin-top-5",
        style: "background: rgba(153, 179, 204, 0.2); border: 1px solid rgba(121, 161, 221, 0.8); color: #17273D !important;",
        label: "Glass"},

    {name: "smart-style-6",
        logo: "styles/img/logo-pale.png",
        class: "btn btn-xs btn-block txt-color-white margin-top-5",
        style: "background: #2196F3; border: 1px solid rgba(121, 161, 221, 0.8); color: #FFF !important;",
        beta: true,
        label: "MaterialDesign"
    }


];



appConfig.sound_path = "sound/";
appConfig.sound_on = true; 


/*
* DEBUGGING MODE
* debugState = true; will spit all debuging message inside browser console.
* The colors are best displayed in chrome browser.
*/


appConfig.debugState = false;	
appConfig.debugStyle = 'font-weight: bold; color: #00f;';
appConfig.debugStyle_green = 'font-weight: bold; font-style:italic; color: #46C246;';
appConfig.debugStyle_red = 'font-weight: bold; color: #ed1c24;';
appConfig.debugStyle_warning = 'background-color:yellow';
appConfig.debugStyle_success = 'background-color:green; font-weight:bold; color:#fff;';
appConfig.debugStyle_error = 'background-color:#ed1c24; font-weight:bold; color:#fff;';


appConfig.voice_command = true;
appConfig.voice_command_auto = false;

/*
 *  Sets the language to the default 'en-US'. (supports over 50 languages 
 *  by google)
 * 
 *  Afrikaans         ['af-ZA']
 *  Bahasa Indonesia  ['id-ID']
 *  Bahasa Melayu     ['ms-MY']
 *  CatalГ            ['ca-ES']
 *  ДЊeЕЎtina         ['cs-CZ']
 *  Deutsch           ['de-DE']
 *  English           ['en-AU', 'Australia']
 *                    ['en-CA', 'Canada']
 *                    ['en-IN', 'India']
 *                    ['en-NZ', 'New Zealand']
 *                    ['en-ZA', 'South Africa']
 *                    ['en-GB', 'United Kingdom']
 *                    ['en-US', 'United States']
 *  EspaГ±ol          ['es-AR', 'Argentina']
 *                    ['es-BO', 'Bolivia']
 *                    ['es-CL', 'Chile']
 *                    ['es-CO', 'Colombia']
 *                    ['es-CR', 'Costa Rica']
 *                    ['es-EC', 'Ecuador']
 *                    ['es-SV', 'El Salvador']
 *                    ['es-ES', 'EspaГ±a']
 *                    ['es-US', 'Estados Unidos']
 *                    ['es-GT', 'Guatemala']
 *                    ['es-HN', 'Honduras']
 *                    ['es-MX', 'MГ©xico']
 *                    ['es-NI', 'Nicaragua']
 *                    ['es-PA', 'PanamГЎ']
 *                    ['es-PY', 'Paraguay']
 *                    ['es-PE', 'PerГє']
 *                    ['es-PR', 'Puerto Rico']
 *                    ['es-DO', 'RepГєblica Dominicana']
 *                    ['es-UY', 'Uruguay']
 *                    ['es-VE', 'Venezuela']
 *  Euskara           ['eu-ES']
 *  FranГ§ais         ['fr-FR']
 *  Galego            ['gl-ES']
 *  Hrvatski          ['hr_HR']
 *  IsiZulu           ['zu-ZA']
 *  ГЌslenska         ['is-IS']
 *  Italiano          ['it-IT', 'Italia']
 *                    ['it-CH', 'Svizzera']
 *  Magyar            ['hu-HU']
 *  Nederlands        ['nl-NL']
 *  Norsk bokmГҐl     ['nb-NO']
 *  Polski            ['pl-PL']
 *  PortuguГЄs        ['pt-BR', 'Brasil']
 *                    ['pt-PT', 'Portugal']
 *  RomГўnДѓ          ['ro-RO']
 *  SlovenДЌina       ['sk-SK']
 *  Suomi             ['fi-FI']
 *  Svenska           ['sv-SE']
 *  TГјrkГ§e          ['tr-TR']
 *  Р±СЉР»РіР°СЂСЃРєРё['bg-BG']
 *  PСѓСЃСЃРєРёР№     ['ru-RU']
 *  РЎСЂРїСЃРєРё      ['sr-RS']
 *  н•њкµ­м–ґ         ['ko-KR']
 *  дё­ж–‡            ['cmn-Hans-CN', 'ж™®йЂљиЇќ (дё­е›Ѕе¤§й™†)']
 *                    ['cmn-Hans-HK', 'ж™®йЂљиЇќ (й¦™жёЇ)']
 *                    ['cmn-Hant-TW', 'дё­ж–‡ (еЏ°зЃЈ)']
 *                    ['yue-Hant-HK', 'зІµиЄћ (й¦™жёЇ)']
 *  ж—Ґжњ¬иЄћ         ['ja-JP']
 *  Lingua latД«na    ['la']
 */
appConfig.voice_command_lang = 'en-US';
/*
 *  Use localstorage to remember on/off (best used with HTML Version)
 */ 
appConfig.voice_localStorage = false;
/*
 * Voice Commands
 * Defines all voice command variables and functions
 */ 
if (appConfig.voice_command) {
        
     	appConfig.commands = {
                
        'show dashboard' : function() { window.location.hash = "dashboard" },
        'show inbox' : function() {  window.location.hash = "inbox/" },
        'show graphs' : function() {  window.location.hash = "graphs/flot" },
        'show flotchart' : function() { window.location.hash = "graphs/flot" },
        'show morris chart' : function() { window.location.hash = "graphs/morris" },
        'show inline chart' : function() { window.location.hash = "graphs/inline-charts" },
        'show dygraphs' : function() { window.location.hash = "graphs/dygraphs" },
        'show tables' : function() { window.location.hash = "tables/table" },
        'show data table' : function() { window.location.hash = "tables/datatable" },
        'show jquery grid' : function() { window.location.hash = "tables/jqgrid" },
        'show form' : function() { window.location.hash = "forms/form-elements" },
        'show form layouts' : function() { window.location.hash = "forms/form-templates" },
        'show form validation' : function() { window.location.hash = "forms/validation" },
        'show form elements' : function() { window.location.hash = "forms/bootstrap-forms" },
        'show form plugins' : function() { window.location.hash = "forms/plugins" },
        'show form wizards' : function() { window.location.hash = "forms/wizards" },
        'show bootstrap editor' : function() { window.location.hash = "forms/other-editors" },
        'show dropzone' : function() { window.location.hash = "forms/dropzone" },
        'show image cropping' : function() { window.location.hash = "forms/image-editor" },
        'show general elements' : function() { window.location.hash = "ui/general-elements" },
        'show buttons' : function() { window.location.hash = "ui/buttons" },
        'show fontawesome' : function() { window.location.hash = "ui/icons/fa" },
        'show glyph icons' : function() { window.location.hash = "ui/icons/glyph" },
        'show flags' : function() { window.location.hash = "ui/icons/flags" },
        'show grid' : function() { window.location.hash = "ui/grid" },
        'show tree view' : function() { window.location.hash = "ui/treeview" },
        'show nestable lists' : function() { window.location.hash = "ui/nestable-list" },
        'show jquery U I' : function() { window.location.hash = "ui/jqui" },
        'show typography' : function() { window.location.hash = "ui/typography" },
        'show calendar' : function() { window.location.hash = "calendar" },
        'show widgets' : function() { window.location.hash = "widgets" },
        'show gallery' : function() { window.location.hash = "gallery" },
        'show maps' : function() { window.location.hash = "gmap-xml" },
        'go back' :  function() { history.back(1); }, 
        'scroll up' : function () { $('html, body').animate({ scrollTop: 0 }, 100); },
        'scroll down' : function () { $('html, body').animate({ scrollTop: $(document).height() }, 100);},
        'hide navigation' : function() { 
            if ($( ":root" ).hasClass("container") && !$( ":root" ).hasClass("menu-on-top")){
                $('span.minifyme').trigger("click");
            } else {
                $('#hide-menu > span > a').trigger("click"); 
            }
        },
        'show navigation' : function() { 
            if ($( ":root" ).hasClass("container") && !$( ":root" ).hasClass("menu-on-top")){
                $('span.minifyme').trigger("click");
            } else {
                $('#hide-menu > span > a').trigger("click"); 
            }
        },
        'mute' : function() {
            appConfig.sound_on = false;
            $.smallBox({
                title : "MUTE",
                content : "All sounds have been muted!",
                color : "#a90329",
                timeout: 4000,
                icon : "fa fa-volume-off"
            });
        },
        'sound on' : function() {
            appConfig.sound_on = true;
            $.speechApp.playConfirmation();
            $.smallBox({
                title : "UNMUTE",
                content : "All sounds have been turned on!",
                color : "#40ac2b",
                sound_file: 'voice_alert',
                timeout: 5000,
                icon : "fa fa-volume-up"
            });
        },
        'stop' : function() {
            smartSpeechRecognition.abort();
            $( ":root" ).removeClass("voice-command-active");
            $.smallBox({
                title : "VOICE COMMAND OFF",
                content : "Your voice commands has been successfully turned off. Click on the <i class='fa fa-microphone fa-lg fa-fw'></i> icon to turn it back on.",
                color : "#40ac2b",
                sound_file: 'voice_off',
                timeout: 8000,
                icon : "fa fa-microphone-slash"
            });
            if ($('#speech-btn .popover').is(':visible')) {
                $('#speech-btn .popover').fadeOut(250);
            }
        },
        'help' : function() {

            $('#voiceModal').removeData('modal').modal( { remote: "app/layout/partials/voice-commands.tpl.html", show: true } );
            if ($('#speech-btn .popover').is(':visible')) {
                $('#speech-btn .popover').fadeOut(250);
            }

        },      
        'got it' : function() {
            $('#voiceModal').modal('hide');
        },  
        'logout' : function() {
            $.speechApp.stop();
            window.location = $('#logout > span > a').attr("href");
        }
    };
}

appConfig.apiRootUrl = 'api';

window.appConfig = appConfig;

/*
* END APP.appConfig
*/
'use strict';

$.sound_path = appConfig.sound_path;
$.sound_on = appConfig.sound_on;


$(function () {

    // moment.js default language
    moment.locale('en')

    angular.bootstrap(document, ['app']);
 
});

'use strict';

/**
 * @ngdoc overview
 * @name app [erp-new-frontend]
 * @description
 * # app [erp-new-frontend]
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
        'Global_Data_ERP',
        function ($rootScope, $state, $stateParams, $location, $http, Global_Data_ERP) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            // editableOptions.theme = 'bs3';

            Global_Data_ERP.Generate($rootScope);

            // keep user logged in after page refresh
            if ($rootScope.ERP.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.ERP.currentUser.token;
            }

            //$rootScope.$on('$locationChangeStart', function (event, next, current) {
            //$rootScope.$on('$routeChangeStart', function (event, next, current) {
            $rootScope.$on('$stateChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() == '/login') return;
                if ($location.path() == '/forgotpassword') return;

                if (!$rootScope.ERP) {
                    //$location.path('/login');
                    return;
                }

                if (!$rootScope.ERP.currentUser) {
                    //$location.path('/login');
                    return;
                }
            });
        },
    ]);

'use strict';

angular
    .module('app.auth', [
        'ui.router',
        //        ,
        //        'ezfb',
        //        'googleplus'
    ])
    .config(function (
        $stateProvider
        //        , ezfbProvider
        //        , GooglePlusProvider
    ) {
        //        GooglePlusProvider.init({
        //            clientId: authKeys.googleClientId
        //        });
        //
        //        ezfbProvider.setInitParams({
        //            appId: authKeys.facebookAppId
        //        });
        $stateProvider
            .state('realLogin', {
                url: '/real-login',

                views: {
                    root: {
                        templateUrl: 'app/auth/login/login.html',
                        controller: 'LoginCtrl',
                    },
                },
                data: {
                    title: 'Login - url /real-login',
                    rootId: 'extra-page',
                },
            })

            .state('loginOld', {
                url: '/loginOld',
                views: {
                    root: {
                        templateUrl: 'app/auth/views/login.html',
                    },
                },
                data: {
                    title: 'Login',
                    htmlId: 'extr-page',
                },
                resolve: {
                    srcipts: function (lazyScript) {
                        return lazyScript.register(['build/vendor.ui.js']);
                    },
                },
            })

            .state('login', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: 'app-frm/views/loginApp.html',
                    },
                },
                data: {
                    title: 'Login',
                    htmlId: 'extr-page',
                },
                resolve: {
                    srcipts: function (lazyScript) {
                        return lazyScript.register(['build/vendor.ui.js']);
                    },
                },
            })

            .state('register', {
                url: '/register',
                views: {
                    root: {
                        templateUrl: 'app/auth/views/register.html',
                    },
                },
                data: {
                    title: 'Register',
                    htmlId: 'extr-page',
                },
            })

            .state('forgotPassword', {
                url: '/forgot-password',
                views: {
                    root: {
                        templateUrl: 'app/auth/views/forgot-password.html',
                    },
                },
                data: {
                    title: 'Forgot Password',
                    htmlId: 'extr-page',
                },
            })

            .state('lock', {
                url: '/lock',
                views: {
                    root: {
                        templateUrl: 'app/auth/views/lock.html',
                    },
                },
                data: {
                    title: 'Locked Screen',
                    htmlId: 'lock-page',
                },
            });
    })
    .constant('authKeys', {
        googleClientId: '',
        facebookAppId: '',
    });

'use strict';

angular
    .module('app.layout', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                root: {
                    templateUrl: 'app/layout/layout.tpl.html',
                },
            },
        });

        var ERP_CurrentUser = false;
        let appPath = '';

        // load from LocalStorage
        try {
            let pathSegments = window.location.pathname.split('/');
            appPath = pathSegments[1]; // Gets 'newdev', 'new', 'xpdev', or 'xp'

            if (!appPath) appPath = 'localmachine';

            appPath += '_';

            let x = localStorage.getItem(appPath);
            let ERP = JSON.parse(x) || {};

            if (ERP.currentUser) ERP_CurrentUser = true;
        } catch (e) { }

        if (ERP_CurrentUser) {
            $urlRouterProvider.otherwise('/erp/sales/SalesOrders');
        } else {
            localStorage.setItem(appPath + 'logout', 'true');

            $urlRouterProvider.otherwise('/login');
        }
    });

(function(){
    "use strict";

    angular.module('SmartAdmin', [
        "SmartAdmin.Forms",
        "SmartAdmin.Layout",
        "SmartAdmin.UI",
    ]);
})();
(function(){
    "use strict";

    angular.module('SmartAdmin.Forms', []);
})();
(function(){
    "use strict";

    angular.module('SmartAdmin.Layout', []);
})();
(function(){
    "use strict";

    angular.module('SmartAdmin.UI', []);
})();
'use strict';

angular.module('app.auth').directive('loginInfo', function (User, $rootScope) {
    return {
        restrict: 'A',
        templateUrl: 'app/auth/directives/login-info.tpl.html',
        link: function (scope, element) {
            /*User.initialized.then(function(){
                scope.user = User
            });*/

            scope.user = {
                username: '',
                picture: 'styles/img/avatars/sunny.png',
                activity: 12,
            };
        },
    };
});

"use strict";

angular.module('app.auth').controller('LoginCtrl', function ($scope, $state, GooglePlus, User, ezfb) {

    $scope.$on('event:google-plus-signin-success', function (event, authResult) {
        if (authResult.status.method == 'PROMPT') {
            GooglePlus.getUser().then(function (user) {
                User.username = user.name;
                User.picture = user.picture;
                $state.go('app.dashboard');
            });
        }
    });

    $scope.$on('event:facebook-signin-success', function (event, authResult) {
        ezfb.api('/me', function (res) {
            User.username = res.name;
            User.picture = 'https://graph.facebook.com/' + res.id + '/picture';
            $state.go('app.dashboard');
        });
    });
})

'use strict';

angular.module('app.auth').factory('User', function ($http, $q, APP_CONFIG) {
    /*var dfd = $q.defer();

    var UserModel = {
        initialized: dfd.promise,
        username: undefined,
        picture: undefined,
    };
    $http.get(APP_CONFIG.apiRootUrl + '/user.json').then(function (response) {
        UserModel.username = response.data.username;
        UserModel.picture = response.data.picture;
        dfd.resolve(UserModel);
    });*/

    var UserModel = {
        username: 'John Doe',
        picture: 'styles/img/avatars/sunny.png',
        activity: 12,
    };

    return UserModel;
});

"use strict";

angular.module('app').controller("LanguagesCtrl",  function LanguagesCtrl($scope, $rootScope, $log, Language){

    $rootScope.lang = {};
    
    Language.getLanguages(function(data){

        $rootScope.currentLanguage = data[0];

        $rootScope.languages = data;

        Language.getLang(data[0].key,function(data){

            $rootScope.lang = data;
        });

    });

    $scope.selectLanguage = function(language){
        $rootScope.currentLanguage = language;
        
        Language.getLang(language.key,function(data){

            $rootScope.lang = data;
            
        });
    }

    $rootScope.getWord = function(key){
        if(angular.isDefined($rootScope.lang[key])){
            return $rootScope.lang[key];
        } 
        else {
            return key;
        }
    }

});
'use strict';

angular.module('app').factory('Language', function ($http, APP_CONFIG) {
    function getLanguage(key, callback) {
        $http
            .get(APP_CONFIG.apiRootUrl + '/langs/' + key + '.json')
            .success(function (data) {
                callback(data);
            })
            .error(function () {
                $log.log('Error');
                callback([]);
            });
    }

    function getLanguages(callback) {
        /*$http.get(APP_CONFIG.apiRootUrl + '/languages.json').success(function(data){

			callback(data);
			
		}).error(function(){

			$log.log('Error');
			callback([]);

		});*/
    }

    return {
        getLang: function (type, callback) {
            getLanguage(type, callback);
        },
        getLanguages: function (callback) {
            getLanguages(callback);
        },
    };
});

"use strict";

angular.module('app').directive('languageSelector', function(Language){
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "app/layout/language/language-selector.tpl.html",
        scope: true
    }
});
"use strict";

angular.module('app').directive('toggleShortcut', function($log,$timeout) {

	var initDomEvents = function($element){

		var shortcut_dropdown = $('#shortcut');

		$element.on('click',function(){
		
			if (shortcut_dropdown.is(":visible")) {
				shortcut_buttons_hide();
			} else {
				shortcut_buttons_show();
			}

		})

		shortcut_dropdown.find('a').click(function(e) {
			e.preventDefault();
			window.location = $(this).attr('href');
			setTimeout(shortcut_buttons_hide, 300);
		});

		

		// SHORTCUT buttons goes away if mouse is clicked outside of the area
		$(document).mouseup(function(e) {
			if (shortcut_dropdown && !shortcut_dropdown.is(e.target) && shortcut_dropdown.has(e.target).length === 0) {
				shortcut_buttons_hide();
			}
		});

		// SHORTCUT ANIMATE HIDE
		function shortcut_buttons_hide() {
			shortcut_dropdown.animate({
				height : "hide"
			}, 300, "easeOutCirc");
			$('body').removeClass('shortcut-on');

		}

		// SHORTCUT ANIMATE SHOW
		function shortcut_buttons_show() {
			shortcut_dropdown.animate({
				height : "show"
			}, 200, "easeOutCirc");
			$('body').addClass('shortcut-on');
		}
	}

	var link = function($scope,$element){
		$timeout(function(){
			initDomEvents($element);
		});
	}

	return{
		restrict:'EA',
		link:link
	}
})
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/layout/layout.tpl.html","<!-- HEADER -->\r\n<div data-smart-include=\"app/layout/partials/header.tpl.html\" class=\"placeholder-header\"></div>\r\n<!-- END HEADER -->\r\n\r\n<!-- Left panel : Navigation area -->\r\n<!-- Note: This width of the aside area can be adjusted through LESS variables -->\r\n<div data-ui-view=\"frmMenu\" data-smart-include=\"app/layout/partials/navigation.tpl.html\" class=\"placeholder-left-panel\"></div>\r\n\r\n<!-- END NAVIGATION -->\r\n\r\n<!-- MAIN PANEL -->\r\n<div id=\"main\" role=\"main\">\r\n    <demo-states></demo-states>\r\n\r\n    <!-- RIBBON -->\r\n    <div id=\"ribbon\">\r\n        <span class=\"ribbon-button-alignment\">\r\n            <span id=\"refresh\" class=\"btn btn-ribbon\" reset-widgets tooltip-placement=\"bottom\" smart-tooltip-html=\"<i class=\'text-warning fa fa-warning\'></i> Warning! This will reset all your widget settings.\">\r\n                <i class=\"fa fa-refresh\"></i>\r\n            </span>\r\n        </span>\r\n\r\n        <!-- breadcrumb -->\r\n        <state-breadcrumbs></state-breadcrumbs>\r\n        <!-- end breadcrumb -->\r\n    </div>\r\n    <!-- END RIBBON -->\r\n\r\n    <div data-smart-router-animation-wrap=\"content content@app\" data-wrap-for=\"#content\">\r\n        <div data-ui-view=\"content\" data-autoscroll=\"false\"></div>\r\n    </div>\r\n</div>\r\n<!-- END MAIN PANEL -->\r\n\r\n<!-- PAGE FOOTER -->\r\n<div data-smart-include=\"app/layout/partials/footer.tpl.html\"></div>\r\n\r\n<div data-smart-include=\"app/layout/shortcut/shortcut.tpl.html\"></div>\r\n\r\n<!-- END PAGE FOOTER -->\r\n");
$templateCache.put("app/auth/directives/login-info.tpl.html","<div class=\"login-info ng-cloak\">\r\n    <span>\r\n        <!-- User image size is adjusted inside CSS, it should stay as it -->\r\n        <a href=\"\" toggle-shortcut>\r\n            <img ng-src=\"{{user.picture}}\" alt=\"me\" class=\"online\" />\r\n            <span ng-bind=\"ERP.currentUser.Name\"></span>\r\n            <!-- ERP.userERP.Name ERP.currentUser.Name -->\r\n            <i class=\"fa fa-angle-down\"></i>\r\n        </a>\r\n    </span>\r\n</div>\r\n");
$templateCache.put("app/layout/language/language-selector.tpl.html","<ul class=\"header-dropdown-list hidden-xs ng-cloak\" ng-controller=\"LanguagesCtrl\">\r\n    <li class=\"dropdown\" dropdown>\r\n        <a class=\"dropdown-toggle\"  data-toggle=\"dropdown\" href> <img src=\"styles/img/blank.gif\" class=\"flag flag-{{currentLanguage.key}}\" alt=\"{{currentLanguage.alt}}\"> <span> {{currentLanguage.title}} </span>\r\n            <i class=\"fa fa-angle-down\"></i> </a>\r\n        <ul class=\"dropdown-menu pull-right\">\r\n            <li ng-class=\"{active: language==currentLanguage}\" ng-repeat=\"language in languages\">\r\n                <a ng-click=\"selectLanguage(language)\" ><img src=\"styles/img/blank.gif\" class=\"flag flag-{{language.key}}\"\r\n                                                   alt=\"{{language.alt}}\"> {{language.title}}</a>\r\n            </li>\r\n        </ul>\r\n    </li>\r\n</ul>");
$templateCache.put("app/layout/partials/footer.tpl.html","<div class=\"page-footer\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-12 col-sm-6\">\r\n            <span class=\"txt-color-white\">ERP © {{ ERP_Signature }}</span>\r\n        </div>\r\n\r\n        <div class=\"col-xs-6 col-sm-6 text-right hidden-xs\">\r\n            <div class=\"txt-color-white inline-block\">\r\n                <i class=\"txt-color-blueLight hidden-mobile\">Last account activity <i class=\"fa fa-clock-o\"></i> <strong>52 mins ago &nbsp;</strong> </i>\r\n\r\n                <div class=\"btn-group dropup\">\r\n                    <button class=\"btn btn-xs dropdown-toggle bg-color-blue txt-color-white\" data-toggle=\"dropdown\"><i class=\"fa fa-link\"></i> <span class=\"caret\"></span></button>\r\n                    <ul class=\"dropdown-menu pull-right text-left\">\r\n                        <li>\r\n                            <div class=\"padding-5\">\r\n                                <p class=\"txt-color-darken font-sm no-margin\">Download Progress</p>\r\n\r\n                                <div class=\"progress progress-micro no-margin\">\r\n                                    <div class=\"progress-bar progress-bar-success\" style=\"width: 50%\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"divider\"></li>\r\n                        <li>\r\n                            <div class=\"padding-5\">\r\n                                <p class=\"txt-color-darken font-sm no-margin\">Server Load</p>\r\n\r\n                                <div class=\"progress progress-micro no-margin\">\r\n                                    <div class=\"progress-bar progress-bar-success\" style=\"width: 20%\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"divider\"></li>\r\n                        <li>\r\n                            <div class=\"padding-5\">\r\n                                <p class=\"txt-color-darken font-sm no-margin\">Memory Load <span class=\"text-danger\">*critical*</span></p>\r\n\r\n                                <div class=\"progress progress-micro no-margin\">\r\n                                    <div class=\"progress-bar progress-bar-danger\" style=\"width: 70%\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"divider\"></li>\r\n                        <li>\r\n                            <div class=\"padding-5\">\r\n                                <button class=\"btn btn-block btn-default\">refresh</button>\r\n                            </div>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("app/layout/partials/header.tpl.html","<header id=\"header\">\r\n    <div id=\"logo-group\">\r\n        <!-- PLACE YOUR LOGO HERE -->\r\n        <span id=\"logo\"> <img src=\"styles/img/logo.png\" alt=\"SmartAdmin\" /> </span>\r\n        <!-- END LOGO PLACEHOLDER -->\r\n\r\n        <!-- Note: The activity badge color changes when clicked and resets the number to 0\r\n    Suggestion: You may want to set a flag when this happens to tick off all checked messages / notifications -->\r\n        <span id=\"activity\" class=\"activity-dropdown\" activities-dropdown-toggle>\r\n            <i class=\"fa fa-user\"></i>\r\n            <b class=\"badge bg-color-red\">21</b>\r\n        </span>\r\n    </div>\r\n\r\n    <recent-projects></recent-projects>\r\n\r\n    <!-- pulled right: nav area -->\r\n    <div class=\"pull-right\">\r\n        <!-- collapse menu button -->\r\n        <div id=\"hide-menu\" class=\"btn-header pull-right\">\r\n            <span>\r\n                <a toggle-menu title=\"Collapse Menu\"><i class=\"fa fa-reorder\"></i></a>\r\n            </span>\r\n        </div>\r\n        <!-- end collapse menu -->\r\n\r\n        <!-- #MOBILE -->\r\n        <!-- Top menu profile link : this shows only when top menu is active -->\r\n        <ul id=\"mobile-profile-img\" class=\"header-dropdown-list hidden-xs padding-5\">\r\n            <li class=\"\">\r\n                <a href=\"#\" class=\"dropdown-toggle no-margin userdropdown\" data-toggle=\"dropdown\">\r\n                    <img src=\"styles/img/avatars/sunny.png\" alt=\"John Doe\" class=\"online\" />\r\n                </a>\r\n                <ul class=\"dropdown-menu pull-right\">\r\n                    <li>\r\n                        <a href-void class=\"padding-10 padding-top-0 padding-bottom-0\"><i class=\"fa fa-cog\"></i> Setting</a>\r\n                    </li>\r\n                    <li class=\"divider\"></li>\r\n                    <li>\r\n                        <a ui-sref=\"app.appViews.profileDemo\" class=\"padding-10 padding-top-0 padding-bottom-0\"> <i class=\"fa fa-user\"></i> <u>P</u>rofile</a>\r\n                    </li>\r\n                    <li class=\"divider\"></li>\r\n                    <li>\r\n                        <a href-void class=\"padding-10 padding-top-0 padding-bottom-0\" data-action=\"toggleShortcut\"><i class=\"fa fa-arrow-down\"></i> <u>S</u>hortcut</a>\r\n                    </li>\r\n                    <li class=\"divider\"></li>\r\n                    <li>\r\n                        <a href-void class=\"padding-10 padding-top-0 padding-bottom-0\" data-action=\"launchFullscreen\"><i class=\"fa fa-arrows-alt\"></i> Full <u>S</u>creen</a>\r\n                    </li>\r\n                    <li class=\"divider\"></li>\r\n                    <li>\r\n                        <a href=\"#/login\" class=\"padding-10 padding-top-5 padding-bottom-5\" data-action=\"userLogout\"\r\n                            ><i class=\"fa fa-sign-out fa-lg\"></i> <strong><u>L</u>ogout</strong></a\r\n                        >\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n        </ul>\r\n\r\n        <!-- logout button -->\r\n        <div id=\"logout\" class=\"btn-header transparent pull-right\" ng-click=\"logout()\">\r\n            <span>\r\n                <a title=\"Sign Out\" data-action=\"userLogout\" data-logout-msg=\"You can improve your security further after logging out by closing this opened browser\"><i class=\"fa fa-sign-out\"></i></a>\r\n            </span>\r\n        </div>\r\n        <!-- end logout button -->\r\n\r\n        <!-- search mobile button (this is hidden till mobile view port) -->\r\n        <div id=\"search-mobile\" class=\"btn-header transparent pull-right\" data-search-mobile>\r\n            <span>\r\n                <a href=\"#\" title=\"Search\"><i class=\"fa fa-search\"></i></a>\r\n            </span>\r\n        </div>\r\n        <!-- end search mobile button -->\r\n\r\n        <!-- input: search field -->\r\n        <form action=\"#/search\" class=\"header-search pull-right\">\r\n            <input\r\n                id=\"search-fld\"\r\n                type=\"text\"\r\n                name=\"param\"\r\n                placeholder=\"Find reports and more\"\r\n                data-autocomplete=\'[\r\n					\"ActionScript\",\r\n					\"AppleScript\",\r\n					\"Asp\",\r\n					\"BASIC\",\r\n					\"C\",\r\n					\"C++\",\r\n					\"Clojure\",\r\n					\"COBOL\",\r\n					\"ColdFusion\",\r\n					\"Erlang\",\r\n					\"Fortran\",\r\n					\"Groovy\",\r\n					\"Haskell\",\r\n					\"Java\",\r\n					\"JavaScript\",\r\n					\"Lisp\",\r\n					\"Perl\",\r\n					\"PHP\",\r\n					\"Python\",\r\n					\"Ruby\",\r\n					\"Scala\",\r\n					\"Scheme\"]\'\r\n            />\r\n            <button type=\"submit\">\r\n                <i class=\"fa fa-search\"></i>\r\n            </button>\r\n            <a href=\"$\" id=\"cancel-search-js\" title=\"Cancel Search\"><i class=\"fa fa-times\"></i></a>\r\n        </form>\r\n        <!-- end input: search field -->\r\n\r\n        <!-- fullscreen button -->\r\n        <div id=\"fullscreen\" class=\"btn-header transparent pull-right\">\r\n            <span>\r\n                <a full-screen title=\"Full Screen\"><i class=\"fa fa-arrows-alt\"></i></a>\r\n            </span>\r\n        </div>\r\n        <!-- end fullscreen button -->\r\n\r\n        <!-- #Voice Command: Start Speech -->\r\n        <div id=\"speech-btn\" class=\"btn-header transparent pull-right hidden-sm hidden-xs\">\r\n            <div>\r\n                <a title=\"Voice Command\" id=\"voice-command-btn\" speech-recognition><i class=\"fa fa-microphone\"></i></a>\r\n\r\n                <div class=\"popover bottom\">\r\n                    <div class=\"arrow\"></div>\r\n                    <div class=\"popover-content\">\r\n                        <h4 class=\"vc-title\">\r\n                            Voice command activated <br />\r\n                            <small>Please speak clearly into the mic</small>\r\n                        </h4>\r\n                        <h4 class=\"vc-title-error text-center\">\r\n                            <i class=\"fa fa-microphone-slash\"></i> Voice command failed\r\n                            <br />\r\n                            <small class=\"txt-color-red\">Must <strong>\"Allow\"</strong> Microphone</small>\r\n                            <br />\r\n                            <small class=\"txt-color-red\">Must have <strong>Internet Connection</strong></small>\r\n                        </h4>\r\n                        <a href-void class=\"btn btn-success\" id=\"speech-help-btn\">See Commands</a>\r\n                        <a href-void class=\"btn bg-color-purple txt-color-white\" onclick=\"$(\'#speech-btn .popover\').fadeOut(50);\">Close Popup</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- end voice command -->\r\n\r\n        <!-- multiple lang dropdown : find all flags in the flags page -->\r\n        <language-selector></language-selector>\r\n        <!-- end multiple lang -->\r\n    </div>\r\n    <!-- end pulled right: nav area -->\r\n</header>\r\n");
$templateCache.put("app/layout/partials/navigation.tpl.html","<aside id=\"left-panel\">\r\n\r\n    <!-- User info -->\r\n    <div login-info></div>\r\n    <!-- end user info -->\r\n\r\n    <nav>\r\n        <!-- NOTE: Notice the gaps after each icon usage <i></i>..\r\n        Please note that these links work a bit different than\r\n        traditional href=\"\" links. See documentation for details.\r\n        -->\r\n\r\n        <ul data-smart-menu>\r\n            <li data-menu-collapse>\r\n                <a href=\"#\" title=\"Dashboard\"><i class=\"fa fa-lg fa-fw fa-home\"></i> <span\r\n                        class=\"menu-item-parent\">{{getWord(\'Dashboard\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.dashboard\">{{getWord(\'Analytics Dashboard\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.dashboard-social\">{{getWord(\'Social Wall\')}}</a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-menu-collapse class=\"top-menu-invisible\">\r\n                <a href=\"#\"><i class=\"fa fa-lg fa-fw fa-cube txt-color-blue\"></i> <span class=\"menu-item-parent\">{{getWord(\'SmartAdmin Intel\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.smartAdmin.appLayouts\"><i class=\"fa fa-gear\"></i>\r\n                            {{getWord(\'App Layouts\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.smartAdmin.prebuiltSkins\"><i class=\"fa fa-picture-o\"></i>\r\n                            {{getWord(\'Prebuilt Skins\')}}</a>\r\n                    </li>\r\n                    <!--<li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.smartAdmin.appLayout\"><i class=\"fa fa-cube\"></i> {{getWord(\'App Settings\')}}</a>\r\n                    </li>-->\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-ui-sref-active=\"active\">\r\n                <a data-ui-sref=\"app.inbox.folder\" title=\"Outlook\">\r\n                    <i class=\"fa fa-lg fa-fw fa-inbox\"></i> <span class=\"menu-item-parent\">{{getWord(\'Outlook\')}}</span><span\r\n                        unread-messages-count class=\"badge pull-right inbox-badge\"></span></a>\r\n            </li>\r\n\r\n            <li data-menu-collapse>\r\n                <a href=\"#\"><i class=\"fa fa-lg fa-fw fa-bar-chart-o\"></i> <span class=\"menu-item-parent\">{{getWord(\'Graphs\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.graphs.flot\">{{getWord(\'Flot Chart\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.graphs.morris\">{{getWord(\'Morris Charts\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.graphs.sparkline\">{{getWord(\'Sparkline\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.graphs.easyPieCharts\">{{getWord(\'Easy Pie Charts\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.graphs.dygraphs\">{{getWord(\'Dygraphs\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.graphs.chartjs\">Chart.js</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.graphs.highchartTables\">Highchart Tables <span\r\n                                class=\"badge pull-right inbox-badge bg-color-yellow\">new</span></a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-menu-collapse>\r\n                <a href=\"#\"><i class=\"fa fa-lg fa-fw fa-table\"></i> <span\r\n                        class=\"menu-item-parent\">{{getWord(\'Tables\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.tables.normal\">{{getWord(\'Normal Tables\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.tables.datatables\">{{getWord(\'Data Tables\')}} <span\r\n                                class=\"badge inbox-badge bg-color-greenLight\">v1.10</span></a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.tables.jqgrid\">{{getWord(\'Jquery Grid\')}}</a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-menu-collapse>\r\n                <a href=\"#\"><i class=\"fa fa-lg fa-fw fa-pencil-square-o\"></i> <span class=\"menu-item-parent\">{{getWord(\'Forms\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.elements\">{{getWord(\'Smart Form Elements\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.layouts\">{{getWord(\'Smart Form Layouts\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.validation\">{{getWord(\'Smart Form Validation\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.bootstrapForms\">{{getWord(\'Bootstrap Form Elements\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.bootstrapValidation\">{{getWord(\'Bootstrap Form Validation\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.plugins\">{{getWord(\'Form Plugins\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.wizards\">{{getWord(\'Wizards\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.editors\">{{getWord(\'Bootstrap Editors\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.dropzone\">{{getWord(\'Dropzone\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.form.imageEditor\">{{getWord(\'Image Cropping\')}} <span\r\n                                class=\"badge pull-right inbox-badge bg-color-yellow\">new</span></a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-menu-collapse>\r\n                <a href=\"#\"><i class=\"fa fa-lg fa-fw fa-desktop\"></i> <span class=\"menu-item-parent\">{{getWord(\'UI Elements\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.ui.general\">{{getWord(\'General Elements\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.ui.buttons\">{{getWord(\'Buttons\')}}</a>\r\n                    </li>\r\n                    <li data-menu-collapse>\r\n                        <a href=\"#\">{{getWord(\'Icons\')}}</a>\r\n                        <ul>\r\n                            <li data-ui-sref-active=\"active\">\r\n                                <a data-ui-sref=\"app.ui.iconsFa\"><i class=\"fa fa-plane\"></i> {{getWord(\'Font Awesome\')}}</a>\r\n                            </li>\r\n                            <li data-ui-sref-active=\"active\">\r\n                                <a data-ui-sref=\"app.ui.iconsGlyph\"><i class=\"glyphicon glyphicon-plane\"></i>\r\n                                    {{getWord(\'Glyph Icons\')}}</a>\r\n                            </li>\r\n                            <li data-ui-sref-active=\"active\">\r\n                                <a data-ui-sref=\"app.ui.iconsFlags\"><i class=\"fa fa-flag\"></i> {{getWord(\'Flags\')}}</a>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.ui.grid\">{{getWord(\'Grid\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.ui.treeView\">{{getWord(\'Tree View\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.ui.nestableLists\">{{getWord(\'Nestable Lists\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.ui.jqueryUi\">{{getWord(\'JQuery UI\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.ui.typography\">{{getWord(\'Typography\')}}</a>\r\n                    </li>\r\n                    <li data-menu-collapse>\r\n                        <a href=\"#\">{{getWord(\'Six Level Menu\')}}</a>\r\n                        <ul>\r\n                            <li data-menu-collapse>\r\n                                <a href=\"#\"><i class=\"fa fa-fw fa-folder-open\"></i> {{getWord(\'Item #2\')}}</a>\r\n                                <ul>\r\n                                    <li data-menu-collapse>\r\n                                        <a href=\"#\"><i class=\"fa fa-fw fa-folder-open\"></i> {{getWord(\'Sub #2.1\')}} </a>\r\n                                        <ul>\r\n                                            <li>\r\n                                                <a href=\"#\"><i class=\"fa fa-fw fa-file-text\"></i> {{getWord(\'Item\r\n                                                    #2.1.1\')}}</a>\r\n                                            </li>\r\n                                            <li data-menu-collapse>\r\n                                                <a href=\"#\"><i class=\"fa fa-fw fa-plus\"></i>{{getWord(\'Expand\')}}</a>\r\n                                                <ul>\r\n                                                    <li>\r\n                                                        <a href=\"#\"><i class=\"fa fa-fw fa-file-text\"></i>\r\n                                                            {{getWord(\'File\')}}</a>\r\n                                                    </li>\r\n                                                    <li>\r\n                                                        <a href=\"#\"><i class=\"fa fa-fw fa-trash-o\"></i>\r\n                                                            {{getWord(\'Delete\')}}</a></li>\r\n                                                </ul>\r\n                                            </li>\r\n                                        </ul>\r\n                                    </li>\r\n                                </ul>\r\n                            </li>\r\n                            <li data-menu-collapse>\r\n                                <a href=\"#\"><i class=\"fa fa-fw fa-folder-open\"></i> {{getWord(\'Item #3\')}}</a>\r\n\r\n                                <ul>\r\n                                    <li data-menu-collapse>\r\n                                        <a href=\"#\"><i class=\"fa fa-fw fa-folder-open\"></i> {{getWord(\'3ed Level\')}}\r\n                                        </a>\r\n                                        <ul>\r\n                                            <li>\r\n                                                <a href=\"#\"><i class=\"fa fa-fw fa-file-text\"></i>\r\n                                                    {{getWord(\'File\')}}</a>\r\n                                            </li>\r\n                                            <li>\r\n                                                <a href=\"#\"><i class=\"fa fa-fw fa-file-text\"></i>\r\n                                                    {{getWord(\'File\')}}</a>\r\n                                            </li>\r\n                                        </ul>\r\n                                    </li>\r\n                                </ul>\r\n\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n\r\n            <li data-ui-sref-active=\"active\">\r\n                <a data-ui-sref=\"app.widgets\" title=\"Widgets\"><i class=\"fa fa-lg fa-fw fa-list-alt\"></i><span\r\n                        class=\"menu-item-parent\">{{getWord(\'Widgets\')}}</span></a>\r\n            </li>\r\n\r\n\r\n\r\n            <li data-menu-collapse>\r\n                <a href=\"#\">\r\n                    <i class=\"fa fa-lg fa-fw fa-cloud\"><em>3</em></i> <span class=\"menu-item-parent\">{{getWord(\'Cool Features\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.calendar\" title=\"Calendar\"><i\r\n                                class=\"fa fa-lg fa-fw fa-calendar\"></i> <span\r\n                                class=\"menu-item-parent\">{{getWord(\'Calendar\')}}</span></a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.maps\"><i class=\"fa fa-lg fa-fw fa-map-marker\"></i> <span class=\"menu-item-parent\">{{getWord(\'GMap Skins\')}}</span><span\r\n                                class=\"badge bg-color-greenLight pull-right inbox-badge\">9</span></a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-menu-collapse>\r\n                <a href=\"#\">\r\n                    <i class=\"fa fa-lg fa-fw fa-puzzle-piece\"></i> <span class=\"menu-item-parent\">{{getWord(\'App Views\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.appViews.projects\"><i class=\"fa fa-file-text-o\"></i>\r\n                            {{getWord(\'Projects\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.appViews.blogDemo\"><i class=\"fa fa-paragraph\"></i> {{getWord(\'Blog\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.appViews.galleryDemo\"><i class=\"fa fa-picture-o\"></i>\r\n                            {{getWord(\'Gallery\')}}</a>\r\n                    </li>\r\n\r\n                    <li data-menu-collapse>\r\n                        <a href=\"#\"><i class=\"fa fa-comments\"></i> {{getWord(\'Forum Layout\')}}</a>\r\n                        <ul>\r\n                            <li data-ui-sref-active=\"active\">\r\n                                <a data-ui-sref=\"app.appViews.forumDemo\"><i class=\"fa fa-picture-o\"></i>\r\n                                    {{getWord(\'General View\')}}</a>\r\n                            </li>\r\n                            <li data-ui-sref-active=\"active\">\r\n                                <a data-ui-sref=\"app.appViews.forumTopicDemo\"><i class=\"fa fa-picture-o\"></i>\r\n                                    {{getWord(\'Topic View\')}}</a>\r\n                            </li>\r\n                            <li data-ui-sref-active=\"active\">\r\n                                <a data-ui-sref=\"app.appViews.forumPostDemo\"><i class=\"fa fa-picture-o\"></i>\r\n                                    {{getWord(\'Post View\')}}</a>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.appViews.profileDemo\"><i class=\"fa fa-group\"></i>\r\n                            {{getWord(\'Profile\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.appViews.timelineDemo\"><i class=\"fa fa-clock-o\"></i>\r\n                            {{getWord(\'Timeline\')}}</a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-menu-collapse>\r\n                <a href=\"#\">\r\n                    <i class=\"fa fa-lg fa-fw fa-shopping-cart\"></i> <span class=\"menu-item-parent\">{{getWord(\'E-Commerce\')}}</span></a>\r\n                <ul>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.eCommerce.orders\" title=\"Orders\"> {{getWord(\'Orders\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.eCommerce.products\" title=\"Products View\"> {{getWord(\'Products View\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.eCommerce.detail\" title=\"Products Detail\"> {{getWord(\'Products Detail\')}}</a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-menu-collapse>\r\n                <a href=\"#\"><i class=\"fa fa-lg fa-fw fa-windows\"></i> <span class=\"menu-item-parent\">{{getWord(\'Miscellaneous\')}}</span></a>\r\n                <ul>\r\n                    <li>\r\n                        <a href=\"http://bootstraphunter.com/smartadmin-landing/\" target=\"_blank\">{{getWord(\'Landing\r\n                            Page\')}} <i class=\"fa fa-external-link\"></i></a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.misc.pricingTable\">{{getWord(\'Pricing Tables\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.misc.invoice\">{{getWord(\'Invoice\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"login\">{{getWord(\'Login\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"register\">{{getWord(\'Register\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"lock\">{{getWord(\'Locked Screen\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.misc.error404\">{{getWord(\'Error 404\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.misc.error500\">{{getWord(\'Error 500\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.misc.blank\">{{getWord(\'Blank Page\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.misc.emailTemplate\">{{getWord(\'Email Template\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.misc.search\">{{getWord(\'Search Page\')}}</a>\r\n                    </li>\r\n                    <li data-ui-sref-active=\"active\">\r\n                        <a data-ui-sref=\"app.misc.ckeditor\">{{getWord(\'CK Editor\')}}</a>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li data-menu-collapse class=\"chat-users top-menu-invisible\">\r\n                <a href=\"#\"><i class=\"fa fa-lg fa-fw fa-comment-o\"><em class=\"bg-color-pink flash animated\">!</em></i>\r\n                    <span class=\"menu-item-parent\">{{getWord(\'Smart Chat API\')}} <sup>{{getWord(\'beta\')}}</sup></span></a>\r\n                <div aside-chat-widget></div>\r\n            </li>\r\n        </ul>\r\n\r\n        <!-- NOTE: This allows you to pull menu items from server -->\r\n        <!-- <ul data-smart-menu-items=\"/api/menu-items.json\"></ul> -->\r\n    </nav>\r\n\r\n  <span class=\"minifyme\" data-action=\"minifyMenu\" minify-menu>\r\n    <i class=\"fa fa-arrow-circle-left hit\"></i>\r\n  </span>\r\n\r\n</aside>");
$templateCache.put("app/layout/partials/sub-header.tpl.html","<div class=\"col-xs-12 col-sm-5 col-md-5 col-lg-8\" data-sparkline-container>\r\n    <ul id=\"sparks\" class=\"\">\r\n        <li class=\"sparks-info\">\r\n            <h5> My Income <span class=\"txt-color-blue\">$47,171</span></h5>\r\n            <div class=\"sparkline txt-color-blue hidden-mobile hidden-md hidden-sm\">\r\n                1300, 1877, 2500, 2577, 2000, 2100, 3000, 2700, 3631, 2471, 2700, 3631, 2471\r\n            </div>\r\n        </li>\r\n        <li class=\"sparks-info\">\r\n            <h5> Site Traffic <span class=\"txt-color-purple\"><i class=\"fa fa-arrow-circle-up\"></i>&nbsp;45%</span></h5>\r\n            <div class=\"sparkline txt-color-purple hidden-mobile hidden-md hidden-sm\">\r\n                110,150,300,130,400,240,220,310,220,300, 270, 210\r\n            </div>\r\n        </li>\r\n        <li class=\"sparks-info\">\r\n            <h5> Site Orders <span class=\"txt-color-greenDark\"><i class=\"fa fa-shopping-cart\"></i>&nbsp;2447</span></h5>\r\n            <div class=\"sparkline txt-color-greenDark hidden-mobile hidden-md hidden-sm\">\r\n                110,150,300,130,400,240,220,310,220,300, 270, 210\r\n            </div>\r\n        </li>\r\n    </ul>\r\n</div>\r\n			");
$templateCache.put("app/layout/partials/voice-commands.tpl.html","<!-- TRIGGER BUTTON:\r\n<a href=\"/my-ajax-page.html\" data-toggle=\"modal\" data-target=\"#remoteModal\" class=\"btn btn-default\">Open Modal</a>  -->\r\n\r\n<!-- MODAL PLACE HOLDER\r\n<div class=\"modal fade\" id=\"remoteModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"remoteModalLabel\" aria-hidden=\"true\">\r\n<div class=\"modal-dialog\">\r\n<div class=\"modal-content\"></div>\r\n</div>\r\n</div>   -->\r\n<!--////////////////////////////////////-->\r\n\r\n<!--<div class=\"modal-header\">\r\n<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\r\n&times;\r\n</button>\r\n<h4 class=\"modal-title\" id=\"myModalLabel\">Command List</h4>\r\n</div>-->\r\n<div class=\"modal-body\">\r\n\r\n	<h1><i class=\"fa fa-microphone text-muted\"></i>&nbsp;&nbsp; SmartAdmin Voice Command</h1>\r\n	<hr class=\"simple\">\r\n	<h5>Instruction</h5>\r\n\r\n	Click <span class=\"text-success\">\"Allow\"</span> to access your microphone and activate Voice Command.\r\n	You will notice a <span class=\"text-primary\"><strong>BLUE</strong> Flash</span> on the microphone icon indicating activation.\r\n	The icon will appear <span class=\"text-danger\"><strong>RED</strong></span> <span class=\"label label-danger\"><i class=\"fa fa-microphone fa-lg\"></i></span> if you <span class=\"text-danger\">\"Deny\"</span> access or don\'t have any microphone installed.\r\n	<br>\r\n	<br>\r\n	As a security precaution, your browser will disconnect the microphone every 60 to 120 seconds (sooner if not being used). In which case Voice Command will prompt you again to <span class=\"text-success\">\"Allow\"</span> or <span class=\"text-danger\">\"Deny\"</span> access to your microphone.\r\n	<br>\r\n	<br>\r\n	If you host your page over <strong>http<span class=\"text-success\">s</span></strong> (secure socket layer) protocol you can wave this security measure and have an unintrupted Voice Command.\r\n	<br>\r\n	<br>\r\n	<h5>Commands</h5>\r\n	<ul>\r\n		<li>\r\n			<strong>\'show\' </strong> then say the <strong>*page*</strong> you want to go to. For example <strong>\"show inbox\"</strong> or <strong>\"show calendar\"</strong>\r\n		</li>\r\n		<li>\r\n			<strong>\'mute\' </strong> - mutes all sound effects for the theme.\r\n		</li>\r\n		<li>\r\n			<strong>\'sound on\'</strong> - unmutes all sound effects for the theme.\r\n		</li>\r\n		<li>\r\n			<span class=\"text-danger\"><strong>\'stop\'</strong></span> - deactivates voice command.\r\n		</li>\r\n		<li>\r\n			<span class=\"text-primary\"><strong>\'help\'</strong></span> - brings up the command list\r\n		</li>\r\n		<li>\r\n			<span class=\"text-danger\"><strong>\'got it\'</strong></span> - closes help modal\r\n		</li>\r\n		<li>\r\n			<strong>\'hide navigation\'</strong> - toggle navigation collapse\r\n		</li>\r\n		<li>\r\n			<strong>\'show navigation\'</strong> - toggle navigation to open (can be used again to close)\r\n		</li>\r\n		<li>\r\n			<strong>\'scroll up\'</strong> - scrolls to the top of the page\r\n		</li>\r\n		<li>\r\n			<strong>\'scroll down\'</strong> - scrollts to the bottom of the page\r\n		</li>\r\n		<li>\r\n			<strong>\'go back\' </strong> - goes back in history (history -1 click)\r\n		</li>\r\n		<li>\r\n			<strong>\'logout\'</strong> - logs you out\r\n		</li>\r\n	</ul>\r\n	<br>\r\n	<h5>Adding your own commands</h5>\r\n	Voice Command supports up to 80 languages. Adding your own commands is extreamly easy. All commands are stored inside <strong>app.config.js</strong> file under the <code>var commands = {...}</code>. \r\n\r\n	<hr class=\"simple\">\r\n	<div class=\"text-right\">\r\n		<button type=\"button\" class=\"btn btn-success btn-lg\" data-dismiss=\"modal\">\r\n			Got it!\r\n		</button>\r\n	</div>\r\n\r\n</div>\r\n<!--<div class=\"modal-footer\">\r\n<button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Got it!</button>\r\n</div> -->");
$templateCache.put("app/layout/shortcut/shortcut.tpl.html","<div id=\"shortcut\">\r\n    <ul>\r\n        <li>\r\n            <a href=\"#/erp/sales/SalesOrders\" class=\"jarvismetro-tile big-cubes bg-color-blue\">\r\n                <span class=\"iconbox\"> <i class=\"fa fa-envelope fa-4x\"></i> <span>Sales</span> </span>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"#/erp/shipment/ShipmentRequests\" class=\"jarvismetro-tile big-cubes bg-color-purple\">\r\n                <span class=\"iconbox\"> <i class=\"fa fa-map-marker fa-4x\"></i> <span>Shipment</span> </span>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"#/erp/finance/CashTransactions\" class=\"jarvismetro-tile big-cubes bg-color-blueDark\">\r\n                <span class=\"iconbox\"> <i class=\"fa fa-book fa-4x\"></i> <span>Finance</span> </span>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"#/erp/inventory/StockPositions\" class=\"jarvismetro-tile big-cubes bg-color-orangeDark\">\r\n                <span class=\"iconbox\"> <i class=\"fa fa-calendar fa-4x\"></i> <span>Inventory</span> </span>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"#/erp/purchase/PurchaseOrders\" class=\"jarvismetro-tile big-cubes bg-color-green\">\r\n                <span class=\"iconbox\"> <i class=\"fa fa-shopping-cart fa-4x\"></i> <span>Purchasing</span> </span>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"#/erp/supportingData/session\" class=\"jarvismetro-tile big-cubes bg-color-teal\">\r\n                <span class=\"iconbox\"> <i class=\"fa fa-sitemap fa-4x\"></i> <span>Supporting Data</span> </span>\r\n            </a>\r\n        </li>\r\n        <li>\r\n            <a href=\"#/erp/masterData\" class=\"jarvismetro-tile big-cubes bg-color-red\">\r\n                <span class=\"iconbox\"> <i class=\"fa fa-money fa-4x\"></i> <span>Master Data</span> </span>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</div>\r\n");
$templateCache.put("app/_common/forms/directives/bootstrap-validation/bootstrap-attribute-form.tpl.html","<form id=\"attributeForm\" class=\"form-horizontal\"\r\n      data-bv-message=\"This value is not valid\"\r\n      data-bv-feedbackicons-valid=\"glyphicon glyphicon-ok\"\r\n      data-bv-feedbackicons-invalid=\"glyphicon glyphicon-remove\"\r\n      data-bv-feedbackicons-validating=\"glyphicon glyphicon-refresh\">\r\n\r\n    <fieldset>\r\n        <legend>\r\n            Set validator options via HTML attributes\r\n        </legend>\r\n\r\n        <div class=\"alert alert-warning\">\r\n            <code>&lt; input\r\n                data-bv-validatorname\r\n                data-bv-validatorname-validatoroption=\"...\" / &gt;</code>\r\n\r\n            <br>\r\n            <br>\r\n            More validator options can be found here:\r\n            <a href=\"http://bootstrapvalidator.com/validators/\" target=\"_blank\">http://bootstrapvalidator.com/validators/</a>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Full name</label>\r\n            <div class=\"col-lg-4\">\r\n                <input type=\"text\" class=\"form-control\" name=\"firstName\" placeholder=\"First name\"\r\n                       data-bv-notempty=\"true\"\r\n                       data-bv-notempty-message=\"The first name is required and cannot be empty\" />\r\n            </div>\r\n            <div class=\"col-lg-4\">\r\n                <input type=\"text\" class=\"form-control\" name=\"lastName\" placeholder=\"Last name\"\r\n                       data-bv-notempty=\"true\"\r\n                       data-bv-notempty-message=\"The last name is required and cannot be empty\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Username</label>\r\n            <div class=\"col-lg-5\">\r\n                <input type=\"text\" class=\"form-control\" name=\"username\"\r\n                       data-bv-message=\"The username is not valid\"\r\n\r\n                       data-bv-notempty=\"true\"\r\n                       data-bv-notempty-message=\"The username is required and cannot be empty\"\r\n\r\n                       data-bv-regexp=\"true\"\r\n                       data-bv-regexp-regexp=\"^[a-zA-Z0-9_\\.]+$\"\r\n                       data-bv-regexp-message=\"The username can only consist of alphabetical, number, dot and underscore\"\r\n\r\n                       data-bv-stringlength=\"true\"\r\n                       data-bv-stringlength-min=\"6\"\r\n                       data-bv-stringlength-max=\"30\"\r\n                       data-bv-stringlength-message=\"The username must be more than 6 and less than 30 characters long\"\r\n\r\n                       data-bv-different=\"true\"\r\n                       data-bv-different-field=\"password\"\r\n                       data-bv-different-message=\"The username and password cannot be the same as each other\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Email address</label>\r\n            <div class=\"col-lg-5\">\r\n                <input class=\"form-control\" name=\"email\" type=\"email\"\r\n                       data-bv-emailaddress=\"true\"\r\n                       data-bv-emailaddress-message=\"The input is not a valid email address\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Password</label>\r\n            <div class=\"col-lg-5\">\r\n                <input type=\"password\" class=\"form-control\" name=\"password\"\r\n                       data-bv-notempty=\"true\"\r\n                       data-bv-notempty-message=\"The password is required and cannot be empty\"\r\n\r\n                       data-bv-identical=\"true\"\r\n                       data-bv-identical-field=\"confirmPassword\"\r\n                       data-bv-identical-message=\"The password and its confirm are not the same\"\r\n\r\n                       data-bv-different=\"true\"\r\n                       data-bv-different-field=\"username\"\r\n                       data-bv-different-message=\"The password cannot be the same as username\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Retype password</label>\r\n            <div class=\"col-lg-5\">\r\n                <input type=\"password\" class=\"form-control\" name=\"confirmPassword\"\r\n                       data-bv-notempty=\"true\"\r\n                       data-bv-notempty-message=\"The confirm password is required and cannot be empty\"\r\n\r\n                       data-bv-identical=\"true\"\r\n                       data-bv-identical-field=\"password\"\r\n                       data-bv-identical-message=\"The password and its confirm are not the same\"\r\n\r\n                       data-bv-different=\"true\"\r\n                       data-bv-different-field=\"username\"\r\n                       data-bv-different-message=\"The password cannot be the same as username\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Languages</label>\r\n            <div class=\"col-lg-5\">\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"english\"\r\n                               data-bv-message=\"Please specify at least one language you can speak\"\r\n                               data-bv-notempty=\"true\" />\r\n                        English </label>\r\n                </div>\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"french\" />\r\n                        French </label>\r\n                </div>\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"german\" />\r\n                        German </label>\r\n                </div>\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"russian\" />\r\n                        Russian </label>\r\n                </div>\r\n                <div class=\"checkbox\">\r\n                    <label>\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"other\" />\r\n                        Other </label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <div class=\"form-actions\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <button class=\"btn btn-default\" type=\"submit\">\r\n                    <i class=\"fa fa-eye\"></i>\r\n                    Validate\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</form>\r\n     ");
$templateCache.put("app/_common/forms/directives/bootstrap-validation/bootstrap-button-group-form.tpl.html","<form id=\"buttonGroupForm\" method=\"post\" class=\"form-horizontal\">\r\n\r\n    <fieldset>\r\n        <legend>\r\n            Default Form Elements\r\n        </legend>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Gender</label>\r\n            <div class=\"col-lg-9\">\r\n                <div class=\"btn-group\" data-toggle=\"buttons\">\r\n                    <label class=\"btn btn-default\">\r\n                        <input type=\"radio\" name=\"gender\" value=\"male\" />\r\n                        Male </label>\r\n                    <label class=\"btn btn-default\">\r\n                        <input type=\"radio\" name=\"gender\" value=\"female\" />\r\n                        Female </label>\r\n                    <label class=\"btn btn-default\">\r\n                        <input type=\"radio\" name=\"gender\" value=\"other\" />\r\n                        Other </label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Languages</label>\r\n            <div class=\"col-lg-9\">\r\n                <div class=\"btn-group\" data-toggle=\"buttons\">\r\n                    <label class=\"btn btn-default\">\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"english\" />\r\n                        English </label>\r\n                    <label class=\"btn btn-default\">\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"german\" />\r\n                        German </label>\r\n                    <label class=\"btn btn-default\">\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"french\" />\r\n                        French </label>\r\n                    <label class=\"btn btn-default\">\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"russian\" />\r\n                        Russian </label>\r\n                    <label class=\"btn btn-default\">\r\n                        <input type=\"checkbox\" name=\"languages[]\" value=\"italian\">\r\n                        Italian </label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <div class=\"form-actions\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <button class=\"btn btn-default\" type=\"submit\">\r\n                    <i class=\"fa fa-eye\"></i>\r\n                    Validate\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</form>\r\n");
$templateCache.put("app/_common/forms/directives/bootstrap-validation/bootstrap-contact-form.tpl.html","<form id=\"contactForm\" method=\"post\" class=\"form-horizontal\">\r\n\r\n    <fieldset>\r\n        <legend>Showing messages in custom area</legend>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-md-3 control-label\">Full name</label>\r\n            <div class=\"col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" name=\"fullName\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-md-3 control-label\">Email</label>\r\n            <div class=\"col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" name=\"email\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-md-3 control-label\">Title</label>\r\n            <div class=\"col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" name=\"title\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-md-3 control-label\">Content</label>\r\n            <div class=\"col-md-6\">\r\n                <textarea class=\"form-control\" name=\"content\" rows=\"5\"></textarea>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <!-- #messages is where the messages are placed inside -->\r\n        <div class=\"form-group\">\r\n            <div class=\"col-md-9 col-md-offset-3\">\r\n                <div id=\"messages\"></div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <div class=\"form-actions\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <button class=\"btn btn-default\" type=\"submit\">\r\n                    <i class=\"fa fa-eye\"></i>\r\n                    Validate\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</form>\r\n");
$templateCache.put("app/_common/forms/directives/bootstrap-validation/bootstrap-movie-form.tpl.html","\r\n<form id=\"movieForm\" method=\"post\">\r\n\r\n    <fieldset>\r\n        <legend>\r\n            Default Form Elements\r\n        </legend>\r\n        <div class=\"form-group\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-8\">\r\n                    <label class=\"control-label\">Movie title</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"title\" />\r\n                </div>\r\n\r\n                <div class=\"col-md-4 selectContainer\">\r\n                    <label class=\"control-label\">Genre</label>\r\n                    <select class=\"form-control\" name=\"genre\">\r\n                        <option value=\"\">Choose a genre</option>\r\n                        <option value=\"action\">Action</option>\r\n                        <option value=\"comedy\">Comedy</option>\r\n                        <option value=\"horror\">Horror</option>\r\n                        <option value=\"romance\">Romance</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <div class=\"row\">\r\n                <div class=\"col-sm-12 col-md-4\">\r\n                    <label class=\"control-label\">Director</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"director\" />\r\n                </div>\r\n\r\n                <div class=\"col-sm-12 col-md-4\">\r\n                    <label class=\"control-label\">Writer</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"writer\" />\r\n                </div>\r\n\r\n                <div class=\"col-sm-12 col-md-4\">\r\n                    <label class=\"control-label\">Producer</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"producer\" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <div class=\"row\">\r\n                <div class=\"col-sm-12 col-md-6\">\r\n                    <label class=\"control-label\">Website</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"website\" />\r\n                </div>\r\n\r\n                <div class=\"col-sm-12 col-md-6\">\r\n                    <label class=\"control-label\">Youtube trailer</label>\r\n                    <input type=\"text\" class=\"form-control\" name=\"trailer\" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"control-label\">Review</label>\r\n            <textarea class=\"form-control\" name=\"review\" rows=\"8\"></textarea>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-sm-12 col-md-12\">\r\n                    <label class=\"control-label\">Rating</label>\r\n                </div>\r\n\r\n                <div class=\"col-sm-12 col-md-10\">\r\n\r\n                    <label class=\"radio radio-inline no-margin\">\r\n                        <input type=\"radio\" name=\"rating\" value=\"terrible\" class=\"radiobox style-2\" />\r\n                        <span>Terrible</span> </label>\r\n\r\n                    <label class=\"radio radio-inline\">\r\n                        <input type=\"radio\" name=\"rating\" value=\"watchable\" class=\"radiobox style-2\" />\r\n                        <span>Watchable</span> </label>\r\n                    <label class=\"radio radio-inline\">\r\n                        <input type=\"radio\" name=\"rating\" value=\"best\" class=\"radiobox style-2\" />\r\n                        <span>Best ever</span> </label>\r\n\r\n                </div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </fieldset>\r\n\r\n    <div class=\"form-actions\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <button class=\"btn btn-default\" type=\"submit\">\r\n                    <i class=\"fa fa-eye\"></i>\r\n                    Validate\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</form>\r\n\r\n ");
$templateCache.put("app/_common/forms/directives/bootstrap-validation/bootstrap-product-form.tpl.html","<form id=\"productForm\" class=\"form-horizontal\">\r\n\r\n    <fieldset>\r\n        <legend>\r\n            Default Form Elements\r\n        </legend>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-xs-2 col-lg-3 control-label\">Price</label>\r\n            <div class=\"col-xs-9 col-lg-6 inputGroupContainer\">\r\n                <div class=\"input-group\">\r\n                    <input type=\"text\" class=\"form-control\" name=\"price\" />\r\n                    <span class=\"input-group-addon\">$</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-xs-2 col-lg-3 control-label\">Amount</label>\r\n            <div class=\"col-xs-9 col-lg-6 inputGroupContainer\">\r\n                <div class=\"input-group\">\r\n                    <span class=\"input-group-addon\">&#8364;</span>\r\n                    <input type=\"text\" class=\"form-control\" name=\"amount\" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-xs-2 col-lg-3 control-label\">Color</label>\r\n            <div class=\"col-xs-9 col-lg-6 selectContainer\">\r\n                <select class=\"form-control\" name=\"color\">\r\n                    <option value=\"\">Choose a color</option>\r\n                    <option value=\"blue\">Blue</option>\r\n                    <option value=\"green\">Green</option>\r\n                    <option value=\"red\">Red</option>\r\n                    <option value=\"yellow\">Yellow</option>\r\n                    <option value=\"white\">White</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-xs-2 col-lg-3 control-label\">Size</label>\r\n            <div class=\"col-xs-9 col-lg-6 selectContainer\">\r\n                <select class=\"form-control\" name=\"size\">\r\n                    <option value=\"\">Choose a size</option>\r\n                    <option value=\"S\">S</option>\r\n                    <option value=\"M\">M</option>\r\n                    <option value=\"L\">L</option>\r\n                    <option value=\"XL\">XL</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <div class=\"form-actions\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <button class=\"btn btn-default\" type=\"submit\">\r\n                    <i class=\"fa fa-eye\"></i>\r\n                    Validate\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n\r\n");
$templateCache.put("app/_common/forms/directives/bootstrap-validation/bootstrap-profile-form.tpl.html","<form id=\"profileForm\">\r\n\r\n    <fieldset>\r\n        <legend>\r\n            Default Form Elements\r\n        </legend>\r\n        <div class=\"form-group\">\r\n            <label>Email address</label>\r\n            <input type=\"text\" class=\"form-control\" name=\"email\" />\r\n        </div>\r\n    </fieldset>\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label>Password</label>\r\n            <input type=\"password\" class=\"form-control\" name=\"password\" />\r\n        </div>\r\n    </fieldset>\r\n\r\n    <div class=\"form-actions\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <button class=\"btn btn-default\" type=\"submit\">\r\n                    <i class=\"fa fa-eye\"></i>\r\n                    Validate\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n");
$templateCache.put("app/_common/forms/directives/bootstrap-validation/bootstrap-toggling-form.tpl.html","<form id=\"togglingForm\" method=\"post\" class=\"form-horizontal\">\r\n\r\n    <fieldset>\r\n        <legend>\r\n            Default Form Elements\r\n        </legend>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Full name <sup>*</sup></label>\r\n            <div class=\"col-lg-4\">\r\n                <input type=\"text\" class=\"form-control\" name=\"firstName\" placeholder=\"First name\" />\r\n            </div>\r\n            <div class=\"col-lg-4\">\r\n                <input type=\"text\" class=\"form-control\" name=\"lastName\" placeholder=\"Last name\" />\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Company <sup>*</sup></label>\r\n            <div class=\"col-lg-5\">\r\n                <input type=\"text\" class=\"form-control\" name=\"company\"\r\n                       required data-bv-notempty-message=\"The company name is required\" />\r\n            </div>\r\n            <div class=\"col-lg-2\">\r\n                <button type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"#jobInfo\">\r\n                    Add more info\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n\r\n    <!-- These fields will not be validated as long as they are not visible -->\r\n    <div id=\"jobInfo\" style=\"display: none;\">\r\n        <fieldset>\r\n            <div class=\"form-group\">\r\n                <label class=\"col-lg-3 control-label\">Job title <sup>*</sup></label>\r\n                <div class=\"col-lg-5\">\r\n                    <input type=\"text\" class=\"form-control\" name=\"job\" />\r\n                </div>\r\n            </div>\r\n        </fieldset>\r\n\r\n        <fieldset>\r\n            <div class=\"form-group\">\r\n                <label class=\"col-lg-3 control-label\">Department <sup>*</sup></label>\r\n                <div class=\"col-lg-5\">\r\n                    <input type=\"text\" class=\"form-control\" name=\"department\" />\r\n                </div>\r\n            </div>\r\n        </fieldset>\r\n    </div>\r\n\r\n    <fieldset>\r\n        <div class=\"form-group\">\r\n            <label class=\"col-lg-3 control-label\">Mobile phone <sup>*</sup></label>\r\n            <div class=\"col-lg-5\">\r\n                <input type=\"text\" class=\"form-control\" name=\"mobilePhone\" />\r\n            </div>\r\n            <div class=\"col-lg-2\">\r\n                <button type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"#phoneInfo\">\r\n                    Add more phone numbers\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n    <!-- These fields will not be validated as long as they are not visible -->\r\n    <div id=\"phoneInfo\" style=\"display: none;\">\r\n\r\n        <fieldset>\r\n            <div class=\"form-group\">\r\n                <label class=\"col-lg-3 control-label\">Home phone</label>\r\n                <div class=\"col-lg-5\">\r\n                    <input type=\"text\" class=\"form-control\" name=\"homePhone\" />\r\n                </div>\r\n            </div>\r\n        </fieldset>\r\n        <fieldset>\r\n            <div class=\"form-group\">\r\n                <label class=\"col-lg-3 control-label\">Office phone</label>\r\n                <div class=\"col-lg-5\">\r\n                    <input type=\"text\" class=\"form-control\" name=\"officePhone\" />\r\n                </div>\r\n            </div>\r\n        </fieldset>\r\n    </div>\r\n\r\n    <div class=\"form-actions\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <button class=\"btn btn-default\" type=\"submit\">\r\n                    <i class=\"fa fa-eye\"></i>\r\n                    Validate\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>");
$templateCache.put("app/_common/layout/directives/demo/demo-states.tpl.html","<div class=\"demo\"><span id=\"demo-setting\"><i class=\"fa fa-cog txt-color-blueDark\"></i></span>\r\n\r\n    <form>\r\n        <legend class=\"no-padding margin-bottom-10\">Layout Options</legend>\r\n        <section>\r\n            <label><input type=\"checkbox\" ng-model=\"fixedHeader\"\r\n                          class=\"checkbox style-0\"><span>Fixed Header</span></label>\r\n            <label><input type=\"checkbox\"\r\n                          ng-model=\"fixedNavigation\"\r\n                          class=\"checkbox style-0\"><span>Fixed Navigation</span></label>\r\n            <label><input type=\"checkbox\"\r\n                          ng-model=\"fixedRibbon\"\r\n                          class=\"checkbox style-0\"><span>Fixed Ribbon</span></label>\r\n            <label><input type=\"checkbox\"\r\n                          ng-model=\"fixedPageFooter\"\r\n                          class=\"checkbox style-0\"><span>Fixed Footer</span></label>\r\n            <label><input type=\"checkbox\"\r\n                          ng-model=\"insideContainer\"\r\n                          class=\"checkbox style-0\"><span>Inside <b>.container</b></span></label>\r\n            <label><input type=\"checkbox\"\r\n                          ng-model=\"rtl\"\r\n                          class=\"checkbox style-0\"><span>RTL</span></label>\r\n            <label><input type=\"checkbox\"\r\n                          ng-model=\"menuOnTop\"\r\n                          class=\"checkbox style-0\"><span>Menu on <b>top</b></span></label>\r\n            <label><input type=\"checkbox\"\r\n                          ng-model=\"colorblindFriendly\"\r\n                          class=\"checkbox style-0\"><span>For Colorblind <div\r\n                    class=\"font-xs text-right\">(experimental)\r\n            </div></span>\r\n            </label><span id=\"smart-bgimages\"></span></section>\r\n        <section><h6 class=\"margin-top-10 semi-bold margin-bottom-5\">Clear Localstorage</h6><a\r\n                ng-click=\"factoryReset()\" class=\"btn btn-xs btn-block btn-primary\" id=\"reset-smart-widget\"><i\r\n                class=\"fa fa-refresh\"></i> Factory Reset</a></section>\r\n\r\n        <h6 class=\"margin-top-10 semi-bold margin-bottom-5\">SmartAdmin Skins</h6>\r\n\r\n\r\n        <section id=\"smart-styles\">\r\n            <a ng-repeat=\"skin in skins\" ng-click=\"setSkin(skin)\" class=\"{{skin.class}}\" style=\"{{skin.style}}\"><i ng-if=\"skin.name == $parent.smartSkin\" class=\"fa fa-check fa-fw\"></i> {{skin.label}} <sup ng-if=\"skin.beta\">beta</sup></a>\r\n        </section>\r\n    </form>\r\n</div>");}]);
"use strict";

angular.module('app.auth').directive('facebookSignin', function ($rootScope, ezfb) {
    return {
        replace: true,
        restrict: 'E',
        template: '<a class="btn btn-block btn-social btn-facebook"><i class="fa fa-facebook"></i> Sign in with Facebook</a>',
        link: function(scope, element){
            element.on('click', function(){
                ezfb.login(function (res) {
                    if (res.authResponse) {
                        $rootScope.$broadcast('event:facebook-signin-success', res.authResponse);
                    }
                }, {scope: 'public_profile'});
            })

        }
    }
});
"use strict";

angular.module('app.auth').directive('googleSignin', function ($rootScope, GooglePlus) {
    return {
        restrict: 'E',
        template: '<a class="g-signin btn btn-block btn-social btn-google-plus"><i class="fa fa-google-plus"></i> Sign in with Google</a>',
        replace: true,
        link: function (scope, element) {
            element.on('click', function(){
                GooglePlus.login().then(function (authResult) {
                    $rootScope.$broadcast('event:google-plus-signin-success', authResult);

                }, function (err) {
                    $rootScope.$broadcast('event:google-plus-signin-failure', err);

                });
            })
        }
    };
});

"use strict";

angular.module('SmartAdmin.Layout').directive('fullScreen', function(){
    return {
        restrict: 'A',
        link: function(scope, element){
            var $body = $('body');
            var toggleFullSceen = function(e){
                if (!$body.hasClass("full-screen")) {
                    $body.addClass("full-screen");
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen();
                    } else if (document.documentElement.msRequestFullscreen) {
                        document.documentElement.msRequestFullscreen();
                    }
                } else {
                    $body.removeClass("full-screen");
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            };

            element.on('click', toggleFullSceen);

        }
    }
});
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

'use strict';

angular.module('SmartAdmin.Layout').directive('reloadState', function ($rootScope) {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('reload-state data-reload-state');
            tElement.on('click', function (e) {
                $rootScope.$state.transitionTo($rootScope.$state.current, $rootScope.$stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
                e.preventDefault();
            })
        }
    }
});

"use strict";

angular.module('SmartAdmin.Layout').directive('resetWidgets', function($state){

    return {
        restrict: 'A',
        link: function(scope, element){
            element.on('click', function(){
                $.SmartMessageBox({
                    title : "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
                    content : "Would you like to RESET all your saved widgets and clear LocalStorage?1",
                    buttons : '[No][Yes]'
                }, function(ButtonPressed) {
                    if (ButtonPressed == "Yes" && localStorage) {
                        localStorage.clear();
                        location.reload()
                    }
                });

            });
        }
    }

});

'use strict';

angular.module('SmartAdmin.Layout').directive('searchMobile', function () {
    return {
        restrict: 'A',
        compile: function (element, attributes) {
            element.removeAttr('search-mobile data-search-mobile');

            element.on('click', function (e) {
                $('body').addClass('search-mobile');
                e.preventDefault();
            });

            $('#cancel-search-js').on('click', function (e) {
                $('body').removeClass('search-mobile');
                e.preventDefault();
            });
        }
    }
});
"use strict";

angular.module('SmartAdmin.Layout').directive('toggleMenu', function(){
    return {
        restrict: 'A',
        link: function(scope, element){
            var $body = $('body');

            var toggleMenu = function(){
                if (!$body.hasClass("menu-on-top")){
                    $('html').toggleClass("hidden-menu-mobile-lock");
                    $body.toggleClass("hidden-menu");
                    $body.removeClass("minified");
                } else if ( $body.hasClass("menu-on-top") && $body.hasClass("mobile-view-activated") ) {
                    $('html').toggleClass("hidden-menu-mobile-lock");
                    $body.toggleClass("hidden-menu");
                    $body.removeClass("minified");
                }
            };

            element.on('click', toggleMenu);

            scope.$on('requestToggleMenu', function(){
                toggleMenu();
            });
        }
    }
});
'use strict';

angular.module('SmartAdmin.Layout').directive('bigBreadcrumbs', function () {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div><h1 class="page-title txt-color-blueDark"></h1></div>',
        scope: {
            items: '=',
            icon: '@'
        },
        link: function (scope, element) {
            var first = _.first(scope.items);

            var icon = scope.icon || 'home';
            element.find('h1').append('<i class="fa-fw fa fa-' + icon + '"></i> ' + first);
            _.rest(scope.items).forEach(function (item) {
                element.find('h1').append(' <span>> ' + item + '</span>')
            })
        }
    }
});

'use strict';

angular.module('SmartAdmin.Layout').directive('dismisser', function () {
    return {
        restrict: 'A',
        compile: function (element) {
            element.removeAttr('dismisser data-dissmiser')
            var closer = '<button class="close">&times;</button>';
            element.prepend(closer);
            element.on('click', '>button.close', function(){
                element.fadeOut('fast',function(){ $(this).remove(); });

            })
        }
    }
});
'use strict';

angular.module('SmartAdmin.Layout').directive('hrefVoid', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.attr('href','#');
            element.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
            })
        }
    }
});
'use strict';

/*
* Directive for toggling a ng-model with a button
* Source: https://gist.github.com/aeife/9374784
*/

angular.module('SmartAdmin.Layout').directive('radioToggle', function ($log) {
    return {
        scope: {
            model: "=ngModel",
            value: "@value"
        },
        link: function(scope, element, attrs) {

            element.parent().on('click', function() {
                scope.model = scope.value;
                scope.$apply();
            });
        }
    }
});
/**
 * DETECT MOBILE DEVICES
 * Description: Detects mobile device - if any of the listed device is
 *
 * detected class is inserted to <tElement>.
 *
 *  (so far this is covering most hand held devices)
 */
'use strict';

angular.module('SmartAdmin.Layout').directive('smartDeviceDetect', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-device-detect data-smart-device-detect');

            var isMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
            
            tElement.toggleClass('desktop-detected', !isMobile);
            tElement.toggleClass('mobile-detected', isMobile);


        }
    }
});
/**
 *
 * Description: Directive utilizes FastClick library.
 *
 *
 * FastClick is a simple, easy-to-use library for eliminating the
 * 300ms delay between a physical tap and the firing of a click event on mobile browsers.
 * FastClick doesn't attach any listeners on desktop browsers.
 * @link: https://github.com/ftlabs/fastclick
 *
 * On mobile devices 'needsclick' class is attached to <tElement>
 *
 */


'use strict';

angular.module('SmartAdmin.Layout').directive('smartFastClick', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-fast-click data-smart-fast-click');

            FastClick.attach(tElement);

            if(!FastClick.notNeeded())
                tElement.addClass('needsclick')
        }
    }
});

'use strict';

angular.module('SmartAdmin.Layout').directive('smartFitAppView', function ($rootScope, SmartCss) {
    return {
        restrict: 'A',
        compile: function (element, attributes) {
            element.removeAttr('smart-fit-app-view data-smart-fit-app-view leading-y data-leading-y');

            var leadingY = attributes.leadingY ? parseInt(attributes.leadingY) : 0;

            var selector = attributes.smartFitAppView;

            if(SmartCss.appViewSize && SmartCss.appViewSize.height){
                var height =  SmartCss.appViewSize.height - leadingY < 252 ? 252 :  SmartCss.appViewSize.height - leadingY;
                SmartCss.add(selector, 'height', height+'px');
            }

            var listenerDestroy = $rootScope.$on('$smartContentResize', function (event, data) {
                var height = data.height - leadingY < 252 ? 252 : data.height - leadingY;
                SmartCss.add(selector, 'height', height+'px');
            });

            element.on('$destroy', function () {
                listenerDestroy();
                SmartCss.remove(selector, 'height');
            });


        }
    }
});

"use strict";

angular.module('SmartAdmin.Layout').directive('smartInclude', function () {
        return {
            replace: true,
            restrict: 'A',
            templateUrl: function (element, attr) {
                return attr.smartInclude;
            },
            compile: function(element){
                element[0].className = element[0].className.replace(/placeholder[^\s]+/g, '');
            }
        };
    }
);


'use strict';

angular.module('SmartAdmin.Layout').directive('smartLayout', function ($rootScope, $timeout, $interval, $q, SmartCss, APP_CONFIG) {
    
    var _debug = 0;

    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

    var initialized = false, 
           initializedResolver = $q.defer();
    initializedResolver.promise.then(function () {
        initialized = true;
    });

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $body = $('body'),
        $navigation ,
        $menu,
        $ribbon,
        $footer,
        $contentAnimContainer;


    (function cacheElements() {
        $navigation = $('#header');
        $menu = $('#left-panel');
        $ribbon = $('#ribbon');
        $footer = $('.page-footer');
        if (_.every([$navigation, $menu, $ribbon, $footer], function ($it) {
            return angular.isNumber($it.height())
        })) {
            initializedResolver.resolve();
        } else {
            $timeout(cacheElements, 100);
        }
    })();

    (function applyConfigSkin(){
        if(APP_CONFIG.smartSkin){
            $body.removeClass(_.pluck(APP_CONFIG.skins, 'name').join(' '));
            $body.addClass(APP_CONFIG.smartSkin);
        }
    })();


    return {
        priority: 2014,
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-layout data-smart-layout');

            var appViewHeight = 0 ,
                appViewWidth = 0,
                calcWidth,
                calcHeight,
                deltaX,
                deltaY;

            var forceResizeTrigger = false;

            function resizeListener() {

//                    full window height appHeight = Math.max($menu.outerHeight() - 10, getDocHeight() - 10);

                var menuHeight = $body.hasClass('menu-on-top') && $menu.is(':visible') ? $menu.height() : 0;
                var menuWidth = !$body.hasClass('menu-on-top') && $menu.is(':visible') ? $menu.width() + $menu.offset().left : 0;

                var $content = $('#content');
                var contentXPad = $content.outerWidth(true) - $content.width();
                var contentYPad = $content.outerHeight(true) - $content.height();


                calcWidth = $window.width() - menuWidth - contentXPad;
                calcHeight = $window.height() - menuHeight - contentYPad - $navigation.height() - $ribbon.height() - $footer.height();

                deltaX = appViewWidth - calcWidth;
                deltaY = appViewHeight - calcHeight;
                if (Math.abs(deltaX) || Math.abs(deltaY) || forceResizeTrigger) {

                    //console.log('exec', calcWidth, calcHeight);
                    $rootScope.$broadcast('$smartContentResize', {
                        width: calcWidth,
                        height: calcHeight,
                        deltaX: deltaX,
                        deltaY: deltaY
                    });
                    appViewWidth = calcWidth;
                    appViewHeight = calcHeight;
                    forceResizeTrigger = false;
                }
            }


            var looping = false;
            $interval(function () {
                if (looping) loop();
            }, 300);

            var debouncedRun = _.debounce(function () {
                run(300)
            }, 300);

            function run(delay) {
                initializedResolver.promise.then(function () {
                    attachOnResize(delay);
                });
            }

            run(10);

            function detachOnResize() {
                looping = false;
            }

            function attachOnResize(delay) {
                $timeout(function () {
                    looping = true;
                }, delay);
            }

            function loop() {
                $body.toggleClass('mobile-view-activated', $window.width() < 979);

                if ($window.width() < 979)
                    $body.removeClass('minified');

                resizeListener();
            }

            function handleHtmlId(toState) {
                if (toState.data && toState.data.htmlId) $html.attr('id', toState.data.htmlId);
                else $html.removeAttr('id');
            }

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                //console.log(1, '$stateChangeStart', event, toState, toParams, fromState, fromParams);

                handleHtmlId(toState);
                detachOnResize();
            });

            // initialized with 1 cause we came here with one $viewContentLoading request
            var viewContentLoading = 1;
            $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
                //console.log(2, '$viewContentLoading', event, viewConfig);
                viewContentLoading++;
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                //console.log(3, '$stateChangeSuccess', event, toState, toParams, fromState, fromParams);
                forceResizeTrigger = true;
            });

            $rootScope.$on('$viewContentLoaded', function (event) {
                //console.log(4, '$viewContentLoaded', event);
                viewContentLoading--;

                if (viewContentLoading == 0 && initialized) {
                    debouncedRun();
                }
            });
        }
    }
});



'use strict';

angular.module('SmartAdmin.Layout').directive('smartPageTitle', function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        compile: function (element, attributes) {
            element.removeAttr('smart-page-title data-smart-page-title');

            var defaultTitle = attributes.smartPageTitle;
            var listener = function(event, toState, toParams, fromState, fromParams) {
                var title = defaultTitle;
                if (toState.data && toState.data.title) title = toState.data.title + ' | ' + title;
                // Set asynchronously so page changes before title does
                $timeout(function() {
                    $('html head title').text(title);
                });
            };

            $rootScope.$on('$stateChangeStart', listener);

        }
    }
});
'use strict';

angular.module('SmartAdmin.Layout').directive('smartRouterAnimationWrap', function ($rootScope,$timeout) {
    return {
        restrict: 'A',
        compile: function (element, attributes) {
            element.removeAttr('smart-router-animation-wrap data-smart-router-animation-wrap wrap-for data-wrap-for');

            element.addClass('router-animation-container');


            var $loader = $('<div class="router-animation-loader"><i class="fa fa-gear fa-4x fa-spin"></i></div>')
                .css({
                    position: 'absolute',
                    top: 50,
                    left: 10
                }).hide().appendTo(element);


            var animateElementSelector = attributes.wrapFor;
            var viewsToMatch = attributes.smartRouterAnimationWrap.split(/\s/);

            var needRunContentViewAnimEnd = false;
            function contentViewAnimStart() {
                needRunContentViewAnimEnd = true;
                element.css({
                    height: element.height() + 'px',
                    overflow: 'hidden'
                }).addClass('active');
                $loader.fadeIn();

                $(animateElementSelector).addClass('animated faster fadeOutDown');
            }

            function contentViewAnimEnd() {
                if(needRunContentViewAnimEnd){
                    element.css({
                        height: 'auto',
                        overflow: 'visible'
                    }).removeClass('active');
                    

                    $(animateElementSelector).addClass('animated faster fadeInUp');

                    needRunContentViewAnimEnd = false;

                    $timeout(function(){
                        $(animateElementSelector).removeClass('animated');
                    },10);
                }
                $loader.fadeOut();
            }


            var destroyForStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                var isAnimRequired = _.any(viewsToMatch, function(view){
                   return _.has(toState.views, view) || _.has(fromState.views, view);
                });
                if(isAnimRequired){
                    contentViewAnimStart()
                }
            });

            var destroyForEnd = $rootScope.$on('$viewContentLoaded', function (event) {
                contentViewAnimEnd();
            });

            element.on('$destroy', function(){
                destroyForStart();
                destroyForEnd();

            });



        }
    }
});
angular.module('SmartAdmin.Layout').directive('speechRecognition', function ($log) {
	'use strict';

	$.root_ = $('body');
	var root, commands;

    root = window;
    window.appConfig = window.appConfig || {};

	if (appConfig.voice_command) {
		commands = appConfig.commands;
	}


	/*
	 * SMART VOICE
	 */

	var SpeechRecognition = root.SpeechRecognition || root.webkitSpeechRecognition || root.mozSpeechRecognition || root.msSpeechRecognition || root.oSpeechRecognition;

// ref: http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API


// function
	$.speechApp = (function(speech) {

		speech.start = function() {

			// Add our commands to smartSpeechRecognition
			smartSpeechRecognition.addCommands(commands);

			if (smartSpeechRecognition) {
				// activate plugin
				smartSpeechRecognition.start();
				// add btn class
				$.root_.addClass("voice-command-active");
				// play sound
				$.speechApp.playON();
				// set localStorage when switch is on manually
				if (appConfig.voice_localStorage) {
					localStorage.setItem('sm-setautovoice', 'true');
				}

			} else {
				// if plugin not found
				alert("speech plugin not loaded");
			}

		};
		speech.stop = function() {

			if (smartSpeechRecognition) {
				// deactivate plugin
				smartSpeechRecognition.abort();
				// remove btn class
				$.root_.removeClass("voice-command-active");
				// sound
				$.speechApp.playOFF();
				// del localStorage when switch if off manually
				if (appConfig.voice_localStorage) {
					localStorage.setItem('sm-setautovoice', 'false');
				}
				// remove popover if visible
				if ($('#speech-btn .popover').is(':visible')) {
					$('#speech-btn .popover').fadeOut(250);
				}
			}

		};

		// play sound
		speech.playON = function() {

			var audioElement = document.createElement('audio');

			if (navigator.userAgent.match('Firefox/'))
				audioElement.setAttribute('src', appConfig.sound_path + 'voice_on' + ".ogg");
			else
				audioElement.setAttribute('src', appConfig.sound_path + 'voice_on' + ".mp3");

			//$.get();
			audioElement.addEventListener("load", function() {
				audioElement.play();
			}, true);

			if (appConfig.sound_on) {
				audioElement.pause();
				audioElement.play();
			}
		};

		speech.playOFF = function() {

			var audioElement = document.createElement('audio');

			if (navigator.userAgent.match('Firefox/'))
				audioElement.setAttribute('src', appConfig.sound_path + 'voice_off' + ".ogg");
			else
				audioElement.setAttribute('src', appConfig.sound_path + 'voice_off' + ".mp3");

			$.get();
			audioElement.addEventListener("load", function() {
				audioElement.play();
			}, true);

			if (appConfig.sound_on) {
				audioElement.pause();
				audioElement.play();
			}
		};

		speech.playConfirmation = function() {

			var audioElement = document.createElement('audio');

			if (navigator.userAgent.match('Firefox/'))
				audioElement.setAttribute('src', appConfig.sound_path + 'voice_alert' + ".ogg");
			else
				audioElement.setAttribute('src', appConfig.sound_path + 'voice_alert' + ".mp3");

			$.get();
			audioElement.addEventListener("load", function() {
				audioElement.play();
			}, true);

			if (appConfig.sound_on) {
				audioElement.pause();
				audioElement.play();
			}
		};

		return speech;

	})({});



	/*
	 * SPEECH RECOGNITION ENGINE
	 * Copyright (c) 2013 Tal Ater
	 * Modified by MyOrange
	 * All modifications made are hereby copyright (c) 2014 MyOrange
	 */

	(function(undefined) {"use strict";

		// Check browser support
		// This is done as early as possible, to make it as fast as possible for unsupported browsers
		if (!SpeechRecognition) {
			root.smartSpeechRecognition = null;
			return undefined;
		}

		var commandsList = [], recognition, callbacks = {
				start : [],
				error : [],
				end : [],
				result : [],
				resultMatch : [],
				resultNoMatch : [],
				errorNetwork : [],
				errorPermissionBlocked : [],
				errorPermissionDenied : []
			}, autoRestart, lastStartedAt = 0,
		//debugState = false, // decleared in app.appConfig.js
		//appConfig.debugStyle = 'font-weight: bold; color: #00f;', // decleared in app.appConfig.js

		// The command matching code is a modified version of Backbone.Router by Jeremy Ashkenas, under the MIT license.
			optionalParam = /\s*\((.*?)\)\s*/g, optionalRegex = /(\(\?:[^)]+\))\?/g, namedParam = /(\(\?)?:\w+/g, splatParam = /\*\w+/g, escapeRegExp = /[\-{}\[\]+?.,\\\^$|#]/g, commandToRegExp = function(command) {
				command = command.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
					return optional ? match : '([^\\s]+)';
				}).replace(splatParam, '(.*?)').replace(optionalRegex, '\\s*$1?\\s*');
				return new RegExp('^' + command + '$', 'i');
			};

		// This method receives an array of callbacks to iterate over, and invokes each of them
		var invokeCallbacks = function(callbacks) {
			callbacks.forEach(function(callback) {
				callback.callback.apply(callback.context);
			});
		};

		var initIfNeeded = function() {
			if (!isInitialized()) {
				root.smartSpeechRecognition.init({}, false);
			}
		};

		var isInitialized = function() {
			return recognition !== undefined;
		};

		root.smartSpeechRecognition = {
			// Initialize smartSpeechRecognition with a list of commands to recognize.
			// e.g. smartSpeechRecognition.init({'hello :name': helloFunction})
			// smartSpeechRecognition understands commands with named variables, splats, and optional words.
			init : function(commands, resetCommands) {

				// resetCommands defaults to true
				if (resetCommands === undefined) {
					resetCommands = true;
				} else {
					resetCommands = !!resetCommands;
				}

				// Abort previous instances of recognition already running
				if (recognition && recognition.abort) {
					recognition.abort();
				}

				// initiate SpeechRecognition
				recognition = new SpeechRecognition();

				// Set the max number of alternative transcripts to try and match with a command
				recognition.maxAlternatives = 5;
				recognition.continuous = true;
				// Sets the language to the default 'en-US'. This can be changed with smartSpeechRecognition.setLanguage()
				recognition.lang = appConfig.voice_command_lang || 'en-US';

				recognition.onstart = function() {
					invokeCallbacks(callbacks.start);
					//debugState
					if (appConfig.debugState) {
						root.console.log('%c ✔ SUCCESS: User allowed access the microphone service to start ', appConfig.debugStyle_success);
						root.console.log('Language setting is set to: ' + recognition.lang, appConfig.debugStyle);
					}
					$.root_.removeClass("service-not-allowed");
					$.root_.addClass("service-allowed");
				};

				recognition.onerror = function(event) {
					invokeCallbacks(callbacks.error);
					switch (event.error) {
						case 'network':
							invokeCallbacks(callbacks.errorNetwork);
							break;
						case 'not-allowed':
						case 'service-not-allowed':
							// if permission to use the mic is denied, turn off auto-restart
							autoRestart = false;
							$.root_.removeClass("service-allowed");
							$.root_.addClass("service-not-allowed");
							//debugState
							if (appConfig.debugState) {
								root.console.log('%c WARNING: Microphone was not detected (either user denied access or it is not installed properly) ', appConfig.debugStyle_warning);
							}
							// determine if permission was denied by user or automatically.
							if (new Date().getTime() - lastStartedAt < 200) {
								invokeCallbacks(callbacks.errorPermissionBlocked);
							} else {
								invokeCallbacks(callbacks.errorPermissionDenied);
								//console.log("You need your mic to be active")
							}
							break;
					}
				};

				recognition.onend = function() {
					invokeCallbacks(callbacks.end);
					// smartSpeechRecognition will auto restart if it is closed automatically and not by user action.
					if (autoRestart) {
						// play nicely with the browser, and never restart smartSpeechRecognition automatically more than once per second
						var timeSinceLastStart = new Date().getTime() - lastStartedAt;
						if (timeSinceLastStart < 1000) {
							setTimeout(root.smartSpeechRecognition.start, 1000 - timeSinceLastStart);
						} else {
							root.smartSpeechRecognition.start();
						}
					}
				};

				recognition.onresult = function(event) {
					invokeCallbacks(callbacks.result);

					var results = event.results[event.resultIndex], commandText;

					// go over each of the 5 results and alternative results received (we've set maxAlternatives to 5 above)
					for (var i = 0; i < results.length; i++) {
						// the text recognized
						commandText = results[i].transcript.trim();
						if (appConfig.debugState) {
							root.console.log('Speech recognized: %c' + commandText, appConfig.debugStyle);
						}

						// try and match recognized text to one of the commands on the list
						for (var j = 0, l = commandsList.length; j < l; j++) {
							var result = commandsList[j].command.exec(commandText);
							if (result) {
								var parameters = result.slice(1);
								if (appConfig.debugState) {
									root.console.log('command matched: %c' + commandsList[j].originalPhrase, appConfig.debugStyle);
									if (parameters.length) {
										root.console.log('with parameters', parameters);
									}
								}
								// execute the matched command
								commandsList[j].callback.apply(this, parameters);
								invokeCallbacks(callbacks.resultMatch);

								// for commands "sound on", "stop" and "mute" do not play sound or display message
								//var myMatchedCommand = commandsList[j].originalPhrase;

								var ignoreCallsFor = ["sound on", "mute", "stop"];

								if (ignoreCallsFor.indexOf(commandsList[j].originalPhrase) < 0) {
									// play sound when match found
									console.log(2);
									$.smallBox({
										title : (commandsList[j].originalPhrase),
										content : "loading...",
										color : "#333",
										sound_file : 'voice_alert',
										timeout : 2000
									});

									if ($('#speech-btn .popover').is(':visible')) {
										$('#speech-btn .popover').fadeOut(250);
									}
								}// end if

								return true;
							}
						} // end for
					}// end for

					invokeCallbacks(callbacks.resultNoMatch);
					//console.log("no match found for: " + commandText)
					$.smallBox({
						title : "Error: <strong>" + ' " ' + commandText + ' " ' + "</strong> no match found!",
						content : "Please speak clearly into the microphone",
						color : "#a90329",
						timeout : 5000,
						icon : "fa fa-microphone"
					});
					if ($('#speech-btn .popover').is(':visible')) {
						$('#speech-btn .popover').fadeOut(250);
					}
					return false;
				};

				// build commands list
				if (resetCommands) {
					commandsList = [];
				}
				if (commands.length) {
					this.addCommands(commands);
				}
			},

			// Start listening (asking for permission first, if needed).
			// Call this after you've initialized smartSpeechRecognition with commands.
			// Receives an optional options object:
			// { autoRestart: true }
			start : function(options) {
				initIfNeeded();
				options = options || {};
				if (options.autoRestart !== undefined) {
					autoRestart = !!options.autoRestart;
				} else {
					autoRestart = true;
				}
				lastStartedAt = new Date().getTime();
				recognition.start();
			},

			// abort the listening session (aka stop)
			abort : function() {
				autoRestart = false;
				if (isInitialized) {
					recognition.abort();
				}
			},

			// Turn on output of debug messages to the console. Ugly, but super-handy!
			debug : function(newState) {
				if (arguments.length > 0) {
					appConfig.debugState = !!newState;
				} else {
					appConfig.debugState = true;
				}
			},

			// Set the language the user will speak in. If not called, defaults to 'en-US'.
			// e.g. 'fr-FR' (French-France), 'es-CR' (Español-Costa Rica)
			setLanguage : function(language) {
				initIfNeeded();
				recognition.lang = language;
			},

			// Add additional commands that smartSpeechRecognition will respond to. Similar in syntax to smartSpeechRecognition.init()
			addCommands : function(commands) {
				var cb, command;

				initIfNeeded();

				for (var phrase in commands) {
					if (commands.hasOwnProperty(phrase)) {
						cb = root[commands[phrase]] || commands[phrase];
						if ( typeof cb !== 'function') {
							continue;
						}
						//convert command to regex
						command = commandToRegExp(phrase);

						commandsList.push({
							command : command,
							callback : cb,
							originalPhrase : phrase
						});
					}
				}
				if (appConfig.debugState) {
					root.console.log('Commands successfully loaded: %c' + commandsList.length, appConfig.debugStyle);
				}
			},

			// Remove existing commands. Called with a single phrase, array of phrases, or methodically. Pass no params to remove all commands.
			removeCommands : function(commandsToRemove) {
				if (commandsToRemove === undefined) {
					commandsList = [];
					return;
				}
				commandsToRemove = Array.isArray(commandsToRemove) ? commandsToRemove : [commandsToRemove];
				commandsList = commandsList.filter(function(command) {
					for (var i = 0; i < commandsToRemove.length; i++) {
						if (commandsToRemove[i] === command.originalPhrase) {
							return false;
						}
					}
					return true;
				});
			},

			// Lets the user add a callback of one of 9 types:
			// start, error, end, result, resultMatch, resultNoMatch, errorNetwork, errorPermissionBlocked, errorPermissionDenied
			// Can also optionally receive a context for the callback function as the third argument
			addCallback : function(type, callback, context) {
				if (callbacks[type] === undefined) {
					return;
				}
				var cb = root[callback] || callback;
				if ( typeof cb !== 'function') {
					return;
				}
				callbacks[type].push({
					callback : cb,
					context : context || this
				});
			}
		};

	}).call(this);

	var autoStart = function() {

		smartSpeechRecognition.addCommands(commands);

		if (smartSpeechRecognition) {
			// activate plugin
			smartSpeechRecognition.start();
			// add btn class
			$.root_.addClass("voice-command-active");
			// set localStorage when switch is on manually
			if (appConfig.voice_localStorage) {
				localStorage.setItem('sm-setautovoice', 'true');
			}

		} else {
			// if plugin not found
			alert("speech plugin not loaded");
		}
	}
// if already running with localstorage
	if (SpeechRecognition && appConfig.voice_command && localStorage.getItem('sm-setautovoice') == 'true') {
		autoStart();
	}

// auto start
	if (SpeechRecognition && appConfig.voice_command_auto && appConfig.voice_command) {
		autoStart();
	}


	var link = function(scope, element) {


		if (SpeechRecognition && appConfig.voice_command) {

			// create dynamic modal instance
			var modal = $('<div class="modal fade" id="voiceModal" tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
			// attach to body
			modal.appendTo("body");

			element.on("click", function(e) {

            	if ($.root_.hasClass("voice-command-active")) {
					$.speechApp.stop();
					//$('#speech-btn > span > a > i').removeClass().addClass('fa fa-microphone-slash');
				} else {
					$.speechApp.start();
					//add popover
					$('#speech-btn .popover').fadeIn(350);
					//$('#speech-btn > span > a > i').removeClass().addClass('fa fa-microphone')

				}

				e.preventDefault();

            });

			//remove popover
			$(document).mouseup(function(e) {
				if (!$('#speech-btn .popover').is(e.target) && $('#speech-btn .popover').has(e.target).length === 0) {
					$('#speech-btn .popover').fadeOut(250);
				}
			});


			$("#speech-help-btn").on("click", function() {
				commands.help();
			});

		}
		else {
			$("#speech-btn").addClass("display-none");
		}


	}



    return {
        restrict: 'AE',
        link: link
    }
});

'use strict';

angular.module('SmartAdmin.Layout').directive('stateBreadcrumbs', function ($rootScope, $state) {


    return {
        restrict: 'EA',
        replace: true,
        template: '<ol class="breadcrumb"><li>Home</li></ol>',
        link: function (scope, element) {

            function setBreadcrumbs(breadcrumbs) {
                var html = '<li>Home</li>';
                angular.forEach(breadcrumbs, function (crumb) {
                    html += '<li>' + crumb + '</li>'
                });
                element.html(html)
            }

            function fetchBreadcrumbs(stateName, breadcrunbs) {

                var state = $state.get(stateName);

                if (state && state.data && state.data.title && breadcrunbs.indexOf(state.data.title) == -1) {
                    breadcrunbs.unshift(state.data.title)
                }

                var parentName = stateName.replace(/.?\w+$/, '');
                if (parentName) {
                    return fetchBreadcrumbs(parentName, breadcrunbs);
                } else {
                    return breadcrunbs;
                }
            }

            function processState(state) {
                var breadcrumbs;
                if (state.data && state.data.breadcrumbs) {
                    breadcrumbs = state.data.breadcrumbs;
                } else {
                    breadcrumbs = fetchBreadcrumbs(state.name, []);
                }
                setBreadcrumbs(breadcrumbs);
            }

            processState($state.current);

            $rootScope.$on('$stateChangeStart', function (event, state) {
                processState(state);
            })
        }
    }
});
'use strict';

angular.module('SmartAdmin.Layout').factory('lazyScript', function($q, $http){

    var cache = {};

    function isPending(scriptName){
        return (cache.hasOwnProperty(scriptName) && cache[scriptName].promise && cache[scriptName].promise.$$state.pending)
    }

    function isRegistered(scriptName){
        return cache.hasOwnProperty(scriptName)
    }
    function loadScript(scriptName){
        if(!cache[scriptName]){
            cache[scriptName] = $q.defer();
            var el = document.createElement( 'script' );
            el.onload = function(script){
                console.log('script is lazy loaded:', scriptName)
                cache[scriptName].resolve(scriptName);
            };
            el.src = scriptName;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(el, x);
            
        }
        return cache[scriptName].promise;

    }

    function register(scriptName){
        if(isPending(scriptName)){
            return cache[scriptName].promise
        }
        if(isRegistered(scriptName)){
            return $q.resolve(scriptName);
        } else {
            var dfd = $q.defer();

            loadScript(scriptName).then(function(){
                dfd.resolve(scriptName);
            });

            return dfd.promise; 

        }
    }
    return {
        register: function (scripts) {
            
            var dfd = $q.defer();
            var promises = [];
            if (angular.isString(scripts))
                scripts = [scripts];

            angular.forEach(scripts, function(script){
                promises.push(register(script));
            })

            $q.all(promises).then(function(resolves){
                dfd.resolve(resolves);
            })
            return dfd.promise;

        }
    };
});
'use strict';

angular.module('SmartAdmin.Layout').factory('SmartCss', function ($rootScope, $timeout) {

    var sheet = (function () {
        // Create the <style> tag
        var style = document.createElement("style");

        // Add a media (and/or media query) here if you'd like!
        // style.setAttribute("media", "screen")
        // style.setAttribute("media", "@media only screen and (max-width : 1024px)")

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();

    var _styles = {};


    var SmartCss = {
        writeRule: function(selector){
            SmartCss.deleteRuleFor(selector);
            if(_.has(_styles, selector)){
                var css = selector + '{ ' + _.map(_styles[selector], function(v, k){
                    return  k + ':' +  v + ';'
                }).join(' ') +'}';
                sheet.insertRule(css, _.size(_styles) - 1);
            }
        },
        add: function (selector, property, value, delay) {
            if(!_.has(_styles, selector))
                _styles[selector] = {};

            if(value == undefined || value == null || value == '')
                delete _styles[selector][property];
            else
                _styles[selector][property] = value;


            if(_.keys(_styles[selector]).length == 0)
                delete _styles[selector];

            if(!delay)
                delay = 0;
            $timeout(function(){
                SmartCss.writeRule(selector);
            }, delay);

        },
        remove: function(selector, property, delay){
            SmartCss.add(selector, property, null, delay);
        },
        deleteRuleFor: function (selector) {
            _(sheet.rules).forEach(function (rule, idx) {
                if (rule.selectorText == selector) {
                    sheet.deleteRule(idx);
                }
            });
        },
        appViewSize: null
    };

    $rootScope.$on('$smartContentResize', function (event, data) {
        SmartCss.appViewSize = data;
    });

    return SmartCss;

});





"use strict";

angular.module('SmartAdmin.UI').directive('smartPopoverHtml', function () {
    return {
        restrict: "A",
        link: function(scope, element, attributes){
            var options = {};
            options.content = attributes.smartPopoverHtml;
            options.placement = attributes.popoverPlacement || 'top';
            options.html = true;
            options.trigger =  attributes.popoverTrigger || 'click';
            options.title =  attributes.popoverTitle || attributes.title;
            element.popover(options)

        }

    };
});


"use strict";

angular.module('SmartAdmin.UI').directive('smartTooltipHtml', function () {
        return {
            restrict: 'A',
            link: function(scope, element, attributes){
                element.tooltip({
                    placement: attributes.tooltipPlacement || 'top',
                    html: true,
                    title: attributes.smartTooltipHtml
                })
            }
        };
    }
);

"use strict";


angular.module('SmartAdmin.Forms').directive('bootstrapAttributeForm', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/_common/forms/directives/bootstrap-validation/bootstrap-attribute-form.tpl.html',
        link: function(scope, form){
            form.bootstrapValidator();


        }

    }
});
"use strict";


angular.module('SmartAdmin.Forms').directive('bootstrapButtonGroupForm', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/_common/forms/directives/bootstrap-validation/bootstrap-button-group-form.tpl.html',
        link: function(scope, form){
            form.bootstrapValidator({
                excluded : ':disabled',
                feedbackIcons : {
                    valid : 'glyphicon glyphicon-ok',
                    invalid : 'glyphicon glyphicon-remove',
                    validating : 'glyphicon glyphicon-refresh'
                },
                fields : {
                    gender : {
                        validators : {
                            notEmpty : {
                                message : 'The gender is required'
                            }
                        }
                    },
                    'languages[]' : {
                        validators : {
                            choice : {
                                min : 1,
                                max : 2,
                                message : 'Please choose 1 - 2 languages you can speak'
                            }
                        }
                    }
                }
            });


        }

    }
});
"use strict";


angular.module('SmartAdmin.Forms').directive('bootstrapContactForm', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/_common/forms/directives/bootstrap-validation/bootstrap-contact-form.tpl.html',
        link: function(scope, form){
            form.bootstrapValidator({
                container : '#messages',
                feedbackIcons : {
                    valid : 'glyphicon glyphicon-ok',
                    invalid : 'glyphicon glyphicon-remove',
                    validating : 'glyphicon glyphicon-refresh'
                },
                fields : {
                    fullName : {
                        validators : {
                            notEmpty : {
                                message : 'The full name is required and cannot be empty'
                            }
                        }
                    },
                    email : {
                        validators : {
                            notEmpty : {
                                message : 'The email address is required and cannot be empty'
                            },
                            emailAddress : {
                                message : 'The email address is not valid'
                            }
                        }
                    },
                    title : {
                        validators : {
                            notEmpty : {
                                message : 'The title is required and cannot be empty'
                            },
                            stringLength : {
                                max : 100,
                                message : 'The title must be less than 100 characters long'
                            }
                        }
                    },
                    content : {
                        validators : {
                            notEmpty : {
                                message : 'The content is required and cannot be empty'
                            },
                            stringLength : {
                                max : 500,
                                message : 'The content must be less than 500 characters long'
                            }
                        }
                    }
                }
            });

        }

    }

});
"use strict";


angular.module('SmartAdmin.Forms').directive('bootstrapMovieForm', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/_common/forms/directives/bootstrap-validation/bootstrap-movie-form.tpl.html',
        link: function(scope, form){
            form.bootstrapValidator({
                feedbackIcons : {
                    valid : 'glyphicon glyphicon-ok',
                    invalid : 'glyphicon glyphicon-remove',
                    validating : 'glyphicon glyphicon-refresh'
                },
                fields : {
                    title : {
                        group : '.col-md-8',
                        validators : {
                            notEmpty : {
                                message : 'The title is required'
                            },
                            stringLength : {
                                max : 200,
                                message : 'The title must be less than 200 characters long'
                            }
                        }
                    },
                    genre : {
                        group : '.col-md-4',
                        validators : {
                            notEmpty : {
                                message : 'The genre is required'
                            }
                        }
                    },
                    director : {
                        group : '.col-md-4',
                        validators : {
                            notEmpty : {
                                message : 'The director name is required'
                            },
                            stringLength : {
                                max : 80,
                                message : 'The director name must be less than 80 characters long'
                            }
                        }
                    },
                    writer : {
                        group : '.col-md-4',
                        validators : {
                            notEmpty : {
                                message : 'The writer name is required'
                            },
                            stringLength : {
                                max : 80,
                                message : 'The writer name must be less than 80 characters long'
                            }
                        }
                    },
                    producer : {
                        group : '.col-md-4',
                        validators : {
                            notEmpty : {
                                message : 'The producer name is required'
                            },
                            stringLength : {
                                max : 80,
                                message : 'The producer name must be less than 80 characters long'
                            }
                        }
                    },
                    website : {
                        group : '.col-md-6',
                        validators : {
                            notEmpty : {
                                message : 'The website address is required'
                            },
                            uri : {
                                message : 'The website address is not valid'
                            }
                        }
                    },
                    trailer : {
                        group : '.col-md-6',
                        validators : {
                            notEmpty : {
                                message : 'The trailer link is required'
                            },
                            uri : {
                                message : 'The trailer link is not valid'
                            }
                        }
                    },
                    review : {
                        // The group will be set as default (.form-group)
                        validators : {
                            stringLength : {
                                max : 500,
                                message : 'The review must be less than 500 characters long'
                            }
                        }
                    },
                    rating : {
                        // The group will be set as default (.form-group)
                        validators : {
                            notEmpty : {
                                message : 'The rating is required'
                            }
                        }
                    }
                }
            });

        }

    }

});
"use strict";


angular.module('SmartAdmin.Forms').directive('bootstrapProductForm', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/_common/forms/directives/bootstrap-validation/bootstrap-product-form.tpl.html',
        link: function(scope, form){
            form.bootstrapValidator({
                feedbackIcons : {
                    valid : 'glyphicon glyphicon-ok',
                    invalid : 'glyphicon glyphicon-remove',
                    validating : 'glyphicon glyphicon-refresh'
                },
                fields : {
                    price : {
                        validators : {
                            notEmpty : {
                                message : 'The price is required'
                            },
                            numeric : {
                                message : 'The price must be a number'
                            }
                        }
                    },
                    amount : {
                        validators : {
                            notEmpty : {
                                message : 'The amount is required'
                            },
                            numeric : {
                                message : 'The amount must be a number'
                            }
                        }
                    },
                    color : {
                        validators : {
                            notEmpty : {
                                message : 'The color is required'
                            }
                        }
                    },
                    size : {
                        validators : {
                            notEmpty : {
                                message : 'The size is required'
                            }
                        }
                    }
                }
            });
        }

    }
});
"use strict";


angular.module('SmartAdmin.Forms').directive('bootstrapProfileForm', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/_common/forms/directives/bootstrap-validation/bootstrap-profile-form.tpl.html',
        link: function(scope, form){
           form.bootstrapValidator({
                feedbackIcons : {
                    valid : 'glyphicon glyphicon-ok',
                    invalid : 'glyphicon glyphicon-remove',
                    validating : 'glyphicon glyphicon-refresh'
                },
                fields : {
                    email : {
                        validators : {
                            notEmpty : {
                                message : 'The email address is required'
                            },
                            emailAddress : {
                                message : 'The email address is not valid'
                            }
                        }
                    },
                    password : {
                        validators : {
                            notEmpty : {
                                message : 'The password is required'
                            }
                        }
                    }
                }
            });
        }

    }

});
"use strict";


angular.module('SmartAdmin.Forms').directive('bootstrapTogglingForm', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/_common/forms/directives/bootstrap-validation/bootstrap-toggling-form.tpl.html',
        link: function(scope, form){
            form.bootstrapValidator({
                feedbackIcons : {
                    valid : 'glyphicon glyphicon-ok',
                    invalid : 'glyphicon glyphicon-remove',
                    validating : 'glyphicon glyphicon-refresh'
                },
                fields : {
                    firstName : {
                        validators : {
                            notEmpty : {
                                message : 'The first name is required'
                            }
                        }
                    },
                    lastName : {
                        validators : {
                            notEmpty : {
                                message : 'The last name is required'
                            }
                        }
                    },
                    company : {
                        validators : {
                            notEmpty : {
                                message : 'The company name is required'
                            }
                        }
                    },
                    // These fields will be validated when being visible
                    job : {
                        validators : {
                            notEmpty : {
                                message : 'The job title is required'
                            }
                        }
                    },
                    department : {
                        validators : {
                            notEmpty : {
                                message : 'The department name is required'
                            }
                        }
                    },
                    mobilePhone : {
                        validators : {
                            notEmpty : {
                                message : 'The mobile phone number is required'
                            },
                            digits : {
                                message : 'The mobile phone number is not valid'
                            }
                        }
                    },
                    // These fields will be validated when being visible
                    homePhone : {
                        validators : {
                            digits : {
                                message : 'The home phone number is not valid'
                            }
                        }
                    },
                    officePhone : {
                        validators : {
                            digits : {
                                message : 'The office phone number is not valid'
                            }
                        }
                    }
                }
            }).find('button[data-toggle]').on('click', function() {
                var $target = $($(this).attr('data-toggle'));
                // Show or hide the additional fields
                // They will or will not be validated based on their visibilities
                $target.toggle();
                if (!$target.is(':visible')) {
                    // Enable the submit buttons in case additional fields are not valid
                    form.data('bootstrapValidator').disableSubmitButtons(false);
                }
            });
        }

    }



});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartCkEditor', function () {
    return {
        restrict: 'A',
        compile: function ( tElement) {
            tElement.removeAttr('smart-ck-editor data-smart-ck-editor');
            //CKEDITOR.basePath = 'bower_components/ckeditor/';

            CKEDITOR.replace( tElement.attr('name'), { height: '380px', startupFocus : true} );
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartDestroySummernote', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-destroy-summernote data-smart-destroy-summernote')
            tElement.on('click', function() {
                angular.element(tAttributes.smartDestroySummernote).destroy();
            })
        }
    }
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartEditSummernote', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-edit-summernote data-smart-edit-summernote');
            tElement.on('click', function(){
                angular.element(tAttributes.smartEditSummernote).summernote({
                    focus : true
                });  
            });
        }
    }
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartMarkdownEditor', function () {
    return {
        restrict: 'A',
        compile: function (element, attributes) {
            element.removeAttr('smart-markdown-editor data-smart-markdown-editor')

            var options = {
                autofocus:false,
                savable:true,
                fullscreen: {
                    enable: false
                }
            };

            if(attributes.height){
                options.height = parseInt(attributes.height);
            }

            element.markdown(options);
        }
    }
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartSummernoteEditor', function (lazyScript) {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-summernote-editor data-smart-summernote-editor');

            var options = {
                focus : true,
                tabsize : 2
            };

            if(tAttributes.height){
                options.height = tAttributes.height;
            }

            lazyScript.register('build/vendor.ui.js').then(function(){
                tElement.summernote(options);                
            });
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartJcrop', function ($q) {
    return {
        restrict: 'A',
        scope: {
            coords: '=',
            options: '=',
            selection: '='
        },
        link: function (scope, element, attributes) {
            var jcropApi, imageWidth, imageHeight, imageLoaded = $q.defer();

            var listeners = {
                onSelectHandlers: [],
                onChangeHandlers: [],
                onSelect: function (c) {
                    angular.forEach(listeners.onSelectHandlers, function (handler) {
                        handler.call(jcropApi, c)
                    })
                },
                onChange: function (c) {
                    angular.forEach(listeners.onChangeHandlers, function (handler) {
                        handler.call(jcropApi, c)
                    })
                }
            };

            if (attributes.coords) {
                var coordsUpdate = function (c) {
                    scope.$apply(function () {
                        scope.coords = c;
                    });
                };
                listeners.onSelectHandlers.push(coordsUpdate);
                listeners.onChangeHandlers.push(coordsUpdate);
            }

            var $previewPane = $(attributes.smartJcropPreview),
                $previewContainer = $previewPane.find('.preview-container'),
                $previewImg = $previewPane.find('img');

            if ($previewPane.length && $previewImg.length) {
                var previewUpdate = function (coords) {
                    if (parseInt(coords.w) > 0) {
                        var rx = $previewContainer.width() / coords.w;
                        var ry = $previewContainer.height() / coords.h;

                        $previewImg.css({
                            width: Math.round(rx * imageWidth) + 'px',
                            height: Math.round(ry * imageHeight) + 'px',
                            marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                            marginTop: '-' + Math.round(ry * coords.y) + 'px'
                        });
                    }
                };
                listeners.onSelectHandlers.push(previewUpdate);
                listeners.onChangeHandlers.push(previewUpdate);
            }


            var options = {
                onSelect: listeners.onSelect,
                onChange: listeners.onChange
            };

            if ($previewContainer.length) {
                options.aspectRatio = $previewContainer.width() / $previewContainer.height()
            }

            if (attributes.selection) {
                scope.$watch('selection', function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        var rectangle = newVal == 'release' ? [imageWidth / 2, imageHeight / 2, imageWidth / 2, imageHeight / 2] : newVal;

                        var callback = newVal == 'release' ? function () {
                            jcropApi.release();
                        } : angular.noop;

                        imageLoaded.promise.then(function () {
                            if (scope.options && scope.options.animate) {
                                jcropApi.animateTo(rectangle, callback);
                            } else {
                                jcropApi.setSelect(rectangle);
                            }
                        });
                    }
                });
            }

            if (attributes.options) {

                var optionNames = [
                    'bgOpacity', 'bgColor', 'bgFade', 'shade', 'outerImage',
                    'allowSelect', 'allowMove', 'allowResize',
                    'aspectRatio'
                ];

                angular.forEach(optionNames, function (name) {
                    if (scope.options[name])
                        options[name] = scope.options[name]

                    scope.$watch('options.' + name, function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            imageLoaded.promise.then(function () {
                                var update = {};
                                update[name] = newVal;
                                jcropApi.setOptions(update);
                            });
                        }
                    });

                });


                scope.$watch('options.disabled', function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        if (newVal) {
                            jcropApi.disable();
                        } else {
                            jcropApi.enable();
                        }
                    }
                });

                scope.$watch('options.destroyed', function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        if (newVal) {
                            jcropApi.destroy();
                        } else {
                            _init();
                        }
                    }
                });

                scope.$watch('options.src', function (newVal, oldVal) {
                    imageLoaded = $q.defer();
                    if (newVal != oldVal) {
                        jcropApi.setImage(scope.options.src, function () {
                            imageLoaded.resolve();
                        });
                    }
                });

                var updateSize = function(){
                    jcropApi.setOptions({
                        minSize: [scope.options.minSizeWidth, scope.options.minSizeHeight],
                        maxSize: [scope.options.maxSizeWidth, scope.options.maxSizeHeight]
                    });
                };

                scope.$watch('options.minSizeWidth', function (newVal, oldVal) {
                    if (newVal != oldVal) updateSize();
                });
                scope.$watch('options.minSizeHeight', function (newVal, oldVal) {
                    if (newVal != oldVal) updateSize();
                });
                scope.$watch('options.maxSizeWidth', function (newVal, oldVal) {
                    if (newVal != oldVal) updateSize();
                });
                scope.$watch('options.maxSizeHeight', function (newVal, oldVal) {
                    if (newVal != oldVal) updateSize();
                });
            }

            var _init = function () {
                element.Jcrop(options, function () {
                    jcropApi = this;
                    // Use the API to get the real image size
                    var bounds = this.getBounds();
                    imageWidth = bounds[0];
                    imageHeight = bounds[1];

                    if (attributes.selection && angular.isArray(scope.selection)) {
                        if (scope.options && scope.options.animate) {
                            jcropApi.animateTo(scope.selection);
                        } else {
                            jcropApi.setSelect(scope.selection);
                        }
                    }
                    imageLoaded.resolve();
                });
            };

            _init()


        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartCheckoutForm', function (formsCommon, lazyScript) {
    return {
        restrict: 'A',
        link: function (scope, form) {
           lazyScript.register('build/vendor.ui.js').then(function(){

               scope.countries = formsCommon.countries;

               form.validate(angular.extend({
                    // Rules for form validation
                    rules : {
                        fname : {
                            required : true
                        },
                        lname : {
                            required : true
                        },
                        email : {
                            required : true,
                            email : true
                        },
                        phone : {
                            required : true
                        },
                        country : {
                            required : true
                        },
                        city : {
                            required : true
                        },
                        code : {
                            required : true,
                            digits : true
                        },
                        address : {
                            required : true
                        },
                        name : {
                            required : true
                        },
                        card : {
                            required : true,
                            creditcard : true
                        },
                        cvv : {
                            required : true,
                            digits : true
                        },
                        month : {
                            required : true
                        },
                        year : {
                            required : true,
                            digits : true
                        }
                    },

                    // Messages for form validation
                    messages : {
                        fname : {
                            required : 'Please enter your first name'
                        },
                        lname : {
                            required : 'Please enter your last name'
                        },
                        email : {
                            required : 'Please enter your email address',
                            email : 'Please enter a VALID email address'
                        },
                        phone : {
                            required : 'Please enter your phone number'
                        },
                        country : {
                            required : 'Please select your country'
                        },
                        city : {
                            required : 'Please enter your city'
                        },
                        code : {
                            required : 'Please enter code',
                            digits : 'Digits only please'
                        },
                        address : {
                            required : 'Please enter your full address'
                        },
                        name : {
                            required : 'Please enter name on your card'
                        },
                        card : {
                            required : 'Please enter your card number'
                        },
                        cvv : {
                            required : 'Enter CVV2',
                            digits : 'Digits only'
                        },
                        month : {
                            required : 'Select month'
                        },
                        year : {
                            required : 'Enter year',
                            digits : 'Digits only please'
                        }
                    }
                }, formsCommon.validateOptions));
            });
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartCommentForm', function (formsCommon, lazyScript) {
    return {
        restrict: 'A',
        link: function (scope, form) {
            lazyScript.register('build/vendor.ui.js').then(function(){
                form.validate(angular.extend({
                    // Rules for form validation
                    rules : {
                        name : {
                            required : true
                        },
                        email : {
                            required : true,
                            email : true
                        },
                        url : {
                            url : true
                        },
                        comment : {
                            required : true
                        }
                    },

                    // Messages for form validation
                    messages : {
                        name : {
                            required : 'Enter your name',
                        },
                        email : {
                            required : 'Enter your email address',
                            email : 'Enter a VALID email'
                        },
                        url : {
                            email : 'Enter a VALID url'
                        },
                        comment : {
                            required : 'Please enter your comment'
                        }
                    },

                    // Ajax form submition
                    submitHandler : function() {
                        form.ajaxSubmit({
                            success : function() {
                                form.addClass('submited');
                            }
                        });
                    }

                }, formsCommon.validateOptions));
            });

        }
    }
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartContactsForm', function (formsCommon, lazyScript) {
    return {
        restrict: 'A',
        link: function (scope, form) {
            lazyScript.register('build/vendor.ui.js').then(function(){
                form.validate(angular.extend({
                    // Rules for form validation
                    rules : {
                        name : {
                            required : true
                        },
                        email : {
                            required : true,
                            email : true
                        },
                        message : {
                            required : true,
                            minlength : 10
                        }
                    },

                    // Messages for form validation
                    messages : {
                        name : {
                            required : 'Please enter your name'
                        },
                        email : {
                            required : 'Please enter your email address',
                            email : 'Please enter a VALID email address'
                        },
                        message : {
                            required : 'Please enter your message'
                        }
                    },

                    // Ajax form submition
                    submitHandler : function() {
                        form.ajaxSubmit({
                            success : function() {
                                form.addClass('submited');
                            }
                        });
                    }
                }, formsCommon.validateOptions));
            });
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartOrderForm', function (formsCommon, lazyScript) {
    return {
        restrict: 'E',
        link: function (scope, form) {
            lazyScript.register('build/vendor.ui.js').then(function(){
                form.validate(angular.extend({
                    // Rules for form validation
                    rules : {
                        name : {
                            required : true
                        },
                        email : {
                            required : true,
                            email : true
                        },
                        phone : {
                            required : true
                        },
                        interested : {
                            required : true
                        },
                        budget : {
                            required : true
                        }
                    },

                    // Messages for form validation
                    messages : {
                        name : {
                            required : 'Please enter your name'
                        },
                        email : {
                            required : 'Please enter your email address',
                            email : 'Please enter a VALID email address'
                        },
                        phone : {
                            required : 'Please enter your phone number'
                        },
                        interested : {
                            required : 'Please select interested service'
                        },
                        budget : {
                            required : 'Please select your budget'
                        }
                    },

                }, formsCommon.validateOptions));
            });

        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartRegistrationForm', function (formsCommon, lazyScript) {
    return {
        restrict: 'A',
        link: function (scope, form, attributes) {
            lazyScript.register('build/vendor.ui.js').then(function(){
                form.validate(angular.extend({

                    // Rules for form validation
                    rules: {
                        username: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true,
                            minlength: 3,
                            maxlength: 20
                        },
                        passwordConfirm: {
                            required: true,
                            minlength: 3,
                            maxlength: 20,
                            equalTo: '#password'
                        },
                        firstname: {
                            required: true
                        },
                        lastname: {
                            required: true
                        },
                        gender: {
                            required: true
                        },
                        terms: {
                            required: true
                        }
                    },

                    // Messages for form validation
                    messages: {
                        login: {
                            required: 'Please enter your login'
                        },
                        email: {
                            required: 'Please enter your email address',
                            email: 'Please enter a VALID email address'
                        },
                        password: {
                            required: 'Please enter your password'
                        },
                        passwordConfirm: {
                            required: 'Please enter your password one more time',
                            equalTo: 'Please enter the same password as above'
                        },
                        firstname: {
                            required: 'Please select your first name'
                        },
                        lastname: {
                            required: 'Please select your last name'
                        },
                        gender: {
                            required: 'Please select your gender'
                        },
                        terms: {
                            required: 'You must agree with Terms and Conditions'
                        }
                    }

                }, formsCommon.validateOptions));
            });
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartReviewForm', function (formsCommon, lazyScript) {
    return {
        restrict: 'E',
        link: function (scope, form) {
            lazyScript.register('build/vendor.ui.js').then(function(){

                form.validate(angular.extend({
                    // Rules for form validation
                    rules : {
                        name : {
                            required : true
                        },
                        email : {
                            required : true,
                            email : true
                        },
                        review : {
                            required : true,
                            minlength : 20
                        },
                        quality : {
                            required : true
                        },
                        reliability : {
                            required : true
                        },
                        overall : {
                            required : true
                        }
                    },

                    // Messages for form validation
                    messages : {
                        name : {
                            required : 'Please enter your name'
                        },
                        email : {
                            required : 'Please enter your email address',
                            email : '<i class="fa fa-warning"></i><strong>Please enter a VALID email addres</strong>'
                        },
                        review : {
                            required : 'Please enter your review'
                        },
                        quality : {
                            required : 'Please rate quality of the product'
                        },
                        reliability : {
                            required : 'Please rate reliability of the product'
                        },
                        overall : {
                            required : 'Please rate the product'
                        }
                    }

                }, formsCommon.validateOptions));
            });
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartClockpicker', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-clockpicker data-smart-clockpicker');

            var options = {
                placement: 'top',
                donetext: 'Done'
            }

            tElement.clockpicker(options);
        }
    }
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartColorpicker', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-colorpicker data-smart-colorpicker');


            var aOptions = _.pick(tAttributes, ['']);

            var options = _.extend(aOptions, {});

            tElement.colorpicker(options);
        }
    }
});
"use strict";

angular.module('SmartAdmin.Forms').directive('smartDatepicker', function () {
    return {
        restrict: 'A',
        scope: {
            options: '='
        },
        link: function (scope, element, attributes) {

            var onSelectCallbacks = [];
            if (attributes.minRestrict) {
                onSelectCallbacks.push(function (selectedDate) {
                    $(attributes.minRestrict).datepicker('option', 'minDate', selectedDate);
                });
            }
            if (attributes.maxRestrict) {
                onSelectCallbacks.push(function (selectedDate) {
                    $(attributes.maxRestrict).datepicker('option', 'maxDate', selectedDate);
                });
            }

            //Let others know about changes to the data field
            onSelectCallbacks.push(function (selectedDate) {
                //CVB - 07/14/2015 - Update the scope with the selected value
                element.triggerHandler("change");

                //CVB - 07/17/2015 - Update Bootstrap Validator
                var form = element.closest('form');

                if(typeof form.bootstrapValidator == 'function')
                    form.bootstrapValidator('revalidateField', element.attr('name'));
            });

            var options = _.extend({
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>',
                onSelect: function (selectedDate) {
                    angular.forEach(onSelectCallbacks, function (callback) {
                        try{
                            callback.call(this, selectedDate)
                        }catch(ex){}
                    })
                }
            }, scope.options || {});


            if (attributes.numberOfMonths) options.numberOfMonths = parseInt(attributes.numberOfMonths);

            if (attributes.dateFormat) options.dateFormat = attributes.dateFormat;

            if (attributes.defaultDate) options.defaultDate = attributes.defaultDate;

            if (attributes.changeMonth) options.changeMonth = attributes.changeMonth == "true";


            element.datepicker(options)
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartDuallistbox', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-duallistbox data-smart-duallistbox');


            var aOptions = _.pick(tAttributes, ['nonSelectedFilter']);

            var options = _.extend(aOptions, {
                nonSelectedListLabel: 'Non-selected',
                selectedListLabel: 'Selected',
                preserveSelectionOnMove: 'moved',
                moveOnSelect: false
            });

            tElement.bootstrapDualListbox(options);
        }
    }
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartIonslider', function (lazyScript) {
    return {
        restrict: 'A',
        compile: function (element, attributes) {
            element.removeAttr('smart-ionslider data-smart-ionslider');

        	lazyScript.register('build/vendor.ui.js').then(function(){
            	element.ionRangeSlider();
        	});
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartKnob', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-knob data-smart-knob');

            tElement.knob();
        }
    }
});
"use strict";

angular.module('SmartAdmin.Forms').directive('smartMaskedInput', function(lazyScript){
    return {
        restrict: 'A',
        compile: function(tElement, tAttributes){
            tElement.removeAttr('smart-masked-input data-smart-masked-input');

        	lazyScript.register('build/vendor.ui.js').then(function(){

	            var options = {};
	            if(tAttributes.maskPlaceholder) options.placeholder =  tAttributes.maskPlaceholder;
	            tElement.mask(tAttributes.smartMaskedInput, options);
        	})	            
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartNouislider', function ($parse, lazyScript) {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            lazyScript.register('build/vendor.ui.js').then(function(){
                tElement.removeAttr('smart-nouislider data-smart-nouislider');

                tElement.addClass('noUiSlider');

                var options = {
                    range: {
                        min: tAttributes.rangeMin ? parseInt(tAttributes.rangeMin) : 0,
                        max: tAttributes.rangeMax ? parseInt(tAttributes.rangeMax) : 1000
                    },
                    start: $parse(tAttributes.start)()
                };

                if (tAttributes.step) options.step =  parseInt(tAttributes.step);

                if(tAttributes.connect) options.connect = tAttributes.connect == 'true' ? true : tAttributes.connect;

                tElement.noUiSlider(options);

                if(tAttributes.update) tElement.on('slide', function(){
                    $(tAttributes.update).text(JSON.stringify(tElement.val()));
                });                
            })
        }
    }
});
'use strict'

angular.module('SmartAdmin.Forms').directive('smartSelect2', function (lazyScript) {
    return {
        restrict: 'A',
        compile: function (element, attributes) {
            element.hide().removeAttr('smart-select2 data-smart-select2');
        	lazyScript.register('build/vendor.ui.js').then(function(){
	            element.show().select2();
        	})
        }
    }
});
'use strict'

angular.module('SmartAdmin.Forms').directive('smartSpinner', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-spinner');

            var options = {};
            if(tAttributes.smartSpinner == 'deicimal'){
                options = {
                    step: 0.01,
                    numberFormat: "n"
                };
            }else if(tAttributes.smartSpinner == 'currency'){
                options = {
                    min: 5,
                    max: 2500,
                    step: 25,
                    start: 1000,
                    numberFormat: "C"
                };
            }

            tElement.spinner(options);
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartTagsinput', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-tagsinput data-smart-tagsinput');
            tElement.tagsinput();
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartTimepicker', function () {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {
            tElement.removeAttr('smart-timepicker data-smart-timepicker');
            tElement.timepicker();
        }
    }
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartUislider', function ($parse, lazyScript) {
    return {
        restrict: 'A',
        compile: function (tElement, tAttributes) {

            tElement.removeAttr('smart-uislider data-smart-uislider');

            lazyScript.register('build/vendor.ui.js').then(function(){
			    tElement.bootstrapSlider();

			    $(tElement.data('bootstrapSlider').sliderElem).prepend(tElement);      	
            })

        }
    }
});
"use strict";

angular.module('SmartAdmin.Forms').directive('smartXeditable', function($timeout, $log){

	function link (scope, element, attrs, ngModel) {

        var defaults = {
            // display: function(value, srcData) {
            //     ngModel.$setViewValue(value);
            //     // scope.$apply();
            // }
        };

        var inited = false;

        var initXeditable = function() {

            var options = scope.options || {};
    		var initOptions = angular.extend(defaults, options);

            // $log.log(initOptions);
            element.editable('destroy');
            element.editable(initOptions);
        }

        scope.$watch("options", function(newValue) {

            if(!newValue) {
                return false;
            }

            initXeditable();

            // $log.log("Options changed...");

        }, true);

    }

    return {
    	restrict: 'A',
    	require: "ngModel",
        scope: {
            options: "="
        },
    	link: link 

    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartDropzone', function () {
    return function (scope, element, attrs) {
        var config, dropzone;

        config = scope[attrs.smartDropzone];

        // create a Dropzone for the element with the given options
        dropzone = new Dropzone(element[0], config.options);

        // bind the given event handlers
        angular.forEach(config.eventHandlers, function (handler, event) {
            dropzone.on(event, handler);
        });
    };
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartValidateForm', function (formsCommon) {
    return {
        restrict: 'A',
        link: function (scope, form, attributes) {

            var validateOptions = {
                rules: {},
                messages: {},
                highlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function (error, element) {
                    if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                }
            };
            form.find('[data-smart-validate-input], [smart-validate-input]').each(function () {
                var $input = $(this), fieldName = $input.attr('name');

                validateOptions.rules[fieldName] = {};

                if ($input.data('required') != undefined) {
                    validateOptions.rules[fieldName].required = true;
                }
                if ($input.data('email') != undefined) {
                    validateOptions.rules[fieldName].email = true;
                }

                if ($input.data('maxlength') != undefined) {
                    validateOptions.rules[fieldName].maxlength = $input.data('maxlength');
                }

                if ($input.data('minlength') != undefined) {
                    validateOptions.rules[fieldName].minlength = $input.data('minlength');
                }

                if($input.data('message')){
                    validateOptions.messages[fieldName] = $input.data('message');
                } else {
                    angular.forEach($input.data(), function(value, key){
                        if(key.search(/message/)== 0){
                            if(!validateOptions.messages[fieldName])
                                validateOptions.messages[fieldName] = {};

                            var messageKey = key.toLowerCase().replace(/^message/,'')
                            validateOptions.messages[fieldName][messageKey] = value;
                        }
                    });
                }
            });


            form.validate(validateOptions);

        }
    }
});

'use strict';

angular.module('SmartAdmin.Forms').directive('smartFueluxWizard', function () {
    return {
        restrict: 'A',
        scope: {
            smartWizardCallback: '&'
        },
        link: function (scope, element, attributes) {

            var wizard = element.wizard();

            var $form = element.find('form');

            wizard.on('actionclicked.fu.wizard', function(e, data){
                if ($form.data('validator')) {
                    if (!$form.valid()) {
                        $form.data('validator').focusInvalid();
                        e.preventDefault();
                    }
                }
            });

            wizard.on('finished.fu.wizard', function (e, data) {
                var formData = {};
                _.each($form.serializeArray(), function(field){
                    formData[field.name] = field.value
                });
                if(typeof scope.smartWizardCallback() === 'function'){
                    scope.smartWizardCallback()(formData)
                }
            });
        }
    }
});
'use strict';

angular.module('SmartAdmin.Forms').directive('smartWizard', function () {
    return {
        restrict: 'A',
        scope: {
            'smartWizardCallback': '&'
        },
        link: function (scope, element, attributes) {

            var stepsCount = $('[data-smart-wizard-tab]').length;

            var currentStep = 1;

            var validSteps = [];

            var $form = element.closest('form');

            var $prev = $('[data-smart-wizard-prev]', element);

            var $next = $('[data-smart-wizard-next]', element);

            function setStep(step) {
                currentStep = step;
                $('[data-smart-wizard-pane=' + step + ']', element).addClass('active').siblings('[data-smart-wizard-pane]').removeClass('active');
                $('[data-smart-wizard-tab=' + step + ']', element).addClass('active').siblings('[data-smart-wizard-tab]').removeClass('active');

                $prev.toggleClass('disabled', step == 1)
            }


            element.on('click', '[data-smart-wizard-tab]', function (e) {
                setStep(parseInt($(this).data('smartWizardTab')));
                e.preventDefault();
            });

            $next.on('click', function (e) {
                if ($form.data('validator')) {
                    if (!$form.valid()) {
                        validSteps = _.without(validSteps, currentStep);
                        $form.data('validator').focusInvalid();
                        return false;
                    } else {
                        validSteps = _.without(validSteps, currentStep);
                        validSteps.push(currentStep);
                        element.find('[data-smart-wizard-tab=' + currentStep + ']')
                            .addClass('complete')
                            .find('.step')
                            .html('<i class="fa fa-check"></i>');
                    }
                }
                if (currentStep < stepsCount) {
                    setStep(currentStep + 1);
                } else {
                    if (validSteps.length < stepsCount) {
                        var steps = _.range(1, stepsCount + 1)

                        _(steps).forEach(function (num) {
                            if (validSteps.indexOf(num) == -1) {
                                console.log(num);
                                setStep(num);
                                return false;
                            }
                        })
                    } else {
                        var data = {};
                        _.each($form.serializeArray(), function(field){
                            data[field.name] = field.value
                        });
                        if(typeof  scope.smartWizardCallback() === 'function'){
                            scope.smartWizardCallback()(data)
                        }
                    }
                }

                e.preventDefault();
            });

            $prev.on('click', function (e) {
                if (!$prev.hasClass('disabled') && currentStep > 0) {
                    setStep(currentStep - 1);
                }
                e.preventDefault();
            });


            setStep(currentStep);

        }
    }
});
'use strict';

angular.module('SmartAdmin.Layout').directive('demoStates', function ($rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'app/_common/layout/directives/demo/demo-states.tpl.html',
        scope: true,
        link: function (scope, element, attributes) {
            element.parent().css({
                position: 'relative'
            });

            element.on('click', '#demo-setting', function () {
                element.toggleClass('activate')
            })
        },
        controller: function ($scope) {
            var $root = $('body');

            $scope.$watch('fixedHeader', function (fixedHeader) {
                localStorage.setItem('sm-fixed-header', fixedHeader);
                $root.toggleClass('fixed-header', fixedHeader);
                if (fixedHeader == false) {
                    $scope.fixedRibbon = false;
                    $scope.fixedNavigation = false;
                }
            });


            $scope.$watch('fixedNavigation', function (fixedNavigation) {
                localStorage.setItem('sm-fixed-navigation', fixedNavigation);
                $root.toggleClass('fixed-navigation', fixedNavigation);
                if (fixedNavigation) {
                    $scope.insideContainer = false;
                    $scope.fixedHeader = true;
                } else {
                    $scope.fixedRibbon = false;
                }
            });


            $scope.$watch('fixedRibbon', function (fixedRibbon) {
                localStorage.setItem('sm-fixed-ribbon', fixedRibbon);
                $root.toggleClass('fixed-ribbon', fixedRibbon);
                if (fixedRibbon) {
                    $scope.fixedHeader = true;
                    $scope.fixedNavigation = true;
                    $scope.insideContainer = false;
                }
            });

            $scope.$watch('fixedPageFooter', function (fixedPageFooter) {
                localStorage.setItem('sm-fixed-page-footer', fixedPageFooter);
                $root.toggleClass('fixed-page-footer', fixedPageFooter);
            });

            $scope.$watch('insideContainer', function (insideContainer) {
                localStorage.setItem('sm-inside-container', insideContainer);
                $root.toggleClass('container', insideContainer);
                if (insideContainer) {
                    $scope.fixedRibbon = false;
                    $scope.fixedNavigation = false;
                }
            });

            $scope.$watch('rtl', function (rtl) {
                localStorage.setItem('sm-rtl', rtl);
                $root.toggleClass('smart-rtl', rtl);
            });

            $scope.$watch('menuOnTop', function (menuOnTop) {
                $rootScope.$broadcast('$smartLayoutMenuOnTop', menuOnTop);
                localStorage.setItem('sm-menu-on-top', menuOnTop);
                $root.toggleClass('menu-on-top', menuOnTop);

                if(menuOnTop)$root.removeClass('minified');
            });

            $scope.$watch('colorblindFriendly', function (colorblindFriendly) {
                localStorage.setItem('sm-colorblind-friendly', colorblindFriendly);
                $root.toggleClass('colorblind-friendly', colorblindFriendly);
            });


            $scope.fixedHeader = localStorage.getItem('sm-fixed-header') == 'true';
            $scope.fixedNavigation = localStorage.getItem('sm-fixed-navigation') == 'true';
            $scope.fixedRibbon = localStorage.getItem('sm-fixed-ribbon') == 'true';
            $scope.fixedPageFooter = localStorage.getItem('sm-fixed-page-footer') == 'true';
            $scope.insideContainer = localStorage.getItem('sm-inside-container') == 'true';
            $scope.rtl = localStorage.getItem('sm-rtl') == 'true';
            $scope.menuOnTop = localStorage.getItem('sm-menu-on-top') == 'true' || $root.hasClass('menu-on-top');
            $scope.colorblindFriendly = localStorage.getItem('sm-colorblind-friendly') == 'true';


            $scope.skins = appConfig.skins;


            $scope.smartSkin = localStorage.getItem('sm-skin') ? localStorage.getItem('sm-skin') : appConfig.smartSkin;

            $scope.setSkin = function (skin) {
                $scope.smartSkin = skin.name;
                $root.removeClass(_.pluck($scope.skins, 'name').join(' '));
                $root.addClass(skin.name);
                localStorage.setItem('sm-skin', skin.name);
                $("#logo img").attr('src', skin.logo);
            };


            if($scope.smartSkin != "smart-style-0"){
                $scope.setSkin(_.find($scope.skins, {name: $scope.smartSkin}))
            }


            $scope.factoryReset = function () {
                $.SmartMessageBox({
                    title: "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
                    content: "Would you like to RESET all your saved widgets and clear LocalStorage?1",
                    buttons: '[No][Yes]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "Yes" && localStorage) {
                        localStorage.clear();
                        location.reload()
                    }
                });
            }
        }
    }
});
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
(function(){
    "use strict";

    angular.module('SmartAdmin.Layout').directive('smartMenuItems', function ($http, $rootScope, $compile) {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            

            function createItem(item, parent, level){
                var li = $('<li />' ,{'ui-sref-active': "active"})
                var a = $('<a />');
                var i = $('<i />');

                li.append(a);

                if(item.sref)
                    a.attr('ui-sref', item.sref);
                if(item.href)
                    a.attr('href', item.href);
                if(item.icon){
                    i.attr('class', 'fa fa-lg fa-fw fa-'+item.icon);
                    a.append(i);
                }
                if(item.title){
                    a.attr('title', item.title);
                    if(level == 1){ 
                        a.append(' <span class="menu-item-parent">' + item.title + '</span>');
                    } else {
                        a.append(' ' + item.title);

                    }
                }

                if(item.items){
                    var ul = $('<ul />');
                    li.append(ul);
                    li.attr('data-menu-collapse', '');
                    _.forEach(item.items, function(child) {
                        createItem(child, ul, level+1);
                    })
                } 

                parent.append(li); 
            }


            $http.get(attrs.smartMenuItems).then(function(res){
                var ul = $('<ul />', {
                    'smart-menu': ''
                })
                _.forEach(res.data.items, function(item) {
                    createItem(item, ul, 1);
                })
                
                var $scope = $rootScope.$new();
                var html = $('<div>').append(ul).html(); 
                var linkingFunction = $compile(html);
                
                var _element = linkingFunction($scope);

                element.replaceWith(_element);                
            })
        }
    }
});
})();
/**
 * Jarvis Widget Directive
 *
 *    colorbutton="false"
 *    editbutton="false"
      togglebutton="false"
       deletebutton="false"
        fullscreenbutton="false"
        custombutton="false"
        collapsed="true"
          sortable="false"
 *
 *
 */
"use strict";

angular.module('SmartAdmin.Layout').directive('jarvisWidget', function($rootScope){
    return {
        restrict: "A",
        compile: function(element, attributes){
            if(element.data('widget-color'))
                element.addClass('jarviswidget-color-' + element.data('widget-color'));


            element.find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');

            element.addClass('jarviswidget');
            $rootScope.$emit('jarvisWidgetAdded', element )

        }
    }
});
 "use strict";
 
 angular.module('SmartAdmin.Layout').directive('widgetGrid', function ($rootScope, $compile, $q, $state, $timeout) {

    var jarvisWidgetsDefaults = {
        grid: 'article',
        widgets: '.jarviswidget',
        localStorage: true,
        deleteSettingsKey: '#deletesettingskey-options',
        settingsKeyLabel: 'Reset settings?',
        deletePositionKey: '#deletepositionkey-options',
        positionKeyLabel: 'Reset position?',
        sortable: true,
        buttonsHidden: false,
        // toggle button
        toggleButton: true,
        toggleClass: 'fa fa-minus | fa fa-plus',
        toggleSpeed: 200,
        onToggle: function () {
        },
        // delete btn
        deleteButton: true,
        deleteMsg: 'Warning: This action cannot be undone!',
        deleteClass: 'fa fa-times',
        deleteSpeed: 200,
        onDelete: function () {
        },
        // edit btn
        editButton: true,
        editPlaceholder: '.jarviswidget-editbox',
        editClass: 'fa fa-cog | fa fa-save',
        editSpeed: 200,
        onEdit: function () {
        },
        // color button
        colorButton: true,
        // full screen
        fullscreenButton: true,
        fullscreenClass: 'fa fa-expand | fa fa-compress',
        fullscreenDiff: 3,
        onFullscreen: function () {
        },
        // custom btn
        customButton: false,
        customClass: 'folder-10 | next-10',
        customStart: function () {
            alert('Hello you, this is a custom button...');
        },
        customEnd: function () {
            alert('bye, till next time...');
        },
        // order
        buttonOrder: '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
        opacity: 1.0,
        dragHandle: '> header',
        placeholderClass: 'jarviswidget-placeholder',
        indicator: true,
        indicatorTime: 600,
        ajax: true,
        timestampPlaceholder: '.jarviswidget-timestamp',
        timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
        refreshButton: true,
        refreshButtonClass: 'fa fa-refresh',
        labelError: 'Sorry but there was a error:',
        labelUpdated: 'Last Update:',
        labelRefresh: 'Refresh',
        labelDelete: 'Delete widget:',
        afterLoad: function () {
        },
        rtl: false, // best not to toggle this!
        onChange: function () {

        },
        onSave: function () {

        },
        ajaxnav: true

    }

    var dispatchedWidgetIds = [];
    var setupWaiting = false;

    var debug = 1;

    var setupWidgets = function (element, widgetIds) {

        if (!setupWaiting) {

            if(_.intersection(widgetIds, dispatchedWidgetIds).length != widgetIds.length){

                dispatchedWidgetIds = _.union(widgetIds, dispatchedWidgetIds);

//                    console.log('setupWidgets', debug++);

                element.data('jarvisWidgets') && element.data('jarvisWidgets').destroy();
                element.jarvisWidgets(jarvisWidgetsDefaults);
                initDropdowns(widgetIds);
            }

        } else {
            if (!setupWaiting) {
                setupWaiting = true;
                $timeout(function () {
                    setupWaiting = false;
                    setupWidgets(element, widgetIds)
                }, 200);
            }
        }

    };

    var destroyWidgets = function(element, widgetIds){
        element.data('jarvisWidgets') && element.data('jarvisWidgets').destroy();
        dispatchedWidgetIds = _.xor(dispatchedWidgetIds, widgetIds);
    };

    var initDropdowns = function (widgetIds) {
        angular.forEach(widgetIds, function (wid) {
            $('#' + wid + ' [data-toggle="dropdown"]').each(function () {
                var $parent = $(this).parent();
                // $(this).removeAttr('data-toggle');
                if (!$parent.attr('dropdown')) {
                    $(this).removeAttr('href');
                    $parent.attr('dropdown', '');
                    var compiled = $compile($parent)($parent.scope())
                    $parent.replaceWith(compiled);
                }
            })
        });
    };

    var jarvisWidgetAddedOff,
        $viewContentLoadedOff,
        $stateChangeStartOff;

    return {
        restrict: 'A',
        compile: function(element){

            element.removeAttr('widget-grid data-widget-grid');

            var widgetIds = [];

            $viewContentLoadedOff = $rootScope.$on('$viewContentLoaded', function (event, data) {
                $timeout(function () {
                    setupWidgets(element, widgetIds)
                }, 100);
            });


            $stateChangeStartOff = $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    jarvisWidgetAddedOff();
                    $viewContentLoadedOff();
                    $stateChangeStartOff();
                    destroyWidgets(element, widgetIds)
                });

            jarvisWidgetAddedOff = $rootScope.$on('jarvisWidgetAdded', function (event, widget) {
                if (widgetIds.indexOf(widget.attr('id')) == -1) {
                    widgetIds.push(widget.attr('id'));
                    $timeout(function () {
                        setupWidgets(element, widgetIds)
                    }, 100);
                }
//                    console.log('jarvisWidgetAdded', widget.attr('id'));
            });

        }
    }
});

'use strict';

angular.module('app.frmUtils', ['angular-jwt']);
angular.module('app.frm', ['ui.router', 'ui.bootstrap', 'angular-jwt', 'app.frmUtils']);

angular.module('app.frm').config(function ($stateProvider) {
    $stateProvider
        .state('app.frm', {
            abstract: true,
            data: {
                title: 'ERP',
            },
        })
        .state('app.frm.utama', {
            url: '/frm',
            data: {
                title: 'Halaman Utama',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/utama.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/utama.html',
                },
            },
        });
});
'use strict';

angular.module('app.frm').config(function ($stateProvider) {
    $stateProvider
        .state('app.frm.sales', {
            url: '/frm/sales',
            data: {
                title: 'Sales',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/_WebPage.html',
                },
            },
        })

        .state('app.frm.salesSalesOrders', {
            url: '/frm/sales/SalesOrders',
            data: {
                title: 'Sales Orders',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesOrders.html',
                },
            },
        })

        ;
});

'use strict';

angular.module('app.frmUtils').factory('FRM_Signature', [
    '$location',
    function ($location) {
        var data = {};

        data.Signature = '2026.01.22_01.30 Framework - PAS';
        //data.Signature = '2026.01.21_19.26 Framework - TI';
        //data.Signature = '2026.01.21_19.27 Framework - TIP';
        //data.Signature = '2026.01.21_19.28 Framework - JLD';

        return data;
    },
]);

'use strict';

angular.module('app.frmUtils').factory('Global_Data_ERP', [
    '$location',
    '$state',
    'FRM_Signature',
    'Utility_ERP',
    'OurStorage',
    'AuthenticationService',
    function ($location, $state, FRM_Signature, Utility_ERP, OurStorage, AuthenticationService) {
        var global_Functions = {};

        global_Functions.Generate = function (parameter_rootScope) {
            parameter_rootScope.FRM_Signature = FRM_Signature.Signature;
            parameter_rootScope.GlobalMessage = '';

            // sebagai tempat untuk "Passsing Data" antara PopUp dan "Parent Caller"
            parameter_rootScope.PopUp_DataSelection = [];
            parameter_rootScope.PopUp_DataSelectionPR = [];
            parameter_rootScope.PopUp_DataSelectionBrowseCharges = [];
            parameter_rootScope.PopUp_DataSelectionBrowseRequests = [];

            try {
                let appSetting = OurStorage.getItem('appSettings');
                parameter_rootScope.appSettings = JSON.parse(appSetting) || {};

                let x = OurStorage.getItem();
                parameter_rootScope.ERP = JSON.parse(x) || {};

                if (!parameter_rootScope.ERP.currentUser) parameter_rootScope.ERP.currentUser = '';
                if (!parameter_rootScope.ERP.userERP) parameter_rootScope.ERP.userERP = { Name: '' };
            } catch (e) { }

            parameter_rootScope.ValidString = function (str) {
                return Utility_ERP.ValidString(str);
            };

            parameter_rootScope.Not_ValidString = function (str) {
                return Utility_ERP.Not_ValidString(str);
            };

            parameter_rootScope.EmployeeSiteAccess = async function (parameter_scope) {
                await Utility_ERP.EmployeeSiteAccess(parameter_scope);
            };

            parameter_rootScope.EmployeeLocationAccess = async function (parameter_scope, selectedBranch = null) {
                await Utility_ERP.EmployeeLocationAccess(parameter_rootScope, parameter_scope, selectedBranch);
            };

            parameter_rootScope.EmployeeWarehouseAccess = async function (parameter_scope, selectedWarehouse = null) {
                await Utility_ERP.EmployeeWarehouseAccess(parameter_rootScope, parameter_scope, selectedWarehouse);
            };

            parameter_rootScope.getData_Personel = async function (val) {
                return await Utility_ERP.Personel_Dropdown(val);
            };

            parameter_rootScope.getData_User = async function (val) {
                return await Utility_ERP.Dropdown_User(val);
            };

            parameter_rootScope.getData_Customer = async function (val, parameter_scope) {
                return await Utility_ERP.Dropdown_Customer2(val, parameter_scope);
            };

            parameter_rootScope.getData_Supplier = async function (val) {
                return await Utility_ERP.Dropdown_Supplier(val);
            };

            parameter_rootScope.getData_InventoryItem = async function (val) {
                return await Utility_ERP.Dropdown_InventoryItem(val);
            };

            parameter_rootScope.getData_InventoryItemCOA = async function (val) {
                return await ChartofAccount_Service.Dropdown_InventoryItem(val);
            };

            parameter_rootScope.Proces_CheckBox_Kiri = function (parameter_scope) {
                return Utility_ERP.Proces_CheckBox_Kiri(parameter_scope);
            };

            parameter_rootScope.console_log = function (str) {
                return console.log(str);
            };

            parameter_rootScope.isNullish = function (input) {
                return (
                    input === null ||
                    input === undefined ||
                    input === '' ||
                    input === 'null' ||
                    input === 'undefined' ||
                    input === 'NaN'
                );
            }

            parameter_rootScope.Not_Null = function (input) {
                return !parameter_rootScope.isNullish(input);
            }

            parameter_rootScope.SanitizeNumeric = function (input) {
                if (parameter_rootScope.isNullish(input)) {
                    return 0;
                }

                const num = Number(input);
                return isNaN(num) ? 0 : num;
            };

            parameter_rootScope.SanitizeString = function (input) {
                if (parameter_rootScope.isNullish(input)) {
                    return '';
                }

                return String(input);
            };

            parameter_rootScope.SanitizeBoolean = function (input) {
                // Handle nullish values
                if (parameter_rootScope.isNullish(input)) {
                    return false;
                }

                // Handle string representations of boolean values
                if (typeof input === 'string') {
                    const lowerInput = input.toLowerCase().trim();
                    if (lowerInput === 'true' || lowerInput === '1') {
                        return true;
                    }
                    if (lowerInput === 'false' || lowerInput === '0') {
                        return false;
                    }
                }

                // Handle numbers (0 = false, anything else = true)
                if (typeof input === 'number') {
                    return input !== 0;
                }

                // For everything else, use JavaScript's built-in boolean conversion
                return Boolean(input);
            };

            parameter_rootScope.SanitizeDate = function (input) {
                if (parameter_rootScope.isNullish(input)) {
                    return '';
                }

                // If input is already a valid moment object, format it
                if (moment.isMoment(input)) {
                    return input.format('YYYY-MM-DD');
                }

                // Try to parse the input as a date
                const momentDate = moment(input);

                // If it's a valid date, return formatted string
                if (momentDate.isValid()) {
                    return momentDate.format('YYYY-MM-DD');
                }

                // If parsing failed, return empty string
                return '';
            };

            parameter_rootScope.SanitizeInput = function (data, header_Template, detail_Template = null, itemsName = 'xyz') {
                function sanitizeObjectWithTypes(obj, template) {
                    if (!obj || !template) return;

                    Object.keys(template).forEach(function (fieldName) {
                        if (obj.hasOwnProperty(fieldName)) {
                            const templateValue = template[fieldName];

                            // Infer type from template default value
                            if (typeof templateValue === 'number') {
                                obj[fieldName] = parameter_rootScope.SanitizeNumeric(obj[fieldName]);
                            } else if (typeof templateValue === 'string') {
                                obj[fieldName] = parameter_rootScope.SanitizeString(obj[fieldName]);
                            } else if (typeof templateValue === 'boolean') {
                                obj[fieldName] = parameter_rootScope.SanitizeBoolean(obj[fieldName]);
                            }
                            // Other types are left unchanged
                        }
                    });
                }

                if (data.dataInput && header_Template) {
                    sanitizeObjectWithTypes(data.dataInput, header_Template);
                }

                if (data.details && data.details[itemsName] && detail_Template) {
                    data.details[itemsName].forEach(function (item) {
                        sanitizeObjectWithTypes(item, detail_Template);
                    });
                }
            }

            parameter_rootScope.getDateOnly = function (str) {
                let result = '';
                try {
                    result = moment(str, 'YYYY-MM-DD').format('DD/MM/YYYY');
                } catch (error) {
                    result = str;
                }

                return result;
            };

            parameter_rootScope.setCriteriaList = function (request, filters) {
                Utility_ERP.setCriteriaList(request, filters);
            };

            parameter_rootScope.functionDelay = function (ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            };

            parameter_rootScope.Timeout_Save = () => {
                return 500;
            };

            parameter_rootScope.SaveFilterState = function (key, scope) {
                OurStorage.setItem(`_Filter_${key}`, JSON.stringify(scope.filters));

                // Special case
                try {
                    OurStorage.setItem(`_Filter_${key}_searchKeyword`, JSON.stringify(scope['dt']['searchKeyword']));
                } catch (err) { }
            };

            /*
                Filter mempunyai pola seperti berikut:
                    $scope.filters = {
                        KeyFilter: { PropertyName: 'somethingName', Operator: '=', Value: somethingValue },
                        ...
                    };

                KeyFilter:
                    o pada akhir, ada "nilai khusus":
                        # "_dd": DropDown List
                        # "_date": bertipe date
                    o nilai date pada akhir, mempunyai tujuan khusus
                        # misalnya 

                        $scope.filters = {
                            NamaKey_date: { PropertyName: 'abc', Operator: '=', Value: 'xyz' },
                            ...
                        };

                        # otomatis akan diberikan nilai ke field $scope.selectedNamaKey

                Case study:
                    o Text
                        # simple Text biasa
                        # cara pakai:
                            o ng-model="filters.NamaFilter.Value"

                    o Text
                        # Text dengan tujuan pencarian "mirip"
                        # Operator: like, nilai menggunakan %, contoh value: '%xyz%'}
                        # cara pakai:
                            o pakai 2 varialbel
                                # selectedNama
                                # filters.NamaFilter
                            o pada View
                                # ng-model="selectedNama"
                            o pada Controller, lakukan secara Manual:
                                # assignment antara selectedNama dengan filters.NamaFilter
                                # handle karakter %
                                    o baik saat menambahkan karakter %
                                    o maupun saat menghilangkan karakter %

                    o CheckBox
                        # nilai Boolean
                        # ada 2, yaitu:
                            1. Checkbox yang langsung sebagai Filter
                                # cara pakai:
                                    o sama seperti Text - simple Text biasa

                            2. Checkbox ditujukan sebagai "Alias"
                                # cara pakai:
                                    o pakai 2 varialbel
                                        # selectedNama
                                        # filters.NamaFilter
                                    o pada View
                                        # ng-model="selectedNama"

                    o Date
                        # cara pakai:
                            o pakai 2 varialbel
                                # selectedNama
                                # filters.Nama_date {pakai akhiran "_date"}
                            o pada View
                                # ng-model="selectedNama"
                            o pada Controller, lakukan secara Manual:
                                # pada showData()
                                # $scope.filters.Nama_date.Value = $rootScope.Date_to_DB($scope.selectedNama);

                    o Parameter Url:
                        # kombinasi dengan Parameter dari Url
                        # cara pakai:
                            o panggil dulu function $rootScope.LoadFilterState()
                            o function Override_some_Filters()
                                # buat baru
                                # panggil setelah pemanggilan LoadFilterState();

                    o Bukan bagian Filter,
                      tetapi nilai disimpan pada Filter
            */
            parameter_rootScope.LoadFilterState = function (key, scope) {
                scope.LoadFilterState_ = false;

                let filters = OurStorage.getItem(`_Filter_${key}`);

                if (filters) {
                    scope.LoadFilterState_ = true;

                    scope.filters = { ...scope.filters, ...JSON.parse(filters) };

                    Object.entries(scope.filters).map((filterItem) => {
                        var key = filterItem[0];
                        var val = filterItem[1].Value;

                        if (key.endsWith('_dd')) {
                            key = key.replace('_dd', '');
                            key = 'selected' + key;

                            // reset if necessary
                            if (val && typeof val === 'string' && val.indexOf('(') >= 0) val = '';

                            scope[key] = val;
                        }
                        else if (key.endsWith('_date')) {
                            key = key.replace('_date', '');
                            key = 'selected' + key;

                            scope[key] = parameter_rootScope.Date_to_UI(val);
                        }
                    });
                }

                // Special case
                try {
                    let searchKeyword = OurStorage.getItem(`_Filter_${key}_searchKeyword`);

                    if (searchKeyword) {
                        scope['searchKeyword'] = JSON.parse(searchKeyword);
                    }
                } catch (err) { }
            };

            parameter_rootScope.hilangkanSpasi = function (str) {
                let result = str;

                try {
                    result = str.trim();
                } catch (e) { }

                return result;
            };

            parameter_rootScope.logout = function () {
                AuthenticationService.ClearSessions();
                $location.path('/login');
            };

            parameter_rootScope.CodeNameSeparator = function (code, name, separator = ' - ') {
                if (code && name) return code + separator + name;

                if (code) return code;

                return '';
            };

            parameter_rootScope.Date_to_UI = function (val) {
                let result = '';

                if (Utility_ERP.ValidString(val)) result = moment(new Date(val)).format('DD/MM/YYYY');
                return result;
            };

            parameter_rootScope.Date_to_DB = function (val, defaultValue = null) {
                let result = defaultValue;

                if (val) result = moment(val, 'DD/MM/YYYY').format('YYYY-MM-DD');
                return result;
            };

            parameter_rootScope.getParamValue = function (obj, name, defaultValue = null) {
                let result = defaultValue;

                if (!obj.hasOwnProperty(name)) return result;

                result = decodeURIComponent(obj[name]);

                if (result === undefined || result === 'undefined') result = defaultValue;

                return result;
            };

            //TODO: Access Controll
            parameter_rootScope.CheckAccess = function (moduleName, accessType) {
                // accessType: 'Read', 'Create', 'Update', 'Delete', 'Print', 'Approve'
                if (parameter_rootScope.ERP.currentUser === '') return false;
                if (parameter_rootScope.ERP.currentUser.IsAdmin) return true;
                if (!parameter_rootScope.ERP.currentUser.Roles) return false;
            };

            parameter_rootScope.Simple_Encode = function (str) {
                let result = str;

                if (parameter_rootScope.isNullish(str)) return result;

                // special case: karena di passing via URL, maka '/' di ganti '---'
                result = str.replaceAll('/', '---'); // decodeURIComponent(str);

                return result;
            };

            parameter_rootScope.Simple_Decode = function (str) {
                let result = str;

                if (parameter_rootScope.isNullish(str)) return result;

                // special case: karena di passing via URL, maka '/' di ganti '---'
                result = str.replaceAll('---', '/');

                return result;
            };

            parameter_rootScope.debugScope = function (scope) {
                let scopeData = {};

                for (var key in scope) {
                    if (key.charAt(0) !== '$' && typeof scope[key] !== 'function') {
                        scopeData[key] = scope[key];
                    }
                }

                return scopeData;
            };

            parameter_rootScope.SetDefaultDropdownList = function (arr, code, model, modelField) {
                if (arr.length > 0) {
                    model[modelField] = arr[0][code];
                }
            };

            parameter_rootScope.SanitizeStringArr = function (arr, fieldName) {
                arr.forEach(function (item) {
                    if (item.hasOwnProperty(fieldName)) {
                        item[fieldName] = parameter_rootScope.SanitizeString(item[fieldName]);
                    }
                });
            };

            parameter_rootScope.SanitizeStringAB = function (A, B) {
                let result = A;

                if (parameter_rootScope.isNullish(A)) {
                    result = B;
                }

                return result;
            };

            parameter_rootScope.SanitizeInput_ItemDate = function (arr, fieldName) {
                arr.forEach(function (item) {
                    if (item.hasOwnProperty(fieldName)) {
                        item[fieldName] = parameter_rootScope.Date_to_DB(item[fieldName]);
                    }
                });
            };

            parameter_rootScope.allData_toJson = false;
            parameter_rootScope.allData_toJson2 = {};

            parameter_rootScope.Toggle_debugScope = function () {
                var scope = angular.element(event.target).scope();
                parameter_rootScope.allData_toJson = !parameter_rootScope.allData_toJson;

                parameter_rootScope.allData_toJson2 = {};
                if (!parameter_rootScope.allData_toJson) return;

                parameter_rootScope.allData_toJson2 = parameter_rootScope.debugScope(scope);
            };

            window.ERP_BackEnd_Version = async function () {
                return await Utility_ERP.BackEnd_Version();
            };

            parameter_rootScope.LandingPage_for_User = function () {
                return Utility_ERP.LandingPage_for_User();
            };

            parameter_rootScope.sdr_GoBack = function (toState = '') {
                var currentState = $state.current.name;
                var pageState = currentState.replace('Form', '');

                if ($state.get(pageState)) {
                    $state.go(pageState);
                } else {
                    $state.go(toState);
                }
            };

            parameter_rootScope.sdr_GoToForm = function (toParams = {}) {
                var currentState = $state.current.name;
                var formState = currentState + 'Form';
                $state.go(formState, toParams);
            };
        };

        return global_Functions;
    },
]);

'use strict';

angular.module('app.frmUtils').factory('OurStorage', [
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

'use strict';

angular.module('app.frmUtils').factory('Utility_ERP', [
    'OurStorage',
    'BackEndService',
    'Employee_Service',
    function (OurStorage, BackEndService, Employee_Service) {
        var utility = {};

        utility.getData_Currency = async function () {
            var request = {
                modelName: 'XSmCurrency',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_PaymentTerm = async function () {
            var request = {
                modelName: 'XSmPaymentTerm',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Description asc, OrderID asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_PaymentMethod = async function () {
            var request = {
                modelName: 'XSmPaymentMethod',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_AddressType = async function () {
            var request = {
                modelName: 'XSmAddressType',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['OrderID asc, Description asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_DeliveryMethod = async function () {
            var request = {
                modelName: 'XSmDeliveryMethod',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['OrderID asc, Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_DueDateTerm = async function () {
            var request = {
                modelName: 'XSmDueDateTerm',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_DocumentStatus = async function (documentType) {
            var request = {
                modelName: 'XSmDocumentStatus',
                fieldNames: ['StatusId', 'DisplayName', 'IsArchive', 'SortID', 'ShowInForm'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'DocumentType',
                        Operator: '=',
                        Value: documentType,
                    },
                    {
                        PropertyName: 'ShowInFilterList',
                        Operator: '=',
                        Value: true,
                    },
                ],
                sortList: ['SortID asc, DisplayName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_DocumentStatus_Form = async function (documentType, showInForm) {
            var request = {
                modelName: 'XSmDocumentStatus',
                fieldNames: ['StatusId', 'DisplayName', 'IsArchive', 'SortID'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'DocumentType',
                        Operator: '=',
                        Value: documentType,
                    },
                    {
                        PropertyName: 'ShowInForm',
                        Operator: '=',
                        Value: showInForm,
                    },
                ],
                sortList: ['SortID asc, DisplayName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_Brand = async function () {
            var request = {
                modelName: 'XInvBrand',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Description asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_User = async function () {
            var request = {
                modelName: 'XSmUsers',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.Value_OperatorIN = function (arr, columnName = '', wrapElement = `'`) {
            // inisialisasi
            let result = ''; //`('')`'';

            try {
                // lakukan Concate terhadap Code: menggunakan pola tertentu

                let items = '';
                let separator = '';
                arr.forEach((element) => {
                    items += separator + wrapElement + `${element[columnName]}` + wrapElement;
                    separator = ',';
                });

                if (items) result = `(${items})`;
            } catch (error) { }

            return result;
        };

        utility.Value_OperatorIN_ = function (arr, columnName = '', wrapElement = `'`) {
            let result = utility.Value_OperatorIN(arr, columnName, wrapElement);

            if (!result) result = `('not valid value')`;

            return result;
        }

        utility.Value_OperatorIN_x = function (arr, columnName = '', wrapElement = `'`) {
            let result = utility.Value_OperatorIN(arr, columnName, wrapElement);

            if (!result) result = `(-12345)`;

            return result;
        }

        utility.Value_OperatorIN2 = function (arr, wrapElement = `'`) {
            // inisialisasi
            let result = ''; //`('')`'';

            try {
                // lakukan Concate terhadap Code: menggunakan pola tertentu

                let items = '';
                let separator = '';
                arr.forEach((element) => {
                    items += separator + wrapElement + `${element}` + wrapElement;
                    separator = ',';
                });

                if (items) result = `(${items})`;
            } catch (error) { }

            return result;
        };

        utility.ValidString = function (x) {
            // "Special Case"
            if (x === 0) return true;

            return x != '' && x !== undefined && x !== null && x !== 'undefined' && x !== 'null';
        };

        utility.Not_ValidString = function (x) {
            return !utility.ValidString(x);
        };

        utility.ProcessColumns = function (table, columns) {
            for (let i = 0; i < columns.length; i++) {
                table.columns.push({
                    Title: columns[i][0],
                    DbField: columns[i][1], //LabelField
                    SortField: columns[i][2], //LabelValue
                    Format: columns[i][3],
                });
            }
        };

        utility.ProcessColumnsX = function (table, columns) {
            table.columns = [];
            for (let i = 0; i < columns.length; i++) {
                table.columns.push({
                    Title: columns[i][0],
                    DbField: columns[i][1],
                    SortField: columns[i][2],
                    Format: columns[i][3],
                });
            }
        };

        utility.ProcessColumnsY = function (table, columns) {
            for (let i = 0; i < columns.length; i++) {
                table.columns.push({
                    Title: columns[i][0],
                    DbField: columns[i][1], //LabelField
                    SortField: columns[i][2], //LabelValue
                    Format: columns[i][3],
                    Show: columns[i][4],
                });
            }
        };

        utility.Dropdown_User = async function (val) {
            return await Employee_Service.User_Dropdown(val);
        };

        utility.Dropdown_Customer = async function (val, locationCode = '', locationOperator = '=') {
            return await BusinessRelation_Service.Customer_Dropdown(val, locationCode, locationOperator);
        };

        utility.Personel_Dropdown = async function (val, locationCode = '', locationOperator = '=') {
            return await BusinessRelation_Service.Personel_Dropdown(val, locationCode, locationOperator);
        };

        utility.Dropdown_Supplier = async function (val, locationCode = '', locationOperator = '=') {
            return await BusinessRelation_Service.Supplier_Dropdown(val, locationCode, locationOperator);
        };

        utility.Dropdown_PriceGroup = async function () {
            return await PriceGroups_Service.Dropdown();
        };

        utility.Dropdown_Customer2 = async function (val, parameter_scope) {
            let _selectedBranch = parameter_scope.selectedBranch;
            let _operator = '=';

            if (utility.Not_ValidString(_selectedBranch)) {
                _selectedBranch = utility.Value_OperatorIN(parameter_scope.data_EmployeeLocationAccess, 'Code');
                _operator = 'in';
            }

            return await utility.Dropdown_Customer(val, _selectedBranch, _operator);
        };

        utility.Dropdown_InventoryItem = async function (val) {
            return await Inventory_Service.Dropdown_InventoryItem(val);
        };

        utility.getData_Tax = async function () {
            var request = {
                modelName: 'XTXTax',
                fieldNames: ['Code', 'Description', 'CurrentTaxRatePercentage'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'TaxType', Operator: '=', Value: 'VAT' }],
                sortList: ['CurrentTaxRatePercentage asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.LocationAccess = async function () {
            return await Employee_Service.LocationAccess();
        };

        utility.WarehouseByLocation = async function () {
            return await Employee_Service.WarehouseByLocation();
        };

        utility.EmployeeSiteAccess = async function (parameter_scope) {
            try {
                parameter_scope.data_Site = [
                    { Code: 'Tangerang', Name: 'Tangerang' },
                    { Code: 'Bogor', Name: 'Bogor' },
                    { Code: 'Tegal', Name: 'Tegal' },
                    { Code: 'Curug', Name: 'Curug' },
                    { Code: 'Bandung', Name: 'Bandung' },
                ];

                parameter_scope.complete_Site = true;
            } catch (error) { }
        };

        utility.EmployeeLocationAccess = async function (parameter_rootScope, parameter_scope, selectedBranch = null) {
            let data = OurStorage.getItem(`_EmployeeLocationAccess`);

            let response = {};

            if (utility.ValidString(data)) {
                response = JSON.parse(data);
            } else {
                response = await Employee_Service.LocationAccess();

                OurStorage.setItem(`_EmployeeLocationAccess`, JSON.stringify(response));
            }

            try {
                parameter_scope.data_EmployeeLocationAccess = response.Data;

                if (parameter_rootScope.isNullish(selectedBranch)) {
                    let x = parameter_scope.data_EmployeeLocationAccess.filter((e) => {
                        return e.Code == response.DefaultBranch;
                    });
                    if (x.length > 0) {
                        parameter_scope.selectedBranch = response.DefaultBranch;
                    } else {
                        parameter_scope.selectedBranch = parameter_scope.data_EmployeeLocationAccess[0].Code;
                    }
                } else {
                    parameter_scope.selectedBranch = selectedBranch;
                }

                parameter_scope.model.LocationCode = parameter_scope.selectedBranch;
            } catch (error) { }
        };

        utility.EmployeeWarehouseAccess = async function (parameter_rootScope, parameter_scope, selectedWarehouse = null) {
            let data = OurStorage.getItem(`_WarehouseByLocation`);

            let response = {};

            if (utility.ValidString(data)) {
                response = JSON.parse(data);
            } else {
                response = await Employee_Service.WarehouseByLocation();

                OurStorage.setItem(`_WarehouseByLocation`, JSON.stringify(response));
            }

            try {
                parameter_scope.data_EmployeeWarehouseAccess = response.Data;

                let data = parameter_scope.data_EmployeeWarehouseAccess;

                parameter_scope.data_Warehouse_perBranch = [...new Map(data.map((item) => [item['Code'], item])).values()].sort((x, y) => x.Code.localeCompare(y.Code));

                if (selectedWarehouse == null) {
                    if (parameter_scope.data_Warehouse_perBranch.length > 0) {
                        parameter_scope.selectedWarehouse = parameter_scope.data_Warehouse_perBranch[0].Code;
                    }
                } else {
                    parameter_scope.selectedWarehouse = selectedWarehouse;
                }
            } catch (ex) { }
        };

        utility.Proces_CheckBox_Kiri = async function (parameter_scope) {
            parameter_scope.selectAllRows = false;

            parameter_scope.selectAllRows_Change = async function () {
                parameter_scope.dt.data.forEach(async function (row) {
                    row['rowSelected'] = parameter_scope.selectAllRows;
                });
            };

            parameter_scope.ProcessRow = async function (index) {
                let allCheck = true;

                parameter_scope.dt.data.forEach(async function (row) {
                    if (!row['rowSelected']) {
                        allCheck = false;

                        //break;
                        return;
                    }
                });

                parameter_scope.selectAllRows = allCheck;
            };
        };

        utility.setCriteriaList = function (request, filters) {
            let criteriaList = [];

            Object.entries(filters).map((filterItem) => {
                if (filterItem[1].Value !== '' && filterItem[1].Value !== null) criteriaList.push(filterItem[1]);
            });

            request['criteriaList'] = criteriaList;
        };

        utility.getData_CoverGiroEvent = async function () {
            var request = {
                modelName: 'XCoverGiroEventStatic',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_LeadSource = async function () {
            var request = {
                modelName: 'XLeadSource',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_OrderSource = async function () {
            var request = {
                modelName: 'XOrderSource',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_SourceType = async function () {
            var request = {
                modelName: 'XSalesOrderSourceType',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_ExpeditionPayment = async function () {
            var request = {
                modelName: 'XExpeditionPaymentMethodStatic',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_PickingProfile = async function () {
            var request = {
                modelName: 'XPickingProfileStatic',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_CR_Grade = async function () {
            var request = {
                modelName: 'XCreditGradeStatic',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.Still_Processing = function (scope, flag) {
            scope['still_processing'] = flag;

            if (flag) {
                $('#idLoading').show();
            } else {
                $('#idLoading').hide();
            }
        };

        utility.getSelectedData = function (arr, fieldName = 'Code', fieldName2 = 'rowSelected') {
            let selectedData = [];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i][fieldName2]) {
                    selectedData.push(arr[i][fieldName]);
                }
            }

            return selectedData;
        };

        utility.BackEnd_Version = async function () {
            let request = {
                actionController: 'OtherController',
                actionName: 'Signature',
                actionParam: '',
            };

            return await BackEndService.RequestAction(request);
        };

        utility.LandingPage_for_User = function () {
            return "/frm/sales/SalesOrders";
        };

        utility.sdr_BuildFlatTreeData = function (param_scope, kolom_id, kolom_parent_id, kolom_code, kolom_desc) {
            if (!param_scope.dt.data || param_scope.dt.data.length === 0) {
                param_scope.dt.treeData = [];
                return;
            }

            var flatData = angular.copy(param_scope.dt.data);
            var lookup = {};
            var roots = [];
            var errors = [];

            // Step 1: Buat lookup berdasarkan AccountId
            flatData.forEach(function (item) {
                item.children = [];
                item.level = 0;
                item.hasError = false;
                lookup[item[kolom_id]] = item;
            });

            // Step 2: Fungsi untuk detect circular reference
            var detectCircular = function (itemId, visitedIds) {
                if (!visitedIds) visitedIds = [];

                if (visitedIds.indexOf(itemId) !== -1) {
                    return true; // Circular detected!
                }

                var item = lookup[itemId];
                if (!item || !item[kolom_parent_id] || item[kolom_parent_id] === 0) {
                    return false; // No circular
                }

                visitedIds.push(itemId);
                return detectCircular(item[kolom_parent_id], visitedIds);
            };

            // Step 3: Build parent-child relationship dengan circular detection
            flatData.forEach(function (item) {
                if (item[kolom_parent_id] && item[kolom_parent_id] !== 0) {
                    // Check circular reference
                    if (detectCircular(item[kolom_id])) {
                        console.error('Circular reference detected:', item[kolom_code], item[kolom_desc]);
                        errors.push({
                            type: 'circular',
                            item: item,
                            message: 'Circular reference detected for account: ' + item[kolom_code]
                        });
                        item.hasError = true;
                        // Treat as root level
                        roots.push(item);
                        return;
                    }

                    // Check if parent exists
                    if (lookup[item[kolom_parent_id]]) {
                        var parent = lookup[item[kolom_parent_id]];
                        parent.children.push(item);

                        // Calculate level safely with max depth limit
                        var level = 0;
                        var currentParent = parent;
                        var maxDepth = 20; // Prevent infinite loop

                        while (currentParent && level < maxDepth) {
                            level++;
                            currentParent = currentParent.ParentId && currentParent.ParentId !== 0
                                ? lookup[currentParent.ParentId]
                                : null;
                        }

                        if (level >= maxDepth) {
                            console.warn('Max depth reached for:', item[kolom_code]);
                            item.hasError = true;
                            errors.push({
                                type: 'max_depth',
                                item: item,
                                message: 'Max depth exceeded for account: ' + item[kolom_code]
                            });
                        }

                        item.level = level;
                    } else {
                        // Parent not found, treat as root
                        console.warn('Parent not found for:', item[kolom_code], 'ParentId:', item[kolom_parent_id]);
                        errors.push({
                            type: 'orphan',
                            item: item,
                            message: 'Parent not found for account: ' + item[kolom_code] + ' (ParentId: ' + item[kolom_parent_id] + ')'
                        });
                        item.hasError = true;
                        roots.push(item);
                    }
                } else {
                    // Item ini adalah root level
                    roots.push(item);
                }
            });

            // Step 3: Sort children by code
            var sortChildren = function (node) {
                if (node.children && node.children.length > 0) {
                    node.children.sort(function (a, b) {
                        if (a[kolom_code]) {
                            return a[kolom_code].localeCompare(b[kolom_code]);
                        }

                        return '';
                    });
                    node.children.forEach(sortChildren);
                }
            };

            // Sort roots by code
            roots.sort(function (a, b) {
                if (a[kolom_code]) {
                    return a[kolom_code].localeCompare(b[kolom_code]);
                }

                return '';
            });

            // Sort all children recursively
            roots.forEach(sortChildren);

            // Step 4: Flatten tree menjadi array dengan urutan hierarki
            var result = [];
            var flattenTree = function (nodes) {
                nodes.forEach(function (node) {
                    result.push(node);
                    if (node.children && node.children.length > 0) {
                        flattenTree(node.children);
                    }
                });
            };

            flattenTree(roots);

            // Step 5: Update display numbers
            result.forEach(function (item, index) {
                item.displayNumber = ((param_scope.dt.currentPage - 1) * param_scope.dt.pageLength) + index + 1;
            });

            // Show errors if any
            if (errors.length > 0) {
                console.warn('Tree building completed with', errors.length, 'error(s):');
                errors.forEach(function (err) {
                    console.warn('-', err.type + ':', err.message);
                });

                // Optionally show user notification
                param_scope.treeErrors = errors;
            } else {
                param_scope.treeErrors = null;
            }

            return result;
        };

        utility.SaveDataStore = async function (data) {
            let request = {
                actionController: 'OtherController',
                actionName: 'SaveDataStore',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        utility.GeDataStore = async function (code) {
            let request = {
                modelName: 'XData_Store',
                criteriaList: [{ PropertyName: 'Kunci', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };


        return utility;
    },
]);
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
                if (!$rootScope.ERP.currentUser.token) return;
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

            $rootScope.ERP = {
                currentUser: userInfo,
                currentScopes: userInfo.Scope.split(','),
            };

            $rootScope.ERP.currentUser.token = token;

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            OurStorage.setItem('appSettings', JSON.stringify($rootScope.appSettings));
            OurStorage.setItem('', JSON.stringify($rootScope.ERP));

            var response = { success: true };

            deferred.resolve(response);

            // promise is returned
            return deferred.promise;

            let apiUrl = $rootScope.appSettings.Endpoint + '/Main' + '/GetSingle';

            let config = {
                method: 'POST',
                url: apiUrl,
                timeout: 3600 * 1000,
                data: JSON.stringify({
                    modelName: 'XSmUsers',
                    criteriaList: [
                        {
                            PropertyName: 'UserName',
                            Operator: '=',
                            Value: $rootScope.ERP.currentUser.UserName,
                        },
                    ],
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            return $http(config).then(
                function (response) {
                    response.success = true;

                    $rootScope.ERP.userERP = response.data;

                    OurStorage.setItem('', JSON.stringify($rootScope.ERP));

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

        service.ValidateCurrentAccessScope = function (accessScopes) {
            let found = false;
            angular.forEach(accessScopes, function (permission, index) {
                if ($rootScope.ERP.currentScopes.indexOf(permission) >= 0) {
                    found = true;
                    return;
                }
            });

            return found;
        };

        service.ClearSessions = function () {
            service.Logout();

            $rootScope.ERP = {};
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

'use strict';
angular.module('app.frmUtils').factory('DTService', [
    'BackEndService',
    function (BackEndService) {
        var service = {};

        service.GenerateDTInstance = function (modelName, defaultSortField, defaultSortDirection, filterObject, defaultSearchKeyword, pageLength = 10, afterRequestData = null, searchKeyword = '') {
            var dt = {};
            dt.loading = false;
            dt.dataModel = modelName;
            dt.pageLength = pageLength;
            dt.currentPage = 1;
            dt.totalPages = 0;
            dt.totalRows = 0;
            dt.pages = [];
            dt.data = [];
            dt.searchKeyword = searchKeyword;
            dt.activeSortField = defaultSortField;
            dt.activeSortDirection = defaultSortDirection;
            dt.columns = [];
            dt.filters = filterObject;

            dt.loadData = async function () {
                var request = {
                    modelName: dt.dataModel,
                    maximumResult: dt.pageLength,
                    fieldNames: ['*'],

                    sortList: [dt.activeSortField + ' ' + dt.activeSortDirection],
                    pageNumber: dt.currentPage,
                };

                dt.applyFilters(request);

                dt.loading = true;

                // reset
                dt.data = [];
                //dt.totalRows = 0;
                //dt.totalPages = 0;

                let response = await BackEndService.RequestDataList(request);
                dt.loading = false;

                if (response.success) {
                    // request data success
                    dt.data = response.data.Data;
                    dt.totalRows = response.data.TotalRows;
                    if (dt.totalRows < dt.pageLength) dt.totalPages = 1;
                    else dt.totalPages = Math.ceil(dt.totalRows / dt.pageLength);
                } else {
                    // request data failed
                    // show Error: sudah dihandle oleh SmartAdmin - function notifyError() menggunakan $.bigBox()
                }

                if (afterRequestData) {
                    afterRequestData();
                }

                BackEndService.Log_Activity();
            };

            dt.sort = async function ($event, fieldName) {
                // reset class
                $('.asc').attr('class', '');
                $('.desc').attr('class', '');
                if (fieldName == dt.activeSortField) {
                    if (dt.activeSortDirection == 'asc') dt.activeSortDirection = 'desc';
                    else dt.activeSortDirection = 'asc';
                } else {
                    dt.activeSortField = fieldName;
                    dt.activeSortDirection == 'asc';
                }

                $event.currentTarget.className = dt.activeSortDirection;
                await dt.loadData();
            };

            dt.nextPage = async function () {
                if (dt.currentPage === dt.totalPages) return;

                dt.currentPage++;
                await dt.loadData();
            };
            dt.previousPage = async function () {
                if (dt.currentPage === 1) return;

                dt.currentPage--;
                await dt.loadData();
            };
            dt.setPage = async function (pageNumber) {
                if (dt.currentPage === pageNumber) return;

                dt.currentPage = pageNumber;
                await dt.loadData();
            };

            dt.getCriteriaList = function (request) {
                var criteriaList = [];

                if (dt.searchKeyword != '') {
                    var searchCriteria = {
                        PropertyName: defaultSearchKeyword,
                        Operator: 'like',
                        Value: '%' + dt.searchKeyword + '%',
                    };
                    criteriaList.push(searchCriteria);
                }
                Object.entries(dt.filters).map((filterItem) => {
                    if (filterItem[1].Value !== '' && filterItem[1].Value !== null) criteriaList.push(filterItem[1]);
                });

                request['criteriaList'] = criteriaList;
            };

            dt.applyFilters = function (request) {
                if (defaultSearchKeyword.includes(',')) {
                    dt.getSQLCriteria(request);
                } else {
                    dt.getCriteriaList(request);
                }
            };

            dt.getSQLCriteria = function (request, skipIfBlank = true) {
                if (dt.searchKeyword == '' && skipIfBlank) {
                    dt.getCriteriaList(request);
                    return;
                }

                let fields = defaultSearchKeyword.replaceAll(' ', '').split(',');

                let sql = '';
                let sql1 = '';
                let sql2 = '';
                let separator = '';
                let operator = 'like';
                let value = '';

                fields.forEach((field) => {
                    value = '%' + dt.searchKeyword + '%';
                    sql1 += `${separator} ${field} ${operator} '${value}'`;

                    separator = ' or ';
                });

                if (sql1 != '') {
                    sql1 = `( ${sql1} )`;
                }

                let field = '';
                separator = '';

                Object.entries(dt.filters).map((filterItem) => {
                    if (filterItem[1].Value !== '' && filterItem[1].Value !== null) {
                        field = filterItem[1].PropertyName;
                        operator = filterItem[1].Operator;

                        if (operator == 'in') {
                            value = filterItem[1].Value;
                        } else {
                            value = `'${filterItem[1].Value}'`;
                        }

                        sql2 += `${separator} ${field} ${operator} ${value}`;

                        separator = ' and ';
                    }
                });

                sql = sql1;

                separator = '';
                if (sql != '') {
                    separator = ' and ';
                }

                if (sql2) {
                    sql += separator + sql2;
                }

                if (sql != '') {
                    request['SQLCriteria'] = sql;
                }
            };

            return dt;
        };

        service.ModalGenerateDTInstance = function (modelName, defaultSortField, defaultSortDirection, filterObject, defaultSearchKeyword, pageLength = 5) {
            var dt = {};
            dt.loading = false;
            dt.dataModel = modelName;
            dt.pageLength = pageLength;
            dt.currentPage = 1;
            dt.totalPages = 0;
            dt.totalRows = 0;
            dt.pages = [];
            dt.data = [];
            dt.searchKeyword = '';
            dt.activeSortField = defaultSortField;
            dt.activeSortDirection = defaultSortDirection;
            dt.columns = [];
            dt.filters = filterObject;

            dt.loadData = async function () {
                var request = {
                    modelName: dt.dataModel,
                    maximumResult: dt.pageLength,
                    fieldNames: ['*'],
                    criteriaList: dt.getCriteriaList(),
                    sortList: [dt.activeSortField + ' ' + dt.activeSortDirection],
                    pageNumber: dt.currentPage,
                };

                dt.loading = true;

                let response = await BackEndService.RequestDataList(request);
                dt.loading = false;

                if (response.success) {
                    // request data success
                    dt.data = [];
                    dt.data = response.data.data;
                    dt.totalRows = response.data.totalRows;
                    if (dt.totalRows < dt.pageLength) dt.totalPages = 1;
                    else dt.totalPages = Math.ceil(dt.totalRows / dt.pageLength);
                } else {
                    // request data failed
                    // show Error: sudah dihandle oleh SmartAdmin - function notifyError() menggunakan $.bigBox()
                }
            };

            dt.sort = function ($event, fieldName) {
                // reset class
                $('.asc').attr('class', '');
                $('.desc').attr('class', '');
                if (fieldName == dt.activeSortField) {
                    if (dt.activeSortDirection == 'asc') dt.activeSortDirection = 'desc';
                    else dt.activeSortDirection = 'asc';
                } else {
                    dt.activeSortField = fieldName;
                    dt.activeSortDirection == 'asc';
                }

                $event.currentTarget.className = dt.activeSortDirection;
                dt.loadData();
            };

            dt.nextPage = function () {
                if (dt.currentPage === dt.totalPages) return;

                dt.currentPage++;
                dt.loadData();
            };
            dt.previousPage = function () {
                if (dt.currentPage === 1) return;

                dt.currentPage--;
                dt.loadData();
            };
            dt.setPage = function (pageNumber) {
                if (dt.currentPage === pageNumber) return;

                dt.currentPage = pageNumber;
                dt.loadData();
            };

            dt.getCriteriaList = function () {
                var criteriaList = [];

                if (dt.searchKeyword != '') {
                    var searchCriteria = {
                        PropertyName: defaultSearchKeyword,
                        Operator: 'like',
                        Value: '%' + dt.searchKeyword + '%',
                    };
                    criteriaList.push(searchCriteria);
                }
                Object.entries(dt.filters).map((filterItem) => {
                    if (filterItem[1].Value !== '' && filterItem[1].Value !== null) criteriaList.push(filterItem[1]);
                });

                return criteriaList;
            };

            return dt;
        };

        return service;
    },
]);

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

angular.module('app.frm').controller('SalesOrdersCtrl', function ($rootScope, $scope, Utility_ERP, SalesOrders_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.activeOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Yes' },
        { Value: false, Text: 'No' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Billto: { PropertyName: 'BillingAddressNumber', Operator: '=', Value: null },
        SalesOrderType: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        CreatedBy: { PropertyName: 'IssuedBy', Operator: '=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
        Dropship: { PropertyName: 'Dropship', Operator: '=', Value: null },
        Full: { PropertyName: 'ReservationFull', Operator: '=', Value: null },
        OpenOnly: { PropertyName: 'TotalOpenQty', Operator: '>', Value: null },
        UnPrinted: { PropertyName: 'PrintCount', Operator: '<=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedCustomer = '';
    $scope.selectedSalesOrderType = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedCreatedBy = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;
    $scope.selectedOpenOnly = false;
    $scope.selectedUnPrinted = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_BillingAddressNames = [];
    $scope.data_SalesOrderType = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = SalesOrders_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['SO #', 'Code', 'Code', 'Text', true],
            ['PO#', 'PONumber', 'PONumber', 'Text', true],
            ['Type', 'TypeName', 'TypeName', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Warehouse', 'WarehouseName', 'WarehouseName', 'Text', true],
            ['Customer', 'CustomerName', 'CustomerName', 'Text', true],
            ['Open', 'TotalOpenQty', 'TotalOpenQty', 'Number', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['SO Value', 'TotalAmount', 'TotalAmount', 'Currency', true],
            ['R', 'ReserveStock', 'ReserveStock', 'Boolean', true],
            ['Created By', 'IssuedByName', 'IssuedByName', 'Text', true],
            ['Status', 'StatusName', 'StatusName', 'Text', true],
            ['Shipment Status', 'ShipmentStatusName', 'ShipmentStatusName', 'Text', true],
            ['Printed', 'PrintCount', 'PrintCount', 'Number', true],
            ['F', 'ReservationFull', 'ReservationFull', 'Boolean', true],
            ['D', 'Dropship', 'Dropship', 'Boolean', true],
            ['Payment Method', 'PaymentMethodName', 'PaymentMethodCode', 'Text', false],
            ['Item Count', 'NumberOfItems', '', 'Number', false],
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

        if (!$scope.selectedWarehouse) {
            $scope.filters.Warehouse.Operator = 'in';
            $scope.filters.Warehouse.Value = Utility_ERP.Value_OperatorIN_($scope.data_Warehouse_perBranch, 'Code');
        } else {
            $scope.filters.Warehouse.Operator = '=';
            $scope.filters.Warehouse.Value = $scope.selectedWarehouse;
        }

        if (!$scope.selectedSalesOrderType) {
            $scope.filters.SalesOrderType.Operator = 'in';
            $scope.filters.SalesOrderType.Value = Utility_ERP.Value_OperatorIN_($scope.data_SalesOrderType, 'Code');
        } else {
            $scope.filters.SalesOrderType.Operator = '=';
            $scope.filters.SalesOrderType.Value = $scope.selectedSalesOrderType;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        $scope.filters.OpenOnly.Value = null;
        if ($scope.selectedOpenOnly) {
            $scope.filters.OpenOnly.Value = 0;
        }

        $scope.filters.UnPrinted.Value = null;
        if ($scope.selectedUnPrinted) {
            $scope.filters.UnPrinted.Value = 0;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;
        $scope.filters['selectedCreatedBy'] = $scope.selectedCreatedBy;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;
        $scope.filters['selectedOpenOnly'] = $scope.selectedOpenOnly;
        $scope.filters['selectedUnPrinted'] = $scope.selectedUnPrinted;

        $rootScope.SaveFilterState('SalesOrders', $scope);

        delete $scope.filters['selectedCustomer'];
        delete $scope.filters['selectedCreatedBy'];
        delete $scope.filters['selectedShowAll'];
        delete $scope.filters['selectedOpenOnly'];
        delete $scope.filters['selectedUnPrinted'];
    };

    $scope.Branch_Changed = async function () {
        // --  untuk Page ini, setiap kali Branch berubah --> maka Warehouse ke posisi "All"
        // reset
        $scope.selectedWarehouse = '';

        $scope.Reorganize_Warehouse();

        await $scope.showData();
    };

    $scope.Reorganize_Warehouse = function () {
        var data = [];

        if (!$scope.selectedBranch) {
            // tanpa Filter Branch
            data = $scope.data_EmployeeWarehouseAccess;
        } else {
            // filter berdasarkan Branch
            data = $scope.data_EmployeeWarehouseAccess.filter(function (e) {
                return e.LocationCode == $scope.selectedBranch;
            });
        }

        $scope.data_Warehouse_perBranch = [...new Map(data.map((item) => [item['Code'], item])).values()].sort((x, y) => x.Code.localeCompare(y.Code));
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        // reset
        $scope.data_BillingAddressNames = [];
        $scope.filters.Billto.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.Customer.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_BillingAddressNames = await BusinessRelation_Service.GetBusinessRelationBillingAddressNames($scope.filters.Customer.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_SalesOrderType = async function () {
        $scope.data_SalesOrderType = await SalesOrders_Service.Dropdown_SalesOrderType();
    };

    $scope.getData_BillingAddress = async function () {
        // Function untuk mendapatkan billing address options
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('SalesOrder');

        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        $rootScope.SetDefaultDropdownList($scope.data_Status, 'StatusId', $scope, 'selectedStatus');
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

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let type = $scope.filters.SalesOrderType.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedSalesOrderType = type;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            let billTo = $scope.filters.Billto.Value;
            await $scope.customerSelected(false);
            $scope.filters.Billto.Value = billTo;

            $scope.selectedCreatedBy = $scope.filters['selectedCreatedBy'];
            delete $scope.filters['selectedCreatedBy'];

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];

            $scope.selectedOpenOnly = $scope.filters['selectedOpenOnly'];
            delete $scope.filters['selectedOpenOnly'];

            $scope.selectedUnPrinted = $scope.filters['selectedUnPrinted'];
            delete $scope.filters['selectedUnPrinted'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_SalesOrderType(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('SalesOrders', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.exportList = async function () { }

    $scope.shipmentClick = async function () { }

    $scope.showCloseOrderForm = async function () { }

    $scope.showCancelPurchasingForm = async function () { }

    $scope.requestReservation = async function () { }

    $scope.releaseReservation = async function () { }

    $scope.showReleaseSOForm = async function () { }

    $scope.initialize_Page();
});

'use strict';

angular.module('app.frmUtils').factory('BusinessRelation_Service', [
    'BackEndService',
    function (BackEndService) {
        var service = {};

        service.getData_BusinessRelation = async function (code, fieldNames = ['*']) {
            let request = {
                modelName: 'XSmBusinessRelationR',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
                fieldNames: fieldNames,
            };

            return BackEndService.RequestDataSingle(request);
        };

        service.Customer_Dropdown = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Active = 1) and (IsCustomer = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                // "Bungkus" nilai locationCode dengan Tanda Petik
                if (!locationCode.startsWith('(')) locationCode = `'${locationCode}'`;

                // tambahkan ke criteria
                request.SQLCriteria += ` and LocationCode ${locationOperator} ${locationCode}`;
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Personel_Dropdown = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Active = 1) and (IsPersonnel = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                // "Bungkus" nilai locationCode dengan Tanda Petik
                if (!locationCode.startsWith('(')) locationCode = `'${locationCode}'`;

                // tambahkan ke criteria
                request.SQLCriteria += ` and LocationCode ${locationOperator} ${locationCode}`;
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_Customer = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                    {
                        PropertyName: 'IsCustomer',
                        Operator: '=',
                        Value: true,
                    },
                    {
                        PropertyName: 'Name',
                        Operator: 'like',
                        Value: '%' + val + '%',
                    },
                ],
                sortList: ['Name asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                request.criteriaList.push({
                    PropertyName: 'LocationCode',
                    Operator: locationOperator,
                    Value: locationCode,
                });
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Supplier_Dropdown = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Active = 1) and (IsSupplier = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                // "Bungkus" nilai locationCode dengan Tanda Petik
                if (!locationCode.startsWith('(')) locationCode = `'${locationCode}'`;

                // tambahkan ke criteria
                request.SQLCriteria += ` and LocationCode ${locationOperator} ${locationCode}`;
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_Supplier = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                    {
                        PropertyName: 'IsSupplier',
                        Operator: '=',
                        Value: true,
                    },

                    {
                        PropertyName: 'Name',
                        Operator: 'like',
                        Value: '%' + val + '%',
                    },
                ],
                sortList: ['Name asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                request.criteriaList.push({
                    PropertyName: 'LocationCode',
                    Operator: locationOperator,
                    Value: locationCode,
                });
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.GetBusinessRelationBillingAddressNames = async function (brCode) {
            let request = {
                modelName: 'XSmAddress',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'BusinessRelationCode',
                        Operator: '=',
                        Value: brCode,
                    },
                ],
                sortList: ['Number asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_ContactPerson = async function (brCode) {
            let request = {
                modelName: 'XSmContactPerson',
                fieldNames: ['Number', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'BusinessRelationCode',
                        Operator: '=',
                        Value: brCode,
                    },
                    // {
                    //     PropertyName: 'Active',
                    //     Operator: '=',
                    //     Value: true,
                    // },
                ],
                sortList: ['Number asc, Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.PriceGroupList = async function (brCode) {
            let request = {
                modelName: 'XSmBusinessRelationPriceGroupR',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'BusinessRelationCode',
                        Operator: '=',
                        Value: brCode,
                    },
                ],
                sortList: ['Number asc, ItemCode asc, ItemDescription asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);

'use strict';

angular.module('app.frmUtils').factory('Employee_Service', [
    'BackEndService',
    function (BackEndService) {
        var service = {};

        service.LocationAccess = async function () {
            let request = {
                applicationId: '',
                actionController: 'EmployeeController',
                actionName: 'GetEmployeeLocationAccess',
                actionParam: {},
            };

            let response = await BackEndService.RequestAction(request);
            return response.data.Value;
        };

        service.WarehouseByLocation = async function () {
            let request = {
                applicationId: '',
                actionController: 'EmployeeController',
                actionName: 'GetSalesWarehouseListByLocation',
                actionParam: {},
            };

            let response = await BackEndService.RequestAction(request);
            return response.data.Value;
        };

        service.User_Dropdown = async function (val) {
            let request = {
                modelName: 'XSmUsers',
                fieldNames: ['Code', 'Name'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Active = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);

'use strict';

angular.module('app.frmUtils').factory('Inventory_Service', [
    'BackEndService',
    function (BackEndService) {
        var service = {};
        
        return service;
    },
]);

"use strict";

angular.module('app.frmUtils').factory('SalesOrders_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XSalesOrder', 'InsertStamp', 'desc', filterObject, 'Code, PONumber, ContractName, ProjectName', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XSalesOrder',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XSalesOrder',
                fieldNames: ['Code'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XSalesOrder',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'SalesOrderController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);
