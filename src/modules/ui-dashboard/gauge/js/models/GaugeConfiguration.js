angular.module('ui.dashboard.GaugeApp').factory('ui.dashboard.GaugeConfiguration',function(){

	var GaugeConfiguration = function(configuration){

		this.id = this._generateID();
		this.max = 100;
		this.decimal = 2;
		this.startAngle = -160;
		this.amplitude = 320;
		this.strokeWidth = 20;
		this.radius = 90;
		//START Rules for multiple gauges
		this.initialValues = [];
		this.numberOfGauge = 1;
		this.radiusRule = {
			apply : true,
			rule : function(value,index,initialRadius,initialWidth){
				return initialRadius - index*initialWidth;
			}
		};
		this.multipleColorRule = {
			apply : true
		};
		this.strokeWidthRule = {
			apply : false,
			rule : function(value,index,initialWidth){
				return initialWidth;
			}
		};
		this.opacityRule = {
			apply : false,
			rule : function(value,index){
				return 1;
			}
		}
		//END Rules for multiple gauges
		this.colors = d3.scale.category10().range();
		this.thresholds = {
			display : true,
			values : [10,20,30,40,50,60,70,80,90],
			strokeWidth : 20,
			amplitude : 2,
			opacity : 1,
			color : 'darkgrey',
			aboveGauge : false
		};
		this.background = {
				display : true,
				color : '#F6F6F6',
				opacity : 1
			};
		this.border = {
				display : true,
				color : 'lightgrey',
				strokeWidth : 2,
				opacity : 1
			};
		this.label = {
			display : true,
			fontsize : 32,
			color : 'black',
			format : function(value){ return value; },
			opacity : 1,
			symbol : {
				display : true,
				fontsize : 20,
				color : 'black',
				format : function(value){ return ''; },
				opacity : 1
			}
		};
		this.title = {
			display : false,
			fontsize : 24,
			value : '',
			color : 'black',
			opacity : 1
		};
		this.tooltip = {
			display : true,
			format : function(value) {
				return "<strong>Value:</strong> <span style='color:red'>" + value + "</span>";
			}
		};
		this.transitions = {
			arc : 1000,
			label : 500
		};

		this.update(configuration);
	};

	GaugeConfiguration.prototype._generateID = function(){
	    var id = '';
	    var possible = 'abcdef0123456789';

	    for( var i=0; i < 16; i++ )
	        id += possible.charAt(Math.floor(Math.random() * possible.length));

	    return 'gauge-'+id;
	};

	GaugeConfiguration.prototype._mergeRecursive = function(obj1,obj2){
		for (var p in obj2) {
            try {
                obj1[p] = ( obj2[p].constructor==Object ) ? this._mergeRecursive(obj1[p], obj2[p]) : obj2[p];
            } catch(e) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
	};

	GaugeConfiguration.prototype.update = function(configuration){
		this._mergeRecursive(this,configuration);
		var borderSize = (this.border.display) ? this.border.strokeWidth*2:0;
		this.width = this.radius*2 + this.strokeWidth/2 + borderSize;
		this.height = this.radius*2 + this.strokeWidth/2 + borderSize;
	};

	GaugeConfiguration.prototype.getColor = function(value){
		for(var i = 0; i < this.thresholds.values.length; i++){
			if(value < this.thresholds.values[i]){
				if(this.colors.length >= i+1){
					return this.colors[i];
				}
			}
		}
		return this.colors[this.colors.length-1];
	};

	return GaugeConfiguration;
});