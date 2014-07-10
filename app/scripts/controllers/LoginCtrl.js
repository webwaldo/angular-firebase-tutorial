(function (angular) {
	angular.module('firebaseApp')
	.controller('LoginCtrl', function ($scope,$firebaseSimpleLogin, FBURL, $window, $rootScope){
		var fbRef = new Firebase(FBURL);
		$scope.simpleLogin = $firebaseSimpleLogin(fbRef);

		$scope.user = {
			email: '',
			password: ''
		};

		$scope.login = function(){

			var errors = [],
				user = $scope.user;

			$scope.errors = errors;

			if ( user.email === ''){
				errors.push('Please enter an email');
			}
			if ( user.password === ''){
				errors.push('Password must not be blank');
			}

			if ( errors.length > 0 ){
				$scope.errors = errors;
				return;
			}
			
			var promise = $scope.simpleLogin.$login('password', {
				email: user.email,
				password: user.password
			});

			promise.then(function(user) {
				$rootScope.user = user; // adds user to the parent most scope, so all child scopes have access!
				$window.location.href = '/#/main';
			}, function(error){
				if( error.code === 'INVALID_EMAIL'){
					$scope.errors.push('Invalid Email');
				}
				if( error.code === 'INVALID_PASSWORD'){
					$scope.errors.push('Invalid Password');
				}
				console.log(error);
			});


		};

	});
}(window.angular));