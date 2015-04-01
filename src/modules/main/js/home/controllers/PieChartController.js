define([
	'angular',
	'lodash',
	'main/home/HomeApp'
],function(angular,_,HomeApp){

	HomeApp.controller('PieChartController',['$scope','$timeout',function($scope,$timeout){
		$scope.config0 = {};

		$scope.config1 = {
			sort : 'ascending',
			colors : d3.scale.category20b().range().slice(12,16),
			slice : {
				label : {
					position : 'in'
				},
				click : function(d){
					console.log('Pie Slice clicked : '+JSON.stringify(d));
					$scope.data1 = $scope.generateRandomArray(4);
					$scope.$apply();
				}
			},
			title : {
				value : 'Sample Widget'
			}
		};

		$scope.data0 = [400,200,150,180,200];		
		$scope.data1 = [204,300,250,140];

		$scope.miniPieConfiguration = {
			width : 50,
			height : 50, 
			radius : 20,
			border : {
				strokeWidth : 1
			},			
			slice : {
				border : {
					width : 0.5
				},
				label : {
					display : false
				},
				hover : {
					apply : false
				}
			}
		};

		$scope.pies = {
            default : {
                expanded : true,
                code : {
                    expanded : false
                }
            },
            pie1 : {
                expanded : true,
                code : {
                    expanded : false
                }
            },
            pie2 : {
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