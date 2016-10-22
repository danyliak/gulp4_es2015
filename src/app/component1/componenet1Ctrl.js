(function () {
    'use strict';

    angular.module('app.component1')
        .controller('component1Ctrl', Component1Ctrl);


    function Component1Ctrl() {
        var vm = this;
        vm.name = 'Mike22';

    }

})();