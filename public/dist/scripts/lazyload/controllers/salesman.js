;(function()
{
    'use strict';

    angular.module('app.salesman', ['app.service.salesman', 'LocalStorageModule'])

        .controller('SalesmanController', ['$scope', '$filter', '$http', '$modal', '$interval', 'SalesmanService', 'localStorageService', function($scope, $filter, $http, $modal, $timeout, SalesmanService, localStorageService)  {

            var user_data = localStorageService.get('user_data');
            if (user_data.type === 'root' || user_data.type === 'user' ) {
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
                SalesmanService.index(params).then(function(response) {
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
                if($scope.row === rowName)
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

            function closeToast (index) {
                $scope.toasts.splice(index, 1);
            }

            // Function for sending data
            $scope.saveData = function (salesman) {
                if ($scope.action === 'new') {
                    salesman.company_id = user_data.company_id;
                    SalesmanService.store(salesman).then(
                        function successCallback(response) {
                            if (response.data.result) {
                                loadDataTable();
                                modal.close();
                                createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                                $timeout( function(){ closeToast(0); }, 3000);
                            } else {
                                createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                $timeout( function(){ closeToast(0); }, 3000);
                            }
                        },
                        function errorCallback(response) {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeToast(0); }, 3000);
                        }
                    );
                }
                else if ($scope.action === 'update') {
                    SalesmanService.update(salesman).then(
                        function successCallback(response) {
                            if (response.data.result) {
                                modal.close();
                                createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                                $timeout( function(){ closeToast(0); }, 3000);
                            } else {
                                createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                $timeout( function(){ closeToast(0); }, 3000);
                            }
                        },
                        function errorCallback(response) {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeToast(0); }, 3000);
                        }
                    );
                }
                else if ($scope.action === 'delete') {
                    SalesmanService.destroy(salesman.id).then(
                        function successCallback(response) {
                            if (response.data.result) {
                                loadDataTable();
                                modal.close();
                                createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                                $timeout( function(){ closeToast(0); }, 3000);
                            } else {
                                createToast('danger', '<strong>Error: </strong>'+response.data.message);
                                $timeout( function(){ closeToast(0); }, 3000);
                            }
                        },
                        function errorCallback(response) {
                            createToast('danger', '<strong>Error: </strong>'+response.data.message);
                            $timeout( function(){ closeToast(0); }, 3000);
                        }
                    );
                }
            };

            // Functions for modals
            $scope.modalCreateOpen = function() {
                $scope.salesman = {};
                $scope.action = 'new';

                modal = $modal.open({
                    templateUrl: 'views/app/salesman-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalEditOpen = function(data) {
                $scope.action = 'update';
                $scope.salesman = data;

                modal = $modal.open({
                    templateUrl: 'views/app/salesman-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalDeleteOpen = function(data) {
                $scope.action = 'delete';
                $scope.salesman = data;

                modal = $modal.open({
                    templateUrl: 'views/app/salesman-modal.html',
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