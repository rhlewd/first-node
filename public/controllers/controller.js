var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello from controller");

    function refresh() {
        $http.get('/contactlist').success(function(response) {
            $scope.contactlist = response;
        });
        $scope.contact = {};
    };
    refresh();

    $scope.addContact = function() {
        $http.post('/contactlist', $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id){
      console.log(id);
      $http.delete('/contactlist/' + id).success(function(response){
        console.log(response);
        refresh();
      });
    };

    $scope.edit = function(id){
      console.log(id);
      $http.get('/contactlist/' + id).success(function(response){
        console.log(response);
        $scope.contact = response;
      });
    };

    $scope.update = function(id){
      $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
        refresh();
      });
    };

    $scope.deselect = function(){
        $scope.contact = "";
    };
}]);
