angular.module('ui.dashboard.GaugeApp').directive('multiGauge',[function(){
    return {
        restrict: 'E',
        scope: {
          configuration: '=',
          data: '='
        },
        template :  '<div class=".ui-dashboard-multi-gauge-container">'+
	        			'<div class="multi-gauge-navigate">'+
	        				'<span class="glyphicon glyphicon-chevron-left" ng-click="$previousWidget()"></span>'+
	        				'<span class="glyphicon glyphicon-chevron-right" ng-click="$nextWidget()"></span>'+
	        			'</div>'+
	        			'<div ng-repeat="conf in configuration">'+
        					'<gauge configuration="conf" data="data[$index]" ng-show="$selectedWidgetIndex === $index"></gauge>'+
        				'</div>'+
	        		'</div>',
        controller : 'ui.dashboard.MultiGaugeController'
    };
}]);