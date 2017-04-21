var mongoose = require('mongoose');
var User = mongoose.model('User')

module.exports = {
    create: function(req, res){
        User.findOne({name: req.body.name}, function(err, user){
            if(err){res.json(err);}
            if(!user){
                User.create(req.body, function(err, user){
                    if(err){res.json(err);}
                    res.json(user);
                })
            }
            else{
                res.json(user);
            }
        })
    }
}
