;(function()
{
    'use strict';

    angular.module('app.sales', ['app.service.products', 'app.service.sales', 'app.service.customers', 'app.service.salesman', 'LocalStorageModule', 'ngSanitize'])

        .controller('SalesController', ['$scope', '$filter', '$http', '$modal', '$interval', 'ProductsService', 'SalesService', 'CustomersService', 'SalesmanService', 'localStorageService', '$window', function($scope, $filter, $http, $modal, $timeout, ProductsService, SalesService, CustomersService, SalesmanService,localStorageService, $window)  {

            $scope.user_data = localStorageService.get('user_data');
            if ($scope.user_data.type === 'root') {
                $window.location.href = './#/404';
            }

            // General variables
            $scope.positionModel = 'topRight';
            $scope.today = new Date();
            $scope.toasts = [];
            $scope.nit_section = 1;
            $scope.invoice_section = 0;
            $scope.customer = {};
            $scope.products = [];
            $scope.product_list = [];
            $scope.salesman_list = [];
            $scope.total = 0;
            $scope.show_input = 0;
            $scope.invoice = {
                payment: 'cash',
                print: true
            };
            $scope.enable_add_product = true;
            $scope.enable_print = true;
            var modal;
            var saleModal;

            checkSaleData();
            loadProducts();
            loadSalesman();


            function checkSaleData() {
                var data_sale = localStorageService.get('data_sale');
                if (data_sale) {
                    $scope.customer = data_sale.customer;
                    $scope.products = data_sale.products;
                    $scope.total = data_sale.total;
                    $scope.nit_section = 0;
                    $scope.invoice_section = 1;
                    $scope.enable_print = false;
                }
            }

            function loadProducts() {
                var params = { company_id: $scope.user_data.company_id };
                ProductsService.index(params).then(function(response) {
                    $scope.product_list = response.data.records;
                });
            }

            function loadSalesman() {
                var params = { company_id: $scope.user_data.company_id };
                SalesmanService.index(params).then(function (response) {
                    $scope.salesman_list = response.data.records;
                });
            }

            $scope.cancelSale = function () {
                localStorageService.remove('data_sale');
                $scope.nit_section = 1;
                $scope.invoice_section = 0;
                $scope.customer = {};
                $scope.total = 0;
                $scope.enable_print = true;
                $scope.enable_add_product = true;

                if ($scope.products.length > 0) {
                    var params = { products: angular.toJson($scope.products) };
                    ProductsService.backProductStock(params).then(
                        function successCallback(response) {
                            if (response.data.result) {
                                $scope.products = [];
                                createToast('success', '<strong>Éxito: </strong>'+'Venta cancelada correctamente con devolución de existencias');
                                $timeout( function(){ closeAlert(0); }, 4000);
                            } else {
                                createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                $timeout( function(){ closeAlert(0); }, 4000);
                            }
                        },
                        function errorCallback(response) {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                        }
                    );
                } else {
                    $scope.products = [];
                    createToast('success', '<strong>Éxito: </strong>'+'Venta cancelada correctamente');
                    $timeout( function(){ closeAlert(0); }, 4000);
                }
            };

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

            $scope.checkCustomer = function (customer) {
                CustomersService.searchCustomer(customer).then(
                    function successCallback(response) {
                        if (response.data.result) {
                            $scope.customer = response.data.records;
                            $scope.nit_section = 0;
                            $scope.invoice_section = 1;

                            var data_sale = {
                                salesman_name: $scope.seller,
                                customer: $scope.customer,
                                products: $scope.products,
                                total: $scope.total
                            };

                            localStorageService.set('data_sale', data_sale);

                            createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                        } else {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                            createCustomer(customer);
                        }
                    },
                    function errorCallback(response) {
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 4000);
                        createCustomer(customer);
                    }
                );
            };

            $scope.searchProduct = function (product) {
                product.company_id = $scope.user_data.company_id;
                ProductsService.searchProduct(product).then(
                    function successCallback(response) {
                        if (response.data.result) {
                            $scope.product.id = response.data.records.id;
                            $scope.product.stock = response.data.records.stock;
                            $scope.product.param = response.data.records.description;
                            $scope.product.price = response.data.records.price_sale;
                            $scope.product.internal_code = response.data.records.internal_code;
                            $scope.product.quantity = 1;
                            $scope.enable_add_product = false;

                            createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                        } else {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                        }
                    },
                    function errorCallback(response) {
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 4000);
                    }
                );
            };

            $scope.addProduct = function (product) {
                ProductsService.checkProductStock(product).then(
                    function successCallback(response) {
                        if (response.data.result) {
                            ProductsService.remainProductStock(product).then(
                                function successCallback(response) {
                                    if (response.data.result) {
                                        $scope.enable_print = false;
                                        var subtotal = (product.quantity * product.price);
                                        var data = {
                                            id: product.id,
                                            internal_code: product.internal_code,
                                            description: product.param,
                                            quantity: product.quantity,
                                            unit_price: product.price,
                                            subtotal: subtotal
                                        };

                                        $scope.products.push(data);
                                        $scope.total = $scope.total + subtotal;
                                        $scope.product = {};

                                        var data_sale = {
                                            salesman_name: $scope.seller,
                                            customer: $scope.customer,
                                            products: $scope.products,
                                            total: $scope.total
                                        };

                                        localStorageService.set('data_sale', data_sale);
                                        $scope.enable_add_product = true;
                                    } else {
                                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                        $timeout( function(){ closeAlert(0); }, 4000);
                                    }
                                },
                                function errorCallback(response) {
                                    createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                    $timeout( function(){ closeAlert(0); }, 4000);
                                }
                            );
                        } else {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                        }
                    },
                    function errorCallback(response) {
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 4000);
                    }
                );
            };

            $scope.saveSale = function () {
                var data_sale = localStorageService.get('data_sale');
                saleModal = localStorageService.get('data_sale');
                data_sale.user_id = $scope.user_data.id;
                data_sale.company_id = $scope.user_data.company_id;
                data_sale.method_payment = $scope.invoice.payment;
                data_sale.invoice = $scope.invoice.print;
                if ($scope.seller) {
                    data_sale.salesman_id = $scope.seller.id;
                    data_sale.salesman_name = $scope.seller.name;
                }
                var data = {};
                data.data_sale = angular.toJson(data_sale);
                //$scope.modalPrintSale();
                SalesService.saveSale(data).then(
                    function successCallback(response) {
                        if (response.data.result) {
                            saleModal.correlative = response.data.records.correlative;
                            saleModal.date = response.data.records.created_at;
                            if($scope.invoice.print==true) {
                                $scope.modalPrintSale();
                            }
                            localStorageService.remove('data_sale');
                            $scope.nit_section = 1;
                            $scope.invoice_section = 0;
                            $scope.customer = {};
                            $scope.products = [];
                            $scope.total = 0;
                            $scope.invoice.print = true;

                            createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                        } else {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                        }
                    },
                    function errorCallback(response) {
                        console.log(response.data.message);
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 4000);
                    }
                );
            };

            $scope.printSale = function() {
                modal.close();
                var printContents = document.getElementById("imprimir-seccion").innerHTML;
                var popupWin = window.open('', '_blank', 'width=350,height=400');
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

            $scope.modalPrintSale = function() {
                //$scope.dataModal = saleModal;
                console.log(saleModal);
                $scope.dataModal = {};
                $scope.dataModal.correlative = saleModal.correlative;
                $scope.dataModal.customer_name = saleModal.customer.name;
                $scope.dataModal.customer_direction = saleModal.customer.direction;
                $scope.dataModal.customer_nit = saleModal.customer.nit;
                $scope.dataModal.date = $filter('date')(new Date(saleModal.date),'dd/MM/yyyy');
                $scope.dataModal.total = $filter('number')(saleModal.total, 2);
                $scope.dataModal.letters = NumeroALetras($scope.dataModal.total);
                var detalles = 9 - saleModal.products.length;
                $scope.dataModal.detail = [];
                angular.forEach(saleModal.products, function(value, key){
                    $scope.dataModal.detail.push(value);
                });
                for(var i = 0; i < detalles; i++) {
                    $scope.dataModal.detail.push({subtotal:"|"});
                }

                modal = $modal.open({
                    templateUrl: 'views/app/sales-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.saveData = function (customer) {
                if ($scope.action == 'new') {
                    customer.company_id = $scope.user_data.company_id;
                    CustomersService.store(customer).then(
                        function successCallback(response) {
                            if (response.data.result) {
                                modal.close();
                                $scope.customer = response.data.records;
                                $scope.nit_section = 0;
                                $scope.invoice_section = 1;

                                var data_sale = {
                                    salesman_name: $scope.seller,
                                    customer: $scope.customer,
                                    products: $scope.products,
                                    total: $scope.total,
                                };

                                localStorageService.set('data_sale', data_sale);
                                createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                                $timeout( function(){ closeAlert(0); }, 4000);
                            } else {
                                createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                $timeout( function(){ closeAlert(0); }, 4000);
                            }
                        },
                        function errorCallback(response) {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 4000);
                        }
                    );
                }
            };

            function createCustomer (customer) {
                $scope.customer = customer;
                $scope.action = 'new';

                modal = $modal.open({
                    templateUrl: 'views/app/customers-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            }

            $scope.modalClose = function() {
                modal.close();
            };

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

        .directive('myEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.myEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        })
        .directive('myDatalist',['$sce',function($sce){
            return{
                restrict : 'AE',
                require : '?ngModel',
                template : '<ng-form name="dlTest"><input list="dl" ng-model="choosen" class="form-control"><datalist id="dl"><select><option ng-repeat="opt in list" label="{{opt.description}} ({{opt.bar_code}})">{{opt.internal_code}}</option></select></datalist></ng-form>',
                replace : false,
                scope : {
                    list : '='
                },
                link : function(scope,element,attrs,ngModel){
                    if(!ngModel || (scope.list.length <= 0)) return;

                    scope.choosen = '';

                    scope.$watch('choosen',function(val,old){
                        ngModel.$setViewValue(val);
                    });
                }
            }; // return
        }]);
}());