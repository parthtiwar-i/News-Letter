const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

//to parse the js object to json files and to get the data fro the inputs of the form 
app.use(bodyParser.urlencoded({ extended: true }));
//to use css files atteched to the html files in the res.sendFiles to render the css files
app.use(express.static("public"));






app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function (req, res) {
  

  const endpoint = "https://us21.api.mailchimp.com/3.0/lists/b41a60c113/members";
  var data = {
        email_address : req.body.email ,
        status : "subscribed",
        merge_fields : {
            FNAME : req.body.FNAME,
            LNAME : req.body.LNAME
        }        
    };
  
  const config = {
    headers: {
      'Authorization':'parth10eecf4d3a917881867f40df1cd5b5a3d-us21'
    }
  };
  

  axios.post(endpoint ,data ,config)
    .then((response) => {
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    })
    .catch((error) => {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    });
});

app.post("/failure" ,function(req,res){
  res.redirect("/");
});

app.listen(3000, function (req, res) {
  console.log("server is running at port 3000");
});

// 0eecf4d3a917881867f40df1cd5b5a3d-us21          API key for newsletter
//  audience  id  b41a60c113