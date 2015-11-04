/* global describe, it */
var assert = require('assert')
var mimeTypeUtil = require('../')
var rdf = require('rdf-ext')
var JsonLdParser = require('rdf-parser-jsonld')
var MicrodataParser = require('rdf-parser-microdata')
var N3Parser = require('rdf-parser-n3')
var RdfXmlParser = require('rdf-parser-rdfxml')
var JsonLdSerializer = require('rdf-serializer-jsonld')
var N3Serializer = require('rdf-serializer-n3')
var NTriplesSerializer = require('rdf-serializer-ntriples')
var SparqlUpdateSerializer = require('rdf-serializer-sparql-update')

describe('rdf-mime-type-util', function () {
  var graph = rdf.createGraph([rdf.createTriple(
    rdf.createNamedNode('http://example.org/subject'),
    rdf.createNamedNode('http://example.org/predicate'),
    rdf.createLiteral('object'))])
  var nTriples = '<http://example.org/subject> <http://example.org/predicate> "object" .'

  describe('parsers', function () {
    it('should implement all required functions', function () {
      assert.equal(typeof mimeTypeUtil.parsers.list, 'function')
      assert.equal(typeof mimeTypeUtil.parsers.findParsers, 'function')
      assert.equal(typeof mimeTypeUtil.parsers.parse, 'function')
      assert.equal(typeof mimeTypeUtil.parsers.process, 'function')
      assert.equal(typeof mimeTypeUtil.parsers.stream, 'function')
    })

    it('.list should list all mime types', function () {
      var mimeTypes = mimeTypeUtil.parsers.list()

      assert.notEqual(mimeTypes.indexOf('application/ld+json'), -1)
      assert.notEqual(mimeTypes.indexOf('application/n-triples'), -1)
      assert.notEqual(mimeTypes.indexOf('application/rdf+xml'), -1)
      assert.notEqual(mimeTypes.indexOf('application/xhtml+xml'), -1)
      assert.notEqual(mimeTypes.indexOf('text/html'), -1)
      assert.notEqual(mimeTypes.indexOf('text/n3'), -1)
      assert.notEqual(mimeTypes.indexOf('text/turtle'), -1)
    })

    it('.findParsers should find parsers for standard formats', function () {
      assert.equal(mimeTypeUtil.parsers.findParsers('application/ld+json').shift(), JsonLdParser)
      assert.equal(mimeTypeUtil.parsers.findParsers('application/n-triples').shift(), N3Parser)
      assert.equal(mimeTypeUtil.parsers.findParsers('application/rdf+xml').shift(), RdfXmlParser)
      assert.equal(mimeTypeUtil.parsers.findParsers('application/xhtml+xml').shift(), MicrodataParser)
      assert.equal(mimeTypeUtil.parsers.findParsers('text/html').shift(), MicrodataParser)
      assert.equal(mimeTypeUtil.parsers.findParsers('text/n3').shift(), N3Parser)
      assert.equal(mimeTypeUtil.parsers.findParsers('text/turtle').shift(), N3Parser)
    })

    it('.findParsers should return null if no parser was found', function () {
      assert.equal(mimeTypeUtil.parsers.findParsers('image/jpeg'), null)

    })

    it('.parse should parse a serialized graph using the parsers for the given mime type', function (done) {
      mimeTypeUtil.parsers.parse('application/n-triples', nTriples).then(function (parsed) {
        assert.equal(graph.equals(parsed), true)

        done()
      }).catch(function (error) {
        done(error)
      })
    })

    it('.parse should throw an error if no parser was found', function (done) {
      mimeTypeUtil.parsers.parse('image/jpeg', nTriples).then(function () {
        done('no error thrown')
      }).catch(function () {
        done()
      })
    })

    it('.process should parse a serialized graph using the parsers for the given mime type and call the callback for every triple', function (done) {
      var called = false
      var callback = function (parsed) {
        assert.equal(graph.toArray().shift().equals(parsed), true)

        called = true
      }

      mimeTypeUtil.parsers.process('application/n-triples', nTriples, callback).then(function () {
        assert.equal(called, true)

        done()
      }).catch(function (error) {
        done(error)
      })
    })

    it('.process should throw an error if no parser was found', function (done) {
      mimeTypeUtil.parsers.process('image/jpeg', nTriples, function () {}).then(function () {
        done('no error thrown')
      }).catch(function () {
        done()
      })
    })

    it('.stream should parse a serialized graph using the parsers for the given mime type and stream every triple', function (done) {
      var called = false

      mimeTypeUtil.parsers.stream('application/n-triples', nTriples).on('data', function (parsed) {
        assert.equal(graph.toArray().shift().equals(parsed), true)

        called = true
      }).on('end', function () {
        assert.equal(called, true)

        done()
      }).on('error', function (error) {
        done(error)
      })
    })
  })

  it('.stream should return null if no parser was found', function () {
    assert.equal(mimeTypeUtil.parsers.stream('image/jpeg', nTriples), null)
  })

  describe('serializers', function () {
    it('should implement all required functions', function () {
      assert.equal(typeof mimeTypeUtil.serializers.list, 'function')
      assert.equal(typeof mimeTypeUtil.serializers.findSerializer, 'function')
      assert.equal(typeof mimeTypeUtil.serializers.serialize, 'function')
      assert.equal(typeof mimeTypeUtil.serializers.stream, 'function')
    })

    it('.list should list all mime types', function () {
      var mimeTypes = mimeTypeUtil.serializers.list()

      assert.notEqual(mimeTypes.indexOf('application/ld+json'), -1)
      assert.notEqual(mimeTypes.indexOf('application/n-triples'), -1)
      assert.notEqual(mimeTypes.indexOf('application/sparql-update'), -1)
      assert.notEqual(mimeTypes.indexOf('text/n3'), -1)
      assert.notEqual(mimeTypes.indexOf('text/turtle'), -1)
    })

    it('.findSerializer should find parsers for standard formats', function () {
      assert(mimeTypeUtil.serializers.findSerializer('application/ld+json') instanceof JsonLdSerializer)
      assert.equal(mimeTypeUtil.serializers.findSerializer('application/n-triples'), NTriplesSerializer)
      assert.equal(mimeTypeUtil.serializers.findSerializer('application/sparql-update'), SparqlUpdateSerializer)
      assert.equal(mimeTypeUtil.serializers.findSerializer('text/n3'), N3Serializer)
      assert.equal(mimeTypeUtil.serializers.findSerializer('text/turtle'), N3Serializer)
    })

    it('.findSerializer should return null if no serializer was found', function () {
      assert.equal(mimeTypeUtil.serializers.findSerializer('image/jpeg'), null)
    })

    it('.serialize should serialize a graph using the serializer for the given mime type', function (done) {
      mimeTypeUtil.serializers.serialize('application/n-triples', graph).then(function (serialized) {
        assert.equal(serialized.trim(), nTriples)

        done()
      }).catch(function (error) {
        done(error)
      })
    })

    it('.serialize should throw an error if no serializer was found', function (done) {
      mimeTypeUtil.serializers.serialize('image/jpeg', graph).then(function () {
        done('no error throw')
      }).catch(function () {
        done()
      })
    })

    it('.stream should serialize a graph using the serializer for the given mime type', function (done) {
      mimeTypeUtil.serializers.stream('application/n-triples', graph).on('data', function (serialized) {
        assert.equal(serialized.trim(), nTriples)

        done()
      }).on('error', function (error) {
        done(error)
      })
    })

    it('.stream should return null if no serializer was found', function () {
      assert.equal(mimeTypeUtil.serializers.stream('image/jpeg'), null)
    })
  })
})
