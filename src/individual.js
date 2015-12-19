
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

/**
 * Calculate fitness score of this individual. Compare against the given
 * target value.
 * @param {string} target Value to compare genotype against.
 * @returns {integer} Returns 1 point for every character in the same location as target.
 */
Individual.prototype.fitness = function(target) {
  if (target === null || target === undefined) {
    throw new Error('Illegal argument: target cannot be null or undefined');
  }
  var fitness = 0;
  for (var c=0; c<target.length && c<this._genotype.length; c++) {
    if (this._genotype.charAt(c) === target.charAt(c)) {
      fitness++;
    }
  }
  return fitness;
};

module.exports = Individual;
