
var HelloWorld = require('../../src/hello-world');
var async = require('async');

describe('HelloWorld', function() {

  /////////////////
  // constructor //
  /////////////////

  describe('constructor', function() {

    it('should throw error when target not given', function() {
      expect(function() {
        new HelloWorld();
      }).toThrowError(/Illegal argument.*target/);
    });

  }); // constructor

  ///////////
  // .seed //
  ///////////

  describe('.seed', function() {

    it('should evolve into genes on edge of genepool', function(done) {
      // execute helloWorld.seed 10 times in parallel
      function seed(callback) {
        var helloWorld = new HelloWorld({
          target: '` ',
          populationSize: 50,
          numberOfGenerations: 100,
          logGenerations: false
        });
        helloWorld.seed(callback);
      }
      var promises = [];
      for (var c=0; c<10; c++) { promises.push(seed); }
      async.parallel(promises, function(errors, responses) {
        var successes = 0;
        var attempts = 0;
        responses.forEach(function(population, index) {
          attempts++;
          if (population[0].genotype === '` ') {
            successes++;
          }
        });
        var probability = successes / attempts;
        expect(probability).toBeGreaterThan(0.8);
        done();
      });
    });

    it('should evolve into `hello world`', function(done) {
      var helloWorld = new HelloWorld({
        target: 'hello world',
        logGenerations: false
      });
      helloWorld.seed(function(error, population) {
        expect(population[0].genotype).toEqual('hello world');
        done();
      });
    }, 10000);

  }); // End .seed

  //////////////
  // _fitness //
  //////////////

  describe('_fitness', function() {

    it('should calculate correct fitness', function() {
      var helloWorld = new HelloWorld({
        target: 'asdf',
        logGenerations: false
      });
      var fitness = helloWorld._fitness({ genotype: 'asdf' });
      expect(fitness).toEqual(4);
      fitness = helloWorld._fitness({ genotype: 'asd' });
      expect(fitness).toEqual(2);
      fitness = helloWorld._fitness({ genotype: 'Xsdf' });
      expect(fitness).toEqual(2);
      fitness = helloWorld._fitness({ genotype: 'asdfX' });
      expect(fitness).toEqual(3);
    });

  }); // End _fitness

  /////////////
  // _mutate //
  /////////////

  describe('_mutate', function() {

    it('should mutate genotype', function() {
      var helloWorld = new HelloWorld({
        target: 'asdf',
        logGenerations: false
      });
      var individual = { genotype: 'coreys long genotype should very likely mutate into something different' };
      individual._rateOfMutation = 1;
      var lastGenotype = individual.genotype;
      for (var c=0; c<10; c++) {
        helloWorld._mutate(individual);
        expect(individual.genotype).not.toEqual(lastGenotype);
        lastGenotype = individual.genotype;
      }
    });

  }); // End _mutate

  /////////////////
  // _randomGene //
  /////////////////

  describe('_randomGene', function() {

    it('should return a single gene', function() {
      var helloWorld = new HelloWorld({
        target: 'asdf',
        logGenerations: false
      });
      for (var c=0; c<100; c++) {
        var gene = helloWorld._randomGene();
        expect(gene.length).toEqual(1);
      }
    });

  }); // End _randomGene

}); // End HelloWorld