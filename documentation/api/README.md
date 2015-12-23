<a name="HelloWorld"></a>
## HelloWorld
**Kind**: global class  

* [HelloWorld](#HelloWorld)
    * [new HelloWorld()](#new_HelloWorld_new)
    * [.seed()](#HelloWorld+seed)
    * [._fitness(individual)](#HelloWorld+_fitness) ⇒ <code>integer</code> ℗
    * [._mutate(individual)](#HelloWorld+_mutate) ℗
    * [._randomGene()](#HelloWorld+_randomGene) ⇒ <code>string</code> ℗

<a name="new_HelloWorld_new"></a>
### new HelloWorld()
selects individuals whose genotypes most closely resemble `hello world`.


| Param | Type | Description |
| --- | --- | --- |
| options.target | <code>string</code> | Target value is a representation of the most fit individual. |
| options.logGenerations | <code>boolean</code> | Indicates whether to print each generations most fit individual to console. |

<a name="HelloWorld+seed"></a>
### helloWorld.seed()
Seed the first individual and start evolution.

**Kind**: instance method of <code>[HelloWorld](#HelloWorld)</code>  
<a name="HelloWorld+_fitness"></a>
### helloWorld._fitness(individual) ⇒ <code>integer</code> ℗
Calculate fitness score of given individual. Compare against target value.

**Kind**: instance method of <code>[HelloWorld](#HelloWorld)</code>  
**Returns**: <code>integer</code> - Returns 1 point for every character in the same location as target.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| individual | <code>Individual</code> | Individual whose fitness is to be calculated. |

<a name="HelloWorld+_mutate"></a>
### helloWorld._mutate(individual) ℗
Mutate, add a gene, or remove a gene from an individual's genotype.

**Kind**: instance method of <code>[HelloWorld](#HelloWorld)</code>  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| individual | <code>object</code> | The individual to mutate. |

<a name="HelloWorld+_randomGene"></a>
### helloWorld._randomGene() ⇒ <code>string</code> ℗
Retrieves a single random gene from gene pool.

**Kind**: instance method of <code>[HelloWorld](#HelloWorld)</code>  
**Returns**: <code>string</code> - a single gene  
**Access:** private  
