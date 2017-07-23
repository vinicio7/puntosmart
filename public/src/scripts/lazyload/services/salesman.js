var salesman_service = angular.module('app.service.salesman', ['app.constants']);

salesman_service.service('SalesmanService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(params){
        return $http.get(WS_URL+'salesman', {params:params});
    };

    this.store = function(params) {
        return $http.post(WS_URL+'salesman', params);
    };

    this.update = function(params) {
        return $http.put(WS_URL+'salesman/' + params.id, params);
    };

    this.destroy = function(id) {
        return $http.delete(WS_URL+'salesman/' + id);
    };
}]);