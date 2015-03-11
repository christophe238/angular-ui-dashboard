define([
    'core/CoreApp',
    'views/core/loading-dots'
],function(CoreApp){

    CoreApp.directive('languageHtml',function(){
        return {
            restrict: 'C',
            compile: function(element,attrs){
            	return element.html(
            		element.html().replace(/>/g,'&gt;')
		            	.replace(/</g,'&lt;')
		            	.replace(/"/g,'&quot;')
            	);
            }
        };
    });

});