
var Individual = require('../../src/individual');

describe('individual', function() {

  ///////////////
  // .genotype //
  ///////////////

  describe('.genotype', function() {

    it('constructor should require genotype', function() {
      expect(function() {
        var individual = new Individual();
      }).toThrowError(/Illegal argument.*genotype/);
    });

    it('genotype getter should get genotype', function() {
      var individual = new Individual('asdf');
      var genotype = individual.genotype();
      expect(genotype).toEqual('asdf');
    });

    it('genotype setter should set genotype and be chainable', function() {
      var individual = new Individual('asdf');
      var objForChain = individual.genotype('new genotype');
      expect(objForChain).toBe(individual);
      expect(individual._genotype).toEqual('new genotype');
    });

    it('genotype setter should not accept null or empty genotype', function() {
      var individual = new Individual('asdf');
      expect(function() {
        individual.genotype(null);
      }).toThrowError(/Illegal argument.*genotype/);
      expect(function() {
        individual.genotype('');
      }).toThrowError(/Illegal argument.*genotype/);
    });

  }); // End .genotype

  //////////////
  // .fitness //
  //////////////

  describe('.fitness', function() {

    it('should throw error when target value is not given', function() {
      var individual = new Individual('asdf');
      expect(function() {
        individual.fitness();
      }).toThrowError(/Illegal argument.*target/);
      expect(function() {
        individual.fitness(null);
      }).toThrowError(/Illegal argument.*target/);
    });

    it('should calculate correct fitness', function() {
      var individual = new Individual('asdf');
      var fitness = individual.fitness('asdf');
      expect(fitness).toEqual(4);
      fitness = individual.fitness('asd');
      expect(fitness).toEqual(3);
      fitness = individual.fitness('Xsdf');
      expect(fitness).toEqual(3);
      fitness = individual.fitness('asdfX');
      expect(fitness).toEqual(4);
    });

  }); // End .fitness

}); // End individual