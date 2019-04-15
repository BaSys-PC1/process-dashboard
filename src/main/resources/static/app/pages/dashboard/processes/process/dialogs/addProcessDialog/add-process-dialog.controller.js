'use strict';

(function () {
    'use strict';

    angular.module('App.pages.dashboard.processes.process').controller('DashboardProcessesProcessDialogAddProcessController',
        DashboardProcessesProcessDialogAddProcessController);

    function DashboardProcessesProcessDialogAddProcessController($scope, $mdDialog) {

        $scope.businessKey = '';
        $scope.processVariables = [];
        $scope.processVariableTypes = ["boolean", "string", "integer"];

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.create = function () {
            let variables = {};

            $scope.processVariables.forEach(v => {
                variables[v.name] = {
                    value: v.value,
                    type: v.type,
                    valueInfo: {}
                };
            });

            $mdDialog.hide({
                businessKey: $scope.businessKey,
                variables: variables
            });
        };

        $scope.addProcessVariable = ($event) => {
            $scope.processVariables.push({
                name: null,
                type: null,
                value: null
            });
        };

        $scope.processVariableTypeChange = (variable) => {
            if (variable.type === "boolean") {
                variable.value = "true";
            } else if (variable.type === "integer") {
                variable.value = 0;
            } else if (variable.type === "string") {
                variable.value = "";
            }
        };

        $scope.removeProcessVariable = (index) => {
            $scope.processVariables.splice(index, 1);
        };
    }

})();