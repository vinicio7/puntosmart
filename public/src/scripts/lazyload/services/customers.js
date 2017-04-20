var customers_service = angular.module('app.service.customers', ['app.constants']);

customers_service.service('CustomersService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(params){
        return $http.get(WS_URL+'customers', {params:params});
    };

    this.store = function(params) {
        return $http.post(WS_URL+'customers', params);
    };

    this.update = function(params) {
        return $http.put(WS_URL+'customers/' + params.id, params);
    };

    this.destroy = function(id) {
        return $http.delete(WS_URL+'customers/' + id);
    };
}]);