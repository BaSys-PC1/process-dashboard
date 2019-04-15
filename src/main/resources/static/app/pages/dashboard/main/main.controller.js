'use strict';

(function () {
    'use strict';

    angular.module('App.pages.dashboard.main').controller('DashboardMainController',
        DashboardMainController);

    function DashboardMainController($scope, $interval, CamundaService) {

        var updateIntervalMillis = 1000;
        var updateInterval = null;

        this.processDefinitionsCount = 0;
        this.decisionDefinitionsCount = 0;
        this.caseDefinitionsCount = 0;
        this.deploymentsCount = 0;

        var updateInterval = $interval(() => {

            CamundaService.getProcessDefinitionCount({
                "latestVersion": true
            }).then(c => {
                this.processDefinitionsCount = c;
            });
            CamundaService.getDecisionDefinitionCount().then(c => {
                this.decisionDefinitionsCount = c;
            });
            CamundaService.getCaseDefinitionCount().then(c => {
                this.caseDefinitionsCount = c;
            });
            CamundaService.getDeploymentCount().then(c => {
                this.deploymentsCount = c;
            });
        }, updateIntervalMillis);

        $scope.$on('$destroy', () => {
            if (angular.isDefined(updateInterval)) {
                $interval.cancel(updateInterval);
                updateInterval = undefined;
            }
        });

    }

})();