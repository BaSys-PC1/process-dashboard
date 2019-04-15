'use strict';

(function () {
    'use strict';
    
	angular.module('App.pages')
	.config(routeConfig);

	function routeConfig($stateProvider, $urlRouterProvider) {
	    $stateProvider.state('home', {
	        url: '',
	        templateUrl: '/app/pages/pages.html',
	        abstract: true,
	    });

	    $urlRouterProvider.otherwise('/dashboard/main');
	}
		
})();