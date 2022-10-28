import JsonLdParser from '@rdfjs/parser-jsonld'
import N3Parser from '@rdfjs/parser-n3'
import NTriplesSerializer from '@rdfjs/serializer-ntriples'
import SinkMap from '@rdfjs/sink-map'
import JsonLdSerializer from './lib/CustomJsonLdSerializer.js'
import RdfXmlParser from './lib/CustomRdfXmlParser.js'

const parsers = new SinkMap()
const serializers = new SinkMap()

const formats = {
  parsers,
  serializers
}

formats.parsers.set('application/ld+json', new JsonLdParser())
formats.parsers.set('application/trig', new N3Parser())
formats.parsers.set('application/n-quads', new N3Parser())
formats.parsers.set('application/n-triples', new N3Parser())
formats.parsers.set('text/n3', new N3Parser())
formats.parsers.set('text/turtle', new N3Parser())
formats.parsers.set('application/rdf+xml', new RdfXmlParser())

formats.serializers.set('application/ld+json', new JsonLdSerializer())
formats.serializers.set('application/n-quads', new NTriplesSerializer())
formats.serializers.set('application/n-triples', new NTriplesSerializer())
formats.serializers.set('text/n3', new NTriplesSerializer())
formats.serializers.set('text/turtle', new NTriplesSerializer())

export { parsers, serializers }
export default formats
export {
  JsonLdParser,
  JsonLdSerializer,
  N3Parser,
  NTriplesSerializer,
  RdfXmlParser
}
