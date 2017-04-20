var sales_service = angular.module('app.service.sales', ['app.constants']);

sales_service.service('SalesService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(){
        return $http.get(WS_URL+'sales');
    };

    this.store = function(params) {
        return $http.post(WS_URL+'sales', params);
    };

    this.update = function(params) {
        return $http.put(WS_URL+'sales/' + params.id, params);
    };

    this.destroy = function(id) {
        return $http.delete(WS_URL+'sales/' + id);
    };
}]);