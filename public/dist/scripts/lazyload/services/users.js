var users_service = angular.module('app.service.users', ['app.constants']);

users_service.service('UsersService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(){
        return $http.get(WS_URL+'users');
    };

    this.store = function(params) {
        return $http.post(WS_URL+'users', params);
    };

    this.update = function(params) {
        return $http.put(WS_URL+'users/' + params.id, params);
    };

    this.destroy = function(id) {
        return $http.delete(WS_URL+'users/' + id);
    };
}]);