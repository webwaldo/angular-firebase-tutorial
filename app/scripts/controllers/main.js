/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {

    var rootRef = new Firebase('https://brookyy.firebaseio.com/');
    var messagesRef = rootRef.child('messages');

    $scope.currentUser = null;
    $scope.currentText = null;



    messagesRef.on('value', function(snapshot) {
      $timeout( function() {
        console.log(messagesRef);
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        $scope.messages = snapshotVal;
      });
    });

    $scope.sendMessage = function(){
      console.log('send dat message');
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      messagesRef.push(newMessage);
    };

  });
