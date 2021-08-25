const express=require('express');
 const app =express();
 const router =express.Router();
 const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const md5=require("md5");
const session = require('cookie-session')
// const work=require('./test1.js');
const flash=require("connect-flash");
router.use(flash());
var sess;
router.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var newId2 = new mongoose.mongo.ObjectId();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false}))
const fileUpload = require("express-fileupload");
const path=require("path");
const url = require('url');
router.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
mongoose.set('useFindAndModify', false);
//create the models first
const registerSchema={   
firstname:String,
othername:String,
lastname:String,
nok:String,
phone:String,
password:String,
gender:String,
dob:String,
hometown:String,
address:String,
age:String,
message:String,
message1:String,
test1:String,
test2:String,
test3:String,
test4:String,
test0:String,
image:String
};

const loginSchema={
    firstname:String,
    password:String
}

const bookSchema={
  fullname:String,
  message:String,
  time:String
}

const examineSchema={
  message:String,
  message1:String,
  test1:String,
  test2:String,
  test3:String,
  test4:String,
  test0:String
}

const PostSchema = new mongoose.Schema({
  
  image: String,
  firstname:String,
  lastname:String,
  comment:String,
})

const diagnoseschema = new mongoose.Schema({
  
  
  first:String,
  diagnose2:String,
  diagnose1:String,
})

//create a schema for prescribe
const prescribeschema = new mongoose.Schema({
  
  
  drugname:String,
  dosage:String,
  quantity:Number,
  first:String

})


const accountschema = new mongoose.Schema({
  
  first:String,
  quantity:Number,
  price:Number,
  total:Number,
  

})

const Book=mongoose.model("book",bookSchema);

const Prescribe=mongoose.model("prescribe",prescribeschema);

const Post = mongoose.model('Post', PostSchema);

const Account = mongoose.model('account', accountschema);

const Login=mongoose.model("login",loginSchema);
 
// //to insert into the table of the mongo db

const Register=mongoose.model("insert",registerSchema);

module.exports.Register=Register;

const Examine=mongoose.model("exam",examineSchema);


const Diagnose=mongoose.model("diagnose",diagnoseschema);



// router.post('/',function(req,res){

  var firstname="Admin";
var password=md5("123456");
const insert=new Login({
  firstname:firstname,
  password:password,
})
insert.save();
// // // // })

 router.post('/patient',function(req,res){

  
  //validate the fields 
  var firstname=req.body.firstname;
  var othername=req.body.othername;
  var lastname=req.body.lastname;
  var nok=req.body.nok;
  var age=req.body.age;
  var hometown=req.body.hometown;
  var phone=req.body.phone;
  var password=req.body.password;
  var image=req.body.image;
  var dob=req.body.dob;
  var address=req.body.address;
  var gender=req.body.gender;
  if(firstname===""){
 console.log("enter firstname");
 req.flash('server-error'," Please enter firstname")
 res.redirect("/patient")
  }
  else if(lastname===""){
    console.log("enter lastname")
    req.flash('server-error'," Please enter lastname")
    res.redirect("/patient")
  }
  else if(othername===""){
    console.log("enter othername")
    req.flash('server-error'," Please enter Othername")
    res.redirect("/patient")
  }
  else if(nok===""){
    console.log("enter Next Of Kin")
    req.flash('server-error'," Please enter Next Of Kin")
    res.redirect("/patient")
  }
  else if(lastname===""){
    console.log("enter lastname")
    req.flash('server-error'," Please enter lastname")
    res.redirect("/patient")
  }
  else if(age===""){
    console.log("enter Age")
    req.flash('server-error'," Please enter Age")
    res.redirect("/patient")
  }
  else if(hometown===""){
    
    req.flash('server-error'," Please enter hometown")
    console.log("enter hometown")
    res.redirect("/patient")
  }
  else if(dob===""){
    console.log("enter Date Of Birth")
    req.flash('server-error'," Please enter Date Of Birth")
    res.redirect("/patient")
  }
  else if(gender===""){
    console.log("select gender")
    req.flash('server-error'," Please Select Gender")
    res.redirect("/patient")
  }else if(age===""){
    console.log("enter age")
    req.flash('server-error'," Please enter Age")
    res.redirect("/patient")
  }
  else if(password===""){
    console.log("Choose a Password")
    req.flash('server-error'," Please Choose A Password")
    res.redirect("/patient")
  }
  else if(image===""){
    console.log("Choose Image")

  }
  else if(address===""){
    console.log("enter address")
    req.flash('server-error'," Please enter Address")
    res.redirect("/patient")
  }

  else if(phone===""){
    console.log("enter phone")
    req.flash('server-error'," Please enter Phone number")
    res.redirect("/patient")
  }
  else{
//create the models
const { image } = req.files;
image.mv(path.resolve(__dirname, '../public/posts/', image.name));
const insert=new Register({
    firstname:req.body.firstname,
    othername:req.body.othername,
    lastname:req.body.lastname,
    nok:req.body.nok,
    phone:req.body.phone,
    gender:req.body.gender,
    dob:req.body.dob,
    hometown:req.body.hometown,
    address:req.body.address,
    age:req.body.age,
    image: `/posts/${image.name}`,
    password:md5(req.body.password),
})
  const check=insert.save();
if(check){
  req.flash('server-success',"You have successfully added a Patient")
  console.log("inserted successfully")
}else{
  console.log(error);
}

module.exports.age=age;
var age=insert.age;
module.exports.hometown=hometown;
var hometown=insert.hometown;

res.redirect("/patient")
  }
 });


router.route("/find").get(function(req, res) {
  Login.find({'firstname' : new RegExp(firstname, 'i')}, function(err, docs){
  
    for(i=0;i<docs.length;i++){
      var id=docs[i].id;
    }
  
  Register.find({}, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.render("find",{result:result,id:id});
          }
         
          
      });
    
    
  });

})
  router.route("/testsample1").get(function(req, res) {
 
    Post.find({}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
               res.render("testsample1",{result:result});
              console.log(result)
            }
           
            
        });
      
        
       
    });





    router.route("/").get(function(req,res){
     
        return res.render("login")
  


    })
  



  router.route("/admin").get(function(req,res){
       return res.render("adminlogin")
       
  })


//routes for admin
  router.post("/admin",function(req,res,next){
      
    req.session.username=req.body.username;
    var username=req.session.username;
   req.session.password=md5(req.body.password);
   var password=req.session.password;
   var username1=req.body.username;
    Login.findOne({firstname:username},function(err,founduser,foundname){
     if(!founduser){
  console.log("incorrect credentials")
  // req.flash('server-error',"incorrect credentials")
      return res.render("login")
     
    
    }
    if(founduser.password !=password){
      console.log("incorrect credentials")
      // req.flash('server-error',"incorrect credentials")
      res.render("login")
    }
  
     if(founduser.password===password || founduser.role==="Admin"){
      // console.log(founduser.age)
     var firstname=founduser.firstname;
     var lastname=founduser.lastname;
     var id=founduser.id;
      // return res.render("user",{firstname:firstname,lastname:lastname,id:id})
      res.redirect(url.format({
        pathname:"/dashboard",
        query: {
           firstname: firstname,
            }
      }));

    }
    

})

})













  router.route("/user").get(function(req,res){
     firstname=req.session.username;
           Register.find({'firstname' : new RegExp(firstname, 'i')}, function(err, docs){
         
           for(i=0;i<docs.length;i++){
             var id=docs[i].id;
             var lastname=docs[i].lastname;
           }
          console.log(id)
          return res.render("user",{id:id,lastname:lastname,firstname:firstname});
          
           

          })


  })
  router.route("/book").get(function(req,res){
    firstname=req.session.username;
    Register.find({'firstname' : new RegExp(firstname, 'i')}, function(err, docs){
         
      for(i=0;i<docs.length;i++){
        var id=docs[i].id;
        var lastname=docs[i].lastname;
      }
    res.render("book",{ id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
  })
  })
  router.route("/dashboard").get(function(req,res){
    firstname=req.session.username;
    Login.find({'firstname' : new RegExp(firstname, 'i')}, function(err, docs){
  
    for(i=0;i<docs.length;i++){
      var id=docs[i].id;
    }
    res.render("dashboard",{firstname:firstname,id:id});
    })
    
  })


  // DELETE /api/auth/logout
router.get('/logout',(req,res)=>{
  
  req.session.destroy();
 res.redirect("/")
  })








router.post("/book",function(req,res){
 
var fullname=req.body.fullname;
var message=req.body.message;
var time=req.body.time
if(fullname===""){
    console.log("Please enter your full name");
    req.flash('server-error'," Please enter your full name")
    res.redirect("/book")
     }
     else if(message===""){
       console.log("please write a message")
       req.flash('server-error'," Please write a message")
       res.redirect("/book")
     }
     else if(time===""){
      console.log("please Select a Date")
      req.flash('server-error'," Please Select A date")
      res.redirect("/book")
    }
else
{const insert=new Book({
      fullname:req.body.fullname,
      message:req.body.message,
      time:req.body.time

  })
  const check=insert.save();
  if(check){
    console.log("inserted successfully");
    req.flash('server-success',"You have successfully booked Appointment on "+time)
     res.redirect("/book")
  }
}
})

        //user routes
    router.post('/',function(req,res,next){
      
      req.session.username=req.body.username;
      var username=req.session.username;
     req.session.password=md5(req.body.password);
     var password=req.session.password;
     var username1=req.body.username;
     var role="Admin";
  
     Register.findOne({firstname:username},function(err,founduser,foundname){
       if(!founduser){
        console.log("incorrect credentials")
        // req.flash('server-error',"incorrect credentials")
        return res.render("login")
       
      
      }
      if(founduser.password !=password){
        console.log("incorrect credentials")
  // req.flash('server-error',"incorrect credentials")
        res.render("login")
      }
    
       if(founduser.password===password || founduser.role==="Admin"){
        // console.log(founduser.age)
       var firstname=founduser.firstname;
       var lastname=founduser.lastname;
       var id=founduser.id;
        // return res.render("user",{firstname:firstname,lastname:lastname,id:id})
        res.redirect(url.format({
          pathname:"/user",
          query: {
             firstname: firstname,
              }
        }));

      }
      
  
  })

})









router.post("/update:id",function(req, res) {
  var id=req.params.id;
  var firstname=req.body.firstname;
  var othername=req.body.othername;
  var lastname=req.body.lastname;
  var nok=req.body.nok;
  var age=req.body.age;
  var hometown=req.body.hometown;
  var phone=req.body.phone;
  var password=req.body.password;
  var image=req.body.image;
  var dob=req.body.dob;
  var address=req.body.address;
  var gender=req.body.gender;
  if(firstname===""){
 console.log("enter firstname");
 req.flash('server-error'," Please enter firstname")
 res.redirect("/update"+id)
  }
  else if(lastname===""){
    console.log("enter lastname")
    req.flash('server-error'," Please enter lastname")
    res.redirect("/update"+id)
  }
  else if(othername===""){
    console.log("enter othername")
    req.flash('server-error'," Please enter Othername")
    res.redirect("/update"+id)
  }
  else if(nok===""){
    console.log("enter Next Of Kin")
    req.flash('server-error'," Please enter Next Of Kin")
    res.redirect("/update"+id)
  }
  else if(lastname===""){
    console.log("enter lastname")
    req.flash('server-error'," Please enter lastname")
    res.redirect("/update"+id)
  }
  else if(age===""){
    console.log("enter Age")
    req.flash('server-error'," Please enter Age")
    res.redirect("/update"+id)
  }
  else if(hometown===""){
    
    req.flash('server-error'," Please enter hometown")
    console.log("enter hometown")
    res.redirect("/update"+id)
  }
  else if(dob===""){
    console.log("enter Date Of Birth")
    req.flash('server-error'," Please enter Date Of Birth")
    res.redirect("/update"+id)
  }
  else if(gender===""){
    console.log("select gender")
    req.flash('server-error'," Please Select Gender")
    res.redirect("/update"+id)
  }else if(age===""){
    console.log("enter age")
    req.flash('server-error'," Please enter Age")
    res.redirect("/update"+id)
  }
  else if(password===""){
    console.log("Choose a Password")
    req.flash('server-error'," Please Choose A Password")
    res.redirect("/update"+id)
  }
  else if(image===""){
    console.log("Choose Image")

  }
  else if(address===""){
    console.log("enter address")
    req.flash('server-error'," Please enter Address")
    res.redirect("/update"+id)
  }

  else if(phone===""){
    console.log("enter phone")
    req.flash('server-error'," Please enter Phone number")
    res.redirect("/update"+id)
  }
  else{
//get the id
var user_id=req.params.id;
var firstname=req.body.firstname;
var othername=req.body.othername;
var lastname=req.body.lastname;
var nok=req.body.nok;
var phone=req.body.phone;
var gender=req.body.gender;
var dob=req.body.dob;
var hometown=req.body.hometown;
var address=req.body.address;
var age=req.body.age;







Register.findByIdAndUpdate(user_id, { firstname: firstname,othername:othername,lastname:lastname,nok:nok,phone:phone,gender:gender,dob:dob
,hometown:hometown,address:address,age:age}, 
                            function (err, docs) { 
                          
    if (err){ 
        console.log(err) 
    } 
    else{ 
      
    } 
    req.flash('server-success',"You have updated your information successfully")
    console.log("information inserted successfully");
    res.redirect("/update"+ user_id);
}); 

  }
})

router.route("/changepassword:id").get(function(req, res) {
  var id=req.params.id;
res.render("changepassword",{id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
})

router.route("/changeadminpassword:id").get(function(req, res) {
  var id=req.params.id;
res.render("changeadminpassword",{id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
})





router.post("/changeadminpassword:id",function(req,res){
  var user_id=req.params.id;
var oldpassword=md5(req.body.oldpassword);
var newpassword=md5(req.body.newpassword);


Login.findOne({password:oldpassword},function(err,founduser){
if(!founduser){
console.log("error")

req.flash('server-error',"The password you have entered does not match our records please try again")
res.redirect("/changeadminpassword"+user_id)
}
else{
console.log("correct")

Login.findByIdAndUpdate(user_id,{password:newpassword},function(err,docs){

  if(err){
    console.log(err)
  }
  else{
    console.log("updated")
    req.flash('server-success',"Password updated successfully")
    res.redirect("/changeadminpassword"+user_id)
    //password =1234567
  }
})

}

})

})























router.post("/changepassword:id",function(req,res){
    var user_id=req.params.id;
  var oldpassword=md5(req.body.oldpassword);
  var newpassword=md5(req.body.newpassword);


Register.findOne({password:oldpassword},function(err,founduser){
if(!founduser){
  console.log("error")
  
req.flash('server-error',"The password you have entered does not match our records please try again")
res.redirect("/changepassword"+user_id)
}
else{
  console.log("correct")

  Register.findByIdAndUpdate(user_id,{password:newpassword},function(err,docs){

    if(err){
      console.log(err)
    }
    else{
      console.log("updated")
      req.flash('server-success',"You have updated your password successfully")
      res.redirect("/changepassword"+user_id)
      //password =1234567
    }
  })

}

})

})
router.route("/update:id").get(function(req, res) {
var id=req.params.id;

res.render("update",{id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
})

router.route("/profile:id").get(function(req, res) {
  firstname=req.session.username;
  Register.find({'firstname' : new RegExp(firstname, 'i')}, function(err, docs){

  for(i=0;i<docs.length;i++){
    var id=docs[i].id;
    var lastname=docs[i].lastname;
  }
 
  Register.findById(req.params.id, function(err,consultation) {
     var firstname=consultation.firstname;
     var lastname=consultation.lastname;
     var othername=consultation.othername;
     var age=consultation.age;
     var hometown=consultation.hometown;
     var gender=consultation.gender;
     var dob=consultation.dob;
     var phone=consultation.phone;
     var nok=consultation.nok;
     var address=consultation.address;
     var image=consultation.image;
    // var quantity=consultation.quantity;
    res.render("profile",{id:id,firstname:firstname,lastname:lastname,othername:othername,age:age,hometown:hometown,gender:gender,dob:dob,phone:phone
    ,nok:nok,address:address,image:image});
         
      });
    
   
    })
  })

  router.route("/testsample").get(function(req, res) {
 
    Post.find({}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
               res.render("testsample",{result:result});
              console.log(result)
            }
           
            
        });
      
        
       
    });
  
    router.route("/account").get(function(req, res) {
 
      Prescribe.find({}, function(err, result) {
              if (err) {
                console.log(err);
              } else {
                 res.render("account",{result:result});
                console.log(result)
              }
             
              
          });
        
          
         
      });
    




      










      router.route("/account1").get(function(req, res) {
 
        Account.find({}, function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  
                  console.log(result)
                }
               
                res.render("account1",{result:result});
            });
          
          
           
        });
      










      router.post('/account:id',function(req,res){
        // console.log(req.body.first)
        // console.log(req.body.quantity)
        // console.log(req.body.price)

        var quantity=req.body.quantity;
        var price=req.body.price;
        var total=quantity*price;
        const insert=new Account({
          first:req.body.first,
          quantity:req.body.quantity,
          price:req.body.price,
          total:total

        })
        const account=insert.save();
        if(account)
        {
          console.log("accounted")
          res.redirect("account1")
        }
        else{
          console.log("error")
        }
        

      })
  
    // router.route("/prescribe").get(function(req, res) {
 
    //   Post.find({}, function(err, result) {
    //           if (err) {
    //             console.log(err);
    //           } else {
    //              res.render("testsample",{result:result});
    //             console.log(result)
    //           }
             
              
    //       });
        
         
    //   });
    

      router.post('/prescribeid=:id',function(req,res){
        const insert=new Prescribe({
          drugname:req.body.drugname,
          first:req.body.first,
          dosage:req.body.dosage,
          quantity:req.body.quantity

        })
        const prescribe=insert.save();
        if(prescribe)
        {
          console.log("prescribed")
          res.redirect("account")
        }
        else{
          console.log("error")
        }
        
      
            })

      
    router.post('/diagnoseid=:id',function(req,res){
      var first=req.body.first;
      if(first.value==="")
      {
        console.log("enter name");
      }
      else{
const insert=new Diagnose({

  diagnose1:req.body.diagnose1,
  first:req.body.first,
  diagnose2:req.body.diagnose2
})
const diagnose=insert.save();
if(diagnose)
{
  console.log("diagonsed")
  res.redirect("/testsample1")
}
else{
  console.log("error")
}
      }
    })

    router.route("/diagnoseid=:id").get(function(req, res) {
  
      // Register.find({}, function(err, result) {
      //         if (err) {
      //           console.log(err);
      //         } else {
      //           res.render("find",{result:result});
      //         }
             
              
      //     });








      Post.findById(req.params.id, function(err,consultation) {
        var firstname=consultation.firstname;
        var lastname=consultation.lastname;
        res.render("diagnose",{firstname:firstname,lastname:lastname});
    });

    






    router.route("/paymentid=:id").get(function(req, res) {

      Prescribe.findById(req.params.id, function(err,consultation) {
        var firstname=consultation.first;
        var quantity=consultation.quantity;
        res.render("payment",{firstname:firstname,quantity:quantity});
    });




  })


    



    router.route("/accountid=:id").get(function(req, res) {

      Account.findById(req.params.id, function(err,consultation) {
                  
        res.render("account",{consultation:consultation});
      
    });

    
  })



  router.route("/account2id=:id").get(function(req, res) {

    Account.findById(req.params.id, function(err,consultation) {
                
      res.render("account2",{consultation:consultation});
    
  });

  
})






















   

    router.route("/prescribeid=:id").get(function(req, res) {
  Post.findById(req.params.id, function(err,consultation) {
        var firstname=consultation.firstname;
        var lastname=consultation.lastname;
        res.render("prescribe",{firstname:firstname,lastname:lastname});
    });





  })
     
         
      });
    

      router.route("/recieptid=:id").get(function(req, res) {
        Account.findById(req.params.id, function(err,consultation) {
              
              var total= consultation.total;
              var quantity=consultation.quantity;
              var first=consultation.first;
              var price=consultation.price;
              res.render("receipt",{total:total,quantity:quantity,first:first,price:price})
            
          });
      
      
      
      
      
        })
           








  router.route("/test").get(function(req, res) {
  
    // Register.find({}, function(err, result) {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           res.render("find",{result:result});
    //         }
           
            
    //     });
    res.render("test");
       
    });
  
  // router.post('/send',function(req,res){

    
  //     Register.findById("6048a92bd1d1f008ec5f7e45", function(err, result) {
  //       if (err) {
  //        console.log(err)
  //       } else {
  //         console.log(result)
  //       }
  //     });
  //   });

//   router.route("/consultation").get(function(req, res) {
// res.render("consultation");

//   })

router.route("/sendlab").get(function(req, res) {
  Examine.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.render("sendlab",{result:result});
    // console.log(result)
    }
   
    
});







})

   router.route("/consultation:id").get(function(req, res) {
    console.log(req.params.id)
    Login.find({'firstname' : new RegExp(firstname, 'i')}, function(err, docs){
  
      for(i=0;i<docs.length;i++){
        var id=docs[i].id;
      }
    function Find(){
  
    Register.findById(req.params.id, function(err,consultation) {
      if (err) {
        console.log(err);
      } else {
 
         res.render("consultation",{consultation:consultation,id:id});
        
      }
     
      
  });
}
  Find();

})
 
})
  router.route("/test:id").get(function(req, res) {
    Examine.findById(req.params.id, function(err,test) {
      var message=test.message;
      var message1=test.message1;
      var id=test.id;
      if (err) {
        console.log(err);
      } else {
        //store the name of the patient
        res.render("test",{message:message,message1:message1,id:id});
        
      }
     
      
  });




  
  })


 router.route("/deletepatients:id").get(function(req,res)
 {
   
   Register.findByIdAndDelete(req.params.id, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
    res.redirect("/find")
  });

 })

 
 
 router.route("/deletetest:id").get(function(req,res)
 {
   
   Post.findByIdAndDelete(req.params.id, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
    res.redirect("/testsample")
  });

 })



 

 router.route("/deletebills:id").get(function(req,res)
 {
   
   Account.findByIdAndDelete(req.params.id, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
    res.redirect("/account1")
  });

 })






router.route("/deletepaymentinfo:id").get(function(req,res)
 {
   
   Prescribe.findByIdAndDelete(req.params.id, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
    res.redirect("/account")
  });

 })





 router.route("/deletesendlab:id").get(function(req,res)
 {
   
   Examine.findByIdAndDelete(req.params.id, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
    res.redirect("/sendlab")
  });

 })



router.route("/booked").get(function(req,res){
var id=req.params.id
Book.find({},function(err,booked){
  if(booked){
    res.render("booked",{booked:booked,id:id});
  }
})

})



router.post("/booked",function(req, res) {
  var search=req.body.search;
 var id=req.params.id
  

Book.find({'fullname' : new RegExp(search, 'i')}, function(err, docs){


   res.render("searchbook",{docs:docs,id:id})





   
      // for (i=0;i<docs.length;i++){
      // //  console.log(docs)
    //  console.log(docs)
  
     
     
})






})



router.post("/search1",function(req, res) {
  var search=req.body.search;
 
  

Post.find({'firstname' : new RegExp(search, 'i')}, function(err, docs){


  res.render("search1",{docs:docs})

      // for (i=0;i<docs.length;i++){
      // //  console.log(docs)
      // console.log(docs[i].age)
  
     
     
})






})


router.post("/searchaccount",function(req, res) {
  var search=req.body.search;
 
  

Prescribe.find({'first' : new RegExp(search, 'i')}, function(err, docs){


  res.render("searchaccount",{docs:docs})

      // for (i=0;i<docs.length;i++){
      // //  console.log(docs)
      // console.log(docs[i].age)
  
     
     
})
})

router.route("/searchaccount").get(function(req,res){
  res.redirect("/searchaccount")
})

router.route("/searchaccount").get(function(req,res){
  res.redirect("/search1")
})

router.route("/billsummary").get(function(req,res){
  res.redirect("/billsummary")
})



router.post("/billsummary",function(req, res) {
  var search=req.body.search;
 
  

Account.find({'first' : new RegExp(search, 'i')}, function(err, docs){


  res.render("billsummary",{docs:docs})

      // for (i=0;i<docs.length;i++){
      // //  console.log(docs)
      // console.log(docs[i].age)
  
     
     
})
})


router.route("/search").get(function(req,res){
  res.redirect("find")
})














  router.post("/search",function(req, res) {
    var search=req.body.search;
 Register.find({'lastname' : new RegExp(search, 'i')}, function(err, docs){
    res.render("search",{docs:docs})
      
  })
  })


  router.post("/search2",function(req, res) {
    var search=req.body.search;
 Post.find({'lastname' : new RegExp(search, 'i')}, function(err, result){
    res.render("search2",{result:result})
      
  })
  })


  router.post("/search3",function(req, res) {
    var search=req.body.search;
 Examine.find({'test0' : new RegExp(search, 'i')}, function(err, result){
    res.render("search3",{result:result})
      
  })
  })

   
  router.post("/search4",function(req, res) {
    var search=req.body.search;
 Examine.find({'test0' : new RegExp(search, 'i')}, function(err, result){
    res.render("testsample2",{result:result})
      
  })
  })

   
  


  router.route("/room:id").get(function(req, res) {
   
    
    Examine.findById(req.params.id, function(err,test) {
      var message=test.message;
      var message1=test.message1;
      var test1=test.test1;
      var test2=test.test2;
      var test3=test.test3;
      var test4=test.test4;
      var test0=test.test0;
    

      if (err) {
        console.log(err);
      } else {
        //store the name of the patient
        res.render("consultationroom",{message:message,message1:message1,test0:test0,test1:test1,test2:test2,test3:test3,test4:test4,
          test0:test0});
        
      }

         });


  });

  





  
  router.route("/examine:id").get(function(req, res) {
    Register.findById(req.params.id, function(err,consultation) {
      var firstname=consultation.firstname;
      var lastname=consultation.lastname;
      if (err) {
        console.log(err);
      } else {
        //store the name of the patient
        res.render("examine",{firstname:firstname,lastname:lastname});
        
      }
     
      
  });




  
  })


  router.route("/patient").get(function(req,res){
    firstname=req.session.username;
    Login.find({'firstname' : new RegExp(firstname, 'i')}, function(err, docs){
  
      for(i=0;i<docs.length;i++){
        var id=docs[i].id;
      }
    res.render("patient",{id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
  })
})

  router.post("/examine",function(req,res){
    var user_id=req.params.id;
   var message=req.body.message;
   var  message1=req.body.message1;
   var test1=req.body.test1;
   var test2=req.body.test2;
   var test3=req.body.test3;
   var test4=req.body.test4;
  var test0=req.body.test0
console.log(req.body.test0)
    
    const insert=new Examine({
        message:req.body.message,
        message1:req.body.message1,
       test1:req.body.test1,
       test2:req.body.test2,
       test3:req.body.test3,
       test4:req.body.test4,
      test0:req.body.test0
    })
//post into register


 const check=insert.save();
    if(check){
      console.log("You have successfully diagnosed "+test0);
      req.flash('server-success',"You have successfully diagnosed "+test0);
        res.redirect("/sendlab");  
    }else{
      console.log(error);
    }
  
     });
 

     router.post("/upload:id",function(req,res){
    
req.params.id;
      
     const { image } = req.files
      
     
      image.mv(path.resolve(__dirname, '../public/posts/', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            comment:req.body.comment

        }).then((name)=>{
          var comment=name.comment;
         
          res.redirect(url.format({
            pathname:"/sendlab",
            query: {
               comment: comment
             }
          }));



          //res.redirect("/sendlab")


        }).catch((error)=>{
          console.log(error);
        })
      })
    
    
    })
 module.exports = router;