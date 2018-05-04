var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var http = require('http');
var mongoose = require('mongoose');
var Detail = require('./Detail');

mongoose.connect('mongodb://localhost/details',{
    MongoClient : true
});

var app = express();

var data = fs.readFileSync('data.json');
data = JSON.parse(data);

var names = data.names;

//app.listen(3000, listener);
var server = http.createServer(app);
server.listen(3000, listener);

function listener() {
    console.log('Magic happens on port 3000...');
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//RESTful API (GET, PUT, POST, DELETE)

//Routes
app.get('/request', requestFunc);
app.get('/names', getAllNames);
app.get('/names/:rollno', getName);
app.post('/names', addName);

//Callback Functions.

function requestFunc(req, res) {
    request('http://localhost:3000/names', function (err, status, body) {
        //console.log(status);
        res.send(body);
    });
}

function addName(request, response) {
    console.log(request.body);

    var name = request.body.name;
    // var lastRollno = names[names.length - 1].rollno;
    //var newRollno = lastRollno + 1;

    var data = {
        desc : name,
        rollno : rollno,
        completed : false
    };
     
     var detail = new Detail(data);
     detail.save(function(err, data){
         if(!err){
         response.send({
            success: true,
            name: data
         });
        }
     });
}

 /*   var lastId = names[names.length - 1].id;

    var newId = lastId + 1;

   
    var newName = {
        id: newId,
        desc: name,
        rollno: newRollno,
        completed: false
    }

    names.push(newName);

    var data = {
        names: names
    };

    data = JSON.stringify(data, null, 2);

    fs.writeFile('data.json', data, function(err, data) {
        response.send({
            success: true,
            name: newName
        });
    });
}
*/
function getName(request, response) {
    var rollno = Number(request.params.rollno);
    names.forEach(function(name) {
        if(name.rollno === rollno) {
            response.send(name);
            return;
        }
    });

    response.send('No task found.');
}

function getAllNames(request, response) {
    Detail.find({}, function(err, data){
        console.log(data);
        response.send(data);
    });
    
}


app.use(express.static('website'));
