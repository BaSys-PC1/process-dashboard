(function () {
    'use strict';

    angular.module('App.services').config(config);

    function config(apiProvider) {

        apiProvider.setBaseUrl('/api/rest');

        // register REST api
        apiProvider.register('camunda.process-definition.count', ['/process-definition/count']);
        apiProvider.register('camunda.process-definition:id.start', ['/process-definition/:id/start', {id: '@id'}]);

        apiProvider.register('camunda.decision-definition.count', ['/decision-definition/count']);
        apiProvider.register('camunda.case-definition.count', ['/case-definition/count']);
        apiProvider.register('camunda.deployment.count', ['/deployment/count']);
        apiProvider.register('camunda.process-instance.count', ['/process-instance/count']);

        apiProvider.register('camunda.process-definition', ['/process-definition']);
        apiProvider.register('camunda.process-instance', ['/history/process-instance']);
        apiProvider.register('camunda.process-instance:id', ['/process-instance/:id', {id: '@id'}]);
        apiProvider.register('camunda.process-definition:id', ['/process-definition/:id', {id: '@id'}]);
        apiProvider.register('camunda.process-definition:id.xml', ['/process-definition/:id/xml', {id: '@id'}]);

        apiProvider.register('camunda.variable-instance', ['/variable-instance']);
        apiProvider.register('camunda.history-variable-instance', ['/history/variable-instance']);

        apiProvider.register('camunda.process-instance:id.activity-instances', ['/process-instance/:id/activity-instances', {id: '@id'}]);
        apiProvider.register('camunda.activity-instance', ['/history/activity-instance']);
        apiProvider.register('camunda.incident', ['/history/incident']);

        // events
        apiProvider.register('events', ['/events']);
        apiProvider.register('events.process-instance:id', ['/events/process-instance/:id', {id: '@id'}]);
    }
})();
