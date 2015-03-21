angular.module('ui.dashboard.DonutApp').factory('ui.dashboard.DonutConfiguration',function(){

	var DonutConfiguration = function(configuration){
		this.id = this._generateID();

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
		this.width = this.radius*2 + this.strokeWidth;
		this.height = this.radius*2 + this.strokeWidth;
	};

	return DonutConfiguration;
});