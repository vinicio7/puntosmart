;(function()
{
    'use strict';
    angular.module('login', ["LocalStorageModule",
                            "ngRoute",
                            "ngAnimate",
                            "ngSanitize",
                            "ngAria",
                            "ngMaterial",
                            "oc.lazyLoad",
                            "ui.bootstrap",
                            "angular-loading-bar",
                            "FBAngular",
                            "app.ctrls",
                            "app.directives",
                            "app.ui.ctrls",
                            "app.ui.directives",
                            "app.form.ctrls",
                            "app.table.ctrls",
                            "app.email.ctrls",
                            "app.constants"])

        .controller('LoginController', ['$scope', '$http', '$timeout', "$window", "localStorageService", "API_URL", function($scope, $http, $timeout, $window, localStorageService, API_URL)  {

            $scope.positionModel = 'topRight';
            $scope.toasts = [];

            if (localStorageService.get('user_data')) {
                $window.location.href = './#/dashboard';
            }

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

            $scope.signIn = function (data) {
                $http({
                    method: 'POST',
                    url:    API_URL+'login',
                    data:   data
                })
                .then(function succesCallback (response) {
                    if( response.data.result ) {
                        localStorageService.set('user_data',response.data.records);
                        createToast('success', '<strong>Éxito: </strong>'+response.data.message);
                        $window.location.href = './#/dashboard';

                    } else {
                        createToast('danger', '<strong>Error: </strong>'+response.data.message);
                        $timeout( function(){ closeAlert(0); }, 3000);
                    }
                },
                function errorCallback(response) {
                    createToast('danger', '<strong>Error: </strong>'+response.data.message);
                    $timeout( function(){ closeAlert(0); }, 3000);
                })
            };
        }])
}());