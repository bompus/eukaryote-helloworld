
var Eukaryote = require('eukaryote');
var Individual = require('./individual');

var environment = new Eukaryote.Genetic.Environment({
	fitnessSync: function(individual) {
		return 0;
	},
	mutateSync: function(individual) {
	}
});

console.log('Eukaryote:', Eukaryote);
console.log('Individual:', Individual);
