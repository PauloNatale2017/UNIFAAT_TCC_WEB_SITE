
var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var path = "";
var urlExternal = "https://localhost:5001/api/";

app.controller("CtrlLogin", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;
        path = $window.location.origin;

        $scope.loginUrlEndPoint = function () {

            $scope.Login.usuario = "paulo";
            $scope.Login.senha = "741852";
            var model = {
                User: $scope.Login.usuario,
                Password: $scope.Login.senha
            };
            var loginUrlEndPoint = urlExternal + "external/externalusers";

            $http.post(loginUrlEndPoint, model).then(function (response)
            {
                if (response.status === 200)
                {        
                    if (response.data === "null") {
                        alert("USUARIO OU SENHA INCORRETOS");
                    } else {
                        $window.location = "https://localhost:5661/Home/Authenticate";//path + "/Index";
                    }                
                       
                } else {
                    alert("USUARIO NÂO AUTHENTICADO");
                }
                
            });
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