var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
    fileName: { type: String, default: '' },
    s3Url : {type: String, default: ''}
});


module.exports = mongoose.model('UploadedFile', FileSchema);
