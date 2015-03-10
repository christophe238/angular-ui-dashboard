define([
  'lodash'
], function(_) {
    'use strict';
    return function(state) {
        if (!_.has(state, 'resolve')) {
            state.resolve = {}
        };

        _.extend(state.resolve, {
              localeService: ['localeService', function(localeService) {
                  return localeService.resolve();
              }]
          }
        );

        return state;
    };
});
