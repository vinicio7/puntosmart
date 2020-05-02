var entries_service = angular.module('app.service.entries', ['app.constants']);

entries_service.service('EntriesService', ['$http', 'WS_URL', function($http, WS_URL)  {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.index = function(params){
        return $http.get(WS_URL+'entries', {params:params});
    };

    this.store = function(params) {
        return $http.post(WS_URL+'entries', params);
    };

    this.update = function(params) {
        return $http.put(WS_URL+'entries/' + params.id, params);
    };

    this.destroy = function(id) {
        return $http.delete(WS_URL+'entries/' + id);
    };
}]);