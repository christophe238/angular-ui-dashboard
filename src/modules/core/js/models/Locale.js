define([
    'polyglot'
], function(Polyglot) {

    var Locale = function() {};

    Locale.prototype.init = function(data) {
        this.data = data;
        this._polyglot = new Polyglot({phrases: data});
        return this;
    };

    Locale.prototype.interpolate = function() {};

    Locale.prototype.translate = function(key, context, additionalParams) {
        var str = this._polyglot.t(key, additionalParams || {});
        if (context) {
            return this.interpolate(str, context);
        }
        return str;
    };

    Locale.prototype.injectTranslations = function(namespace, $scope) {
        // add all keys from namespace to $scope.text object
        // nothing can stop you from using translate directly if needed
        if (_.isUndefined($scope.text)) {
            $scope.text = {};
        }
        var self = this;
        var subdata = this.data[namespace];
        _.each(subdata, function(val, key) {
           $scope.text[key] = self.translate(namespace + '.' + key);
        });
    };


    return Locale;
});
