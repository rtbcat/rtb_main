function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function() {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
angular.module('App', []);
angular.module('App').factory('Branding', function() {
    var Branding = {
        brand_name: 'Fit Mom'
    };
    return Branding;
}).controller("MainCtrl", function(Branding, $rootScope, $scope, $sce) {
    $scope.b = Branding;
    var redir = {};
    $scope.country = '';
    loadScript('https://j.maxmind.com/app/geoip.js', function() {
        var x = geoip_country_name();
        if (x)
            $scope.country = x;
        $scope.$apply();
    });
    $scope.step1 = $sce.trustAsResourceUrl($scope.step1);
    $scope.step2 = $sce.trustAsResourceUrl($scope.step2);
    $scope.dateNew = function(dateVar) {
        var newDate = new Date();
        return newDate.setDate(newDate.getDate() + dateVar);
    }
    $scope.countryName = function() {
        return geoip_country_name();
    }
});
