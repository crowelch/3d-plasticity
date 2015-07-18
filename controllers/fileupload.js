var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.loadFromPath('../config/AWSConfig.json');
AWS.config.update({region: "", endpoint : "https://s3.amazonaws.com" });
uploadFileToAWS("C:\\Github\\Test.txt", "kfechter-testFile.txt");
getFileFromAws("kfechter-testFile.txt", "C:\\Github\\TestDownload.txt");


function uploadFileToAWS(filepath, filename) {

    var body = fs.readFile(filepath, function (err, data) {
        if (err) { console.log(err); return; }
        var s3obj = new AWS.S3();
        var params = { Bucket: '3d-plasticity', Key: filename, ACL: 'public-read', Body: data, Expires: 3600 }
        s3obj.putObject(params, function (resp) {
            
        });
    });
}

function getFileFromAws(fileKey, downloadPath) {
    var s3 = new AWS.S3();
    var params = { Bucket: '3d-plasticity', Key: fileKey }
    var file = fs.createWriteStream(downloadPath);
    var s3file = s3.getObject(params).createReadStream().pipe(file);
}
