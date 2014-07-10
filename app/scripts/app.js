'use strict';

angular.module('firebaseApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'routeSecurity',
  'simpleLoginTools'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/chat',{
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl',
        authReqquired: true
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register',{
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/logout',{
        template: 'Logging Out...',
        controller: 'LogoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FBURL', 'https://brookyy.firebaseio.com/')
  .constant('MSGURL', 'https://brookyy.firebaseio.com/messages')
  .constant('loginRedirectPath','/login');
