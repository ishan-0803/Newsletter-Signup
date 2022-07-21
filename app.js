const { application } = require("express");
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const fName=req.body.fName;
    const lName=req.body.lName;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url ="https://us18.api.mailchimp.com/3.0/lists/8fc9694e38";
    const options={
        method:"POST",
        auth:"Prabhupad:b656cb633e85e7b256bb87babdc79f1a-us18"
    }
    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Hare Krsna, Server is running on port : 3000");
})

// API Key :
// b656cb633e85e7b256bb87babdc79f1a-us18

// List Id :
// 8fc9694e38