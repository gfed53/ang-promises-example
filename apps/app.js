// Code goes here

angular.module('PromisesApp', [])
.controller('PromisesExampleCtrl', ['$scope', '$timeout', '$q', '$http', function($scope, $timeout, $q, $http) {
	function wait() {
		return $q(function(resolve, reject){
		  $timeout(function() {
			  resolve();
      }, 2000);
		});
	}
    
  function notify() {
    $scope.notifySaved = true;
    return wait().then(function() {
     $scope.notifySaved = false; 
    });
  }

  $scope.saveSettings = function(valid) {
    var url = valid ? '/api/update_password' : '/broken-api/update_password';
		$http.put(url, $scope.data)
    .success(function() {
      notify();
    })
    .error(function() {
      $scope.error = true;
      notify().then(function() {
        $scope.error = false;
      });
    });
	};
}]);

//Ignore
angular.module("PromisesApp").config(["$provide",function(a){a.decorator("$http",["$delegate","$timeout",function(a,b){return a.put=function(a){var c,d,e={success:function(a){return c=a,this},error:function(a){return d=a,this}};return b(function(){a.indexOf("broken")>=1?d():c()},3e3),e},a}])}]);