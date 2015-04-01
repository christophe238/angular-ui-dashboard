angular.module('ui.dashboard.DonutApp').factory('ui.dashboard.DonutConfiguration',function(){

	var DonutConfiguration = function(configuration){
		this.id = this._generateID();
		this.width = 300;
		this.height = 300;
		this.startAngle = 5;
		this.strokeWidth = 30;
		this.amplitude = 350;
		this.padAngle = 1;
		this.radius = 90;
		this.opacity = 1;
		//blue scale : ["#3399FF", "#5DAEF8", "#86C3FA", "#ADD6FB", "#D6EBFD"];
		this.colors = d3.scale.category10().range();
		//Sorting order : null, 'ascending', 'descending'
		this.sort = null;
		this.slice = {
			label : {
				//Label position outside of the slice : 'out', centered in slice : 'in'
				position : 'out',
				display : true,				
				line : {
					display : true,
					size : 10,
					color : 'gray',
					class : 'ui-dashboard-donut-label-line'
				},
				value : {
					fontsize : 12,
					color : 'gray',
					class : 'ui-dashboard-donut-label-value',
					format : function(value){
				        return value.data;
				    }
				},
				name : {
					topOffset : 2,
					fontsize : 11,
					color : 'lightgrey',
					class : 'ui-dashboard-donut-label-name',
					format : function(value){
				        return '';
				    }
				}
			},
			hover : {
				apply : true,
				callback : function(value){},
				growBy : 5
			},
			click : function(value){}
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
			format : function(values){ return d3.sum(values); },
			opacity : 1,
			symbol : {
				display : true,
				fontsize : 20,
				color : 'black',
				format : function(values){ return ''; },
				opacity : 1
			}
		};
		this.title = {
			display : true,
			fontsize : 24,
			value : '',
			color : 'black',
			opacity : 1
		};
		this.tooltip = {
			display : true,
			format : function(value) {
				return "<strong>Value:</strong> <span style='color:red'>" + value.data + "</span>";
			}
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
	};

	DonutConfiguration.prototype.getColor = function(index){
		return (this.colors[index]) ? this.colors[index]:this.colors[0];
	};

	return DonutConfiguration;
});