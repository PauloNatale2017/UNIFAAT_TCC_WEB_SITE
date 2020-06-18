
var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var token = "";
var urlExternal = "http://localhost:5001/api/";

app.controller("CtrlRelatorios", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;

        $scope.Filtro1 = [{ model: "PARCEIROS", color: "red" }];
        $scope.Filtro2 = [{ model: "CIDADE", color: "green" }];
        $scope.Filtro3 = [{ model: "OCORRENCIA", color: "blue" }];
        $scope.Filtro4 = [{ model: "VITIMAS", color: "white" }];

        $scope.VitimaLits = [{}]


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

                        $scope.basic = response.data.vitimabasic;
                        $scope.complementar = response.data.complementar;
                        $scope.ocorrencias = response.data.ocorrencias;
                        $scope.filhos = response.data.filhos;
                        $scope.Idoso = response.data.Idoso;
                        $scope.sos = response.data.sos;
                        $scope.cadastrocompleto = response.data.cadastrocompleto;

                        //Id: 1
                        //IdCadastroBasico: 2006
                        //IdCadastroComplementar: 2004
                        //IdCadastroDeOcorrencia: 1007
                        //IdCadastroFilhos: 1003
                        //IdCadastroIdosos: 1003
                        //IdCadastroSOS: 1006

                        $scope.VitimaLits = $scope.basic;

                        $scope.Lista = [];

                        for (var i = 0; i < $scope.cadastrocompleto.length; i++) {

                            var retornoFilterBasico = $scope.basic.filter(function (values) { return values.id === $scope.cadastrocompleto[i].IdCadastroBasico; });
                            $scope.Cadbasic = retornoFilterBasico;

                            var retornoFilterComplemento = $scope.complementar.filter(function (values) { return values.id === $scope.cadastrocompleto[i].IdCadastroComplementar; });
                            $scope.complemento = retornoFilterComplemento;

                            var retornoFilterOcorrencia = $scope.ocorrencias.filter(function (values) { return values.id === $scope.cadastrocompleto[i].IdCadastroDeOcorrencia; });
                            $scope.Ocorre = retornoFilterOcorrencia.NumeroBO;

                            var retornoFilterFilhos = $scope.filhos.filter(function (values) { return values.IdCadastroBasico === $scope.cadastrocompleto[i].IdCadastroBasico; });
                            $scope.qtdeFilhos = retornoFilterFilhos.length;

                            var retornoFilterIdoso = $scope.Idoso.filter(function (values) { return values.IdCadastroBasico === $scope.cadastrocompleto[i].IdCadastroBasico; });
                            $scope.qtdeIdoso = retornoFilterIdoso.length;

                            var retornoFilterSos = $scope.sos.filter(function (values) { return values.IdCadastroBasico === $scope.cadastrocompleto[i].IdCadastroBasico; });
                            $scope.qtdeSOS = retornoFilterSos.length;

                            var AddList = {
                                NomeCompleto : $scope.Cadbasic.NomeCompleto,
                                Ocorre : $scope.Ocorre,
                                qtdeFilhos : $scope.qtdeFilhos,
                                qtdeIdoso :  $scope.qtdeIdoso,
                                qtdeSOS : $scope.qtdeSOS
                            };

                            $scope.Lista.push(AddList);

                          };

                        console.log(response.data);

                    }

                } else {
                    alert("USUARIO NÂO AUTHENTICADO");
                }
            });
            blockUI.stop();
        };

        $scope.CadastroBasicos();

        $scope.Pdf = function () {


        };


    }]);