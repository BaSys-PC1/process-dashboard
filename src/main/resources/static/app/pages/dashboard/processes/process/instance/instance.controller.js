'use strict';

(function () {
    'use strict';

    angular.module('App.pages.dashboard.processes.process.instance').controller('DashboardProcessesProcessInstanceController',
        DashboardProcessesProcessInstanceController);

    function DashboardProcessesProcessInstanceController($scope, $q, $interval, $stateParams, CamundaService) {

        var updateIntervalMillis = 1000;
        var updateInterval = null;
        var diagramUpdateInterval = null;
        var isFirstUpdate = true;
        var diagramLoaded = false;

        this.auditlog = [];

        this.processDefinition = null;
        this.processInstance = null;

        this.processDefinitionID = $stateParams.processID;
        this.instanceID = $stateParams.instanceID;

        this.showLeftDetails = true;

        var updateInterval = $interval(() => {

            CamundaService.getProcessInstance({processInstanceId: this.instanceID}).then(pi => {

                this.processInstance = pi[0];

                CamundaService.getProcessDefinition(this.processInstance.processDefinitionId).then(p => {
                    this.processDefinition = p;
                });

                //first time loaded?
                if (isFirstUpdate) {
                    loadDiagram(this.processInstance.processDefinitionId, this.processInstance.id);
                    isFirstUpdate = false;
                }
            });


            //update audit log
            $q.all([
                CamundaService.getActivityInstance({
                    processDefinitionId: this.processDefinitionID,
                    processInstanceId: this.instanceID,
                    sortBy: 'startTime',
                    sortOrder: 'asc'
                }),
                CamundaService.getIncident({
                    processDefinitionId: this.processDefinitionID,
                    processInstanceId: this.instanceID,
                    finished: false,
                    unfinished: true
                })]).then(results => {

                let activityInstances = results[0];
                let incidents = results[1];

                activityInstances.forEach(aa => {
                    var index = this.auditlog.findIndex(o => {
                        return o.id == aa.id;
                    });

                    if (index > -1) {
                        aa._referenceTime = this.auditlog[index]._referenceTime;
                    }
                });

                activityInstances.forEach(_a => {
                    _a._startTime = moment(_a.startTime, moment.ISO_8601).format('YYYY/MM/DD HH:mm:ss');
                    _a._endTime = _a.endTime ? moment(_a.endTime, moment.ISO_8601).format('YYYY/MM/DD HH:mm:ss') : null;
                    _a._duration = _a.durationInMillis != null ? moment.utc(_a.durationInMillis).format("HH:mm:ss") : null;

                    CamundaService.getHistoryVariableInstance({
                        processInstanceIdIn: this.instanceID,
                        activityInstanceIdIn: _a.id
                    }).then(vars => {
                        var v = vars.find(v => v.name == "referenceTime");
                        _a._referenceTime = v ? v.value : null;
                    });
                });

                incidents.forEach(_incident => {
                    _incident._startTime = moment(_incident.createTime, moment.ISO_8601).format('YYYY/MM/DD HH:mm:ss');

                    _incident.activity = activityInstances.find(activity => activity.activityId === _incident.activityId);
                });

                this.auditlog = activityInstances;
                this.incidents = incidents;
            });

            //update variables
            CamundaService.getVariableInstance({
                processInstanceIdIn: this.instanceID
            }).then(v => {
                this.variables = v;
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

        //get process xml
        function loadDiagram(pdID, processInstanceID) {
            CamundaService.getProcessDefinitionXML(pdID).then(xml => {
                var BpmnViewer = window.BpmnJS;

                var viewer = new BpmnViewer({container: '#diagram-container'});

                viewer.importXML(xml.bpmn20Xml, function (err) {

                    if (err) {
                        console.log('error rendering', err);
                    } else {
                        console.log('rendered');
                        diagramLoaded = true;

                        var canvas = viewer.get('canvas');
                        // zoom to fit full viewport
                        canvas.zoom('fit-viewport');

                        diagramUpdateInterval = $interval(() => {
                            updateDiagram(pdID, processInstanceID, viewer);
                        }, 500);
                    }
                });
            });

            var overlaysArr = [];

            function updateDiagram(pdID, processInstanceID, viewer) {
                $q.all([
                    CamundaService.getActivityInstance({
                        processDefinitionId: pdID,
                        processInstanceId: processInstanceID,
                        finished: false,
                        unfinished: true
                    }),
                    CamundaService.getIncident({
                        processDefinitionId: pdID,
                        processInstanceId: processInstanceID,
                        finished: false,
                        unfinished: true
                    })]).then(results => {
                    if (diagramLoaded) {
                        var overlays = viewer.get('overlays');

                        let a = results[0];
                        let incidents = results[1];

                        overlaysArr.forEach(o => {
                            overlays.remove(o);
                        });

                        a.forEach(ca => {
                            var oID = overlays.add(ca.activityId, {
                                position: {
                                    bottom: 0,
                                    left: 0
                                },
                                html: '<div class="badge blue-background">1</div>'
                            });
                            overlaysArr.push(oID);
                        });

                        incidents.forEach(ca => {
                            var oID = overlays.add(ca.activityId, {
                                position: {
                                    bottom: 0,
                                    left: 30
                                },
                                html: '<div class="badge red-background">1</div>'
                            });
                            overlaysArr.push(oID);
                        });
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