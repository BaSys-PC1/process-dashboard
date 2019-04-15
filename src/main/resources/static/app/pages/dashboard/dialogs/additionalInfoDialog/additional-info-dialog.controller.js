'use strict';

(function () {
    'use strict';
    
	angular.module('App.pages.dashboard').controller('DashboardDialogAdditionalInfoController',
			DashboardDialogAdditionalInfoController);
	
	function DashboardDialogAdditionalInfoController($scope, $mdDialog) {
		
		$scope.businessKey = '';

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	    $scope.create = function() {
	      $mdDialog.hide({
	    	  businessKey : $scope.businessKey
	      });
	    };
		
	}

})();