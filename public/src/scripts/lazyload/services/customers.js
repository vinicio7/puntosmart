var customers_service = angular.module('app.service.customers', ['app.constants']);

customers_service.service('CustomersService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(){
        return $http.get(WS_URL+'customers');
    };

    this.store = function(parameters) {
        return $http.post(WS_URL+'customers', parameters);
    };

    this.update = function(parameters) {
        return $http.put(WS_URL+'customers/' + parameters.id, parameters);
    };

    this.destroy = function(id) {
        return $http.delete(WS_URL+'customers/' + id);
    };
}]);