(function (angular) {
	angular.module('firebaseApp')
	.controller('RegisterCtrl', function ($scope, $firebaseSimpleLogin, FBURL, $window, $rootScope) {
		var fbRef = new Firebase(FBURL);
		$scope.erors = [];
		$scope.simpleLogin = $firebaseSimpleLogin(fbRef);
		$scope.registerUser = {
			email: '',
			password: '',
			confirmPassword: ''
		};

		$scope.register = function(){

			var errors = [],
				user = $scope.registerUser;
			if ( user.email === ''){
				errors.push('Please enter an email');
			}
			if ( user.password === ''){
				errors.push('Password must not be blank');
			}
			else if ( user.password !== user.confirmPassword){
				errors.push('Passwords must match');
			}
			if ( errors.length > 0 ){
				$scope.errors = errors;
				return;
			}
			var promise = $scope.simpleLogin.$createUser(user.email, user.password);

			promise.then( function(user) {
				$rootScope.user = user; // adds user to the parent most scope, so all child scopes have access!
				console.log(user);
				$window.location.href = '/#/home';
			}, function(error) {
				console.log(error);
			});
		};

	});
}(window.angular));