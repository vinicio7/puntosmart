;(function()
{
    'use strict';

    angular.module('app.sales', ['app.service.products', 'LocalStorageModule'])

        .controller('SalesController', ['$scope', '$filter', '$http', '$modal', '$interval', 'ProductsService', 'localStorageService', function($scope, $filter, $http, $modal, $timeout, ProductsService, localStorageService)  {

            // General variables
            $scope.user_data = localStorageService.get('user_data');
            $scope.positionModel = 'topRight';
            $scope.today = new Date();
            $scope.toasts = [];
            var modal;

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
        }])
}());