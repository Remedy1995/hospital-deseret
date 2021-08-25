//jshint esversion:6
const express=require('express');

 const app =express();
 const router =express.Router();
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false}))
const get=require('./routes/test1.js');
//create the models first

module.exports.getname=getname;

function getname(){
console.log("i am happy so fuck you");

}
module.exports.getSchool=getSchool;
function getSchool(){
    console.log("i am in cambridge")
}
