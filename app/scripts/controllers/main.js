'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, FBURL) {
    var fbRef = new Firebase(FBURL).child('secret');
    
    fbRef.set(444);

  });
