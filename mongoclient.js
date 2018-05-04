var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/names', function(err, db) {
    var cursor = db.collection('details').find();

    cursor.each(function(err, data) {
        console.log(data);
    });
});