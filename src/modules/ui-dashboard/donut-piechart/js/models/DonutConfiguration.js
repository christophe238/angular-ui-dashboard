angular.module('ui.dashboard.DonutApp').factory('ui.dashboard.DonutConfiguration',function(){

	var DonutConfiguration = function(configuration){
		this.id = this._generateID();
		this.startAngle = 5;
		this.strokeWidth = 30;
		this.amplitude = 350;
		this.radius = 90;
		this.opacity = 1;
		this.colors = ["#3399FF", "#5DAEF8", "#86C3FA", "#ADD6FB", "#D6EBFD"];
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
			colors : ['white'],
			format : function(value){ return value; },
			opacity : 1
		};
		this.title = {
			display : false,
			fontsize : 24,
			value : '',
			color : 'black',
			opacity : 1
		};
		this.transitions = {
			arc : 1000,
			label : 500
		};

		this.update(configuration);
	};

	DonutConfiguration.prototype._generateID = function(){
		var id = '';
	    var possible = 'abcdef0123456789';

	    for( var i=0; i < 16; i++ )
	        id += possible.charAt(Math.floor(Math.random() * possible.length));

	    return 'donut-'+id;
	};

	DonutConfiguration.prototype._mergeRecursive = function(obj1,obj2){
		for (var p in obj2) {
            try {
                obj1[p] = ( obj2[p].constructor==Object ) ? this._mergeRecursive(obj1[p], obj2[p]) : obj2[p];
            } catch(e) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
	};

	DonutConfiguration.prototype.update = function(configuration){
		this._mergeRecursive(this,configuration);
		var borderSize = (this.border.display) ? this.border.strokeWidth*2:0;
		this.width = this.radius*2 + this.strokeWidth + borderSize;
		this.height = this.radius*2 + this.strokeWidth + borderSize;
	};

	DonutConfiguration.prototype.getColor = function(index){
		return (this.colors[index]) ? this.colors[index]:this.colors[0];
	};

	return DonutConfiguration;
});