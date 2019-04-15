'use strict';

(function () {
    'use strict';

    angular.module('App.pages.dashboard.processes').controller('DashboardProcessesController',
        DashboardProcessesController);

    function DashboardProcessesController($scope, $interval, CamundaService) {

        var updateIntervalMillis = 1000;
        var updateInterval = null;

        this.processDefinitions = [];

        var updateInterval = $interval(() => {

            CamundaService.getProcessDefinitions().then(p => {

                p.forEach(pp => {
                    var index = this.processDefinitions.findIndex(o => {
                        return o.id == pp.id;
                    });

                    if (index > -1) {
                        pp.instances = this.processDefinitions[index].instances;
                    }
                });

                p.forEach(pp => {
                    CamundaService.getProcessInstancesCount({
                        processDefinitionKey: pp.key
                    }).then(pic => {
                        pp.instances = pic;
                    });
                });

                this.processDefinitions = p;

                // group by key and tenantId, sort by version
                this.groupedprocessDefinitions = _.chain(this.processDefinitions)
                    .orderBy(["version"], ["desc"])
                    .groupBy("key")
                    .map(definitions => _.chain(definitions).groupBy("tenantId").map(definitions => definitions[0]).value())
                    .flatten()
                    .value();

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