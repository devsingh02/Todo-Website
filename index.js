const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require('path') //necessary for joining html file to website
const app = express();
//const cors = require('cors')
//app.use(cors()); // but here no need as html file daaldi idhar

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {//fs reads all Files as String
        if (err) throw err;
        res.json(JSON.parse(data)); // hence converted string to JSON
        //returns the read string as JSON to Postman
    });
});

// var counter = 0;
app.post('/todos', (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 100), // unique random id
        // id : ++counter,
        title: req.body.title,
        description: req.body.description
    };
    fs.readFile("todos.json", "utf8", (err, data) => { //make sure json file has '[]'
        if (err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo); //PUSH new object to a JSON file.
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.status(201).json(newTodo);
        });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); //path.join(<complete-path>)
});

// // for all other routes, return 404
// app.use((req, res, next) => {
//     res.status(404).send();
// });

function findIndex(arr, id) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return i;
    }
    return -1;
}
function removeIndex(arr, ind) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (i !== ind) newArr.push(arr[i]);
    }
    return newArr;
}

app.delete('/todos/:id', (req, res) => {
    fs.readFile("todos.json", "utf8", (err, data) => { //read as string
        if (err) throw err;
        var todos = JSON.parse(data); //converted to JSON == array
        var ind = findIndex(todos, parseInt(req.params.id));
        if (ind === -1) {
            res.status(404).send();
        } else {
            todos = removeIndex(todos, ind);
            fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
                if (err) throw err;
                res.status(202).send();
            });
        }
    });
});

app.listen(3000, () => {
    console.log("I am now listening.");
});