/* global describe, it */

const assert = require('assert')
const JsonLdParser = require('@rdfjs/parser-jsonld')
const N3Parser = require('@rdfjs/parser-n3')
const { RdfXmlParser } = require('rdfxml-streaming-parser')
const JsonLdSerializer = require('@rdfjs/serializer-jsonld')
const NTriplesSerializer = require('@rdfjs/serializer-ntriples')

const formats = require('..')

function testMediaType (map, mediaType, name, implementation) {
  describe(mediaType, () => {
    it('should be supported', () => {
      assert(map.has(mediaType))
    })

    it(`should use ${name}`, () => {
      assert(map.get(mediaType) instanceof implementation)
    })
  })
}

describe('@rdfjs/formats-common', () => {
  describe('parsers', () => {
    it('should implement the Map interface', () => {
      assert.strictEqual(typeof formats.parsers.get, 'function')
      assert.strictEqual(typeof formats.parsers.has, 'function')
      assert.strictEqual(typeof formats.parsers.set, 'function')
    })

    it('should implement .import', () => {
      assert.strictEqual(typeof formats.parsers.import, 'function')
    })

    testMediaType(formats.parsers, 'application/ld+json', '@rdfjs/parser-jsonld', JsonLdParser)
    testMediaType(formats.parsers, 'application/trig', '@rdfjs/parser-n3', N3Parser)
    testMediaType(formats.parsers, 'application/n-quads', '@rdfjs/parser-n3', N3Parser)
    testMediaType(formats.parsers, 'application/n-triples', '@rdfjs/parser-n3', N3Parser)
    testMediaType(formats.parsers, 'text/n3', '@rdfjs/parser-n3', N3Parser)
    testMediaType(formats.parsers, 'text/turtle', '@rdfjs/parser-n3', N3Parser)
    testMediaType(formats.parsers, 'application/rdf+xml', 'rdfxml-streaming-parser', RdfXmlParser)
  })

  describe('serializers', () => {
    it('should contain serializers all defined media types', () => {
      assert(formats.serializers.has('application/ld+json'))
      assert(formats.serializers.has('application/n-quads'))
      assert(formats.serializers.has('application/n-triples'))
      assert(formats.serializers.has('text/n3'))
      assert(formats.serializers.has('text/turtle'))
    })

    it('should implement the Map interface', () => {
      assert.strictEqual(typeof formats.serializers.get, 'function')
      assert.strictEqual(typeof formats.serializers.has, 'function')
      assert.strictEqual(typeof formats.serializers.set, 'function')
    })

    it('should implement .import', () => {
      assert.strictEqual(typeof formats.serializers.import, 'function')
    })

    testMediaType(formats.serializers, 'application/ld+json', '@rdfjs/serializer-jsonld', JsonLdSerializer)
    testMediaType(formats.serializers, 'application/n-quads', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType(formats.serializers, 'application/n-triples', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType(formats.serializers, 'text/n3', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType(formats.serializers, 'text/turtle', '@rdfjs/serializer-ntriples', NTriplesSerializer)
  })
})
