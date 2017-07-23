;(function() {
"use strict";


angular.module("app.ctrls", ['LocalStorageModule', 'app.constants'])

// Root Controller
.controller("AppCtrl", ["$rootScope", "$scope", "$timeout", "localStorageService", "$window", function($rs, $scope, $timeout, localStorageService, $window) {

    $scope.view_customers = 0;
    $scope.view_sales = 0;
    $scope.view_products = 0;
    $scope.view_companies = 0;
    $scope.view_users = 0;
    $scope.view_entries = 0;
    $scope.view_sales_list = 0;
    $scope.view_cash_close_list = 0;
    $scope.view_reports = 0;
    $scope.view_salesman = 0;

    if (!localStorageService.get('user_data')) {
        $window.location.href = 'login.html';
    } else {
        var user_data = localStorageService.get('user_data');
        if (user_data.type === 'root') {
            $scope.view_customers = 0;
            $scope.view_sales = 0;
            $scope.view_products = 0;
            $scope.view_companies = 1;
            $scope.view_users = 1;
            $scope.view_entries = 0;
            $scope.view_sales_list = 0;
            $scope.view_cash_close_list = 0;
            $scope.view_reports = 0;
            $scope.view_salesman = 0;
        } else if (user_data.type === 'admin'){
        	user_data.company.stock === 1 ? $scope.view_entries = 1 : $scope.view_entries = 0;
            $scope.view_customers = 1;
            $scope.view_sales = 1;
            $scope.view_products = 1;
            $scope.view_companies = 0;
            $scope.view_users = 0;
            $scope.view_sales_list = 1;
            $scope.view_cash_close_list = 1;
            $scope.view_reports = 1;
            $scope.view_salesman = 1;
        } else {
            user_data.company.stock === 1 ? $scope.view_entries = 1 : $scope.view_entries = 0;
            $scope.view_customers = 1;
            $scope.view_sales = 1;
            $scope.view_products = 0;
            $scope.view_companies = 0;
            $scope.view_users = 0;
            $scope.view_sales_list = 1;
            $scope.view_cash_close_list = 1;
            $scope.view_reports = 0;
            $scope.view_salesman = 0;
		}
	}

	var mm = window.matchMedia("(max-width: 767px)");
	$rs.isMobile = mm.matches ? true: false;

	$rs.safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase === '$apply' || phase === '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};
	
	mm.addListener(function(m) {
		$rs.safeApply(function() {
			$rs.isMobile = (m.matches) ? true : false;
		});	
	});

	$scope.navFull = true;
	$scope.toggleNav = function() {
		$scope.navFull = $scope.navFull ? false : true;
		$rs.navOffCanvas = $rs.navOffCanvas ? false : true;
		console.log("navOffCanvas: " + $scope.navOffCanvas);

		$timeout(function() {
			$rs.$broadcast("c3.resize");
		}, 260);	// adjust this time according to nav transition
	};

	// ======= Site Settings
	$scope.toggleSettingsBox = function() {
		$scope.isSettingsOpen = $scope.isSettingsOpen ? false : true;
	};

	$scope.themeActive = "theme-zero";	// first theme
	
	$scope.fixedHeader = true;
	$scope.navHorizontal = false;	// this will access by other directive, so in rootScope.
	

	// === saving states
	var SETTINGS_STATES = "_setting-states";
	var statesQuery = {
		get : function() {
			return JSON.parse(localStorage.getItem(SETTINGS_STATES));
		},
		put : function(states) {
			localStorage.setItem(SETTINGS_STATES, JSON.stringify(states));
		}
	};

	// initialize the states
	var sQuery = statesQuery.get() || {
		navHorizontal: $scope.navHorizontal,
		fixedHeader: $scope.fixedHeader,
		navFull: $scope.navFull,
		themeActive: $scope.themeActive
	};
	// console.log(savedStates);
	if(sQuery) {
		$scope.navHorizontal = sQuery.navHorizontal;
		$scope.fixedHeader = sQuery.fixedHeader;
		$scope.navFull = sQuery.navFull;
		$scope.themeActive = sQuery.themeActive;
	}

	// putting the states
	$scope.onNavHorizontal = function() {
		sQuery.navHorizontal = $scope.navHorizontal;
		statesQuery.put(sQuery);
	};

	$scope.onNavFull = function() {
		sQuery.navFull = $scope.navFull;
		statesQuery.put(sQuery);

		$timeout(function() {
			$rs.$broadcast("c3.resize");
		}, 260);	
		
	};

	$scope.onFixedHeader = function() {
		sQuery.fixedHeader = $scope.fixedHeader;
		statesQuery.put(sQuery);
	};

	$scope.onThemeActive = function() {
		sQuery.themeActive = $scope.themeActive;
		statesQuery.put(sQuery);
	};

	$scope.onThemeChange = function(theme) {
		$scope.themeActive = theme;
		$scope.onThemeActive();
	};
}])


.controller("HeadCtrl", ["$scope", "Fullscreen", "localStorageService", "$window", function($scope, Fullscreen, localStorageService, $window) {
	$scope.toggleFloatingSidebar = function() {
		$scope.floatingSidebar = $scope.floatingSidebar ? false : true;
		console.log("floating-sidebar: " + $scope.floatingSidebar);
	};

	$scope.goFullScreen = function() {
		if (Fullscreen.isEnabled())
        	Fullscreen.cancel();
      	else
         	Fullscreen.all()
	};

    $scope.logOut = function () {
        localStorageService.clearAll();
        if (!localStorageService.get('user_data'))
            $window.location.href = 'login.html';
    };
}])

.controller("NavCtrl", ["$scope", "localStorageService", function($scope, localStorageService) {
    var user_data = localStorageService.get('user_data');
    var type = user_data.type == 'admin' ? 'Administrador' : 'Usuario'

    $scope.user = {
        'name': user_data.name,
        'type': type
    };
}])

/// ==== Dashboard Controller
.controller("DashboardCtrl", ["$scope", 'localStorageService', 'WS_URL', '$http', function($scope, localStorageService, WS_URL, $http) {
    $scope.user_data = localStorageService.get('user_data');
    $scope.show_user = 0;
    $scope.show_admin = 0;
    $scope.data_user = {
        total_sales_month: 0,
        total_sales_day: 0,
        total_products: 0,
        total_salesman: 0
    };
    $scope.data_admin = {
        total_companies: 0,
        total_users: 0,
        total_customers: 0
    };

    if ($scope.user_data.type === 'admin') {
        $scope.show_user = 0;
        $scope.show_admin = 1;
	} else {
        $scope.show_user = 1;
        $scope.show_admin = 0;
	}

    $http({
        method: 'GET',
        url:    WS_URL+'dashboard/data',
        params: {company_id: $scope.user_data.company_id}
    }).then(function successCallback(response) {
        $scope.data_user = response.data.records.data_user;
        $scope.data_admin = response.data.records.data_admin;
    }, function errorCallback(response) {

    });
}])

// #end
})();