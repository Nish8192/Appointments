app.controller('usersController', ['appointmentsFactory','$scope','$location','$routeParams',"$cookies", function(appointmentsFactory, $scope, $location, $routeParams, $cookies) {

    $scope.newUser = {};
    $scope.errors = {};
    var index = function(){
        $cookies.remove("user_id")
        $cookies.remove("user_name")
    }
    index();
    $scope.login = function(){
        appointmentsFactory.enter($scope.newUser, function(data){
            console.log(data);
            if(data.errors){
                $scope.errors = data.errors;
                $location.url("/")
            }
            else{
                $cookies.put("user_id", data._id)
                $cookies.put("user_name", data.name)
                $location.url("/appointments")
            }
            $scope.newUser = {};
        })
    }

}]);
