var express  = require("express");
var app = express();

var mongojs = require("mongojs");
var db = mongojs("contactlist",["contactlist"]);

var bodyParser = require("body-parser");


// just to test server running
/*app.get("/", function(req,res){
    res.send("hello world from server.js");
});*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/contactList", function(req,res){
    console.log("I received a get request for contactList");
    
    
    db.contactlist.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });
    /*    person1 = {
        name: "tin",
        email: "tim@email.com",
        number: "111-111-1111"
    };
    
    person2 = {
         name: "Emly",
        email: "Emly@email.com",
        number: "22-222-22222"
    };
    
        person3 = {
         name: "Jhon",
        email: "Jhon@email.com",
        number: "333-333-3333"
    };
    var contactList = [person1, person2, person3];
    
    res.json(contactList);*/
    
    
});

app.post("/contactlist", function(req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc);
    });
});

app.delete("/contactlist/:id", function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});



app.get("/contactlist/:id", function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.put("/contactlist/:id", function(req,res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},
                                update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
                                 new: true}, function (err, doc){
                                    res.json(doc);
                                });
    
});

app.listen(3000);
console.log("Server running at port 3000");