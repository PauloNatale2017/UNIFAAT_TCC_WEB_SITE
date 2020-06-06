
var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var path = "";
var urlExternal = "https://localhost:5001/api/";

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

            $window.location = "https://localhost:5661/Home/Authenticate";
        };

        $scope.ChamaApiLogin = function () {
            var model = {
                User: $scope.Login.usuario,
                Password: $scope.Login.senha
            };

            $http.post("/api/login/loginUsers", JSON.stringify(model)).then(function (response) {
                var dados = response.data;
                if (dados === "A")
                    $window.location = path+"/Index";

                alert("Usuario inexistente.");
            });
        };



    }]);