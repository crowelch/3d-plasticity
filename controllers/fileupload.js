var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.loadFromPath('./config/AWSConfig.json');
AWS.config.update({ region: "", endpoint: "https://s3.amazonaws.com" });

var AWSUrl = 'https://s3.amazonaws.com/3d-plasticity/';


exports.upload = function (req, res) {
    res.render('upload', {
        title: 'Upload'
    });
};

exports.postUpload = function (req, res, next) {

    uploadFileToAWS(req.body.filename, 'TestFileA1A.txt', function (err, filename) {
        if(err){
            return console.log(err);
        }
        req.session.filename = filename;
        res.redirect('/viewer');
    });

}

function uploadFileToAWS(filepath, filename, callback) {

    var body = fs.readFile(filepath, function (err, data) {
        if (err) { console.log(err); return callback(err);}
        var s3obj = new AWS.S3();
        var params = { Bucket: '3d-plasticity', Key: filename, ACL: 'public-read', Body: data, Expires: 3600 }
        s3obj.putObject(params, function (resp) {
            callback(null, AWSUrl + filename);
        });
    });
}

function getFileFromAws(fileKey, downloadPath) {
    var s3 = new AWS.S3();
    var params = { Bucket: '3d-plasticity', Key: fileKey }
    var file = fs.createWriteStream(downloadPath);
    var s3file = s3.getObject(params).createReadStream().pipe(file);
}
