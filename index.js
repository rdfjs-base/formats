import {
  jsonLdParser,
  n3Parser,
  rdfXmlParser
} from './parsers.js'
import {
  jsonLdSerializer,
  nTriplesSerializer
} from './serializers.js'
import { SinkMap } from '@rdf-esm/sink-map'

const parserMap = new SinkMap()
const serializerMap = new SinkMap()

parserMap.set('application/ld+json', jsonLdParser)
parserMap.set('application/trig', n3Parser)
parserMap.set('application/n-quads', n3Parser)
parserMap.set('application/n-triples', n3Parser)
parserMap.set('text/n3', n3Parser)
parserMap.set('text/turtle', n3Parser)
parserMap.set('application/rdf+xml', rdfXmlParser)

serializerMap.set('application/ld+json', jsonLdSerializer)
serializerMap.set('application/n-quads', nTriplesSerializer)
serializerMap.set('application/n-triples', nTriplesSerializer)
serializerMap.set('text/n3', nTriplesSerializer)
serializerMap.set('text/turtle', nTriplesSerializer)

export const parsers = parserMap
export const serializers = serializerMap
