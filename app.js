const express = require("express");
const https = require("https"); //is a native protocol
const bodyParser = require("body-parser"); // we can pass through the body of the html file to change values of the html. BUT ONLY NAME TAGS
//as in input and the name to it

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){ //request is from the source a request of data that is needed. the response is the result coming back.
    
    res.sendFile(__dirname+ "/index.html");
});


app.listen(3000, function(){
    console.log("server is running on port 3000");

})
app.post("/", function(req, res){    
const query = req.body.cityName;
const apiKey = "9516b85406bc6ee973cf1b155762a40b"
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
//API basically a huge JSON object that is provided from the other server that you can use to access their data. 
//that JSON file must now just be converted back into an js object to use even though JSON is very similar to an js object.
https.get(url, function(response){
    console.log(response);

    response.on("data", function(data){
        const weatherData = JSON.parse(data); //getting the data from the https.get method as a JSON file
        const temp = weatherData.main.temp //fetching the items we want from the JSON file
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        res.write("<h1>The temperature in "+query+ " is " + temp + " degrees</h1>") //there can only be one response, res.send. That is the final thing to happen
        res.write("<img src=" + imageURL + ">");
        res.send();
    });
}); 
})

