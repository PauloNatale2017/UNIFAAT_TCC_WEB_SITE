﻿var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var token = "";
var log = [];
var GoogleMaps;
var data = [];
var mapa;
var marker;
var infowindow;
var urlExternal = "http://localhost:5001/api/";


app.controller("CtrlVagas", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;

        blockUI.start();

       

        $scope.SendEmail = function (idVaga, IdUsuario, _email) {

            var path = window.location.origin;

            var request = {
                "VagaId": idVaga,
                "UsuarioId": IdUsuario,
                "Email": _email
            };

            console.log(request);

            var dados = JSON.stringify(request);

            $http.post(path + "/Home/EnviarEmail?Email=" + _email + "&IdUsuario=" + IdUsuario + "&VagaId=" + idVaga).then(function (response) {
                if (response.status === 200) {
                    if (response.data === "null") {
                        alert("RETORNO DO REQUEST NULL");
                    } else {
                        if (response.data === true) {
                            blockUI.start("EMAIL ENVIADO COM SUCESSO");
                            setTimeout(function () {
                                blockUI.stop();
                            },3000);
                        }
                        
                    }

                } else {
                    alert("USUARIO NÃO AUTHENTICADO");
                }
            });
        };


        $scope.Enviar = function (idVaga, IdUsuario, _email) { 

            var path = window.location.origin;

            var request = {
                //"VagaId": idVaga,
                //"UsuarioId": IdUsuario,
                "Email": _email
            };

            $http.post(path + "/Home/EnviarEmail", request).then(function () {
                    
            });

            alert("CANDIDATURA ENVIADA COM SUCESSO");
        };

        $scope.Alert = function () {
           

            var loginUrlEndPoint = urlExternal + "external/externalvitimasbasic";

            $http.get(loginUrlEndPoint).then(function (response) {
                if (response.status === 200) {
                    if (response.data === "null") {
                        alert("RETORNO DO REQUEST NULL");
                    } else {
                        $scope.CadastroBasicoVitimas = response.data;                       
                        console.log(response.data);
                    }

                } else {
                    alert("USUARIO NÂO AUTHENTICADO");
                }
            });



        };

        $scope.GetVagas = function () {
          
            var loginUrlEndPoint = urlExternal + "external/externalvagas";

            $http.get(loginUrlEndPoint).then(function (response) {
                if (response.status === 200) {
                    if (response.data === "null") {
                           alert("USUARIO OU SENHA INCORRETOS");
                    } else {
                        $scope.DadosVagas = response.data;
                        $scope.TotaDeVagas = response.data.length;

                        if (response.data.length <= 0) {
                            $scope.hiddenStyle = "hidden";
                        } else {
                            $scope.hiddenStyle = "visible";
                            
                        }
                        console.log(response.data);
                    }

                } else {
                    alert("USUARIO NÂO AUTHENTICADO");
                }
            });
        };

        $scope.GetVagas();


    }
]);