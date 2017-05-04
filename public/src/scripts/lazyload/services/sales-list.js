var sales_list_service = angular.module('app.service.sales-list', ['app.constants']);

sales_list_service.service('SalesListService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(params){
        return $http.get(WS_URL+'sales/list', {params:params});
    };

    this.cancelSale = function(params) {
        return $http.post(WS_URL+'sale/cancel', params);
    };
}]);