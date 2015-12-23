
var Eukaryote = require('../../eukaryote/src/eukaryote');

/**
 * @class
 * @description selects individuals whose genotypes most closely resemble `hello world`.
 * @param {string} options.target Target value is a representation of the most fit individual.
 * @param {boolean} options.logGenerations Indicates whether to print each generations most fit individual to console.
 */
var HelloWorld = function(options) {
  options = options || {};
  if (options.target === undefined || options.target === null || options.target === "") {
    throw new Error('Illegal argument: missing required argument `target`.');
  }

  this._target = options.target;
  this._genepool = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>? ';
  this._rateOfMutation = 0.3;

  this._logGenerations = true;
  if (options.logGenerations !== undefined) this._logGenerations = options.logGenerations;

  var that = this;
  this.environment = new Eukaryote.Genetic.Environment({
    populationSize: options.populationSize || 100,
    numberOfGenerations: options.numberOfGenerations || 5000,
    fitnessSync: function(individual) {
      return that._fitness(individual);
    },
    mutateSync: function(individual) {
      that._mutate(individual);
    },
    generationSync: function(g) {
      if (that._logGenerations) console.log('Generation: ' + g + ', most fit individual: ', that.environment.population[0].genotype);
      return that.environment.population[0].genotype !== that._target;
    }
  });
};

/**
 * Seed the first individual and start evolution.
 */
HelloWorld.prototype.seed = function(callback) {
  var that = this;
  var individual = { genotype: 'a' };
  this.environment.seed(individual, function(error) {
    if (error) callback(error);
    else {
      callback(null, that.environment.population);
    }
  });
};

/**
 * @private
 * @description
 * Calculate fitness score of given individual. Compare against target value.
 * @param {Individual} individual Individual whose fitness is to be calculated.
 * @returns {integer} Returns 1 point for every character in the same location as target.
 */
HelloWorld.prototype._fitness = function(individual) {
  if (individual === null || individual === undefined) {
    throw new Error('Illegal argument: individual cannot be null or undefined');
  }
  var target = this._target;
  var genotype = individual.genotype;
  var fitness = 0;
  for (var c=0; c<target.length && c<genotype.length; c++) {
    if (genotype.charAt(c) === target.charAt(c)) {
      fitness++;
    } else {
      fitness--;
    }
  }
  fitness -= Math.abs( target.length-genotype.length );
  return fitness;
};

/**
 * @private
 * @description
 * Mutate, add a gene, or remove a gene from an individual's genotype.
 * @param {object} individual The individual to mutate.
 */
HelloWorld.prototype._mutate = function(individual) {
  var newGenotype = '';

  // mutate existing genes
  for (var c=0; c<individual.genotype.length; c++) {
    if (Math.random() < this._rateOfMutation) {
      newGenotype += this._randomGene();
    } else {
      newGenotype += individual.genotype.charAt(c);
    }
  }

  // add gene
  if (Math.random() < this._rateOfMutation) {
    newGenotype += this._randomGene();
  }

  // remove gene
  if (Math.random() < this._rateOfMutation) {
    newGenotype = newGenotype.substring(0, newGenotype.length-1);
  }

  individual.genotype = newGenotype;
};

/**
 * @private
 * @description
 * Retrieves a single random gene from gene pool.
 * @returns {string} a single gene
 */
HelloWorld.prototype._randomGene = function() {
  var randomIndex = parseInt(Math.random()*this._genepool.length, 10);
  return this._genepool.charAt(randomIndex);
};



module.exports = HelloWorld;
