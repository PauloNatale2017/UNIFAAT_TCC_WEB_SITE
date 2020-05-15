
var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var token = "";
var log = [];
var GoogleMaps;
var data = [];


app.controller("CtrlMapsInfracoes", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;

        $scope.data = [];

        
        $scope.Cidade = $scope.Cidade_Value;

        blockUI.start("....CARREGANDO INFORMAÇÕES....");

        $scope.InitialiseMaps = function () {
            var mapOptions = {
                center: new google.maps.LatLng(-15.768466, -47.929459),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            blockUI.stop();
        };

         $scope.InitialiseMaps();


        $scope.Config = {
            width: "100%",
            height: "250",
            Type: "doughnut2d"
        };
        $scope.SourcePie = {

            "caption": "TOTAL DE USUARIOS CADASTRADOS POR REGIÃO",
            "subCaption": "",
            "numberPrefix": "$",
            "bgColor": "#ffffff",
            "startingAngle": "310",
            "showLegend": "1",
            "defaultCenterLabel": "",
            "centerLabel": "",
            "centerLabelBold": "1",
            "showTooltip": "0",
            "decimals": "0",
            "theme": "fusion"

        };
        $scope.GrafiPie1 = function () {
            $http.get("/api/Users").then(function (response) {
                var dados = response.data;
                $scope.dadosPie = dados;
                FusionCharts.ready(function () {
                    var chartObj = new FusionCharts({
                        "width": $scope.Config.width,
                        "height": $scope.Config.height,
                        "type": $scope.Config.Type,
                        "renderAt": "chartPie",
                        "dataformat": "json",
                        "dataSource": {
                            "chart": $scope.SourcePie,
                            "data": $scope.dadosPie
                        }
                    });
                    chartObj.render();
                });
            });

            blockUI.stop();
        };


        $scope.GrafiColumn = function () {
            $http.get("/api/Users").then(function (response) {
                var dados = response.data;
                $scope.dadosColumn = dados;

                FusionCharts.ready(function () {
                    var chartObj2 = new FusionCharts({
                        type: 'column2d',
                        renderAt: 'chartColumn',
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: {
                            "chart": {
                                "caption": "TOTAL DE USUARIOS CADASTRADOS DIVIDIDOS POR PERIODO",
                                "subCaption": "",
                                "xAxisName": new Date(),
                                "yAxisName": "",
                                "numberPrefix": "",
                                "theme": "fusion"
                            },
                            "data": $scope.dadosColumn,
                            "trendlines": [{
                                "line": [{
                                    "startvalue": "0",
                                    "valueOnRight": "12",
                                    "displayvalue": new Date()
                                }]
                            }]
                        }
                    });
                    chartObj2.render();
                });

            });

            blockUI.stop();
        };
    
        $scope.GrafiColumn();
        $scope.GrafiPie1();

    }
]);