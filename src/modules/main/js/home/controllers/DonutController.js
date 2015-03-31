define([
	'angular',
	'lodash',
	'main/home/HomeApp'
],function(angular,_,HomeApp){

	HomeApp.controller('DonutController',['$scope','$timeout',function($scope,$timeout){
		$scope.config0 = {};

		$scope.config1 = {
			sort : 'ascending',
			colors : d3.scale.category20b().range().slice(8,12),
			slice : {
				label : {
					position : 'in'
				},
				click : function(d){
					console.log('Donut Slice clicked : '+JSON.stringify(d));
					$scope.data1 = $scope.generateRandomArray(5);
					$scope.$apply();
				}
			}
		};

		$scope.data0 = [400,200,150,180,200];
		$scope.data1 = [204,300,250,140];

		$scope.miniDonutConfiguration = {
			width : 50,
			height : 50, 
			radius : 20,
			strokeWidth : 5,
			border : {
				strokeWidth : 1
			},
			slice : {
				label : {
					display : false
				},
				hover : {
					apply : false
				}
			}
		};

		$scope.donuts = {
            default : {
                expanded : true,
                code : {
                    expanded : false
                }
            },
            donut1 : {
                expanded : true,
                code : {
                    expanded : false
                }
            },
            donut2 : {
                expanded : true,
                code : {
                    expanded : false
                }
            }
        };		
		
		$scope.generateRandomArray = function(size){
            var array = []
            for(var i = 0; i < size; i++){
                array.push(Math.floor(Math.random()*1000));
            }
            return array;
        };       

		$scope.refreshData = function(){
			$timeout(function(){
				$scope.data0 = $scope.generateRandomArray(5);

				$scope.refreshData();
			},2500);
		};
		$scope.refreshData();
	}]);
});