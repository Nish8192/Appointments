var mongoose = require('mongoose');
var User = mongoose.model('User')
var Appointment = mongoose.model('Appointment')

module.exports = {
    index: function(req, res){
        Appointment.find({})
        .populate("_user")
        .exec(function(err, appointments){
            if(err){return res.json(err);}
            else {
                return res.json(appointments);
            }
        })
    },
    create: function(req, res){
        Appointment.find({date: req.body.date}, function(err, appointments){
            if(err){return res.json(err)}
            if(appointments.length >= 3){
                return res.json({errors: {errors: {message: "Doctor is full for the day!!"}}})
            }
            else{
                Appointment.findOne({date: req.body.date, _user: req.body._user}, function(err, existAppointment){
                    if(err){return res.json(err);}
                    if(existAppointment)
                    {
                        return res.json({errors: {errors: {message: "You already have an appointment on that day!!"}}})
                    }
                    else{
                        Appointment.create(req.body, function(err, appointment){
                            if(err){return res.json(err);}
                            else {
                                return res.json(appointment);
                            }
                        })
                    }
                })
            }
        })
    },
    destroy: function(req, res){
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
        today = mm+'/'+dd+'/'+yyyy;
        console.log(req.params.id);
        Appointment.findOne({_id: req.params.id}, function(err, appointment){
            if(err){return res.json(err)}
            if((appointment.date-today)<1){
                return res.json({errors: {errors: {message: "Sorry, it's too late to delete your appointment :("}}})
            }
            else{
                Appointment.remove({_id: req.params.id}, function(err, appointment){
                    if(err){return res.json(err);}
                    else {
                        return res.json(appointment);
                    }
                })
            }
        })
    }
}
