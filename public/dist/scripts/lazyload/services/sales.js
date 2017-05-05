var sales_service = angular.module('app.service.sales', ['app.constants']);

sales_service.service('SalesService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.saveSale = function(params) {
        return $http.post(WS_URL+'sale/save', params);
    };

    this.generateCashClosing = function(params) {
        return $http.get(WS_URL+'sale/cash/close', {params:params});
    };
}]);