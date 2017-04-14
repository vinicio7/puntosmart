var products_service = angular.module('app.service.products', ['app.constants']);

products_service.service('ProductsService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(){
        return $http.get(WS_URL+'products');
    };

    this.store = function(parameters) {
        return $http.post(WS_URL+'products', parameters);
    };

    this.update = function(parameters) {
        return $http.put(WS_URL+'products/' + parameters.id, parameters);
    };

    this.destroy = function(id) {
        return $http.delete(WS_URL+'products/' + id);
    };
}]);