define([
	'core/CoreApp'
],function(CoreApp){

	CoreApp.service('GaugeUtils',function(){

		var GaugeUtils = function(){};

		GaugeUtils.prototype.computeArc = function(){

		};

		GaugeUtils.prototype.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };

        GaugeUtils.prototype.describeArc = function(x, y, radius, startAngle, endAngle){
            var start = this.polarToCartesian(x, y, radius, endAngle);
            var end = this.polarToCartesian(x, y, radius, startAngle);
            var arcSweep = ((endAngle - startAngle) <= 180) ? 0:1;
            return [
                'M', start.x, start.y,
                'A', radius, radius, 0, arcSweep, 0, end.x, end.y
            ].join(' ');
        };

        GaugeUtils.prototype.computeArc = function(startAngle,endAngle,value,max,width,height,radius){

            return this.describeArc(
                    width/2,
                    height/2,
                    radius,
                    startAngle,
                    -(endAngle - 2*endAngle*(value/max))
                );
        }
		return new GaugeUtils();
	});
});