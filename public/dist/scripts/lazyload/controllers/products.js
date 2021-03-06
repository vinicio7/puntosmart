;(function()
{
    'use strict';

    angular.module('app.products', ['app.service.products', 'LocalStorageModule', 'app.constants'])

        .controller('ProductsController', ['$scope', '$filter', '$http', '$modal', '$interval', 'ProductsService', 'localStorageService', '$window', 'WS_URL', function($scope, $filter, $http, $modal, $timeout, ProductsService, localStorageService, $window, WS_URL)  {

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
            $scope.show_input = user_data.company.stock == 1 ? false : true;
            $scope.file = null;
            $scope.show_input_commission = false;
            var modal;

            // Function for load table
            function loadDataTable() {
                var params = { company_id:user_data.company_id };
                ProductsService.index(params).then(function(response) {
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

            $scope.exportProductsExcel = function () {
                $window.open(WS_URL+'products/export/excel?company_id='+user_data.company_id, '_blank');
            };

            $scope.checkCommission = function () {
                if ($scope.product.applyCommission === true) {
                    $scope.show_input_commission = true;
                } else {
                    $scope.show_input_commission = false;
                }
            };

            // Function for sending data
            $scope.saveData = function (product) {
                if ($scope.action == 'new') {
                    product.company_id = user_data.company_id;
                    product.stock = user_data.company.stock;
                    ProductsService.store(product).then(
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
                } else if ($scope.action == 'update') {
                    console.log(product);
                    ProductsService.update(product).then(
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
                } else if ($scope.action == 'delete') {
                    ProductsService.destroy(product.id).then(
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

            $scope.uploadFile = function(){
                console.log('file is ' );
                console.dir(file);
                // fileUpload.uploadFileToUrl(file, uploadUrl);
            };

            // Functions for modals
            $scope.modalCreateOpen = function() {
                $scope.product = {};
                $scope.action = 'new';

                modal = $modal.open({
                    templateUrl: 'views/app/products-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalEditOpen = function(data) {
                $scope.action = 'update';
                $scope.product = data;
                $scope.product.applyCommission = data.commission > 0 ? true : false;
                $scope.show_input_commission = data.commission > 0 ? true : false;

                modal = $modal.open({
                    templateUrl: 'views/app/products-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalDeleteOpen = function(data) {
                $scope.action = 'delete';
                $scope.product = data;

                modal = $modal.open({
                    templateUrl: 'views/app/products-modal.html',
                    scope: $scope,
                    size: 'md',
                    resolve: function() {},
                    windowClass: 'default'
                });
            };

            $scope.modalUploadOpen = function() {
                $scope.product = {};

                modal = $modal.open({
                    templateUrl: 'views/app/products-modal-upload.html',
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

        .directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function(){
                        scope.$apply(function(){
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }])

        .directive('validFile',function(){
            return {
                require:'ngModel',
                link:function(scope,el,attrs,ngModel){
                    el.bind('change',function(){
                        scope.$apply(function(){
                            ngModel.$setViewValue(el.val());
                            ngModel.$render();
                        });
                    });
                }
            }
        })
}());