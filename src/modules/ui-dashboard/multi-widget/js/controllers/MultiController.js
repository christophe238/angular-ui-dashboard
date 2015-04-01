angular.module('ui.dashboard.MultiWidgetApp').controller('ui.dashboard.MultiController',['$scope',function($scope){

    $scope.$selectedWidgetIndex = 0;

    $scope.$nextWidget = function(){
        if($scope.$selectedWidgetIndex === ($scope.configuration.length - 1)){
            $scope.$selectedWidgetIndex = 0;
        }
        else{
            $scope.$selectedWidgetIndex += 1;
        }
    };

    $scope.$previousWidget = function(){
        if($scope.$selectedWidgetIndex === 0){
            $scope.$selectedWidgetIndex = $scope.configuration.length -1;
        }
        else{
            $scope.$selectedWidgetIndex -= 1;
        }
    };
}]);
