// server.js
// load the things we need
var express = require('express');
var app = express();
// set up Mongo
var mongo = require("mongodb");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var options = { useUnifiedTopology: true, useNewUrlParser: true };

// set the view engine to ejs
app.set('view engine', 'ejs');



// use res.render to load up an ejs view file

// index page 
    app.get('/', function (req, res) {
        MongoClient.connect(url, options, function (err, db) {
            if (err) throw err;
            var dbo = db.db("coc");
            var query = {};
            dbo.collection("data")
            .findOne({}, function(err, result) {
                    if (err) throw err;
                    // console.log(result);
                    res.render('pages/Home', { thisdata: result });
                    db.close();
                });
        });
    });

// about page 

app.get('/Student', function (req, res) {
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("coc");
        var query = {};
        dbo.collection("data")
        .findOne({}, function(err, result) {
                if (err) throw err;
                // console.log(result);
                res.render('pages/Student', { thisdata : result });
                db.close();
            });
    });
});

app.get('/class', function (req, res) {
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("coc");
        var query = {};
        dbo.collection("classroom")
            .find(query)
            .toArray(function (err, result) {
                if (err) throw err;
                // console.log(result);
                res.render('pages/class', { classes: result });
                db.close();
            });
    });
});

app.get('/classdetail/:id', function (req, res) {
    var classid = req.params.id;
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("coc");
        var query = {subject_id:classid};
        dbo.collection("classroom")
            .findOne(query,function (err, result) {
                if (err) throw err;
                console.log(result);
                console.log(classid);
                res.render('pages/classdetail', { detail: result });
                db.close();
            });
    });
});

app.listen(8080);
console.log('port : 8080');

