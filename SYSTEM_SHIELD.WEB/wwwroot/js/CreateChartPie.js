

var app = angular.module('App', ['blockUI','ng-fusioncharts']);
var Obj;
var token = "";
var log = [];
var GoogleMaps; 


app.controller("CtrlMapsInfracoes", ['$scope', '$http', '$location', '$window', 'blockUI', '$timeout', '$interval',
    function ($scope, $http, $location, $window, blockUI, $timeout, $interval) {
        
        Obj = $scope;
        $scope.loadScript = function () {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4dGA5XSdaUitw4DBVX3lyqqo9LyApmiE&callback=initialize';
            document.body.appendChild(script);
        }
        blockUI.start("Load Scripts...")

       

        var GoogleMaps = {
            MapOptions: "",
            Markers: "",
            InfoWindow: "",
            Latlngbounds: "",
            Map: "",
            geocoder: ""
        }
        $scope.GoogleMaps = GoogleMaps;

        //ROADMAP(normal, default 2D map)
        //SATELLITE(photographic map)
        //HYBRID(photographic map + roads and city names)
        //TERRAIN(map with mountains, rivers, etc.)

        GoogleMaps.Markers = [{
                "title": 'ATIBAIA',
                "lat": '34.0928092',
                "lng": '-118.3286614',
                "description": 'Cidade das flores e do Morango'
            },{
            "title": 'CAMPINAS',
            "lat": '-22.932925',
            "lng": '-47.073845',
            "description": 'Cidade de Campinas'},{
            "title": 'JUNDIAI',
            "lat": '-23.185708',
            "lng": '-46.897806',
            "description": 'Cidade JUNDIAI'},{
            "title": 'PERDOES',
            "lat": '-21.079491',
            "lng": '-45.093350',
            "description": 'Cidade PERDOES'}];

        $scope.DataBairros = [
            {
               
                displayValue:"52",
                label: "Caetetuba",
                value: "52",
                //link: "http://fusioncharts.com"
                link: "P-detailsWin,width=400,height=300,toolbar=no,scrollbars=yes, resizable=no-http://fusioncharts.com"
            },
            {
                displayValue: "32",
                label: "Alvinopoles",
                value: "32",
               // link: "http://fusioncharts.com"
                link: "P-detailsWin,width=400,height=300,toolbar=no,scrollbars=yes, resizable=no-http://fusioncharts.com"
            },
            {
                displayValue: "85",
                label: "Jardim Alvinopoles",
                value: "85",
               // link: "http://fusioncharts.com"
                link: "P-detailsWin,width=400,height=300,toolbar=no,scrollbars=yes, resizable=no-http://fusioncharts.com"
            },
            {
                displayValue: "23",
                label: "Jardim Alvinopoles II",
                value: "23",
               // link: "http://fusioncharts.com"
                link: "P-detailsWin,width=400,height=300,toolbar=no,scrollbars=yes, resizable=no-http://fusioncharts.com"
            }
        ]
        $scope.DataCidades = [
            {
                marker: "-22.932925,7.073845",
                displayValue: "52",
                label: "Atinaia",
                value: "320"
            },
            {
                displayValue: "52",
                label: "Perdoes",
                value: "140"
            },
            {
                displayValue: "52",
                label: "Campinas",
                value: "350"
            },
            {
                displayValue: "52",
                label: "Jundiai",
                value: "240"
            }
        ]
        $scope.DataEstados = [
            {
                displayValue: "52",
                label: "Sao Paulo",
                value: "5352"
            },
            {
                displayValue: "52",
                label: "Salvador",
                value: "3598"
            },
            {
                displayValue: "52",
                label: "Rio de Janeiro",
                value: "6845"
            }
        ]

        $scope.dadosReal = []
        $scope.CategoriasRealTime = []
        var target = document.querySelector('#map_canvas');
                
        //AIzaSyD_A7qfA68qedllHJ19V29EV1yvyJ_CU2U
        //$scope.loadScript();
        //$scope.initialize();

        $scope.initialize = function () {        
       
            GoogleMaps.MapOptions = {
                center: new google.maps.LatLng(GoogleMaps.Markers[0].lat, GoogleMaps.Markers[0].lng),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            };
            GoogleMaps.InfoWindow = new google.maps.InfoWindow();
            GoogleMaps.Latlngbounds = new google.maps.LatLngBounds();
            GoogleMaps.Map = new google.maps.Map(document.getElementById("map_canvas"), GoogleMaps.MapOptions);
            GoogleMaps.geocoder = new google.maps.Geocoder();
            //for (var i = 0; i < GoogleMaps.Markers.length; i++) {
            //    var data = GoogleMaps.Markers[i];
            //    var myLatlng = new google.maps.LatLng(data.lat, data.lng);

            //    //Initializing the Marker object.
            //    var marker = new google.maps.Marker({
            //        position: myLatlng,
            //        map: GoogleMaps.Map,
            //        title: data.title
            //    });

            //    //Adding InfoWindow to the Marker.
            //    (function (marker, data) {
            //        google.maps.event.addListener(marker, "click", function (e) {
            //            GoogleMaps.InfoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
            //            GoogleMaps.InfoWindow.open($scope.Map, marker);
            //        });
            //    })(marker, data);

            //    //Plotting the Marker on the Map.
            //    GoogleMaps.Latlngbounds.extend(marker.position);
            //}         
            
            //endereco = "Avenida geronimo de camargo m°2200 vila neto Atibaia São Paulo";
            //$scope.geocoder.geocode({ 'address': endereco }, function (resultado, status) {
            //    if (status == google.maps.GeocoderStatus.OK) {
            //        var marcador = {
            //            latitude: resultado[0].geometry.location.k
            //            , longitude: resultado[0].geometry.location.D
            //            , titulo: 'Novo marcador'
            //            , imagem: avaliacao
            //        }
            //        criaMarcador(marcador, map)
            //    } else {
            //        alert('Erro ao converter endereço: ' + status);
            //    }
            //});
            GoogleMaps.Map.setCenter(GoogleMaps.Latlngbounds.getCenter());
            GoogleMaps.Map.fitBounds(GoogleMaps.Latlngbounds);
        }
        
        $scope.calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
            directionsService.route({
                origin: "Atibaia",
                destination: "São Paulo",
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        $interval(function () {
            var numbers = Math.floor(Math.random() * 256);
            $scope.dadosReal.push({ value: numbers.toString(3) });
            $scope.CategoriasRealTime.push({ label: dataHoje() });
        }, 5000)

        $scope.Bairros = {
            chart: {
                caption: "Bairros",
                subCaption: "Bairros mais afetados pela violencia",
                xAxisName: "Bairros",
                yAxisName: "Ocorrencias",
                numbersuffix: "K",
                theme: "fusion",
                labeldisplay: "AUTO",
                yAxisNameBorderThickness: "10",
                xAxisNameFontSize: "10",
                labelFontSize: "9",
                trendValueFontSize: "9",
                palettecolors: "5d62b5,29c3be,f2726f",
                labelDisplay: "rotate", //auto, wrap, stagger, rotate and none
                useEllipsesWhenOverflow: "0",
                slantLabel: "1",
                showValues: "1",
                rotateValues: "5",
                xAxisNamePadding: "10",
                yAxisNamePadding: "10",
                exportEnabled: "1"              
            },
            data: $scope.DataBairros          
        };
        
        $scope.Cidades = {
            chart: {
                caption: "Cidades",
                subcaption: "Cidades mais afetados pela violencia",
                xaxisname: "Cidades",
                yaxisname: "Ocorrencias",
                numbersuffix: "K",
                theme: "fusion",
                labeldisplay: "AUTO",
                yAxisNameBorderThickness: "10",
                xAxisNameFontSize: "10",
                labelFontSize: "9",
                trendValueFontSize: "9",
                palettecolors: "5d62b5,29c3be,f2726f",
                labelDisplay: "rotate", //auto, wrap, stagger, rotate and none
                useEllipsesWhenOverflow: "0",
                slantLabel: "1",
                showValues: "1",
                rotateValues: "5",
                xAxisNamePadding: "10",
                yAxisNamePadding: "10",
                exportEnabled: "1"      
            },
            data: $scope.DataCidades
        };

        $scope.Estados = {
            chart: {
                caption: "Estados",
                subcaption: "Estados mais afetados pela violencia",
                xaxisname: "Estados",
                yaxisname: "Ocorrencias",
                numbersuffix: "K",
                theme: "fusion",
                labeldisplay: "AUTO",
                yAxisNameBorderThickness: "10",
                xAxisNameFontSize: "10",
                labelFontSize: "9",
                trendValueFontSize: "9",
                palettecolors: "5d62b5,29c3be,f2726f",
                labelDisplay: "rotate", //auto, wrap, stagger, rotate and none
                useEllipsesWhenOverflow: "0",
                slantLabel: "1",
                showValues: "1",
                rotateValues: "5",
                xAxisNamePadding: "10",
                yAxisNamePadding: "10",
                exportEnabled: "1"      
            },
            data: $scope.DataEstados
        };

        $scope.RealTime = {
            chart: {
                caption: "Ocorrencias em tempo real",
                subcaption: "Jan 31, 2019",
                numberprefix: "PM",
                numdisplaysets: "10",
                labeldisplay: "rotate",
                showrealtimevalue: "0",
                theme: "fusion",
                plottooltext: "<b>$label</b><br>Products Sold: <b>$dataValue</b>",
                setadaptiveymin: "0"
            },
            categories: [{ category: $scope.CategoriasRealTime }],
            dataset: [{ data: $scope.dadosReal }]
        };
        
        $scope.clickHandler = function (e) {
            $scope.$apply(function () {
                //debugger;
                //alert(e.data.marker)
                //alert("You have clicked on plot <b>" + e.data.categoryLabel + "</b> whose value is <b>" + e.data.displayValue + "</b>")
                var mylatlng = new google.maps.LatLng(Obj.GoogleMaps.Markers[0].lat, Obj.GoogleMaps.Markers[0].lng);
                var marker = new google.maps.Marker({ position: mylatlng, map: Obj.GoogleMaps.Map, title: "aaaaaaaaaa" });
                GoogleMaps.Latlngbounds.extend(marker.position);
                GoogleMaps.Map.setCenter(GoogleMaps.Latlngbounds.getCenter());
                GoogleMaps.Map.fitBounds(GoogleMaps.Latlngbounds);
               
            });
        };

        $scope.track = function () {          
            FusionCharts.addEventListener("dataplotclick", $scope.clickHandler);
            $scope.message = "Click on the plot to see the value along with the label";           
        };

        $scope.track();
                      
        function dataHoje() {
            var data = new Date();
            var dia = data.getDate();
            var mes = data.getMonth() + 1;
            if (mes < 10) {
                mes = "0" + mes;
            }
            var ano = data.getFullYear();
            var horas = new Date().getHours();
            if (horas < 10) {
                horas = "0" + horas;
            }
            var minutos = new Date().getMinutes();
            if (minutos < 10) {
                minutos = "0" + minutos;
            }
            var result = horas + "h" + minutos;
            //var result = dia + "/" + mes + "/" + ano + " - " + horas + "h" + minutos;
            return result;
        }

        $scope.ConfigBaseBairros = {
            width: "100%",
            height: "250",
            Type: "column2d",
            Source: $scope.Bairros
        }

        $scope.ConfigBaseCidades = {
            width: "100%",
            height: "250",
            Type: "column2d",
            Source: $scope.Cidades
        }

        $scope.ConfigBaseEstados = {
            width: "100%",
            height: "250",
            Type: "column2d",
            Source: $scope.Estados
        }

        $scope.ConfigBaseRealTimeLine = {
            width: "100%",
            height: "200",
            Type: "realtimeline",
            Source: $scope.RealTime
        }

        $scope.converteEndereco = function(endereco, avaliacao)
        {
            endereco = "Avenida geronimo de camargo m°2200 vila neto Atibaia São Paulo";
            $scope.geocoder.geocode({ 'address': endereco }, function (resultado, status)
            {
                if (status == google.maps.GeocoderStatus.OK) {
                    var marcador = {
                          latitude: resultado[0].geometry.location.k
                        , longitude: resultado[0].geometry.location.D
                        , titulo: 'Novo marcador'
                        , imagem: avaliacao
                    }
                    criaMarcador(marcador, map)
                } else {
                    alert('Erro ao converter endereço: ' + status);
                }
            });
        }

        FusionCharts.addEventListener("rendered", function (eventObject) {
            $scope.loadScript();
            $timeout(function () {
                $scope.initialize();
                blockUI.stop()
            }, 3000)
        });


    }]);




    
