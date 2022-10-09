import SinkMap from '@rdfjs/sink-map'
import {
  jsonLdParser,
  n3Parser,
  rdfXmlParser
} from './parsers.js'
import {
  jsonLdSerializer,
  nTriplesSerializer
} from './serializers.js'

const parsers = new SinkMap()
const serializers = new SinkMap()

const formats = {
  parsers,
  serializers
}

formats.parsers.set('application/ld+json', jsonLdParser)
formats.parsers.set('application/trig', n3Parser)
formats.parsers.set('application/n-quads', n3Parser)
formats.parsers.set('application/n-triples', n3Parser)
formats.parsers.set('text/n3', n3Parser)
formats.parsers.set('text/turtle', n3Parser)
formats.parsers.set('application/rdf+xml', rdfXmlParser)

formats.serializers.set('application/ld+json', jsonLdSerializer)
formats.serializers.set('application/n-quads', nTriplesSerializer)
formats.serializers.set('application/n-triples', nTriplesSerializer)
formats.serializers.set('text/n3', nTriplesSerializer)
formats.serializers.set('text/turtle', nTriplesSerializer)

export { parsers, serializers }
export default formats
