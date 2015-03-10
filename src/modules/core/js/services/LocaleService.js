define([
    'angular',

    'core/models/Locale',
    'core/app/LocaleApp'
], function(ng, Locale, LocaleApp) {

    LocaleApp.factory('localeService', ['$rootScope','$interpolate', '$q', '$http', 'appStateService',
    function($rootScope, $interpolate, $q, $http, appStateService) {
        var locale = new Locale();

        locale.interpolate = function(str, context) {
            return $interpolate(str)(context);
        };

        locale.resolveLang = function() {
            var defered = $q.defer();
            var supportedLocales = {
                'en-us': 'en-us',
                'en': 'en-us',
                'fr': 'fr-fr',
                'fr-fr': 'fr-fr'
            };

            var lang = 'en-us';
            var storedLang = appStateService.get('lang');
            if (storedLang && storedLang in supportedLocales) {
                lang = supportedLocales[storedLang];
            } else if (typeof navigator.language === 'string') {
                var navigatorLang = navigator.language.toLowerCase();
                if (navigatorLang in supportedLocales) {
                    lang = supportedLocales[navigatorLang];
                }
            }
            defered.resolve(lang);
            return defered.promise;
        };

        locale.resolve = function() {
            var defered = $q.defer();

            locale.resolveLang().then(function(lang) {
                var pathToLocale = 'locale/' + lang + '.json';

                $http.get(pathToLocale, {cache: true}).success(function(data) {
                    locale.init(data);
                    defered.resolve(locale);
                });
            });

            return defered.promise;
        };

        return locale;
    }]);

});
