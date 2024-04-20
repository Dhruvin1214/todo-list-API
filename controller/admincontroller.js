var adminmodel = require('../model/adminmodel');
var usermodel = require('../model/usermodel');
var taskmodel = require('../model/taskmodel');
const bcrypt = require('bcrypt');
const storage = require('node-persist');
storage.init( /* options ... */ );

//ADD ADMIN
exports.add_admin = async (req,res) =>{
    var data = await adminmodel.create(req.body);

    res.status(200).json({
        status:"insert",
        data
    })
}

//ADMIN LOGIN
exports.login = async (req, res) =>{
    var data=await adminmodel.find({"email":req.body.email});
    var login_status = await storage.getItem('admin_id');

    if(login_status == undefined){
        if(data.length == 1){
            await storage.setItem('admin_id',data[0].id);
            req.status(200).json({
                status:"login success",
            })
        }
        else{
            res.status(200).json({
                status:"check email and password"
            })
        }
    }
    else{
        res.status(200).json({
            status:"Admin already login"
        })
    }
}

//LOGOUT
exports.logout = async (req, res) =>{
    storage.clear()
    res.status(200).json({
        status:"Logout"
    })
}   

// ===========================================
//                 USER
// ===========================================

//ADD USER
exports.add_user = async (req, res) =>{
    var login_status = storage.getItem('admin_id');
    var data = await usermodel.create(req.body);
    
    if(login_status != undefined){
        res.status(200).json({
            status:"User Added"
         })
    }
    else{
        res.status(200).json({
            status:"User is not login"
         })
    }
}

//UPDATE USER
exports.update_user = async (req, res) =>{
    var login_status = storage.getItem('admin_id');
    var id = req.params.id;
    var data = await usermodel.findByIdAndUpdate(id,req.body);

    if(login_status != undefined){
        res.status(200).json({
            status:"User Updated"
         })
    }
    else{
        res.status(200).json({
            status:"User is not login"
         })
    }
}

//DELETE USER
exports.delete_user = async (req, res) =>{
    var login_status = storage.getItem('admin_id');
    var id = req.params.id;
    var data = await usermodel.findByIdAndDelete(id);

    if(login_status != undefined){
        res.status(200).json({
            status:"User Deleted"
         })
    }
    else{
        res.status(200).json({
            status:"User is not login"
         })
    }
}

//VIEW USER
exports.view_user = async (req, res) =>{
    var login_status = storage.getItem('admin_id');
    var data = await usermodel.find();

    if(login_status != undefined){
        res.status(200).json({
           data
         })
    }
    else{
        res.status(200).json({
            status:"User is not login"
         })
    }
}

// ===========================================
//                 TASK
// ===========================================

//ADD TASK
exports.add_task = async (req, res) =>{
    var login_status =storage.getItem('admin_id');
    var data = await taskmodel.create(req.body);

    if(login_status != undefined){
        res.status(200).json({
            status:"Task Added"
         })
    }
    else{
        res.status(200).json({
            status:"User is not login"
         })
    }
}

//UPDATE TASK
exports.update_task = async (req, res) =>{
    var login_status =storage.getItem('admin_id');
    var id = req.params.id;
    var data = await taskmodel.findByIdAndUpdate(id,req.body);

    if(login_status != undefined){
        res.status(200).json({
            status:"Task Update"
         })
    }
    else{
        res.status(200).json({
            status:"User is not login"
         })
    }
}

//DELETE TASK
exports.delete_task = async (req, res) =>{
    var login_status =storage.getItem('admin_id');
    var id = req.params.id;
    var data = await taskmodel.findByIdAndUpdate(id);

    if(login_status != undefined){
        res.status(200).json({
            status:"Task Deleted"
         })
    }
    else{
        res.status(200).json({
            status:"User is not login"
         })
    }
}

//VIEW TASK
exports.view_task = async (req, res) =>{
    var login_status =storage.getItem('admin_id');
    var data = await taskmodel.find();

    if(login_status != undefined){
        res.status(200).json({
            data
         })
    }
    else{
        res.status(200).json({
            status:"User is not login"
         })
    }
};

exports.check_status = async (req, res) =>{
    var id = req.params.id;
    var data = await taskmodel.findByIdAndUpdate(id,req.body);
    var data1 = await taskmodel.find({"id":data[0].id});
    var __v = data1[0].__v;
    var sta = data1[0].sta;
    console.log(__v,sta);
    if(__v == 0){
        sta = "pending"
    }
    else if(__v == 1){
        sta = "complete"
    }
    else if(__v == 2){
        sta = "declain"
    }
    req.body.sta = sta
    req.body.__v = __v
    res.status(200).json({
        status:"Updated",
        __v,
        sta
    })
    console.log(__v,sta);

}