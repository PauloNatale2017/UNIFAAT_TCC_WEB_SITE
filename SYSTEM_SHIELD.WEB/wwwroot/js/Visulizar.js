//var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var app = angular.module('App', ['blockUI', 'ui.grid', 'ui.grid.pagination', 'ui.grid.autoResize', 'ui.grid.resizeColumns', 'ui.grid.exporter']);
var AngularJs_Obj;
var token = "";
var path = "";

app.controller("CtrlVisualizar", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout','uiGridConstants',
function ($scope, $http, $location, $window, blockUI, $timeout, nvd3,uiGridConstants) {

    AngularJs_Obj = $scope;
    $scope.blockUI = blockUI;

    path = window.location.origin;

    var StatusOpcoes =  [ { value: '', label: 'TODOS' },
       { value: 'NÃO CONFORME', label: 'NÃO CONFORME' },
       { value: 'CONFORME', label: 'CONFORME' },
       { value: 'CONFORME COM OBSERVAÇÃO', label: 'CONFORME COM OBSERVAÇÃO' } ];

    $(document).ready(function () {
        $scope.blockUI.start("Carregando Informações...")
        $timeout(function () {
            $scope.CarregaGrid();
            $scope.blockUI.stop("Carga de Dados Completa...")
        }, 3200)
    })

    //geração da ui-grid
    var paginationOptions = {
        pageNumber: 1,
        pageSize: 25,
        sort: null
    };

    var OcorrenciasGrid =
    {
        onRegisterApi: function (gridApi) { $scope.gridApi = gridApi; },
        enableScrollbars: false,
        enableFiltering: true,
        enableRowSelection: true,
        selectable: "row", columns: [{ field: "text", title: "Text" }, { field: "id", title: "Id" }],
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        useExternalPagination: false,
        useExternalSorting: false,
        enableSorting: true,
        enableColumnMenus: false,
        rowHeight: 35,
        enableGridMenu: false,
        exporterMenuPdf: false,
        columnDefs:
        [
           { field: 'Cidade', name: 'Cidade', enableCellEditOnFocus: true, displayName: 'Cidade', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, enableSorting: true },
           { field: 'Bairro', width: "80", name: 'Bairro', displayName: 'Bairro', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, enableSorting: true },
           { field: 'EncaminhadaPor', width: "80", name: 'EncaminhadaPor', displayName: 'EncaminhadaPor', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, enableSorting: true },
           { field: 'Desligamento', name: 'Desligamento', displayName: 'Desligamento', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, },
           { field: 'TipodeViolência', name: 'TipodeViolência', displayName: 'TipodeViolência', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, enableSorting: true },
           { field: 'VínculoComAgressor', visible: true, name: 'VínculoComAgressor', displayName: 'VínculoComAgressor', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true },
           { field: 'Observacoes', visible: true, name: 'Observacoes', displayName: 'Observacoes', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true },
          
           //{ field: '', width: "40", displayName: '', name: ' LAUDO ', enableFiltering: false, cellTemplate: '<div style="width: 28px; height: 28px; background: url(/PortalParceiro/Images/laudo1.jfif); background-repeat: no-repeat; background-size: 100% 100%;  margin: 6px 11px 1px 10px;cursor: pointer;" ng-click="grid.appScope.GridApp2(grid, row)"></div>' },
           //{ field: '', width: "40", displayName: '', name: ' PDF ', enableFiltering: false, cellTemplate: '<div style="width: 28px; height: 28px; background: url(/PortalParceiro/Images/file_extension_pdf.png); background-repeat: no-repeat; background-size: 100% 100%; margin: 6px 11px 1px 10px;cursor: pointer;" ng-click="grid.appScope.GridApp(grid, row)"></div>' },
        ]
    }

    $scope.OcorrenciasGrid = OcorrenciasGrid;
    $scope.OcorrenciasGrid.enableCellEditOnFocus = true;
   

    $scope.CarregaGrid = function () {

        var model = cadastro
        var params = {};
        params.Model = cadastro;

        $http.get(path1 + "Values/Get", {
            params: params.Model
        }).then(function (request) {

            //var arrayDeObjetos = []
            //$scope.arrayDeObjetos = arrayDeObjetos;


            //angular.forEach(request.data, function (value, index) {

            //    var modelo = {
            //        NrVistoria: value.NrVistoria,
            //        NrVistoriaCryp: value.NrVistoriaCryp,
            //        DataHora: value.DataHora,
            //        Status: value.Status,
            //        Motivo: value.Motivo,
            //        Placa: value.Placa,
            //        Chassi: value.Chassi,
            //        ModeloVeiculo: value.ModeloVeiculo,
            //        DadosPessoais: value.DadosPessoais,
            //        NrVoucher: value.NrVoucher,
            //        ProdutoId: value.ProdutoId,
            //        ProdutoIdCryp: value.ProdutoIdCryp,
            //        Liberado: value.Liberado,
            //        LinkCryp: value.LinkCryp,
            //        CPF_CNPJ: value.DadosPessoais.CPF_CNPJ,
            //        NomeCliente: value.DadosPessoais.NomeCliente,
            //        PRODUTONOME: value.PRODUTONOME,
            //        PARCEIRONOME: value.PARCEIRONOME
            //    }
            //    $scope.arrayDeObjetos.push(modelo);

            //})
            //modelo = request.data;
            var dados = request.data;
            $scope.OcorrenciasGrid.data = dados;//dados;
        })
          .catch(function (request) { })
          .finally(function (request) { $scope.blockUI.stop("Fim Carga de Dados...") });
       

    }

}]);

//$scope.Pesq = Pesq;
//$scope.gridPesq.enableCellEditOnFocus = true;

//$http.get(path1 + "Pesquisa/ConsultaVoucherListagemGet",
//            {
//                params: params.Model
//            })
//                 .then(function (request) {
//                     var arrayDeObjetos = []
//                     $scope.arrayDeObjetos = arrayDeObjetos;


//                     angular.forEach(request.data, function (value, index) {

//                         var modelo = {
//                             NrVistoria: value.NrVistoria,
//                             NrVistoriaCryp: value.NrVistoriaCryp,
//                             DataHora: value.DataHora,
//                             Status: value.Status,
//                             Motivo: value.Motivo,
//                             Placa: value.Placa,
//                             Chassi: value.Chassi,
//                             ModeloVeiculo: value.ModeloVeiculo,
//                             DadosPessoais: value.DadosPessoais,
//                             NrVoucher: value.NrVoucher,
//                             ProdutoId: value.ProdutoId,
//                             ProdutoIdCryp: value.ProdutoIdCryp,
//                             Liberado: value.Liberado,
//                             LinkCryp: value.LinkCryp,
//                             CPF_CNPJ: value.DadosPessoais.CPF_CNPJ,
//                             NomeCliente: value.DadosPessoais.NomeCliente,
//                             PRODUTONOME: value.PRODUTONOME,
//                             PARCEIRONOME: value.PARCEIRONOME
//                         }
//                         $scope.arrayDeObjetos.push(modelo);

//                     })
//                     //modelo = request.data;
//                     var dados = request.data;
//                     $scope.gridPesq.data = $scope.arrayDeObjetos;//dados;

//                 }).catch(function (request) {
//                     console.log("Error" + request.message)
//                     blockUI.stop("Erro Inesperado")
//                 }).finally(function (request) {
//                     $("span, .ui-grid-pager-max-pages-number ng-binding, abbr")[32].outerHTML = "";
//                     $("span, .ui-grid-pager-max-pages-number ng-binding, abbr")[32].outerHTML = "<abbr ui-grid-one-bind-title='paginationOf'></abbr>/"
//                     $("span, .ui-grid-pager-max-pages-number ng-binding")[32].innerHTML = "";
//                     $("div.ui-grid-pager-count span abbr")[0].outerHTML = "<abbr ui-grid-one-bind-title='paginationThrough'>-</abbr>"
//                     $('span, .ui-grid-pager-max-pages-number ng-binding, abbr')[31].style.fontSize = "16px";
//                     blockUI.stop("Pesquisa Finalizada")
//                 });


//$scope.gridPesq =
//{
//    onRegisterApi: function (gridApi) {
//        $scope.gridApi = gridApi;
//    },
//    enableScrollbars: false,
//    enableFiltering: true,
//    enableRowSelection: true,
//    selectable: "row", columns: [{ field: "text", title: "Text" }, { field: "id", title: "Id" }],
//    paginationPageSizes: [25, 50, 75],
//    paginationPageSize: 25,
//    useExternalPagination: false,
//    useExternalSorting: false,
//    enableSorting: true,
//    enableColumnMenus: false,
//    rowHeight: 35,
//    enableGridMenu: false,
//    exporterMenuPdf: false,
//    columnDefs:
//    [
//       { field: 'NrVoucher', name: 'NrVoucher', enableCellEditOnFocus: true, displayName: 'Numero do Voucher', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, enableSorting: true },
//       { field: 'NrVistoria', width: "80", name: 'NrVistoria', displayName: 'Vistoria', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, enableSorting: true },
//       { field: 'Placa', width: "80", name: 'Placa', displayName: 'Placa', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, enableSorting: true },
//       { field: 'Chassi', name: 'Chassi', displayName: 'Chassi', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, },
//       { field: 'DataHora', name: 'DataHora', displayName: 'Data da Finalização', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true, enableSorting: true },
//       {
//           field: 'Status', visible: true, name: 'Status', displayName: 'Parecer', headerCellCcmpLocalIndicacaoPreservadolass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true,
//           filter: {
//               type: uiGridConstants.filter.SELECT,
//               selectOptions: StatusOpcoes,
//               condition: function (term, value, row, column) {
//                   if (row.entity.Status == term) {
//                       return true;
//                   }
//               },
//           }
//       },
//       /////PortalParceiro
//       //{
//       //    field: 'Motivo',
//       //    cellTooltip: function (row, col) {
//       //        return 'Motivo: ' + row.entity.Motivo;
//       //    }, headerTooltip: function (col) {
//       //        return 'Header: ' + col.displayName;
//       //    }, name: 'Motivo', displayName: 'Motivo', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true
//       //},
//       { field: 'NomeCliente', visible: true, name: 'NomeCliente', displayName: 'Cliente', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true },
//       { field: 'CPF_CNPJ', visible: true, name: 'CPF_CNPJ', displayName: 'CPF/CNPJ', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true },
//       { field: 'ModeloVeiculo', visible: false, name: 'ModeloVeiculo', displayName: 'Modelo do Veículo', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true },//PortalParceiro
//       { field: 'ProdutoId', name: 'ProdutoId', visible: false },
//       { field: 'PRODUTONOME', name: 'PRODUTONOME', visible: true, displayName: 'Nome do Produto', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true },
//       { field: 'PARCEIRONOME', name: 'PARCEIRONOME', visible: true, displayName: 'Nome do Parceiro', headerCellClass: 'ui-grid-header-text', cellClass: 'ui-grid-cell-contents', enableFiltering: true },
//        //{ field: '', width: "40", displayName: '', name: ' LAUDO ', enableFiltering: false, cellTemplate: '<div style="width: 28px; height: 28px; background: url(/PortalParceiro/Images/laudo1.jfif); background-repeat: no-repeat; background-size: 100% 100%;  margin: 6px 11px 1px 10px;cursor: pointer;" ng-click="grid.appScope.GridApp2(grid, row)"></div>' },
//       { field: '', width: "40", displayName: '', name: ' PDF ', enableFiltering: false, cellTemplate: '<div style="width: 28px; height: 28px; background: url(/PortalParceiro/Images/file_extension_pdf.png); background-repeat: no-repeat; background-size: 100% 100%; margin: 6px 11px 1px 10px;cursor: pointer;" ng-click="grid.appScope.GridApp(grid, row)"></div>' },
//    ]
//};


//$scope.ExportExcel = function () {
//    var path1 = window.location.origin;

//    if (path1.toString().substring(7, 16) != "localhost") {
//        path1 = path1 + "/PortalParceiro/";
//    } else {
//        path1 = window.location.origin + "/";
//    }

//    blockUI.start("GERANDO ARQUIVO EXCEL...")

//    var model = Pesq
//    var params = {};
//    params.Model = Pesq;

//    Pesq.DataFinal = $("#DataFinal").val()
//    Pesq.DataInicial = $("#DataInicial").val()

//    var data1 = moment($("#DataInicial").val(), 'DD/MM/YYYY');
//    var data2 = moment($("#DataFinal").val(), 'DD/MM/YYYY');
//    var diff = data2.diff(data1, 'days');

//    $http.get(path1 + "Pesquisa/PortalParceiroExcel",
//    {
//        params: params.Model
//    })
//     .then(function (request) {
//         //var link = "data:application/vnd.ms-excel;base64," + request.data;
//         window.open("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + request.data, "_blank");
//     }).catch(function (request) {
//         console.log("Error" + request.message)
//         blockUI.stop("Erro Inesperado")
//     }).finally(function (request) {
//         $("span, .ui-grid-pager-max-pages-number ng-binding, abbr")[32].outerHTML = "";
//         $("span, .ui-grid-pager-max-pages-number ng-binding, abbr")[32].outerHTML = "<abbr ui-grid-one-bind-title='paginationOf'></abbr>/"
//         $("span, .ui-grid-pager-max-pages-number ng-binding")[32].innerHTML = "";
//         $("div.ui-grid-pager-count span abbr")[0].outerHTML = "<abbr ui-grid-one-bind-title='paginationThrough'>-</abbr>"
//         $('span, .ui-grid-pager-max-pages-number ng-binding, abbr')[31].style.fontSize = "16px";
//         blockUI.stop("Pesquisa Finalizada")
//     });

//}

//$scope.GerarArquivoPDFs = function (NrVoucher, Placa, NrVistoria, ProdutoId) {
//    var Model = { Placa: Placa, Voucher: NrVoucher, NrVistoria: NrVistoria, ProdutoId: ProdutoId };
//    var params = {};
//    params.Model = Model;


//    $http.get(path + "Pesquisa/GerarArquivoPDF", { params: params.Model })
//    .then(function (request) {
//        var dados = request.data;
//        if (dados.pdfOK) {
//            var pdf = 'Content-Type: application/pdf' + dados.pdf;
//            //var pdf = 'data:application/octet-stream;base64,' + dados.pdf; 

//            window.open(pdf)

//        }
//        else { showMessage('Erro', request.mensagem); }

//    }).catch(function (request) {
//        blockUI.start("Erro inesperado" + request.data.toString())
//        blockUI.stop("")
//    }).finally(function (request) {
//        blockUI.stop("")
//    });

//    blockUI.start("GERANDO ARQUIVO PDF")

//};

//$scope.GerarArquivoPDFs2 = function (NrColeta, ProdutoId, FotoHodometro) {
//    var Model = {
//        NrColeta: NrColeta,
//        ProdutoId: ProdutoId,
//        FotoHodometro: FotoHodometro
//    };

//    var Result = JSON.stringify(Model)

//    var params = {};
//    params.Model = Model;

//    try {
//        if (path.toString().substring(7, 16) != "localhost") {
//            window.open(path + "/VistoriaVarejo/ImpressaoExterna?nrColeta=" + NrColeta + "&produtoID=" + ProdutoId + "&fotoHodometro=0")

//        } else {
//            //var urlLocalHost = "http://localhost:49833"
//            window.open(path + "/VistoriaVarejo/ImpressaoExterna?nrColeta=" + NrColeta + "&produtoID=" + ProdutoId + "&fotoHodometro=0")
//        }

//    }
//    catch (err) {
//        blockUI.start("Verifique se o laudo esta finalizado, possivel falta de informações no laudo")
//        $timeout(function () {
//            blockUI.stop();
//        }, 2000);
//    }
//    finally {

//    }


//};

//$scope.GridApp = function (grid, myRow) {
//    var myRowFound = false;
//    var cumulativeTotal = 0;
//    grid.renderContainers.body.visibleRowCache.forEach(function (row, index) {
//        if (!myRowFound) {
//            if (row === myRow) {

//                //path = "http://localhost:49833";
//                var urlLocalHost = "http://localhost:49833"
//                //var t = urlLocalHost + "/VistoriaVarejo/ImpressaoExternaRotativaCryptPortalPDF?crypt=" + row.entity.LinkCryp;
//                var t = path + "/VistoriaVarejo/ImpressaoExternaRotativaCryptPortalPDF?crypt=" + row.entity.LinkCryp;
//                try {
//                    blockUI.start("GERANDO ARQUIVO PDF")
//                    //$window.location.href = t   
//                    window.open(t)
//                }
//                catch (error) {
//                    console.log(error.description)

//                }
//                finally {
//                    $timeout(function () {
//                        blockUI.stop("PDF Gerado com sucesso!!")
//                        //$window.open(path)
//                    }, 14000);
//                }
//            }
//        }
//    });
//    return cumulativeTotal;
//};

//$scope.GridApp2 = function (grid, myRow) {
//    var myRowFound = false;
//    var cumulativeTotal = 0;
//    grid.renderContainers.body.visibleRowCache.forEach(function (row, index) {
//        if (!myRowFound) {
//            if (row === myRow) {

//                // var path = window.location.origin;

//                //path = "http://localhost:57650";
//                var t = path + "/vistoriavarejo/ImpressaoExternaRotativaCryptPortalPDF?crypt=" + row.entity.LinkCryp;
//                $window.open(t)

//                try {
//                    //blockUI.start("CONSTRUINDO LAUDO")
//                    //$window.location.href = t
//                }
//                catch (error) {
//                    console.log(error.description)

//                }
//                finally {

//                }

//            }
//        }
//    });
//    return cumulativeTotal;
//};

//window.onerror = function (message, url, lineNumber) {
//    blockUI.start("Error Inesperado:Message " + message + "Url/" + url + "Linha/" + lineNumber)

//    $timeout(function () {
//        blockUI.stop();
//    }, 2000);
//}