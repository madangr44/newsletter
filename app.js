//jshint esversion: 6

var express= require('express');
var bodyParser= require('body-parser');
var request= require('request');


 var app=express();
 app.use(bodyParser.urlencoded({extended:true}));

 // by using static we can render local files like css on server

 app.use(express.static(__dirname + '/public'));
 app.get("/",(req,res)=>{
     res.sendFile(__dirname+"/signup.html");
 });

 app.post("/",(req,res)=>{
     var firstname = req.body.fname;
     var lastname = req.body.lname;
     var email = req.body.email;
     console.log(firstname,lastname,email);

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }    
        ]
    }

    var jsonData = JSON.stringify(data);

     var options={
         url:"https://us4.api.mailchimp.com/3.0/lists/1eb2803ee9",
         method:"POST",
         headers:{
             "Authorization":"madan d19e2fa7e850e3d8bd4b70a9c6214de9-us4    "
         },
        body:jsonData
     }
     
     request(options,function(error,response,body){
         if(error){
            res.sendFile(__dirname+'/failure.html');
         }
         else{
             if(response.statusCode==200){
                res.sendFile(__dirname+'/success.html');
                console.log(__dirname)
             }
             else{
                res.sendFile(__dirname+'/failure.html');
             }
         }

     })
 });

 app.post("/failure",(req,res)=>{
    res.redirect("/");
 })

 
//1eb2803ee9 list id
 //d19e2fa7e850e3d8bd4b70a9c6214de9-us4  api-key-mailchimp

 app.listen(process.env.PORT ||3000,()=>console.log(`server started running`));