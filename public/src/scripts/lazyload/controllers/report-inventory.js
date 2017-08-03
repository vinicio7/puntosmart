/**
 * Created by pakincpp on 4/07/17.
 */

;(function(){
    'use strict';

    angular.module('app.report-inventory', ['app.service.products', 'LocalStorageModule', 'app.constants'])

        .controller('ReportInventoryController', ['$scope', '$filter', '$interval', '$window', 'ProductsService', 'localStorageService', 'WS_URL', function($scope, $filter, $timeout, $window, ProductsService, localStorageService, WS_URL)  {

            var user_data = localStorageService.get('user_data');
            if (user_data.type === 'root' || user_data.type === 'user') {
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

            // Function for load table
            function loadDataTable() {
                var params = { company_id:user_data.company_id };
                ProductsService.index(params).then(function(response) {
                    $scope.datas = response.data.records;
                    $scope.search();
                    $scope.select($scope.currentPage);
                    $scope.disable_export = false;
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

            // Export to excel
            $scope.exportSalesForDate = function () {
                $window.open(WS_URL+'products/export/excel?company_id='+user_data.company_id, '_blank')
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