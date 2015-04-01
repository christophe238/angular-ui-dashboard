angular.module('ui.dashboard.GaugeApp').directive('circularGauge',['ui.dashboard.GaugeConfiguration','ui.dashboard.ArcService',function(GaugeConfiguration, ArcService){
    return {
        restrict: 'E',
        scope: {
          configuration: '=',
          data: '='
        },
        link: function($scope,element,attrs){
        	$scope.configuration = new GaugeConfiguration($scope.configuration);

        	$scope.previousData = $scope.configuration.initialValues;

        	$scope.draw = function(data){
        		var arrangedData = $scope._prepareData(angular.copy(data));
            	var paths = $scope.widget.select('.ui-dashboard-gauge-container').selectAll('path')
				paths.data(arrangedData,function(d,i){ return d+Math.random()/1000; })
                	.enter()
                        .append('path')
                            .attr('fill','none')
                            .attr('transform', ArcService.computeRotation(
                            	$scope.configuration.startAngle,
                            	$scope.configuration.width,
                            	$scope.configuration.height
                            	))
                            .attr('stroke',function(d,i){
                            	return $scope.configuration.multipleColorRule.apply ? $scope.configuration.getColor(d):$scope.configuration.getColor(arrangedData[0]);
                            	})
                            .attr('stroke-width',function(d,i){
                            	return $scope.configuration.strokeWidthRule.apply ? $scope.configuration.strokeWidthRule.rule(d,i,$scope.configuration.strokeWidth):$scope.configuration.strokeWidth;
                            	})
                            .attr('opacity',function(d,i){
                            	return $scope.configuration.opacityRule.apply ? $scope.configuration.opacityRule.rule(d,i):1;
                            	})
                            .transition()
                                .attrTween('d',function(d,i){
                                    var interpolate = d3.interpolate(isNaN($scope.previousData[i]) ? 0:$scope.previousData[i],arrangedData[i]);
                                    return function(t){
                                        return ArcService.computeArc(
                                        	0,
				                        	$scope.configuration.amplitude,
				                        	interpolate(t),
				                        	$scope.configuration.max,
				                        	$scope.configuration.width,
				                        	$scope.configuration.height,
				                        	(($scope.configuration.radiusRule.apply) ? $scope.configuration.radiusRule.rule(d,i,$scope.configuration.radius-$scope.configuration.strokeWidth/2,$scope.configuration.strokeWidth):($scope.configuration.radius - $scope.configuration.strokeWidth/2))
		                        			);
                                    };
                                })
                                .duration($scope.configuration.transitions.arc)
                                .each("end",function(){
                                	$scope.previousData = angular.copy(arrangedData);
                                });
                paths.remove();
                $scope._updateLabels(arrangedData[0]);
        	};

        	$scope._prepareData = function(data){
        		if($scope.previousData.length > $scope.configuration.numberOfGauge){
        			$scope.previousData = $scope.previousData.slice(0,$scope.configuration.numberOfGauge);
        		}
    			if(typeof data === 'object'){
    				if(data.length === $scope.configuration.numberOfGauge){
    					return data;
    				}
    				else{
    					var tmp = angular.copy($scope.previousData);
    					for(var i = 0; i < data.length; i++){
    						tmp.unshift(data);
    					}
    					tmp = tmp.slice(0,$scope.configuration.numberOfGauge);
        				return tmp;
    				}
    			}
    			else{
    				var tmp = angular.copy($scope.previousData);
    				tmp.unshift(data);
    				tmp = tmp.slice(0,$scope.configuration.numberOfGauge);
    				return tmp;
    			}
        	};

        	$scope._updateLabels = function(data){
        		if($scope.configuration.label.display){
            		$scope.widget.select('.ui-dashboard-gauge-middle-label').select('text')
            			.attr('opacity',0.2)
	                    .transition()
	                        .duration($scope.configuration.transitions.label)
	                        .attr('opacity',1)
	                        .text($scope.configuration.label.format(data))
                    if($scope.configuration.label.symbol.display){
                    	$scope.widget.select('.ui-dashboard-gauge-middle-label-symbol').select('text')
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
	                    .attr('height',$scope.configuration.height+($scope.configuration.title.display ? $scope.configuration.title.fontsize*2:0));

	            if($scope.configuration.title.display){
	            	//Setting title
	            	$scope.widget.append('g')
	            		.attr('class','ui-dashboard-gauge-title')
	            		.append('text')
	            			.text($scope.configuration.title.value)
	            			.attr('x',$scope.configuration.width/2)
	            			.attr('y',$scope.configuration.height+$scope.configuration.title.fontsize)
	            			.attr('opacity',$scope.configuration.title.opacity)
	            			.attr('font-size',$scope.configuration.title.fontsize+'px')
	            			.attr('fill',$scope.configuration.title.color)
	            			.style('text-anchor','middle');

	            }
	            if($scope.configuration.background.display){
			        //Setting background
			        $scope.widget.append('g')
	                    .append('path')
	                        .attr('d',ArcService.computeArc(
	                        	0,
	                        	$scope.configuration.amplitude,
	                        	$scope.configuration.max,
	                        	$scope.configuration.max,
	                        	$scope.configuration.width,
	                        	$scope.configuration.height,
	                        	$scope.configuration.radius - $scope.configuration.strokeWidth/2
	                        	))
	                        .attr('opacity',$scope.configuration.background.opacity)
	                        .attr('fill','none')
	                        .attr('transform', ArcService.computeRotation(
	                        	$scope.configuration.startAngle,
	                        	$scope.configuration.width,
	                        	$scope.configuration.height
	                        	))
	                        .attr('stroke',$scope.configuration.background.color)
	                        .attr('stroke-width',$scope.configuration.strokeWidth);
                }
	            if($scope.configuration.border.display){
	                //Setting border
	                $scope.widget.append('g')
                        .append('path')
                            .attr('d',ArcService.computeArc(
	                        	0,
	                        	$scope.configuration.amplitude,
	                        	$scope.configuration.max,
	                        	$scope.configuration.max,
	                        	$scope.configuration.width,
	                        	$scope.configuration.height,
	                        	$scope.configuration.radius + $scope.configuration.border.strokeWidth/2
	                        	))
                            .attr('opacity',$scope.configuration.border.opacity)
                            .attr('fill','none')
                            .attr('transform', ArcService.computeRotation(
                            	$scope.configuration.startAngle,
                            	$scope.configuration.width,
                            	$scope.configuration.height
                            	))
                            .attr('stroke',$scope.configuration.border.color)
                            .attr('stroke-width',$scope.configuration.border.strokeWidth);
	            }
	            if($scope.configuration.label.display){
	                //Middle label
	                $scope.widget.append('g')
                        .attr('class','ui-dashboard-gauge-middle-label')
                        .append('text')
                            .text($scope.configuration.label.format(0))
                            .attr('x',$scope.configuration.width/2)
                            .attr('y',$scope.configuration.height/2)
                            .attr('opacity',$scope.configuration.label.opacity)
                            .attr('font-size', $scope.configuration.label.fontsize + 'px')
                            .attr('fill',$scope.configuration.label.color)
                            .style('text-anchor', 'middle');
                    if($scope.configuration.label.symbol.display){
	            		$scope.widget.append('g')
	            			.attr('class','ui-dashboard-gauge-middle-label-symbol')
	            			.append('text')
	                            .text($scope.configuration.label.symbol.format(0))
	                            .attr('x',$scope.configuration.width/2)
	                            .attr('y',$scope.configuration.height/2 + $scope.configuration.label.fontsize)
	                            .attr('opacity',$scope.configuration.label.symbol.opacity)
	                            .attr('font-size', $scope.configuration.label.symbol.fontsize+'px')
	                            .attr('fill',$scope.configuration.label.symbol.color)
	                            .style('text-anchor', 'middle');
                    }
	            }

	            //Main widget content
                if($scope.configuration.thresholds.aboveGauge){
                	$scope.widget.append('g')
                    	.attr('class','ui-dashboard-gauge-container');
                }
                if($scope.configuration.thresholds.display){
	                //Display thresholds
	                $scope.widget.append('g')
		                    .attr('class','ui-dashboard-gauge-threshold')
	                angular.forEach($scope.configuration.thresholds.values,function(threshold){
		                $scope.widget.select('.ui-dashboard-gauge-threshold')
		                    .append('path')
		                        .attr('d',ArcService.computeArc(
		                        	($scope.configuration.amplitude * (threshold/$scope.configuration.max)) - $scope.configuration.thresholds.amplitude/2,
		                        	($scope.configuration.amplitude * (threshold/$scope.configuration.max)) + $scope.configuration.thresholds.amplitude/2,
		                        	$scope.configuration.max,
		                        	$scope.configuration.max,
		                        	$scope.configuration.width,
		                        	$scope.configuration.height,
		                        	$scope.configuration.radius - $scope.configuration.strokeWidth/2
		                        	))
		                        .attr('fill','none')
		                        .attr('transform', ArcService.computeRotation(
	                            	$scope.configuration.startAngle,
	                            	$scope.configuration.width,
	                            	$scope.configuration.height
	                            	))
		                        .attr('opacity',$scope.configuration.thresholds.opacity)
		                        .attr('stroke',$scope.configuration.thresholds.color)
		                        .attr('stroke-width',$scope.configuration.thresholds.strokeWidth);
		            });
	            }
	            //Main widget content
                if(!$scope.configuration.thresholds.aboveGauge){
                	$scope.widget.append('g')
                    	.attr('class','ui-dashboard-gauge-container');
                }
	        }

	        $scope.init();

	        $scope.$watch('configuration',function(newVal,oldVal){
	        	$scope.configuration.update(newVal);
	        	return $scope.init();
	        });
            $scope.$watch('data', function(newVals, oldVals) {
				return $scope.draw(newVals);
			});
        }
    };
}]);