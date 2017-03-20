/* global describe, it */

const assert = require('assert')
const rdf = require('rdf-ext')
const JsonLdParser = require('rdf-parser-jsonld')
const N3Parser = require('rdf-parser-n3')
// const RdfXmlParser = require('rdf-parser-rdfxml')
const JsonLdSerializer = require('rdf-serializer-jsonld')
// const N3Serializer = require('rdf-serializer-n3')
const NTriplesSerializer = require('rdf-serializer-ntriples')
// const SparqlUpdateSerializer = require('rdf-serializer-sparql-update')

var formats = require('..')(rdf)

describe('rdf-formats-common', () => {
  describe('parsers', () => {
    it('should implement all required functions', () => {
      assert.equal(typeof formats.parsers.find, 'function')
      assert.equal(typeof formats.parsers.list, 'function')
      assert.equal(typeof formats.parsers.import, 'function')
    })

    it('.list should list all mime types', () => {
      let mimeTypes = formats.parsers.list()

      assert.notEqual(mimeTypes.indexOf('application/ld+json'), -1)
      assert.notEqual(mimeTypes.indexOf('application/n-triples'), -1)
      // assert.notEqual(mimeTypes.indexOf('application/rdf+xml'), -1)
      assert.notEqual(mimeTypes.indexOf('text/n3'), -1)
      assert.notEqual(mimeTypes.indexOf('text/turtle'), -1)
    })

    it('.find should find parsers for standard formats', () => {
      assert(formats.parsers.find('application/ld+json') instanceof JsonLdParser)
      assert(formats.parsers.find('application/n-triples') instanceof N3Parser)
      // assert.equal(formats.parsers.find('application/rdf+xml'), RdfXmlParser)
      assert(formats.parsers.find('text/n3') instanceof N3Parser)
      assert(formats.parsers.find('text/turtle') instanceof N3Parser)
    })
  })

  describe('serializers', () => {
    it('should implement all required functions', () => {
      assert.equal(typeof formats.serializers.find, 'function')
      assert.equal(typeof formats.serializers.import, 'function')
      assert.equal(typeof formats.serializers.list, 'function')
    })

    it('.list should list all mime types', () => {
      let mimeTypes = formats.serializers.list()

      // assert.notEqual(mimeTypes.indexOf('application/ld+json'), -1)
      assert.notEqual(mimeTypes.indexOf('application/n-triples'), -1)
      // assert.notEqual(mimeTypes.indexOf('application/sparql-update'), -1)
      // assert.notEqual(mimeTypes.indexOf('text/n3'), -1)
      // assert.notEqual(mimeTypes.indexOf('text/turtle'), -1)
    })

    it('.find should find parsers for standard formats', () => {
      assert(formats.serializers.find('application/ld+json') instanceof JsonLdSerializer)
      assert(formats.serializers.find('application/n-triples') instanceof NTriplesSerializer)
      // assert.equal(formats.serializers.find('application/sparql-update'), SparqlUpdateSerializer)
      // assert.equal(formats.serializers.find('text/n3'), N3Serializer)
      // assert.equal(formats.serializers.find('text/turtle'), N3Serializer)
    })
  })
})
