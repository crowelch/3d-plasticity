var AWS = require('aws-sdk');
var fs = require('fs');
var User = require('../models/User');
var File = require('../models/File');

AWS.config.loadFromPath('./config/AWSConfig.json');
AWS.config.update({ region: "", endpoint: "https://s3.amazonaws.com" });

var AWSUrl = 'https://s3.amazonaws.com/3d-plasticity/';


exports.upload = function (req, res) {
	res.render('upload', {
		title: 'Upload'
	});
};

exports.postUpload = function (req, res, next) {
	uploadFileToAWS(req.files.filename.path,
		req.files.filename.originalname,
		req.user, function (err, filename) {
			if(err){
				return console.log(err);
			}
			req.session.filename = filename;
			req.session.stlfile = "./uploads/" + req.files.filename.name;
			res.redirect('/viewer');
		});

}

function uploadFileToAWS(filepath, filename, user, callback) {
	var body = fs.readFile(filepath, function (err, data) {
		if (err) { console.log(err); return callback(err);}
		var s3obj = new AWS.S3();
		constructFilename(user, filename, function(completedFile) {
			var params = { Bucket: '3d-plasticity', Key: completedFile , ACL: 'public-read', Body: data, Expires: 3600 }
			s3obj.putObject(params, function (resp) {
				console.log(resp);
				callback(null, AWSUrl + completedFile);
			});
		});
	});
}

function constructFilename(user, filename, cb) {
	var completedFileName;
	if (user) {
		var email = user.email;
		var truncatedEmail = email.split("@");
		completedFileName = truncatedEmail[0] + "-" + Date.now() + "-" + filename;
		User.findById(user.id, function (err, user) {
			if (err) {
				return console.log(err);
			}
			var uploadedFile = new File({
				fileName: filename,
				s3Url: AWSUrl + completedFileName
			});
			user.accountHistory.uploadedFiles.push(uploadedFile);
			user.save(function (err) {
				return console.log(err);
			});
		});
	} else {
		completedFileName = "-" + Date.now() + "-" + filename;
	}
	console.log(completedFileName);
	cb(completedFileName);
}

function getFileFromAws(fileKey, downloadPath) {
	var s3 = new AWS.S3();
	var params = { Bucket: '3d-plasticity', Key: fileKey }
	var file = fs.createWriteStream(downloadPath);
	var s3file = s3.getObject(params).createReadStream().pipe(file);
}

/**
 * GET /
 * Home page.
 */
 exports.index = function(req, res) {
 	res.render('home', {
 		title: 'Home'
 	});
 };
