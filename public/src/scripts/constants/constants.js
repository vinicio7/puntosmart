;(function () {
    'use strict';
    angular.module('app.constants', [])
        .constant('WS_URL', 'http://localhost/facturador/public/ws/')
        .constant('API_URL', 'http://localhost/facturador/public/api/')
        .constant('APP_URL', 'http://localhost/facturador/public/');

        //.constant('WS_URL', 'http://18.219.45.78/facturador/public/ws/')
        //.constant('API_URL', 'http://18.219.45.78/facturador/public/api/')
        //.constant('APP_URL', 'http://18.219.45.78/facturador/public/');
}());