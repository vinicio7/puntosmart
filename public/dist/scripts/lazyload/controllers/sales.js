;(function()
{
    'use strict';

    angular.module('app.sales', ['app.service.products',
                                'app.service.sales',
                                'app.service.customers',
                                'LocalStorageModule'])

        .controller('SalesController', ['$scope', '$filter', '$http', '$modal', '$interval', 'ProductsService', 'SalesService', 'CustomersService', 'localStorageService', '$window', function($scope, $filter, $http, $modal, $timeout, ProductsService, SalesService, CustomersService, localStorageService, $window)  {

            $scope.user_data = localStorageService.get('user_data');
            if ($scope.user_data.type == 'admin') {
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
            $scope.total = 0;
            $scope.show_input = 0;
            $scope.enable_add_product = true;
            var modal;

            checkSaleData();

            function checkSaleData() {
                var data_sale = localStorageService.get('data_sale');
                if (data_sale) {
                    $scope.customer = data_sale.customer;
                    $scope.products = data_sale.products;
                    $scope.total = data_sale.total;
                    $scope.nit_section = 0;
                    $scope.invoice_section = 1;
                }
            }

            $scope.cancelSale = function () {
                localStorageService.remove('data_sale');
                $scope.nit_section = 1;
                $scope.invoice_section = 0;
                $scope.customer = {};
                $scope.products = [];
                $scope.total = 0;
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
                                customer: $scope.customer,
                                products: $scope.products,
                                total: $scope.total
                            };

                            localStorageService.set('data_sale', data_sale);

                            createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 3000);
                        } else {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 3000);
                            createCustomer(customer);
                        }
                    },
                    function errorCallback(response) {
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 3000);
                        createCustomer(customer);
                    }
                );
            };

            $scope.searchProduct = function (product) {
                ProductsService.searchProduct(product).then(
                    function successCallback(response) {
                        if (response.data.result) {
                            $scope.product.id = response.data.records.id;
                            $scope.product.param = response.data.records.description;
                            $scope.product.price = response.data.records.price_sale;
                            $scope.product.internal_code = response.data.records.internal_code;
                            $scope.product.quantity = 1;
                            $scope.enable_add_product = false;

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
            };

            $scope.addProduct = function (product) {
                ProductsService.checkProductStock(product).then(
                    function successCallback(response) {
                        if (response.data.result) {
                            var subtotal = (product.quantity * product.price);
                            var data = {
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
                                customer: $scope.customer,
                                products: $scope.products,
                                total: $scope.total
                            };

                            localStorageService.set('data_sale', data_sale);
                            $scope.enable_add_product = true;
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
                                    customer: $scope.customer,
                                    products: $scope.products,
                                    total: $scope.total
                                };

                                localStorageService.set('data_sale', data_sale);
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
            }
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
}());