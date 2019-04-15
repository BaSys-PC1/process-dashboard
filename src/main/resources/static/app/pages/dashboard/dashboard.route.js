'use strict';

(function () {
    'use strict';
    
	angular.module('App.pages.dashboard')
	.config(routeConfig);

	function routeConfig($stateProvider) {
	    $stateProvider.state('home.dashboard', {
	        url: '/dashboard',
	        views  : {
                'main@home': {
                	templateUrl: '/app/pages/dashboard/dashboard.html',
                	controller: 'DashboardController',
        	        controllerAs: 'ctrl',
                }
            },
	        abstract: true
	    });
	}
		
})();