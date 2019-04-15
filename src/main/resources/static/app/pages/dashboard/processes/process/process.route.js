'use strict';

(function () {
    'use strict';
    
	angular.module('App.pages.dashboard.processes.process')
	.config(routeConfig);

	function routeConfig($stateProvider) {
	    $stateProvider.state('home.dashboard.processes.process', {
	        url: '/:processID',
	        views  : {
                'content@home.dashboard': {
                	templateUrl: '/app/pages/dashboard/processes/process/process.html',
        	        controller: 'DashboardProcessesProcessController',
        	        controllerAs: 'ctrl'
                }
            },
            ncyBreadcrumb: {
                label: 'Process Definition'
            }
	    });
	}
		
})();