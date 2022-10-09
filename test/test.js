import { strictEqual } from 'assert'
import JsonLdParser from '@rdfjs/parser-jsonld'
import N3Parser from '@rdfjs/parser-n3'
import NTriplesSerializer from '@rdfjs/serializer-ntriples'
import { describe, it } from 'mocha'
import formats from '../index.js'
import JsonLdSerializer from '../lib/CustomJsonLdSerializer.js'
import RdfXmlParser from '../lib/CustomRdfXmlParser.js'

function testMediaType (mapKey, mediaType, name, implementation) {
  describe(mediaType, () => {
    it('should be supported', async () => {
      const map = (await formats)[mapKey]

      strictEqual(map.has(mediaType), true)
    })

    it(`should use ${name}`, async () => {
      const map = (await formats)[mapKey]

      strictEqual(map.get(mediaType) instanceof implementation, true)
    })
  })
}

describe('@rdfjs/formats-common', () => {
  describe('parsers', () => {
    let parsers

    before(async () => {
      parsers = (await formats).parsers
    })

    it('should implement the Map interface', () => {
      strictEqual(typeof parsers.get, 'function')
      strictEqual(typeof parsers.has, 'function')
      strictEqual(typeof parsers.set, 'function')
    })

    it('should implement .import', () => {
      strictEqual(typeof parsers.import, 'function')
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
      strictEqual(serializers.has('application/ld+json'), true)
      strictEqual(serializers.has('application/n-quads'), true)
      strictEqual(serializers.has('application/n-triples'), true)
      strictEqual(serializers.has('text/n3'), true)
      strictEqual(serializers.has('text/turtle'), true)
    })

    it('should implement the Map interface', () => {
      strictEqual(typeof serializers.get, 'function')
      strictEqual(typeof serializers.has, 'function')
      strictEqual(typeof serializers.set, 'function')
    })

    it('should implement .import', () => {
      strictEqual(typeof serializers.import, 'function')
    })

    testMediaType('serializers', 'application/ld+json', '@rdfjs/serializer-jsonld', JsonLdSerializer)
    testMediaType('serializers', 'application/n-quads', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType('serializers', 'application/n-triples', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType('serializers', 'text/n3', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType('serializers', 'text/turtle', '@rdfjs/serializer-ntriples', NTriplesSerializer)
  })
})
