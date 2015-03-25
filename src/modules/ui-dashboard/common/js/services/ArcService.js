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

    ArcService.prototype.toDegrees = function(radians){
        return (radians*180)/Math.PI;
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

    ArcService.prototype.computeRotation = function(angle, width, height){
        return 'rotate(' + angle + ',' + width/2 + ',' + height/2 + ')';
    };

    ArcService.prototype.translate = function(width,height){
        return 'translate(' + width/2 + ',' + height/2 + ')';
    };

    ArcService.prototype.d3Arc = function(radius,strokeWidth){
        return d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - strokeWidth);
    };

    ArcService.prototype.d3Pie = function(amplitude,padAngle,sorting){
        var sort = null;
        if(sorting === 'ascending'){
            sort = d3.ascending;
        }
        else if(sorting === 'descending'){
            sort = d3.descending;
        }
        return d3.layout.pie()
            .sort(sort)
            .padAngle(this.toRadians(padAngle))
            .startAngle(0)
            .endAngle(this.toRadians(amplitude))
            .value(function(d){ return d+Math.random()/100000; });
    };
    
    return new ArcService();
});