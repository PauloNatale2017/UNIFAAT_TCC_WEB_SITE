
var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var token = "";




app.controller("CtrlGeo", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {
        
        Obj = $scope;

        //blockUI.start("....CARREGANDO INFORMAÇÕES....");

        $scope.GeoReferenciaGet = function () {

            var data = {
                "endereco": $("#Geo_Complemento").val()
            };

            $http.post("/api/Users/location?endereco=" + $("#Geo_Complemento").val()).then(function (response) {
                var dados = response.data;
                $scope.dadosPie = dados;               
            });
        };

    

 }]);