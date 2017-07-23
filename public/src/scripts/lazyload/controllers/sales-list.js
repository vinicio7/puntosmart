;(function()
{
    'use strict';

    angular.module('app.sales-list', ['app.service.sales-list', 'LocalStorageModule'])

        .controller('SalesListController', ['$scope', '$filter', '$http', '$modal', '$interval', 'SalesListService', 'localStorageService', '$window', function($scope, $filter, $http, $modal, $timeout, SalesListService, localStorageService, $window)  {

            var user_data = localStorageService.get('user_data');
            if (user_data.type === 'root') {
                $window.location.href = './#/404';
            }

            // General variables
            $scope.datas = [];
            $scope.currentPageStores = [];
            $scope.searchKeywords = '';
            $scope.filteredData = [];
            $scope.row = '';
            $scope.numPerPageOpts = [5, 10, 25, 50, 100];
            $scope.numPerPage = $scope.numPerPageOpts[1];
            $scope.currentPage = 1;
            $scope.positionModel = 'topRight';
            $scope.toasts = [];
            var modal;

            // Function for load table
            function loadDataTable() {
                var params = { company_id:user_data.company_id };
                SalesListService.index(params).then(function(response) {
                    $scope.datas = response.data.records;
                    $scope.search();
                    $scope.select($scope.currentPage);
                });
            }

            // Functions of table
            $scope.select = function(page) {
                var start = (page - 1)*$scope.numPerPage,
                    end = start + $scope.numPerPage;

                $scope.currentPageStores = $scope.filteredData.slice(start, end);
            };

            $scope.onFilterChange = function() {
                $scope.select(1);
                $scope.currentPage = 1;
                $scope.row = '';
            };

            $scope.onNumPerPageChange = function() {
                $scope.select(1);
                $scope.currentPage = 1;
            };

            $scope.onOrderChange = function() {
                $scope.select(1);
                $scope.currentPage = 1;
            };

            $scope.search = function() {
                $scope.filteredData = $filter('filter')($scope.datas, $scope.searchKeywords);
                $scope.onFilterChange();
            };

            $scope.order = function(rowName) {
                if($scope.row == rowName)
                    return;
                $scope.row = rowName;
                $scope.filteredData = $filter('orderBy')($scope.datas, rowName);
                $scope.onOrderChange();
            };

            loadDataTable();

            // Function for toast
            function createToast (type, message) {
                $scope.toasts.push({
                    anim: 'bouncyflip',
                    type: type,
                    msg: message
                });
            }

            function closeAlert (index) {
                $scope.toasts.splice(index, 1);
            }

            // Function for sending data
            $scope.saveData = function (sale) {
                if ($scope.action == 'cancel') {
                    var data = {
                        id: sale.id,
                        detail: angular.toJson(sale.detail)
                    };
                    SalesListService.cancelSale(data).then(
                        function successCallback(response) {
                            if (response.data.result) {
                                loadDataTable();
                                modal.close();
                                createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                                $timeout( function(){ closeAlert(0); }, 3000);
                            } else {
                                createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                $timeout( function(){ closeAlert(0); }, 3000);
                            }
                        },
                        function errorCallback(response) {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 3000);
                        }
                    );
                }
            };

            $scope.printSale = function() {
                modal.close();
                var printContents = document.getElementById("imprimir-seccion").innerHTML;
                //var popupWin = window.open('', '_blank', 'width=350,height=400');
                var popupWin = window.open('', '_blank', 'width=650,height=800');
                /*var style =
                    "<style>" +
                    "html{ font-size: 14px; font-family: sans-serif !important; }"+
                    "body{ width: 300px; }"+
                    "p{ margin: 0px !important; padding: 0px; }"+
                    "small{ font-size: 12px; }"+
                    "imprimir-seccion{ padding:5px; margin:5px; }"+
                    "</style>";*/
                var style = "";
                popupWin.document.open();
                popupWin.document.write('<html><head>'+style+'</head><body onload="window.print()">' + printContents + '</body></html>');
                popupWin.document.close();
            };

            // Functions for modals
            $scope.modalDetailOpen = function(item) {
                //$scope.dataModal = item;
                $scope.action = 'detail';
                $scope.dataModal = {};
                $scope.dataModal.correlative = item.correlative;
                $scope.dataModal.customer_name = item.customer_name;
                $scope.dataModal.customer_direction = item.customer_direction;
                $scope.dataModal.customer_nit = item.customer_nit;
                $scope.dataModal.date = $filter('date')(new Date(item.created_at),'dd/MM/yyyy');
                $scope.dataModal.total = $filter('number')(item.total, 2);
                $scope.dataModal.letters = NumeroALetras($scope.dataModal.total);
                var detalles = 14 - item.detail.length;
                $scope.dataModal.detail = [];
                angular.forEach(item.detail, function(value, key){
                    $scope.dataModal.detail.push(value);
                });
                for(var i = 0; i < detalles; i++) {
                    $scope.dataModal.detail.push({subtotal:"|"});
                }
                //console.log($scope.dataModal);
                modal = $modal.open({
                    templateUrl: 'views/app/sales-list-datail2.html',
                    scope: $scope,
                    size: 'lg',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalCancelSaleOpen = function(item) {
                $scope.sale = item;
                $scope.action = 'cancel';

                modal = $modal.open({
                    templateUrl: 'views/app/sales-list-datail2.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalClose = function() {
                modal.close();
            }

            function Unidades(num){

                switch(num)
                {
                    case 1: return "UN";
                    case 2: return "DOS";
                    case 3: return "TRES";
                    case 4: return "CUATRO";
                    case 5: return "CINCO";
                    case 6: return "SEIS";
                    case 7: return "SIETE";
                    case 8: return "OCHO";
                    case 9: return "NUEVE";
                }

                return "";
            }//Unidades()

            function Decenas(num){

                var decena = Math.floor(num/10);
                var unidad = num - (decena * 10);

                switch(decena)
                {
                    case 1:
                        switch(unidad)
                        {
                            case 0: return "DIEZ";
                            case 1: return "ONCE";
                            case 2: return "DOCE";
                            case 3: return "TRECE";
                            case 4: return "CATORCE";
                            case 5: return "QUINCE";
                            default: return "DIECI" + Unidades(unidad);
                        }
                    case 2:
                        switch(unidad)
                        {
                            case 0: return "VEINTE";
                            default: return "VEINTI" + Unidades(unidad);
                        }
                    case 3: return DecenasY("TREINTA", unidad);
                    case 4: return DecenasY("CUARENTA", unidad);
                    case 5: return DecenasY("CINCUENTA", unidad);
                    case 6: return DecenasY("SESENTA", unidad);
                    case 7: return DecenasY("SETENTA", unidad);
                    case 8: return DecenasY("OCHENTA", unidad);
                    case 9: return DecenasY("NOVENTA", unidad);
                    case 0: return Unidades(unidad);
                }
            }//Unidades()

            function DecenasY(strSin, numUnidades) {
                if (numUnidades > 0)
                    return strSin + " Y " + Unidades(numUnidades)

                return strSin;
            }//DecenasY()

            function Centenas(num) {
                var centenas = Math.floor(num / 100);
                var decenas = num - (centenas * 100);

                switch(centenas)
                {
                    case 1:
                        if (decenas > 0)
                            return "CIENTO " + Decenas(decenas);
                        return "CIEN";
                    case 2: return "DOSCIENTOS " + Decenas(decenas);
                    case 3: return "TRESCIENTOS " + Decenas(decenas);
                    case 4: return "CUATROCIENTOS " + Decenas(decenas);
                    case 5: return "QUINIENTOS " + Decenas(decenas);
                    case 6: return "SEISCIENTOS " + Decenas(decenas);
                    case 7: return "SETECIENTOS " + Decenas(decenas);
                    case 8: return "OCHOCIENTOS " + Decenas(decenas);
                    case 9: return "NOVECIENTOS " + Decenas(decenas);
                }

                return Decenas(decenas);
            }//Centenas()

            function Seccion(num, divisor, strSingular, strPlural) {
                var cientos = Math.floor(num / divisor);
                var resto = num - (cientos * divisor);

                var letras = "";

                if (cientos > 0)
                    if (cientos > 1)
                        letras = Centenas(cientos) + " " + strPlural;
            else
                letras = strSingular;

                if (resto > 0)
                    letras += "";

                return letras;
            }//Seccion()

            function Miles(num) {
                var divisor = 1000;
                var cientos = Math.floor(num / divisor);
                var resto = num - (cientos * divisor);

                var strMiles = Seccion(num, divisor, "UN MIL", "MIL");
                var strCentenas = Centenas(resto);

                if(strMiles == "")
                return strCentenas;

                return strMiles + " " + strCentenas;
            }//Miles()

            function Millones(num) {
                var divisor = 1000000;
                var cientos = Math.floor(num / divisor);
                var resto = num - (cientos * divisor);

                var strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
                var strMiles = Miles(resto);

                if(strMillones == "")
                return strMiles;

                return strMillones + " " + strMiles;
            }//Millones()

            function NumeroALetras(num) {
                var data = {
                    numero: num,
                    enteros: Math.floor(num),
                    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                letrasCentavos: "",
                letrasMonedaPlural: 'QUETZALES',//“PESOS”, 'Dólares', 'Bolívares', 'etcs'
                    letrasMonedaSingular: 'QUETZAL', //“PESO”, 'Dólar', 'Bolivar', 'etc'

                    letrasMonedaCentavoPlural: "CENTAVOS",
                letrasMonedaCentavoSingular: "CENTAVO"
            };

                if (data.centavos > 0) {
                    data.letrasCentavos = "CON " + (function (){
                        if (data.centavos == 1)
                            return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
                        else
                        return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
                    })();
                };

                if(data.enteros == 0)
                    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
                if (data.enteros == 1)
                    return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
            else
                return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
            }//NumeroALetras()
            
        }])
}());