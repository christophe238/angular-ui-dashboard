angular.module('ui.dashboard.DonutApp').factory('ui.dashboard.PieChartConfiguration',['ui.dashboard.DonutConfiguration',function(DonutConfiguration){

	var PieChartConfiguration = function(configuration){
		this.id = this._generateID();		
		this.amplitude = 360;
		this.colors = ['#3AAB89','#6BD3B4','#A4EDD7','#E0FCF4','#CEECE3'];
		this.update(configuration);
	};

	PieChartConfiguration.prototype = new DonutConfiguration({});

	PieChartConfiguration.prototype._generateID = function(){
		var id = '';
	    var possible = 'abcdef0123456789';

	    for( var i=0; i < 16; i++ )
	        id += possible.charAt(Math.floor(Math.random() * possible.length));

	    return 'pie-chart-'+id;
	};	

	PieChartConfiguration.prototype.update = function(configuration){
		this._mergeRecursive(this,configuration);
		var borderSize = (this.border.display) ? this.border.strokeWidth*2:0;
		this.strokeWidth = this.radius;
		this.width = this.radius*2 + borderSize;
		this.height = this.radius*2 + borderSize;
	};


	return PieChartConfiguration;
}]);