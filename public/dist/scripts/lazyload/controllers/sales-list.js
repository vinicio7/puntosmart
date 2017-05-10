;(function()
{
    'use strict';

    angular.module('app.sales-list', ['app.service.sales-list', 'LocalStorageModule'])

        .controller('SalesListController', ['$scope', '$filter', '$http', '$modal', '$interval', 'SalesListService', 'localStorageService', '$window', function($scope, $filter, $http, $modal, $timeout, SalesListService, localStorageService, $window)  {

            var user_data = localStorageService.get('user_data');

            if (user_data.type === 'admin') {
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
                var popupWin = window.open('', '_blank', 'width=350,height=400');
                var style =
                    "<style>" +
                    "html{ font-size: 14px; font-family: sans-serif !important; }"+
                    "body{ width: 300px; }"+
                    "p{ margin: 0px !important; padding: 0px; }"+
                    "small{ font-size: 12px; }"+
                    "imprimir-seccion{ padding:5px; margin:5px; }"+
                    "</style>";
                popupWin.document.open();
                popupWin.document.write('<html><head>'+style+'</head><body onload="window.print()">' + printContents + '</body></html>');
                popupWin.document.close();
            };

            // Functions for modals
            $scope.modalDetailOpen = function(item) {
                $scope.dataModal = item;
                $scope.action = 'detail';

                modal = $modal.open({
                    templateUrl: 'views/app/sales-list-datail.html',
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
                    templateUrl: 'views/app/sales-list-datail.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalClose = function() {
                modal.close();
            }
        }])
}());