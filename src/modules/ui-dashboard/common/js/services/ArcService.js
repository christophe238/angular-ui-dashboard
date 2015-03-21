angular.module('ui.dashboard.CommonApp').service('ui.dashboard.ArcService',function(){
	var ArcService = function(){};

	ArcService.prototype.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    ArcService.prototype.toRadians = function(degrees){
        return (degrees/180)*Math.PI;
    };

    ArcService.prototype.describeArc = function(x, y, radius, startAngle, endAngle){
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);
        var arcSweep = ((endAngle - startAngle) <= 180) ? 0:1;
        return [
            'M', start.x, start.y,
            'A', radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(' ');
    };

    ArcService.prototype.computeArc = function(startAngle,endAngle,value,max,width,height,radius){
        return this.describeArc(
                width/2,
                height/2,
                radius,
                startAngle,
                endAngle*(value/max)
            );
    };

    ArcService.prototype.computeRotation = function(startAngle, width, height){
        return 'rotate(' + startAngle + ',' + width/2 + ',' + height/2 + ')';
    };

    ArcService.prototype.translate = function(radius,strokeWidth,border){
        var center = (radius + ((strokeWidth) ? strokeWidth/2:0)+ ((border) ? border:0))
        return 'translate(' + center + ',' + center + ')';
    };
    return new ArcService();
});