var products_service = angular.module('app.service.products', ['app.constants']);

products_service.service('ProductsService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(params){
        return $http.get(WS_URL+'products', {params:params});
    };

    this.store = function(params) {
        return $http.post(WS_URL+'products', params);
    };

    this.update = function(params) {
        return $http.put(WS_URL+'products/' + params.id, params);
    };

    this.destroy = function(id) {
        return $http.delete(WS_URL+'products/' + id);
    };

    this.searchProduct = function(params) {
        return $http.get(WS_URL+'product/search', {params:params});
    };
}]);