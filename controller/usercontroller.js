var usermodel = require('../model/usermodel');
var taskmodel = require('../model/taskmodel');
const storage = require('node-persist');
storage.init( /* options ... */ );

//USER LOGIN
exports.login = async (req, res, next) => {
    var user_login_status =await storage.getItem('user_id');
    var data = await usermodel.find({ "email": req.body.email });

    if (user_login_status == undefined) {
        if (data.length == 1) {
            await storage.setItem('user_id', data[0].id);
            res.status(200).json({
                status: "User Login Success"
            })
        }
        else {
            res.status(200).json({
                status: "Check email or password"
            })
        }
    }
    else {
        res.status(200).json({
            status: "User already logged in"
        })
    }
}

//USER LOGOUT
exports.logout = async (req, res, next) => {
    storage.clear();
    res.status(200).json({
        status: "Logout"
    })
}

//UPDATE TASK
exports.update_task = async (req, res, next) => {
    var user_login_status = await storage.getItem('user_id');
    if(user_login_status != undefined){
        var id = req.params.id;
        var data = await taskmodel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: "Task updated"
        })
    }
    else{
        res.status(200).json({
            status:"User is not login"
        })
    }
}

//VIEW TASK
exports.view_task = async (req, res, next) => {
    var user_login_status = await storage.getItem('user_id');
    if (user_login_status != undefined) {
        var data = await usermodel.find({ "email": req.body.email });
        if (data.length == 1) {
            var get_task = await taskmodel.find({ "username": data[0].name });
            if (get_task.length > 0) {
                res.status(200).json({
                    get_task
                })
            }
            else {
                res.status(200).json({
                    status: "User has not any assigned tasks"
                })
            }
        }
        else {
            res.status(200).json({
                status: "Check email and password"
            })
        }
    }
    else{
        res.status(200).json({
            status:"User is not login"
        })
    }
}