var nodeStl = require('node-stl');

exports.price = function(filename, cb) {
	var stl = nodeStl(filename);
	setTimeout(function() {
		var grams = stl.weight;
		console.log(grams);
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
	console.log('energyPrice: ' + energyPrice);
	var filamentPrice = (filamentKGCost / 1000) * weight;
	console.log('filamentPrice: ' + filamentPrice);
	var deprecationPrice =  (printerCost / lifetime) * printingTime;
	console.log('deprecationPrice: ' + deprecationPrice);
	var hourlyRepairs = (printerCost / 100.0 * repairRate) / lifetime;
	console.log('hourlyRepairs: ' + hourlyRepairs);
	var repairPrice = hourlyRepairs * printingTime;
	console.log(repairPrice);
	var sitePercentage = 0.1;

	var baseMagicPrice = energyPrice + filamentPrice
		+ deprecationPrice + repairPrice + otherCosts;

	var failureCost = baseMagicPrice / 100.0 * failureRate;

	var finalCost =  baseMagicPrice + failureCost;

	console.log('base cost: ' + finalCost);
	console.log('our cut: ' + finalCost * sitePercentage);

	finalCost += finalCost * sitePercentage;

	console.log('final cost: ' + finalCost);

	cb(finalCost);
}
