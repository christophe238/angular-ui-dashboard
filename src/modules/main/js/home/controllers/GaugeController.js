define([
    'angular',
    'main/home/HomeApp'
], function(ng,HomeApp){

    HomeApp.controller('GaugeController',['$scope','$timeout',function($scope,$timeout){
        $scope.formatLabel = function(value){
            return value;
        };

        $scope.formatSymbol = function(value){
            return '$';
        };

        $scope.formatLabel2 = function(value){
            return value;
        };

        $scope.defaultConfiguration = {};

        $scope.miniGaugeConfiguration = {
            radius : 20,
            strokeWidth : 4,
            max : 1000,
            colors : d3.scale.category10().range(),
            background : {
                strokeWidth : 4
            },
            border : {
                display : false
            },
            label : {
                fontsize : 10
            },
            thresholds : {
                display : false,
                values : [100,200,300,400,500,600,700,800,900]
            }
        };

        $scope.gaugeConfiguration = {
            max : 5000,
            radius : 90,
            startAngle : -160,
            amplitude : 250,
            numberOfGauge : 3,
            initialValues : [200,1700],
            strokeWidth : 10,
            radiusRule : {
                apply : true,
                rule : function(d,i,ir,iw){
                    return ir - (iw)*i - i*2;
                }
            },
            strokeWidthRule : {
                apply : true,
                rule : function(d,i,iw){
                    return iw;
                }
            },
            opacityRule : {
                apply : true,
                rule : function(d,i){
                    return 1 - i*0.2;
                }
            },
            label : {
                fontsize : 32,
                format : $scope.formatLabel2,
                symbol : {
                    format : $scope.formatSymbol
                }
            },
            background : {
                color : 'darkgrey'
            },
            border : {
                display : false
            },
            colors : ['#EA4F69','#2E69DB'],
            thresholds : {
                values : [2300],
                aboveGauge : true
            },
            transitions : {
                arc : 2000,
                label : 100
            },
            title: {
                display : true,
                value : $scope.text.gauge.gauge2Title
            }
        };

        $scope.gauges = {
            default : {
                expanded : true,
                code : {
                    expanded : false
                }
            },
            gauge1 : {
                expanded : true,
                code : {
                    expanded : false
                }
            }
        };

        $scope.miniData = 0;
        $scope.defaultData = 0;
        $scope.data = 0;

        $scope.updateData = function(){
            $timeout(function(){
                $scope.miniData = Math.floor(Math.random()*1000);
                $scope.defaultData = Math.floor(Math.random()*100);
                $scope.data = Math.floor(Math.random()*5000);
                $scope.updateData();
            },2500);
        };

        $scope.updateData();
    }]);

});