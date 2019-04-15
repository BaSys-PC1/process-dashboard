'use strict';

(function () {
    'use strict';
    
	angular.module('App.pages.dashboard.main')
	.config(routeConfig);

	function routeConfig($stateProvider) {
	    $stateProvider.state('home.dashboard.main', {
	        url: '/main',
	        views  : {
                'content@home.dashboard': {
                	templateUrl: '/app/pages/dashboard/main/main.html',
        	        controller: 'DashboardMainController',
        	        controllerAs: 'ctrl'
                }
            },
            ncyBreadcrumb: {
                label: 'Dashboard'
            }
	    });
	}
		
})();