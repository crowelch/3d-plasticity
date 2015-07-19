var getPrice = require('./price').price;
var fs = require('fs');
var _ = require('lodash');

exports.bid = function(req, res) {
	fs.readFile('public/fake-data.json', function(error, usersBuffer) {
		if(error) {
			throw(error);
		}

		var users = JSON.parse(usersBuffer);

		getPrice('public/file.stl', function(price) {
			_.each(users, function(user) {
				user.price = '$' + (user.multiplier * price).toFixed(2);
			});
			console.log(users);
			var newUsers = {
				users: users
			}

			res.render('bids', newUsers);
		});
	});
};
