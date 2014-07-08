/* Global Firebase */
(function(angular){
	'use strict';
	angular.module('firebaseApp').service('MessageService', function(MSGURL,$q, $firebase) {
		var messagesRef = new Firebase(MSGURL).startAt().limit(10);
		var fireMessage = $firebase(messagesRef);
		return {
			childAdded: function childAdded(cb){ // can be named, helps with debugging
				fireMessage.$on('child_added', function(data){
					var val = data.snapshot.value;
					console.log(data);
					cb.call(this, {
						user: val.user,
						text: val.text,
						name: data.snapshot.name
					});
				});
			},
			add: function addMessage(message){
				return fireMessage.$add(message);
			},
			off: function turnMessagesOff(){
				fireMessage.$off();
			},
			pageNext: function pageNext(name, numberOfItems){
				var deffered = $q.defer();
				var messages = [];
				var pageMessageRef = new Firebase(MSGURL).startAt(null, name).limit(numberOfItems);

				$firebase(pageMessageRef).$on('loaded', function(data){
					console.log(data);
					var keys = Object.keys(data);
					angular.forEach(keys, function(key){
						var item = data[key];
						item.name = key;
						messages.push(item);
					});
					deffered.resolve(messages);
				});

				return deffered.promise;
			},
			pageBack: function pageBack(name, numberOfItems){
				var deffered = $q.defer();
				var messages = [];
				var pageMessageRef = new Firebase(MSGURL).endAt(null, name).limit(numberOfItems);

				$firebase(pageMessageRef).$on('loaded', function(data){
					var keys = Object.keys(data);
					angular.forEach(keys, function(key){
						var item = data[key];
						item.name = key;
						messages.push(item);
					});
					deffered.resolve(messages);
				});

				return deffered.promise;
			}
		};
	});

})(window.angular);