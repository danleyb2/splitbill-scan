var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReceiptSchema = new Schema({

    path:  { type: String },
    result: { type: Object },
    status: {type: String, required: true, enum:['CREATED', 'PROCESSING', 'PROCESSED'], default:'CREATED'}


},{timestamps: true});


module.exports = mongoose.model('Receipt', ReceiptSchema);
