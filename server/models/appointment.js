var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var Schema = mongoose.Schema;

var AppointmentSchema = new mongoose.Schema({
	complaint: {type: String, required: "You must provide a complaint!", minlength: [10, "Complaint must be at least 10 characters!"]},
    date: {type: Date, required: "You must provide a date!", validate: validators.isAfter({message: "Must be in the future!"})},
	time:  {type: String, required: "You must provide a time!"},
	_user: {type: Schema.Types.ObjectId, ref: "User"},
},{timestamps:true})


mongoose.model('Appointment', AppointmentSchema);
