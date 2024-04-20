var mongoose = require('mongoose');
var taskschmea = new mongoose.Schema({
    taskname:{
        type:String
    },
    username:{
        type:String
    },
    sta:{
        type:String,
        default:"pending"
    },
});

module.exports = mongoose.model('taks',taskschmea);