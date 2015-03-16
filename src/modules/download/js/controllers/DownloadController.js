define([
	'download/DownloadApp'
],function(DownloadApp){

	DownloadApp.controller('DownloadController',['$scope','localeService',function($scope,localeService){
		$scope.text = localeService.data.download;
	}]);
});