define([
	'angular',
	'd3',
    'core/CoreApp',
    'core/controllers/GaugeController',
    'core/models/GaugeConfiguration',
    'core/services/GaugeUtils'
],function(ng,d3,CoreApp){

    CoreApp.directive('gauge',['GaugeConfiguration','GaugeUtils',function(GaugeConfiguration, GaugeUtils){
        return {
            restrict: 'E',
            scope: {
	          configuration: '=',
	          data: '='
	        },
            controller: 'GaugeController',
            link: function($scope,element){
            	$scope.configuration = new GaugeConfiguration($scope.configuration);

            	$scope.previousData = ng.copy($scope.data);

            	$scope.draw = function(data){
                	$scope.widget.select('.gauge-container').selectAll('path').remove();
					$scope.widget.select('.gauge-container')
                        .append('path')
                            .attr('fill','none')
                            .attr('stroke',$scope.configuration.getColor(data))
                            .attr('stroke-width',$scope.configuration.strokeWidth)
                            .transition()
                                .attrTween('d',function(d,i){
                                    var interpolate = d3.interpolate(isNaN($scope.previousData) ? 0:$scope.previousData,data);
                                    return function(t){
                                        return GaugeUtils.computeArc(
                                        	$scope.configuration.startAngle,
				                        	$scope.configuration.endAngle,
				                        	interpolate(t),
				                        	$scope.configuration.max,
				                        	$scope.configuration.width,
				                        	$scope.configuration.height,
				                        	$scope.configuration.radius
		                        			);
                                    };
                                })
                                .duration($scope.configuration.transitions.arc)
                                .each("end",function(){
                                	$scope.previousData = ng.copy(data);
                                });
                    $scope._updateLabels(data);
            	};

            	$scope._updateLabels = function(data){
            		if($scope.configuration.label.display){
	            		$scope.widget.select('.gauge-middle-label').select('text')
	            			.attr('opacity',0.2)
		                    .transition()
		                        .duration($scope.configuration.transitions.label)
		                        .attr('opacity',1)
		                        .text($scope.configuration.label.format(data))
	                    if($scope.configuration.label.symbol.display){
	                    	$scope.widget.select('.gauge-middle-label-symbol').select('text')
		            			.attr('opacity',0.2)
			                    .transition()
			                        .duration($scope.configuration.transitions.label)
			                        .attr('opacity',1)
			                        .text($scope.configuration.label.symbol.format(data));
	                    }
                    }
            	};

            	$scope.init = function(){
		            $scope.widget = d3.select(element[0]);
		            $scope.widget.selectAll('*').remove();

		            $scope.widget = $scope.widget.append('svg')
		                	.attr('id',$scope.configuration.id)
		                    .attr('width',$scope.configuration.width)
		                    .attr('height',$scope.configuration.height);

		            if($scope.configuration.background.display){
				        //Setting background
				        $scope.widget.append('g')
		                    .append('path')
		                        .attr('d',GaugeUtils.computeArc(
		                        	$scope.configuration.startAngle,
		                        	$scope.configuration.endAngle,
		                        	$scope.configuration.max,
		                        	$scope.configuration.max,
		                        	$scope.configuration.width,
		                        	$scope.configuration.height,
		                        	$scope.configuration.radius
		                        	))
		                        .attr('fill','none')
		                        .attr('stroke',$scope.configuration.background.color)
		                        .attr('stroke-width',$scope.configuration.strokeWidth);
	                }
		            if($scope.configuration.border.display){
		                //Setting border
		                $scope.widget.append('g')
	                        .append('path')
	                            .attr('d',GaugeUtils.computeArc(
		                        	$scope.configuration.startAngle,
		                        	$scope.configuration.endAngle,
		                        	$scope.configuration.max,
		                        	$scope.configuration.max,
		                        	$scope.configuration.width,
		                        	$scope.configuration.height,
		                        	$scope.configuration.radius + $scope.configuration.strokeWidth/2-$scope.configuration.border.strokeWidth
		                        	))
	                            .attr('fill','none')
	                            .attr('stroke',$scope.configuration.border.color)
	                            .attr('stroke-width',$scope.configuration.border.strokeWidth);
		            }
		            if($scope.configuration.label.display){
		                //Middle label
		                $scope.widget.append('g')
	                        .attr('class','gauge-middle-label')
	                        .append('text')
	                            .text($scope.configuration.label.format(0))
	                            .attr('x',$scope.configuration.width/2)
	                            .attr('y',$scope.configuration.height/2)
	                            .attr('font-size', $scope.configuration.label.fontsize + 'px')
	                            .attr('fill',$scope.configuration.label.color)
	                            .style('text-anchor', 'middle');
	                    if($scope.configuration.label.symbol.display){
		            		$scope.widget.append('g')
		            			.attr('class','gauge-middle-label-symbol')
		            			.append('text')
		                            .text($scope.configuration.label.symbol.format(0))
		                            .attr('x',$scope.configuration.width/2)
		                            .attr('y',$scope.configuration.height/2 + $scope.configuration.label.fontsize)
		                            .attr('font-size', $scope.configuration.label.symbol.fontsize+'px')
		                            .attr('fill',$scope.configuration.label.symbol.color)
		                            .style('text-anchor', 'middle');
	                    }
		            }

		            //Main widget content
		            $scope.widget.append('g')
	                    .attr('class','gauge-container');
		        }

		        $scope.init();

		        $scope.$watch('configuration',function(){
		        	return $scope.init();
		        });
                $scope.$watch('data', function(newVals, oldVals) {
					return $scope.draw(newVals);
				});
            }
        };
    }]);

});