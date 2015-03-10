define([
    'angular',
    'core/app/AppLocalStorage'
], function(ng,AppLocalStorage) {

    AppLocalStorage.factory('appStateService', ['localStorageService', function(localStorageService) {

        var AppState = function() { };
        
        AppState.prototype._composedID = function(keyID) {
          return [].concat(keyID).join(':');  
        };
        
        AppState.prototype.get = function(keyID) {
            return localStorageService.get(this._composedID(keyID));
        };

        AppState.prototype.set = function(keyID, data) {
            return localStorageService.set(this._composedID(keyID), data);
        };

        return new AppState();
    }]);
});