require('dotenv').config();
let express = require('express');
let app = express();
const bodyParser = require('body-parser');

//Serve an HTML File
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

//Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

//Use the .env File
app.get("/json", (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }
    res.json({ "message": message });
});

//Implement a Root-Level Request Logger Middleware
function requestLogger(req, res, next) {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;

    console.log(`${method} ${path} - ${ip}`);
    next();
}
app.use(requestLogger);


//Chain Middleware to Create a Time Server
function addCurrentTime(req, res, next) {
    req.time = new Date().toString(); 
    next(); 
}

app.get('/now', addCurrentTime, (req, res) => {
    res.json({ time: req.time });
});

//Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
    const { word } = req.params; //const word = req.params.word;
    res.json({
      echo: word
    });
});

//Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
    const {first: firstName, last: lastName} = req.query;
    const fullname = `${firstName} ${lastName}`; //var firstName = req.query.first; var lastName = req.query.last;
    res.json({
        name: fullname
    });
});

//Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Get Data from POST Requests
app.post("/name", (req, res) => {
    const{first: firstName, last: lastName} = req.body;
    const fullname = `${firstName} ${lastName}`;
    res.json({
        name: fullname
    });
});








































 module.exports = app;
