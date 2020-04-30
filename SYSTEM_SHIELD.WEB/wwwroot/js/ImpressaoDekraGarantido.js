var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Objcs;
var token = "";

var ChartGraficoPrincipal;
var identificacao;
var Estrutura;
var Historico;

app.controller("CtrlImpressao", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout',
function ($scope, $http, $location, $window, blockUI, $timeout, nvd3) {

    Objcs = $scope;
    var _checkauto = opener.checkautoModel;
    var path = window.location.origin;
    var regradeLeilao = "";

    var model =
    {
        ColetaID: _checkauto.ConsultaID,
        ProdutoNome: "ChamadaProc",
        NrColeta: _checkauto.NrColeta,
    };
 
    var RetornoFinalidade =
    {
        NrColeta: _checkauto.NrColeta.toString(),
        ProdutoId: "20",
        ParceiroId: "",
        RazaoSocial: "",
        Nome: ""
    }


    $scope.DescricaoHeader = "LAUDO DEKRA CHECK";
    

    $scope.RetornoFinalidade = RetornoFinalidade;
        
    $("#constatacao").css("height", "1227px");
    $("#tbHistoricoRecall").attr("style", "border:1px solid #D9D9D9;width:880px");

    if (path.toString().substring(7, 16) != "localhost") {
        path = path + "/SmartMobile/BackOfficeAnalise";
        $scope.P1 = "/SmartMobile/BackOfficeAnalise/Images/ContainerCapa01.png";
        $scope.P2 = "/SmartMobile/BackOfficeAnalise/Images/ContainerCapa02.png";
        $scope.P3 = "/SmartMobile/BackOfficeAnalise/Images/ContainerCapa03.png";
        $scope.P4 = "/SmartMobile/BackOfficeAnalise/Images/ContainerCapa04.png";
        $scope.LogoDekra = "/SmartMobile/BackOfficeAnalise/Images/LogoDEKRA.png";
        $scope.ParecerFinalConform = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
        $scope.ParecerFinalObservacao = "/SmartMobile/BackOfficeAnalise/Images/icone_com_observacao.png";
        $scope.ParecerFinalNaoConforme = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
    }
    else
    {
        $scope.P1 = "/Images/ContainerCapa01.png";
        $scope.P2 = "/Images/ContainerCapa02.png";
        $scope.P3 = "/Images/ContainerCapa03.png";
        $scope.P4 = "/Images/ContainerCapa04.png";
        $scope.LogoDekra = "/Images/LogoDEKRA.png";
        $scope.ParecerFinalConform = "/Images/icone_conforme_nd.png";
        $scope.ParecerFinalObservacao = "/Images/icone_com_observacao.png";
        $scope.ParecerFinalNaoConforme = "/Images/icone_reprovado.png";
    }



    var StatusLeilao = {
      HistoricoLeilao: "",
      HistoricoLeilao2:"",
      HistoricoLeilaoRemarketing:"",
      HistoricoLeilaoStatusAvarias:""
    }

    $scope.StatusLeilao = StatusLeilao;

    var ModelTotalizadores = {
        IDENT_CONFORM: 0,
        IDENT_NAOCONFORM: 0,
        IDENT_OBSERCONFORM: 0,
        ESTR_CONFORM: 0,
        ESTR_NAOCONFORM: 0,
        ESTR_OBSERCONFORM: 0,
        HIST_CONFORM: 0,
        HIST_NAOCONFORM: 0,
        HIST_OBSERCONFORM: 0,
        ESTADECONCER_CONFORM: 0,
        ESTADECONCER_NAOCONFORM: 0,
        ESTADECONCER_OBSERCONFORM: 0,
    };

    $scope.ModelTotalizadores = ModelTotalizadores;


    blockUI.start("....CARREGANDO DADOS PARA IMPRESSÃO....");

    // verde  #AFD249    1
    // laranja #FDB813   2
    // vermelho #ED1C24  3

    var TOTALGERAL = 0;

    var TotalIdentificacao = 0;
    var TotalEstrutura = 0;
    var TotalHistorico = 0;

    var TotalConform = 0;
    var TotalConformComObs = 0;
    var TotalNaoConform = 0;
    var TotalEstadoDeConservacao = 0;

    $scope.dvNoPagina = 0;
    $scope.dvTotalPaginas = 0;

    var modelHeader1 = {
        Chassi: opener.checkautoModel.Chassi = null ? 0 : opener.checkautoModel.Chassi,
        Motor: opener.checkautoModel.Motor,
        Placa: opener.checkautoModel.Placa,
        Marca: opener.checkautoModel.Marca,
        Modelo: opener.checkautoModel.Modelo,
        Cor: opener.checkautoModel.Cor,
        Combustivel: opener.checkautoModel.Combustivel,
        AnoFabricacao: opener.checkautoModel.AnoFabricacao,
        AnoModelo: opener.checkautoModel.AnoModelo,
        Situacao: opener.checkautoModel.Situacao,
        parecercaixainterna: opener.checkautoModel.arecercaixainterna,
        TotalConforme: "0",
        TotalConformeObs: "0",
        TotalReprovados: "0"
   };
    
    var IdentificacaoColor = {
        CRLV: "#FFFFFF",
        PLACAS: "#FFFFFF",
        MOTOR: "#FFFFFF",
        CHASSI: "#FFFFFF",
        KM: "#FFFFFF",
        QUILOMETRAGEM: "#FFFFFF",
        VIDROS: "#FFFFFF",
        CINTOS: "#FFFFFF",
        AIRBAG: "#FFFFFF",
        ETIQUETAS: "#FFFFFF",
        DATADASPECAS: "#FFFFFF",
        TOTAL_CONFORM: 0,
        TOTAL_CONFORM_COM_OBS: 0,
        TOTAL_NAO_CONFORM: 0
    }

    var EstruturaColor = {
        PARTEDIANTEIRA: "#FFFFFF",
        PARTEESQUERDO: "#FFFFFF",
        LADODIREITO: "#FFFFFF",
        TETO: "#FFFFFF",
        ASSOALHO: "#FFFFFF",
        OUTRO: "#FFFFFF",
        PARTETRASEIRA: "#FFFFFF",
        PINTURA: "#FFFFFF",
        TOTAL_CONFORM: 0,
        TOTAL_CONFORM_COM_OBS: 0,
        TOTAL_NAO_CONFORM: 0
    }

    var HistoricoColor = {
        RESTRICOES: "#FFFFFF",
        HistoricoLeilao: "#FFFFFF",
        IPVAMULTAS: "#FFFFFF",
        XMLRecall: "#FFFFFF",
        RouboFurto: "#FFFFFF",
        ACIDENTES: "#FFFFFF",
        OUTROS: "#FFFFFF",
        //INFORMACOESPOSITIVAS: "#FFFFFF",
        TOTAL_CONFORM: 0,
        TOTAL_CONFORM_COM_OBS: 0,
        TOTAL_NAO_CONFORM: 0
    }

    $scope.IdentificacaoColor = IdentificacaoColor;

    $scope.CarregarDadosCheck = function () {

        // --------- Variaveis ----------//               
        var model =
        {
            ColetaID: _checkauto.ConsultaID,
            ProdutoNome: "ChamadaProc",
            NrColeta: _checkauto.NrColeta,
        };

        var parceiro = 0;
        var produto = _checkauto.ProdutoID;
        var coleta = 0;
        var impressao = false;
        // --------- Variaveis ----------//

        HistoricoColor.TOTAL_NAO_CONFORM = 0
        HistoricoColor.TOTAL_CONFORM = 0
        HistoricoColor.TOTAL_CONFORM_COM_OBS = 0

        var EstruturaTotal = "0";
        var HistoricoTotal = "0";

        var IdentificacaoTotal = "0";
        var EstruturaTotal = "0";
        var HistoricoTotal = "0";

        modelHeader1.TotalConforme = ModelTotalizadores.IDENT_CONFORM;
        modelHeader1.TotalConformeObs = ModelTotalizadores.IDENT_OBSERCONFORM;
        modelHeader1.TotalReprovados = ModelTotalizadores.IDENT_NAOCONFORM;

        $scope.TotalConform = (ModelTotalizadores.IDENT_CONFORM + ModelTotalizadores.ESTR_CONFORM + ModelTotalizadores.HIST_CONFORM);

        $scope.TotalConformComObs = (ModelTotalizadores.IDENT_OBSERCONFORM + ModelTotalizadores.ESTR_OBSERCONFORM + ModelTotalizadores.HIST_OBSERCONFORM);

        $scope.TotalNaoConform = (ModelTotalizadores.IDENT_NAOCONFORM + ModelTotalizadores.ESTR_NAOCONFORM + ModelTotalizadores.HIST_NAOCONFORM);

        $scope.IdentificacaoTotal = (ModelTotalizadores.IDENT_CONFORM + ModelTotalizadores.IDENT_OBSERCONFORM + ModelTotalizadores.IDENT_NAOCONFORM);

        $scope.EstruturaTotal = (ModelTotalizadores.ESTR_CONFORM + ModelTotalizadores.ESTR_OBSERCONFORM + ModelTotalizadores.ESTR_NAOCONFORM);

        $scope.HistoricoTotal = (ModelTotalizadores.HIST_CONFORM + ModelTotalizadores.HIST_OBSERCONFORM + ModelTotalizadores.HIST_NAOCONFORM);

        //$scope.TotalEstadoDeConservacao = (ModelTotalizadores.ESTADECONCER_CONFORM + ModelTotalizadores.ESTADECONCER_OBSERCONFORM + ModelTotalizadores.ESTADECONCER_NAOCONFORM);

        $scope.TOTALGERAL = (
                              (ModelTotalizadores.IDENT_CONFORM + ModelTotalizadores.IDENT_OBSERCONFORM + ModelTotalizadores.IDENT_NAOCONFORM)
                            + (ModelTotalizadores.ESTR_CONFORM + ModelTotalizadores.ESTR_OBSERCONFORM + ModelTotalizadores.ESTR_NAOCONFORM)
                            //+ (ModelTotalizadores.ESTADECONCER_CONFORM + ModelTotalizadores.ESTADECONCER_OBSERCONFORM + ModelTotalizadores.ESTADECONCER_NAOCONFORM)
                            + (ModelTotalizadores.HIST_CONFORM + ModelTotalizadores.HIST_OBSERCONFORM + ModelTotalizadores.HIST_NAOCONFORM));

        TotalConform = (ModelTotalizadores.IDENT_CONFORM + ModelTotalizadores.ESTR_CONFORM + ModelTotalizadores.HIST_CONFORM + ModelTotalizadores.ESTADECONCER_CONFORM);

        TotalConformComObs = (ModelTotalizadores.IDENT_OBSERCONFORM + ModelTotalizadores.ESTR_OBSERCONFORM + ModelTotalizadores.HIST_OBSERCONFORM + ModelTotalizadores.ESTADECONCER_OBSERCONFORM);

        TotalNaoConform = (ModelTotalizadores.IDENT_NAOCONFORM + ModelTotalizadores.ESTR_OBSERCONFORM + ModelTotalizadores.HIST_NAOCONFORM + +ModelTotalizadores.ESTADECONCER_NAOCONFORM);

        $scope.chamadaGrafico1();

    }

    $scope.functionDadosCheckGraficos = function () {
        $http.post(path + '/VistoriaVarejo/DadosCheckGraficos', { model: model, carregarfotos: false, })
        .then(function (request) 
        {
            var dados = request.data;
            TotalIdentificacao = 0;
            var IdentificacaoColorModulo = $scope.IdentificacaoColor;
            var IdentificacaoItensArray = $scope.IdentificacaoItensArray

            angular.forEach(dados, function (value, key) 
            {
            
                var dadosItens = $scope.IdentificacaoItensArray.filter(function (values) { return values.ModuloId == value.ModuloID; })
              
                if (value.ModuloID == 23) {
                    if (value.ModuloStatusID == 1) {
                     

                        IdentificacaoColorModulo.CRLV = "#AFD249";
                      
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });


                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.CRLV = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.CRLV = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                }
                else if (value.ModuloID == 24) {
                    if (value.ModuloStatusID == 1) {
                       

                        IdentificacaoColorModulo.PLACAS = "#AFD249";
                       
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });

                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.PLACAS = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.PLACAS = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }

                        });
                    }
                }
                else if (value.ModuloID == 27) {
                    if (value.ModuloStatusID == 1) {
                     

                        IdentificacaoColorModulo.MOTOR = "#AFD249";
                      
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });

                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.MOTOR = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.MOTOR = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }

                        });
                    }
                }
                else if (value.ModuloID == 26) {
                    if (value.ModuloStatusID == 1) {
                     

                        IdentificacaoColorModulo.CHASSI = "#AFD249";
                      
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });

                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.CHASSI = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.CHASSI = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }

                        });
                    }
                }
                    
                else if (value.ModuloID == 25) {
                    if (value.ModuloStatusID == 1) {
                       

                        IdentificacaoColorModulo.VIDROS = "#AFD249";
                      
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });


                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.VIDROS = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.VIDROS = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }

                        });
                    }
                }
                else if (value.ModuloID == 30) {
                    if (value.ModuloStatusID == 1) {
                       

                        IdentificacaoColorModulo.CINTOS = "#AFD249";
                      
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });


                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.CINTOS = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.CINTOS = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                }
                else if (value.ModuloID == 31) {
                    if (value.ModuloStatusID == 1) {
                       

                        IdentificacaoColorModulo.QUILOMETRAGEM = "#AFD249";
                        IdentificacaoColorModulo.KM = "#AFD249";
                       
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });

                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.KM = "#FDB813";
                        IdentificacaoColorModulo.QUILOMETRAGEM = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.KM = "#ED1C24";
                        IdentificacaoColorModulo.QUILOMETRAGEM = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                }
                else if (value.ModuloID == 28) {
                    if (value.ModuloStatusID == 1) {
                      

                        IdentificacaoColorModulo.DATADASPECAS = "#AFD249";
                       
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });

                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.DATADASPECAS = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.DATADASPECAS = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }

                        });
                    }
                }
                else if (value.ModuloID == 29) {
                    if (value.ModuloStatusID == 1) {
                       

                        IdentificacaoColorModulo.ETIQUETAS = "#AFD249";
                       
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });

                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.ETIQUETAS = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.ETIQUETAS = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                }
                else if (value.ModuloID == 73) {
                    if (value.ModuloStatusID == 1) {
                        

                        IdentificacaoColorModulo.AIRBAG = "#AFD249";
                      
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });

                    }
                    else if (value.ModuloStatusID == 2) {
                        IdentificacaoColorModulo.AIRBAG = "#FDB813";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                    else if (value.ModuloStatusID == 3) {
                        IdentificacaoColorModulo.AIRBAG = "#ED1C24";
                        angular.forEach(dadosItens, function (value, key) {
                            if (value.Status == 3) {
                                IdentificacaoColorModulo.TOTAL_NAO_CONFORM = IdentificacaoColorModulo.TOTAL_NAO_CONFORM + 1;
                                ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 2) {
                                IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS = IdentificacaoColorModulo.TOTAL_CONFORM_COM_OBS + 1;
                                ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                            else if (value.Status == 1) {
                                IdentificacaoColorModulo.TOTAL_CONFORM = IdentificacaoColorModulo.TOTAL_CONFORM + 1;
                                ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM + 1;
                                TotalIdentificacao = TotalIdentificacao + 1;
                            }
                        });
                    }
                }

            });
            $scope.ModelTotalizadores.IDENT_CONFORM = ModelTotalizadores.IDENT_CONFORM;
            $scope.ModelTotalizadores.IDENT_NAOCONFORM = ModelTotalizadores.IDENT_NAOCONFORM;
            $scope.ModelTotalizadores.IDENT_OBSERCONFORM = ModelTotalizadores.IDENT_OBSERCONFORM;

            var datasourceIdentificacao = [];
            if (ModelTotalizadores.IDENT_CONFORM != 0) { datasourceIdentificacao = [{ "label": "", "value": ModelTotalizadores.IDENT_CONFORM, "color": "#AFD249" }]; }
            if (ModelTotalizadores.IDENT_OBSERCONFORM != 0) { datasourceIdentificacao.push({ "label": "", "value": ModelTotalizadores.IDENT_OBSERCONFORM, "color": "#FDB813" }); }
            if (ModelTotalizadores.IDENT_NAOCONFORM != 0) { datasourceIdentificacao.push({ "label": "", "value": ModelTotalizadores.IDENT_NAOCONFORM, "color": "#ED1C24" }); }
            $scope.TotalIdentificacao = TotalIdentificacao;
            $scope.IdentificacaoTotal = (ModelTotalizadores.IDENT_CONFORM + ModelTotalizadores.IDENT_NAOCONFORM + ModelTotalizadores.IDENT_OBSERCONFORM)

            FusionCharts.ready(function () {

                identificacao = new FusionCharts({

                    "width": "100%",
                    "height": "100%",
                    "type": "doughnut2d",
                    "renderAt": "ChartGraficoIdentificacao",
                    "dataformat": "json",
                    "dataSource":
                     {
                         "chart": {
                             "baseFontSize": "19",
                             "legendItemFontSize": "50",
                             "caption": "",
                             "labelDistance": "35",
                             "subCaption": "",
                             "numberPrefix": "",
                             "startingAngle": "90",
                             "decimals": "0",
                             "enableMultiSlicing": "0",
                             "use3DLighting": "0",
                             "defaultCenterLabel": "",
                             "pieRadius": "110",
                             "smartLineAlpha": "100",
                             "showLabels": "0",
                             "smartLineThickness": "1",
                             "showShadow": "0",
                             "captionFontSize": "35",
                             "subcaptionFontSize": "35",
                             "subcaptionFontBold": "0",
                             "showBorder": "0",
                             "centerLabelBold": "4",
                             "canvasBgColor": "#ffffff",
                             "baseFontColor": "#000000",
                             "bgColor": "#ffffff",
                             "doughnutRadius": "80",
                             "slicingDistance": "0",
                         }, "data": datasourceIdentificacao
                     }
                });
            });


        })
        .catch(function (response) {
            //console.error('DadosCheckGraficos error', response.status, response.data);
        })
        .finally(function () {
            $scope.DadosCheckGraficosEstrutura();
        });
    };

    $scope.FinalidadePorNrColeta = function ()
    {     

        $http.post(path + '/VistoriaVarejo/FinalidadeParceiro',
        {
            RetornoFinalidade: $scope.RetornoFinalidade
        })
        .then(function (response) {
            var retorno = response.data;
            if (retorno[0].Nome == "SEGURADORA" || retorno[0].Nome == "FINANCEIRAS")
                $scope.DescricaoHeader = "LAUDO EXCLUSIVO " + retorno[0].RazaoSocial;

        })
        .catch(function (response) { })
        .finally(function () { });
    }

    $scope.FinalidadePorNrColeta();
    
    $scope.Indentificacao_Func = function () {

        var IdentificacaoItensArray = [];
        var IdentificacaoItens =
        {
            ColetaId: 0,
            ModuloId: 0,
            ModuloCampoId: 0,
            Status: 0,
        };

        $scope.IdentificacaoItens = IdentificacaoItens;
        $scope.IdentificacaoItensArray = IdentificacaoItensArray;

        var parceiro = 0;
        var produto = _checkauto.ProdutoID;
        var coleta = 0;
        var impressao = false;

        // --------- Variaveis ----------//
        var dadosIdentificacaoForItem;

        $http.post(path + '/VistoriaVarejo/IdentificacaoItems',
        { model: model, carregarfotos: false, })
        .then(function (response) {
            dadosIdentificacaoForItem = response.data;
            angular.forEach(dadosIdentificacaoForItem, function (value, key) {
                //console.log("ModuloID: " + value.ModuloId + " Item Modulo: " + value.ModuloCampoId + " Status: " + value.Status);
                IdentificacaoItens =
                {
                    ColetaId: value.ColetaId,
                    ModuloId: value.ModuloId,
                    ModuloCampoId: value.ModuloCampoId,
                    Status: value.Status,
                };
                $scope.IdentificacaoItensArray.push(IdentificacaoItens);
            });
        })
        .catch(function (response) {
            //console.error('IdentificacaoItems error', response.status, response.data);
        })
        .finally(function () {
            $scope.functionDadosCheckGraficos();
        });
    }

    $scope.DadosCheckGraficosEstrutura = function () {
        var parceiro = 0;
        var produto = _checkauto.ProdutoID;
        var coleta = 0;
        var impressao = false;
        // --------- Variaveis ----------//

        var VERDE = 0;
        var AMARELO = 0;
        var VERMELHO = 0;
        var Totalverificado = 0;

        $http.post(path + '/VistoriaVarejo/DadosCheckGraficosEstrutura', { parceiro: parceiro, produto: produto, coleta: coleta, impressao: impressao, })
        .then(function (request) {

            var TotalItenStrutura = 0;
            var TotalItenStruturaConform = 0;
            var TotalItenStruturaConObservacao = 0;
            var TotalItenStruturaNaoCOnform = 0;
            var ESTRUTURAPARTEDIANTEIRA = 0;
            var ESTRUTURADOLADOESQUERDO = 0;
            var ESTRUTURAPARTETRASEIRA = 0;
            var ESTRUTURADOLADODIREITO = 0;
            var TETO = 0;
            var ASSOALHO = 0;
            var PINTURA = 0;

            //pintura modulo


            angular.forEach(request.data, function (values, key) {

                var Campos = values;


                switch (values.Descricao) {
                    case "ESTRUTURA - PARTE DIANTEIRA":

                        var Totalvarificacoes = Campos.Campos.filter(function (values) { return values.CampoDescricao != "Observação" }).length;

                        for (var i = 0; i < Totalvarificacoes; i++) {

                            var observacao = Campos.Campos[i].CampoValor.filter(function (value) { return value.Selected == true; });
                            var desconsiderar = Campos.Campos[i].CampoDescricao.toString().trim();

                            switch (desconsiderar) {

                                case "Painel dianteiro": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }
                                    break;
                                case "Torre do amortecedor direita": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }
                                    break;
                                case "Torre do amortecedor esquerda": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }
                                    break;
                                case "Longarina direita": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }
                                    break;
                                case "Longarina esquerda": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }
                                    break;
                                case "Alma do para-choque": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2": TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5": TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6": TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }
                                    break;
                                case "Painel corta-fogo": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;

                                default:
                                    break;
                            }
                        }

                        if (VERMELHO == 0 && AMARELO == 0 && VERDE > 0) {
                            EstruturaColor.PARTEDIANTEIRA = "#AFD249";
                        }
                        else if (AMARELO > 0 && VERMELHO == 0) {
                            EstruturaColor.PARTEDIANTEIRA = "#FDB813";
                        }
                        else if (AMARELO > 0 || AMARELO == 0 && VERMELHO > 0) {
                            EstruturaColor.PARTEDIANTEIRA = "#ED1C24";
                        }

                        break;

                    case "ESTRUTURA DO LADO ESQUERDO":

                        var Totalvarificacoes = Campos.Campos.filter(function (values) { return values.CampoDescricao != "Observação" }).length;

                        VERDE = 0;
                        AMARELO = 0;
                        VERMELHO = 0;

                        for (var i = 0; i < Totalvarificacoes; i++) {

                            var observacao = Campos.Campos[i].CampoValor.filter(function (value) { return value.Selected == true; });
                            var desconsiderar = Campos.Campos[i].CampoDescricao.toString().trim();

                            switch (desconsiderar) {

                                case "Coluna dianteira": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Coluna central": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Caixa de roda dianteira": //ok
                                    switch (observacao[0].Value.toString()) {
                                        //case "1":
                                        //    //OK
                                        //    TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                        //    ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                        //    Totalverificado = Totalverificado + 1;
                                        //    VERDE = VERDE + 1
                                        //    break;
                                        //case "2": TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        //    //COM CORTE E SOLDA
                                        //    TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        //    ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                        //    Totalverificado = Totalverificado + 1;
                                        //    VERMELHO = VERMELHO + 1
                                        //    break;
                                        //case "4":
                                        //    //REPARADO
                                        //    TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        //    ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                        //    Totalverificado = Totalverificado + 1;
                                        //    AMARELO = AMARELO + 1
                                        //    break;
                                        //case "5": TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        //    //TRINCADO
                                        //    TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        //    ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                        //    Totalverificado = Totalverificado + 1;
                                        //    VERMELHO = VERMELHO + 1
                                        //    break;
                                        //case "6": TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        //    //COM CORROSÃO
                                        //    TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        //    ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                        //    Totalverificado = Totalverificado + 1;
                                        //    VERMELHO = VERMELHO + 1
                                        //    break;
                                        //case "7":
                                        //    //INDÍCIOS DE EMENDA
                                        //    TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        //    ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                        //    Totalverificado = Totalverificado + 1;
                                        //    VERMELHO = VERMELHO + 1
                                        //    break;
                                        //case "8":
                                        //    //AMASSADO
                                        //    TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        //    ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                        //    Totalverificado = Totalverificado + 1;
                                        //    AMARELO = AMARELO + 1
                                        //    break;
                                        //case "10":
                                        //    //FERRUGEM
                                        //    TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        //    ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                        //    Totalverificado = Totalverificado + 1;
                                        //    AMARELO = AMARELO + 1
                                        //    break;

                                        default:
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                    }

                                    break;
                                case "Coluna traseira": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Caixa de roda dianteira": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Caixa de ar": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADOESQUERDO = ESTRUTURADOLADOESQUERDO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;

                                default:
                                    break;
                            }
                        }


                        if (VERMELHO == 0 && AMARELO == 0 && VERDE > 0) {
                            EstruturaColor.PARTEESQUERDO = "#AFD249";
                        }
                        else if (AMARELO > 0 && VERMELHO == 0) {
                            EstruturaColor.PARTEESQUERDO = "#FDB813";
                        }
                        else if (AMARELO > 0 || AMARELO == 0 && VERMELHO > 0) {
                            EstruturaColor.PARTEESQUERDO = "#ED1C24";
                        }


                        break;
                    case "ESTRUTURA - PARTE TRASEIRA":

                        var Totalvarificacoes = Campos.Campos.filter(function (values) { return values.CampoDescricao != "Observação" }).length;

                        VERDE = 0;
                        AMARELO = 0;
                        VERMELHO = 0;

                        for (var i = 0; i < Totalvarificacoes; i++) {

                            var observacao = Campos.Campos[i].CampoValor.filter(function (value) { return value.Selected == true; });
                            var desconsiderar = Campos.Campos[i].CampoDescricao.toString().trim();

                            switch (desconsiderar) {

                                case "Painel traseiro": // ok --
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Caixa do estepe": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTEDIANTEIRA = ESTRUTURAPARTEDIANTEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Longarina traseira esquerda": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Longarina traseira direita": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURAPARTETRASEIRA = ESTRUTURAPARTETRASEIRA + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;

                                default:
                                    break;
                            }
                        }
                        if (VERMELHO == 0 && AMARELO == 0 && VERDE > 0) {
                            EstruturaColor.PARTETRASEIRA = "#AFD249";
                        }
                        else if (AMARELO > 0 && VERMELHO == 0) {
                            EstruturaColor.PARTETRASEIRA = "#FDB813";
                        }
                        else if (AMARELO > 0 || AMARELO == 0 && VERMELHO > 0) {
                            EstruturaColor.PARTETRASEIRA = "#ED1C24";
                        }


                        break;
                    case "ESTRUTURA DO LADO DIREITO":

                        var Totalvarificacoes = Campos.Campos.filter(function (values) { return values.CampoDescricao != "Observação" }).length;


                        VERDE = 0;
                        AMARELO = 0;
                        VERMELHO = 0;


                        for (var i = 0; i < Totalvarificacoes; i++) {

                            var observacao = Campos.Campos[i].CampoValor.filter(function (value) { return value.Selected == true; });
                            var desconsiderar = Campos.Campos[i].CampoDescricao.toString().trim();


                            switch (desconsiderar) {

                                case "Coluna dianteira": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Coluna traseira": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Coluna central": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Caixa de roda dianteira": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Caixa de roda traseira": //ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;
                                case "Caixa de ar": // ok
                                    switch (observacao[0].Value.toString()) {
                                        case "1":
                                            //OK
                                            TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERDE = VERDE + 1
                                            break;
                                        case "2":
                                            //COM CORTE E SOLDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "4":
                                            //REPARADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "5":
                                            //TRINCADO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "6":
                                            //COM CORROSÃO
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "7":
                                            //INDÍCIOS DE EMENDA
                                            TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            VERMELHO = VERMELHO + 1
                                            break;
                                        case "8":
                                            //AMASSADO
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;
                                        case "10":
                                            //FERRUGEM
                                            TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                            ESTRUTURADOLADODIREITO = ESTRUTURADOLADODIREITO + 1;
                                            Totalverificado = Totalverificado + 1;
                                            AMARELO = AMARELO + 1
                                            break;

                                        default:
                                            break;
                                    }

                                    break;

                                default:
                                    break;
                            }
                        }

                        if (VERMELHO == 0 && AMARELO == 0 && VERDE > 0) {
                            EstruturaColor.LADODIREITO = "#AFD249";
                        }
                        else if (AMARELO > 0 && VERMELHO == 0) {
                            EstruturaColor.LADODIREITO = "#FDB813";
                        }
                        else if (AMARELO > 0 || AMARELO == 0 && VERMELHO > 0) {
                            EstruturaColor.LADODIREITO = "#ED1C24";
                        }

                        break;
                    case "TETO":

                        var Totalvarificacoes = Campos.Campos.filter(function (values) { return values.CampoDescricao != "Observação" }).length;

                        VERDE = 0;
                        AMARELO = 0;
                        VERMELHO = 0;

                        for (var i = 0; i < Totalvarificacoes; i++) {

                            var observacao = Campos.Campos[i].CampoValor.filter(function (value) { return value.Selected == true; });
                            var desconsiderar = Campos.Campos[i].CampoDescricao.toString().trim();

                            if (desconsiderar == "Teto") {
                                switch (observacao[0].Value.toString()) {
                                    case "1":
                                        TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                        TETO = TETO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERDE = VERDE + 1
                                        break;
                                    case "2":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        TETO = TETO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "4":
                                        TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        TETO = TETO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        AMARELO = AMARELO + 1
                                        break;
                                    case "5": TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        TETO = TETO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "6": TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        TETO = TETO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "7":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        TETO = TETO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "8":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        TETO = TETO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "10":
                                        TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        TETO = TETO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        AMARELO = AMARELO + 1
                                        break;

                                    default:
                                        break;
                                }


                            }
                        }
                        if (VERMELHO == 0 && AMARELO == 0 && VERDE > 0) {
                            EstruturaColor.TETO = "#AFD249";
                        }
                        else if (AMARELO > 0 && VERMELHO == 0) {
                            EstruturaColor.TETO = "#FDB813";
                        }
                        else if (AMARELO > 0 || AMARELO == 0 && VERMELHO > 0) {
                            EstruturaColor.TETO = "#ED1C24";
                        }
                        break;
                    case "ASSOALHO":

                        var Totalvarificacoes = Campos.Campos.filter(function (values) { return values.CampoDescricao != "Observação" }).length;

                        VERDE = 0;
                        AMARELO = 0;
                        VERMELHO = 0;

                        for (var i = 0; i < Totalvarificacoes; i++) {

                            var observacao = Campos.Campos[i].CampoValor.filter(function (value) { return value.Selected == true; });
                            var desconsiderar = Campos.Campos[i].CampoDescricao.toString().trim();

                            if (desconsiderar == "Assoalho do Porta Malas") {
                                switch (observacao[0].Value.toString()) {
                                    case "1":
                                        TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERDE = VERDE + 1
                                        break;
                                    case "2":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "4":
                                        TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        AMARELO = AMARELO + 1
                                        break;
                                    case "5":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "6":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "7":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "8":
                                        TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        AMARELO = AMARELO + 1
                                        break;
                                    case "10":
                                        TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        AMARELO = AMARELO + 1
                                        break;

                                    default:
                                        break;
                                }

                            }
                            if (desconsiderar == "Assoalho Central") {
                                switch (observacao[0].Value.toString()) {
                                    case "1":
                                        TotalItenStruturaConform = TotalItenStruturaConform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERDE = VERDE + 1
                                        break;
                                    case "2":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "4":
                                        TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        AMARELO = AMARELO + 1
                                        break;
                                    case "5":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "6":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "7":
                                        TotalItenStruturaNaoCOnform = TotalItenStruturaNaoCOnform + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        VERMELHO = VERMELHO + 1
                                        break;
                                    case "8":
                                        TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        AMARELO = AMARELO + 1
                                        break;
                                    case "10":
                                        TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                                        ASSOALHO = ASSOALHO + 1;
                                        Totalverificado = Totalverificado + 1;
                                        AMARELO = AMARELO + 1
                                        break;

                                    default:
                                        break;
                                }

                            }
                        }





                        if (VERMELHO == 0 && AMARELO == 0 && VERDE > 0) {
                            EstruturaColor.ASSOALHO = "#AFD249";
                        }
                        else if (AMARELO > 0 && VERMELHO == 0) {
                            EstruturaColor.ASSOALHO = "#FDB813";
                        }
                        else if (AMARELO > 0 || AMARELO == 0 && VERMELHO > 0) {
                            EstruturaColor.ASSOALHO = "#ED1C24";
                        }


                        break;

                    default:
                        break;

                };

            });

            $http.get(path + '/VistoriaVarejo/ModuloPinturaStatus', {
                TipoCarroceria: 0,
                ColetaID: coleta,
            })
            .then(function (request)
            {
                var retorno = request.data;
                $scope.PinturaStatus = retorno;

                if ($scope.PinturaStatus == "VERDE") {
                    EstruturaColor.PINTURA = "#AFD249";
                    Totalverificado = Totalverificado + 1;
                    VERDE = VERDE + 1
                    TotalItenStruturaConform = TotalItenStruturaConform + 1;
                }
                else {
                    EstruturaColor.PINTURA = "#FDB813";
                    Totalverificado = Totalverificado + 1;
                    VERDE = VERDE + 1
                    TotalItenStruturaConObservacao = TotalItenStruturaConObservacao + 1;
                }

                ModelTotalizadores.ESTR_CONFORM = TotalItenStruturaConform
                ModelTotalizadores.ESTR_OBSERCONFORM = TotalItenStruturaConObservacao
                ModelTotalizadores.ESTR_NAOCONFORM = TotalItenStruturaNaoCOnform

                TotalEstrutura = TotalItenStrutura;

                EstruturaColor.TOTAL_CONFORM = TotalItenStruturaConform;
                EstruturaColor.TOTAL_CONFORM_COM_OBS = TotalItenStruturaConObservacao;
                EstruturaColor.TOTAL_NAO_CONFORM = TotalItenStruturaNaoCOnform;

                //----------------------------------- ESTRUTURA -----------------------------------//

                var datasourceEstrutura = [];
                if (ModelTotalizadores.ESTR_CONFORM != 0) { datasourceEstrutura = [{ "label": "", "value": ModelTotalizadores.ESTR_CONFORM, "color": "#AFD249" }]; }
                if (ModelTotalizadores.ESTR_OBSERCONFORM != 0) { datasourceEstrutura.push({ "label": "", "value": ModelTotalizadores.ESTR_OBSERCONFORM, "color": "#FDB813" }); }
                if (ModelTotalizadores.ESTR_NAOCONFORM != 0) { datasourceEstrutura.push({ "label": "", "value": ModelTotalizadores.ESTR_NAOCONFORM, "color": "#ED1C24" }); }

                $scope.EstruturaTotal = (TotalItenStruturaConform + TotalItenStruturaConObservacao + TotalItenStruturaNaoCOnform)

                FusionCharts.ready(function () {

                    Estrutura = new FusionCharts({

                        "width": "100%",
                        "height": "100%",
                        "type": "doughnut2d",
                        "renderAt": "ChartGraficoEstrutura",
                        "dataformat": "json",
                        "dataSource":
                         {
                             "chart": {
                                 "baseFontSize": "19",
                                 "caption": "",
                                 "labelDistance": "35",
                                 "subCaption": "",
                                 "numberPrefix": "",
                                 "startingAngle": "90",
                                 "decimals": "0",
                                 "enableMultiSlicing": "0",
                                 "use3DLighting": "0",
                                 "defaultCenterLabel": "",
                                 "pieRadius": "110",
                                 "smartLineAlpha": "100",
                                 "showLabels": "0",
                                 "smartLineThickness": "1",
                                 "showShadow": "0",
                                 "captionFontSize": "14",
                                 "subcaptionFontSize": "14",
                                 "subcaptionFontBold": "0",
                                 "showBorder": "0",
                                 "centerLabelBold": "4",
                                 "canvasBgColor": "#ffffff",
                                 "baseFontColor": "#000000",
                                 "bgColor": "#ffffff",
                                 "doughnutRadius": "80",
                                 "slicingDistance": "0",
                             }, "data": datasourceEstrutura
                         }
                    });

                    //Estrutura.render();
                });

            })
            .catch(function (response) {
            })
            .finally(function () {
                $scope.Historico_Func();
            });






        })
        .catch(function (response) {
        })
        .finally(function () {
            //$scope.ConstatacaoDanosEAcessoriosItems();
        });
    };
    
    $scope.Historico_Func = function () {

        //debugger;

        var RestricoesBadges = 0;
        var HistoricoLeilaoBadges = 0;
        var RecallBadges = 0;
        var RouboFurtoBadges = 0;
        var IpvaMultasBadges = 0;
        var AcidentesBadges = 0;
        var OutrosBadges = 0;

        var TotalHistorico = 0;

        var totalHistoricoConform = 0;
        var totalHistoricoNaoConform = 0;
        var totalHistoricoObs = 0;

        var GenericMotherClass = {};


        totalHistoricoConform = 0;

        HistoricoTotal = 0
        HistoricoColor.TOTAL_NAO_CONFORM = 0;
        HistoricoColor.TOTAL_CONFORM_COM_OBS = 0;
        HistoricoColor.TOTAL_CONFORM = 0;

        $scope.HistoricoTotal = HistoricoTotal;
        $scope.HistoricoColor = HistoricoColor;

        // --------- Variaveis ----------//               
        var model =
        {
            ColetaID: _checkauto.ConsultaID,
            ProdutoNome: "ChamadaProc",
            NrColeta: _checkauto.NrColeta,
        };

        var parceiro = 0;
        var produto = _checkauto.ProdutoID;
        var coleta = 0;
        var impressao = false;
        // --------- Variaveis ----------//

        //----------- JavaScript framework --------//
        var x2js = new X2JS();
        //----------- JavaScript framework --------//


        //----------------------------------------------------- RECAL TOTAL ITENS AVALIAR = 1 -----------------------------------------------------------//
        var XmlRecall = x2js.xml_str2json(_checkauto.XMLRecall);
        var retorno1 = XmlRecall != null ? XmlRecall.Recall.QtdRegistros : "OK"; // codigo 2 = DescricaoRetorno NÃO HÁ REGISTRO NAS BASES CONSULTADAS
        //----------------------------------------------------- RECAL TOTAL ITENS AVALIAR = 1 -----------------------------------------------------------



        var XMLAcidentes = x2js.xml_str2json(_checkauto.XMLAcidentes);
        var retorno2 = XMLAcidentes != null ? (XMLAcidentes.Acidentes.CodigoRetorno == "3" ? "OK" : (XMLAcidentes.Acidentes.CodigoRetorno == "0" ? "OK" : "NOK")) : "OK"; // codigo 2 = outros NADA CONSTA

        var XMLAgregadoCompleto = x2js.xml_str2json(_checkauto.XMLAgregadoCompleto);
        //var retorno3 = XMLAgregadoCompleto != null ? XMLAgregadoCompleto.Acidentes.Outros : "NOK";
        var retorno3 = XMLAgregadoCompleto != null ? XMLAgregadoCompleto.AgregadoCompleto.CodigoRetorno : "OK";

        var XMLDuplicidadeMotor = x2js.xml_str2json(_checkauto.XMLDuplicidadeMotor);
        var retorno4 = XMLDuplicidadeMotor != null ? XMLDuplicidadeMotor.DuplicidadeMotor.Quantidade : "OK"; // codigo 2 = DescricaoRetorno = NÃO HÁ REGISTRO NAS BASES CONSULTADAS

        var XMLDecodificadorChassi = x2js.xml_str2json(_checkauto.XMLDecodificadorChassi);
        var retorno5 = XMLDecodificadorChassi != null ? XMLDecodificadorChassi.DecodificadorChassi.CodigoRetornoo : "OK"; // codigo = 1 DescricaoRetorno = DECODIFICACAO REALIZADA

        var XMLFraudes = x2js.xml_str2json(_checkauto.XMLFraudes);
        var retorno6 = XMLFraudes != null ? XMLFraudes.Fraudes.CRLVBloqueado.CodigoRetorno : "OK"; // 4 CRLV DescricaoRetorno = NÃO INFORMADO

        var XMLGarantiaProcedencia = x2js.xml_str2json(_checkauto.XMLGarantiaProcedencia);
        var retorno7 = XMLGarantiaProcedencia != null ? XMLGarantiaProcedencia.GarantiaProcedencia.CodigoRetorno : "OK"; // codigo 2 DescricaoRetorno = NÃO HÁ REGISTRO NAS BASES CONSULTADAS

        var XMLGravacaoPecas = x2js.xml_str2json(_checkauto.XMLGravacaoPecas);
        var retorno8 = XMLGravacaoPecas != null ? XMLGravacaoPecas.Gravacao.CodigoRetorno : "OK"; //// codigo 2 DescricaoRetorno = NÃO HÁ REGISTRO NAS BASES CONSULTADAS

        var XMLHistoricoConsultas = x2js.xml_str2json(_checkauto.XMLHistoricoConsultas);
        var retono9 = XMLHistoricoConsultas != null ? XMLHistoricoConsultas.HistoricoConsultas.QtdeConsultas : "OK"; // total de consultas realizadas

        var XMLHistoricoRouboFurto = x2js.xml_str2json(_checkauto.XMLHistoricoRouboFurto);
        var retorno10 = XMLHistoricoRouboFurto != null ? XMLHistoricoRouboFurto.HistoricoRouboFurto.CodigoRetorno : "OK"; // condigo 2 OK DescricaoRetorno nada consta  // condigo 1 DescricaoRetorno = CONSTA OCORRÊNCIA

        var XMLKM = x2js.xml_str2json(_checkauto.XMLKM);
        var retorno11 = XMLKM != null ? XMLKM.Km.CodigoRetorno : "OK"; // 2  codigo = 1 DescricaoRetorno = "INFORMACAO ENCONTRADA"

        var XMLLeilao = x2js.xml_str2json(_checkauto.XMLLeilao);
        var retorno12 = XMLLeilao != null ? XMLLeilao.Leilao.CodigoRetorno : "OK"; // codigo = 2 DescricaoRetorno = NÃO HÁ REGISTRO NAS BASES CONSULTADAS

        var XMLLeilao2 = x2js.xml_str2json(_checkauto.XMLLeilao2);
        var retorno13 = XMLLeilao2 != null ? XMLLeilao2 : "OK";

        var XMLLeilaoRemarketing = x2js.xml_str2json(_checkauto.XMLLeilaoRemarketing);
        var retorno14 = XMLLeilaoRemarketing != null ? XMLLeilaoRemarketing.LeilaoRemarketingBase2 : "OK";

        var XMLRouboFurto = x2js.xml_str2json(_checkauto.XMLRouboFurto);
        var retorno15 = XMLRouboFurto != null ? XMLRouboFurto : "OK";

        // ----------------------- validações ------------------------- //

        //-------------------------- RECALL TOTAL ITENS = 1 ------------------------------//

        var countRecall = 0;

        //if (retorno1 != "NOK" || retorno1 == "OK" || retorno1 == "0")
        //{
        HistoricoColor.XMLRecall = "#AFD249";
        totalHistoricoConform = totalHistoricoConform + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //RecallBadges = RecallBadges + 1;
        countRecall = countRecall + 1;
        //}
        //else {
        //    HistoricoColor.XMLRecall = "#ED1C24";
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        //    //RecallBadges = RecallBadges + 1;
        //    countRecall = countRecall + 1;
        //}


        //-------------------------- RECALL TOTAL ITENS = 1 -------------------------------//

        //------------------------------------- ACIDENTES -------------------------------------//

        var Countacidentes = 0;

        if (retorno2 == "OK") {
            HistoricoColor.ACIDENTES = "#AFD249";
            //AcidentesBadges = AcidentesBadges + 1;
            //Countacidentes = Countacidentes + 1;
            //ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.ACIDENTES = "#AFD249";
            //AcidentesBadges = AcidentesBadges + 1;
            //Countacidentes = Countacidentes + 1;
            //ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        }

        //------------------------------------- ACIDENTES -------------------------------------//

        //ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //-------------------------- ROUBO E FURTO TOTAL ITENS = 1 -------------------------------//

        var countRouboF = 0;

        var ok5 = XMLHistoricoRouboFurto.HistoricoRouboFurto.DescricaoRetorno == "NADA CONSTA" || XMLHistoricoRouboFurto.HistoricoRouboFurto.DescricaoRetorno == "SISTEMA INDISPONIVEL" ? "OK" : "NOK"; // XMLHistoricoRouboFurto
        if (ok5 == "OK") {
            HistoricoColor.RouboFurto = "#AFD249";
            totalHistoricoConform = totalHistoricoConform + 1;
            RouboFurtoBadges = RouboFurtoBadges + 1;

            countRouboF = countRouboF + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        }
        else {
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            HistoricoColor.RouboFurto = "#ED1C24";
            RouboFurtoBadges = RouboFurtoBadges + 1;

            countRouboF = countRouboF + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        //-------------------------- ROUBO E FURTO TOTAL ITENS = 1 -------------------------------//


        //-------------------------- OFERTA EM LEILAO TOTAL ITENS = 3 ------------------------------//


        var countLeilao = 0;  

        var XMLLeilao = x2js.xml_str2json(_checkauto.XMLLeilao);
        var XMLLeilao2 = x2js.xml_str2json(_checkauto.XMLLeilao2);
        var XMLLeilaoRemarketing = x2js.xml_str2json(_checkauto.XMLLeilaoRemarketing);
        var leilao3
        if (_checkauto.HistoricoLeilaoStatusAvarias != null) {
            leilao3 = _checkauto.HistoricoLeilaoStatusAvarias == "B" || _checkauto.HistoricoLeilaoStatusAvarias == "C" ? "VERMELHO" : "AMARELO";
        } else { leilao3 = "NADA CONSTA" }

        var leilao0 = _checkauto.HistoricoLeilao == "NADA CONSTA" || _checkauto.HistoricoLeilao == null ? "VERDE" : "AMARELO";
        var leilao1 = _checkauto.HistoricoLeilao2 == "NADA CONSTA" || _checkauto.HistoricoLeilao2 == null ? "VERDE" : "VERMELHO";
        var leilao2 = _checkauto.HistoricoLeilaoRemarketing == "NADA CONSTA" || _checkauto.HistoricoLeilaoRemarketing == null ? "VERDE" : "VERMELHO";


        if (leilao0 == "VERMELHO" || leilao2 == "VERMELHO" || leilao3 == "VERMELHO" || leilao1 == "VERMELHO") {
            HistoricoColor.HistoricoLeilao = "#ED1C24";

            StatusLeilao.HistoricoLeilao = leilao0
            StatusLeilao.HistoricoLeilao1 = leilao2
            StatusLeilao.HistoricoLeilao2 = leilao3

            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;
            countLeilao = countLeilao + 1;
        }
        else {
            if (leilao0 == "VERDE" && leilao1 == "VERDE" && leilao2 == "VERDE") {
                HistoricoColor.HistoricoLeilao = "#AFD249";

                StatusLeilao.HistoricoLeilao = leilao0
                StatusLeilao.HistoricoLeilao1 = leilao2
                StatusLeilao.HistoricoLeilao2 = leilao3

                totalHistoricoConform = totalHistoricoConform + 1;
                HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;
                countLeilao = countLeilao + 1;
                ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
            }
            else {

                HistoricoColor.HistoricoLeilao = "#FDB813";

                StatusLeilao.HistoricoLeilao = leilao0
                StatusLeilao.HistoricoLeilao1 = leilao2
                StatusLeilao.HistoricoLeilao2 = leilao3

                totalHistoricoObs = totalHistoricoObs + 1;
                HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;
                countLeilao = countLeilao + 1;
                ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;

            }
        }

        $scope.StatusLeilao = StatusLeilao;

        //var retorno12 = null;
        //var retorno13 = null;
        //var retorno14 = null;

        //if (XMLLeilao != null) {
        //    var retorno12 = XMLLeilao.Leilao.CodigoRetorno == 2 ? "OK" : "NOK";

        //    if (retorno12 == "OK") {
        //        //HistoricoColor.HistoricoLeilao = "#AFD249";
        //        totalHistoricoConform = totalHistoricoConform + 1;
        //        HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;
        //        countLeilao = countLeilao + 1;
        //        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        //    }
        //    else {
        //        ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        //    }
        //}
        //else {
        //    HistoricoColor.HistoricoLeilao = "#AFD249";
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;
        //    countLeilao = countLeilao + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}

        //if (XMLLeilao2 != null) {
        //    var retorno13 = XMLLeilao2.Leilao.CodigoRetorno == 2 || XMLLeilao.Leilao.CodigoRetorno == null ? "OK" : "NOK";
        //    if (retorno13 == "OK") {
        //        //HistoricoColor.HistoricoLeilao = "#AFD249";
        //        totalHistoricoConform = totalHistoricoConform + 1;
        //        HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;

        //        countLeilao = countLeilao + 1;
        //        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //    }
        //    else {
        //        ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        //    }

        //}
        //else {
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;

        //    countLeilao = countLeilao + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}

        //if (XMLLeilaoRemarketing != null) {
        //    var retorno14 = XMLLeilaoRemarketing.LeilaoRemarketingBase2.CodigoRetorno == 2 ? "OK" : "NOK";

        //    if (retorno14 == "OK") {
        //        //HistoricoColor.HistoricoLeilao = "#AFD249";
        //        totalHistoricoConform = totalHistoricoConform + 1;
        //        HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;

        //        countLeilao = countLeilao + 1;
        //        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //    }
        //    else {
        //        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //    }
        //}
        //else {
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    HistoricoLeilaoBadges = HistoricoLeilaoBadges + 1;

        //    countLeilao = countLeilao + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}

        // codigo = 2 DescricaoRetorno = NÃO HÁ REGISTRO NAS BASES CONSULTADAS
        //-------------------------- OFERTA EM LEILAO TOTAL ITENS = 3 ------------------------------//



        //-------------------------- IPVA/MULTAS TOTAL ITENS = 6 ------------------------------//


        var erroIPVAMULTAS = 0;
        var countIpvaMultas = 0;

        var DebitoIPVA = "";
        if (_checkauto.DebitoIPVA != null) {
            DebitoIPVA = _checkauto.DebitoIPVA == "NÃO EXISTE DÉBITO" ? "OK" : "NOK";
        } else { DebitoIPVA = "OK"; }

        var ValorDebitoIPVA = "";
        if (_checkauto.ValorDebitoIPVA != null) {
            ValorDebitoIPVA = _checkauto.ValorDebitoIPVA == null || _checkauto.ValorDebitoIPVA == 0 ? "OK" : "NOK";
        } else { ValorDebitoIPVA = "OK"; }
        var DebitoMulta = "";
        if (_checkauto.DebitoMulta != null) {
            DebitoMulta = _checkauto.DebitoMulta == "NÃO EXISTE DÉBITO" ? "OK" : "NOK";
        } else { DebitoMulta = "OK"; }

        var ValorDebitoLicenciamento = _checkauto.ValorDebitoLicenciamento == null || _checkauto.ValorDebitoLicenciamento == 0 ? "OK" : "NOK";
        var ValorDebitoDPVAT = _checkauto.ValorDebitoDPVAT == null || _checkauto.ValorDebitoDPVAT == 0 || _checkauto.ValorDebitoDPVAT == 3 ? "OK" : "NOK";

        if (DebitoIPVA == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            IpvaMultasBadges = IpvaMultasBadges + 1;

            countIpvaMultas = countIpvaMultas + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        }
        else {
            erroIPVAMULTAS = erroIPVAMULTAS + 1
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            IpvaMultasBadges = IpvaMultasBadges + 1;

            countIpvaMultas = countIpvaMultas + 1;
            ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        }

       
        if (DebitoMulta == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            IpvaMultasBadges = IpvaMultasBadges + 1;

            countIpvaMultas = countIpvaMultas + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        }
        else {
            erroIPVAMULTAS = erroIPVAMULTAS + 1
            IpvaMultasBadges = IpvaMultasBadges + 1;

            countIpvaMultas = countIpvaMultas + 1;
            ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        }

       
        //if (ValorDebitoIPVA == "OK") {
        //    HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    IpvaMultasBadges = IpvaMultasBadges + 1;

        //    countIpvaMultas = countIpvaMultas + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}
        //else
        //{
        //    erroIPVAMULTAS = erroIPVAMULTAS + 1
        //    IpvaMultasBadges = IpvaMultasBadges + 1;
        //    HistoricoColor.TOTAL_CONFORM_COM_OBS = HistoricoColor.TOTAL_CONFORM_COM_OBS + 1;
        //    countIpvaMultas = countIpvaMultas + 1;
        //    ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        //}

       
        if (ValorDebitoLicenciamento == "OK")
        {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            IpvaMultasBadges = IpvaMultasBadges + 1;

            countIpvaMultas = countIpvaMultas + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        }
        else
        {
            erroIPVAMULTAS = erroIPVAMULTAS + 1
            IpvaMultasBadges = IpvaMultasBadges + 1;

            countIpvaMultas = countIpvaMultas + 1;
            ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        }

      
        //if (ValorDebitoDPVAT == "OK") {
        //    HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    IpvaMultasBadges = IpvaMultasBadges + 1;

        //    countIpvaMultas = countIpvaMultas + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}
        //else {
        //    erroIPVAMULTAS = erroIPVAMULTAS + 1
        //    IpvaMultasBadges = IpvaMultasBadges + 1;

        //    countIpvaMultas = countIpvaMultas + 1;
        //    ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        //}

       
        //if (ValorDebitoMultas == "OK") {
        //    HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    IpvaMultasBadges = IpvaMultasBadges + 1;

        //    countIpvaMultas = countIpvaMultas + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}
        //else {
        //    erroIPVAMULTAS = erroIPVAMULTAS + 1
        //    IpvaMultasBadges = IpvaMultasBadges + 1;

        //    countIpvaMultas = countIpvaMultas + 1;
        //    ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        //}


        if (erroIPVAMULTAS > 0) {
            HistoricoColor.IPVAMULTAS = "#FDB813";
        }
        else {
            HistoricoColor.IPVAMULTAS = "#AFD249";
        }

        //-------------------------- IPVA/MULTAS TOTAL ITENS = 6 ------------------------------//



        //-------------------------------------- RESTRIÇÕES TOTAL ITENS = 21 --------------------------------------//

        var countRestricoes = 0;
        var Restricoes = true;

        // 1 ---- SITUAÇÃO
        var Situacao = _checkauto.TipoChassi != null || _checkauto.TipoChassi != "" && _checkauto.TipoChassi == "NORMAL" ? "OK" : "NOK"

        if (Situacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        }


        // 2 ---- TIPO CHASSI
        var Situacao = _checkauto.Situacao != null || _checkauto.Situacao != "" && _checkauto.Situacao == "BAIXADO" ? "OK" : "NOK"

        if (Situacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 3 ---- RESTRIÇÃO DE ROUBO E FURTO
        if (retorno10 == "2" || retorno10 == "0") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }


        // 4 ---- RESTRIÇÃO JUDICIAL (BIN)
        if (_checkauto.Judicial == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;


            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }


        // 5 ---- RESTRIÇÃO JUDICIAL (RENAJUD)
        if (_checkauto.RestricaoRENAJUD == null || _checkauto.RestricaoRENAJUD == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;


            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;


            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 6 ---- RESTRIÇÃO DE ALIENAÇÃO FIDUCIÁRIA
        if (_checkauto.Alienacao == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        }
        else {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM_COM_OBS + 1;
            totalHistoricoObs = totalHistoricoObs + 1;
            RestricoesBadges = RestricoesBadges + 1;
            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;
        }
        //else {
        //    HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_CONFORM_COM_OBS + 1;
        //    totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
        //    RestricoesBadges = RestricoesBadges + 1;
        //    Restricoes = false;

        //    countRestricoes = countRestricoes + 1;
        //    ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;

        //}

        // 7 ---- RESTRIÇÃO ADMINSTRATIVA
        if (_checkauto.Administrativa == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 8 ---- RESTRIÇÃO DE ARRENDAMENTO
        if (_checkauto.Arrendamento == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        }
        else {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        }

        // 9 ---- RESTRIÇÃO DE BENEFICIO TRIBUTÁRIO
        if (_checkauto.Tributario == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 10 ---- RESTRIÇÃO DE RESERVA DE DOMINIO
        if (_checkauto.ReservaDominio == "" || _checkauto.ReservaDominio == "NADA CONSTA" || _checkauto.ReservaDominio == null) {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        }

        // 11 ---- RESTRIÇÃO DE BLOQUEIO
        if (_checkauto.RestricaoBloqueio == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 12 ---- VEICULO SINISTRADO
        if (_checkauto.VeiculoSinistrado == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        }

        // 13 ---- ARROLAMENTO DE BENS
        if (_checkauto.ArrolamentoBens == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 14 ---- RESTRIÇÃO DE AVERBAÇÃO
        if (_checkauto.RestricaoAverbacao == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 15 ---- VEICULO BAIXADO DE CIRCULAÇÃO
        if (_checkauto.VeiculoBaixadoCirculacao == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 16 ---- COMUNICAÇÃO DE VENDA
        if (_checkauto.ComunicacaoVenda == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;


        }

        // 17 ---- RESTRIÇÃO DE APROPRIAÇÃO INDÉBITA
        if (_checkauto.RestricaoApropriacao == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;


        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 18 ---- RESTRIÇÃO NO CRLV
        //if (_checkauto.RestricaoCRLV == "NADA CONSTA") {
        //    HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    RestricoesBadges = RestricoesBadges + 1;

        //    countRestricoes = countRestricoes + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        //} else {
        //    HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
        //    totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
        //    RestricoesBadges = RestricoesBadges + 1;
        //    Restricoes = false;

        //    countRestricoes = countRestricoes + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        //}

        // 19 ---- HISTORICO DE LEILÃO (DETRAN)
        if (_checkauto.PossuiHistoricodeLeilao == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            regradeLeilao = "N";
            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        }
        else {
            HistoricoColor.TOTAL_CONFORM_COM_OBS = HistoricoColor.TOTAL_CONFORM_COM_OBS + 1;
            totalHistoricoObs = totalHistoricoObs + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;
            regradeLeilao = "P";
            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_OBSERCONFORM = ModelTotalizadores.HIST_OBSERCONFORM + 1;

        }

        // 20 ---- VEICULO APRENDIDO
        if (_checkauto.VeiculoApreendido == "NADA CONSTA") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 21 ---- RESTRIÇÃO DE PENHORA
        if (_checkauto.RestricaoPenhora == "NADA CONSTA" || _checkauto.RestricaoPenhora == null) {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            RestricoesBadges = RestricoesBadges + 1;
            Restricoes = false;

            countRestricoes = countRestricoes + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        }

        //-------------------------------------- RESTRIÇÕES TOTAL ITENS = 21 --------------------------------------//


        //-------------------------------------- OUTROS TOTAL ITENS = 48 --------------------------------------//

        var countOutros = 0;

        var outrosOK = true;

        // 1 ---- CHASSI --- VERIFICAR ---
        //var chassiRetornoIdentificacao = IdentificacaoColor.CHASSI == "#AFD249" ? "OK" : "NOK";

        //if (chassiRetornoIdentificacao == "OK") {
        //    HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    OutrosBadges = OutrosBadges + 1;

        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        //} else {
        //    HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
        //    totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
        //    OutrosBadges = OutrosBadges + 1;
        //    outrosOK = false;

        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        //}



        // 2 ---- PLACA --- VERIFICAR ---
        //var PlacaRetornoIdentificacao = IdentificacaoColor.PLACAS == "#AFD249" ? "OK" : "NOK";
        //if (PlacaRetornoIdentificacao == "OK") {
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;

        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        //} else {
        //    HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
        //    totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
        //    OutrosBadges = OutrosBadges + 1;
        //    outrosOK = false;

        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        //}

        // 3  ---- COR --- VERIFICAR ---
        var CorRetornoIdentificacao = _checkauto.RestricaoCRLV == "NADA CONSTA" || _checkauto.RestricaoCRLV == null || _checkauto.RestricaoCRLV == "" ? "OK" : "NOK"  //IdentificacaoColor.CRLV == "#AFD249" ? "OK" : "NOK";
        if (CorRetornoIdentificacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            OutrosBadges = OutrosBadges + 1;
            outrosOK = false;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        }


        // 4  ---- MARCA/MODELO --- VERIFICAR ---

        var Modelo = null;
        var ModeloValue = null;

        if (XMLDecodificadorChassi.DecodificadorChassi.Complemento != undefined && XMLDecodificadorChassi.DecodificadorChassi.Complemento != "") 
        {
            Modelo = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Modelo"; })[0].Rotulo
            ModeloValue = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Modelo"; })[0].Descricao
        } 
        else 
        {
            Modelo = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
            ModeloValue = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
        }

        var ModeloRetornoIdentificacao = modelHeader1.Modelo != null ? "OK" : "NOK";
        var MarcaRetornoIdentificacao = modelHeader1.Marca != null ? "OK" : "NOK";

        if (ModeloRetornoIdentificacao == "OK" || MarcaRetornoIdentificacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            OutrosBadges = OutrosBadges + 1;
            outrosOK = false;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }


        // 5  ---- ANO/FABRICAÇÃO --- VERIFICAR ---

        var AnoFabricacao = null;
        var AnoFabricacaoValue = null;
        if (XMLDecodificadorChassi.DecodificadorChassi.Complemento != undefined && XMLDecodificadorChassi.DecodificadorChassi.Complemento != "") {
            AnoFabricacao = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Ano Fabricacao"; })[0].Rotulo
            AnoFabricacaoValue = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Ano Fabricacao"; })[0].Descricao
        } else {
            AnoFabricacao = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
            AnoFabricacaoValue = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
        }

        var AnoFabricacaoRetornoIdentificacao = modelHeader1.AnoFabricacao != null ? "OK" : "NOK";

        if (AnoFabricacaoRetornoIdentificacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            OutrosBadges = OutrosBadges + 1;
            outrosOK = false;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 6  ---- ANO/MODELO --- VERIFICAR ---

        var AnoModelo = "";
        var AnoModeloValue = "";
        if (XMLDecodificadorChassi.DecodificadorChassi.Complemento != undefined && XMLDecodificadorChassi.DecodificadorChassi.Complemento != "") {
            AnoModelo = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Ano Modelo"; })[0].Rotulo
            AnoModeloValue = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Ano Modelo"; })[0].Descricao
        } else {
            AnoModelo = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
            AnoModeloValue = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
        }

        var AnoModeloRetornoIdentificacao = modelHeader1.AnoModelo != null ? "OK" : "NOK";

        if (AnoModeloRetornoIdentificacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            OutrosBadges = OutrosBadges + 1;
            outrosOK = false;


            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        }

        // 7  ---- COMBUSTIVEL --- VERIFICAR ---

      
        var Combustivel = "";
        var CombustivelValue = "";
        if (XMLDecodificadorChassi.DecodificadorChassi.Complemento != undefined && XMLDecodificadorChassi.DecodificadorChassi.Complemento != "") {
            if (XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Combustível" })[0] != undefined) {
                Combustivel = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Combustível" })[0].Rotulo
                CombustivelValue = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Combustível" })[0].Descricao
            }
        }
        else {
            Combustivel = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
            CombustivelValue = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
        }
        var CombustivelRetornoIdentificacao = modelHeader1.Combustivel != null ? "OK" : "NOK";

        if (CombustivelRetornoIdentificacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            OutrosBadges = OutrosBadges + 1;
            outrosOK = false;


            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        }

        var TipoDeVeiculo = null;
        var TipoDeVeiculoVAlue = null;
        // 8  ---- TIPO DE VEICULO   --- VERIFICAR ---   
        if (XMLDecodificadorChassi.DecodificadorChassi.Complemento != undefined && XMLDecodificadorChassi.DecodificadorChassi.Complemento != "") {
            if (XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Tipo Veiculo"; })[0] != undefined) {
                TipoDeVeiculo = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Tipo Veiculo"; })[0].Rotulo
                TipoDeVeiculoVAlue = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Tipo Veiculo"; })[0].Descricao
            }
        } else {
            TipoDeVeiculo = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
            TipoDeVeiculoVAlue = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
        }

        //var TipoVeiculoRetornoIdentificacao = _checkauto.TipoVeiculo == null ? "OK" : "NOK";

        //if (TipoVeiculoRetornoIdentificacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        //} else {
        //    HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
        //    totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
        //    OutrosBadges = OutrosBadges + 1;
        //    outrosOK = false;

        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        //}


        // 9  ---- ESPECIE --- VERIFICAR ---
        var Especie = null;
        var EspecieValue = null;
        // 8  ---- TIPO DE VEICULO   --- VERIFICAR ---   
        if (XMLDecodificadorChassi.DecodificadorChassi.Complemento != undefined && XMLDecodificadorChassi.DecodificadorChassi.Complemento != "") {
            if (XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Especie Veiculo"; })[0] != undefined) {
                Especie = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Especie Veiculo"; })[0].Rotulo
                EspecieValue = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Especie Veiculo"; })[0].Descricao
            }
        }
        else {
            Especie = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
            EspecieValue = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
        }

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 10 ---- POTENCIA --- VERIFICAR ---

        var Potencia = null;

        if (XMLDecodificadorChassi.DecodificadorChassi.Complemento != undefined && XMLDecodificadorChassi.DecodificadorChassi.Complemento != "") {
            if (XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Potência"; })[0] != undefined) {
                Potencia = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Potência"; })[0].Rotulo
            }
        } else {
            Potencia = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
        }
        var PotenciaRetornoIdentificacao = _checkauto.Potencia != null ? "OK" : "NOK";

        if (PotenciaRetornoIdentificacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        } else {
            HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
            totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
            OutrosBadges = OutrosBadges + 1;
            outrosOK = false;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        }

        // 11 ---- CAPACIDADE DE PASSAGEIROS --- VERIFICAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 12 ---- PROCEDENCIA --- VERIFICAR ---
        //var ProcedenciaRetornoIdentificacao = _checkauto.RetGarantiaProcedencia == 1 ? "OK" : "NOK";

        //if (ProcedenciaRetornoIdentificacao == "OK") {
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;

        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        //} else {
        //    HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
        //    totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
        //    OutrosBadges = OutrosBadges + 1;
        //    outrosOK = false;

        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        //}

        // 13 ---- MUNICIPIO --- VERIFICAR ---
        //var MunicipioRetornoIdentificacao = _checkauto.Municipio != null ? "OK" : "NOK";

        //if (MunicipioRetornoIdentificacao == "OK") {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;

            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        //} else {
        //    HistoricoColor.TOTAL_NAO_CONFORM = HistoricoColor.TOTAL_NAO_CONFORM + 1;
        //    totalHistoricoNaoConform = totalHistoricoNaoConform + 1;
        //    OutrosBadges = OutrosBadges + 1;
        //    outrosOK = false;

        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;

        //}


        // 14 ---- UF DA PLACA --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 15 ---- CATEGORIA --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 16 ---- DATA DA ULTIMA ALTERAÇÃO --- --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 17 ---- ANO FABRI/MO A PARTIR DE 99 --- VERIFICAR ---
        var AnoFabricacaoModeloApartir = null;
        var AnoFabricacaoModeloApartirValue = null;

        if (XMLDecodificadorChassi.DecodificadorChassi.Complemento != undefined && XMLDecodificadorChassi.DecodificadorChassi.Complemento != "") {
            if (XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Ano Fabr/Mod a partir de 99"; })[0] != undefined) {
                AnoFabricacaoModeloApartir = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Ano Fabr/Mod a partir de 99"; })[0].Rotulo;
                AnoFabricacaoModeloApartirValue = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Ano Fabr/Mod a partir de 99"; })[0].Descricao;
            }
        } else {

            AnoFabricacaoModeloApartir = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
            AnoFabricacaoModeloApartirValue = XMLDecodificadorChassi.DecodificadorChassi.CodigoRetorno == "2" ? "OK" : "NOK";
        }

        //if (AnoFabricacaoModeloApartirValue > 1999 || AnoFabricacaoModeloApartirValue == "OK") {
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //} else {
        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}

        // 18 ---- CAMBIO
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 19 ---- CC MOTOR --- VERIFICAR ---

        //var CCmotor = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "cc Motor"; }).length;
        //var CCmotorValue = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "cc Motor"; }).length;

        //if (IdentificacaoColor.MOTOR == "#AFD249") {
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //} else {
        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        //}

        // 20 ---- COMBUSTIVEL --- VERIFICAR ---
        //var Combustivel = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Combustível"; })[0].Rotulo
        //if (IdentificacaoColor.CRLV == "#AFD249") {
        //    HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        //    totalHistoricoConform = totalHistoricoConform + 1;
        //    OutrosBadges = OutrosBadges + 1;
        //}


        // 21 ---- FABRICANTE --- VERIFICAR ---          
        //if (IdentificacaoColor.PLACAS == "#AFD249") {
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;

        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}
        //else {
        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        //}

        // 22 ---- LOCALIZAÇÃO DA FABRICA --- CONTABILIZAR ---

        // var LocalizacaoDaFabrica = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Localização da Fábrica"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 23 ---- PAIS --- CONTABILIZAR ---

        //var Pais = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "País"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 24 ---- REGIÃO GEOGRAFICA --- CONTABILIZAR ---

        //var RegiaoGeografica = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Região Geográfica"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 25 ---- UTILIZAÇÃO
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 26 ---- VEICULO

        //var Veiculo = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Veículo"; }).length;

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 27 ---- VERSÃO

        //var Versao = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Versão"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 28 ---- COMPLEMENTOS
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;



        // 29 ---- MODELO

        //var Modelo = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Modelo"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 30 ---- FABRICANTE

        //var Fabricante = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Fabricante"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 31 ---- TIPO VEICULO

        //var TipoVeiculo = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Tipo Veiculo"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 32 ---- ESPECIE VEICULO

        //var EspecieVeiculo = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Especie Veiculo"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 33 ---- COMBUSTIVEL

        //var Combustivel = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Combustível"; })[0].Rotulo

        // 34 ---- ANO MODELO

        //var AnoModelo = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Ano Modelo"; })[0].Rotulo

        if (_checkauto.RestricaoCRLV == "NADA CONSTA" || _checkauto.RestricaoCRLV == null) {
            HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
            totalHistoricoConform = totalHistoricoConform + 1;
            OutrosBadges = OutrosBadges + 1;
            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        }
        else {
            countOutros = countOutros + 1;
            ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        }

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        // 35 ---- ANO FABRICAÇÃO

        //var AnoFabricacao = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Ano Fabricacao"; })[0].Rotulo

        //if (IdentificacaoColor.CRLV == "#AFD249")
        //{
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        //}
        //else
        //{
        //    countOutros = countOutros + 1;
        //    ModelTotalizadores.HIST_NAOCONFORM = ModelTotalizadores.HIST_NAOCONFORM + 1;
        //}

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 36 ---- POTENCIA

        //var Potencia = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Potência"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 37 ---- TIPO DE CARROCERIA

        //var Carroceria = XMLDecodificadorChassi.DecodificadorChassi.Registro.filter(function (Value) { return Value.Rotulo == "Carroceria" || Value.Rotulo == "Tipo da Carroçaria"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 38 ---- CILINDRADAS

        //var Cilindradas = XMLDecodificadorChassi.DecodificadorChassi.Complemento.Registro.filter(function (Value) { return Value.Rotulo == "Cilindradas" || Value.Rotulo != null ? Value.Rotulo : "0"; })[0].Rotulo

        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 39 ---- DEKRA SECURITY (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 40 ---- DEKRA GARANTIDO (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 41 ---- INSPEÇÃO VEICULAR (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 42 ---- GRAVAÇÃO DE PEÇAS (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 43 ---- HISTÓRICO DE CONSULTAS (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 44 ---- DOCUMENTOS EXTRAVIADOS (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 45 ---- DUPLICIDADE DE MOTOR (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 46 ---- HISTORICO DE ROUBO/FURTO (BASE INTERNA) (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 47 ---- HISTORICO DE KM (1 ITEM) --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1;
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;

        // 48 ---------------------- VEICULO/VALOR --- CONTABILIZAR ---
        HistoricoColor.TOTAL_CONFORM = HistoricoColor.TOTAL_CONFORM + 1;
        totalHistoricoConform = totalHistoricoConform + 1;
        OutrosBadges = OutrosBadges + 1;
        countOutros = countOutros + 1; 
        ModelTotalizadores.HIST_CONFORM = ModelTotalizadores.HIST_CONFORM + 1;
        
        //-------------------------------------- OUTROS TOTAL ITENS = 48 --------------------------------------//

        if (HistoricoColor.TOTAL_NAO_CONFORM  > 0) {
             HistoricoColor.RESTRICOES = "#ED1C24";
        } else if (HistoricoColor.HIST_OBSERCONFORM > 0) {
            HistoricoColor.RESTRICOES = "#FDB813";
        }else{
            HistoricoColor.RESTRICOES = "#AFD249";
        }


        if (outrosOK == true) {
            HistoricoColor.OUTROS = "#AFD249";
        } else {
            HistoricoColor.OUTROS = "#ED1C24";
        }


        HistoricoColor.TOTAL_CONFORM = 0
        HistoricoColor.TOTAL_CONFORM_COM_OBS = 0
        HistoricoColor.TOTAL_NAO_CONFORM = 0

        $scope.HistoricoTotal = (countRecall + Countacidentes + countRouboF + countLeilao + countIpvaMultas + countRestricoes + countOutros)

        var datasourceHistorico = [];
        if (ModelTotalizadores.HIST_CONFORM != 0) { datasourceHistorico = [{ "label": "", "value": ModelTotalizadores.HIST_CONFORM, "color": "#AFD249" }]; }
        if (ModelTotalizadores.HIST_OBSERCONFORM != 0) { datasourceHistorico.push({ "label": "", "value": ModelTotalizadores.HIST_OBSERCONFORM, "color": "#FDB813" }); }
        if (ModelTotalizadores.HIST_NAOCONFORM != 0) { datasourceHistorico.push({ "label": "", "value": ModelTotalizadores.HIST_NAOCONFORM, "color": "#ED1C24" }); }

        console.log(datasourceHistorico);

        FusionCharts.ready(function () {

            Historico = new FusionCharts({

                "width": "100%",
                "height": "100%",
                "type": "doughnut2d",
                "renderAt": "ChartGraficoHistorico",
                "dataformat": "json",
                "dataSource":
                 {
                     "chart": {
                         "baseFontSize": "19",
                         "caption": "",
                         "labelDistance": "35",
                         "subCaption": "",
                         "numberPrefix": "",
                         "startingAngle": "90",
                         "decimals": "0",
                         "enableMultiSlicing": "0",
                         "use3DLighting": "0",
                         "defaultCenterLabel": "",
                         "pieRadius": "110",
                         "smartLineAlpha": "100",
                         "showLabels": "0",
                         "smartLineThickness": "1",
                         "showShadow": "0",
                         "captionFontSize": "14",
                         "subcaptionFontSize": "14",
                         "subcaptionFontBold": "0",
                         "showBorder": "0",
                         "centerLabelBold": "4",
                         "canvasBgColor": "#ffffff",
                         "baseFontColor": "#000000",
                         "bgColor": "#ffffff",
                         "doughnutRadius": "80",
                         "slicingDistance": "0",
                     }, "data": datasourceHistorico
                 }
            });
            //Historico.render();
        });

        $scope.CarregarDadosCheck()


    };

    $scope.chamadaGrafico1 = function () {

        TOTALGERAL = 0;
        $scope.TOTALGERAL = 0;
        $scope.TOTALGERAL = (TotalConform + TotalConformComObs + TotalNaoConform)

        var dadostotaisConform = 0;
        dadostotaisConform = (ModelTotalizadores.ESTADECONCER_CONFORM + ModelTotalizadores.ESTR_CONFORM + ModelTotalizadores.HIST_CONFORM + ModelTotalizadores.IDENT_CONFORM)
       
        var dadostotaisOBSConform = 0;
        dadostotaisOBSConform = (ModelTotalizadores.ESTADECONCER_OBSERCONFORM + ModelTotalizadores.ESTR_OBSERCONFORM + ModelTotalizadores.HIST_OBSERCONFORM + ModelTotalizadores.IDENT_OBSERCONFORM)
      
        var dadostotaisNaoConform = 0;
        dadostotaisNaoConform = (ModelTotalizadores.ESTADECONCER_NAOCONFORM + ModelTotalizadores.ESTR_NAOCONFORM + ModelTotalizadores.HIST_NAOCONFORM + ModelTotalizadores.IDENT_NAOCONFORM)
      
        $scope.DadosTotalNaoConformTela = dadostotaisNaoConform;

        //var DadosTotalConform = (dadostotaisConform * 0.288);
        //var DadosTotalConformComObs = (dadostotaisOBSConform * 0.3222)//(DadosTotalConform / 1.8) //(dadostotaisOBSConform * 0.3222);
        //var DadosTotalNaoConform = (50 - DadosTotalConform - DadosTotalConformComObs);

        var DadosTotalConform = 42.00 // (dadostotaisConform * 0.2111);      
        var DadosTotalConformComObs = dadostotaisOBSConform > 0 ? 6 : 0;
        if (DadosTotalConformComObs == 0) { DadosTotalConform = DadosTotalConform + 6; }
        var DadosTotalNaoConform = dadostotaisNaoConform > 0 ? 6 : 0;
        if (DadosTotalNaoConform == 0) { DadosTotalConform = DadosTotalConform + 6; }
       
        var datasourcePrincipalTotal = [{ "label": "", "displayValue": "", "labelAlpha": "0", "labelBgAlpha": "0", "alpha": "0", "value": "50", "color": "#FFFFFF" }];

        // vermelho 
        if (dadostotaisNaoConform != 0) {
            datasourcePrincipalTotal.push(
            {
                "label": "",
                "displayValue": dadostotaisNaoConform.toString(),
                "value": DadosTotalNaoConform,
                "labelFontSize": "15",
                "labelFontBold": "1",
                "labelBorderPadding": "0 0 0 0",
                "color": "#ED1C24"
            });
        }

        //laranja
        if (dadostotaisOBSConform != 0) {
            datasourcePrincipalTotal.push(
            {
                "label": "",
                "displayValue": dadostotaisOBSConform.toString(),
                "value": DadosTotalConformComObs,
                "labelFontSize": "15",
                "labelFontBold": "1",
                "labelBorderPadding": "0 0 0 0",
                "color": "#FDB813"
            });
        }

        //verde
        if (dadostotaisConform != 0) {
            datasourcePrincipalTotal.push(
            {
                "label": "",
                "displayValue": dadostotaisConform.toString(),
                "value": DadosTotalConform,
                "labelFontSize": "15",
                "labelFontBold": "1",
                "labelBorderPadding": "0 0 0 0",
                "color": "#AFD249"
            });
        }


        $scope.DadosTotalConform = 0;
        $scope.DadosTotalConform = (ModelTotalizadores.IDENT_CONFORM + ModelTotalizadores.ESTR_CONFORM + ModelTotalizadores.HIST_CONFORM + ModelTotalizadores.ESTADECONCER_CONFORM);

        $scope.DadosTotalConformComObs = 0;
        $scope.DadosTotalConformComObs = (ModelTotalizadores.IDENT_OBSERCONFORM + ModelTotalizadores.ESTR_OBSERCONFORM + ModelTotalizadores.HIST_OBSERCONFORM + ModelTotalizadores.ESTADECONCER_OBSERCONFORM);

        $scope.DadosTotalNaoConform = 0;
        $scope.DadosTotalNaoConform = (ModelTotalizadores.IDENT_NAOCONFORM + ModelTotalizadores.ESTR_NAOCONFORM + ModelTotalizadores.HIST_NAOCONFORM + ModelTotalizadores.ESTADECONCER_NAOCONFORM);

        FusionCharts.ready(function () {

            ChartGraficoPrincipal = new FusionCharts({

                "width": "100%",
                "height": "100%",
                "type": "doughnut2d",
                "renderAt": "ChartGraficoPrincipal",
                "dataformat": "json",
                "dataSource":
                 {
                     "chart": {
                         "showPercentValues": "0",
                         "labelDistance": "8",
                         "showPercentInTooltip": "0",
                         "enableSmartLabels": "0",
                         "enableMultiSlicing": "0",
                         "captionPadding": "1",
                         "useDataPlotColorForLabels": "1",
                         "caption": "",
                         "subCaption": "",
                         "numberPrefix": "",
                         "startingAngle": "180",
                         "decimals": "1",
                         "enableMultiSlicing": "0",
                         "use3DLighting": "0",
                         "defaultCenterLabel": "",
                         "pieRadius": "148",
                         "doughnutRadius": "77",
                         "slicingDistance": "0",
                         "smartLineAlpha": "150",
                         "showLabels": "1",
                         "smartLineThickness": "1",
                         "showShadow": "0",
                         "captionFontSize": "14",
                         "subcaptionFontSize": "14",
                         "subcaptionFontBold": "1",
                         "showBorder": "0",
                         "centerLabelBold": "1",
                         "canvasBgColor": "#ffffff",
                         "baseFontColor": "#000000",
                         "bgColor": "#ffffff",
                     }, "data": datasourcePrincipalTotal

                 }


            });

        });

        try {
            FusionCharts.ready(function () { Estrutura.render();});
            FusionCharts.ready(function () { Historico.render();});          
            FusionCharts.ready(function () { identificacao.render(); });
            FusionCharts.ready(function () { ChartGraficoPrincipal.render(); });
        }
        catch (err) {
            FusionCharts.ready(function () {
                Estrutura.render();
                Historico.render();               
                identificacao.render();
                ChartGraficoPrincipal.render();
            });
        }
        $scope.functionAmbientes();

    };

    $scope.HistoricoColor = HistoricoColor;

    $scope.EstruturaColor = EstruturaColor;

    $scope.modelHeader1 = modelHeader1;

    $scope.Indentificacao_Func();

    $scope.functionAmbientes = function () {

        var ambiente = "";


        if ($("#chkValorDebitoLicenciamento")[0].innerText != "NADA CONSTA" && $("#chkValorDebitoLicenciamento")[0].innerText != "NÃO APLICÁVEL" && $("#chkValorDebitoLicenciamento")[0].innerText != "NÃO APLICAVEL") {
            $("#chkValorDebitoLicenciamento")[0].style.color = 'RED'
        }

        if ($("#chkMultasIpva")[0].innerText != "NADA CONSTA" && $("#chkMultasIpva")[0].innerText != "NÃO APLICÁVEL" && $("#chkMultasIpva")[0].innerText != "NÃO APLICAVEL") {
            $("#chkMultasIpva")[0].style.color = 'RED'
        }

        if ($("#chkJudicial")[0].innerText != "NADA CONSTA" && $("#chkJudicial")[0].innerText != "NÃO APLICÁVEL" && $("#chkJudicial")[0].innerText != "NÃO APLICAVEL") {
            $("#chkJudicial")[0].style.color = 'RED'
        }

        if ($("#chkArrendamento")[0].innerText != "NADA CONSTA" && $("#chkArrendamento")[0].innerText != "NÃO APLICÁVEL" && $("#chkArrendamento")[0].innerText != "NÃO APLICAVEL") {
            $("#chkArrendamento")[0].style.color = 'RED'
        }

        if ($("#chkAdministrativa")[0].innerText != "NADA CONSTA" && $("#chkAdministrativa")[0].innerText != "NÃO APLICÁVEL" && $("#chkAdministrativa")[0].innerText != "NÃO APLICAVEL") {
            $("#chkAdministrativa")[0].style.color = 'RED'
        }

        if ($("#chkRestricaoBloqueio")[0].innerText != "NADA CONSTA" && $("#chkRestricaoBloqueio")[0].innerText != "NÃO APLICÁVEL" && $("#chkRestricaoBloqueio")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRestricaoBloqueio")[0].style.color = 'RED'
        }

        if ($("#chkArrolamentoBens")[0].innerText != "NADA CONSTA" && $("#chkArrolamentoBens")[0].innerText != "NÃO APLICÁVEL" && $("#chkArrolamentoBens")[0].innerText != "NÃO APLICAVEL") {
            $("#chkArrolamentoBens")[0].style.color = 'RED'
        }

        if ($("#chkRestricaoApropriacao")[0].innerText != "NADA CONSTA" && $("#chkRestricaoApropriacao")[0].innerText != "NÃO APLICÁVEL" && $("#chkRestricaoApropriacao")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRestricaoApropriacao")[0].style.color = 'RED'
        }

        if ($("#chkRestricaoPenhora")[0].innerText != "NADA CONSTA" && $("#chkRestricaoPenhora")[0].innerText != "NÃO APLICÁVEL" && $("#chkRestricaoPenhora")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRestricaoPenhora")[0].style.color = 'RED'
        }

        if ($("#chkRouboFurto")[0].innerText != "NADA CONSTA" && $("#chkRouboFurto")[0].innerText != "NÃO APLICÁVEL" && $("#chkRouboFurto")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRouboFurto")[0].style.color = 'RED'
        }

        if ($("#chkAlienacao")[0].innerText != "NADA CONSTA" && $("#chkAlienacao")[0].innerText != "NÃO APLICÁVEL" && $("#chkAlienacao")[0].innerText != "NÃO APLICAVEL") {
            $("#chkAlienacao")[0].style.color = 'RED'
        }

        if ($("#chkRestHistoricodeLeilao")[0].innerText != "NADA CONSTA" && $("#chkRestHistoricodeLeilao")[0].innerText != "NÃO APLICÁVEL" && $("#chkRestHistoricodeLeilao")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRestHistoricodeLeilao")[0].style.color = 'RED'
        }

        if ($("#chkRestHistoricodeLeilao2")[0].innerText != "NADA CONSTA" && $("#chkRestHistoricodeLeilao2")[0].innerText != "NÃO APLICÁVEL" && $("#chkRestHistoricodeLeilao2")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRestHistoricodeLeilao2")[0].style.color = 'RED'
        } else { document.getElementById("chkRestHistoricodeLeilao2").innerText = "NADA CONSTA" }

        if ($("#chkRestHistoricodeLeilaoRemarketing")[0].innerText != "NADA CONSTA" && $("#chkRestHistoricodeLeilaoRemarketing")[0].innerText != "NÃO APLICÁVEL" && $("#chkRestHistoricodeLeilaoRemarketing")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRestHistoricodeLeilaoRemarketing")[0].style.color = 'RED'
        } else { document.getElementById("chkRestHistoricodeLeilaoRemarketing").innerText = "NADA CONSTA" }

        if ($("#chkOfertadoLeilaoRemarketing")[0].innerText != "NADA CONSTA" && $("#chkOfertadoLeilaoRemarketing")[0].innerText != "NÃO APLICÁVEL" && $("#chkOfertadoLeilaoRemarketing")[0].innerText != "NÃO APLICAVEL") {
            $("#chkOfertadoLeilaoRemarketing")[0].style.color = 'RED'
        }

        if ($("#tbRENAJUD")[0].innerText != "NADA CONSTA" && $("#tbRENAJUD")[0].innerText != "NÃO APLICÁVEL" && $("#tbRENAJUD")[0].innerText != "NÃO APLICAVEL") {
            $("#tbRENAJUD")[0].style.color = 'RED'
        }

        if ($("#chkTributario")[0].innerText != "NADA CONSTA" && $("#chkTributario")[0].innerText != "NÃO APLICÁVEL" && $("#chkTributario")[0].innerText != "NÃO APLICAVEL") {
            $("#chkTributario")[0].style.color = 'RED'
        }

        if ($("#chkVeiculoSinistrado")[0].innerText != "NADA CONSTA" && $("#chkVeiculoSinistrado")[0].innerText != "NÃO APLICÁVEL" && $("#chkVeiculoSinistrado")[0].innerText != "NÃO APLICAVEL") {
            $("#chkVeiculoSinistrado")[0].style.color = 'RED'
        }

        if ($("#chkRestricaoAverbacao")[0].innerText != "NADA CONSTA" && $("#chkRestricaoAverbacao")[0].innerText != "NÃO APLICÁVEL" && $("#chkRestricaoAverbacao")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRestricaoAverbacao")[0].style.color = 'RED'
        }

        if ($("#chkComunicacaoVenda")[0].innerText != "NADA CONSTA" && $("#chkComunicacaoVenda")[0].innerText != "NÃO APLICÁVEL" && $("#chkComunicacaoVenda")[0].innerText != "NÃO APLICAVEL") {
            $("#chkComunicacaoVenda")[0].style.color = 'RED'
        }

        if ($("#chkRestricaoCRLV")[0].innerText != "NADA CONSTA" && $("#chkRestricaoCRLV")[0].innerText != "NÃO APLICÁVEL" && $("#chkRestricaoCRLV")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRestricaoCRLV")[0].style.color = 'RED'
        }

        if ($("#chkVeiculoApreendido")[0].innerText != "NADA CONSTA" && $("#chkVeiculoApreendido")[0].innerText != "NÃO APLICÁVEL" && $("#chkVeiculoApreendido")[0].innerText != "NÃO APLICAVEL") {
            $("#chkVeiculoApreendido")[0].style.color = 'RED'
        }

        if ($("#chkDocumentoExtraviado")[0].innerText != "NADA CONSTA" && $("#chkDocumentoExtraviado")[0].innerText != "NÃO APLICÁVEL" && $("#chkDocumentoExtraviado")[0].innerText != "NÃO APLICAVEL") {
            $("#chkDocumentoExtraviado")[0].style.color = 'RED'
        }


        if ($("#chkReservaDominio")[0].innerText != "NADA CONSTA" && $("#chkReservaDominio")[0].innerText != "NÃO APLICÁVEL" && $("#chkReservaDominio")[0].innerText != "NÃO APLICAVEL") {
            $("#chkReservaDominio")[0].style.color = 'RED'
        }

        if ($("#chkRetAcidentes")[0].innerText != "NADA CONSTA" && $("#chkRetAcidentes")[0].innerText != "NÃO APLICÁVEL" && $("#chkRetAcidentes")[0].innerText != "NÃO APLICAVEL") {
            $("#chkRetAcidentes")[0].style.color = 'RED'
        }

        if ($("#chkDuplidadeMotor")[0].innerText != "NADA CONSTA" && $("#chkDuplidadeMotor")[0].innerText != "NÃO APLICÁVEL" && $("#chkDuplidadeMotor")[0].innerText != "NÃO APLICAVEL") {
            $("#chkDuplidadeMotor")[0].style.color = 'RED'
        }

        if ($("#chkOfertadoLeilao2")[0].innerText != "NADA CONSTA" && $("#chkOfertadoLeilao2")[0].innerText != "NÃO APLICÁVEL" && $("#chkOfertadoLeilao2")[0].innerText != "NÃO APLICAVEL") {
            $("#chkOfertadoLeilao2")[0].style.color = 'RED'
        } else { $("#chkOfertadoLeilao2")[0].innerText = 'NADA CONSTA' }

        if ($("#chkOfertadoLeilaoRemarketing")[0].innerText != "NADA CONSTA" && $("#chkOfertadoLeilaoRemarketing")[0].innerText != "NÃO APLICÁVEL" && $("#chkOfertadoLeilaoRemarketing")[0].innerText != "NÃO APLICAVEL") {
            $("#chkOfertadoLeilaoRemarketing")[0].style.color = 'RED'
        } else { $("#chkOfertadoLeilaoRemarketing")[0].innerText = 'NADA CONSTA' }

        if (path.toString().substring(7, 16) != "localhost")
        {

            if (ModelTotalizadores.IDENT_NAOCONFORM > 0) {
                $scope.IdentificacaoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
            } else if (ModelTotalizadores.IDENT_OBSERCONFORM > 0) {
                $scope.IdentificacaoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_com_observacao.png";
            } else if (ModelTotalizadores.IDENT_CONFORM > 0 && ModelTotalizadores.IDENT_OBSERCONFORM == 0 && ModelTotalizadores.IDENT_NAOCONFORM == 0) {
                $scope.IdentificacaoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            }

            //if (ModelTotalizadores.IDENT_OBSERCONFORM >= 0 && ModelTotalizadores.IDENT_NAOCONFORM > 0)
            //{
            //    $scope.IdentificacaoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
            //}
            //else if (ModelTotalizadores.IDENT_OBSERCONFORM > 0 && ModelTotalizadores.IDENT_NAOCONFORM == 0 && ModelTotalizadores.IDENT_CONFORM >= 0) {
            //      $scope.IdentificacaoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}
            //else if (ModelTotalizadores.IDENT_OBSERCONFORM >= 0 && ModelTotalizadores.IDENT_NAOCONFORM == 0 && ModelTotalizadores.IDENT_CONFORM > 0) {
            //    $scope.IdentificacaoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}

            if (ModelTotalizadores.ESTR_NAOCONFORM > 0) {
                $scope.EstruturaFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
            } else if (ModelTotalizadores.ESTR_OBSERCONFORM > 0) {
                $scope.EstruturaFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_com_observacao.png";
            } else if (ModelTotalizadores.ESTR_CONFORM > 0 && ModelTotalizadores.ESTR_OBSERCONFORM == 0 && ModelTotalizadores.ESTR_NAOCONFORM == 0) {
                $scope.EstruturaFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            }

            //if (ModelTotalizadores.ESTR_OBSERCONFORM >= 0 && ModelTotalizadores.ESTR_NAOCONFORM > 0) {
            //    $scope.EstruturaFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
            //}
            //else if (ModelTotalizadores.ESTR_OBSERCONFORM > 0 && ModelTotalizadores.ESTR_NAOCONFORM == 0 && ModelTotalizadores.ESTR_CONFORM >= 0) {
            //    $scope.EstruturaFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}
            //else if (ModelTotalizadores.ESTR_OBSERCONFORM >= 0 && ModelTotalizadores.ESTR_NAOCONFORM == 0 && ModelTotalizadores.ESTR_CONFORM > 0) {
            //    $scope.EstruturaFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}

            if (ModelTotalizadores.HIST_NAOCONFORM > 0) {
                $scope.HistoricoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
            } else if (ModelTotalizadores.HIST_OBSERCONFORM > 0) {
                $scope.HistoricoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_com_observacao.png";
            } else if (ModelTotalizadores.HIST_CONFORM > 0 && ModelTotalizadores.HIST_OBSERCONFORM == 0 && ModelTotalizadores.HIST_NAOCONFORM == 0) {
                $scope.HistoricoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            }


            //if (ModelTotalizadores.HIST_OBSERCONFORM >= 0 && ModelTotalizadores.HIST_NAOCONFORM > 0) {
            //    $scope.HistoricoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
            //}
            //else if (ModelTotalizadores.HIST_OBSERCONFORM > 0 && ModelTotalizadores.HIST_NAOCONFORM == 0 && ModelTotalizadores.HIST_CONFORM >= 0) {
            //    $scope.HistoricoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}
            //else if (ModelTotalizadores.HIST_OBSERCONFORM >= 0 && ModelTotalizadores.HIST_NAOCONFORM == 0 && ModelTotalizadores.HIST_CONFORM > 0) {
            //    $scope.HistoricoFigure = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}




            //if (ModelTotalizadores.ESTADECONCER_NAOCONFORM > 0) {
            //    $scope.EstadoDeConservacaoFigura = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
            //} else if (ModelTotalizadores.ESTADECONCER_OBSERCONFORM > 0) {
            //    $scope.EstadoDeConservacaoFigura = "/SmartMobile/BackOfficeAnalise/Images/icone_com_observacao.png";
            //} else if (ModelTotalizadores.ESTADECONCER_CONFORM > 0 && ModelTotalizadores.ESTADECONCER_OBSERCONFORM == 0 && ModelTotalizadores.ESTADECONCER_NAOCONFORM == 0) {
            //    $scope.EstadoDeConservacaoFigura = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}

            //if (ModelTotalizadores.ESTADECONCER_OBSERCONFORM >= 0 && ModelTotalizadores.ESTADECONCER_NAOCONFORM > 0) {
            //    $scope.EstadoDeConservacaoFigura = "/SmartMobile/BackOfficeAnalise/Images/icone_reprovado.png";
            //}
            //else if (ModelTotalizadores.ESTADECONCER_OBSERCONFORM > 0 && ModelTotalizadores.ESTADECONCER_NAOCONFORM == 0 && ModelTotalizadores.ESTADECONCER_CONFORM >= 0) {
            //    $scope.EstadoDeConservacaoFigura = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}
            //else if (ModelTotalizadores.ESTADECONCER_OBSERCONFORM >= 0 && ModelTotalizadores.ESTADECONCER_NAOCONFORM == 0 && ModelTotalizadores.ESTADECONCER_CONFORM > 0) {
            //    $scope.EstadoDeConservacaoFigura = "/SmartMobile/BackOfficeAnalise/Images/icone_conforme_nd.png";
            //}

        }
        else
        {

            if (ModelTotalizadores.IDENT_NAOCONFORM > 0) {
                $scope.IdentificacaoFigure = "/Images/icone_reprovado.png";
            } else if (ModelTotalizadores.IDENT_OBSERCONFORM > 0) {
                $scope.IdentificacaoFigure = "/Images/icone_com_observacao.png";
            } else if (ModelTotalizadores.IDENT_CONFORM > 0 && ModelTotalizadores.IDENT_OBSERCONFORM == 0 && ModelTotalizadores.IDENT_NAOCONFORM == 0) {
                $scope.IdentificacaoFigure = "/Images/icone_conforme_nd.png";
            }

            //if (ModelTotalizadores.IDENT_OBSERCONFORM >= 0 && ModelTotalizadores.IDENT_NAOCONFORM > 0) {
            //    $scope.IdentificacaoFigure = "/Images/icone_reprovado.png";
            //}
            //else if (ModelTotalizadores.IDENT_OBSERCONFORM > 0 && ModelTotalizadores.IDENT_NAOCONFORM == 0 && ModelTotalizadores.IDENT_CONFORM >= 0) {
            //     $scope.IdentificacaoFigure = "/Images/icone_conforme_nd.png";
            //}
            //else if (ModelTotalizadores.IDENT_OBSERCONFORM >= 0 && ModelTotalizadores.IDENT_NAOCONFORM == 0 && ModelTotalizadores.IDENT_CONFORM > 0) {
            //    $scope.IdentificacaoFigure = "/Images/icone_conforme_nd.png";
            //}


            if (ModelTotalizadores.ESTR_NAOCONFORM > 0) {
                $scope.EstruturaFigure = "/Images/icone_reprovado.png";
            } else if (ModelTotalizadores.ESTR_OBSERCONFORM > 0) {
                $scope.EstruturaFigure = "/Images/icone_com_observacao.png";
            } else if (ModelTotalizadores.ESTR_CONFORM > 0 && ModelTotalizadores.ESTR_OBSERCONFORM == 0 && ModelTotalizadores.ESTR_NAOCONFORM == 0) {
                $scope.EstruturaFigure = "/Images/icone_conforme_nd.png";
            }

            //if (ModelTotalizadores.ESTR_OBSERCONFORM >= 0 && ModelTotalizadores.ESTR_NAOCONFORM > 0) {
            //    $scope.EstruturaFigure = "/Images/icone_reprovado.png";
            //}
            //else if (ModelTotalizadores.ESTR_OBSERCONFORM > 0 && ModelTotalizadores.ESTR_NAOCONFORM == 0 && ModelTotalizadores.ESTR_CONFORM >= 0) {
            //    $scope.EstruturaFigure = "/Images/icone_conforme_nd.png";
            //}
            //else if (ModelTotalizadores.ESTR_OBSERCONFORM >= 0 && ModelTotalizadores.ESTR_NAOCONFORM == 0 && ModelTotalizadores.ESTR_CONFORM > 0) {
            //    $scope.EstruturaFigure = "/Images/icone_conforme_nd.png";
            //}


            if (ModelTotalizadores.HIST_NAOCONFORM > 0) {
                $scope.HistoricoFigure = "/Images/icone_reprovado.png";
            } else if (ModelTotalizadores.HIST_OBSERCONFORM > 0) {
                $scope.HistoricoFigure = "/Images/icone_com_observacao.png";
            } else if (ModelTotalizadores.HIST_CONFORM > 0 && ModelTotalizadores.HIST_OBSERCONFORM == 0 && ModelTotalizadores.HIST_NAOCONFORM == 0) {
                $scope.HistoricoFigure = "/Images/icone_conforme_nd.png";
            }

            //if (ModelTotalizadores.HIST_OBSERCONFORM >= 0 && ModelTotalizadores.HIST_NAOCONFORM > 0) {
            //    $scope.HistoricoFigure = "/Images/icone_reprovado.png";
            //}
            //else if (ModelTotalizadores.HIST_OBSERCONFORM > 0 && ModelTotalizadores.HIST_NAOCONFORM == 0 && ModelTotalizadores.HIST_CONFORM >= 0) {
            //     $scope.HistoricoFigure = "/Images/icone_conforme_nd.png";
            //}
            //else if (ModelTotalizadores.HIST_OBSERCONFORM >= 0 && ModelTotalizadores.HIST_NAOCONFORM == 0 && ModelTotalizadores.HIST_CONFORM > 0) {
            //    $scope.HistoricoFigure = "/Images/icone_conforme_nd.png";
            //}



            //if (ModelTotalizadores.ESTADECONCER_NAOCONFORM > 0) {
            //    $scope.EstadoDeConservacaoFigura = "/Images/icone_reprovado.png";
            //} else if (ModelTotalizadores.ESTADECONCER_OBSERCONFORM > 0) {
            //    $scope.EstadoDeConservacaoFigura = "/Images/icone_com_observacao.png";
            //} else if (ModelTotalizadores.ESTADECONCER_CONFORM > 0 && ModelTotalizadores.ESTADECONCER_OBSERCONFORM == 0 && ModelTotalizadores.ESTADECONCER_NAOCONFORM == 0) {
            //    $scope.EstadoDeConservacaoFigura = "/Images/icone_conforme_nd.png";
            //}

            //if (ModelTotalizadores.ESTADECONCER_OBSERCONFORM >= 0 && ModelTotalizadores.ESTADECONCER_NAOCONFORM > 0) {
            //    $scope.EstadoDeConservacaoFigura = "/Images/icone_reprovado.png";
            //}
            //else if (ModelTotalizadores.ESTADECONCER_OBSERCONFORM > 0 && ModelTotalizadores.ESTADECONCER_NAOCONFORM == 0 && ModelTotalizadores.ESTADECONCER_CONFORM >= 0) {
            //    $scope.EstadoDeConservacaoFigura = "/Images/icone_conforme_nd.png";
            //}
            //else if (ModelTotalizadores.ESTADECONCER_OBSERCONFORM >= 0 && ModelTotalizadores.ESTADECONCER_NAOCONFORM == 0 && ModelTotalizadores.ESTADECONCER_CONFORM > 0) {
            //    $scope.EstadoDeConservacaoFigura = "/Images/icone_conforme_nd.png";
            //}
        }

        var target = angular.element('.dvFooter');
        var target1 = angular.element('#contadosFooter');
        $scope.dvTotalPaginas = target.length;

        var i = 0;
        var s = 1;

        angular.element(".dvNoPagina").each(function () {
            var a = angular.element('.dvFooter')[i]
            var b = a.getElementsByClassName('dvNoPagina')
            b[0].innerHTML = '<span class="dbNoPagina ng-binding">' + s + '</span>';
            i = i + 1;
            s = s + 1;
        });

        $scope.TOTALGERAL = ($scope.DadosTotalConform + $scope.DadosTotalConformComObs + $scope.DadosTotalNaoConformTela)
     
        $('body').css("zoom", "90%")

        blockUI.stop();

    }

    window.onload = function () {

        var foto = 0;
        var fotoc = 0;

        try
        {
            var index = 0;
            angular.element("#estruturaID,.dvCapaFotoEstrutura,.dvCapaFotoEstruturaHeader,ul,li").each(function () {
                var retornf = angular.element('div#estruturaID.geral')
                var total = retornf.length;
                if (total > 0) {
                    for (var i = 1; i < total; i++) {
                        var retorno = angular.element('div#estruturaID.geral')[i];
                        var inteiro = retorno.children[2].children[1].childElementCount
                        if (inteiro > 0) {
                            for (var e = 0; e < inteiro; e++) {
                                retorno.children[2].children[1].children[e].children[0].src = retorno.children[2].children[1].children[e].children[0].src.replace('FotosVeiculosVP2', 'FotosDKSinistro')
                            }

                        }
                    }
                }

            });

            foto = 1;
            fotoc = 0;

            angular.element(".dvCapaFotoConstatacao,ul,li").each(function () {
                var retornf = angular.element('.dvCapaFotoConstatacao')
                var total = retornf.length;
                if (total > 0) {
                    for (var i = 0; i < total; i++) {
                        var retornodados = retornf[i].children[1].childElementCount
                        if (retornodados > 0) {
                            for (var o = 0; o < retornodados; o++) {
                                retornf[i].children[1].children[o].children[0].src =
                                    retornf[i].children[1].children[o].children[0].src.replace('FotosVeiculosVP2', 'FotosDKSinistro')
                            }
                        }
                    }
                }
            });
        }
        catch (err) {
            console.log(err.message.toString())
        }
        finally
        {
          
        }
    };

    $scope.Imprimir = function () {
        $window.print();
    };

    $scope.ImprimirPDF = function ()
    {
        $http.get(path + "/VistoriaVarejo/ImpressaoExternaPDFGarantido?NrColetaProdutoHodometro=1792_20_0")
       .then(function (request)
       {
           var dados = request.data;
          
           var pdf = 'data:application/octet-stream;base64,' + btoa(dados);
               window.open(pdf)
       }).catch(function (request)
       {
           blockUI.start("Erro inesperado" + request.mensagem)
           blockUI.stop("")
       }).finally(function (request)
       {
           blockUI.stop("")
       });

        //var pdf = new jsPDF();
        var chart = $('#htmlPry')[0];
        var sourcecode = new XMLSerializer().serializeToString(chart);
        var emBase64 = btoa(sourcecode);

        ////var conteudo = atob(emBase64);

        //pdf.addHTML((sourcecode), { pagesplit: true }, function () {
        //    pdf.save('Teste' + '.pdf');
        //});

        ////var pdf = new jsPDF();
        //pdf.addHTML(($("#htmlPry")[0]), { pagesplit: true }, function () {
        //    pdf.save('Teste' + '.pdf');
        //});

        //var doc = new jsPDF();
        //var chart = $('#ChartGraficoIdentificacao')[0];
        //var sourcecode = new XMLSerializer().serializeToString(chart);

        //var emBase64 = btoa(sourcecode);
        ////console.log(emBase64); //

        ////doc.addImage(emBase64, 'JPEG', 10, 10, 50, 50);
        ////doc.addImage(imgData, 'JPEG', 70, 10, 100, 120);

        var pdf = 'data:image/svg+xml;base64,' + emBase64;
        window.open(pdf)

        ////Adiciona o SVG
        ////doc.addSVG(pdf, 500, 500);
        ////Download do arquivo
        //doc.text(sourcecode)
        //doc.save("sample-file.pdf");

        //window.open(pdf);
              
        //var doc = new jsPDF();

        //doc.setFontSize(40);
        //doc.text(35, 25, "Octonyan loves jsPDF");
        //doc.addImage(imgData, 'JPEG', 15, 40, 180, 180);

    };

    window.onerror = function (message, url, lineNumber)
    {
        if (message == "Uncaught TypeError: Cannot read property 'el' of undefined")
        {
            FusionCharts.ready(function () {
                FusionCharts.ready(function () { Estrutura.render();});
                FusionCharts.ready(function () { Historico.render();});            
                FusionCharts.ready(function () { identificacao.render(); });
                FusionCharts.ready(function () { ChartGraficoPrincipal.render();});
            });
        }
        
    };

}]);