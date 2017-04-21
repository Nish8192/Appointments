app.factory('appointmentsFactory', ['$http', function($http) {

  var factory = {};

  factory.enter = function(user, callback){
      $http.post("/users", user)
      .then(function(returned_data){
          if(typeof(callback) == "function"){
              callback(returned_data.data);
          }
      })
  }
  factory.getAppointments = function(callback){
      $http.get("/appointments")
      .then(function(returned_data){
          if(typeof(callback) == "function"){
              callback(returned_data.data)
          }
      })
  }
  factory.addAppointment = function(newAppointment, callback){
      $http.post("/appointments", newAppointment)
      .then(function(returned_data){
          if(typeof(callback) == "function"){
              callback(returned_data.data)
          }
      })
  }
  factory.deleteAppointment = function(id, callback){
      console.log(id);
      $http.delete("/appointments/" + id)
      .then(function(returned_data){
          if(typeof(callback) == "function"){
              callback(returned_data.data)
          }
      })
  }

  return factory;
}]);
