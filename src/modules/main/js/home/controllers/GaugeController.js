define([
    'angular',
    'main/home/HomeApp'
], function(ng,HomeApp){

    HomeApp.controller('GaugeController',['$scope','$timeout',function($scope,$timeout){
        $scope.formatLabel = function(value){
            return value;
        };

        $scope.formatSymbol = function(value){
            return '%';
        };

        $scope.formatLabel2 = function(value){
            return value+"$";
        };

        $scope.defaultConfiguration = {};

        $scope.miniGaugeConfiguration = {
            radius : 20,
            strokeWidth : 4,
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
                display : false
            }
        };

        $scope.gaugeConfiguration = {
            max : 100,
            radius : 90,
            startAngle : -90,
            amplitude : 180,
            strokeWidth : 25,
            border : {
                color : '#EA4F69',
                strokeWidth: 4
            },
            background : {
                display : false
            },
            label : {
                format : $scope.formatLabel,
                symbol : {
                    format : $scope.formatSymbol
                }
            },
            thresholds : {
                display : false
            },
            colors : ['#00CED1','#1E90FF','#4682B4','#191970'],
            transitions : {
                arc : 100,
                label : 1000
            }
        };

        $scope.gaugeConfiguration2 = {
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
                    display : false
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
            },
            gauge2 : {
                expanded : true,
                code : {
                    expanded : false
                }
            },
            multi : {
                expanded : true,
                code : {
                    expanded : false
                }
            }
        };

        $scope.defaultData = 0;
        $scope.data = 0;
        $scope.data2 = 0;

        $scope.multiData = [$scope.defaultData,$scope.data,$scope.data2];
        $scope.multiConf = [$scope.defaultConfiguration,$scope.gaugeConfiguration,$scope.gaugeConfiguration2];

        $scope.updateData = function(){
            $timeout(function(){
                $scope.defaultData = Math.floor(Math.random()*100);
                $scope.data = Math.floor(Math.random()*100);
                $scope.data2 = Math.floor(Math.random()*5000);
                $scope.multiData = [$scope.defaultData,$scope.data,$scope.data2];
                $scope.updateData();
            },2500);
        };

        $scope.updateData();
    }]);

});