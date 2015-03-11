define([
	'gauge/GaugeApp'
],function(GaugeApp){

	GaugeApp.factory('GaugeConfiguration',function(){

		var GaugeConfiguration = function(configuration){

			this.id = this._generateID();
			this.max = 100;
			this.decimal = 2;
			this.numberOfGauge = 1;
			this.startAngle = -160;
			this.amplitude = 300;
			this.strokeWidth = 20;
			this.radius = 90;
			this.colors = ['#FFFF00','#FF8C00','#FF4500','#FF0000'];
			this.thresholds = [25,55,75];
			this.background = {
					display : true,
					color : '#F6F6F6'
				};
			this.border = {
					display : true,
					color : 'lightgrey',
					strokeWidth : 2
				};
			this.label = {
				display : true,
				fontsize : 32,
				color : 'black',
				format : function(d){ return d; },
				symbol : {
					display : true,
					fontsize : 20,
					color : 'black',
					format : function(d){ return ''; }
				}
			};
			this.title = {
				display : false,
				fontsize : 24,
				value : '',
				color : 'black'
			}
			this.transitions = {
				arc : 1000,
				label : 500
			}

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
			this.width = this.radius*2 + this.strokeWidth;
			this.height = this.radius*2 + this.strokeWidth;
		};

		GaugeConfiguration.prototype.getColor = function(value){
			for(var i = 0; i < this.thresholds.length; i++){
				if(value < this.thresholds[i]){
					if(this.colors.length >= i+1){
						return this.colors[i];
					}
				}
			}
			return this.colors[this.colors.length-1];
		};

		return GaugeConfiguration;
	});
});