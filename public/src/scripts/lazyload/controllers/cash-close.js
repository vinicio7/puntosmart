;(function()
{
    'use strict';

    angular.module('app.cash-close', ['app.service.sales', 'LocalStorageModule', 'app.constants'])

        .controller('CashCloseController', ['$scope', '$filter', '$http', '$modal', '$interval', 'SalesService', 'localStorageService', '$window', 'WS_URL', function($scope, $filter, $http, $modal, $timeout, SalesService, localStorageService, $window, WS_URL)  {

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
            $scope.start_date = $filter('date')(Date.now(), 'yyyy-MM-dd');
            $scope.final_date = $filter('date')(Date.now(), 'yyyy-MM-dd');

            $scope.openStartDate = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened_start = true;
            };

            $scope.openFinalDate = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened_final = true;
            };

            $scope.generateCashClosing = function () {
                var sd = new Date($scope.start_date);
                var fd = new Date($scope.final_date);

                if (fd >= sd) {
                    var params = {
                        company_id:user_data.company_id,
                        start_date: $scope.start_date,
                        final_date: $scope.final_date
                    };

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
                } else {
                    createToast('danger', '<strong>Error: </strong> La fecha de inicio no puede ser mayor a la fecha de fin');
                    $timeout( function(){ closeToast(0); }, 3000);
                    $scope.disable_export = true;
                }
            };

            $scope.exportCashClosing = function () {
                $window.open(WS_URL+'sale/export/cash/close?company_id='+user_data.company_id+'&start_date='+$scope.start_date+'&final_date='+$scope.final_date, '_blank')
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