
var HelloWorld = require('../../src/hello-world');

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

  	it('should evolve into target', function(done) {
      var helloWorld = new HelloWorld({
        target: 'hi!',
        populationSize: 50,
        numberOfGenerations: 100
      });
      helloWorld.seed(function(error, population) {
        expect(error).not.toEqual(jasmine.anything());
        expect(population[0].genotype).toEqual('hi!');
  			done();
  		});
  	});

  }); // End .seed

  //////////////
  // _fitness //
  //////////////

  describe('_fitness', function() {

    it('should calculate correct fitness', function() {
      var helloWorld = new HelloWorld({ target: 'asdf' });
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
      var helloWorld = new HelloWorld({ target: 'asdf' });
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
      var helloWorld = new HelloWorld({ target: 'asdf' });
      for (var c=0; c<10; c++) {
        var gene = helloWorld._randomGene();
        expect(gene.length).toEqual(1);
      }
    });

  }); // End _randomGene

}); // End HelloWorld