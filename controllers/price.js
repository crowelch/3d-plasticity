var nodeStl = require('node-stl');

exports.price = function(filename, cb) {
	var stl = nodeStl(filename);
	setTimeout(function() {
		var grams = stl.weight;
		price = getPrice(grams, function(price) {
			 cb(price);
		});
	}, 10);
};

/*
* MaGiC NuMb3rS
*/
function getPrice(weight, cb) {
	var printingTime = 2;//hours
	var kWHAverage = 0.12; //USD
	var printerKWatts = 0.05; //50 Watts
	var filamentKGCost = 40; //USD
	var printerCost = 2000;
	var dailyUsage = 4;
	var lifetime = 5 * 365 * dailyUsage;//usage over life
	var repairRate = 10;
	var otherCosts = 0;//time, etc
	var failureRate = 10;

	var energyPrice = printerKWatts * kWHAverage * printingTime;
	var filamentPrice = (filamentKGCost / 1000) * weight;
	var deprecationPrice =  (printerCost / lifetime) * printingTime;
	var hourlyRepairs = (printerCost / 100.0 * repairRate) / lifetime;
	var repairPrice = hourlyRepairs * printingTime;
	var sitePercentage = 0.1;

	var baseMagicPrice = energyPrice + filamentPrice
		+ deprecationPrice + repairPrice + otherCosts;

	var failureCost = baseMagicPrice / 100.0 * failureRate;

	var finalCost =  baseMagicPrice + failureCost;

	finalCost += finalCost * sitePercentage;

	cb(finalCost);
}
