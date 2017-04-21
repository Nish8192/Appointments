var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	name: {type: String, required: "You must provide a name!"},
	appointments: [{type: Schema.Types.ObjectId, ref: "Appointment"}],
},{timestamps:true})

mongoose.model('User', UserSchema);
