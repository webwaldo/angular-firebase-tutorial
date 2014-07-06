/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {

    var rootRef = new Firebase('https://brookyy.firebaseio.com/');
    var messagesRef = rootRef.child('messages');
    var titleRef = rootRef.child('title');

    $scope.title = null;
    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];

    titleRef.once('value', function(snapshot){
      $scope.title = snapshot.val();
    });

    messagesRef.on('child_added', function(snapshot) {
      $timeout( function() {
        console.log(messagesRef);
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        $scope.messages.push({
          text: snapshotVal.text,
          user: snapshotVal.user,
          name: snapshot.name()
        });
      });
    });

    messagesRef.on('child_changed', function(snapshot) {
      $timeout( function() {
        console.log(messagesRef);
        var snapshotVal = snapshot.val();
        var message = findMessageByName(snapshot.name() );
        message.text = snapshotVal.text;
        message.user = snapshotVal.user;
      });
    });

    messagesRef.on('child_removed', function(snapshot) {
      $timeout( function() {
        deleteMessageByName(snapshot.name() );
      });
    });

    function deleteMessageByName(name){
      for(var i=0; i < $scope.messages.length; i++ ){
        var currentMessage = $scope.messages[i];
        if( currentMessage.name === name){
          $scope.messages.splice(i,1);
          break;
        }
      }
    }

    function findMessageByName(name){
      var messageFound = null;
      for(var i=0; i < $scope.messages.length; i++ ){
        var currentMessage = $scope.messages[i];
        if( currentMessage.name === name){
          messageFound = currentMessage;
          break;
        }
      }
      return messageFound;
    }

    $scope.sendMessage = function(){
      console.log('send dat message');
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      messagesRef.push(newMessage);
    };

    $scope.turnFeedOff = function(){
      messagesRef.off();
    };

  });
