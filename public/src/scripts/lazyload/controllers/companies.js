;(function()
{
    'use strict';

    angular.module('app.companies', ['app.service.companies', 'LocalStorageModule','ngFileUpload'])

        .controller('CompaniesController', ['$scope', '$filter', '$http', '$modal', '$interval', 'CompaniesService', 'localStorageService', '$window','Upload', function($scope, $filter, $http, $modal, $timeout, CompaniesService, localStorageService, $window,Upload)  {

            var user_data = localStorageService.get('user_data');
            if (user_data.type === 'user' || user_data.type === 'admin') {
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
                CompaniesService.index().then(function(response) {
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
            $scope.saveData = function (company) {
                if ($scope.action == 'new') {
                    Upload.upload({
                        url: 'http://localhost/facturador/public/api/mobile/companies',
                        data: {file: company.file, 'trade_name': company.trade_name,'business_name': company.business_name,'nit': company.nit,'direction': company.direction,'phone': company.phone,'contact': company.contact,'stock': company.stock,'type_service': company.type_service,'format': company.format,'fel': company.fel}
                    }).then(function (response) {
                        loadDataTable();
                        modal.close();
                        createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 3000);
                    }, function (response) {
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 3000);
                    });
                }
                else if ($scope.action == 'update') {
                    console.log(company);
                    Upload.upload({
                        url: 'http://localhost/facturador/public/api/mobile/companies/update',
                        data: {file: company.file, 'id': company.id,'trade_name': company.trade_name,'business_name': company.business_name,'nit': company.nit,'direction': company.direction,'phone': company.phone,'contact': company.contact,'stock': company.stock,'type_service': company.type_service,'format': company.format,'fel': company.fel}
                    }).then(function (response) {
                        loadDataTable();
                        modal.close();
                        createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 3000);
                    }, function (response) {
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 3000);
                    });
                }
                else if ($scope.action == 'delete') {
                    CompaniesService.destroy(company.id).then(
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

            // Functions for modals
            $scope.modalCreateOpen = function() {
                $scope.company = {};
                $scope.action = 'new';

                modal = $modal.open({
                    templateUrl: 'views/app/companies-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalEditOpen = function(data) {
                $scope.action = 'update';
                $scope.company = data;

                modal = $modal.open({
                    templateUrl: 'views/app/companies-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalDeleteOpen = function(data) {
                $scope.action = 'delete';
                $scope.company = data;

                modal = $modal.open({
                    templateUrl: 'views/app/companies-modal.html',
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