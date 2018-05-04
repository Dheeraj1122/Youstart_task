var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detailSchema = new Schema({
    desc: String,
    rollno: Number,
    completed: {type: Boolean, default: false}
});

var Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;