/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {

    var rootRef = new Firebase('https://brookyy.firebaseio.com/');
    var childRef = rootRef.child('message');
    console.log('root ref', rootRef);
    childRef.on('value', function(snapshot) {
      $timeout( function() {
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        snapshot.forEach( function(item){
          console.log( item.name() + ' - ' + item.val() );
          console.log(item.ref());
        });
        $scope.message = snapshotVal;
      });
    });

    $scope.$watch('message.text', function(newVal){
      console.log(newVal);
      if( !newVal){
        return;
      }
      childRef.update({
        text: newVal
      });
    });

    // https://brookyy.firebaseio.com/message
    $scope.setMessage = function(){
      childRef.set({
        user: 'Bob',
        text: 'Hi'
      });
    };

    $scope.updateMessage = function() {
      childRef.update({
        moo: 'Smith two'
      });
    };

    $scope.deleteMessage = function() {
      childRef.remove();
    };

  });
