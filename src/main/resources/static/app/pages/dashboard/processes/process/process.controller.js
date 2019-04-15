'use strict';

(function () {
    'use strict';

    angular.module('App.pages.dashboard.processes.process').controller('DashboardProcessesProcessController',
        DashboardProcessesProcessController);

    function DashboardProcessesProcessController($scope, $q, $state, $interval, $stateParams, $mdDialog, CamundaService) {

        var updateIntervalMillis = 1000;
        var updateInterval = null;
        var diagramUpdateInterval = null;
        var isFirstUpdate = true;
        var diagramLoaded = false;

        this.processDefinition = null;
        this.processInstances = [];

        this.processID = $stateParams.processID;

        this.showLeftDetails = true;

        this.versions = [];
        this.currentVersionID = null;

        var updateInterval = $interval(() => {

            CamundaService.getProcessDefinition(this.processID).then(p => {

                if (!this.currentVersionID) {
                    this.currentVersionID = p.id;
                }

                CamundaService.getProcessInstancesCount({
                    processDefinitionKey: p.key
                }).then(pic => {
                    this.processDefinition.instances = pic;
                });

                CamundaService.getProcessInstance({
                    processDefinitionId: p.id
                }).then(pi => {
                    this.processInstances = pi;
                    //first time loaded?
                    if (isFirstUpdate) {
                        loadDiagram(this.processDefinition, this.processInstances);
                        isFirstUpdate = false;
                    }
                });

                CamundaService.getProcessDefinitions({
                    "key": p.key
                }).then(pds => {
                    let versions = [];
                    pds = _.filter(pds, pd => pd.tenantId === p.tenantId);
                    pds.forEach(pd => versions.push(pd));
                    this.versions = versions;
                });

                this.processDefinition = p;
            });

            //update audit log
            CamundaService.getActivityInstance({
                processDefinitionId: this.processID,
                sortBy: 'startTime',
                sortOrder: 'asc'
            }).then(a => {
                a.forEach(_a => {
                    _a._startTime = moment(_a.startTime, moment.ISO_8601).format('YYYY/MM/DD HH:mm:ss');
                    _a._endTime = _a.endTime ? moment(_a.endTime, moment.ISO_8601).format('YYYY/MM/DD HH:mm:ss') : null;
                });
                this.auditlog = a;
            });

        }, updateIntervalMillis);

        $scope.$on('$destroy', () => {
            if (angular.isDefined(updateInterval)) {
                $interval.cancel(updateInterval);
                updateInterval = undefined;
            }
            if (angular.isDefined(diagramUpdateInterval)) {
                $interval.cancel(diagramUpdateInterval);
                diagramUpdateInterval = undefined;
            }
        });

        this.startProcessInstance = ($event) => {

            $mdDialog.show({
                controller: 'DashboardProcessesProcessDialogAddProcessController',
                templateUrl: '/app/pages/dashboard/processes/process/dialogs/addProcessDialog/add-process-dialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
            })
                .then((options) => {
                    CamundaService.startProcessInstance(this.processDefinition.id, options);
                }, () => {

                });
        };

        this.versionChange = () => {
            $state.go('home.dashboard.processes.process',{ processID : this.currentVersionID });
        }

        this.deleteProcessInstance = (processInstance) => {
            CamundaService.deleteProcessInstance(processInstance.id);
        };

        //get process xml
        function loadDiagram(pd, processInstances) {
            CamundaService.getProcessDefinitionXML(pd.id).then(xml => {
                const BpmnViewer = window.BpmnJS;

                const viewer = new BpmnViewer({container: '#diagram-container'});

                viewer.importXML(xml.bpmn20Xml, function (err) {

                    if (err) {
                        console.log('error rendering', err);
                    } else {
                        console.log('rendered');

                        const canvas = viewer.get('canvas');

                        diagramLoaded = true;

                        // zoom to fit full viewport
                        canvas.zoom('fit-viewport');

                        diagramUpdateInterval = $interval(() => {
                            updateDiagram(pd, processInstances, viewer);
                        }, 500);
                    }
                });

            });

            var overlaysArr = [];

            function updateDiagram(pd, processInstances, viewer) {
                var overlays = viewer.get('overlays');

                $q.all([
                    CamundaService.getActivityInstance({
                        processDefinitionId: pd.id,
                        unfinished: true,
                        finished: false
                    }),
                    CamundaService.getIncident({
                        processDefinitionId: pd.id,
                        open: true
                    })]).then(results => {

                    const is = results[0];
                    const incidents = results[1];

                    overlaysArr.forEach(o => {
                        overlays.remove(o);
                    });

                    var activityIdsCount = {};
                    var incidentIdsCount = {};

                    is.forEach(i => {
                        if (!activityIdsCount[i.activityId]) {
                            activityIdsCount[i.activityId] = 0;
                        }
                        activityIdsCount[i.activityId]++;
                    });

                    incidents.forEach(i => {
                        if (!incidentIdsCount[i.activityId]) {
                            incidentIdsCount[i.activityId] = 0;
                        }
                        incidentIdsCount[i.activityId]++;
                    });

                    if (diagramLoaded) {
                        let id;
                        for (id in activityIdsCount) {
                            var count = activityIdsCount[id];
                            var oID = overlays.add(id, {
                                position: {
                                    bottom: 0,
                                    left: 0
                                },
                                html: '<div class="badge blue-background">' + count + '</div>'
                            });
                            overlaysArr.push(oID);
                        }
                        for (id in incidentIdsCount) {
                            var count = incidentIdsCount[id];
                            var oID = overlays.add(id, {
                                position: {
                                    bottom: 0,
                                    left: 30
                                },
                                html: '<div class="badge red-background">' + count + '</div>'
                            });
                            overlaysArr.push(oID);
                        }
                    }
                }).catch(err => {
                    $interval.cancel(diagramUpdateInterval);
                    overlaysArr.forEach(o => {
                        overlays.remove(o);
                    });
                });

            }
        }
    }

})();