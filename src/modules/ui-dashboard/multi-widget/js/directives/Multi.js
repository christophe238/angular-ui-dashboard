angular.module('ui.dashboard.MultiWidgetApp').directive('multi',[function(){
    return {
        restrict: 'E',
        scope: {
          configuration: '=',
          data: '='
        },
        template :  '<div class="ui-dashboard-multi-container">'+
	        			'<div class="ui-dashboard-multi-navigate">'+
	        				'<span class="glyphicon glyphicon-chevron-left" ng-click="$previousWidget()"></span>'+
	        				'<span class="glyphicon glyphicon-chevron-right" ng-click="$nextWidget()"></span>'+
	        			'</div>'+
	        			'<div ng-repeat="conf in configuration">'+                                                        
        					'<circular-gauge ng-if="conf.type === \'circular-gauge\'" configuration="conf" data="data[$index]" ng-show="$selectedWidgetIndex === $index"></circular-gauge>'+
                            '<donut ng-if="conf.type === \'donut\'" configuration="conf" data="data[$index]" ng-show="$selectedWidgetIndex === $index"></donut>'+
                            '<pie-chart ng-if="conf.type === \'pie-chart\'" configuration="conf" data="data[$index]" ng-show="$selectedWidgetIndex === $index"></pie-chart>'+
        				'</div>'+
	        		'</div>',
        controller : 'ui.dashboard.MultiController'
    };
}]);