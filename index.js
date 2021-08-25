const express=require('express');
const mongoose=require('mongoose');
const app =express();
const path=require('path');
const session = require('express-session'); 
const flash = require('connect-flash'); 
const md5=require("md5")
const school=require("./routes/register.js")
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join('public')));
app.use(bodyParser.json())

//set views template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({ 
   secret:'geeksforgeeks', 
   saveUninitialized: true, 
   resave: true
})); 
//use this routes to get requests from news.js
const routes = require('./routes/register');
//const check=require('./routes/test1.js');
const { route } = require('./routes/register');
const man=require('./registera.js')
//const findall=require('./routes/findall.js');
app.use('/', routes);
//app.use('/', findall);
//app.use('/',check);
//connect to the mongodb
// const connection=mongoose.connect("mongodb://localhost:27017/Hospital",{useNewUrlParser:true,useUnifiedTopology: true});
const connection=mongoose.connect("mongodb://Remedy:Remedy1995@cluster0-shard-00-00.swuc4.mongodb.net:27017,cluster0-shard-00-01.swuc4.mongodb.net:27017,cluster0-shard-00-02.swuc4.mongodb.net:27017/Hospital?ssl=true&replicaSet=atlas-oxvvut-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true});

//to remove the deprecation error
mongoose.set("useCreateIndex",true);
if(!connection){
  console.log('connection to the database failed');

}
else{
  console.log('you have connected to the database');
  
  // console.log(man.getname())
  // console.log(man.getSchool())
  
 
}





// app.use(flash()); 

app.get('/test1', (req, res) => { 
  //req.flash('message', 'Success!!'); 
  res.sendFile(path.join(__dirname+'/index.html'))
}); 



app.get('/find', (req, res) => { 
  res.render('find')
  
  });
 
    console.log(man.getname())
   console.log(man.getSchool())
  


 app.listen(process.env.PORT || 4000,()=>{

console.log('you have successful connected to port 4000');
})


//console.log(md5(1234567))curent password