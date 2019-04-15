'use strict';

(function () {
    'use strict';
    
	angular.module('App.pages.dashboard.processes')
	.config(routeConfig);

	function routeConfig($stateProvider) {
	    $stateProvider.state('home.dashboard.processes', {
	        url: '/processes',
	        views  : {
                'content@home.dashboard': {
                	 templateUrl: '/app/pages/dashboard/processes/processes.html',
         	         controller: 'DashboardProcessesController',
         	         controllerAs: 'ctrl'
                }
            },
            ncyBreadcrumb: {
                label: 'Processes',
                parent : 'home.dashboard.main'
            }
	    });
	}
		
})();