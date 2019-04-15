'use strict';

(function () {
    'use strict';
    
	angular.module('App.pages.dashboard.processes.process.instance')
	.config(routeConfig);

	function routeConfig($stateProvider) {
	    $stateProvider.state('home.dashboard.processes.process.instance', {
	        url: '/instance/:instanceID',
	        views  : {
                'content@home.dashboard': {
                	templateUrl: '/app/pages/dashboard/processes/process/instance/instance.html',
        	        controller: 'DashboardProcessesProcessInstanceController',
        	        controllerAs: 'ctrl'
                }
            },
            ncyBreadcrumb: {
            	parent: 'home.dashboard.processes.process({processID: ctrl.processDefinitionID})',
                label: '{{ctrl.instanceID}}'
            }
	    });
	}
		
})();