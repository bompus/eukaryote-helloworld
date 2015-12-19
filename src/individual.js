
/**
 * @class
 * @param {string} genotype
 */
var Individual = function(genotype) {
	if (genotype === undefined || genotype === null || genotype === '') {
		throw new Error('Illegal argument: missing required `genotype`.');
	}
	this._genotype = genotype;
};

/**
 * Get or set genotype for this individual. Pass genotype as first argument
 * to set genotype. When setting genotype, the `individual` instance is
 * returned for chaining. When no arguments are given the genotype is returned.
 * @param {string} g Genotype to set
 * @returns {(string|Individual)}
 */
Individual.prototype.genotype = function(g) {
	if (g === undefined) {
		return this._genotype;
	} else {
		if (g === null || g === '') {
			throw new Error('Illegal argument: genotype cannot be null.');
		}
		this._genotype = g;
		return this;
	}
};

module.exports = Individual;
