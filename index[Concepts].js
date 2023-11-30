// => copy boiler plate => express.com -> getting started -> hello world COPY
// libraries are black boxex -> just use their functions
const express = require('express') // "express" library helps you create HTTPS servers
const app = express()
const port = 3000 //part of URL
const bodyParser = require('body-parser')
let noofRequests = 0;

// MIDDLEWARE
// //middleware runs before any handle/route is called [Global Logic]
// function middleware1(req, res, next) {
//     noofRequests++; //saves repitition in every handler
//     console.log(noofRequests)
//     // console.log("The counter from the headers is : " + req.headers.counter);
//     next();
// }
// app.use(middleware1);
app.use(bodyParser.json()); //body written in JSON file (in Postman) => ENABLES THE USE OF req.body

function handleFirstRequest(req, res) {
    res.send('Hello World!!!') // only returns "STRINGS" (or variables as strings)
}
// app.get('/', handleFirstRequest) //execute handleFirstRequest at "http://localhost:3000/"
app.post('/', handleFirstRequest) //sends data, doesn't display in browser. Displays in Postman.

function calcSum(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
function getSum(req, res) { // req => query, header, body
    // var counter = req.query.counter; //<route>?counter=10 : stores this 10 in counter => Query Parameters [URL]
    // var counter = req.headers.counter;
    // console.log(req.headers); //edited in Postman
    var counter = req.body.counter;
    console.log(req.body);
    if (counter < 100000) {
        res.send("the sum is " + calcSum(counter)); //sends SIMPLE TEXT
    } else {
        res.status(411).send("The number/counter is too big"); //400-499 : client side error
    }
}
app.get('/sum', getSum) //execute getSum at "http://localhost:3000/sum"
// async callback fu. "getSum" is triggered anytime '/sum' gets response (listen)

function calcprod(counter) {
    var prod = 1;
    for (var i = 1; i <= counter; i++) {
        prod *= i;
    }
    return prod;
}
function getMath(req, res) {
    var counter = req.body.counter;
    var ansObject = {
        sum : calcSum(counter),
        prod : calcprod(counter)
    };
    res.send(ansObject); // objects are returned as JSON file format
}
app.get('/math', getMath);

function getHTML(req, res) {
// METHOD 1 : Send code
//     res.send(`<head>        
//     <!-- Title = Tab heading -->
//     <title>
//         Hello from Page
//     </title>
// </head>
// <body>
//     <b>hi there</b> <!-- bold -->
//     <i>hi there</i> <!-- italics -->
// </body>`); 
// hyphen => left of key 1 == ~/`

// METHOD 2 : Send direct file
res.sendFile(__dirname + "/index.html"); // __dirname => gives current directory
}
app.get('/page', getHTML);

function started() {
    console.log(`Example app listening on port ${port}`) //print in console/terminal
}
app.listen(port, started) // STARTS AN HTTP SERVER
// makes the https server listen/wait for incoming requests from client (makes it on 24x7)
//started is a callback function [NOT NECESSARY]
//app.listen(port) also works, just no message

// Syntax :-
// • app.get(<route>, <function>) : GET handle
//   -> <route> : each route is assigned for different tasks
//   -> <function> : the task to be performed at that task
//
// • app.listen(<port>, <function/message>) : starts an HTTP Server
//
// • res.send() : returns string 