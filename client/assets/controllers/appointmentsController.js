app.controller('appointmentsController', ['appointmentsFactory','$scope','$location','$routeParams',"$cookies", function(appointmentsFactory, $scope, $location, $routeParams, $cookies) {

    $scope.appointments = {};
    $scope.errors = {};

    var index = function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        today = yyyy+'-'+mm+'-'+dd
        $scope.today = today;
        console.log($scope.today);
        if(!$cookies.get("user_id") || !$cookies.get("user_name")){
            $location.url("/")
        }
        appointmentsFactory.getAppointments(function(data){
            console.log(data);
            if(data.errors){
                $scope.errors = data.errors;
            }
            else{
                $scope.user_name = $cookies.get("user_name")
                $scope.appointments = data;
            }
        })
    }
    index();

    $scope.newAppointment = {};
    $scope.create = function(){
        $scope.newAppointment._user = $cookies.get("user_id");
        appointmentsFactory.addAppointment($scope.newAppointment, function(data){
            console.log(data);
            if(data.errors){
                $scope.errors = data.errors;
            }
            else{
                $location.url("/appointments")
            }
            $scope.newAppointment = {};
        })

    }
    $scope.destroy = function(id){
        console.log(id);
        appointmentsFactory.deleteAppointment(id, function(data){
            if(data.errors){
                $scope.errors = data.errors
            }
            $location.url("/appointments");
            index();
        })
    }
    $scope.logout = function(){
        $cookies.remove("user_name")
        $cookies.remove("user_id")
        $location.url("/")
    }

}]);
