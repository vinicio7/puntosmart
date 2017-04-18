;(function()
{
    'use strict';

    angular.module('app.sales', ['app.service.products'])

        .controller('SalesController', ['$scope', '$filter', '$http', '$modal', '$interval', 'ProductsService', function($scope, $filter, $http, $modal, $timeout, ProductsService)  {

            // General variables
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