angular.module('ui.dashboard.DonutApp').directive('donut',['ui.dashboard.DonutConfiguration','ui.dashboard.ArcService',function(DonutConfiguration,ArcService){
	return {
		restrict: 'E',
		scope: {
			configuration: '=',
			data: '='
		},
		link: function($scope,element,attrs){
			$scope.configuration = new DonutConfiguration($scope.configuration || {});

			$scope.previousData = [];
			angular.forEach($scope.data,function(){
				$scope.previousData.push(0);
			});

			$scope.draw = function(data){			
				var paths = $scope.widget.select('.donut-container').selectAll('path')
				
				var arc = ArcService.d3Arc($scope.configuration.radius, $scope.configuration.strokeWidth);
				var arcOver = ArcService.d3Arc($scope.configuration.radius + $scope.configuration.slice.hover.growBy, $scope.configuration.strokeWidth + $scope.configuration.slice.hover.growBy);
				
				var pie = ArcService.d3Pie($scope.configuration.amplitude,$scope.configuration.padAngle,$scope.configuration.sort);

				var previousPie = pie($scope.previousData);

				if($scope.configuration.legend.display){
					$scope.drawLabels(pie(data));
				}

				paths.data(pie(data),function(d,i){ return d+Math.random()/10000; })
                	.enter()
                        .append('path')
                            .attr('fill',function(d,i){
                            	return $scope.configuration.getColor(i);
                            	})
                            .attr('opacity',$scope.configuration.opacity)
                            .attr('transform', 
                            	ArcService.computeRotation(
	                            	$scope.configuration.startAngle,
	                            	$scope.configuration.width,
	                            	$scope.configuration.height
                            	) + ' ' + 
                            	ArcService.translate(
	                            	$scope.configuration.width,
                    				$scope.configuration.height
	                            ))
                            .on('mouseover', function(d) {
				                if($scope.configuration.slice.hover.apply){
				                	$scope.configuration.slice.hover.callback(d);
					                d3.select(this).transition()
					                    .duration(200)
					                    .attr("d", arcOver);
				                }
				            })
				            .on('mouseout', function(d) {
				            	if($scope.configuration.slice.hover.apply){
					                d3.select(this).transition()
					                    .duration(200)
					                    .attr("d", arc);
					            }
				            })
				            .on('click',$scope.configuration.slice.click)
                            .transition()
                                .attrTween('d',function(d,i){
                                	//TODO : Move it to previousPie[i]
                                    var interpolate = d3.interpolate({startAngle:previousPie[i].startAngle, endAngle:previousPie[i].endAngle}, d);
									return function(t) {
										return arc(interpolate(t));
									}
                                })
                                .duration($scope.configuration.transitions.arc)
                                .each("end",function(){
                                	$scope.previousData = angular.copy(data);
                                });				
                paths.remove();
			};
			
			$scope.drawLabels = function(pieData){
				var lines = $scope.widget.select('.label_group').selectAll('line');

				lines.data(pieData)
					.enter()
						.append('line')
							.attr('x1', 0)
							.attr('x2', 0)
							.attr('y1', - $scope.configuration.radius - $scope.configuration.slice.hover.growBy)
							.attr('y2', - $scope.configuration.radius - $scope.configuration.slice.hover.growBy - $scope.configuration.legend.line.size)
							.attr('stroke',$scope.configuration.legend.line.color)
							.attr('transform', function(d) {
								return $scope._getLabelRotation(d);
							})
				lines.transition()
					.duration($scope.configuration.transitions.arc)
					.attr('transform', function(d) {
						return $scope._getLabelRotation(d);
					});
			};

			$scope._getLabelRotation = function(d){
				return ArcService.computeRotation(
					ArcService.toDegrees((d.startAngle+d.endAngle)/2+d.padAngle*4),
					0,
					0
				);
			};

			$scope._sumData = function(data){				
				return $scope._sumDataBefore(data,data.length);
			};

			$scope._sumDataBefore = function(data,index){
				var sum = 0;
				angular.forEach(data,function(d,i){
					if(i < index){
						sum += d;
					}
				});
				return sum;
			};

			$scope.init = function(){
				$scope.widget = d3.select(element[0]);
				$scope.widget.selectAll('*').remove();

				var arc = ArcService.d3Arc($scope.configuration.radius, $scope.configuration.strokeWidth);

				$scope.widget = $scope.widget.append('svg')
					.attr('id',$scope.configuration.id)
					.attr('width',$scope.configuration.width)
					.attr('height',$scope.configuration.height);
				
				$scope.widget.append('g')
  					.attr("class", "label_group")
  					.attr("transform", ArcService.translate(
                    	$scope.configuration.width,
                    	$scope.configuration.height
                    ));

				if($scope.configuration.title.display){
	            	//Setting title
	            	$scope.widget.append('g')
	            		.attr('class','donut-title')
	            		.append('text')
	            			.text($scope.configuration.title.value)
	            			.attr('x',$scope.configuration.width/2)
	            			.attr('y',$scope.configuration.height + $scope.configuration.title.fontsize)
	            			.attr('opacity',$scope.configuration.title.opacity)
	            			.attr('font-size',$scope.configuration.title.fontsize+'px')
	            			.attr('fill',$scope.configuration.title.color)
	            			.style('text-anchor','middle');

	            }
	            if($scope.configuration.border.display){
	                //Setting border
	                var borderArc = ArcService.d3Arc($scope.configuration.radius+$scope.configuration.border.strokeWidth,$scope.configuration.border.strokeWidth)
	                $scope.widget.append('g')
                        .append('path')
                            .attr('d',borderArc({startAngle:0, endAngle:ArcService.toRadians($scope.configuration.amplitude)}))
                            .attr('opacity',$scope.configuration.border.opacity)
                            .attr('fill',$scope.configuration.border.color)
                            .attr('transform', 
                            	ArcService.computeRotation(
	                            	$scope.configuration.startAngle,
	                            	$scope.configuration.width,
	                            	$scope.configuration.height
                            	) + ' ' + 
                            	ArcService.translate(
	                            	$scope.configuration.width,
                    				$scope.configuration.height
	                            ));
	            }
	            //Main widget content
                $scope.widget.append('g')
                   	.attr('class','donut-container');               
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
	}
}]);