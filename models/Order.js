var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    timeStamp: { type: Date, default: Date.now },
    fileName: { type: String, default: '' },
    seller: { type: String, default: '' },
    price: { type: String, default: '' },
    rating: {type: Number, default: 0}
});

module.exports = mongoose.model('Order', orderSchema);
