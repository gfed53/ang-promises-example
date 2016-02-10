var myModule = angular.module('myApp', []);
myModule.controller('PromiseExampleCtrl', function($scope, $http, $q, $timeout){
	function wait(){
		var defer = $q.defer();

		$timeout(function(){
			defer.resolve();
		}, 2000);

		console.log(defer.promise);
		console.log(defer);
		return defer.promise;
		
	}

	$scope.saveSettings = function(valid){
		var url = valid ? '/api/update_password' : '/broken-api/update_password';
		$http.put(url, $scope.data)
		.success(function(){
			notify();
		})
		.error(function(){
			$scope.error = true;
			notify().then(function(){
				$scope.error = false;
			});
		});

		function notify() {
			$scope.notifySaved = true;
			return wait().then(function(){
				notifySaved = false;
			});
		}
	};
});

//Ignore
angular.module("myApp").config(["$provide",function(a){a.decorator("$http",["$delegate","$timeout",function(a,b){return a.put=function(a){var c,d,e={success:function(a){return c=a,this},error:function(a){return d=a,this}};return b(function(){a.indexOf("broken")>=1?d():c()},3e3),e},a}])}]);