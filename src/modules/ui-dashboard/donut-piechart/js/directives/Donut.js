angular.module('ui.dashboard.DonutApp').directive('donut',['ui.dashboard.DonutConfiguration',function(DonutConfiguration){
	return {
		restrict: 'E',
		scope: {
			configuration: '=',
			data: '='
		},
		link: function($scope,element,attrs){


		}
	}
}]);