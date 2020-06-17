
var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var path = "";
var urlExternal = "http://localhost:5001/api/";

app.controller("CtrlLogin", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;
        path = $window.location.origin;

        $scope.loginUrlEndPoint = function () {
           
            var model = {
                User: $scope.Login.usuario,
                Password: $scope.Login.senha
            };
            var loginUrlEndPoint = urlExternal + "external/externalusers";

            $scope.ChamaApiLogin(loginUrlEndPoint);
        };

        $scope.ChamaApiLogin = function (URL) {
            var model = {
                User: $scope.Login.usuario,
                Password: $scope.Login.senha
            };

            $http.post(URL, JSON.stringify(model)).then(function (response) {
                var dados = response.data;
                if (dados.Id > 0) {
                    //$window.location = path + "/Index";
                    $window.location = "https://localhost:5661/Home/Authenticate?IdUsuario=" + JSON.stringify(dados.Id);
                } else {
                    alert("Usuario inexistente.");
                }
               
            });
        };



    }]);