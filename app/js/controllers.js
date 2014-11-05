'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController',[function(){

  }])
  .controller('TodoListController',['$scope','$firebase', 'FIREBASE_URL', function($scope, $firebase, FIREBASE_URL){
      
      var taskRef = new Firebase(FIREBASE_URL);
      $scope.taskList = $firebase(taskRef);

        function dateDiffInDays(a, b) {
            var _MS_PER_DAY = 1000 * 60 * 60 * 24;
            // Discard the time and time-zone information.
            var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }
        // Calculate how many days between now and an event...
        $scope.daysTill = function(e) {
            var eventE = new Date(e);
            var today =  new Date();
            return dateDiffInDays(today, eventE);
        };

        $scope.hideTask = function(e){
          return ($scope.daysTill(e) <= 0 ) ? true: false;
        };

         var createEndDate = function(){
           var expirydate = new Date();
          expirydate.setDate(expirydate.getDate() + 7);
          var endDate = (expirydate.getMonth()+1) + '/' + expirydate.getDate() + '/' + expirydate.getFullYear();
          return endDate; 
        }
        
        var endDate = createEndDate();
        $scope.newTask = {taskname:'', done:false, edate: endDate };
        $scope.saveTask =  function(){
         $scope.taskList.$add($scope.newTask);
         $scope.newTask = {taskname:'', done:false, edate: endDate };
        };

        $scope.sendToBoard = function(task){
           var newEndDate = createEndDate();
           task.edate = newEndDate;
           $scope.taskList.$save(task.$id);
        };

      

  }])
  .controller('AuthController',['$scope', 'authService', function($scope, authService){  

    // Object bound to inputs on the register and login pages 
    $scope.user = {email:'', password:''};

    //Method to register a new user using the authService.
      $scope.register = function(){
         authService.register($scope.user);
       }; 
     // Method to log in a user using the authService.
     $scope.login = function(){
       authService.login($scope.user);
      };
    //Method to log out a user using the authService. 
     $scope.logout = function(){
      authService.logout();
     };

  }]); 

 