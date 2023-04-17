const express =require("express");
const app=express();
const bodyParser=require("body-parser");
const request =require("request");
const https=require("https"); 
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>{
const firstname=req.body.fname;
const lastname=req.body.lname;
const useremail=req.body.email;
var data={
    members:[
        {
            email_address:useremail,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
        }
    ]
};
const jsonData = JSON.stringify(data);
const url ="https://us21.api.mailchimp.com/3.0/lists/c5c0044864";
const options={
     method:"POST",
     auth:"shreyansh123:09c7f2c3667e3939e1243d4c05b74c35-us21"
}
const request=https.request(url, options,function(response){

if(response.statusCode===200)
res.sendFile(__dirname+"/success.html");
else
res.sendFile(__dirname+"/failure.html");

response.on("data",function(data){
    console.log(JSON.parse(data));
}) 
})
request.write(jsonData);
request.end();
})

app.post('/failure',(req,res)=>{
    res.redirect("/")
})
app.post('/home',(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("server running in port 3000");
})

// 09c7f2c3667e3939e1243d4c05b74c35-us21