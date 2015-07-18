var getPrice = require('./price').price;

exports.bid = function(req, res) {
	res.send('hi');
	getPrice('public/file.stl', function(yo) {
		console.log(yo);
	});
};
