var app = angular.module('App', ['blockUI']);
var Obj;
var token = "";
var log = [];

app.controller("CtrlCadastro", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;
        $scope.Porcentagem = 0;
        $scope.Color = "bg-info"

        $scope.MapsApiKey = "AIzaSyD_A7qfA68qedllHJ19V29EV1yvyJ_CU2U";

        Obj.Cadastro = {
            PF : "",
            PC : "",
            PM : "",
            PR: "",
            DataCadastro: "",
            NumeroCadastrado: "",
            DatadeNascimento: "",
            Escolaridade: "",
            Cidade: "",
            BO: "",
            MP: "",
            Bairro: "",
            EstadoCivil: "",
            Filhos: "",
            TipodeViolencia: "",
            UsoDeAlcool_Drogas_Vitima: "",
            UsoDeAlcool_Drogas_Agressor: "",
            VinculoComAgressor: "",
            EncaminhadaPor: "",	
            Situacao: "",
            Motivododesligamento: "",
            Desligamento: "",
            Observacoes: ""
        }

        Obj.Model = {
            PF: "",
            PC: "",
            PM: "",
            PR: "",
            DataCadastro: "",
            NumeroCadastrado: "",
            DatadeNascimento: "",
            Escolaridade: "",
            Cidade: "",
            BO: "",
            MP: "",
            Bairro: "",
            EstadoCivil: "",
            Filhos: "",
            TipodeViolencia: "",
            UsoDeAlcool_Drogas_Vitima: "",
            UsoDeAlcool_Drogas_Agressor: "",
            VinculoComAgressor: "",
            EncaminhadaPor: "",
            Situacao: "",
            Motivododesligamento: "",
            Desligamento: "",
            Observacoes: ""
        }

        $interval(function () {
            angular.forEach(Obj.Cadastro, function (value, key) {
                switch (key) {
                    case "PF":
                        if (value != "") {
                            if (Obj.Model.PF != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.PF = "P";
                            }
                        }else {
                            if (value == false) {
                                if (Obj.Model.PF != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.PF = "";
                                }                               
                            }
                        }
                        break;
                    case "PC":
                        if (value != "") {
                            if (Obj.Model.PC != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.PC = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.PC != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.PC = "";
                                }
                            }
                        }
                        break;
                    case "PM":
                        if (value != "") {
                            if (Obj.Model.PM != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.PM = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.PM != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.PM = "";
                                }
                            }
                        }
                        break;
                    case "PR":
                        if (value != "") {
                            if (Obj.Model.PR != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.PR = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.PR != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.PR = "";
                                }
                            }
                        }
                        break;
                    case "DataCadastro":
                        if (value != null && value != "") {
                            if (Obj.Model.DataCadastro != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.DataCadastro = "P";
                            }
                        } else {
                            if (value == null) {
                                if (Obj.Model.DataCadastro != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.DataCadastro = "";
                                }
                            }
                        }
                        break;
                    case "NumeroCadastrado":
                        if ( value != "") {
                            if (Obj.Model.NumeroCadastrado != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.NumeroCadastrado = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.NumeroCadastrado != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.NumeroCadastrado = "";
                                }
                            }
                        }
                        break;
                    case "DatadeNascimento":
                        if (value != null && value != "") {
                            if (Obj.Model.DatadeNascimento != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.DatadeNascimento = "P";
                            }
                        } else {
                            if (value == null) {
                                if (Obj.Model.DatadeNascimento != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.DatadeNascimento = "";
                                }
                            }
                        }
                        break;
                    case "Escolaridade":
                        if (value != "") {
                            if (Obj.Model.Escolaridade != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.Escolaridade = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.Escolaridade != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.Escolaridade = "";
                                }
                            }
                        }
                        break;
                    case "Cidade":
                        if (value != "") {
                            if (Obj.Model.Cidade != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.Cidade = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.Cidade != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.Cidade = "";
                                }
                            }
                        }
                        break;
                    case "BO":
                        if (value != "") {
                            if (Obj.Model.BO != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.BO = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.BO != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.BO = "";
                                }
                            }
                        }
                        break;
                    case "MP":
                        if (value != "") {
                            if (Obj.Model.MP != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.MP = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.MP != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.MP = "";
                                }
                            }
                        }
                        break;
                    case "Bairro":
                        if (value != "") {
                            if (Obj.Model.Bairro != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.Bairro = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.Bairro != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.Bairro = "";
                                }
                            }
                        }
                        break;
                    case "EstadoCivil":
                        if (value != "") {
                            if (Obj.Model.EstadoCivil != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.EstadoCivil = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.EstadoCivil != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.EstadoCivil = "";
                                }
                            }
                        }
                        break;
                    case "Filhos":
                        if (value != "") {
                            if (Obj.Model.Filhos != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.Filhos = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.Filhos != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.Filhos = "";
                                }
                            }
                        }
                        break;
                    case "TipodeViolencia":
                        if (value != "") {
                            if (Obj.Model.TipodeViolencia != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.TipodeViolencia = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.TipodeViolencia != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.TipodeViolencia = "";
                                }
                            }
                        }
                        break;
                    case "UsoDeAlcool_Drogas_Vitima":
                        if (value != "") {
                            if (Obj.Model.UsoDeAlcool_Drogas_Vitima != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.UsoDeAlcool_Drogas_Vitima = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.UsoDeAlcool_Drogas_Vitima != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.UsoDeAlcool_Drogas_Vitima = "";
                                }
                            }
                        }
                        break;
                    case "UsoDeAlcool_Drogas_Agressor":
                        if (value != "") {
                            if (Obj.Model.UsoDeAlcool_Drogas_Agressor != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.UsoDeAlcool_Drogas_Agressor = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.UsoDeAlcool_Drogas_Agressor != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.UsoDeAlcool_Drogas_Agressor = "";
                                }
                            }
                        }
                        break;
                    case "VinculoComAgressor":
                        if (value != "") {
                            if (Obj.Model.VinculoComAgressor != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.VinculoComAgressor = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.VinculoComAgressor != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.VinculoComAgressor = "";
                                }
                            }
                        }
                        break;
                    case "EncaminhadaPor":
                        if (value != "") {
                            if (Obj.Model.EncaminhadaPor != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.EncaminhadaPor = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.EncaminhadaPor != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.EncaminhadaPor = "";
                                }
                            }
                        }
                        break;
                    case "Situacao":
                        if (value != "") {
                            if (Obj.Model.Situacao != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.Situacao = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.Situacao != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.Situacao = "";
                                }
                            }
                        }
                        break;
                    case "Motivododesligamento":
                        if (value != "") {
                            if (Obj.Model.Motivododesligamento != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.Motivododesligamento = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.Motivododesligamento != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.Motivododesligamento = "";
                                }
                            }
                        }
                        break;
                    case "Desligamento":
                        if (value != "") {
                            if (Obj.Model.Desligamento != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.Desligamento = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.Desligamento != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.Desligamento = "";
                                }
                            }
                        }
                        break;
                    case "Observacoes":
                        if (value != "") {
                            if (Obj.Model.Observacoes != "P") {
                                $scope.Porcentagem = $scope.Porcentagem + 4.34;
                                Obj.Model.Observacoes = "P";
                            }
                        } else {
                            if (value == false) {
                                if (Obj.Model.Observacoes != "") {
                                    $scope.Porcentagem = $scope.Porcentagem - 4.34;
                                    Obj.Model.Observacoes = "";
                                }
                            }
                        }
                        break;

                    default:
                        $scope.Porcentagem = 0;
                        break;
                }                
            },log);

            if ($scope.Porcentagem < 35) {
                $scope.Color = "bg-danger"
            } else if ($scope.Porcentagem > 35 && $scope.Porcentagem < 60) {
                $scope.Color = "bg-warning"
            } else if ($scope.Porcentagem > 95) {
                $scope.Color = "bg-success"
            }
        },500);
        
        $scope.FunctionProgress = function (value, key) {

        }

        
        $scope.Subimit = function ()
        {
            var values = Obj.Cadastro;
            
            angular.forEach(values, function (value, key) {
                this.push(key + '": ' + value);
            }, log);

        }      
    }]);