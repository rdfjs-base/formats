const rdf = require('rdf-ext')
const JsonLdParser = require('rdf-parser-jsonld')
const N3Parser = require('rdf-parser-n3')
// const RdfXmlParser = require('rdf-parser-rdfxml')
const JsonLdSerializer = require('rdf-serializer-jsonld-ext')
// const N3Serializer = require('rdf-serializer-n3')
const NTriplesSerializer = require('rdf-serializer-ntriples')
// const SparqlUpdateSerializer = require('rdf-serializer-sparql-update')

function register (handler, format, instance) {
  if (!(format in handler)) {
    handler[format] = instance
  }
}

function mixin (object) {
  object = object || {}
  object.parsers = object.parsers || new rdf.Parsers()
  object.serializers = object.serializers || new rdf.Serializers()

  register(object.parsers, 'application/ld+json', new JsonLdParser({factory: rdf}))
  register(object.parsers, 'application/n-triples', new N3Parser({factory: rdf}))
  // register(object.parsers, 'application/rdf+xml', RdfXmlParser)
  register(object.parsers, 'text/n3', new N3Parser({factory: rdf}))
  register(object.parsers, 'text/turtle', new N3Parser({factory: rdf}))

  register(object.serializers, 'application/ld+json', new JsonLdSerializer({outputFormat: 'string'}))
  register(object.serializers, 'application/n-triples', new NTriplesSerializer())
  // register(object.serializers, 'application/sparql-update', SparqlUpdateSerializer)
  // register(object.serializers, 'text/n3', N3Serializer)
  // register(object.serializers, 'text/turtle', N3Serializer)

  return object
}

module.exports = mixin
