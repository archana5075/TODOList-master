'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController',[function(){


  }])
  .controller('TodoListController',['$scope','$firebase', function($scope, $firebase){
  	 
      
      var taskRef = new Firebase('https://todolist-archana.firebaseio.com/');
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


        var expirydate = new Date();
        expirydate.setDate(expirydate.getDate() + 7);
       
        var endDate = (expirydate.getMonth()+1) + '/' + expirydate.getDate() + '/' + expirydate.getFullYear();
     
        $scope.newTask = {taskname:'', done:false, edate: endDate };
        $scope.saveTask =  function(){
         $scope.taskList.$add($scope.newTask);
         $scope.newTask = {taskname:'', done:false, edate: endDate };
        };

  }]);
 