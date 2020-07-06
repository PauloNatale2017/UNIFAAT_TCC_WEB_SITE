
var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var token = "";
var Lista = [];
var urlExternal = "http://localhost:5001/api/";

app.controller("CtrlUsuarios", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;

        $scope.CadastroBasicos = function () {

            var path = window.location.origin;
            var loginUrlEndPoint = urlExternal + "vitimas/cadastrosbasicos";
            blockUI.start("CARREGANDO...");

            $http.get(loginUrlEndPoint).then(function (response) {
                if (response.status === 200) {
                    if (response.data === "null") {
                        alert("RETORNO DO REQUEST NULL");
                    }
                    else {

                        $scope.VitimasLits = response.data.vitimabasic;
                      

                    }

                } else {
                    alert("USUARIO NÂO AUTHENTICADO");
                }
            });
            blockUI.stop();
        };

        $scope.BuscaInformacoes = function (id) {

            var path = window.location.origin;
            var loginUrlEndPoint = urlExternal + "vitimas/buscaocorrencias";

            var request = {
                "IdCadastroBasico": "" + id + ""
            };

            $http.post(loginUrlEndPoint, request).then(function (response) {
                if (response.status === 200) {
                    if (response.data === "null") {
                        alert("NÃO EXISTEM INFORMAÇÕES COMPLEMENTARES CADASTRADAS");
                    } else {
                        $scope.Complementar = response.data;
                        var IdUsuario = response.data.IdCadastroBasico;
                        document.getElementById("#TipoViolencia_" + IdUsuario).value = response.data.TipoViolencia;
                        document.getElementById("#DiaOcorrido_" + IdUsuario).value = response.data.DiaOcorrido;
                        document.getElementById("#LocalOcorrido_" + IdUsuario).value = response.data.LocalOcorrido;
                        document.getElementById("#Testemunha_" + IdUsuario).value = response.data.Testemunha;
                        document.getElementById("#VinculocomAgressor_" + IdUsuario).value = response.data.VinculocomAgressor;
                        document.getElementById("#NumeroBO_" + IdUsuario).value = response.data.NumeroBO;

                        console.log(response.data);
                        blockUI.stop();
                    }

                } else {
                    alert("ERRO INESPERADO");
                }
            });

        };

        $scope.CadastroBasicos();

       

    }]);