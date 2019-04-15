'use strict';

(function () {
    'use strict';

    angular.module('App.pages.dashboard').controller('DashboardController',
        DashboardController);

    function DashboardController($scope, $q, $mdDialog) {


        this.showAdditionalInfo = ($event) => {
            $mdDialog.show({
                controller: 'DashboardDialogAdditionalInfoController',
                templateUrl: '/app/pages/dashboard/dialogs/additionalInfoDialog/additional-info-dialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
            })
                .then(function (answer) {

                }, function () {

                });
        }

    }

})();