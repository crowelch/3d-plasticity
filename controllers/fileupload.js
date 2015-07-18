var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.loadFromPath('../config/AWSConfig.json');


function uploadFileToAWS(filepath, filename){
    var body = fs.createReadStream(filepath);
    var s3obj = new AWS.S3({ params: { Bucket: '3d-plasticity', Key: filename } });
    s3obj.upload({Body : body}).
        on('httpUploadProgress', function (evt) { console.log(evt);}).
        send(function (err, data) { console.log(err,data)});
}
