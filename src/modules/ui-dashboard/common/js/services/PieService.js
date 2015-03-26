angular.module('ui.dashboard.CommonApp').service('ui.dashboard.PieService',['ui.dashboard.ArcService',function(ArcService){
	var PieService = function(){};
	var that = new PieService();
	PieService.prototype.getLabelTranslation = function(d,config){
		var size;
		if(config.slice.label.position === 'out'){
			size = config.radius + config.slice.hover.growBy + config.legend.line.size;				
		}
		else{
			size = config.radius/2;
		}
		return 'translate('+
			Math.cos(((d.startAngle+d.endAngle+d.padAngle*2 - Math.PI)/2)) * (size) + ',' +
			Math.sin((d.startAngle+d.endAngle+d.padAngle*2 - Math.PI)/2) * (size) + ')';
	};

	PieService.prototype.getTextAnchor = function(d){
		return (that.getMiddle(d) < Math.PI) ? 'beginning':'end';
	};

	PieService.prototype.getMiddle = function(d){
		return (d.startAngle+d.endAngle)/2+d.padAngle*4;
	};

	PieService.prototype.getLabelValueDY = function(d){
		var middle = that.getMiddle(d);
		if(middle < Math.PI/2){
			return 0;
		}
		else if(middle > Math.PI/2 && middle < Math.PI*1.5){
			return 10;
		}
		else if(middle > Math.PI*1.5 && middle < Math.PI*2){
			return -10;
		}
	};

	PieService.prototype.getLabelNameDY = function(d){
		var middle = that.getMiddle(d);
		if(middle < Math.PI/2){
			return 10;
		}
		else if(middle > Math.PI/2 && middle < Math.PI*1.5){
			return 20;
		}
		else if(middle > Math.PI*1.5 && middle < Math.PI*2){
			return 0;
		}
	};

	PieService.prototype.getLabelRotation = function(d){
		return ArcService.computeRotation(
			ArcService.toDegrees(that.getMiddle(d)),
			0,
			0
		);
	};

	PieService.prototype.drawLabels = function(widget, pieData,config){		
		if(config.slice.label.position === 'out'){
			var lines = widget.select('.label-group').selectAll('line');

			lines.data(pieData)
				.enter()
					.append('line')
						.attr('class','label-line')
						.attr('x1', 0)
						.attr('x2', 0)
						.attr('y1', - config.radius - config.slice.hover.growBy)
						.attr('y2', - config.radius - config.slice.hover.growBy - config.legend.line.size)
						.attr('stroke',config.legend.line.color)
						.attr('transform', function(d) {
							return that.getLabelRotation(d);
						})
			lines.transition()
				.duration(config.transitions.arc)
				.attr('transform', function(d) {
					return that.getLabelRotation(d);
				});
		}

		var valueLabels = widget.select('.label-group').selectAll('text.'+config.slice.label.value.class);

		valueLabels.data(pieData)
			.enter()
				.append('text')
					.attr('class',config.slice.label.value.class)
					.attr('transform', function(d){
						return that.getLabelTranslation(d,config);
					})
					.attr('dy',that.getLabelValueDY)
					.attr('text-anchor',that.getTextAnchor)
					.text(config.slice.label.value.format);
		valueLabels.transition()
			.duration(config.transitions.arc)
			.text(config.slice.label.value.format)
			.attr('dy',that.getLabelValueDY)
			.attr('text-anchor',that.getTextAnchor)
			.attr('transform', function(d){
				return that.getLabelTranslation(d,config);
			});

		var nameLabels = widget.select('.label-group').selectAll('text.'+config.slice.label.name.class);

		nameLabels.data(pieData)
			.enter()
				.append('text')
					.attr('class',config.slice.label.name.class)
					.attr('transform', function(d){
						return that.getLabelTranslation(d,config);
					})
					.attr('dy',that.getLabelNameDY)
					.attr('text-anchor',that.getTextAnchor)
					.text(config.slice.label.name.format);
		nameLabels
			.transition()
			.duration(config.transitions.arc)
			.attr('dy',that.getLabelNameDY)
			.attr('text-anchor',that.getTextAnchor)			
			.text(config.slice.label.name.format)
			.attr('transform', function(d){
				return that.getLabelTranslation(d,config);
			});
	};
	return new PieService();
}]);