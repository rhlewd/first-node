var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('contactlist', ['contactlist']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res) {
    db.contactlist.find(function(err, docs) {
        res.json(docs);
    });
});

app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    db.contactlist.findOne({
        _id: mongojs.ObjectId(id)
    }, function(err, docs) {
        res.json(docs);
    });
});

app.post('/contactlist', function(req, res) {
    db.contactlist.insert(req.body, function(err, docs) {
        res.json(docs);
    });
});

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    db.contactlist.findAndModify({
            Query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set : {
                    name: req.body.name,
                    email: req.body.email,
                    number: req.body.number
                }
            },
            new: true
        },
        function(err, docs) {
            res.json(docs);
        });
});

app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    db.contactlist.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, docs) {
        res.json(docs);
    });
});

app.listen(3000);
console.log("Server running on port 3000");
