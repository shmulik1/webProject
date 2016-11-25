var mongo = require('mongoose');
var Schema = mongo.Schema;

var branchSchema = new Schema({
    name: String,
    number: Number,
    address: String,
    state: String,
    isActive: Boolean,
    openingHours: String,
    phoneNumber: String,
    created_at: Date,
    updated_at: Date
});
branchSchema.pre('save',function (next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
var Branch = mongo.model('Branch', branchSchema);
module.exports = Branch;