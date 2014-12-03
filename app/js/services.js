'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.value('FIREBASE_URL', 'https://todolist-archana.firebaseio.com/')
.factory('dataService', function($firebase, FIREBASE_URL){
      var dataRef = new Firebase(FIREBASE_URL);
      var fireData = $firebase(dataRef);

      return fireData;
})
.factory('taskService', function(dataService){

    //var taskList = dataService.$child('taskList');
    var users = dataService.$child('users');

    var taskServiceObject = {
         //taskList: taskList,
         saveTask: function(task, userId){
          users.$child(userId).$child('taskList').$add(task);        
         },
         getTaskListByUserId: function(userId){
          return users.$child(userId).$child('taskList');

         }
    };

    return taskServiceObject;
})
.factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService){

	var authRef = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(authRef);
  var emails = dataService.$child('emails');

	   var authServiceObject = {
	   	   register: function(user){
	   	   	auth.$createUser(user.email, user.password).then(function(data){
               console.log(data);
               emails.$add({email: user.email});
               authServiceObject.login(user);
	   	   	});
	   	   }, 
	       login: function(user){
           auth.$login('password', user).then(function(data){
           console.log(data);
           $location.path('/todolist');
       });
    },
    logout: function(){
    	auth.$logout();
    	$location.path('/');
    },
    getCurrentUser: function(){
      return auth.$getCurrentUser();
    }
   };	 
   
   $rootScope.$on("$firebaseSimpleLogin:login", function(e,user){
              $rootScope.currentUser = user;
   });
   
   $rootScope.$on("$firebaseSimpleLogin:logout", function(){
              $rootScope.currentUser = null;

   });

   return authServiceObject;
});


