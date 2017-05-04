;(function()
{
    'use strict';

    angular.module('app.cash-close', ['app.service.sales', 'LocalStorageModule'])

        .controller('CashCloseController', ['$scope', '$filter', '$http', '$modal', '$interval', 'SalesService', 'localStorageService', '$window', function($scope, $filter, $http, $modal, $timeout, SalesService, localStorageService, $window)  {

            var user_data = localStorageService.get('user_data');
            if (user_data.type == 'admin') {
                $window.location.href = './#/404';
            }

            // General variables
            $scope.sales_with_printing = {
                cash: 0,
                credit_card: 0,
                check: 0,
                down_payment: 0,
                total: 0
            };
            $scope.sales_without_printing = {
                cash: 0,
                credit_card: 0,
                check: 0,
                down_payment: 0,
                total: 0
            };
            $scope.disable_export = true;
            $scope.total = 0;
            $scope.positionModel = 'topRight';
            $scope.toasts = [];

            $scope.generateCashClosing = function () {
                var params = { company_id:user_data.company_id };
                SalesService.generateCashClosing(params).then(
                    function successCallback(response) {
                        if (response.data.result) {
                            $scope.sales_with_printing = response.data.records.sales_with_printing;
                            $scope.sales_without_printing = response.data.records.sales_without_printing;
                            $scope.total = response.data.records.total;
                            $scope.disable_export = false;

                            createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                            $timeout( function(){ closeToast(0); }, 3000);
                        } else {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeToast(0); }, 3000);
                        }
                    },
                    function errorCallback(response) {
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 3000);
                    }
                );
            };

            // Function for toast
            function createToast (type, message) {
                $scope.toasts.push({
                    anim: 'bouncyflip',
                    type: type,
                    msg: message
                });
            }

            function closeToast (index) {
                $scope.toasts.splice(index, 1);
            }
        }])
}());