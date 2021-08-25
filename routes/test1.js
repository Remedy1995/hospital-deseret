// const express=require('express');
//  const app =express();
//  const router =express.Router();
//  const mongoose=require('mongoose');
// const bodyParser = require('body-parser');
// const { render } = require('ejs');
// //const work=require('./test1.js');
// var newId2 = new mongoose.mongo.ObjectId();
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({ extended: false}))
// const fileUpload = require("express-fileupload");
// const path=require("path");
// const url = require('url');
// router.use(fileUpload({
//   useTempFiles : true,
//   tempFileDir : '/tmp/'
// }));

// //create the models first
// const registerSchema={   
// firstname:String,
// othername:String,
// lastname:String,
// nok:String,
// relation:String,
// phone:String,
// nokphone:String,
// gender:String,
// payment:String,
// dob:String,
// hometown:String,
// address:String,
// age:String,
// message:String,
// message1:String,
// test1:String,
// test2:String,
// test3:String,
// test4:String,
// test0:String
// };
// module.exports.registerSchema=registerSchema;
// //to insert into the table of the mongo db

//  const Register=mongoose.model("insert",registerSchema);



//  module.exports.Register=Register;




//  router.post('/patient',function(req,res){
// //create the models
// const insert=new Register({
//     firstname:req.body.firstname,
//     othername:req.body.othername,
//     lastname:req.body.lastname,
//     nok:req.body.nok,
//     relation:req.body.relation,
//     phone:req.body.phone,
//     nokphone:req.body.nokphone,
//     gender:req.body.gender,
//     payment:req.body.payment,
//     dob:req.body.dob,
//     hometown:req.body.hometown,
//     address:req.body.address,
//     age:req.body.age,
// })
//   const check=insert.save();
// if(check){
//   console.log("inserted successfully")
// }else{
//   console.log(error);
// }


//  });




//  module.exports = router;