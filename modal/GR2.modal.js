var mongoose = require('mongoose');
var gr2 = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true }
})
// Biên dịch mô hình từ schema
module.exports = mongoose.model('project', gr2);