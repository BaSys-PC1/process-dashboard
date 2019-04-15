(function () {
    'use strict';

    angular
        .module('App.services')
        .factory('CamundaService', service);

    /** @ngInject */
    function service(api) {
        function getProcessDefinitionCount(params) {
            return api.resolve('camunda.process-definition.count@get', params).then((data) => {
                return data.count;
            });
        }

        function getProcessDefinitions(params) {
            return api.resolve('camunda.process-definition@query', params).then((data) => {
                return data;
            });
        }

        function getProcessDefinition(id) {
            return api.resolve('camunda.process-definition:id@get', {id: id}).then((data) => {
                return data;
            });
        }

        function getProcessDefinitionXML(id) {
            return api.resolve('camunda.process-definition:id.xml@get', {id: id}).then((data) => {
                return data;
            });
        }

        function getProcessInstance(params) {
            return api.resolve('camunda.process-instance@query', params).then((data) => {
                return data;
            });
        }

        function getProcessInstancesCount(params) {
            return api.resolve('camunda.process-instance.count@get', params).then((data) => {
                return data.count;
            });
        }

        function getActivityInstance(params) {
            return api.resolve('camunda.activity-instance@query', params).then((data) => {
                return data;
            });
        }

        function getIncident(params) {
            return api.resolve('camunda.incident@query', params).then((data) => {
                return data;
            });
        }

        function getDecisionDefinitionCount() {
            return api.resolve('camunda.decision-definition.count@get').then((data) => {
                return data.count;
            });
        }

        function getCaseDefinitionCount() {
            return api.resolve('camunda.case-definition.count@get').then((data) => {
                return data.count;
            });
        }

        function getDeploymentCount() {
            return api.resolve('camunda.deployment.count@get').then((data) => {
                return data.count;
            });
        }

        //Variables
        function getVariableInstance(params) {
            return api.resolve('camunda.variable-instance@query', params).then((data) =>
                data
            );
        }

        function getHistoryVariableInstance(params) {
            return api.resolve('camunda.history-variable-instance@query', params).then((data) => {
                return data;
            });
        }

        //----------------


        function startProcessInstance(definitionId, options) {
            var args = {
                id: definitionId
            };
            angular.merge(args, options);

            return api.resolve('camunda.process-definition:id.start@save', args);
        }

        function deleteProcessInstance(instanceID) {
            return api.resolve('camunda.process-instance:id@delete', {id: instanceID});
        }

        var service = {
            getProcessDefinitionCount: getProcessDefinitionCount,
            getDecisionDefinitionCount: getDecisionDefinitionCount,
            getCaseDefinitionCount: getCaseDefinitionCount,
            getDeploymentCount: getDeploymentCount,
            getProcessInstancesCount: getProcessInstancesCount,
            getProcessDefinitions: getProcessDefinitions,
            getProcessDefinition: getProcessDefinition,
            getProcessDefinitionXML: getProcessDefinitionXML,
            getProcessInstance: getProcessInstance,
            getActivityInstance: getActivityInstance,
            getIncident: getIncident,
            getVariableInstance: getVariableInstance,
            getHistoryVariableInstance: getHistoryVariableInstance,
            startProcessInstance: startProcessInstance,
            deleteProcessInstance: deleteProcessInstance
        };

        return service;
    }

})();