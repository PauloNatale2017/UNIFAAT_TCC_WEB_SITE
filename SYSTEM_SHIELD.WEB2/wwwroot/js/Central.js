var app = angular.module('App', ['blockUI', 'ng-fusioncharts']);
var Obj;
var token = "";
var log = [];
var GoogleMaps;
var data = [];
var mapa;
var marker;
var infowindow;

var urlExternal = "http://localhost:5001/api/";


app.controller("CtrlCentral", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {

        Obj = $scope;

        $scope.data = [];
        
        $scope.Cidade = $scope.Cidade_Value;  

        $scope.cidades = [];
        $scope.DadosMapsAtibaia = [];


         //var retornoFilter = response.data.filter(function (values) { return values.Cidade === "ATIBAIA"; }).length

        //$scope.cidades = [
        //    { Nome: 'ATIBAIA', quantidade: 37 },
        //    { Nome: 'BRAGANÇA', quantidade: 85 },
        //    { Nome: 'JUNDIAI', quantidade: 35 },
        //    { Nome: 'JOANOPOLES', quantidade: 44 }
        //];

        //$scope.DadosMapsAtibaia = [
        //    { lat: '-23.114651', long: '-46.585430', titulo: "Avenida Geronimo De Camargo Numero 2200", content: "Localização:<br/>Nome Pais:<br/>Latit./Longit:" },
        //    { lat: '-23.116650', long: '-46.566000', titulo: "Alvinopoles Atibaia", content: "Localização:<br/>Nome Pais:<br/>Latit./Longit:" },
        //    { lat: '-23.117660', long: '-46.550930', titulo: "Rodoviaria Atibaia", content: "Localização:<br/>Nome Pais:<br/>Latit./Longit:" },
        //    { lat: '-23.201800', long: '-45.896250', titulo: "Campos Dos Zalejos Atibaia", content: "Localização:<br/>Nome Pais:<br/>Latit./Longit:" },
        //    { lat: '-23.190358', long: '-45.936822', titulo: "Serinbura", content: "Localização:<br/>Nome Pais:<br/>Latit./Longit:" },
        //    { lat: '-23.106530', long: '-46.506890', titulo: "Jardim Dos Pinheiros Atibaia", content: "Localização:<br/>Nome Pais:<br/>Latit./Longit:" }          
          
        //];

        $scope.DadosParaOsMapas = function () {

            var loginUrlEndPoint = urlExternal + "external/externalgeo";

            $http.get(loginUrlEndPoint).then(function (response)
            {
                if (response.status === 200)
                {
                    if (response.data === "null")
                    {
                        console.log("Dados retornas com zero do banco");
                    } else {
                       
                        console.log(response.data);

                        for (var i = 0; i < response.data.length; i++) {
                            var TotalPorCidade = response.data.filter(function (values) { return values.Cidade === response.data[i].Cidade; }).length;
                            $scope.cidades.push({ Nome: response.data[i].Cidade, quantidade: TotalPorCidade });
                            $scope.DadosMapsAtibaia.push({ lat: response.data[i].Lat, long: response.data[i].Long, titulo: response.data[i].Endereco, content: "DADOS GERAIS:<br/>Nome Completo:" + response.data[i].NomeCompleto + "<br/>Endereço:" + response.data[i].Endereco + "<br/>Contato:" + response.data[i].Contato + "<br/>Recado:" + response.data[i].ContatoRecado + "<br/>Email:" + response.data[i].Email+"" });

                        }

                        $scope.ChamadaMaps();
                    }

                } else {
                    alert("USUARIO NÂO AUTHENTICADO");
                }
            });

        };
       
        $scope.InitialiseMaps = function () {

            //map center
            var bounds = new google.maps.LatLngBounds();

            var mapOptions = {
                center: new google.maps.LatLng(-15.768466, -47.929459),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            mapa = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            
            angular.forEach($scope.DadosMapsAtibaia, function (value, key) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value.lat, value.long),
                    map: mapa,
                    title: value.titulo
                });
                infowindow = new google.maps.InfoWindow({
                    content: value.content
                });
                bounds.extend(marker.position);
            }); 

            mapa.fitBounds(bounds);
            mapa.setZoom(14);

            var listener = google.maps.event.addListener(mapa, "idle", function () {
                mapa.setZoom(3);
                google.maps.event.removeListener(listener);
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(mapa, marker);
            });


            blockUI.stop();
        };

        $scope.ChamadaMaps = function () {
            blockUI.start("....CARREGANDO INFORMAÇÕES....");
            $scope.InitialiseMaps();
        };


        

        $scope.DadosParaOsMapas();


    }
]);