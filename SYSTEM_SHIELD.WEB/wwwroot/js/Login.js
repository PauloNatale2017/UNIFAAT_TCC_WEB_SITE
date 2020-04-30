
var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var token = "";

app.controller("CtrlLogin", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;
        //Bloqueo de UI
       

        $scope.ChamaApiLogin = function () {
            var model = {
                User: $scope.Login.usuario,
                Password: $scope.Login.senha,
            };

            $http.post("/api/login/loginUsers", JSON.stringify(model)).then(function (response) {
                var dados = response.data;
                if (dados === "A")
                    $window.location = "https://localhost:5001/Index";

                alert("Usuario inexistente.");
            });
        };



    }]);