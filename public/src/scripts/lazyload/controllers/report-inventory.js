/**
 * Created by pakincpp on 4/07/17.
 */

;(function(){
    'use strict';

    angular.module('app.report-salefordate', ['app.service.sales', 'LocalStorageModule', 'app.constants'])

        .controller('ReportSaleForDateController', ['$scope', '$filter', '$http', '$modal', '$interval', '$window', 'SalesService', 'localStorageService', 'WS_URL', function($scope, $filter, $http, $modal, $timeout, $window, SalesService, localStorageService, WS_URL)  {

            var user_data = localStorageService.get('user_data');
            if (user_data.type == 'admin') {
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
            $scope.disable_export = true;
            $scope.start_date = $filter('date')(Date.now(), 'yyyy-MM-dd');
            $scope.final_date = $filter('date')(Date.now(), 'yyyy-MM-dd');

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

            // Function for date picker
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

            $scope.generateSalesForDate = function () {
                var sd = new Date($scope.start_date);
                var fd = new Date($scope.final_date);

                if (fd >= sd) {
                    var params = {
                        company_id:user_data.company_id,
                        start_date: $scope.start_date,
                        final_date: $scope.final_date
                    };

                    SalesService.salesForDate(params).then(
                        function successCallback(response) {
                            if (response.data.result) {
                                $scope.datas = response.data.records;
                                $scope.search();
                                $scope.select($scope.currentPage);
                                $scope.disable_export = false;

                                createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                                $timeout( function(){ closeToast(0); }, 3000);
                            } else {
                                $scope.disable_export = true;
                                createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                $timeout( function(){ closeToast(0); }, 3000);
                            }
                        },
                        function errorCallback(response) {
                            $scope.disable_export = true;
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeAlert(0); }, 3000);
                        }
                    );
                } else {
                    $scope.disable_export = true;
                    createToast('danger', '<strong>Error: </strong> La fecha de inicio no puede ser mayor a la fecha de fin');
                    $timeout( function(){ closeToast(0); }, 3000);
                }
            };

            $scope.exportSalesForDate = function () {
                $window.open(WS_URL+'sales/export/for/date?company_id='+user_data.company_id+'&start_date='+$scope.start_date+'&final_date='+$scope.final_date, '_blank')
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