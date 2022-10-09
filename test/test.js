import { strictEqual } from 'assert'
import JsonLdParser from '@rdfjs/parser-jsonld'
import N3Parser from '@rdfjs/parser-n3'
import NTriplesSerializer from '@rdfjs/serializer-ntriples'
import JsonLdSerializer from '@rdfjs/serializer-jsonld'
import { RdfXmlParser } from 'rdfxml-streaming-parser'
import { describe, it } from 'mocha'
import formats from '../index.js'

function testMediaType (map, mediaType, name, implementation) {
  describe(mediaType, () => {
    it('should be supported', async () => {
      strictEqual(map.has(mediaType), true)
    })

    it(`should use ${name}`, async () => {
      const sink = await map.get(mediaType)()

      strictEqual(sink instanceof implementation, true)
    })
  })
}

describe('@rdfjs/formats-common', () => {
  describe('parsers', () => {
    it('should implement the Map interface', () => {
      strictEqual(typeof formats.parsers.get, 'function')
      strictEqual(typeof formats.parsers.has, 'function')
      strictEqual(typeof formats.parsers.set, 'function')
    })

    it('should implement .import', () => {
      strictEqual(typeof formats.parsers.import, 'function')
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
      strictEqual(formats.serializers.has('application/ld+json'), true)
      strictEqual(formats.serializers.has('application/n-quads'), true)
      strictEqual(formats.serializers.has('application/n-triples'), true)
      strictEqual(formats.serializers.has('text/n3'), true)
      strictEqual(formats.serializers.has('text/turtle'), true)
    })

    it('should implement the Map interface', () => {
      strictEqual(typeof formats.serializers.get, 'function')
      strictEqual(typeof formats.serializers.has, 'function')
      strictEqual(typeof formats.serializers.set, 'function')
    })

    it('should implement .import', () => {
      strictEqual(typeof formats.serializers.import, 'function')
    })

    testMediaType(formats.serializers, 'application/ld+json', '@rdfjs/serializer-jsonld', JsonLdSerializer)
    testMediaType(formats.serializers, 'application/n-quads', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType(formats.serializers, 'application/n-triples', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType(formats.serializers, 'text/n3', '@rdfjs/serializer-ntriples', NTriplesSerializer)
    testMediaType(formats.serializers, 'text/turtle', '@rdfjs/serializer-ntriples', NTriplesSerializer)
  })
})
