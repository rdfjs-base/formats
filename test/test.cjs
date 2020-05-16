const { describe, it, before } = require('mocha')
const assert = require('assert')
const JsonLdParser = require('@rdfjs/parser-jsonld')
const N3Parser = require('@rdfjs/parser-n3')
const { RdfXmlParser } = require('rdfxml-streaming-parser')
const JsonLdSerializer = require('@rdfjs/serializer-jsonld')
const NTriplesSerializer = require('@rdfjs/serializer-ntriples')

const formats = import('../index.js')

function testMediaType (mapKey, mediaType, name, implementation) {
  describe(mediaType, () => {
    it('should be supported', async () => {
      const map = (await formats)[mapKey]

      assert(map.has(mediaType))
    })

    it(`should use ${name}`, async () => {
      const map = (await formats)[mapKey]

      assert(await map.get(mediaType)() instanceof implementation)
    })
  })
}

describe('@rdf-esm/formats-common', () => {
  describe('parsers', () => {
    let parsers

    before(async () => {
      parsers = (await formats).parsers
    })

    it('should implement the Map interface', () => {
      assert.strictEqual(typeof parsers.get, 'function')
      assert.strictEqual(typeof parsers.has, 'function')
      assert.strictEqual(typeof parsers.set, 'function')
    })

    it('should implement .import', () => {
      assert.strictEqual(typeof parsers.import, 'function')
    })

    testMediaType('parsers', 'application/ld+json', '@rdfjs/parser-jsonld', JsonLdParser)
    testMediaType('parsers', 'application/trig', '@rdfjs/parser-n3', N3Parser)
    testMediaType('parsers', 'application/n-quads', '@rdfjs/parser-n3', N3Parser)
    testMediaType('parsers', 'application/n-triples', '@rdfjs/parser-n3', N3Parser)
    testMediaType('parsers', 'text/n3', '@rdfjs/parser-n3', N3Parser)
    testMediaType('parsers', 'text/turtle', '@rdfjs/parser-n3', N3Parser)
    testMediaType('parsers', 'application/rdf+xml', 'rdfxml-streaming-parser', RdfXmlParser)
  })

  describe('serializers', () => {
    let serializers

    before(async () => {
      serializers = (await formats).serializers
    })

    it('should contain serializers all defined media types', () => {
      assert(serializers.has('application/ld+json'))
      assert(serializers.has('application/n-quads'))
      assert(serializers.has('application/n-triples'))
      assert(serializers.has('text/n3'))
      assert(serializers.has('text/turtle'))
    })

    it('should implement the Map interface', () => {
      assert.strictEqual(typeof serializers.get, 'function')
      assert.strictEqual(typeof serializers.has, 'function')
      assert.strictEqual(typeof serializers.set, 'function')
    })

    it('should implement .import', () => {
      assert.strictEqual(typeof serializers.import, 'function')
    })

    testMediaType('serializers', 'application/ld+json', '@rdfjs/serializer-jsonld', JsonLdSerializer)
    testMediaType('serializers', 'application/n-quads', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType('serializers', 'application/n-triples', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType('serializers', 'text/n3', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType('serializers', 'text/turtle', '@rdfjs/serializer-ntriples', NTriplesSerializer)
  })
})
